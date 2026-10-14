<?php

namespace Tests\Feature;

use App\Enums\EstadoCLU;
use App\Enums\EstadoSocio;
use App\Models\CredencialLu;
use App\Models\SocioProfile;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class CluAuditPolicyTest extends TestCase
{
    use RefreshDatabase;

    protected User $presidente;
    protected User $socioUser;
    protected SocioProfile $socioProfile;
    protected CredencialLu $credencial;

    protected function setUp(): void
    {
        parent::setUp();
        Storage::fake('local');

        $this->presidente = User::factory()->create(['rol' => 'presidente']);

        $this->socioUser = User::factory()->create([
            'rol' => 'socio',
            'activo' => false,
        ]);

        $this->socioProfile = SocioProfile::create([
            'user_id' => $this->socioUser->id,
            'numero_socio' => 'TF-20001',
            'estado_habilitacion' => EstadoSocio::PENDIENTE_VALIDACION,
            'fecha_alta' => now(),
            'posee_arma_propia' => true,
        ]);

        $file = UploadedFile::fake()->create('dni_frente.jpg', 100, 'image/jpeg');
        $storedPath = $file->storeAs("private/legajos/{$this->socioProfile->id}", 'dni_frente.jpg', 'local');

        $this->credencial = CredencialLu::create([
            'socio_profile_id' => $this->socioProfile->id,
            'numero_clu' => 'CLU-123456',
            'fecha_emision' => now()->subMonth(),
            'fecha_vencimiento' => now()->addYears(4),
            'foto_dni_frente_path' => $storedPath,
            'apto_psicofisico' => true,
            'certificado_idoneidad' => true,
            'estado_validacion' => EstadoCLU::PENDIENTE,
        ]);
    }

    public function test_presidente_can_approve_clu_and_activates_socio_and_user(): void
    {
        $response = $this->actingAs($this->presidente)
            ->patch(route('admin.clu.validar', $this->credencial), [
                'estado' => 'aprobado',
                'observaciones' => 'Documentación física y digital verificada ante RENAR/ANMaC.',
            ]);

        $response->assertSessionHas('success');

        $this->credencial->refresh();
        $this->socioProfile->refresh();
        $this->socioUser->refresh();

        $this->assertEquals(EstadoCLU::APROBADO, $this->credencial->estado_validacion);
        $this->assertEquals(EstadoSocio::ACTIVO, $this->socioProfile->estado_habilitacion);
        $this->assertTrue($this->socioUser->activo);
    }

    public function test_presidente_can_reject_clu_and_inactivates_socio(): void
    {
        $response = $this->actingAs($this->presidente)
            ->patch(route('admin.clu.validar', $this->credencial), [
                'estado' => 'rechazado',
                'observaciones' => 'Foto de DNI borrosa, ilegible.',
            ]);

        $response->assertSessionHas('success');

        $this->credencial->refresh();
        $this->socioProfile->refresh();

        $this->assertEquals(EstadoCLU::RECHAZADO, $this->credencial->estado_validacion);
        $this->assertEquals(EstadoSocio::INACTIVO, $this->socioProfile->estado_habilitacion);
    }

    public function test_socio_cannot_validate_clu_documents(): void
    {
        $response = $this->actingAs($this->socioUser)
            ->patch(route('admin.clu.validar', $this->credencial), [
                'estado' => 'aprobado',
            ]);

        $response->assertForbidden();
    }

    public function test_presidente_can_stream_private_anmac_file(): void
    {
        $response = $this->actingAs($this->presidente)
            ->get(route('admin.clu.documento', ['credencial' => $this->credencial, 'tipo' => 'dni_frente']));

        $response->assertOk();
    }

    public function test_owner_socio_can_stream_their_own_private_file(): void
    {
        $response = $this->actingAs($this->socioUser)
            ->get(route('socio.clu.documento', ['credencial' => $this->credencial, 'tipo' => 'dni_frente']));

        $response->assertOk();
    }

    public function test_another_socio_cannot_access_private_file(): void
    {
        $otroUser = User::factory()->create(['rol' => 'socio']);
        $otroUser->socioProfile()->create([
            'numero_socio' => 'TF-20002',
            'estado_habilitacion' => EstadoSocio::ACTIVO,
            'fecha_alta' => now(),
        ]);

        $response = $this->actingAs($otroUser)
            ->get(route('socio.clu.documento', ['credencial' => $this->credencial, 'tipo' => 'dni_frente']));

        $response->assertForbidden();
    }

    public function test_invalid_document_type_returns_404(): void
    {
        $response = $this->actingAs($this->presidente)
            ->get(route('admin.clu.documento', ['credencial' => $this->credencial, 'tipo' => 'archivo_malicioso']));

        $response->assertNotFound();
    }
}
