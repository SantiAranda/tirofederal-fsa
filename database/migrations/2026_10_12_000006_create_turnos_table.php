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
        Schema::create('turnos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('socio_profile_id')->constrained('socio_profiles')->cascadeOnDelete();
            $table->foreignId('linea_de_tiro_id')->constrained('lineas_de_tiro')->cascadeOnDelete();
            $table->foreignId('instructor_profile_id')->nullable()->constrained('instructor_profiles')->nullOnDelete();
            $table->date('fecha')->index();
            $table->time('hora_inicio');
            $table->time('hora_fin');
            $table->boolean('es_practica_individual_dia')->default(false);
            $table->decimal('monto_arancel', 10, 2)->default(0.00);
            $table->string('estado')->default('reservado')->comment('reservado, confirmado, asistido, cancelado');
            $table->text('observaciones')->nullable();
            $table->timestamps();

            // Restriccion de concurrencia e indice de busqueda de disponibilidad (RF15)
            $table->index(['linea_de_tiro_id', 'fecha', 'hora_inicio']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('turnos');
    }
};
