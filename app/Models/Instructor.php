<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Instructor extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'instructores';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'matricula_habilitante',
        'especialidad',
        'calificacion_promedio',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'calificacion_promedio' => 'decimal:2',
        ];
    }

    /**
     * Usuario vinculado al perfil de instructor.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Turnos asignados al instructor.
     */
    public function turnos(): HasMany
    {
        return $this->hasMany(Turno::class);
    }

    /**
     * Evaluaciones recibidas por el instructor.
     */
    public function evaluaciones(): MorphMany
    {
        return $this->morphMany(Evaluacion::class, 'evaluable');
    }
}
