<?php

namespace App\Http\Controllers\Instructor;

use App\Http\Controllers\Controller;
use App\Models\Evaluacion;
use App\Models\Evento;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CalendarioController extends Controller
{
    /**
     * Calendario interactivo para el Instructor: clases, turnos asignados y evaluaciones (RF19).
     */
    public function index(Request $request): Response
    {
        $instructor = $request->user()->instructorProfile;

        if (!$instructor) {
            abort(403, 'No posee perfil de instructor habilitado.');
        }

        // 1. Turnos asignados a este instructor
        $turnos = $instructor->turnos()
            ->with(['socioProfile.user', 'lineaDeTiro'])
            ->orderBy('fecha')
            ->orderBy('hora_inicio')
            ->get();

        $turnoItems = $turnos->map(function ($tu) {
            $socio = $tu->socioProfile?->user?->name ?? 'Alumno';
            $linea = $tu->lineaDeTiro?->nombre ?? 'Pedana';
            $horaInicio = substr($tu->hora_inicio, 0, 5);
            $horaFin = substr($tu->hora_fin, 0, 5);

            return [
                'id' => 'turno-' . $tu->id,
                'raw_id' => $tu->id,
                'title' => "Clase: {$socio} ({$linea})",
                'date' => Carbon::parse($tu->fecha)->format('Y-m-d'),
                'time' => "{$horaInicio} - {$horaFin}",
                'type' => 'turno',
                'badgeText' => 'Clase en Pedana',
                'status' => $tu->estado,
                'color' => $tu->estado === 'cancelado' ? 'rose' : 'emerald',
                'description' => "Instrucción de tiro práctico y medidas de seguridad con el alumno {$socio} en {$linea}.",
                'location' => $linea,
                'socio' => $socio,
                'link' => route('instructor.agenda.index'),
                'linkText' => 'Ver en Agenda de Pedanas',
            ];
        });

        // 2. Evaluaciones de idoneidad asignadas
        $evaluaciones = Evaluacion::where('instructor_id', $instructor->id)
            ->with('socioProfile.user')
            ->orderBy('fecha_evaluacion')
            ->get();

        $evaluacionItems = $evaluaciones->map(function ($ev) {
            $socio = $ev->socioProfile?->user?->name ?? 'Aspirante';
            $fecha = Carbon::parse($ev->fecha_evaluacion);
            return [
                'id' => 'eval-' . $ev->id,
                'raw_id' => $ev->id,
                'title' => "Evaluación de Idoneidad: {$socio}",
                'date' => $fecha->format('Y-m-d'),
                'time' => $fecha->format('H:i'),
                'type' => 'evaluacion',
                'badgeText' => 'Evaluación CLU',
                'status' => $ev->aprobado ? 'aprobado' : 'pendiente',
                'color' => 'cyan',
                'description' => "Examen teórico-práctico de idoneidad técnica en polígono.",
                'socio' => $socio,
                'location' => 'Pedana de Pruebas ANMaC',
                'link' => route('instructor.evaluaciones.index'),
                'linkText' => 'Ver Planilla de Evaluación',
            ];
        });

        // 3. Eventos y Torneos del club
        $eventos = Evento::where('publicado', true)
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
                    'torneo' => 'Torneo Oficial',
                    'tirada_nocturna' => 'Tirada Nocturna',
                    'curso_capacitacion', 'curso' => 'Curso de Tiro',
                    default => 'Evento Institucional'
                },
                'status' => 'Programado',
                'color' => 'blue',
                'description' => $ev->descripcion,
                'location' => 'Polígono Principal / Pedanas',
                'link' => route('public.eventos.show', $ev->id),
                'linkText' => 'Ver cronograma del evento',
            ];
        });

        $allItems = $turnoItems->concat($evaluacionItems)->concat($eventoItems)->values();

        return Inertia::render('Instructor/Calendario/Index', [
            'items' => $allItems,
            'metricas' => [
                'clasesProgramadas' => $turnos->where('fecha', '>=', today()->toDateString())->where('estado', '!=', 'cancelado')->count(),
                'clasesHoy' => $turnos->where('fecha', today()->toDateString())->count(),
                'evaluaciones' => $evaluaciones->count(),
            ],
        ]);
    }
}
