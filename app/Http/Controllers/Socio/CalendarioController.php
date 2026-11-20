<?php

namespace App\Http\Controllers\Socio;

use App\Http\Controllers\Controller;
use App\Models\Evento;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CalendarioController extends Controller
{
    /**
     * Calendario interactivo personalizado para el socio (RF14, RF26).
     */
    public function index(Request $request): Response
    {
        $socio = $request->user()->socioProfile;

        // 1. Turnos de pedana del socio
        $turnos = $socio ? $socio->turnos()
            ->with(['lineaDeTiro', 'instructorProfile.user'])
            ->orderBy('fecha')
            ->orderBy('hora_inicio')
            ->get() : collect();

        $turnoItems = $turnos->map(function ($tu) {
            $lineaNombre = $tu->lineaDeTiro?->nombre ?? 'Pedana';
            $instructor = $tu->instructorProfile?->user?->name;
            $horaInicio = substr($tu->hora_inicio, 0, 5);
            $horaFin = substr($tu->hora_fin, 0, 5);

            return [
                'id' => 'turno-' . $tu->id,
                'raw_id' => $tu->id,
                'title' => "Mi Turno: {$lineaNombre}",
                'date' => Carbon::parse($tu->fecha)->format('Y-m-d'),
                'time' => "{$horaInicio} - {$horaFin}",
                'type' => 'turno',
                'badgeText' => 'Mi Turno',
                'status' => $tu->estado,
                'color' => $tu->estado === 'cancelado' ? 'rose' : 'emerald',
                'description' => "Práctica deportiva reservada en {$lineaNombre}. " . ($tu->observaciones ? "Nota: {$tu->observaciones}" : ''),
                'location' => $lineaNombre,
                'instructor' => $instructor,
                'costo' => (float) $tu->monto_arancel,
                'link' => route('socio.turnos.index'),
                'linkText' => 'Administrar mis turnos',
            ];
        });

        // 2. Eventos donde está inscripto
        $inscripciones = $socio ? $socio->inscripcionesEvento()
            ->with('evento')
            ->get() : collect();

        $inscripcionIds = $inscripciones->pluck('evento_id')->all();

        $misEventosItems = $inscripciones->map(function ($ins) {
            $ev = $ins->evento;
            if (!$ev) return null;
            $date = Carbon::parse($ev->fecha_evento);

            return [
                'id' => 'evento-inscripto-' . $ev->id,
                'raw_id' => $ev->id,
                'title' => "Inscripto: {$ev->titulo}",
                'date' => $date->format('Y-m-d'),
                'time' => $date->format('H:i'),
                'type' => $ev->tipo_evento,
                'badgeText' => 'Inscripto',
                'status' => $ins->estado,
                'color' => 'blue',
                'description' => $ev->descripcion,
                'location' => 'Polígono Principal / Pedanas',
                'costo' => (float) $ev->costo_inscripcion,
                'link' => route('public.eventos.show', $ev->id),
                'linkText' => 'Ver detalles del evento',
            ];
        })->filter();

        // 3. Otros eventos abiertos del club donde no está inscripto
        $otrosEventos = Evento::where('publicado', true)
            ->whereNotIn('id', $inscripcionIds)
            ->where('fecha_evento', '>=', now())
            ->orderBy('fecha_evento')
            ->get();

        $otrosEventosItems = $otrosEventos->map(function ($ev) {
            $date = Carbon::parse($ev->fecha_evento);

            return [
                'id' => 'evento-' . $ev->id,
                'raw_id' => $ev->id,
                'title' => $ev->titulo,
                'date' => $date->format('Y-m-d'),
                'time' => $date->format('H:i'),
                'type' => $ev->tipo_evento,
                'badgeText' => match($ev->tipo_evento) {
                    'torneo' => 'Torneo Abierto',
                    'tirada_nocturna' => 'Tirada Nocturna',
                    'curso_capacitacion', 'curso' => 'Curso / Clínica',
                    default => 'Evento Club'
                },
                'status' => 'Abierto',
                'color' => 'indigo',
                'description' => $ev->descripcion,
                'location' => 'Polígono Principal / Pedanas',
                'cupos' => "{$ev->cupos_disponibles} lugares disponibles",
                'costo' => (float) $ev->costo_inscripcion,
                'link' => route('public.eventos.show', $ev->id),
                'linkText' => 'Inscribirme ahora',
            ];
        });

        $allItems = $turnoItems->concat($misEventosItems)->concat($otrosEventosItems)->values();

        return Inertia::render('Socio/Calendario/Index', [
            'items' => $allItems,
            'misTurnosActivos' => $turnos->where('fecha', '>=', today()->toDateString())->where('estado', '!=', 'cancelado')->count(),
            'misInscripciones' => $inscripciones->count(),
        ]);
    }
}
