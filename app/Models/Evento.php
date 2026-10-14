<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Evento extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'eventos';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'titulo',
        'descripcion',
        'tipo_evento',
        'fecha_evento',
        'cupo_maximo',
        'cupos_disponibles',
        'costo_inscripcion',
        'publicado',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'fecha_evento' => 'datetime',
            'costo_inscripcion' => 'decimal:2',
            'publicado' => 'boolean',
            'cupo_maximo' => 'integer',
            'cupos_disponibles' => 'integer',
        ];
    }

    /**
     * Aliases backward-compatible.
     */
    public function getTipoAttribute(): ?string
    {
        return $this->tipo_evento;
    }

    public function setTipoAttribute($value): void
    {
        $this->attributes['tipo_evento'] = $value;
    }

    public function getArancelAttribute(): ?float
    {
        return (float) $this->costo_inscripcion;
    }

    public function setArancelAttribute($value): void
    {
        $this->attributes['costo_inscripcion'] = $value;
    }

    /**
     * Inscripciones registradas para este evento.
     */
    public function inscripciones(): HasMany
    {
        return $this->hasMany(InscripcionEvento::class, 'evento_id');
    }

    /**
     * Evaluaciones recibidas por el evento (SPECS 3.10).
     */
    public function evaluaciones(): MorphMany
    {
        return $this->morphMany(Evaluacion::class, 'evaluado');
    }

    /**
     * Determina si el evento tiene cupos disponibles.
     */
    public function tieneCupo(): bool
    {
        return $this->cupos_disponibles > 0;
    }
}
