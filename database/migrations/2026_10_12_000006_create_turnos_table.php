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
            $table->foreignId('socio_id')->constrained('socios')->cascadeOnDelete();
            $table->foreignId('linea_de_tiro_id')->constrained('lineas_de_tiro')->cascadeOnDelete();
            $table->foreignId('instructor_id')->nullable()->constrained('instructores')->nullOnDelete();
            $table->date('fecha');
            $table->time('hora_inicio');
            $table->time('hora_fin');
            $table->string('estado')->default('reservado')->comment('reservado, confirmado, cancelado, completado, no_asistio');
            $table->boolean('es_practica_individual')->default(false);
            $table->boolean('requiere_instructor')->default(false);
            $table->decimal('monto_arancel', 10, 2)->default(0);
            $table->text('observaciones')->nullable();
            $table->timestamps();
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
