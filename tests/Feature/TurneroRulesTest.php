<?php

namespace Tests\Feature;

use App\Enums\EstadoCLU;
use App\Enums\EstadoSocio;
use App\Enums\TipoSector;
use App\Models\CredencialLu;
use App\Models\InstructorProfile;
use App\Models\LineaDeTiro;
use App\Models\SocioProfile;
use App\Models\Turno;
use App\Models\User;
use App\Services\TurneroService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Validation\ValidationException;
use Tests\TestCase;

class TurneroRulesTest extends TestCase
{
    use RefreshDatabase;

    protected LineaDeTiro $linea;
    protected User $userSocio;
    protected SocioProfile $socioProfile;
    protected User $userInstructor;
    protected InstructorProfile $instructorProfile;

    protected function setUp(): void
    {
        parent::setUp();

        $this->linea = LineaDeTiro::create([
            'numero_linea' => 1,
            'nombre' => 'Pedana 1 - 25m',
            'tipo_sector' => TipoSector::EDIFICIO_PRINCIPAL,
            'distancia_metros' => 25,
            'disponible' => true,
        ]);

        $this->userSocio = User::factory()->create(['rol' => 'socio']);
        $this->socioProfile = SocioProfile::create([
            'user_id' => $this->userSocio->id,
            'numero_socio' => 'TF-10020',
            'estado_habilitacion' => EstadoSocio::ACTIVO,
            'fecha_alta' => now()->subMonth(),
            'posee_arma_propia' => true,
        ]);

        $this->userInstructor = User::factory()->create(['rol' => 'instructor']);
        $this->instructorProfile = InstructorProfile::create([
            'user_id' => $this->userInstructor->id,
            'matricula_habilitante' => 'ITB-0042',
            'especialidad' => 'Tiro Federal Formosa',
            'disponible' => true,
        ]);
    }

    public function test_socio_en_mora_is_blocked_from_reserving_turnos_by_middleware(): void
    {
        $this->socioProfile->update(['estado_habilitacion' => EstadoSocio::EN_MORA]);

        $response = $this->actingAs($this->userSocio)->post(route('socio.turnos.store'), [
            'linea_de_tiro_id' => $this->linea->id,
            'fecha' => now()->addDays(2)->toDateString(),
            'hora_inicio' => '10:00',
        ]);

        $response->assertRedirect(route('socio.pagos.index'));
        $response->assertSessionHas('error');
        $this->assertDatabaseCount('turnos', 0);
    }

    public function test_socio_with_valid_clu_and_own_firearm_can_reserve_without_instructor(): void
    {
        CredencialLu::create([
            'socio_profile_id' => $this->socioProfile->id,
            'numero_clu' => 'CLU-88888',
            'fecha_emision' => now()->subYear(),
            'fecha_vencimiento' => now()->addYears(2),
            'estado_validacion' => EstadoCLU::APROBADO,
        ]);

        $response = $this->actingAs($this->userSocio)
            ->from(route('socio.turnos.index'))
            ->post(route('socio.turnos.store'), [
                'linea_de_tiro_id' => $this->linea->id,
                'fecha' => now()->addDays(2)->toDateString(),
                'hora_inicio' => '10:00',
            ]);

        $response->assertRedirect(route('socio.turnos.index'));
        $response->assertSessionHas('success');

        $this->assertDatabaseHas('turnos', [
            'socio_profile_id' => $this->socioProfile->id,
            'linea_de_tiro_id' => $this->linea->id,
            'instructor_profile_id' => null,
            'monto_arancel' => 0.00,
            'estado' => 'reservado',
        ]);
    }

    public function test_socio_without_valid_clu_requires_instructor(): void
    {
        CredencialLu::create([
            'socio_profile_id' => $this->socioProfile->id,
            'numero_clu' => 'CLU-PENDIENTE',
            'fecha_emision' => now()->subMonth(),
            'fecha_vencimiento' => now()->addYears(2),
            'estado_validacion' => EstadoCLU::PENDIENTE,
        ]);

        $service = app(TurneroService::class);

        $this->expectException(ValidationException::class);
        $service->reservarTurno([
            'socio_profile_id' => $this->socioProfile->id,
            'linea_de_tiro_id' => $this->linea->id,
            'fecha' => now()->addDays(3)->toDateString(),
            'hora_inicio' => '14:00',
            'instructor_profile_id' => null,
        ]);
    }

