<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'apellido',
        'dni',
        'email',
        'fecha_nacimiento',
        'telefono',
        'domicilio',
        'password',
        'rol',
        'activo',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'fecha_nacimiento' => 'date',
            'activo' => 'boolean',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }

    /**
     * Perfil de socio asociado al usuario.
     */
    public function socio(): HasOne
    {
        return $this->hasOne(Socio::class);
    }

    /**
     * Perfil de instructor asociado al usuario.
     */
    public function instructor(): HasOne
    {
        return $this->hasOne(Instructor::class);
    }

    /**
     * Noticias publicadas por el usuario.
     */
    public function noticiasPublicadas(): HasMany
    {
        return $this->hasMany(Noticia::class, 'autor_id');
    }

    /**
     * Eventos creados por el usuario.
     */
    public function eventosCreados(): HasMany
    {
        return $this->hasMany(Evento::class, 'creado_por');
    }

    /**
     * Determina si el usuario tiene rol de presidente.
     */
    public function esPresidente(): bool
    {
        return $this->rol === 'presidente';
    }

    /**
     * Determina si el usuario tiene rol de instructor.
     */
    public function esInstructor(): bool
    {
        return $this->rol === 'instructor';
    }

    /**
     * Determina si el usuario tiene rol de socio.
     */
    public function esSocio(): bool
    {
        return $this->rol === 'socio';
    }

    /**
     * Nombre completo del usuario.
     */
    protected function nombreCompleto(): Attribute
    {
        return Attribute::make(
            get: fn () => trim("{$this->name} {$this->apellido}")
        );
    }
}
