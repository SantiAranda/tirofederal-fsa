<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Evaluacion;
use App\Models\Evento;
use App\Models\Turno;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CalendarioController extends Controller
{
    /**
     * Calendario unificado de actividades del polígono para la Administración (RF19, RF26).
     */
    public function index(Request $request): Response
    {
        // 1. Eventos y Torneos
        $eventos = Evento::withCount('inscripciones')
            ->orderBy('fecha_evento')
            ->get();

        $eventoItems = $eventos->map(function ($ev) {
            $date = Carbon::parse($ev->fecha_evento);
            return [
                'id' => 'evento-' . $ev->id,
                'raw_id' => $ev->id,
                'title' => $ev->titulo,
                'date' => $date->format('Y-m-d'),
                'time' => $date->format('H:i'),
                'type' => $ev->tipo_evento,
                'badgeText' => match($ev->tipo_evento) {
                    'torneo' => 'Torneo',
                    'tirada_nocturna' => 'Tirada Nocturna',
                    'curso_capacitacion', 'curso' => 'Curso / Clínica',
                    default => 'Evento'
                },
                'status' => $ev->publicado ? 'publicado' : 'borrador',
                'color' => match($ev->tipo_evento) {
                    'torneo' => 'blue',
                    'tirada_nocturna' => 'purple',
                    'curso_capacitacion', 'curso' => 'amber',
                    default => 'indigo'
                },
                'description' => $ev->descripcion,
                'cupos' => "{$ev->inscripciones_count} inscriptos (Cupo: {$ev->cupo_maximo})",
                'costo' => (float) $ev->costo_inscripcion,
                'location' => 'Polígono Principal / Pedanas',
                'link' => route('admin.eventos.inscriptos', $ev->id),
                'linkText' => 'Gestionar Inscriptos',
            ];
        });

        // 2. Turnos de Pedana reservados
        $turnos = Turno::with(['socioProfile.user', 'lineaDeTiro', 'instructorProfile.user'])
            ->orderBy('fecha')
            ->orderBy('hora_inicio')
            ->get();

        $turnoItems = $turnos->map(function ($tu) {
            $socioNombre = $tu->socioProfile?->user?->name ?? 'Socio';
            $lineaNombre = $tu->lineaDeTiro?->nombre ?? 'Pedana';
            $instructorNombre = $tu->instructorProfile?->user?->name;
            $horaInicio = substr($tu->hora_inicio, 0, 5);
            $horaFin = substr($tu->hora_fin, 0, 5);

            return [
                'id' => 'turno-' . $tu->id,
                'raw_id' => $tu->id,
                'title' => "Turno {$lineaNombre} ({$socioNombre})",
                'date' => Carbon::parse($tu->fecha)->format('Y-m-d'),
                'time' => "{$horaInicio} - {$horaFin}",
                'type' => 'turno',
                'badgeText' => "Turno {$lineaNombre}",
                'status' => $tu->estado,
                'color' => $tu->estado === 'cancelado' ? 'rose' : 'emerald',
                'description' => $tu->observaciones ?: "Práctica en {$lineaNombre}. Modalidad: " . ($tu->es_practica_individual_dia ? 'Tirador Diario' : 'Socio Activo'),
                'location' => $lineaNombre,
                'socio' => $socioNombre,
                'instructor' => $instructorNombre,
                'costo' => (float) $tu->monto_arancel,
            ];
        });

        // 3. Evaluaciones técnicas
        $evaluaciones = Evaluacion::with('socioProfile.user')
            ->orderBy('fecha_evaluacion')
            ->get();

        $evaluacionItems = $evaluaciones->map(function ($ev) {
            $socio = $ev->socioProfile?->user?->name ?? 'Aspirante';
            $fecha = Carbon::parse($ev->fecha_evaluacion);
            return [
                'id' => 'eval-' . $ev->id,
                'raw_id' => $ev->id,
                'title' => "Evaluación Técnica: {$socio}",
                'date' => $fecha->format('Y-m-d'),
                'time' => $fecha->format('H:i'),
                'type' => 'evaluacion',
                'badgeText' => 'Evaluación ANMaC',
                'status' => $ev->aprobado ? 'aprobado' : 'pendiente',
                'color' => 'cyan',
                'description' => "Evaluación de idoneidad en tiro para legitimación CLU. Dictamen: " . ($ev->aprobado ? 'Aprobado' : 'Observado'),
                'socio' => $socio,
                'location' => 'Línea de Evaluación y Tiro Práctico',
            ];
        });

        $allItems = $eventoItems->concat($turnoItems)->concat($evaluacionItems)->values();

        return Inertia::render('Admin/Calendario/Index', [
            'items' => $allItems,
            'metricas' => [
                'totalEventos' => $eventos->count(),
                'totalTurnos' => $turnos->where('estado', '!=', 'cancelado')->count(),
                'turnosHoy' => $turnos->where('fecha', today()->toDateString())->count(),
                'evaluaciones' => $evaluaciones->count(),
            ],
        ]);
    }
}
