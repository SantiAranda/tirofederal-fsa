<?php

namespace App\Http\Requests\Admin;

use App\Enums\EstadoCLU;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ValidarCluRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->esPresidente() ?? false;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'estado' => ['required', Rule::in(['aprobado', 'rechazado', 'vencido', 'sin_clu'])],
            'observaciones_auditoria' => ['nullable', 'string', 'max:1000'],
        ];
    }
}
