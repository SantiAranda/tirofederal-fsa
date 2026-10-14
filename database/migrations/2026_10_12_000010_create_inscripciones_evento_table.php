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
        Schema::create('inscripciones_evento', function (Blueprint $table) {
            $table->id();
            $table->foreignId('evento_id')->constrained('eventos')->cascadeOnDelete();
            $table->foreignId('socio_profile_id')->constrained('socio_profiles')->cascadeOnDelete();
            $table->foreignId('pago_id')->nullable()->constrained('pagos')->nullOnDelete();
            $table->dateTime('fecha_inscripcion');
            $table->boolean('asistencia_confirmada')->default(false);
            $table->string('estado')->default('preinscripto')->comment('preinscripto, confirmado, anulado');
            $table->timestamps();

            $table->unique(['evento_id', 'socio_profile_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inscripciones_evento');
    }
};
