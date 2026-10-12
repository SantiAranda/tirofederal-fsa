<?php

namespace Database\Seeders;

use App\Models\CredencialLU;
use App\Models\Instructor;
use App\Models\LineaDeTiro;
use App\Models\Membresia;
use App\Models\Socio;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Membresías institucionales
        $planInicial = Membresia::create([
            'nombre_plan' => 'Plan Inicial',
            'cuota_ingreso' => 15000.00,
            'monto_mensual' => 10000.00,
            'descripcion' => 'Inscripción inicial para nuevos miembros con cuota del primer mes incluida.',
            'activa' => true,
        ]);

        $cuotaMensual = Membresia::create([
            'nombre_plan' => 'Cuota Mensual',
            'cuota_ingreso' => 0.00,
            'monto_mensual' => 10000.00,
            'descripcion' => 'Membresía estándar activa para socios regulares del club.',
            'activa' => true,
        ]);

        Membresia::create([
            'nombre_plan' => 'Plan Familiar',
            'cuota_ingreso' => 20000.00,
            'monto_mensual' => 18000.00,
            'descripcion' => 'Membresía bonificada para grupos familiares directos.',
            'activa' => true,
        ]);

        // 2. Líneas de tiro (9 líneas principales + sector dinámico)
        for ($i = 1; $i <= 9; $i++) {
            LineaDeTiro::create([
                'numero' => $i,
                'nombre' => "Línea {$i}",
                'tipo_sector' => 'edificio_principal',
                'calibre_permitido' => 'Armas cortas (.22 LR, 9mm, .38, .45) y Carabina .22',
                'distancia_metros' => 25,
                'disponible' => true,
                'descripcion' => "Pedana de tiro estándar #{$i} en el edificio principal.",
            ]);
        }

        LineaDeTiro::create([
            'numero' => 10,
            'nombre' => 'Sector Dinámico (IPSC)',
            'tipo_sector' => 'tiro_practico_dinamico',
            'calibre_permitido' => 'Calibres homologados IPSC / Tiro Práctico',
            'distancia_metros' => 50,
            'disponible' => true,
            'descripcion' => 'Cancha de tiro en movimiento para tiradas dinámicas y torneos.',
        ]);

        // 3. Usuario Administrador / Presidente (Miguel Ángel Fariña)
        User::create([
            'name' => 'Miguel Ángel',
            'apellido' => 'Fariña',
            'email' => 'presidente@tirofederalformosa.org.ar',
            'dni' => '12345678',
            'fecha_nacimiento' => '1965-05-15',
            'telefono' => '3704123456',
            'domicilio' => 'Formosa Capital',
            'rol' => 'presidente',
            'activo' => true,
            'email_verified_at' => now(),
            'password' => Hash::make('admin1234'),
        ]);

        // 4. Usuario Instructor (César Daniel Benítez)
        $userInstructor = User::create([
            'name' => 'César Daniel',
            'apellido' => 'Benítez',
            'email' => 'instructor@tirofederalformosa.org.ar',
            'dni' => '23456789',
            'fecha_nacimiento' => '1980-08-20',
            'telefono' => '3704654321',
            'domicilio' => 'Formosa Capital',
            'rol' => 'instructor',
            'activo' => true,
            'email_verified_at' => now(),
            'password' => Hash::make('instructor1234'),
        ]);

        Instructor::create([
            'user_id' => $userInstructor->id,
            'matricula_habilitante' => 'ITB-ANMAC-4521',
            'especialidad' => 'Tiro defensivo, idoneidad de tiro y armas cortas',
            'calificacion_promedio' => 5.00,
        ]);

        // 5. Usuario Socio de prueba
        $userSocio = User::create([
            'name' => 'Juan Carlos',
            'apellido' => 'Pérez',
            'email' => 'socio@tirofederalformosa.org.ar',
            'dni' => '34567890',
            'fecha_nacimiento' => '1992-03-10',
            'telefono' => '3704987654',
            'domicilio' => 'Barrio San Martín, Formosa',
            'rol' => 'socio',
            'activo' => true,
            'email_verified_at' => now(),
            'password' => Hash::make('socio1234'),
        ]);

        $socio = Socio::create([
            'user_id' => $userSocio->id,
            'numero_socio' => 'TF-00101',
            'membresia_id' => $cuotaMensual->id,
            'fecha_alta' => '2025-01-10',
            'estado' => 'activo',
            'posee_arma_propia' => true,
        ]);

        CredencialLU::create([
            'socio_id' => $socio->id,
            'numero_clu' => 'CLU-9876543-A',
            'categoria' => 'Tirador Deportivo',
            'fecha_emision' => '2024-05-01',
            'fecha_vencimiento' => '2029-05-01',
            'apto_psicofisico' => true,
            'certificado_idoneidad' => true,
            'estado_validacion' => 'aprobada',
            'observaciones' => 'Credencial verificada conforme a normativa ANMaC.',
        ]);
    }
}
