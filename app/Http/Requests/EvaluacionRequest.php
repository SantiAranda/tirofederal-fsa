<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EvaluacionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->esSocio() ?? false;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'evaluado_type' => ['required', 'string'],
            'evaluado_id' => ['nullable', 'integer'],
            'puntaje_numerico' => ['required', 'integer', 'between:1,5'],
            'comentario' => ['nullable', 'string', 'max:1000'],
        ];
    }
}
