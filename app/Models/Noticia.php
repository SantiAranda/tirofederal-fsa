<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Noticia extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'noticias';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'titulo',
        'contenido',
        'extracto',
        'imagen',
        'publicada',
        'fecha_publicacion',
        'autor_id',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'publicada' => 'boolean',
            'fecha_publicacion' => 'datetime',
        ];
    }

    /**
     * Usuario autor de la noticia.
     */
    public function autor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'autor_id');
    }

    /**
     * Scope para filtrar noticias publicadas cuya fecha sea menor o igual a la actual.
     */
    public function scopePublicadas(Builder $query): void
    {
        $query->where('publicada', true)
            ->where('fecha_publicacion', '<=', now());
    }
}
