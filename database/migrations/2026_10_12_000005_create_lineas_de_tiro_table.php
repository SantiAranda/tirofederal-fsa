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
        Schema::create('lineas_de_tiro', function (Blueprint $table) {
            $table->id();
            $table->integer('numero')->unique();
            $table->string('nombre');
            $table->string('tipo_sector')->comment('edificio_principal, tiro_practico_dinamico');
            $table->string('calibre_permitido')->nullable();
            $table->integer('distancia_metros')->nullable();
            $table->boolean('disponible')->default(true);
            $table->text('descripcion')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lineas_de_tiro');
    }
};
