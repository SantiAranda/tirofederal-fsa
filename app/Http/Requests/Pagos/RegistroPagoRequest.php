<?php

namespace App\Http\Requests\Pagos;

use App\Enums\MetodoPago;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RegistroPagoRequest extends FormRequest
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
            'socio_profile_id' => ['required', 'exists:socio_profiles,id'],
            'monto' => ['required', 'numeric', 'min:0.01'],
            'tipo_concepto' => [
                'required',
                Rule::in([
                    'cuota_mensual',
                    'plan_inicial',
                    'derecho_linea_diario',
                    'inscripcion_evento',
                    'compra_insumos',
                ]),
            ],
            'periodo_imputado' => ['nullable', 'string', 'max:20'],
            'metodo_pago' => ['required', Rule::enum(MetodoPago::class)],
        ];
    }
}
