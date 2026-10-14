<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Turno extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'turnos';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'socio_profile_id',
        'linea_de_tiro_id',
        'instructor_profile_id',
        'fecha',
        'hora_inicio',
        'hora_fin',
        'es_practica_individual_dia',
        'monto_arancel',
        'estado',
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
            'fecha' => 'date',
            'es_practica_individual_dia' => 'boolean',
            'monto_arancel' => 'decimal:2',
        ];
    }

    /**
     * Aliases backward-compatible.
     */
    public function getSocioIdAttribute(): ?int
    {
        return $this->socio_profile_id;
    }

    public function setSocioIdAttribute($value): void
    {
        $this->attributes['socio_profile_id'] = $value;
    }

    public function getInstructorIdAttribute(): ?int
    {
        return $this->instructor_profile_id;
    }

    public function setInstructorIdAttribute($value): void
    {
        $this->attributes['instructor_profile_id'] = $value;
    }

    public function getEsPracticaIndividualAttribute(): ?bool
    {
        return $this->es_practica_individual_dia;
    }

    public function setEsPracticaIndividualAttribute($value): void
    {
        $this->attributes['es_practica_individual_dia'] = $value;
    }

    /**
     * Perfil de socio que reservó el turno.
     */
    public function socioProfile(): BelongsTo
    {
        return $this->belongsTo(SocioProfile::class, 'socio_profile_id');
    }

    public function socio(): BelongsTo
    {
        return $this->socioProfile();
    }

    /**
     * Línea de tiro asignada al turno.
     */
    public function lineaDeTiro(): BelongsTo
    {
        return $this->belongsTo(LineaDeTiro::class, 'linea_de_tiro_id');
    }

    /**
     * Perfil de instructor asignado al turno (opcional u obligatorio sin CLU).
     */
    public function instructorProfile(): BelongsTo
    {
        return $this->belongsTo(InstructorProfile::class, 'instructor_profile_id');
    }

    public function instructor(): BelongsTo
    {
        return $this->instructorProfile();
    }
}
