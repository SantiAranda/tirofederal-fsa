<?php

namespace App\Http\Controllers\Instructor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EvaluacionController extends Controller
{
    /**
     * Visualización de calificaciones recibidas por el instructor (RF17, RF20, SPECS 6.3).
     */
    public function index(Request $request): Response
    {
        $instructor = $request->user()->instructorProfile;

        if (! $instructor) {
            abort(403, 'No posee perfil de instructor habilitado.');
        }

        $evaluaciones = $instructor->evaluaciones()
            ->with('socioProfile.user')
            ->latest()
            ->paginate(15);

        return Inertia::render('Instructor/Evaluaciones', [
            'instructor' => $instructor,
            'evaluaciones' => $evaluaciones,
            'calificacionPromedio' => $instructor->calificacion_promedio,
        ]);
    }
}
