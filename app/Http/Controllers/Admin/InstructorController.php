<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\InstructorProfile;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class InstructorController extends Controller
{
    /**
     * Muestra la nómina de instructores habilitados ante ANMaC (RF17, SPECS 6.4).
     */
    public function index(Request $request): Response
    {
        $instructores = InstructorProfile::with(['user'])
            ->withCount('turnos')
            ->orderBy('id', 'asc')
            ->get();

        return Inertia::render('Admin/Instructores/Index', [
            'instructores' => $instructores,
        ]);
    }

    /**
     * Registra un nuevo instructor en el sistema con su matrícula ANMaC (RF17).
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'nombre' => ['required', 'string', 'max:100'],
            'apellido' => ['required', 'string', 'max:100'],
            'dni' => ['required', 'string', 'max:20', 'unique:users,dni'],
            'fecha_nacimiento' => ['required', 'date'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'username' => ['required', 'string', 'min:6', 'max:30', 'unique:users,username'],
            'telefono' => ['nullable', 'string', 'max:30'],
            'matricula_habilitante' => ['required', 'string', 'max:50', 'unique:instructor_profiles,matricula_habilitante'],
            'especialidad' => ['required', 'string', 'max:100'],
            'disponible' => ['boolean'],
            'password' => ['nullable', 'string', 'min:8'],
        ]);

        DB::transaction(function () use ($validated) {
            $user = User::create([
                'nombre' => $validated['nombre'],
                'name' => $validated['nombre'],
                'apellido' => $validated['apellido'],
                'dni' => $validated['dni'],
                'fecha_nacimiento' => $validated['fecha_nacimiento'],
                'email' => $validated['email'],
                'username' => $validated['username'],
                'usuario' => $validated['username'],
                'telefono' => $validated['telefono'] ?? null,
                'rol' => 'instructor',
                'activo' => true,
                'password' => Hash::make($validated['password'] ?? 'InstructorFsa123!'),
            ]);

            InstructorProfile::create([
                'user_id' => $user->id,
                'matricula_habilitante' => $validated['matricula_habilitante'],
                'especialidad' => $validated['especialidad'],
                'disponible' => $validated['disponible'] ?? true,
                'calificacion_promedio' => 5.00,
            ]);
        });

        return back()->with('success', "Instructor '{$validated['nombre']} {$validated['apellido']}' registrado correctamente.");
    }

    /**
     * Actualiza la información profesional de un instructor.
     */
    public function update(Request $request, InstructorProfile $instructor): RedirectResponse
    {
        $user = $instructor->user;

        $validated = $request->validate([
            'nombre' => ['required', 'string', 'max:100'],
            'apellido' => ['required', 'string', 'max:100'],
            'dni' => ['required', 'string', 'max:20', Rule::unique('users', 'dni')->ignore($user->id)],
            'email' => ['required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user->id)],
            'telefono' => ['nullable', 'string', 'max:30'],
            'matricula_habilitante' => [
                'required',
                'string',
                'max:50',
                Rule::unique('instructor_profiles', 'matricula_habilitante')->ignore($instructor->id),
            ],
            'especialidad' => ['required', 'string', 'max:100'],
            'disponible' => ['boolean'],
        ]);

        DB::transaction(function () use ($instructor, $user, $validated) {
            $user->update([
                'nombre' => $validated['nombre'],
                'name' => $validated['nombre'],
                'apellido' => $validated['apellido'],
                'dni' => $validated['dni'],
                'email' => $validated['email'],
                'telefono' => $validated['telefono'] ?? null,
            ]);

            $instructor->update([
                'matricula_habilitante' => $validated['matricula_habilitante'],
                'especialidad' => $validated['especialidad'],
                'disponible' => $validated['disponible'] ?? $instructor->disponible,
            ]);
        });

        return back()->with('success', "Instructor '{$user->nombre} {$user->apellido}' actualizado exitosamente.");
    }

    /**
     * Alterna la disponibilidad o desactiva el instructor.
     */
    public function destroy(InstructorProfile $instructor): RedirectResponse
    {
        if ($instructor->turnos()->whereIn('estado', ['reservado', 'confirmado'])->exists()) {
            return back()->with('error', 'No se puede dar de baja a un instructor con turnos reservados o confirmados pendientes.');
        }

        $instructor->update(['disponible' => false]);
        $instructor->user->update(['activo' => false]);

        return back()->with('success', "El instructor fue dado de baja exitosamente.");
    }
}
