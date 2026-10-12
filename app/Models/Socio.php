<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Socio extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'socios';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'numero_socio',
        'membresia_id',
        'fecha_alta',
        'estado',
        'posee_arma_propia',
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
        ];
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
     * Historial de credenciales de Legítimo Usuario (CLU).
     */
    public function credencialesLu(): HasMany
    {
        return $this->hasMany(CredencialLU::class);
    }

    /**
     * Credencial de Legítimo Usuario (CLU) vigente y aprobada.
     */
    public function credencialLuVigente(): HasOne
    {
        return $this->hasOne(CredencialLU::class)
            ->where('estado_validacion', 'aprobada')
            ->where('fecha_vencimiento', '>=', now()->toDateString())
            ->latestOfMany('fecha_vencimiento');
    }

    /**
     * Turnos reservados por el socio.
     */
    public function turnos(): HasMany
    {
        return $this->hasMany(Turno::class);
    }

    /**
     * Pagos realizados por el socio.
     */
    public function pagos(): HasMany
    {
        return $this->hasMany(Pago::class);
    }

    /**
     * Inscripciones a eventos del socio.
     */
    public function inscripcionesEvento(): HasMany
    {
        return $this->hasMany(InscripcionEvento::class);
    }

    /**
     * Evaluaciones realizadas por el socio.
     */
    public function evaluaciones(): HasMany
    {
        return $this->hasMany(Evaluacion::class);
    }

    /**
     * Verifica si el socio se encuentra habilitado/activo.
     */
    public function estaHabilitado(): bool
    {
        return $this->estado === 'activo';
    }

    /**
     * Verifica si el socio se encuentra en mora.
     */
    public function estaEnMora(): bool
    {
        return $this->estado === 'en_mora';
    }
}
