<?php

namespace App\Models;

use App\Enums\EstadoSocio;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class SocioProfile extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'socio_profiles';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'membresia_id',
        'numero_socio',
        'estado_habilitacion',
        'posee_arma_propia',
        'es_tirador_diario',
        'fecha_alta',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'fecha_alta' => 'date',
            'posee_arma_propia' => 'boolean',
            'es_tirador_diario' => 'boolean',
            'estado_habilitacion' => EstadoSocio::class,
        ];
    }

    /**
     * Alias backward-compatible de estado.
     */
    public function getEstadoAttribute(): ?string
    {
        $val = $this->estado_habilitacion;
        return $val instanceof EstadoSocio ? $val->value : (is_string($val) ? $val : null);
    }

    public function setEstadoAttribute($value): void
    {
        $this->attributes['estado_habilitacion'] = $value;
    }

    /**
     * Usuario vinculado al socio.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Membresía actual del socio.
     */
    public function membresia(): BelongsTo
    {
        return $this->belongsTo(Membresia::class);
    }

    /**
     * Credencial de Legítimo Usuario (CLU) - Composición 1:1 (SPECS 3.4).
     */
    public function credencialLu(): HasOne
    {
        return $this->hasOne(CredencialLu::class, 'socio_profile_id');
    }

    /**
     * Alias de credencial LU para compatibilidad.
     */
    public function credencialLuVigente(): HasOne
    {
        return $this->credencialLu();
    }

    /**
     * Turnos reservados por el socio.
     */
    public function turnos(): HasMany
    {
        return $this->hasMany(Turno::class, 'socio_profile_id');
    }

    /**
     * Pagos realizados por el socio.
     */
    public function pagos(): HasMany
    {
        return $this->hasMany(Pago::class, 'socio_profile_id');
    }

    /**
     * Inscripciones a eventos del socio.
     */
    public function inscripcionesEvento(): HasMany
    {
        return $this->hasMany(InscripcionEvento::class, 'socio_profile_id');
    }

    /**
     * Evaluaciones emitidas por el socio.
     */
    public function evaluaciones(): HasMany
    {
        return $this->hasMany(Evaluacion::class, 'socio_profile_id');
    }

    /**
     * Verifica si el socio se encuentra habilitado/activo (RF08).
     */
    public function estaHabilitado(): bool
    {
        return $this->estado_habilitacion === EstadoSocio::ACTIVO || $this->estado_habilitacion === 'activo';
    }

    /**
     * Verifica si el socio se encuentra en mora (RF08).
     */
    public function estaEnMora(): bool
    {
        return $this->estado_habilitacion === EstadoSocio::EN_MORA || $this->estado_habilitacion === 'en_mora';
    }
}
