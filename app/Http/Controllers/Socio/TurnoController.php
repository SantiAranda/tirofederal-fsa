<?php

namespace App\Http\Controllers\Socio;

use App\Http\Controllers\Controller;
use App\Http\Requests\Turnos\ReservaTurnoRequest;
use App\Models\Turno;
use App\Services\TurneroService;
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
        $socio = $request->user()->socioProfile;
        $fechaSeleccionada = $request->input('fecha', today()->toDateString());

        $disponibilidad = $this->turneroService->consultarDisponibilidad($fechaSeleccionada);

        $misTurnos = $socio ? $socio->turnos()
            ->with(['lineaDeTiro', 'instructorProfile.user'])
            ->orderByDesc('fecha')
            ->orderByDesc('hora_inicio')
            ->paginate(10) : [];

        return Inertia::render('Socio/Turnos/Index', [
            'fechaSeleccionada' => $fechaSeleccionada,
            'disponibilidad' => $disponibilidad,
            'misTurnos' => $misTurnos,
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
