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
            $table->foreignId('socio_id')->constrained('socios')->cascadeOnDelete();
            $table->decimal('monto', 10, 2);
            $table->date('fecha_pago');
            $table->string('tipo_concepto')->comment('cuota_mensual, cuota_ingreso, arancel_turno, inscripcion_evento, insumo, otro');
            $table->string('descripcion_concepto')->nullable();
            $table->string('metodo_pago')->comment('efectivo, transferencia, tarjeta, otro');
            $table->string('estado')->default('completado')->comment('completado, pendiente, anulado');
            $table->integer('periodo_mes')->nullable()->comment('1-12');
            $table->integer('periodo_anio')->nullable();
            $table->foreignId('registrado_por')->nullable()->constrained('users')->nullOnDelete();
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
