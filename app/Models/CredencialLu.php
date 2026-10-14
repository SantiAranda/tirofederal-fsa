<?php

namespace App\Models;

use App\Enums\EstadoCLU;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CredencialLu extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'credenciales_lu';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'socio_profile_id',
        'numero_clu',
        'fecha_emision',
        'fecha_vencimiento',
        'foto_dni_frente_path',
        'foto_dni_dorso_path',
        'foto_clu_frente_path',
        'foto_clu_dorso_path',
        'apto_psicofisico',
        'certificado_idoneidad',
        'estado_validacion',
        'observaciones_auditoria',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'fecha_emision' => 'date',
            'fecha_vencimiento' => 'date',
            'apto_psicofisico' => 'boolean',
            'certificado_idoneidad' => 'boolean',
            'estado_validacion' => EstadoCLU::class,
        ];
    }

    /**
     * Socio titular de la credencial LU (1:1).
     */
    public function socioProfile(): BelongsTo
    {
        return $this->belongsTo(SocioProfile::class, 'socio_profile_id');
    }

    /**
     * Alias de relación socio.
     */
    public function socio(): BelongsTo
    {
        return $this->socioProfile();
    }

    /**
     * Determina si la credencial se encuentra vigente y aprobada ante ANMaC.
     */
    public function estaVigente(): bool
    {
        $estado = $this->estado_validacion instanceof EstadoCLU
            ? $this->estado_validacion
            : EstadoCLU::tryFrom((string) $this->estado_validacion);

        return $estado === EstadoCLU::APROBADO
            && $this->fecha_vencimiento !== null
            && $this->fecha_vencimiento->startOfDay()->gte(today());
    }

    /**
     * Determina si la credencial se encuentra vencida.
     */
    public function estaVencida(): bool
    {
        return $this->fecha_vencimiento !== null
            && $this->fecha_vencimiento->startOfDay()->lt(today());
    }

    /**
     * Obtiene el estado o alerta de vencimiento de la credencial (RF10, SPECS 4.1).
     *
     * @return array{tipo: string, mensaje: string, dias_restantes?: int}|null
     */
    public function obtenerAlertaVencimiento(): ?array
    {
        $estado = $this->estado_validacion instanceof EstadoCLU
            ? $this->estado_validacion
            : EstadoCLU::tryFrom((string) $this->estado_validacion);

        if ($estado === EstadoCLU::SIN_CLU || empty($this->numero_clu)) {
            return [
                'tipo' => 'warning',
                'mensaje' => 'Usuario sin Credencial de Legítimo Usuario (Tirador principiante o diario).',
            ];
        }

        if ($estado === EstadoCLU::PENDIENTE) {
            return [
                'tipo' => 'info',
                'mensaje' => 'Documentación CLU pendiente de validación por presidencia.',
            ];
        }

        if ($estado === EstadoCLU::RECHAZADO) {
            return [
                'tipo' => 'error',
                'mensaje' => 'Documentación CLU rechazada' . ($this->observaciones_auditoria ? ": {$this->observaciones_auditoria}" : '.'),
            ];
        }

        if ($this->estaVencida()) {
            return [
                'tipo' => 'error',
                'mensaje' => 'Credencial de Legítimo Usuario vencida el ' . $this->fecha_vencimiento?->format('d/m/Y') . '.',
            ];
        }

        if ($this->fecha_vencimiento !== null) {
            $diasRestantes = (int) today()->diffInDays($this->fecha_vencimiento, false);
            if ($diasRestantes <= 60 && $diasRestantes >= 0) {
                return [
                    'tipo' => 'warning',
                    'mensaje' => "Su credencial CLU vencerá en {$diasRestantes} días (" . $this->fecha_vencimiento->format('d/m/Y') . ').',
                    'dias_restantes' => $diasRestantes,
                ];
            }
        }

        return null;
    }
}
