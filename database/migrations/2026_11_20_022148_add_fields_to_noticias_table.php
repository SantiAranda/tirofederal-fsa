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
        Schema::table('noticias', function (Blueprint $table) {
            $table->string('categoria', 100)->default('Institucional')->after('titulo');
            $table->text('copete')->nullable()->after('categoria')->comment('Descripcion corta o resumen destacado');
            $table->string('epigrafe', 255)->nullable()->after('imagen_portada')->comment('Epigrafe o pie de foto principal');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('noticias', function (Blueprint $table) {
            $table->dropColumn(['categoria', 'copete', 'epigrafe']);
        });
    }
};
