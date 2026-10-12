<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CredencialLU extends Model
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
        'socio_id',
        'numero_clu',
        'categoria',
        'fecha_emision',
        'fecha_vencimiento',
        'foto_dni_frente',
        'foto_dni_dorso',
        'foto_clu_frente',
        'foto_clu_dorso',
        'apto_psicofisico',
        'certificado_idoneidad',
        'estado_validacion',
        'observaciones',
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
        ];
    }

    /**
     * Socio titular de la credencial LU.
     */
    public function socio(): BelongsTo
    {
        return $this->belongsTo(Socio::class);
    }

    /**
     * Determina si la credencial se encuentra vigente y aprobada.
     */
    public function estaVigente(): bool
    {
        return $this->fecha_vencimiento !== null
            && $this->fecha_vencimiento->startOfDay()->gte(today())
            && $this->estado_validacion === 'aprobada';
    }

    /**
     * Determina si la credencial se encuentra vencida.
     */
    public function estaVencida(): bool
    {
        return $this->fecha_vencimiento !== null
            && $this->fecha_vencimiento->startOfDay()->lt(today());
    }
}
