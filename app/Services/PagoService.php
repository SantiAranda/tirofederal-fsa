<?php

namespace App\Services;

use App\Enums\EstadoSocio;
use App\Models\Comprobante;
use App\Models\Pago;
use App\Models\SocioProfile;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class PagoService
{
    /**
     * Registra un nuevo cobro/pago institucional con su comprobante único (RF22, RF23, RF24, SPECS 3.8).
     *
     * @param  array{
     *     socio_profile_id: int,
     *     monto: float|int|string,
     *     tipo_concepto: string,
     *     periodo_imputado?: string|null,
     *     metodo_pago: string,
     *     estado?: string,
     * }  $data
     * @throws ValidationException
     */
    public function registrarPago(array $data): Pago
    {
        return DB::transaction(function () use ($data) {
            $socio = SocioProfile::findOrFail($data['socio_profile_id']);

            $pago = Pago::create([
                'socio_profile_id' => $socio->id,
                'monto' => $data['monto'],
                'fecha_pago' => now(),
                'tipo_concepto' => $data['tipo_concepto'],
                'periodo_imputado' => $data['periodo_imputado'] ?? null,
                'metodo_pago' => $data['metodo_pago'],
                'estado' => $data['estado'] ?? 'aprobado',
            ]);

            // Generar código de transacción institucional único (ej. TFF-2026-000145)
            $anio = now()->year;
            $codigo = sprintf('TFF-%d-%06d', $anio, $pago->id);

            Comprobante::create([
                'pago_id' => $pago->id,
                'codigo_transaccion' => $codigo,
                'fecha_emision' => now(),
                'pdf_path' => null, // Generado bajo demanda o en background por DomPDF
            ]);

            // Si el pago cancela cuotas y el socio estaba en mora, reactivar su estado (RF08)
            if (in_array($pago->tipo_concepto, ['cuota_mensual', 'plan_inicial'], true) && $pago->estado === 'aprobado') {
                if ($socio->estado_habilitacion === EstadoSocio::EN_MORA) {
                    $socio->estado_habilitacion = EstadoSocio::ACTIVO;
                    $socio->save();
                }
            }

            return $pago->load('comprobante');
        });
    }

    /**
     * Anula un pago registrado y revierte su impacto contable.
     */
    public function anularPago(Pago $pago): Pago
    {
        $pago->update(['estado' => 'anulado']);
        return $pago;
    }
}
