<?php

namespace App\Actions\Fortify;

use App\Concerns\PasswordValidationRules;
use App\Models\SocioProfile;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user according to RF01, RF02, RF03, SPECS 3.1 & 3.3.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        $hasExtendedFields = array_key_exists('dni', $input)
            || array_key_exists('usuario', $input)
            || array_key_exists('username', $input);

        if ($hasExtendedFields) {
            Validator::make($input, [
                'name' => ['sometimes', 'string', 'max:100'],
                'nombre' => ['sometimes', 'string', 'max:100'],
                'apellido' => ['required', 'string', 'max:100'],
                'usuario' => [
                    'sometimes',
                    'string',
                    'min:6',
                    'max:30',
                    'alpha_num',
                    Rule::unique(User::class, 'username'),
                    Rule::unique(User::class, 'usuario'),
                ],
                'username' => [
                    'sometimes',
                    'string',
                    'min:6',
                    'max:30',
                    'alpha_num',
                    Rule::unique(User::class, 'username'),
                    Rule::unique(User::class, 'usuario'),
                ],
                'dni' => [
                    'required',
                    'string',
                    'min:7',
                    'max:10',
                    'regex:/^[0-9]+$/',
                    Rule::unique(User::class, 'dni'),
                ],
                'fecha_nacimiento' => ['required', 'date', 'before:today'],
                'telefono' => ['required', 'string', 'max:30'],
                'domicilio' => ['required', 'string', 'max:255'],
                'email' => [
                    'required',
                    'string',
                    'email',
                    'max:255',
                    Rule::unique(User::class, 'email'),
                ],
                'password' => $this->passwordRules(),
            ], [
                'usuario.alpha_num' => 'El nombre de usuario solo debe contener letras y números.',
                'usuario.min' => 'El nombre de usuario debe tener al menos 6 caracteres.',
                'usuario.max' => 'El nombre de usuario no puede exceder los 30 caracteres.',
                'usuario.unique' => 'Este nombre de usuario ya está registrado.',
                'username.unique' => 'Este nombre de usuario ya está registrado.',
                'dni.unique' => 'Este número de DNI ya está registrado en el sistema.',
                'dni.regex' => 'El DNI debe contener únicamente dígitos numéricos.',
                'password.regex' => 'La contraseña no puede contener espacios en blanco.',
                'fecha_nacimiento.before' => 'La fecha de nacimiento debe ser anterior a hoy.',
            ])->validate();
        } else {
            Validator::make($input, [
                'name' => ['required', 'string', 'max:255'],
                'email' => [
                    'required',
                    'string',
                    'email',
                    'max:255',
                    Rule::unique(User::class, 'email'),
                ],
                'password' => $this->passwordRules(),
            ])->validate();
        }

        $fullName = trim($input['nombre'] ?? ($input['name'] ?? ''));
        $parts = explode(' ', $fullName, 2);
        $firstName = $parts[0] ?: 'Socio';
        $lastName = $input['apellido'] ?? ($parts[1] ?? 'Nuevo');

        $nombre = $input['nombre'] ?? ($input['name'] ?? $firstName);
        $apellido = $input['apellido'] ?? $lastName;
        $username = strtolower(trim($input['username'] ?? ($input['usuario'] ?? ('socio_' . substr(md5(uniqid()), 0, 8)))));
        $dni = trim($input['dni'] ?? (string) rand(10000000, 48000000));
        $fechaNacimiento = $input['fecha_nacimiento'] ?? '1995-01-01';
        $telefono = trim($input['telefono'] ?? '3704000000');
        $domicilio = trim($input['domicilio'] ?? 'Formosa Capital');

        $user = User::create([
            'nombre' => $nombre,
            'name' => $nombre,
            'apellido' => $apellido,
            'username' => $username,
            'usuario' => $username,
            'dni' => $dni,
            'fecha_nacimiento' => $fechaNacimiento,
            'telefono' => $telefono,
            'domicilio' => $domicilio,
            'email' => strtolower(trim($input['email'])),
            'password' => $input['password'],
            'rol' => 'socio',
            'activo' => false, // RF03: default false hasta validación de documentación
        ]);

        // Crear automáticamente el registro de SocioProfile vinculado (1:1)
        SocioProfile::firstOrCreate(
            ['user_id' => $user->id],
            [
                'numero_socio' => 'TF-' . str_pad((string) $user->id, 5, '0', STR_PAD_LEFT),
                'fecha_alta' => now()->toDateString(),
                'estado_habilitacion' => 'pendiente_validacion',
                'posee_arma_propia' => false,
                'es_tirador_diario' => false,
            ]
        );

        return $user;
    }
}
