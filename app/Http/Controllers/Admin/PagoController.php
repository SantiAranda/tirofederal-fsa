<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pago;
use App\Models\SocioProfile;
use App\Services\PagoService;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class PagoController extends Controller
{
    /**
     * Registro centralizado de cobranzas y pagos institucionales (RF22, RF23, SPECS 6.4).
     */
    public function index(Request $request): Response
    {
        $estado = $request->input('estado');
        $concepto = $request->input('concepto');
        $busqueda = $request->input('q');

        $pagos = Pago::with(['socioProfile.user', 'comprobante'])
            ->when($estado, fn ($q) => $q->where('estado', $estado))
            ->when($concepto, fn ($q) => $q->where('tipo_concepto', $concepto))
            ->when($busqueda, function ($query, $busqueda) {
                $query->whereHas('socioProfile.user', function ($q) use ($busqueda) {
                    $q->where('nombre', 'like', "%{$busqueda}%")
                      ->orWhere('apellido', 'like', "%{$busqueda}%")
                      ->orWhere('dni', 'like', "%{$busqueda}%");
                })->orWhereHas('comprobante', function ($q) use ($busqueda) {
                    $q->where('codigo_transaccion', 'like', "%{$busqueda}%");
                });
            })
            ->latest('fecha_pago')
            ->paginate(20)
            ->withQueryString();

        $totalRecaudadoMes = Pago::where('estado', 'aprobado')
            ->whereMonth('fecha_pago', now()->month)
            ->whereYear('fecha_pago', now()->year)
            ->sum('monto');

        return Inertia::render('Admin/Pagos/Index', [
            'pagos' => $pagos,
            'totalRecaudadoMes' => (float) $totalRecaudadoMes,
            'filtros' => [
                'estado' => $estado,
                'concepto' => $concepto,
                'q' => $busqueda,
            ],
        ]);
    }

    /**
     * Formulario de cobro presencial en tesorería/sede (RF22).
     */
    public function create(): Response
    {
        $socios = SocioProfile::with('user:id,nombre,apellido,dni')
            ->orderBy('id', 'asc')
            ->get();

        return Inertia::render('Admin/Pagos/Create', [
            'socios' => $socios,
        ]);
    }

    /**
     * Asienta un pago manual presencial y emite su comprobante transaccional (RF22, RF23, RF24).
     */
    public function store(Request $request, PagoService $pagoService): RedirectResponse
    {
        $validated = $request->validate([
            'socio_profile_id' => ['required', 'exists:socio_profiles,id'],
            'monto' => ['required', 'numeric', 'min:1'],
            'tipo_concepto' => ['required', Rule::in(['cuota_mensual', 'plan_inicial', 'derecho_linea_diario', 'inscripcion_evento', 'compra_insumos'])],
            'periodo_imputado' => ['nullable', 'string', 'max:10'],
            'metodo_pago' => ['required', Rule::in(['efectivo', 'transferencia', 'tarjeta', 'pasarela_online'])],
        ]);

        $pago = $pagoService->registrarPago([
            'socio_profile_id' => (int) $validated['socio_profile_id'],
            'monto' => $validated['monto'],
            'tipo_concepto' => $validated['tipo_concepto'],
            'periodo_imputado' => $validated['periodo_imputado'] ?? null,
            'metodo_pago' => $validated['metodo_pago'],
            'estado' => 'aprobado',
        ]);

        return redirect()->route('admin.pagos.index')->with('success', "Pago asentado correctamente. Comprobante {$pago->comprobante?->codigo_transaccion} emitido.");
    }

    /**
     * Emite y descarga el recibo oficial en formato PDF para contaduría/tesorería (RF24).
     */
    public function descargarPdf(Pago $pago): HttpResponse
    {
        $pago->load(['socioProfile.user', 'comprobante']);

        $pdf = Pdf::loadView('pdf.comprobante', [
            'pago' => $pago,
            'comprobante' => $pago->comprobante,
        ]);

        $filename = "recibo_{$pago->comprobante?->codigo_transaccion}.pdf";

        return $pdf->download($filename);
    }

    /**
     * Anula un pago registrado y revierte el comprobante.
     */
    public function anular(Pago $pago, PagoService $pagoService): RedirectResponse
    {
        $pagoService->anularPago($pago);

        return back()->with('success', "El pago y comprobante {$pago->comprobante?->codigo_transaccion} ha sido anulado.");
    }
}
