<?php

namespace App\Models;

use App\Enums\RolUsuario;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nombre',
        'name',
        'apellido',
        'dni',
        'fecha_nacimiento',
        'email',
        'username',
        'usuario',
        'password',
        'telefono',
        'domicilio',
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
            'rol' => RolUsuario::class,
            'two_factor_confirmed_at' => 'datetime',
        ];
    }

    /**
     * Sincronización transparente de atributo name y nombre.
     */
    public function getNameAttribute(): ?string
    {
        return $this->attributes['nombre'] ?? ($this->attributes['name'] ?? null);
    }

    public function setNameAttribute($value): void
    {
        $this->attributes['nombre'] = $value;
        $this->attributes['name'] = $value;
    }

    public function getNombreAttribute(): ?string
    {
        return $this->attributes['nombre'] ?? ($this->attributes['name'] ?? null);
    }

    public function setNombreAttribute($value): void
    {
        $this->attributes['nombre'] = $value;
        $this->attributes['name'] = $value;
    }

    /**
     * Sincronización transparente de atributo usuario y username.
     */
    public function getUsuarioAttribute(): ?string
    {
        return $this->attributes['username'] ?? ($this->attributes['usuario'] ?? null);
    }

    public function setUsuarioAttribute($value): void
    {
        $this->attributes['username'] = $value;
        $this->attributes['usuario'] = $value;
    }

    public function getUsernameAttribute(): ?string
    {
        return $this->attributes['username'] ?? ($this->attributes['usuario'] ?? null);
    }

    public function setUsernameAttribute($value): void
    {
        $this->attributes['username'] = $value;
        $this->attributes['usuario'] = $value;
    }

    /**
     * Perfil de socio asociado al usuario (1:1).
     */
    public function socioProfile(): HasOne
    {
        return $this->hasOne(SocioProfile::class);
    }

    /**
     * Alias de perfil de socio.
     */
    public function socio(): HasOne
    {
        return $this->socioProfile();
    }

    /**
     * Perfil de instructor asociado al usuario (1:1).
     */
    public function instructorProfile(): HasOne
    {
        return $this->hasOne(InstructorProfile::class);
    }

    /**
     * Alias de perfil de instructor.
     */
    public function instructor(): HasOne
    {
        return $this->instructorProfile();
    }

    /**
     * Noticias publicadas por el usuario.
     */
    public function noticias(): HasMany
    {
        return $this->hasMany(Noticia::class, 'user_id');
    }

    /**
     * Determina si el usuario tiene rol de presidente.
     */
    public function esPresidente(): bool
    {
        return $this->rol === RolUsuario::PRESIDENTE || $this->rol === 'presidente';
    }

    /**
     * Determina si el usuario tiene rol de instructor.
     */
    public function esInstructor(): bool
    {
        return $this->rol === RolUsuario::INSTRUCTOR || $this->rol === 'instructor';
    }

    /**
     * Determina si el usuario tiene rol de socio.
     */
    public function esSocio(): bool
    {
        return $this->rol === RolUsuario::SOCIO || $this->rol === 'socio';
    }

    /**
     * Nombre completo del usuario.
     */
    protected function nombreCompleto(): Attribute
    {
        return Attribute::make(
            get: fn () => trim("{$this->nombre} {$this->apellido}")
        );
    }
}
