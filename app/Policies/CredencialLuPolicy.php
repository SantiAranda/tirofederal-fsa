<?php

namespace App\Policies;

use App\Models\CredencialLu;
use App\Models\User;

class CredencialLuPolicy
{
    /**
     * Determina si el usuario puede ver los documentos privados de la credencial (RF03, RNF01, SPECS 5.4).
     */
    public function view(User $user, CredencialLu $credencial): bool
    {
        if ($user->esPresidente()) {
            return true;
        }

        return $user->socioProfile && $user->socioProfile->id === $credencial->socio_profile_id;
    }

    /**
     * Determina si el usuario puede fiscalizar/validar la documentación ANMaC (RF03, RF10).
     */
    public function validate(User $user, CredencialLu $credencial): bool
    {
        return $user->esPresidente();
    }

    /**
     * Determina si el usuario puede subir/actualizar su documentación.
     */
    public function update(User $user, CredencialLu $credencial): bool
    {
        if ($user->esPresidente()) {
            return true;
        }

        return $user->socioProfile && $user->socioProfile->id === $credencial->socio_profile_id;
    }
}
