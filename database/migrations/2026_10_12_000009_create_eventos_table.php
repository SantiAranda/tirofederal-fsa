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
        Schema::create('eventos', function (Blueprint $table) {
            $table->id();
            $table->string('titulo');
            $table->text('descripcion')->nullable();
            $table->string('tipo_evento')->comment('torneo, tirada_nocturna, curso_capacitacion');
            $table->dateTime('fecha_evento');
            $table->integer('cupo_maximo');
            $table->integer('cupos_disponibles');
            $table->decimal('costo_inscripcion', 10, 2)->default(0.00);
            $table->boolean('publicado')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('eventos');
    }
};
