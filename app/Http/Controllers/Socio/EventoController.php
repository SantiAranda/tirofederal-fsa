<?php

namespace App\Http\Controllers\Socio;

use App\Http\Controllers\Controller;
use App\Models\Evento;
use App\Models\InscripcionEvento;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class EventoController extends Controller
{
    /**
     * Preinscripción en línea a torneos, tiradas o cursos con descuento de cupo (RF27, SPECS 6.2).
     */
    public function inscribir(Evento $evento, Request $request): RedirectResponse
    {
        $socio = $request->user()->socioProfile;

        if (! $socio) {
            abort(403, 'No posee un perfil de socio activo.');
        }

        DB::transaction(function () use ($evento, $socio) {
            // Bloqueo y verificación de cupos concurrentes
            $eventoLock = Evento::where('id', $evento->id)->lockForUpdate()->firstOrFail();

            if (! $eventoLock->publicado) {
                throw ValidationException::withMessages([
                    'evento' => 'El evento seleccionado no se encuentra publicado para inscripciones.',
                ]);
            }

            if ($eventoLock->cupos_disponibles <= 0) {
                throw ValidationException::withMessages([
                    'evento' => 'No quedan cupos disponibles para este evento.',
                ]);
            }

            $yaInscripto = InscripcionEvento::where('evento_id', $eventoLock->id)
                ->where('socio_profile_id', $socio->id)
                ->whereIn('estado', ['preinscripto', 'confirmado'])
                ->exists();

            if ($yaInscripto) {
                throw ValidationException::withMessages([
                    'evento' => 'Ya se encuentra inscripto en este evento.',
                ]);
            }

            InscripcionEvento::create([
                'evento_id' => $eventoLock->id,
                'socio_profile_id' => $socio->id,
                'fecha_inscripcion' => now(),
                'asistencia_confirmada' => false,
                'estado' => 'preinscripto',
            ]);

            $eventoLock->decrement('cupos_disponibles');
        });

        return back()->with('success', "Preinscripción confirmada para el evento '{$evento->titulo}'.");
    }
}
