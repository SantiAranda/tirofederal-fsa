<?php

namespace App\Http\Controllers\Admin;

use App\Enums\EstadoSocio;
use App\Http\Controllers\Controller;
use App\Models\Evaluacion;
use App\Models\Pago;
use App\Models\SocioProfile;
use App\Models\Turno;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Métricas de afluencia, recaudación, padrón y calidad para Presidencia (RF21, RF34, SPECS 6.4).
     */
    public function index(): Response
    {
        $totalSociosActivos = SocioProfile::where('estado_habilitacion', EstadoSocio::ACTIVO)->count();
        $totalSociosMora = SocioProfile::where('estado_habilitacion', EstadoSocio::EN_MORA)->count();
        $totalSociosPendientes = SocioProfile::where('estado_habilitacion', EstadoSocio::PENDIENTE_VALIDACION)->count();

        $recaudacionMes = Pago::where('estado', 'aprobado')
            ->whereMonth('fecha_pago', now()->month)
            ->whereYear('fecha_pago', now()->year)
            ->sum('monto');

        $turnosHoy = Turno::where('fecha', today()->toDateString())
            ->whereIn('estado', ['reservado', 'confirmado', 'asistido'])
            ->count();

        $promedioCalidad = Evaluacion::avg('puntaje_numerico') ?? 5.0;

        return Inertia::render('Admin/Dashboard', [
            'metricas' => [
                'socios_activos' => $totalSociosActivos,
                'socios_mora' => $totalSociosMora,
                'socios_pendientes' => $totalSociosPendientes,
                'recaudacion_mes' => (float) $recaudacionMes,
                'turnos_hoy' => $turnosHoy,
                'promedio_calidad' => round((float) $promedioCalidad, 2),
            ],
        ]);
    }
}
