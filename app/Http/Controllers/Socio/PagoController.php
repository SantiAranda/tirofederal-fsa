<?php

namespace App\Http\Controllers\Socio;

use App\Http\Controllers\Controller;
use App\Models\Pago;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class PagoController extends Controller
{
    private const CONCEPTOS = [
        'cuota_mensual' => 'Cuota mensual',
        'plan_inicial' => 'Plan inicial',
        'derecho_linea_diario' => 'Derecho de línea diario',
        'inscripcion_evento' => 'Inscripción a evento',
        'compra_insumos' => 'Compra de insumos',
    ];

    /**
     * Historial de pagos y estado de cuenta del socio (RF22, RF23, SPECS 6.2).
     */
    public function index(Request $request): Response
    {
        $socio = $request->user()->socioProfile;

        $pagos = $socio
            ? $socio->pagos()
                ->with('comprobante')
                ->latest('fecha_pago')
                ->latest('id')
                ->paginate(15)
                ->through(fn (Pago $pago) => [
                    'id' => $pago->id,
                    'concepto' => self::CONCEPTOS[$pago->tipo_concepto] ?? $pago->tipo_concepto,
                    'periodo' => $pago->periodo_imputado,
                    'monto' => (float) $pago->monto,
                    'metodo' => $pago->metodo_pago?->label(),
                    'fecha_pago' => $pago->fecha_pago?->toDateString(),
                    'estado' => $pago->estado,
                    'codigo' => $pago->comprobante?->codigo_transaccion,
                    'tiene_comprobante' => $pago->comprobante !== null,
                ])
            : null;

        $totalAbonadoAnio = $socio
            ? (float) $socio->pagos()
                ->where('estado', 'aprobado')
                ->whereYear('fecha_pago', now()->year)
                ->sum('monto')
            : 0.0;

        // El próximo vencimiento solo tiene sentido si el socio ya abona cuotas.
        $ultimaCuota = $socio?->pagos()
            ->where('estado', 'aprobado')
            ->whereIn('tipo_concepto', ['cuota_mensual', 'plan_inicial'])
            ->latest('fecha_pago')
            ->first();

        $estado = $socio?->estado_habilitacion;

        return Inertia::render('Socio/Pagos/Index', [
            'pagos' => $pagos,
            'totalAbonadoAnio' => $totalAbonadoAnio,
            'estadoHabilitacion' => $estado ? [
                'valor' => $estado->value,
                'etiqueta' => $estado->label(),
            ] : null,
            'proximoVencimiento' => $ultimaCuota
                ? now()->addMonthNoOverflow()->startOfMonth()->toDateString()
                : null,
        ]);
    }

    /**
     * Genera y descarga el recibo oficial en PDF mediante DomPDF (RF24, SPECS 6.2).
     */
    public function descargarPdf(Pago $pago): HttpResponse
    {
        Gate::authorize('downloadPdf', $pago);

        $pago->load(['socioProfile.user', 'comprobante']);

        $pdf = Pdf::loadView('pdf.comprobante', [
            'pago' => $pago,
            'comprobante' => $pago->comprobante,
        ]);

        $filename = "recibo_{$pago->comprobante?->codigo_transaccion}.pdf";

        return $pdf->download($filename);
    }
}
