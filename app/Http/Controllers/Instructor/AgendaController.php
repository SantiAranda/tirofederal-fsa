<?php

namespace App\Http\Controllers\Instructor;

use App\Http\Controllers\Controller;
use App\Models\Turno;
use App\Services\TurneroService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class AgendaController extends Controller
{
    public function __construct(
        protected TurneroService $turneroService
    ) {}

    /**
     * Agenda del instructor con turnos asignados, alumnos y armamento requerido (RF19, SPECS 6.3).
     */
    public function index(Request $request): Response
    {
        $instructor = $request->user()->instructorProfile;

        if (! $instructor) {
            abort(403, 'No posee perfil de instructor habilitado.');
        }

        $turnos = $instructor->turnos()
            ->with(['socioProfile.user', 'socioProfile.credencialLu', 'lineaDeTiro'])
            ->orderBy('fecha')
            ->orderBy('hora_inicio')
            ->paginate(15);

        return Inertia::render('Instructor/Agenda', [
            'instructor' => $instructor,
            'turnos' => $turnos,
        ]);
    }

    /**
     * Confirma la asistencia presencial en pedana de tiro (RF19, RF20).
     */
    public function confirmar(Turno $turno): RedirectResponse
    {
        Gate::authorize('confirmAttendance', $turno);

        $this->turneroService->confirmarAsistencia($turno);

        return back()->with('success', 'Asistencia confirmada en pedana.');
    }
}
