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
        Schema::create('credenciales_lu', function (Blueprint $table) {
            $table->id();
            $table->foreignId('socio_id')->constrained('socios')->cascadeOnDelete();
            $table->string('numero_clu')->unique();
            $table->string('categoria')->nullable()->comment('e.g. Legítimo Usuario, Tirador Deportivo');
            $table->date('fecha_emision');
            $table->date('fecha_vencimiento');
            $table->string('foto_dni_frente')->nullable();
            $table->string('foto_dni_dorso')->nullable();
            $table->string('foto_clu_frente')->nullable();
            $table->string('foto_clu_dorso')->nullable();
            $table->boolean('apto_psicofisico')->default(false);
            $table->boolean('certificado_idoneidad')->default(false);
            $table->string('estado_validacion')->default('pendiente')->comment('pendiente, aprobada, rechazada, vencida');
            $table->text('observaciones')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('credenciales_lu');
    }
};
