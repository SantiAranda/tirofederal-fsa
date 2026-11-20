<?php

namespace Database\Seeders;

use App\Enums\EstadoCLU;
use App\Enums\EstadoSocio;
use App\Enums\MetodoPago;
use App\Enums\RolUsuario;
use App\Enums\TipoSector;
use App\Models\Comprobante;
use App\Models\CredencialLu;
use App\Models\Evaluacion;
use App\Models\Evento;
use App\Models\Insumo;
use App\Models\InstructorProfile;
use App\Models\LineaDeTiro;
use App\Models\Membresia;
use App\Models\Noticia;
use App\Models\Pago;
use App\Models\SocioProfile;
use App\Models\Turno;
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

        // 6. Eventos y Torneos
        Evento::firstOrCreate(
            ['titulo' => 'Torneo Apertura Pistola Militar 9mm'],
            [
                'descripcion' => 'Competencia oficial de tiro de precisión a 25 metros. Categorías Libre y Promocional.',
                'tipo_evento' => 'torneo',
                'fecha_evento' => now()->addDays(7)->setTime(9, 0),
                'cupo_maximo' => 20,
                'cupos_disponibles' => 15,
                'costo_inscripcion' => 5000.00,
                'publicado' => true,
            ]
        );

        Evento::firstOrCreate(
            ['titulo' => 'Clínica de Tiro Práctico Dinámico IPSC'],
            [
                'descripcion' => 'Capacitación intensiva sobre desplazamientos, desenfunde seguro y transiciones entre blancos múltiples.',
                'tipo_evento' => 'curso',
                'fecha_evento' => now()->addDays(14)->setTime(14, 30),
                'cupo_maximo' => 12,
                'cupos_disponibles' => 8,
                'costo_inscripcion' => 8500.00,
                'publicado' => true,
            ]
        );

        Evento::firstOrCreate(
            ['titulo' => 'Torneo Confraternidad Carabina .22 LR'],
            [
                'descripcion' => 'Encuentro deportivo tradicional para socios y tiradores invitados en pedana cubierta.',
                'tipo_evento' => 'evento',
                'fecha_evento' => now()->addDays(21)->setTime(10, 0),
                'cupo_maximo' => 30,
                'cupos_disponibles' => 24,
                'costo_inscripcion' => 3000.00,
                'publicado' => true,
            ]
        );

        // 7. Noticias Institucionales
        $presidente = User::where('email', 'presidente@tirofederalformosa.org.ar')->first();

        Noticia::firstOrCreate(
            ['slug' => 'inauguracion-nuevas-pedanas-automatizadas'],
            [
                'user_id' => $presidente?->id,
                'titulo' => 'Inauguración de Nuevas Pedanas Automatizadas',
                'contenido' => 'La Comisión Directiva se enorgullece en anunciar la modernización del sistema de transporte de blancos en las líneas 1 a 6, mejorando la seguridad y comodidad en las prácticas.',
                'imagen_portada' => '/images/sobre-nosotros.jpg',
                'publicada' => true,
                'fecha_publicacion' => now()->subDays(2),
            ]
        );

        Noticia::firstOrCreate(
            ['slug' => 'renovacion-certificaciones-anmac-2026'],
            [
                'user_id' => $presidente?->id,
                'titulo' => 'Renovación de Certificaciones ANMaC y Protocolos 2026',
                'contenido' => 'Recordamos a todos los asociados la obligatoriedad de mantener la Credencial de Legítimo Usuario (CLU) vigente. La administración brinda asesoramiento gratuito para el trámite.',
                'imagen_portada' => '/images/hero-bg.jpg',
                'publicada' => true,
                'fecha_publicacion' => now()->subDays(5),
            ]
        );

        Noticia::firstOrCreate(
            ['slug' => 'gran-exito-torneo-regional-tiro-neumatico'],
            [
                'user_id' => $presidente?->id,
                'titulo' => 'Gran Éxito en el Torneo Regional de Tiro Neumático',
                'contenido' => 'Con más de 40 tiradores de toda la provincia y la región, se llevó a cabo una jornada inolvidable de camaradería y destreza deportiva en nuestras instalaciones.',
                'imagen_portada' => '/images/sobre-nosotros.jpg',
                'publicada' => true,
                'fecha_publicacion' => now()->subDays(10),
            ]
        );

        // 8. Evaluaciones y Testimonios
        Evaluacion::firstOrCreate(
            [
                'socio_profile_id' => $socioProfile->id,
                'evaluado_type' => 'App\Models\InstructorProfile',
                'evaluado_id' => $userInstructor->id,
            ],
            [
                'puntaje_numerico' => 5,
                'comentario' => 'Excelente polígono, los instructores son muy atentos a las medidas de seguridad y el ambiente es de total camaradería.',
                'aprobada_publicacion' => true,
            ]
        );

        // 9. Insumos
        Insumo::firstOrCreate(
            ['nombre' => 'Blancos Internacionales Pistola 25m'],
            [
                'categoria' => 'Blancos y Siluetas',
                'cantidad_stock' => 350,
                'stock_minimo' => 50,
                'precio_unitario' => 350.00,
            ]
        );

        Insumo::firstOrCreate(
            ['nombre' => 'Siluetas Metálicas Abatibles IPSC'],
            [
                'categoria' => 'Blancos y Siluetas',
                'cantidad_stock' => 20,
                'stock_minimo' => 5,
                'precio_unitario' => 15000.00,
            ]
        );

        Insumo::firstOrCreate(
            ['nombre' => 'Protector Auditivo de Copa Homologado'],
            [
                'categoria' => 'Seguridad y Protección',
                'cantidad_stock' => 15,
                'stock_minimo' => 4,
                'precio_unitario' => 18000.00,
            ]
        );

        // 10. Turno de prueba
        Turno::firstOrCreate(
            [
                'socio_profile_id' => $socioProfile->id,
                'linea_de_tiro_id' => 1,
                'fecha' => today()->toDateString(),
            ],
            [
                'instructor_profile_id' => 1,
                'hora_inicio' => '16:00:00',
                'hora_fin' => '17:00:00',
                'es_practica_individual_dia' => false,
                'monto_arancel' => 0.00,
                'estado' => 'reservado',
                'observaciones' => 'Práctica estándar con pistola 9mm.',
            ]
        );

        // 11. Pagos del mes
        $pago = Pago::firstOrCreate(
            [
                'socio_profile_id' => $socioProfile->id,
                'periodo_imputado' => now()->format('Y-m'),
            ],
            [
                'monto' => 10000.00,
                'fecha_pago' => now()->subDays(5),
                'tipo_concepto' => 'cuota_mensual',
                'metodo_pago' => MetodoPago::TRANSFERENCIA,
                'estado' => 'aprobado',
            ]
        );

        Comprobante::firstOrCreate(
            ['pago_id' => $pago->id],
            [
                'codigo_transaccion' => sprintf('TFF-%d-%06d', now()->year, $pago->id),
                'fecha_emision' => $pago->fecha_pago,
            ]
        );
    }
}
