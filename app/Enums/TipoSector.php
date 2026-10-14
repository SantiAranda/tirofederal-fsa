<?php

namespace App\Enums;

enum TipoSector: string
{
    case EDIFICIO_PRINCIPAL = 'edificio_principal';
    case TIRO_PRACTICO_DINAMICO = 'tiro_practico_dinamico';
    case NEUMATICO = 'neumatico';

    public function label(): string
    {
        return match ($this) {
            self::EDIFICIO_PRINCIPAL => 'Edificio Principal (Pedanas 1-9)',
            self::TIRO_PRACTICO_DINAMICO => 'Sector Tiro Práctico Dinámico (IPSC)',
            self::NEUMATICO => 'Sector Tiro Neumático',
        };
    }
}
