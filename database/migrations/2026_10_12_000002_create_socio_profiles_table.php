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
        Schema::create('socio_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained('users')->cascadeOnDelete();
            $table->foreignId('membresia_id')->nullable()->constrained('membresias')->nullOnDelete();
            $table->string('numero_socio')->unique()->nullable()->comment('Nullable para tiradores eventuales por un dia (RF16)');
            $table->string('estado_habilitacion')->default('pendiente_validacion')->comment('activo, en_mora, inactivo, pendiente_validacion');
            $table->boolean('posee_arma_propia')->default(false);
            $table->boolean('es_tirador_diario')->default(false);
            $table->date('fecha_alta');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('socio_profiles');
    }
};
