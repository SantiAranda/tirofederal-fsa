<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Insumo extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'insumos';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nombre',
        'categoria',
        'cantidad_stock',
        'stock_minimo',
        'precio_unitario',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'precio_unitario' => 'decimal:2',
            'cantidad_stock' => 'integer',
            'stock_minimo' => 'integer',
        ];
    }

    /**
     * Aliases backward-compatible.
     */
    public function getStockAttribute(): ?int
    {
        return $this->cantidad_stock;
    }

    public function setStockAttribute($value): void
    {
        $this->attributes['cantidad_stock'] = $value;
    }

    public function getPrecioAttribute(): ?float
    {
        return (float) $this->precio_unitario;
    }

    public function setPrecioAttribute($value): void
    {
        $this->attributes['precio_unitario'] = $value;
    }

    /**
     * Determina si el insumo se encuentra en nivel crítico o bajo de stock (RF11).
     */
    public function stockBajo(): bool
    {
        return $this->cantidad_stock <= $this->stock_minimo;
    }
}
