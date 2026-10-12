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
        'numero_comprobante',
        'ruta_pdf',
        'emitido_en',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'emitido_en' => 'datetime',
        ];
    }

    /**
     * Pago respaldado por el comprobante.
     */
    public function pago(): BelongsTo
    {
        return $this->belongsTo(Pago::class);
    }
}
