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
            $table->foreignId('socio_profile_id')->unique()->constrained('socio_profiles')->cascadeOnDelete();
            $table->string('numero_clu')->unique()->nullable()->comment('Nullable si es principiante sin CLU');
            $table->date('fecha_emision')->nullable();
            $table->date('fecha_vencimiento')->nullable();
            $table->string('foto_dni_frente_path')->nullable()->comment('Almacenado en storage/app/private/legajos');
            $table->string('foto_dni_dorso_path')->nullable();
            $table->string('foto_clu_frente_path')->nullable();
            $table->string('foto_clu_dorso_path')->nullable();
            $table->boolean('apto_psicofisico')->default(false);
            $table->boolean('certificado_idoneidad')->default(false);
            $table->string('estado_validacion')->default('pendiente')->comment('pendiente, aprobado, rechazado, vencido, sin_clu');
            $table->text('observaciones_auditoria')->nullable();
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
