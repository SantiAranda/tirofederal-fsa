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
        'user_id',
        'titulo',
        'slug',
        'categoria',
        'copete',
        'contenido',
        'imagen_portada',
        'epigrafe',
        'publicada',
        'fecha_publicacion',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array<int, string>
     */
    protected $appends = [
        'resumen',
        'imagen_url',
        'imagen',
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
     * Aliases backward-compatible.
     */
    public function getResumenAttribute(): string
    {
        if (!empty($this->copete)) {
            return $this->copete;
        }
        return \Illuminate\Support\Str::limit(strip_tags((string) $this->contenido), 140);
    }

    /**
     * URL pública de la imagen de portada (las subidas viven en el disco "public").
     */
    public function getImagenUrlAttribute(): ?string
    {
        if (empty($this->imagen_portada)) {
            return null;
        }

        if (\Illuminate\Support\Str::startsWith($this->imagen_portada, ['http://', 'https://', '/'])) {
            return $this->imagen_portada;
        }

        return '/storage/' . ltrim($this->imagen_portada, '/');
    }

    public function getAutorIdAttribute(): ?int
    {
        return $this->user_id;
    }

    public function setAutorIdAttribute($value): void
    {
        $this->attributes['user_id'] = $value;
    }

    public function getImagenAttribute(): ?string
    {
        return $this->imagen_portada;
    }

    public function setImagenAttribute($value): void
    {
        $this->attributes['imagen_portada'] = $value;
    }

    /**
     * Usuario autor de la noticia (Presidente / Administración - SPECS 3.11).
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function autor(): BelongsTo
    {
        return $this->user();
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
