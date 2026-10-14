<?php

namespace Database\Seeders;

use App\Enums\EstadoCLU;
use App\Enums\EstadoSocio;
use App\Enums\RolUsuario;
use App\Enums\TipoSector;
use App\Models\CredencialLu;
use App\Models\InstructorProfile;
use App\Models\LineaDeTiro;
use App\Models\Membresia;
use App\Models\SocioProfile;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database according to SPECS.md.
     */
    public function run(): void
    {
        // 1. Membresías institucionales (SPECS 3.2: Plan Inicial, Cuota Mensual, Plan Familiar, Tirador por Día)
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

        Membresia::create([
            'nombre_plan' => 'Tirador por Día',
            'cuota_ingreso' => 0.00,
            'monto_mensual' => 0.00,
            'descripcion' => 'Arancel por jornada única para práctica individual asistida por instructor (RF16).',
            'activa' => true,
        ]);

        // 2. Líneas de tiro (SPECS 3.6: 9 líneas principales + sector dinámico)
        for ($i = 1; $i <= 9; $i++) {
            LineaDeTiro::create([
                'numero_linea' => $i,
                'nombre' => "Línea {$i}",
                'tipo_sector' => TipoSector::EDIFICIO_PRINCIPAL,
                'calibre_permitido' => 'Armas cortas (.22 LR, 9mm, .38, .45) y Carabina .22',
                'capacidad_simultanea' => 1,
                'distancia_metros' => 25,
                'disponible' => true,
                'descripcion' => "Pedana de tiro estándar #{$i} en el edificio principal.",
            ]);
        }

        LineaDeTiro::create([
            'numero_linea' => 10,
            'nombre' => 'Sector Dinámico (IPSC)',
            'tipo_sector' => TipoSector::TIRO_PRACTICO_DINAMICO,
            'calibre_permitido' => 'Calibres homologados IPSC / Tiro Práctico',
            'capacidad_simultanea' => 1,
            'distancia_metros' => 50,
            'disponible' => true,
            'descripcion' => 'Cancha de tiro en movimiento para tiradas dinámicas y torneos.',
        ]);

        // 3. Usuario Administrador / Presidente (Miguel Ángel Fariña - SPECS 3.1)
        User::create([
            'nombre' => 'Miguel Ángel',
            'name' => 'Miguel Ángel',
            'apellido' => 'Fariña',
            'username' => 'presidente',
            'usuario' => 'presidente',
            'email' => 'presidente@tirofederalformosa.org.ar',
            'dni' => '12345678',
            'fecha_nacimiento' => '1965-05-15',
            'telefono' => '3704123456',
            'domicilio' => 'Formosa Capital',
            'rol' => RolUsuario::PRESIDENTE,
            'activo' => true,
            'email_verified_at' => now(),
            'password' => Hash::make('admin1234'),
        ]);

        // 4. Usuario Instructor (César Daniel Benítez - SPECS 3.5)
        $userInstructor = User::create([
            'nombre' => 'César Daniel',
            'name' => 'César Daniel',
            'apellido' => 'Benítez',
            'username' => 'instructor',
            'usuario' => 'instructor',
            'email' => 'instructor@tirofederalformosa.org.ar',
            'dni' => '23456789',
            'fecha_nacimiento' => '1980-08-20',
            'telefono' => '3704654321',
            'domicilio' => 'Formosa Capital',
            'rol' => RolUsuario::INSTRUCTOR,
            'activo' => true,
            'email_verified_at' => now(),
            'password' => Hash::make('instructor1234'),
        ]);

        InstructorProfile::create([
            'user_id' => $userInstructor->id,
            'matricula_habilitante' => 'ITB-ANMAC-4521',
            'especialidad' => 'Instructor General',
            'calificacion_promedio' => 5.00,
            'disponible' => true,
        ]);

        // 5. Usuario Socio de prueba (Juan Carlos Pérez - SPECS 3.3 & 3.4)
        $userSocio = User::create([
            'nombre' => 'Juan Carlos',
            'name' => 'Juan Carlos',
            'apellido' => 'Pérez',
            'username' => 'socio_juan',
            'usuario' => 'socio_juan',
            'email' => 'socio@tirofederalformosa.org.ar',
            'dni' => '34567890',
            'fecha_nacimiento' => '1992-03-10',
            'telefono' => '3704987654',
            'domicilio' => 'Barrio San Martín, Formosa',
            'rol' => RolUsuario::SOCIO,
            'activo' => true,
            'email_verified_at' => now(),
            'password' => Hash::make('socio1234'),
        ]);

        $socioProfile = SocioProfile::create([
            'user_id' => $userSocio->id,
            'numero_socio' => 'TF-00101',
            'membresia_id' => $cuotaMensual->id,
            'fecha_alta' => '2025-01-10',
            'estado_habilitacion' => EstadoSocio::ACTIVO,
            'posee_arma_propia' => true,
            'es_tirador_diario' => false,
        ]);

        CredencialLu::create([
            'socio_profile_id' => $socioProfile->id,
            'numero_clu' => 'CLU-9876543-A',
            'fecha_emision' => '2024-05-01',
            'fecha_vencimiento' => '2029-05-01',
            'foto_dni_frente_path' => 'legajos/dni_frente_sample.jpg',
            'foto_dni_dorso_path' => 'legajos/dni_dorso_sample.jpg',
            'foto_clu_frente_path' => 'legajos/clu_frente_sample.jpg',
            'foto_clu_dorso_path' => 'legajos/clu_dorso_sample.jpg',
            'apto_psicofisico' => true,
            'certificado_idoneidad' => true,
            'estado_validacion' => EstadoCLU::APROBADO,
            'observaciones_auditoria' => 'Credencial verificada conforme a normativa ANMaC.',
        ]);
    }
}
