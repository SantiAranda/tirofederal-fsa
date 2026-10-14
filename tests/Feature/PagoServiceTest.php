<?php

namespace Tests\Feature;

use App\Enums\EstadoSocio;
use App\Models\Comprobante;
use App\Models\Pago;
use App\Models\SocioProfile;
use App\Models\User;
use App\Services\PagoService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PagoServiceTest extends TestCase
{
    use RefreshDatabase;

    protected User $presidente;
    protected User $socioUser;
    protected SocioProfile $socioProfile;
    protected PagoService $pagoService;

    protected function setUp(): void
    {
        parent::setUp();

        $this->pagoService = app(PagoService::class);
        $this->presidente = User::factory()->create(['rol' => 'presidente']);

        $this->socioUser = User::factory()->create(['rol' => 'socio']);
        $this->socioProfile = SocioProfile::create([
            'user_id' => $this->socioUser->id,
            'numero_socio' => 'TF-30001',
            'estado_habilitacion' => EstadoSocio::EN_MORA,
            'fecha_alta' => now()->subMonths(6),
        ]);
    }

    public function test_pago_generates_comprobante_with_institutional_code_and_reactivates_mora(): void
    {
        $pago = $this->pagoService->registrarPago([
            'socio_profile_id' => $this->socioProfile->id,
            'monto' => 12500.00,
            'tipo_concepto' => 'cuota_mensual',
            'periodo_imputado' => '2026-10',
            'metodo_pago' => 'transferencia',
        ]);

        $this->assertDatabaseHas('pagos', [
            'id' => $pago->id,
            'monto' => 12500.00,
            'tipo_concepto' => 'cuota_mensual',
            'estado' => 'aprobado',
        ]);

        $this->assertDatabaseHas('comprobantes', [
            'pago_id' => $pago->id,
        ]);

        $comprobante = Comprobante::where('pago_id', $pago->id)->first();
        $this->assertNotNull($comprobante);
        $this->assertMatchesRegularExpression('/^TFF-\d{4}-\d{6}$/', $comprobante->codigo_transaccion);

        // Reactivación del socio de mora a activo (RF08)
        $this->socioProfile->refresh();
        $this->assertEquals(EstadoSocio::ACTIVO, $this->socioProfile->estado_habilitacion);
    }

    public function test_socio_can_download_their_own_receipt_pdf(): void
    {
        $pago = $this->pagoService->registrarPago([
            'socio_profile_id' => $this->socioProfile->id,
            'monto' => 5000.00,
            'tipo_concepto' => 'compra_insumos',
            'metodo_pago' => 'efectivo',
        ]);

        $response = $this->actingAs($this->socioUser)->get(route('socio.pagos.pdf', $pago));

        $response->assertOk();
        $this->assertEquals('application/pdf', $response->headers->get('content-type'));
    }

    public function test_socio_cannot_download_another_socios_receipt_pdf(): void
    {
        $otroUser = User::factory()->create(['rol' => 'socio']);
        $otroUser->socioProfile()->create([
            'numero_socio' => 'TF-30002',
            'estado_habilitacion' => EstadoSocio::ACTIVO,
            'fecha_alta' => now(),
        ]);

        $pago = $this->pagoService->registrarPago([
            'socio_profile_id' => $this->socioProfile->id,
            'monto' => 8000.00,
            'tipo_concepto' => 'cuota_mensual',
            'metodo_pago' => 'tarjeta',
        ]);

        $response = $this->actingAs($otroUser)->get(route('socio.pagos.pdf', $pago));

        $response->assertForbidden();
    }

    public function test_admin_can_record_manual_payment(): void
    {
        $response = $this->actingAs($this->presidente)->post(route('admin.pagos.store'), [
            'socio_profile_id' => $this->socioProfile->id,
            'monto' => 15000.00,
            'tipo_concepto' => 'cuota_mensual',
            'periodo_imputado' => '2026-11',
            'metodo_pago' => 'efectivo',
        ]);

        $response->assertRedirect(route('admin.pagos.index'));
        $response->assertSessionHas('success');

        $this->assertDatabaseHas('pagos', [
            'socio_profile_id' => $this->socioProfile->id,
            'monto' => 15000.00,
            'tipo_concepto' => 'cuota_mensual',
            'metodo_pago' => 'efectivo',
            'estado' => 'aprobado',
        ]);
    }

    public function test_admin_can_download_any_receipt_pdf(): void
    {
        $pago = $this->pagoService->registrarPago([
            'socio_profile_id' => $this->socioProfile->id,
            'monto' => 3000.00,
            'tipo_concepto' => 'derecho_linea_diario',
            'metodo_pago' => 'efectivo',
        ]);

        $response = $this->actingAs($this->presidente)->get(route('admin.pagos.pdf', $pago));

        $response->assertOk();
        $this->assertEquals('application/pdf', $response->headers->get('content-type'));
    }
}
