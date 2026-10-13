<?php

namespace App\Actions\Fortify;

use App\Concerns\PasswordValidationRules;
use App\Concerns\ProfileValidationRules;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules, ProfileValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            ...$this->profileRules(),
            'apellido' => ['sometimes', 'string', 'max:255'],
            'dni' => ['sometimes', 'string', 'max:20'],
            'fecha_nacimiento' => ['sometimes', 'date'],
            'password' => $this->passwordRules(),
        ])->validate();

        $fullName = trim($input['name'] ?? '');
        $parts = explode(' ', $fullName, 2);
        $firstName = $parts[0] ?: 'Usuario';
        $lastName = $input['apellido'] ?? ($parts[1] ?? 'General');

        return User::create([
            'name' => $input['name'] ?? $firstName,
            'apellido' => $input['apellido'] ?? $lastName,
            'dni' => $input['dni'] ?? (string) rand(10000000, 48000000),
            'fecha_nacimiento' => $input['fecha_nacimiento'] ?? '2000-01-01',
            'telefono' => $input['telefono'] ?? null,
            'domicilio' => $input['domicilio'] ?? null,
            'email' => $input['email'],
            'password' => $input['password'],
            'rol' => 'socio',
            'activo' => true,
        ]);
    }
}
