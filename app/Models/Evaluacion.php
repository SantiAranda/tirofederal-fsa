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
        'socio_id',
        'evaluable_type',
        'evaluable_id',
        'calificacion',
        'comentario',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'calificacion' => 'integer',
        ];
    }

    /**
     * Socio que emitió la evaluación.
     */
    public function socio(): BelongsTo
    {
        return $this->belongsTo(Socio::class);
    }

    /**
     * Modelo evaluado (Instructor o Evento).
     */
    public function evaluable(): MorphTo
    {
        return $this->morphTo();
    }
}
