<?php

namespace App\Http\Controllers\Socio;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Panel principal de socio / tirador (RF08, RF10, SPECS 6.2).
     */
    public function index(Request $request): Response|\Illuminate\Http\RedirectResponse
    {
        $user = $request->user();

        if (! $user->activo) {
            return redirect()->route('solicitud.tramite');
        }

        $socio = $user->socioProfile()->with(['membresia', 'credencialLu'])->first();

        $turnosProximos = $socio ? $socio->turnos()
            ->with(['lineaDeTiro', 'instructorProfile.user'])
            ->whereIn('estado', ['reservado', 'confirmado'])
            ->where(function ($q) {
                $q->whereDate('fecha', '>', today()->toDateString())
                    ->orWhere(fn ($q) => $q->whereDate('fecha', today()->toDateString())->where('hora_fin', '>', now()->format('H:i')));
            })
            ->orderBy('fecha')
            ->orderBy('hora_inicio')
            ->take(5)
            ->get() : [];

        $ultimosPagos = $socio ? $socio->pagos()
            ->with('comprobante')
            ->latest('fecha_pago')
            ->take(5)
            ->get() : [];

        return Inertia::render('Socio/Dashboard', [
            'socio' => $socio,
            'turnosProximos' => $turnosProximos,
            'ultimosPagos' => $ultimosPagos,
            'alertaClu' => $socio?->credencialLu?->obtenerAlertaVencimiento(),
        ]);
    }
}
