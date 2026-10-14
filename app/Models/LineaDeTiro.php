<?php

namespace App\Models;

use App\Enums\TipoSector;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LineaDeTiro extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'lineas_de_tiro';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'numero_linea',
        'tipo_sector',
        'calibre_permitido',
        'capacidad_simultanea',
        'disponible',
        'nombre',
        'distancia_metros',
        'descripcion',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'tipo_sector' => TipoSector::class,
            'capacidad_simultanea' => 'integer',
            'disponible' => 'boolean',
        ];
    }

    /**
     * Alias backward-compatible de numero.
     */
    public function getNumeroAttribute(): ?int
    {
        return $this->numero_linea;
    }

    public function setNumeroAttribute($value): void
    {
        $this->attributes['numero_linea'] = $value;
    }

    /**
     * Turnos asignados a la línea de tiro.
     */
    public function turnos(): HasMany
    {
        return $this->hasMany(Turno::class, 'linea_de_tiro_id');
    }
}
