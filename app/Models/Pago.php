<?php

namespace App\Models;

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
        'socio_id',
        'monto',
        'fecha_pago',
        'tipo_concepto',
        'descripcion_concepto',
        'metodo_pago',
        'estado',
        'periodo_mes',
        'periodo_anio',
        'registrado_por',
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
            'fecha_pago' => 'date',
        ];
    }

    /**
     * Socio que efectuó el pago.
     */
    public function socio(): BelongsTo
    {
        return $this->belongsTo(Socio::class);
    }

    /**
     * Comprobante asociado al pago.
     */
    public function comprobante(): HasOne
    {
        return $this->hasOne(Comprobante::class);
    }

    /**
     * Usuario que registró el pago.
     */
    public function registradoPor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'registrado_por');
    }
}
