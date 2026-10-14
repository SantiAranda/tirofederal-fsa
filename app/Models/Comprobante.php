<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Comprobante extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'comprobantes';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'pago_id',
        'codigo_transaccion',
        'fecha_emision',
        'pdf_path',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'fecha_emision' => 'datetime',
        ];
    }

    /**
     * Aliases backward-compatible.
     */
    public function getNumeroComprobanteAttribute(): ?string
    {
        return $this->codigo_transaccion;
    }

    public function setNumeroComprobanteAttribute($value): void
    {
        $this->attributes['codigo_transaccion'] = $value;
    }

    public function getRutaPdfAttribute(): ?string
    {
        return $this->pdf_path;
    }

    public function setRutaPdfAttribute($value): void
    {
        $this->attributes['pdf_path'] = $value;
    }

    public function getEmitidoEnAttribute(): ?\Carbon\CarbonInterface
    {
        return $this->fecha_emision;
    }

    public function setEmitidoEnAttribute($value): void
    {
        $this->attributes['fecha_emision'] = $value;
    }

    /**
     * Pago respaldado por el comprobante (1:1).
     */
    public function pago(): BelongsTo
    {
        return $this->belongsTo(Pago::class, 'pago_id');
    }
}
