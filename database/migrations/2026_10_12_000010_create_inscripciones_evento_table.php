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
            $table->foreignId('socio_id')->constrained('socios')->cascadeOnDelete();
            $table->timestamp('fecha_inscripcion');
            $table->string('estado')->default('inscripto')->comment('inscripto, confirmado, cancelado');
            $table->foreignId('pago_id')->nullable()->constrained('pagos')->nullOnDelete();
            $table->timestamps();

            $table->unique(['evento_id', 'socio_id']);
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
