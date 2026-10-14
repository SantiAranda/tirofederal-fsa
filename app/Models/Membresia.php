<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Membresia extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'membresias';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nombre_plan',
        'cuota_ingreso',
        'monto_mensual',
        'descripcion',
        'activa',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'cuota_ingreso' => 'decimal:2',
            'monto_mensual' => 'decimal:2',
            'activa' => 'boolean',
        ];
    }

    /**
     * Perfiles de socios asociados a este plan de membresía (SPECS 3.2).
     */
    public function socioProfiles(): HasMany
    {
        return $this->hasMany(SocioProfile::class, 'membresia_id');
    }

    public function socios(): HasMany
    {
        return $this->socioProfiles();
    }
}
