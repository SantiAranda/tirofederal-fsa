<?php

namespace App\Enums;

enum EstadoCLU: string
{
    case PENDIENTE = 'pendiente';
    case APROBADO = 'aprobado';
    case RECHAZADO = 'rechazado';
    case VENCIDO = 'vencido';
    case SIN_CLU = 'sin_clu';

    public function label(): string
    {
        return match ($this) {
            self::PENDIENTE => 'Pendiente de Auditoría',
            self::APROBADO => 'Aprobado ANMaC',
            self::RECHAZADO => 'Rechazado',
            self::VENCIDO => 'Credencial Vencida',
            self::SIN_CLU => 'Sin CLU (Principiante / Práctica Diaria)',
        };
    }
}
