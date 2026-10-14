<?php

namespace App\Providers;

use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureDefaults();

        // RNF05: Integridad Transaccional SQLite (WAL, Foreign Keys y Timeout de Concurrencia)
        if (DB::getDriverName() === 'sqlite') {
            DB::statement('PRAGMA foreign_keys = ON;');
            if (! app()->runningUnitTests() && config('database.connections.sqlite.database') !== ':memory:') {
                DB::statement('PRAGMA journal_mode = WAL;');
                DB::statement('PRAGMA busy_timeout = 5000;');
            }
        }

        \Illuminate\Support\Facades\Route::model('socio', \App\Models\SocioProfile::class);
        \Illuminate\Support\Facades\Route::model('instructor', \App\Models\InstructorProfile::class);
        \Illuminate\Support\Facades\Route::model('credencial', \App\Models\CredencialLu::class);
    }

    /**
     * Configure default behaviors for production-ready applications.
     */
    protected function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        Password::defaults(fn (): ?Password => app()->isProduction()
            ? Password::min(12)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
                ->uncompromised()
            : null,
        );
    }
}
