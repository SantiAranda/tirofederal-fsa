<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RbacRoleAccessTest extends TestCase
{
    use RefreshDatabase;

    public function test_unauthenticated_user_cannot_access_admin_dashboard(): void
    {
        $response = $this->get(route('admin.dashboard'));
        $response->assertRedirect(route('login'));
    }

    public function test_socio_receives_403_when_accessing_admin_routes(): void
    {
        $socio = User::factory()->create(['rol' => 'socio']);

        $response = $this->actingAs($socio)->get(route('admin.dashboard'));
        $response->assertForbidden();

        $response = $this->actingAs($socio)->get(route('admin.socios.index'));
        $response->assertForbidden();

        $response = $this->actingAs($socio)->get(route('admin.pagos.index'));
        $response->assertForbidden();
    }

    public function test_instructor_receives_403_when_accessing_admin_routes(): void
    {
        $instructor = User::factory()->create(['rol' => 'instructor']);

        $response = $this->actingAs($instructor)->get(route('admin.dashboard'));
        $response->assertForbidden();
    }

    public function test_socio_receives_403_when_accessing_instructor_agenda(): void
    {
        $socio = User::factory()->create(['rol' => 'socio']);

        $response = $this->actingAs($socio)->get(route('instructor.agenda.index'));
        $response->assertForbidden();
    }

    public function test_instructor_receives_403_when_accessing_socio_panel(): void
    {
        $instructor = User::factory()->create(['rol' => 'instructor']);

        $response = $this->actingAs($instructor)->get(route('socio.dashboard'));
        $response->assertForbidden();
    }

    public function test_presidente_can_access_admin_dashboard(): void
    {
        $presidente = User::factory()->create(['rol' => 'presidente']);

        $response = $this->actingAs($presidente)->get(route('admin.dashboard'));
        $response->assertOk();
    }

    public function test_instructor_can_access_instructor_agenda(): void
    {
        $instructorUser = User::factory()->create(['rol' => 'instructor']);
        $instructorUser->instructorProfile()->create([
            'matricula_habilitante' => 'ITB-9999',
            'especialidad' => 'Pistola',
            'disponible' => true,
        ]);

        $response = $this->actingAs($instructorUser)->get(route('instructor.agenda.index'));
        $response->assertOk();
    }

    public function test_socio_can_access_socio_panel(): void
    {
        $socioUser = User::factory()->create(['rol' => 'socio']);
        $socioUser->socioProfile()->create([
            'numero_socio' => 'TF-10001',
            'estado_habilitacion' => 'activo',
            'fecha_alta' => now(),
            'posee_arma_propia' => true,
        ]);

        $response = $this->actingAs($socioUser)->get(route('socio.dashboard'));
        $response->assertOk();
    }
}
