<?php

namespace App\Http\Controllers\Socio;

use App\Http\Controllers\Controller;
use App\Services\CluService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

        return Inertia::render('Socio/Perfil/Edit', [
            'user' => $user,
            'socio' => $socio,
            'credencial' => $socio?->credencialLu,
        ]);
    }

    /**
     * Actualiza datos de contacto y documentación ANMaC (RF03).
     */
    public function update(Request $request): RedirectResponse
    {
        $user = $request->user();
        $socio = $user->socioProfile;

        $validated = $request->validate([
            'telefono' => ['required', 'string', 'max:30'],
            'domicilio' => ['required', 'string', 'max:255'],
            'posee_arma_propia' => ['nullable', 'boolean'],
            'numero_clu' => ['nullable', 'string', 'max:50'],
            'fecha_emision' => ['nullable', 'date'],
            'fecha_vencimiento' => ['nullable', 'date'],
            'foto_dni_frente' => ['nullable', 'image', 'max:5120'],
            'foto_dni_dorso' => ['nullable', 'image', 'max:5120'],
            'foto_clu_frente' => ['nullable', 'image', 'max:5120'],
            'foto_clu_dorso' => ['nullable', 'image', 'max:5120'],
        ]);

        $user->update([
            'telefono' => $validated['telefono'],
            'domicilio' => $validated['domicilio'],
        ]);

        if ($socio) {
            $socio->update([
                'posee_arma_propia' => (bool) ($validated['posee_arma_propia'] ?? $socio->posee_arma_propia),
            ]);

            // Actualizar credencial y subir imágenes al almacenamiento privado seguro
            $archivos = $request->only(['foto_dni_frente', 'foto_dni_dorso', 'foto_clu_frente', 'foto_clu_dorso']);
            $this->cluService->registrarOActualizar($socio, $validated, $archivos);
        }

        return back()->with('success', 'Perfil y documentación actualizados correctamente.');
    }

    /**
     * Baja lógica de la cuenta del socio (RF09).
     */
    public function destroy(Request $request): RedirectResponse
    {
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
