<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Evaluacion extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'evaluaciones';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'socio_profile_id',
        'evaluado_type',
        'evaluado_id',
        'puntaje_numerico',
        'comentario',
        'aprobada_publicacion',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'puntaje_numerico' => 'integer',
            'aprobada_publicacion' => 'boolean',
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

    public function getCalificacionAttribute(): ?int
    {
        return $this->puntaje_numerico;
    }

    public function setCalificacionAttribute($value): void
    {
        $this->attributes['puntaje_numerico'] = $value;
    }

    public function getEvaluableTypeAttribute(): ?string
    {
        return $this->evaluado_type;
    }

    public function setEvaluableTypeAttribute($value): void
    {
        $this->attributes['evaluado_type'] = $value;
    }

    public function getEvaluableIdAttribute(): ?int
    {
        return $this->evaluado_id;
    }

    public function setEvaluableIdAttribute($value): void
    {
        $this->attributes['evaluado_id'] = $value;
    }

    /**
     * Perfil de socio que emitió la evaluación.
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
     * Entidad polimórfica evaluada (InstructorProfile, Evento o Sistema - SPECS 3.10).
     */
    public function evaluado(): MorphTo
    {
        return $this->morphTo();
    }

    public function evaluable(): MorphTo
    {
        return $this->evaluado();
    }
}
