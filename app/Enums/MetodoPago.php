<?php

namespace App\Enums;

enum MetodoPago: string
{
    case EFECTIVO = 'efectivo';
    case TRANSFERENCIA = 'transferencia';
    case TARJETA = 'tarjeta';
    case PASARELA_ONLINE = 'pasarela_online';

    public function label(): string
    {
        return match ($this) {
            self::EFECTIVO => 'Efectivo en Caja',
            self::TRANSFERENCIA => 'Transferencia Bancaria',
            self::TARJETA => 'Tarjeta de Débito / Crédito',
            self::PASARELA_ONLINE => 'Pasarela de Pago Online',
        };
    }
}
