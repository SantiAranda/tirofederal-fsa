<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends Factory<User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->firstName(),
            'apellido' => fake()->lastName(),
            'email' => fake()->unique()->safeEmail(),
            'dni' => (string) fake()->unique()->numberBetween(10000000, 48000000),
            'fecha_nacimiento' => fake()->date('Y-m-d', '-18 years'),
            'telefono' => fake()->phoneNumber(),
            'domicilio' => fake()->address(),
            'rol' => 'socio',
            'activo' => true,
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the user is presidente.
     */
    public function presidente(): static
    {
        return $this->state(fn (array $attributes) => [
            'rol' => 'presidente',
        ]);
    }

    /**
     * Indicate that the user is instructor.
     */
    public function instructor(): static
    {
        return $this->state(fn (array $attributes) => [
            'rol' => 'instructor',
        ]);
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

    /**
     * Indicate that the model has two-factor authentication configured.
     */
    public function withTwoFactor(): static
    {
        return $this->state(fn (array $attributes) => []);
    }
}
