<?php

namespace App\Http\Controllers\Admin;

use App\Enums\EstadoSocio;
use App\Http\Controllers\Controller;
use App\Models\Membresia;
use App\Models\SocioProfile;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class SocioController extends Controller
{
    /**
     * ABM de padrón de socios con filtros y búsqueda (RF06, RF08, SPECS 6.4).
     */
    public function index(Request $request): Response
    {
        $busqueda = $request->input('q');
        $estado = $request->input('estado');

        $socios = SocioProfile::with(['user', 'membresia', 'credencialLu'])
            ->when($estado, function ($query, $estado) {
                $query->where('estado_habilitacion', $estado);
            })
            ->when($busqueda, function ($query, $busqueda) {
                $query->whereHas('user', function ($q) use ($busqueda) {
                    $q->where('nombre', 'like', "%{$busqueda}%")
                      ->orWhere('apellido', 'like', "%{$busqueda}%")
                      ->orWhere('dni', 'like', "%{$busqueda}%")
                      ->orWhere('email', 'like', "%{$busqueda}%");
                })->orWhere('numero_socio', 'like', "%{$busqueda}%");
            })
            ->latest('fecha_alta')
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('Admin/Socios/Index', [
            'socios' => $socios,
            'filtros' => [
                'q' => $busqueda,
                'estado' => $estado,
            ],
        ]);
    }

    public function create(): Response
    {
        $membresias = Membresia::where('activa', true)->get();

        return Inertia::render('Admin/Socios/Create', [
            'membresias' => $membresias,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'nombre' => ['required', 'string', 'max:100'],
            'apellido' => ['required', 'string', 'max:100'],
            'dni' => ['required', 'string', 'max:20', 'unique:users,dni'],
            'fecha_nacimiento' => ['required', 'date'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'username' => ['required', 'string', 'min:6', 'max:30', 'unique:users,username'],
            'telefono' => ['nullable', 'string', 'max:30'],
            'domicilio' => ['nullable', 'string', 'max:255'],
            'membresia_id' => ['nullable', 'exists:membresias,id'],
            'numero_socio' => ['nullable', 'string', 'unique:socio_profiles,numero_socio'],
            'estado_habilitacion' => ['required', Rule::enum(EstadoSocio::class)],
            'posee_arma_propia' => ['boolean'],
            'password' => ['nullable', 'string', 'min:8'],
        ]);

        DB::transaction(function () use ($validated) {
            $user = User::create([
                'nombre' => $validated['nombre'],
                'name' => $validated['nombre'],
                'apellido' => $validated['apellido'],
                'dni' => $validated['dni'],
                'fecha_nacimiento' => $validated['fecha_nacimiento'],
                'email' => $validated['email'],
                'username' => $validated['username'],
                'usuario' => $validated['username'],
                'telefono' => $validated['telefono'] ?? null,
                'domicilio' => $validated['domicilio'] ?? null,
                'rol' => 'socio',
                'activo' => $validated['estado_habilitacion'] === 'activo',
                'password' => Hash::make($validated['password'] ?? 'SocioFormosa123!'),
            ]);

            SocioProfile::create([
                'user_id' => $user->id,
                'membresia_id' => $validated['membresia_id'] ?? null,
                'numero_socio' => $validated['numero_socio'] ?? ('TF-' . str_pad((string) $user->id, 5, '0', STR_PAD_LEFT)),
                'estado_habilitacion' => $validated['estado_habilitacion'],
                'posee_arma_propia' => (bool) ($validated['posee_arma_propia'] ?? false),
                'fecha_alta' => now()->toDateString(),
            ]);
        });

        return redirect()->route('admin.socios.index')->with('success', 'Socio registrado exitosamente en el padrón.');
    }

    public function edit(SocioProfile $socio): Response
    {
        $socio->load(['user', 'membresia', 'credencialLu']);
        $membresias = Membresia::where('activa', true)->get();

        return Inertia::render('Admin/Socios/Edit', [
            'socio' => $socio,
            'membresias' => $membresias,
        ]);
    }

    public function update(Request $request, SocioProfile $socio): RedirectResponse
    {
        $user = $socio->user;

        $validated = $request->validate([
            'nombre' => ['required', 'string', 'max:100'],
            'apellido' => ['required', 'string', 'max:100'],
            'dni' => ['required', 'string', 'max:20', Rule::unique('users', 'dni')->ignore($user->id)],
            'fecha_nacimiento' => ['required', 'date'],
            'email' => ['required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user->id)],
            'telefono' => ['nullable', 'string', 'max:30'],
            'domicilio' => ['nullable', 'string', 'max:255'],
            'membresia_id' => ['nullable', 'exists:membresias,id'],
            'numero_socio' => ['nullable', 'string', Rule::unique('socio_profiles', 'numero_socio')->ignore($socio->id)],
            'estado_habilitacion' => ['required', Rule::enum(EstadoSocio::class)],
            'posee_arma_propia' => ['boolean'],
        ]);

        DB::transaction(function () use ($socio, $user, $validated) {
            $user->update([
                'nombre' => $validated['nombre'],
                'name' => $validated['nombre'],
                'apellido' => $validated['apellido'],
                'dni' => $validated['dni'],
                'fecha_nacimiento' => $validated['fecha_nacimiento'],
                'email' => $validated['email'],
                'telefono' => $validated['telefono'] ?? null,
                'domicilio' => $validated['domicilio'] ?? null,
                'activo' => $validated['estado_habilitacion'] === 'activo',
            ]);

            $socio->update([
                'membresia_id' => $validated['membresia_id'] ?? null,
                'numero_socio' => $validated['numero_socio'] ?? $socio->numero_socio,
                'estado_habilitacion' => $validated['estado_habilitacion'],
                'posee_arma_propia' => (bool) ($validated['posee_arma_propia'] ?? false),
            ]);
        });

        return redirect()->route('admin.socios.index')->with('success', 'Ficha de socio actualizada.');
    }

    public function destroy(SocioProfile $socio): RedirectResponse
    {
        DB::transaction(function () use ($socio) {
            $user = $socio->user;
            $socio->delete();
            $user?->delete();
        });

        return redirect()->route('admin.socios.index')->with('success', 'Socio dado de baja del padrón activo.');
    }

    /**
     * Exporta el padrón social a archivo CSV para contaduría (RF33, SPECS 6.4).
     */
    public function exportar(Request $request): StreamedResponse
    {
        $socios = SocioProfile::with(['user', 'membresia', 'credencialLu'])->get();

        $headers = [
            'Content-Type' => 'text/csv; charset=UTF-8',
            'Content-Disposition' => 'attachment; filename="padron_socios_' . now()->format('Ymd_His') . '.csv"',
        ];

        return response()->stream(function () use ($socios) {
            $handle = fopen('php://output', 'w');
            // BOM UTF-8 para Excel
            fprintf($handle, chr(0xEF).chr(0xBB).chr(0xBF));

            fputcsv($handle, [
                'Nro Socio', 'Apellido', 'Nombre', 'DNI', 'Email', 'Teléfono',
                'Membresía', 'Estado Habilitación', 'Tiene CLU', 'Vencimiento CLU', 'Fecha Alta'
            ]);

            foreach ($socios as $socio) {
                fputcsv($handle, [
                    $socio->numero_socio,
                    $socio->user?->apellido,
                    $socio->user?->nombre,
                    $socio->user?->dni,
                    $socio->user?->email,
                    $socio->user?->telefono,
                    $socio->membresia?->nombre_plan ?? 'Sin Plan',
                    $socio->estado_habilitacion?->value ?? $socio->estado_habilitacion,
                    $socio->credencialLu?->numero_clu ?? 'No',
                    $socio->credencialLu?->fecha_vencimiento?->format('d/m/Y') ?? 'N/A',
                    $socio->fecha_alta?->format('d/m/Y'),
                ]);
            }

            fclose($handle);
        }, 200, $headers);
    }
}
