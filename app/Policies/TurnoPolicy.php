<?php

namespace App\Policies;

use App\Models\Turno;
use App\Models\User;

class TurnoPolicy
{
    public function view(User $user, Turno $turno): bool
    {
        if ($user->esPresidente()) {
            return true;
        }

        if ($user->esInstructor() && $user->instructorProfile) {
            return $turno->instructor_profile_id === $user->instructorProfile->id;
        }

        if ($user->esSocio() && $user->socioProfile) {
            return $turno->socio_profile_id === $user->socioProfile->id;
        }

        return false;
    }

    public function cancel(User $user, Turno $turno): bool
    {
        if ($user->esPresidente()) {
            return true;
        }

        if ($user->esSocio() && $user->socioProfile) {
            return $turno->socio_profile_id === $user->socioProfile->id
                && in_array($turno->estado, ['reservado', 'confirmado'], true);
        }

        return false;
    }

    public function confirmAttendance(User $user, Turno $turno): bool
    {
        if ($user->esPresidente()) {
            return true;
        }

        if ($user->esInstructor() && $user->instructorProfile) {
            return $turno->instructor_profile_id === $user->instructorProfile->id;
        }

        return false;
    }
}
