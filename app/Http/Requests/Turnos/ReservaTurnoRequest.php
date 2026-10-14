<?php

namespace App\Http\Requests\Turnos;

use Illuminate\Foundation\Http\FormRequest;

class ReservaTurnoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'linea_de_tiro_id' => ['required', 'exists:lineas_de_tiro,id'],
            'instructor_profile_id' => ['nullable', 'exists:instructor_profiles,id'],
            'fecha' => ['required', 'date', 'after_or_equal:today'],
            'hora_inicio' => ['required', 'date_format:H:i'],
            'hora_fin' => ['nullable', 'date_format:H:i', 'after:hora_inicio'],
            'es_practica_individual_dia' => ['nullable', 'boolean'],
            'observaciones' => ['nullable', 'string', 'max:500'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'linea_de_tiro_id.required' => 'Debe seleccionar una línea de tiro.',
            'fecha.after_or_equal' => 'La fecha del turno debe ser hoy o posterior.',
            'hora_fin.after' => 'La hora de finalización debe ser posterior a la de inicio.',
        ];
    }
}
