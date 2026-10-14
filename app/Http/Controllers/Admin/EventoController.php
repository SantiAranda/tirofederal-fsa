<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Evento;
use App\Models\InscripcionEvento;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class EventoController extends Controller
{
    /**
     * Muestra el calendario de torneos, cursos y tiradas (RF26, RF27, SPECS 6.4).
     */
    public function index(Request $request): Response
    {
        $tipo = $request->input('tipo');

        $eventos = Evento::withCount('inscripciones')
            ->when($tipo, fn ($q) => $q->where('tipo_evento', $tipo))
            ->orderBy('fecha_evento', 'desc')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/Eventos/Index', [
            'eventos' => $eventos,
            'filtros' => [
                'tipo' => $tipo,
            ],
        ]);
    }

    /**
     * Formulario para crear un nuevo evento institucional.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Eventos/Create');
    }

    /**
     * Registra un nuevo evento o torneo deportivo (RF26).
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'titulo' => ['required', 'string', 'max:150'],
            'descripcion' => ['required', 'string'],
            'tipo_evento' => ['required', Rule::in(['torneo', 'tirada_nocturna', 'curso_capacitacion'])],
            'fecha_evento' => ['required', 'date', 'after:now'],
            'cupo_maximo' => ['required', 'integer', 'min:1'],
            'costo_inscripcion' => ['required', 'numeric', 'min:0'],
            'publicado' => ['boolean'],
        ]);

        Evento::create([
            'titulo' => $validated['titulo'],
            'descripcion' => $validated['descripcion'],
            'tipo_evento' => $validated['tipo_evento'],
            'fecha_evento' => $validated['fecha_evento'],
            'cupo_maximo' => $validated['cupo_maximo'],
            'cupos_disponibles' => $validated['cupo_maximo'],
            'costo_inscripcion' => $validated['costo_inscripcion'],
            'publicado' => $validated['publicado'] ?? true,
        ]);

        return redirect()->route('admin.eventos.index')->with('success', "Evento '{$validated['titulo']}' creado con éxito.");
    }

    /**
     * Formulario de edición del evento.
     */
    public function edit(Evento $evento): Response
    {
        return Inertia::render('Admin/Eventos/Edit', [
            'evento' => $evento,
        ]);
    }

    /**
     * Actualiza los datos de un evento (RF26).
     */
    public function update(Request $request, Evento $evento): RedirectResponse
    {
        $validated = $request->validate([
            'titulo' => ['required', 'string', 'max:150'],
            'descripcion' => ['required', 'string'],
            'tipo_evento' => ['required', Rule::in(['torneo', 'tirada_nocturna', 'curso_capacitacion'])],
            'fecha_evento' => ['required', 'date'],
            'cupo_maximo' => ['required', 'integer', 'min:1'],
            'costo_inscripcion' => ['required', 'numeric', 'min:0'],
            'publicado' => ['boolean'],
        ]);

        // Ajuste proporcional de cupos disponibles si cambió el cupo máximo
        $diferenciaCupo = $validated['cupo_maximo'] - $evento->cupo_maximo;
        $nuevosDisponibles = max(0, $evento->cupos_disponibles + $diferenciaCupo);

        $evento->update([
            'titulo' => $validated['titulo'],
            'descripcion' => $validated['descripcion'],
            'tipo_evento' => $validated['tipo_evento'],
            'fecha_evento' => $validated['fecha_evento'],
            'cupo_maximo' => $validated['cupo_maximo'],
            'cupos_disponibles' => $nuevosDisponibles,
            'costo_inscripcion' => $validated['costo_inscripcion'],
            'publicado' => $validated['publicado'] ?? $evento->publicado,
        ]);

        return redirect()->route('admin.eventos.index')->with('success', "Evento '{$evento->titulo}' actualizado correctamente.");
    }

    /**
     * Muestra la nómina de socios preinscriptos y confirmados en el evento (RF27).
     */
    public function inscriptos(Evento $evento): Response
    {
        $inscripciones = $evento->inscripciones()
            ->with(['socioProfile.user', 'pago.comprobante'])
            ->latest('fecha_inscripcion')
            ->get();

        return Inertia::render('Admin/Eventos/Inscriptos', [
            'evento' => $evento,
            'inscripciones' => $inscripciones,
        ]);
    }

    /**
     * Asienta la asistencia efectiva del participante en la mesa de tiro o torneo (RF27).
     */
    public function confirmarAsistencia(InscripcionEvento $inscripcion): RedirectResponse
    {
        $inscripcion->update([
            'asistencia_confirmada' => true,
            'estado' => 'confirmado',
        ]);

        return back()->with('success', 'Asistencia confirmada para el participante.');
    }

    /**
     * Elimina un evento institucional.
     */
    public function destroy(Evento $evento): RedirectResponse
    {
        if ($evento->inscripciones()->where('estado', 'confirmado')->exists()) {
            return back()->with('error', 'No se puede eliminar un evento que tiene inscripciones confirmadas.');
        }

        $evento->delete();

        return back()->with('success', "El evento '{$evento->titulo}' fue eliminado.");
    }
}
