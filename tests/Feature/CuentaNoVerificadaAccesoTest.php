<?php

namespace Tests\Feature;

use App\Enums\EstadoSocio;
use App\Models\SocioProfile;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

class CuentaNoVerificadaAccesoTest extends TestCase
{
    use RefreshDatabase;

    private function crearSocio(bool $activo, EstadoSocio $estado): User
    {
        $user = User::factory()->create(['rol' => 'socio', 'activo' => $activo]);

        SocioProfile::create([
            'user_id' => $user->id,
            'numero_socio' => 'TF-'.$user->id,
            'estado_habilitacion' => $estado,
            'fecha_alta' => now(),
        ]);

        return $user;
    }

    /** @return array<string, array{string}> */
    public static function rutasInternas(): array
    {
        return [
            'panel' => ['/panel'],
            'perfil' => ['/perfil'],
            'pagos' => ['/pagos'],
            'turnos' => ['/turnos'],
            'ajustes de perfil' => ['/settings/profile'],
        ];
    }

    #[DataProvider('rutasInternas')]
    public function test_cuenta_sin_verificar_es_redirigida_a_solicitud_en_tramite(string $ruta): void
    {
        $user = $this->crearSocio(false, EstadoSocio::PENDIENTE_VALIDACION);

        $this->actingAs($user)
            ->get($ruta)
            ->assertRedirect(route('solicitud.tramite'));
    }

    public function test_cuenta_sin_verificar_no_puede_modificar_su_perfil(): void
    {
        $user = $this->crearSocio(false, EstadoSocio::PENDIENTE_VALIDACION);

        $this->actingAs($user)
            ->patch('/perfil', ['telefono' => '3704111111'])
            ->assertRedirect(route('solicitud.tramite'));
    }

    public function test_cuenta_sin_verificar_puede_ver_su_solicitud_y_cerrar_sesion(): void
    {
        $user = $this->crearSocio(false, EstadoSocio::PENDIENTE_VALIDACION);

        $this->actingAs($user)->get(route('solicitud.tramite'))->assertOk();
        $this->actingAs($user)->post('/logout')->assertRedirect();
        $this->assertGuest();
    }

    #[DataProvider('rutasInternas')]
    public function test_cuenta_verificada_accede_normalmente(string $ruta): void
    {
        $user = $this->crearSocio(true, EstadoSocio::ACTIVO);

        $this->actingAs($user)->get($ruta)->assertOk();
    }

    public function test_socio_en_mora_puede_entrar_a_pagar(): void
    {
        $user = $this->crearSocio(false, EstadoSocio::EN_MORA);

        $this->actingAs($user)->get('/pagos')->assertOk();
    }
}
