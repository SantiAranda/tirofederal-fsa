<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
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
        'tipo',
        'fecha_inicio',
        'fecha_fin',
        'hora_inicio',
        'hora_fin',
        'lugar',
        'cupo_maximo',
        'arancel',
        'estado',
        'imagen',
        'creado_por',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'fecha_inicio' => 'date',
            'fecha_fin' => 'date',
            'arancel' => 'decimal:2',
        ];
    }

    /**
     * Inscripciones registradas para este evento.
     */
    public function inscripciones(): HasMany
    {
        return $this->hasMany(InscripcionEvento::class);
    }

    /**
     * Usuario que creó el evento.
     */
    public function creador(): BelongsTo
    {
        return $this->belongsTo(User::class, 'creado_por');
    }

    /**
     * Evaluaciones recibidas por el evento.
     */
    public function evaluaciones(): MorphMany
    {
        return $this->morphMany(Evaluacion::class, 'evaluable');
    }

    /**
     * Cantidad de cupos disponibles para el evento.
     */
    public function cuposDisponibles(): ?int
    {
        if ($this->cupo_maximo === null) {
            return null;
        }

        $ocupados = $this->inscripciones()
            ->whereIn('estado', ['inscripto', 'confirmado'])
            ->count();

        return max(0, $this->cupo_maximo - $ocupados);
    }

    /**
     * Determina si el evento tiene cupos disponibles.
     */
    public function tieneCupo(): bool
    {
        return $this->cupo_maximo === null || $this->cuposDisponibles() > 0;
    }
}
