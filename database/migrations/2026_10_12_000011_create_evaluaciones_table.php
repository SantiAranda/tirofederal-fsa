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
        Schema::create('evaluaciones', function (Blueprint $table) {
            $table->id();
            $table->foreignId('socio_profile_id')->constrained('socio_profiles')->cascadeOnDelete();
            $table->string('evaluado_type')->comment('App\Models\InstructorProfile, App\Models\Evento, o Sistema');
            $table->unsignedBigInteger('evaluado_id')->nullable();
            $table->tinyInteger('puntaje_numerico')->comment('Escala 1 a 5');
            $table->text('comentario')->nullable();
            $table->boolean('aprobada_publicacion')->default(false)->comment('Exhibir en testimonios portal publico');
            $table->timestamps();

            $table->index(['evaluado_type', 'evaluado_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('evaluaciones');
    }
};
