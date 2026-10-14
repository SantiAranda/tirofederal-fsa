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
        'socio_profile_id',
        'pago_id',
        'fecha_inscripcion',
        'asistencia_confirmada',
        'estado',
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
            'asistencia_confirmada' => 'boolean',
        ];
    }

    /**
     * Alias backward-compatible.
     */
    public function getSocioIdAttribute(): ?int
    {
        return $this->socio_profile_id;
    }

    public function setSocioIdAttribute($value): void
    {
        $this->attributes['socio_profile_id'] = $value;
    }

    /**
     * Evento al cual corresponde la inscripción.
     */
    public function evento(): BelongsTo
    {
        return $this->belongsTo(Evento::class, 'evento_id');
    }

    /**
     * Perfil de socio inscripto en el evento.
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
     * Pago asociado a la inscripción (si aplica).
     */
    public function pago(): BelongsTo
    {
        return $this->belongsTo(Pago::class, 'pago_id');
    }
}
