<?php

namespace App\Enums;

enum EstadoSocio: string
{
    case ACTIVO = 'activo';
    case EN_MORA = 'en_mora';
    case INACTIVO = 'inactivo';
    case PENDIENTE_VALIDACION = 'pendiente_validacion';

    public function label(): string
    {
        return match ($this) {
            self::ACTIVO => 'Activo / Habilitado',
            self::EN_MORA => 'En Mora',
            self::INACTIVO => 'Inactivo',
            self::PENDIENTE_VALIDACION => 'Pendiente de Validación',
        };
    }
}
