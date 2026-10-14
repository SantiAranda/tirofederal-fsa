<?php

namespace App\Http\Controllers\Socio;

use App\Http\Controllers\Controller;
use App\Http\Requests\EvaluacionRequest;
use App\Models\Evaluacion;
use App\Models\InstructorProfile;
use Illuminate\Http\RedirectResponse;

class EvaluacionController extends Controller
{
    /**
     * Envía calificación (1-5) y reseña tras asistir a práctica o evento (RF12, RF20, SPECS 6.2).
     */
    public function store(EvaluacionRequest $request): RedirectResponse
    {
        $socio = $request->user()->socioProfile;

        if (! $socio) {
            abort(403, 'No posee perfil de socio activo.');
        }

        $validated = $request->validated();

        $evaluacion = Evaluacion::create([
            'socio_profile_id' => $socio->id,
            'evaluado_type' => $validated['evaluado_type'],
            'evaluado_id' => $validated['evaluado_id'] ?? null,
            'puntaje_numerico' => $validated['puntaje_numerico'],
            'comentario' => $validated['comentario'] ?? null,
            'aprobada_publicacion' => false, // Requiere aprobación de presidencia para publicarse en la home
        ]);

        // Si se evaluó a un instructor, actualizar su promedio acumulado (RF17)
        if ($validated['evaluado_type'] === InstructorProfile::class && ! empty($validated['evaluado_id'])) {
            $instructor = InstructorProfile::find($validated['evaluado_id']);
            if ($instructor) {
                $promedio = Evaluacion::where('evaluado_type', InstructorProfile::class)
                    ->where('evaluado_id', $instructor->id)
                    ->avg('puntaje_numerico');

                $instructor->update([
                    'calificacion_promedio' => round((float) $promedio, 2),
                ]);
            }
        }

        return back()->with('success', '¡Gracias por su calificación y reseña! Su opinión contribuye a la mejora continua del club.');
    }
}
