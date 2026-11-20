<?php

namespace Tests\Feature;

use App\Enums\EstadoSocio;
use App\Models\SocioProfile;
use App\Models\User;
use App\Services\PagoService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class SocioMisPagosTest extends TestCase
{
    use RefreshDatabase;

    private function crearSocio(EstadoSocio $estado): User
    {
        $user = User::factory()->create(['rol' => 'socio']);

        SocioProfile::create([
            'user_id' => $user->id,
            'numero_socio' => 'TF-'.$user->id,
            'estado_habilitacion' => $estado,
            'fecha_alta' => now(),
        ]);

        return $user;
    }

    public function test_cuenta_nueva_no_tiene_pagos_ni_esta_en_mora(): void
    {
        $user = $this->crearSocio(EstadoSocio::PENDIENTE_VALIDACION);

        $this->actingAs($user)
            ->get(route('socio.pagos.index'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Socio/Pagos/Index')
                ->has('pagos.data', 0)
                ->where('totalAbonadoAnio', 0)
                ->where('estadoHabilitacion.valor', 'pendiente_validacion')
                ->where('proximoVencimiento', null)
            );
    }

    public function test_muestra_solo_los_pagos_reales_del_socio(): void
    {
        $user = $this->crearSocio(EstadoSocio::ACTIVO);
        $otro = $this->crearSocio(EstadoSocio::ACTIVO);

        $service = app(PagoService::class);
        $service->registrarPago([
            'socio_profile_id' => $user->socioProfile->id,
            'monto' => 15000,
            'tipo_concepto' => 'cuota_mensual',
            'periodo_imputado' => now()->format('Y-m'),
            'metodo_pago' => 'transferencia',
        ]);
        $service->registrarPago([
            'socio_profile_id' => $otro->socioProfile->id,
            'monto' => 9999,
            'tipo_concepto' => 'cuota_mensual',
            'metodo_pago' => 'efectivo',
        ]);

        $this->actingAs($user)
            ->get(route('socio.pagos.index'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->has('pagos.data', 1)
                ->where('pagos.data.0.concepto', 'Cuota mensual')
                ->where('pagos.data.0.estado', 'aprobado')
                ->where('pagos.data.0.tiene_comprobante', true)
                ->where('totalAbonadoAnio', 15000)
                ->where('estadoHabilitacion.valor', 'activo')
                ->where('proximoVencimiento', now()->addMonthNoOverflow()->startOfMonth()->toDateString())
            );
    }

    public function test_socio_en_mora_se_informa_desde_el_servidor(): void
    {
        $user = $this->crearSocio(EstadoSocio::EN_MORA);

        $this->actingAs($user)
            ->get(route('socio.pagos.index'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->where('estadoHabilitacion.valor', 'en_mora')
                ->has('pagos.data', 0)
            );
    }
}
