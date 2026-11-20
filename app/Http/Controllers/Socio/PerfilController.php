<?php

namespace App\Http\Controllers\Socio;

use App\Enums\EstadoCLU;
use App\Enums\EstadoSocio;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\CluService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class PerfilController extends Controller
{
    public function __construct(
        protected CluService $cluService
    ) {}

    /**
     * Muestra la vista de perfil de socio con sus datos y estado de documentación (RF03, RF09).
     */
    public function edit(Request $request): Response
    {
        $user = $request->user();
        $socio = $user->socioProfile()->with(['membresia', 'credencialLu'])->first();
        $credencial = $socio?->credencialLu;

        $estadoSocio = $socio?->estado_habilitacion;
        $estadoClu = $credencial?->estado_validacion;

        return Inertia::render('Socio/Perfil/Edit', [
            'usuario' => [
                'nombre' => $user->nombre ?? $user->name,
                'apellido' => $user->apellido,
                'dni' => $user->dni,
                'fecha_nacimiento' => $user->fecha_nacimiento ? \Carbon\Carbon::parse($user->fecha_nacimiento)->toDateString() : null,
                'email' => $user->email,
                'username' => $user->username,
                'telefono' => $user->telefono,
                'domicilio' => $user->domicilio,
            ],
            'socio' => $socio ? [
                'numero_socio' => $socio->numero_socio,
                'estado' => $estadoSocio instanceof EstadoSocio ? $estadoSocio->value : $estadoSocio,
                'estado_label' => $estadoSocio instanceof EstadoSocio ? $estadoSocio->label() : $estadoSocio,
                'fecha_alta' => $socio->fecha_alta ? \Carbon\Carbon::parse($socio->fecha_alta)->toDateString() : null,
                'plan' => $socio->membresia?->nombre_plan,
                'posee_arma_propia' => (bool) $socio->posee_arma_propia,
                'es_tirador_diario' => (bool) $socio->es_tirador_diario,
            ] : null,
            'credencial' => $credencial ? [
                'id' => $credencial->id,
                'numero_clu' => $credencial->numero_clu,
                'fecha_emision' => $credencial->fecha_emision?->toDateString(),
                'fecha_vencimiento' => $credencial->fecha_vencimiento?->toDateString(),
                'estado' => $estadoClu instanceof EstadoCLU ? $estadoClu->value : $estadoClu,
                'estado_label' => $estadoClu instanceof EstadoCLU ? $estadoClu->label() : $estadoClu,
                'vigente' => $credencial->estaVigente(),
                'observaciones' => $credencial->observaciones_auditoria,
                'apto_psicofisico' => (bool) $credencial->apto_psicofisico,
                'certificado_idoneidad' => (bool) $credencial->certificado_idoneidad,
                'documentos' => [
                    'dni_frente' => (bool) $credencial->foto_dni_frente_path,
                    'dni_dorso' => (bool) $credencial->foto_dni_dorso_path,
                    'clu_frente' => (bool) $credencial->foto_clu_frente_path,
                    'clu_dorso' => (bool) $credencial->foto_clu_dorso_path,
                ],
                'alerta' => $credencial->obtenerAlertaVencimiento(),
            ] : null,
        ]);
    }

    /**
     * Actualiza los datos de contacto y de la cuenta (no toca la documentación CLU).
     */
    public function update(Request $request): RedirectResponse
    {
        /** @var User $user */
        $user = $request->user();

        $validated = $request->validate([
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', Rule::unique(User::class)->ignore($user->id)],
            'username' => ['required', 'string', 'max:30', 'alpha_dash', Rule::unique(User::class, 'username')->ignore($user->id)],
            'telefono' => ['required', 'string', 'max:30'],
            'domicilio' => ['required', 'string', 'max:255'],
        ]);

        $user->fill([
            'email' => $validated['email'],
            'username' => $validated['username'],
            'usuario' => $validated['username'],
            'telefono' => $validated['telefono'],
            'domicilio' => $validated['domicilio'],
        ]);

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        return back()->with('success', 'Tus datos personales se actualizaron correctamente.');
    }

    /**
     * Actualiza la documentación ANMaC (CLU, DNI) y la tenencia de arma propia (RF03).
     * Cualquier cambio en la credencial la deja pendiente de nueva auditoría de presidencia.
     */
    public function actualizarClu(Request $request): RedirectResponse
    {
        $socio = $request->user()->socioProfile;

        abort_unless($socio, 403, 'No posee un perfil de socio activo.');

        $validated = $request->validate([
            'posee_arma_propia' => ['required', 'boolean'],
            'numero_clu' => ['nullable', 'string', 'max:50'],
            'fecha_emision' => ['nullable', 'date', 'before_or_equal:today'],
            'fecha_vencimiento' => ['nullable', 'date', 'after:fecha_emision'],
            'foto_dni_frente' => ['nullable', 'image', 'max:5120'],
            'foto_dni_dorso' => ['nullable', 'image', 'max:5120'],
            'foto_clu_frente' => ['nullable', 'image', 'max:5120'],
            'foto_clu_dorso' => ['nullable', 'image', 'max:5120'],
        ], [
            'fecha_vencimiento.after' => 'La fecha de vencimiento debe ser posterior a la de emisión.',
            'fecha_emision.before_or_equal' => 'La fecha de emisión no puede ser futura.',
            '*.image' => 'El archivo debe ser una imagen (JPG o PNG).',
            '*.max' => 'La imagen no puede superar los 5 MB.',
        ]);

        $socio->update(['posee_arma_propia' => (bool) $validated['posee_arma_propia']]);

        $credencial = $socio->credencialLu;
        $archivos = array_filter($request->only(['foto_dni_frente', 'foto_dni_dorso', 'foto_clu_frente', 'foto_clu_dorso']));
        $datosClu = array_intersect_key($validated, array_flip(['numero_clu', 'fecha_emision', 'fecha_vencimiento']));

        $cambioCredencial = ! empty($archivos)
            || ! $credencial
            || (string) $credencial->numero_clu !== (string) ($datosClu['numero_clu'] ?? '')
            || $credencial->fecha_emision?->toDateString() !== ($datosClu['fecha_emision'] ?? null)
            || $credencial->fecha_vencimiento?->toDateString() !== ($datosClu['fecha_vencimiento'] ?? null);

        if (! $cambioCredencial) {
            return back()->with('success', 'Datos de tenencia actualizados.');
        }

        $this->cluService->registrarOActualizar($socio, $datosClu, $archivos);

        return back()->with('success', 'Documentación enviada. Quedó pendiente de validación por presidencia.');
    }

    /**
     * Baja lógica de la cuenta del socio (RF09).
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ], [
            'password.current_password' => 'La contraseña ingresada no es correcta.',
        ]);

        $user = $request->user();
        $socio = $user->socioProfile;

        Auth::logout();

        if ($socio) {
            $socio->delete();
        }

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/')->with('success', 'Su cuenta ha sido dada de baja del sistema.');
    }
}
