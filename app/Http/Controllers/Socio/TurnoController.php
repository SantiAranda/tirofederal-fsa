<?php

namespace App\Http\Controllers\Socio;

use App\Http\Controllers\Controller;
use App\Http\Requests\Turnos\ReservaTurnoRequest;
use App\Models\Turno;
use App\Services\TurneroService;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class TurnoController extends Controller
{
    public function __construct(
        protected TurneroService $turneroService
    ) {}

    /**
     * Muestra la grilla del turnero interactivo y las reservas del socio (RF14, RF18).
     */
    public function index(Request $request): Response
    {
        $socio = $request->user()->socioProfile()->with('credencialLu')->first();

        $fechaSeleccionada = $request->input('fecha');
        if (! $fechaSeleccionada || ! strtotime($fechaSeleccionada) || Carbon::parse($fechaSeleccionada)->lt(today())) {
            $fechaSeleccionada = today()->toDateString();
        }
        $fechaSeleccionada = Carbon::parse($fechaSeleccionada)->toDateString();

        $disponibilidad = $this->turneroService->consultarDisponibilidad($fechaSeleccionada);

        $hoy = today()->toDateString();
        $ahora = now()->format('H:i');
        $relaciones = ['lineaDeTiro:id,nombre,numero_linea', 'instructorProfile.user:id,nombre,apellido'];

        // Próximos: reservas activas cuya fecha/hora de fin todavía no pasó.
        $proximos = $socio ? $socio->turnos()
            ->with($relaciones)
            ->whereIn('estado', ['reservado', 'confirmado'])
            ->where(function ($q) use ($hoy, $ahora) {
                $q->whereDate('fecha', '>', $hoy)
                    ->orWhere(fn ($q) => $q->whereDate('fecha', $hoy)->where('hora_fin', '>', $ahora));
            })
            ->orderBy('fecha')
            ->orderBy('hora_inicio')
            ->get() : collect();

        // Historial: todo lo demás (turnos ya pasados, cancelados o asistidos), del más reciente al más viejo.
        $historial = $socio ? $socio->turnos()
            ->with($relaciones)
            ->whereNotIn('id', $proximos->pluck('id'))
            ->orderByDesc('fecha')
            ->orderByDesc('hora_inicio')
            ->take(30)
            ->get() : collect();

        return Inertia::render('Socio/Turnos/Index', [
            'fechaSeleccionada' => $fechaSeleccionada,
            'hoy' => $hoy,
            'lineas' => $disponibilidad['lineas'],
            'instructores' => $disponibilidad['instructores']->map(fn ($i) => [
                'id' => $i->id,
                'nombre' => trim(($i->user?->nombre ?? '') . ' ' . ($i->user?->apellido ?? '')),
            ])->values(),
            'grilla' => $this->turneroService->grillaHoraria($fechaSeleccionada),
            'condiciones' => $socio ? [
                'en_mora' => $socio->estaEnMora(),
                ...$this->turneroService->condicionesReserva($socio),
            ] : null,
            'proximos' => $proximos,
            'historial' => $historial,
        ]);
    }

    /**
     * Registra una nueva reserva de pedana con verificación de concurrencia y reglas CLU (RF14, RF15, RF25).
     */
    public function store(ReservaTurnoRequest $request): RedirectResponse
    {
        $socio = $request->user()->socioProfile;

        if (! $socio) {
            abort(403, 'No posee un perfil de socio activo.');
        }

        $data = array_merge($request->validated(), [
            'socio_profile_id' => $socio->id,
        ]);

        $turno = $this->turneroService->reservarTurno($data);

        return back()->with('success', "Turno reservado exitosamente para el {$turno->fecha->format('d/m/Y')} a las {$turno->hora_inicio}.");
    }

    /**
     * Cancela una reserva anticipadamente y libera la línea de tiro (RF14).
     */
    public function cancel(Turno $turno): RedirectResponse
    {
        Gate::authorize('cancel', $turno);

        $this->turneroService->cancelarTurno($turno);

        return back()->with('success', 'El turno ha sido cancelado y el cupo liberado.');
    }
}
