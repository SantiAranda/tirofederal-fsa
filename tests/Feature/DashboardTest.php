<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_to_the_login_page()
    {
        $response = $this->get(route('dashboard'));
        $response->assertRedirect(route('login'));
    }

    public function test_authenticated_socio_is_redirected_to_panel()
    {
        $user = User::factory()->create(['rol' => 'socio']);
        $this->actingAs($user);

        $response = $this->get(route('dashboard'));
        $response->assertRedirect(route('socio.dashboard'));
    }

    public function test_authenticated_presidente_is_redirected_to_admin_dashboard()
    {
        $user = User::factory()->create(['rol' => 'presidente']);
        $this->actingAs($user);

        $response = $this->get(route('dashboard'));
        $response->assertRedirect(route('admin.dashboard'));
    }

    public function test_authenticated_instructor_is_redirected_to_agenda()
    {
        $user = User::factory()->create(['rol' => 'instructor']);
        $this->actingAs($user);

        $response = $this->get(route('dashboard'));
        $response->assertRedirect(route('instructor.agenda.index'));
    }
}
