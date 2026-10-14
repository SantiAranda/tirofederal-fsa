<?php

namespace App\Models;

use App\Enums\MetodoPago;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Pago extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'pagos';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'socio_profile_id',
        'monto',
        'fecha_pago',
        'tipo_concepto',
        'periodo_imputado',
        'metodo_pago',
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
            'monto' => 'decimal:2',
            'fecha_pago' => 'datetime',
            'metodo_pago' => MetodoPago::class,
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
     * Perfil de socio que efectuó el pago.
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
     * Comprobante asociado al pago (1:1).
     */
    public function comprobante(): HasOne
    {
        return $this->hasOne(Comprobante::class, 'pago_id');
    }
}
