<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InscripcionEvento extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'inscripciones_evento';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'evento_id',
        'socio_id',
        'fecha_inscripcion',
        'estado',
        'pago_id',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'fecha_inscripcion' => 'datetime',
        ];
    }

    /**
     * Evento al cual corresponde la inscripción.
     */
    public function evento(): BelongsTo
    {
        return $this->belongsTo(Evento::class);
    }

    /**
     * Socio inscripto en el evento.
     */
    public function socio(): BelongsTo
    {
        return $this->belongsTo(Socio::class);
    }

    /**
     * Pago asociado a la inscripción (si aplica).
     */
    public function pago(): BelongsTo
    {
        return $this->belongsTo(Pago::class);
    }
}
