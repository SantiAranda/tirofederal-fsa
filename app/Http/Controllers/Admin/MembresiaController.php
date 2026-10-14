<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Membresia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class MembresiaController extends Controller
{
    /**
     * Muestra el catálogo de planes de membresía institucionales (RF07, SPECS 6.4).
     */
    public function index(): Response
    {
        $membresias = Membresia::withCount('socioProfiles')
            ->orderBy('id', 'asc')
            ->get();

        return Inertia::render('Admin/Membresias/Index', [
            'membresias' => $membresias,
        ]);
    }

    /**
     * Registra un nuevo plan de membresía o categoría social (RF07).
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'nombre_plan' => ['required', 'string', 'max:100', 'unique:membresias,nombre_plan'],
            'cuota_ingreso' => ['required', 'numeric', 'min:0'],
            'monto_mensual' => ['required', 'numeric', 'min:0'],
            'descripcion' => ['nullable', 'string', 'max:500'],
            'activa' => ['boolean'],
        ]);

        Membresia::create([
            'nombre_plan' => $validated['nombre_plan'],
            'cuota_ingreso' => $validated['cuota_ingreso'],
            'monto_mensual' => $validated['monto_mensual'],
            'descripcion' => $validated['descripcion'] ?? null,
            'activa' => $validated['activa'] ?? true,
        ]);

        return back()->with('success', "El plan de membresía '{$validated['nombre_plan']}' fue creado con éxito.");
    }

    /**
     * Actualiza aranceles o características de un plan existente (RF07).
     */
    public function update(Request $request, Membresia $membresia): RedirectResponse
    {
        $validated = $request->validate([
            'nombre_plan' => [
                'required',
                'string',
                'max:100',
                Rule::unique('membresias', 'nombre_plan')->ignore($membresia->id),
            ],
            'cuota_ingreso' => ['required', 'numeric', 'min:0'],
            'monto_mensual' => ['required', 'numeric', 'min:0'],
            'descripcion' => ['nullable', 'string', 'max:500'],
            'activa' => ['boolean'],
        ]);

        $membresia->update($validated);

        return back()->with('success', "El plan '{$membresia->nombre_plan}' fue actualizado correctamente.");
    }

    /**
     * Da de baja o elimina un plan de membresía si no posee socios vinculados.
     */
    public function destroy(Membresia $membresia): RedirectResponse
    {
        if ($membresia->socioProfiles()->exists()) {
            $membresia->update(['activa' => false]);
            return back()->with('success', "El plan '{$membresia->nombre_plan}' tiene socios asociados, por lo que fue desactivado.");
        }

        $membresia->delete();

        return back()->with('success', "El plan '{$membresia->nombre_plan}' fue eliminado exitosamente.");
    }
}