    public function test_socio_without_valid_clu_can_reserve_if_instructor_is_assigned(): void
    {
        CredencialLu::create([
            'socio_profile_id' => $this->socioProfile->id,
            'numero_clu' => 'CLU-PENDIENTE',
            'fecha_emision' => now()->subMonth(),
            'fecha_vencimiento' => now()->addYears(2),
            'estado_validacion' => EstadoCLU::PENDIENTE,
        ]);

        $service = app(TurneroService::class);

        $turno = $service->reservarTurno([
            'socio_profile_id' => $this->socioProfile->id,
            'linea_de_tiro_id' => $this->linea->id,
            'fecha' => now()->addDays(3)->toDateString(),
            'hora_inicio' => '14:00',
            'instructor_profile_id' => $this->instructorProfile->id,
        ]);

        $this->assertNotNull($turno);
        $this->assertEquals($this->instructorProfile->id, $turno->instructor_profile_id);
        $this->assertGreaterThan(0, $turno->monto_arancel);
    }

    public function test_duplicate_reservation_on_same_pedana_and_time_is_rejected(): void
    {
        $fecha = now()->addDays(1)->toDateString();
        $hora = '15:00';

        Turno::create([
            'socio_profile_id' => $this->socioProfile->id,
            'linea_de_tiro_id' => $this->linea->id,
            'fecha' => $fecha,
            'hora_inicio' => $hora,
            'hora_fin' => '15:45',
            'monto_arancel' => 0.00,
            'estado' => 'reservado',
        ]);

        $service = app(TurneroService::class);

        $otroUser = User::factory()->create(['rol' => 'socio']);
        $otroSocio = SocioProfile::create([
            'user_id' => $otroUser->id,
            'numero_socio' => 'TF-10021',
            'estado_habilitacion' => EstadoSocio::ACTIVO,
            'fecha_alta' => now(),
            'posee_arma_propia' => true,
        ]);
        CredencialLu::create([
            'socio_profile_id' => $otroSocio->id,
            'numero_clu' => 'CLU-77777',
            'fecha_emision' => now()->subYear(),
            'fecha_vencimiento' => now()->addYear(),
            'estado_validacion' => EstadoCLU::APROBADO,
        ]);

        $this->expectException(ValidationException::class);
        $service->reservarTurno([
            'socio_profile_id' => $otroSocio->id,
            'linea_de_tiro_id' => $this->linea->id,
            'fecha' => $fecha,
            'hora_inicio' => $hora,
        ]);
    }

    public function test_instructor_concurrency_conflict_is_rejected(): void
    {
        $fecha = now()->addDays(1)->toDateString();
        $hora = '16:00';

        $otraLinea = LineaDeTiro::create([
            'numero_linea' => 2,
            'nombre' => 'Pedana 2',
            'tipo_sector' => TipoSector::EDIFICIO_PRINCIPAL,
            'distancia_metros' => 25,
            'disponible' => true,
        ]);

        Turno::create([
            'socio_profile_id' => $this->socioProfile->id,
            'linea_de_tiro_id' => $this->linea->id,
            'instructor_profile_id' => $this->instructorProfile->id,
            'fecha' => $fecha,
            'hora_inicio' => $hora,
            'hora_fin' => '16:45',
            'monto_arancel' => 2500.00,
            'estado' => 'reservado',
        ]);

        $service = app(TurneroService::class);

        $otroUser = User::factory()->create(['rol' => 'socio']);
        $otroSocio = SocioProfile::create([
            'user_id' => $otroUser->id,
            'numero_socio' => 'TF-10022',
            'estado_habilitacion' => EstadoSocio::ACTIVO,
            'fecha_alta' => now(),
            'posee_arma_propia' => false,
        ]);

        $this->expectException(ValidationException::class);
        $service->reservarTurno([
            'socio_profile_id' => $otroSocio->id,
            'linea_de_tiro_id' => $otraLinea->id,
            'fecha' => $fecha,
            'hora_inicio' => $hora,
            'instructor_profile_id' => $this->instructorProfile->id,
        ]);
    }

    public function test_socio_can_cancel_their_own_turno(): void
    {
        $turno = Turno::create([
            'socio_profile_id' => $this->socioProfile->id,
            'linea_de_tiro_id' => $this->linea->id,
            'fecha' => now()->addDays(2)->toDateString(),
            'hora_inicio' => '11:00',
            'hora_fin' => '11:45',
            'monto_arancel' => 0.00,
            'estado' => 'reservado',
        ]);

        $response = $this->actingAs($this->userSocio)
            ->from(route('socio.turnos.index'))
            ->patch(route('socio.turnos.cancel', $turno));

        $response->assertRedirect(route('socio.turnos.index'));
        $response->assertSessionHas('success');
        $this->assertEquals('cancelado', $turno->fresh()->estado);
    }
}
