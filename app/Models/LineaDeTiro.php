<?php

namespace App\Models;

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
        'numero',
        'nombre',
        'tipo_sector',
        'calibre_permitido',
        'distancia_metros',
        'disponible',
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
            'disponible' => 'boolean',
        ];
    }

    /**
     * Turnos asignados a la línea de tiro.
     */
    public function turnos(): HasMany
    {
        return $this->hasMany(Turno::class);
    }
}
