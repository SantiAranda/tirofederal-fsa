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
    /**
     * Historial de pagos y estado de cuenta del socio (RF22, RF23, SPECS 6.2).
     */
    public function index(Request $request): Response
    {
        $socio = $request->user()->socioProfile;

        $pagos = $socio ? $socio->pagos()
            ->with('comprobante')
            ->latest('fecha_pago')
            ->paginate(15) : [];

        $totalAbonado = $socio ? $socio->pagos()
            ->where('estado', 'aprobado')
            ->sum('monto') : 0;

        return Inertia::render('Socio/Pagos/Index', [
            'pagos' => $pagos,
            'totalAbonado' => $totalAbonado,
            'estadoHabilitacion' => $socio?->estado_habilitacion,
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
