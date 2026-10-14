<?php

namespace App\Policies;

use App\Models\Pago;
use App\Models\User;

class PagoPolicy
{
    public function view(User $user, Pago $pago): bool
    {
        if ($user->esPresidente()) {
            return true;
        }

        return $user->socioProfile && $pago->socio_profile_id === $user->socioProfile->id;
    }

    public function downloadPdf(User $user, Pago $pago): bool
    {
        return $this->view($user, $pago);
    }
}
