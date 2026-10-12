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
            $table->foreignId('socio_id')->constrained('socios')->cascadeOnDelete();
            $table->string('evaluable_type');
            $table->unsignedBigInteger('evaluable_id');
            $table->integer('calificacion')->comment('1 to 5');
            $table->text('comentario')->nullable();
            $table->timestamps();

            $table->index(['evaluable_type', 'evaluable_id']);
            $table->unique(['socio_id', 'evaluable_type', 'evaluable_id']);
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
