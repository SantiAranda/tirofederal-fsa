<?php

namespace App\Enums;

enum RolUsuario: string
{
    case PRESIDENTE = 'presidente';
    case INSTRUCTOR = 'instructor';
    case SOCIO = 'socio';

    public function label(): string
    {
        return match ($this) {
            self::PRESIDENTE => 'Presidente / Administración',
            self::INSTRUCTOR => 'Instructor de Tiro',
            self::SOCIO => 'Socio / Tirador',
        };
    }
}
