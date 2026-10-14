<?php

namespace App\Http\Controllers\Admin;

use App\Enums\EstadoCLU;
use App\Http\Controllers\Controller;
use App\Models\CredencialLu;
use App\Services\CluService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class CluController extends Controller
{
    /**
     * Listado de documentación de Legítimo Usuario para fiscalización ANMaC (RF03, RF10, SPECS 6.4).
     */
    public function index(Request $request): Response
    {
        $estado = $request->input('estado');
        $busqueda = $request->input('q');

        $credenciales = CredencialLu::with(['socioProfile.user'])
            ->when($estado, function ($query, $estado) {
                $query->where('estado_validacion', $estado);
            })
            ->when($busqueda, function ($query, $busqueda) {
                $query->where(function ($q) use ($busqueda) {
                    $q->where('numero_clu', 'like', "%{$busqueda}%")
                      ->orWhereHas('socioProfile.user', function ($qu) use ($busqueda) {
                          $qu->where('nombre', 'like', "%{$busqueda}%")
                             ->orWhere('apellido', 'like', "%{$busqueda}%")
                             ->orWhere('dni', 'like', "%{$busqueda}%");
                      });
                });
            })
            ->latest('updated_at')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/Clu/Index', [
            'credenciales' => $credenciales,
            'filtros' => [
                'estado' => $estado,
                'q' => $busqueda,
            ],
            'estadosDisponibles' => array_column(EstadoCLU::cases(), 'value'),
        ]);
    }

    /**
     * Muestra el detalle de una credencial para su auditoría visual.
     */
    public function show(CredencialLu $credencial): Response
    {
        Gate::authorize('view', $credencial);

        $credencial->load(['socioProfile.user', 'socioProfile.membresia']);

        return Inertia::render('Admin/Clu/Show', [
            'credencial' => $credencial,
        ]);
    }

    /**
     * Fiscaliza y aprueba o rechaza la documentación ANMaC (RF03, RF10, SPECS 6.4).
     */
    public function validar(Request $request, CredencialLu $credencial, CluService $cluService): RedirectResponse
    {
        Gate::authorize('validate', $credencial);

        $validated = $request->validate([
            'estado' => ['required', Rule::in(['aprobado', 'rechazado', 'vencido', 'sin_clu'])],
            'observaciones' => ['nullable', 'string', 'max:1000'],
        ]);

        $cluService->validarDocumentacion(
            $credencial,
            $validated['estado'],
            $validated['observaciones'] ?? null
        );

        return back()->with('success', "La documentación CLU ha sido fiscalizada como {$validated['estado']}.");
    }

    /**
     * Descarga o visualiza de forma segura un archivo privado del legajo ANMaC (RF03, RNF01, SPECS 5.4).
     */
    public function verDocumento(Request $request, CredencialLu $credencial, string $tipo, CluService $cluService): BinaryFileResponse
    {
        Gate::authorize('view', $credencial);

        if (! in_array($tipo, ['dni_frente', 'dni_dorso', 'clu_frente', 'clu_dorso'], true)) {
            abort(404, 'Tipo de documento no válido.');
        }

        $path = $cluService->obtenerRutaArchivoPrivado($credencial, $tipo);

        if (! $path || ! file_exists($path)) {
            abort(404, 'El archivo solicitado no existe o no ha sido cargado.');
        }

        return response()->file($path);
    }
}
