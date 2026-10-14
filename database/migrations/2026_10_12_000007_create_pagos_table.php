<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pagos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('socio_profile_id')->constrained('socio_profiles')->cascadeOnDelete();
            $table->decimal('monto', 10, 2);
            $table->dateTime('fecha_pago');
            $table->string('tipo_concepto')->comment('cuota_mensual, plan_inicial, derecho_linea_diario, inscripcion_evento, compra_insumos');
            $table->string('periodo_imputado')->nullable()->comment('ej. 2026-10');
            $table->string('metodo_pago')->comment('efectivo, transferencia, tarjeta, pasarela_online');
            $table->string('estado')->default('pendiente')->comment('pendiente, aprobado, anulado');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pagos');
    }
};
