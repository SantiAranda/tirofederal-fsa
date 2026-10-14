<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Fortify\Features;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->skipUnlessFortifyHas(Features::registration());
    }

    public function test_registration_screen_can_be_rendered()
    {
        $response = $this->get(route('register'));

        $response->assertOk();
    }

    public function test_new_users_can_register()
    {
        $response = $this->post(route('register.store'), [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'P@ssword123!',
            'password_confirmation' => 'P@ssword123!',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(route('dashboard', absolute: false));
    }

    public function test_weak_passwords_are_rejected(): void
    {
        $response = $this->post(route('register.store'), [
            'name' => 'Test User',
            'email' => 'weak@example.com',
            'password' => 'simple',
            'password_confirmation' => 'simple',
        ]);

        $response->assertSessionHasErrors('password');
        $this->assertGuest();
    }

    public function test_passwords_with_spaces_are_rejected(): void
    {
        $response = $this->post(route('register.store'), [
            'name' => 'Test User',
            'email' => 'spaces@example.com',
            'password' => 'P@ss word 123!',
            'password_confirmation' => 'P@ss word 123!',
        ]);

        $response->assertSessionHasErrors('password');
        $this->assertGuest();
    }
}
