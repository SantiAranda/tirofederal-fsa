<?php

use App\Http\Controllers\Admin\CluController as AdminCluController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\EventoController as AdminEventoController;
use App\Http\Controllers\Admin\InstructorController as AdminInstructorController;
use App\Http\Controllers\Admin\InsumoController as AdminInsumoController;
use App\Http\Controllers\Admin\MembresiaController as AdminMembresiaController;
use App\Http\Controllers\Admin\NoticiaController as AdminNoticiaController;
use App\Http\Controllers\Admin\PagoController as AdminPagoController;
use App\Http\Controllers\Admin\SocioController as AdminSocioController;
use App\Http\Controllers\Instructor\AgendaController as InstructorAgendaController;
use App\Http\Controllers\Instructor\EvaluacionController as InstructorEvaluacionController;
use App\Http\Controllers\PublicController;
use App\Http\Controllers\Socio\DashboardController as SocioDashboardController;
use App\Http\Controllers\Socio\EvaluacionController as SocioEvaluacionController;
use App\Http\Controllers\Socio\EventoController as SocioEventoController;
use App\Http\Controllers\Socio\PagoController as SocioPagoController;
use App\Http\Controllers\Socio\PerfilController as SocioPerfilController;
use App\Http\Controllers\Socio\TurnoController as SocioTurnoController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| 6.1. Portal Institucional Público (RF29 a RF32)
|--------------------------------------------------------------------------
*/
Route::get('/', [PublicController::class, 'home'])->name('home');
Route::get('/historia', [PublicController::class, 'historia'])->name('historia');
Route::get('/disciplinas', [PublicController::class, 'disciplinas'])->name('disciplinas');
Route::get('/decalogo', [PublicController::class, 'decalogo'])->name('decalogo');
Route::get('/eventos', [PublicController::class, 'eventos'])->name('public.eventos');
Route::post('/contacto', [PublicController::class, 'enviarContacto'])->name('contacto.enviar');

/*
|--------------------------------------------------------------------------
| Redirección Inteligente de Dashboard según Rol
|--------------------------------------------------------------------------
*/
Route::get('/dashboard', function () {
    $user = auth()->user();
    if (! $user) {
        return redirect()->route('login');
    }

    if ($user->esPresidente()) {
        return redirect()->route('admin.dashboard');
    }

    if ($user->esInstructor()) {
        return redirect()->route('instructor.agenda.index');
    }

    return redirect()->route('socio.dashboard');
})->middleware(['auth'])->name('dashboard');

/*
|--------------------------------------------------------------------------
| 6.2. Módulo de Socio / Tirador (RF08, RF10, RF14, RF15, RF22, RF23, RF24, RF27)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'role:socio'])->group(function () {
    Route::get('/panel', [SocioDashboardController::class, 'index'])->name('socio.dashboard');

    Route::get('/perfil', [SocioPerfilController::class, 'edit'])->name('socio.perfil.edit');
    Route::patch('/perfil', [SocioPerfilController::class, 'update'])->name('socio.perfil.update');
    Route::delete('/perfil', [SocioPerfilController::class, 'destroy'])->name('socio.perfil.destroy');

    Route::get('/turnos', [SocioTurnoController::class, 'index'])->name('socio.turnos.index');
    Route::post('/turnos', [SocioTurnoController::class, 'store'])
        ->middleware(['socio.habilitado'])
        ->name('socio.turnos.store');
    Route::patch('/turnos/{turno}/cancelar', [SocioTurnoController::class, 'cancel'])->name('socio.turnos.cancel');

    Route::get('/pagos', [SocioPagoController::class, 'index'])->name('socio.pagos.index');
    Route::get('/pagos/{pago}/pdf', [SocioPagoController::class, 'descargarPdf'])->name('socio.pagos.pdf');

    Route::post('/eventos/{evento}/inscribir', [SocioEventoController::class, 'inscribir'])->name('socio.eventos.inscribir');
    Route::post('/evaluaciones', [SocioEvaluacionController::class, 'store'])->name('socio.evaluaciones.store');

    Route::get('/legajo/{credencial}/documento/{tipo}', [AdminCluController::class, 'verDocumento'])->name('socio.clu.documento');
});

/*
|--------------------------------------------------------------------------
| 6.3. Módulo de Instructor (RF17, RF19, RF20)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'role:instructor'])->prefix('instructor')->name('instructor.')->group(function () {
    Route::get('/agenda', [InstructorAgendaController::class, 'index'])->name('agenda.index');
    Route::patch('/turnos/{turno}/asistencia', [InstructorAgendaController::class, 'confirmar'])->name('turnos.asistencia');
    Route::get('/evaluaciones', [InstructorEvaluacionController::class, 'index'])->name('evaluaciones.index');
});

/*
|--------------------------------------------------------------------------
| 6.4. Módulo de Presidencia / Administración (RF03, RF06, RF07, RF08, RF10, RF11, RF17, RF21, RF22, RF23, RF26, RF28, RF33, RF34)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'role:presidente'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');

    Route::get('/socios/exportar', [AdminSocioController::class, 'exportar'])->name('socios.exportar');
    Route::resource('socios', AdminSocioController::class);

    Route::get('/clu', [AdminCluController::class, 'index'])->name('clu.index');
    Route::get('/clu/{credencial}', [AdminCluController::class, 'show'])->name('clu.show');
    Route::patch('/clu/{credencial}/validar', [AdminCluController::class, 'validar'])->name('clu.validar');
    Route::get('/clu/{credencial}/documento/{tipo}', [AdminCluController::class, 'verDocumento'])->name('clu.documento');

    Route::resource('membresias', AdminMembresiaController::class);
    Route::resource('instructores', AdminInstructorController::class)->parameters(['instructores' => 'instructor']);

    Route::patch('/insumos/{insumo}/stock', [AdminInsumoController::class, 'ajustarStock'])->name('insumos.stock');
    Route::resource('insumos', AdminInsumoController::class);

    Route::get('/pagos/{pago}/pdf', [AdminPagoController::class, 'descargarPdf'])->name('pagos.pdf');
    Route::patch('/pagos/{pago}/anular', [AdminPagoController::class, 'anular'])->name('pagos.anular');
    Route::resource('pagos', AdminPagoController::class);

    Route::get('/eventos/{evento}/inscriptos', [AdminEventoController::class, 'inscriptos'])->name('eventos.inscriptos');
    Route::patch('/eventos/inscripciones/{inscripcion}/asistencia', [AdminEventoController::class, 'confirmarAsistencia'])->name('eventos.inscripciones.asistencia');
    Route::resource('eventos', AdminEventoController::class);

    Route::resource('noticias', AdminNoticiaController::class);
});

require __DIR__.'/settings.php';
