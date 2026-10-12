<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Turno extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'turnos';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'socio_id',
        'linea_de_tiro_id',
        'instructor_id',
        'fecha',
        'hora_inicio',
        'hora_fin',
        'estado',
        'es_practica_individual',
        'requiere_instructor',
        'monto_arancel',
        'observaciones',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'fecha' => 'date',
            'es_practica_individual' => 'boolean',
            'requiere_instructor' => 'boolean',
            'monto_arancel' => 'decimal:2',
        ];
    }

    /**
     * Socio que reservó el turno.
     */
    public function socio(): BelongsTo
    {
        return $this->belongsTo(Socio::class);
    }

    /**
     * Línea de tiro asignada al turno.
     */
    public function lineaDeTiro(): BelongsTo
    {
        return $this->belongsTo(LineaDeTiro::class);
    }

    /**
     * Instructor asignado al turno (opcional).
     */
    public function instructor(): BelongsTo
    {
        return $this->belongsTo(Instructor::class);
    }
}
