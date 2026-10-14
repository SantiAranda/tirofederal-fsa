# Especificaciones Técnicas del Sistema (`SPECS.md`)

**Proyecto:** Sistema Web de Gestión y Portal Institucional – Tiro Federal Formosa  
**Cátedra:** Ingeniería de Software III – Licenciatura en Sistemas de Información (UCP)  
**Metodología:** Extreme Programming (XP)  
**Arquitectura:** Monolito Moderno (Server-Driven SPA con Laravel + Inertia.js + React)

---

## 1. Visión General de la Arquitectura y Stack Tecnológico

El sistema se construye bajo el patrón de **Monolito Moderno** acoplando el backend de **Laravel** con una interfaz reactiva en **React** mediante el protocolo de **Inertia.js**. No se expone una API REST tradicional; en su lugar, los controladores de Laravel retornan directamente vistas de React hidratadas con `props` tipados, manteniendo el enrutamiento, sesiones y seguridad del lado del servidor con la experiencia de usuario fluida de una Single Page Application (SPA).

### 1.1. Stack Principal
* **Lenguaje Backend:** PHP 8.3+ (Tipado estricto, Enums nativos, Readonly classes).
* **Framework Backend:** Laravel 11.x.
* **Adaptador Full-Stack:** Inertia.js (`inertiajs/inertia-laravel` + `@inertiajs/react`).
* **Frontend:** React 18+ (JSX / TypeScript), empaquetado con **Vite**.
* **Estilos y Maquetación:** TailwindCSS + Componentes accesibles (shadcn/ui o Headless UI + Lucide Icons) bajo diseño adaptativo *Mobile-First*.
* **Enrutamiento en Cliente:** `tightenco/ziggy` (permite invocar rutas con `route('nombre.ruta')` directamente en React).
* **Base de Datos:** SQLite 3 configurada en modo `WAL (Write-Ahead Logging)` para garantizar transacciones ACID, alto rendimiento concurrente y portabilidad en un único archivo físico.
* **Contenedorización:** Docker y Docker Compose (Nginx + PHP-FPM + Node/Vite + Volumen persistente para SQLite y Storage).

### 1.2. Paquetes y Dependencias Clave
* **Autenticación Base:** Laravel Breeze (Stack Inertia + React).
* **Control de Acceso Basado en Roles (RBAC):** `spatie/laravel-permission` o `Gates`/`Policies` nativos respaldados por PHP Enums (`Presidente`, `Instructor`, `Socio`).
* **Generación de Comprobantes PDF:** `barryvdh/laravel-dompdf` (recibos de pago digitales y envío por SMTP).
* **Exportación de Datos Contables:** `maatwebsite/excel` o `spatie/simple-excel` (exportación de padrón social y reportes financieros en `.xlsx` / `.csv`).

---

## 2. Estructura de Directorios del Proyecto

```text
tiro-federal-fsa/
├── app/
│   ├── Enums/                  # RolUsuario, EstadoSocio, EstadoCLU, TipoSector, MetodoPago
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── PublicController.php        # Portal institucional, historia, decálogo, eventos
│   │   │   ├── Socio/                      # Controladores exclusivos del panel de Socio/Tirador
│   │   │   ├── Instructor/                 # Controladores de agenda y evaluaciones de Instructor
│   │   │   └── Admin/                      # Controladores de Presidencia (ABM padrón, CLU, caja)
│   │   ├── Middleware/
│   │   │   ├── HandleInertiaRequests.php   # Props compartidos (auth.user, alertas CLU, flash msgs)
│   │   │   └── EnsureSocioHabilitado.php   # Bloqueo preventivo de reservas por mora (RF08)
│   │   └── Requests/                       # FormRequests para validación estricta de entrada (RNF02)
│   ├── Models/                 # Modelos Eloquent (User, SocioProfile, CredencialLu, Turno, etc.)
│   ├── Policies/               # Reglas de autorización por entidad
│   └── Services/               # Lógica de dominio (TurneroService, PagoService, CluService)
├── database/
│   ├── database.sqlite         # Archivo único de base de datos relacional SQLite (RNF05)
│   ├── migrations/             # Esquema relacional versionado
│   └── seeders/                # 9 líneas principales, sector dinámico, planes base y usuario Admin
├── resources/
│   ├── js/
│   │   ├── Components/         # UI reutilizable (Botones, Modales, Alertas CLU, Tablas, Tooltips)
│   │   ├── Layouts/
│   │   │   ├── PublicLayout.jsx            # Navbar institucional, footer, acceso al decálogo
│   │   │   └── AuthenticatedLayout.jsx     # Sidebar dinámico según rol (Presidente/Instructor/Socio)
│   │   ├── Pages/
│   │   │   ├── Public/                     # Home, Historia, Disciplinas, Decalogo, Eventos, Contacto
│   │   │   ├── Auth/                       # Login, Register (con carga de DNI/CLU), ForgotPassword
│   │   │   ├── Socio/                      # Dashboard, MisTurnos, ReservarTurno, MisPagos, MiCLU
│   │   │   ├── Instructor/                 # MiAgenda, MisAlumnos, MisEvaluaciones
│   │   │   └── Admin/                      # Socios, ValidacionCLU, Turnos, Pagos, Insumos, Reportes
│   │   └── app.jsx             # Punto de entrada de Inertia + React
│   └── views/
│       ├── app.blade.php       # Única vista Blade raíz (@inertiaHead, @routes, @inertia)
│       └── pdf/
│           └── comprobante.blade.php # Plantilla para emisión de recibos en PDF
└── routes/
    └── web.php                 # Definición de rutas web protegidas por sesión y middlewares RBAC
```

---

## 3. Modelo de Datos y Esquema Relacional (Eloquent ORM)

La jerarquía de clases del dominio se implementa mediante una tabla central `users` y tablas de perfil especializadas (`socio_profiles`, `instructor_profiles`) con relación `1:1`.

### 3.1. `users` (Entidad Base Usuario)
* `id` (PK, bigint)
* `nombre` (string)
* `apellido` (string)
* `dni` (string, unique, index)
* `fecha_nacimiento` (date)
* `email` (string, unique)
* `username` (string, unique, 6 a 30 caracteres alfanuméricos - RF02)
* `password` (string, hash Bcrypt/Argon2 - RF01, RNF01)
* `telefono` (string)
* `domicilio` (string)
* `rol` (enum: `presidente`, `instructor`, `socio` - RF04)
* `activo` (boolean, default: `false` hasta validación de documentación - RF03)
* `timestamps`, `softDeletes` (baja lógica de cuenta - RF09)

### 3.2. `membresias` (Planes y Categorías Societarias - RF07)
* `id` (PK)
* `nombre_plan` (string: `Plan Inicial`, `Cuota Mensual`, `Plan Familiar`, `Tirador por Día`)
* `cuota_ingreso` (decimal 10,2)
* `monto_mensual` (decimal 10,2)
* `descripcion` (text)
* `activa` (boolean, default: `true`)

### 3.3. `socio_profiles` (Especialización Socio - RF06, RF08)
* `id` (PK)
* `user_id` (FK -> `users.id`, unique, cascade on delete)
* `membresia_id` (FK -> `membresias.id`, nullable)
* `numero_socio` (string, unique, nullable para tiradores eventuales por un día - RF16)
* `estado_habilitacion` (enum: `activo`, `en_mora`, `inactivo`, `pendiente_validacion` - RF08)
* `posee_arma_propia` (boolean, default: `false`)
* `es_tirador_diario` (boolean, default: `false` - RF16)
* `fecha_alta` (date)

### 3.4. `credenciales_lu` (Fiscalización ANMaC - Composición 1:1 con Socio - RF03, RF10)
* `id` (PK)
* `socio_profile_id` (FK -> `socio_profiles.id`, unique, cascade on delete)
* `numero_clu` (string, unique, nullable si es principiante sin CLU)
* `fecha_emision` (date, nullable)
* `fecha_vencimiento` (date, nullable)
* `foto_dni_frente_path` (string - almacenado en disco privado `storage/app/private/legajos`)
* `foto_dni_dorso_path` (string)
* `foto_clu_frente_path` (string, nullable)
* `foto_clu_dorso_path` (string, nullable)
* `apto_psicofisico` (boolean, default: `false`)
* `certificado_idoneidad` (boolean, default: `false`)
* `estado_validacion` (enum: `pendiente`, `aprobado`, `rechazado`, `vencido`, `sin_clu`)
* `observaciones_auditoria` (text, nullable)

### 3.5. `instructor_profiles` (Especialización Instructor - RF17)
* `id` (PK)
* `user_id` (FK -> `users.id`, unique, cascade on delete)
* `matricula_habilitante` (string, unique)
* `especialidad` (string: `Armas Cortas`, `Armas Largas`, `Tiro Práctico`, `Instructor General`)
* `calificacion_promedio` (decimal 3,2, default: 5.00)
* `disponible` (boolean, default: `true`)

### 3.6. `lineas_de_tiro` (Capacidad Física del Polígono - RF13)
* `id` (PK)
* `numero_linea` (integer: 1 al 9 para edificio principal; 10+ para sector dinámico)
* `tipo_sector` (enum: `edificio_principal`, `tiro_practico_dinamico`, `neumatico`)
* `calibre_permitido` (string)
* `capacidad_simultanea` (integer, default: 1)
* `disponible` (boolean, default: `true`)

### 3.7. `turnos` (Reservas de Pedana e Instructores - RF14, RF15, RF16, RF18)
* `id` (PK)
* `socio_profile_id` (FK -> `socio_profiles.id`)
* `linea_de_tiro_id` (FK -> `lineas_de_tiro.id`)
* `instructor_profile_id` (FK -> `instructor_profiles.id`, nullable; **obligatorio** si carece de CLU vigente o es práctica diaria)
* `fecha` (date, index)
* `hora_inicio` (time)
* `hora_fin` (time)
* `es_practica_individual_dia` (boolean, default: `false`)
* `monto_arancel` (decimal 10,2, default: 0.00 para socios activos con arma propia)
* `estado` (enum: `reservado`, `confirmado`, `asistido`, `cancelado`)
* **Restricción de Concurrencia:** Validación transaccional e índice para impedir dos turnos activos en la misma `linea_de_tiro_id`, `fecha` y `hora_inicio` (RF15).

### 3.8. `pagos` y `comprobantes` (Cobranzas y Cuenta Corriente - RF22, RF23, RF24)
* **Tabla `pagos`:**
  * `id` (PK)
  * `socio_profile_id` (FK -> `socio_profiles.id`)
  * `monto` (decimal 10,2)
  * `fecha_pago` (datetime)
  * `tipo_concepto` (enum: `cuota_mensual`, `plan_inicial`, `derecho_linea_diario`, `inscripcion_evento`, `compra_insumos`)
  * `periodo_imputado` (string, ej. `2026-10`, nullable)
  * `metodo_pago` (enum: `efectivo`, `transferencia`, `tarjeta`, `pasarela_online`)
  * `estado` (enum: `pendiente`, `aprobado`, `anulado`)
* **Tabla `comprobantes` (Composición 1:1 con `pagos`):**
  * `id` (PK)
  * `pago_id` (FK -> `pagos.id`, unique, cascade on delete)
  * `codigo_transaccion` (string, unique, ej. `TFF-2026-000145`)
  * `fecha_emision` (datetime)
  * `pdf_path` (string)

### 3.9. `eventos` e `inscripciones_evento` (Torneos, Tiradas y Cursos - RF26, RF27)
* **Tabla `eventos`:** `id`, `titulo`, `descripcion`, `tipo_evento` (`torneo`, `tirada_nocturna`, `curso_capacitacion`), `fecha_evento`, `cupo_maximo`, `cupos_disponibles`, `costo_inscripcion`, `publicado` (boolean).
* **Tabla `inscripciones_evento`:** `id`, `evento_id`, `socio_profile_id`, `pago_id` (nullable), `fecha_inscripcion`, `asistencia_confirmada` (boolean), `estado` (`preinscripto`, `confirmado`, `anulado`).

### 3.10. `evaluaciones` (Polimórfica para Instructores, Eventos y Sistema - RF12, RF20)
* `id` (PK)
* `socio_profile_id` (FK -> `socio_profiles.id`)
* `evaluado_type` (string: `App\Models\InstructorProfile`, `App\Models\Evento`, o `Sistema`)
* `evaluado_id` (bigint, nullable)
* `puntaje_numerico` (tinyint, escala 1 a 5)
* `comentario` (text)
* `aprobada_publicacion` (boolean, default: `false` para exhibir en testimonios del portal público)

### 3.11. `insumos` y `noticias` (Stock de Armería y Comunicación - RF11, RF28)
* **Tabla `insumos`:** `id`, `nombre` (municiones, blancos, protectores auditivos/visuales, bastidores, tapines), `categoria`, `cantidad_stock`, `stock_minimo`, `precio_unitario`.
* **Tabla `noticias`:** `id`, `user_id` (autor/Presidente), `titulo`, `slug`, `contenido`, `imagen_portada`, `publicada` (boolean), `fecha_publicacion`.

---

## 4. Comunicación Backend-Frontend con Inertia.js

### 4.1. Estado Global Compartido (`HandleInertiaRequests`)
Laravel inyecta en cada respuesta de Inertia los datos de sesión, rol activo, alertas de vencimiento de CLU (RF10) y mensajes flash de confirmación:

```php
public function share(Request $request): array
{
    return array_merge(parent::share($request), [
        'auth' => [
            'user' => $request->user() ? [
                'id' => $request->user()->id,
                'nombre_completo' => $request->user()->nombre . ' ' . $request->user()->apellido,
                'rol' => $request->user()->rol,
                'estado_socio' => $request->user()->socioProfile?->estado_habilitacion,
                'alerta_clu' => $request->user()->socioProfile?->credencialLu?->obtenerAlertaVencimiento(),
            ] : null,
        ],
        'flash' => [
            'success' => fn () => $request->session()->get('success'),
            'error' => fn () => $request->session()->get('error'),
        ],
    ]);
}
```

### 4.2. Manejo de Formularios y Archivos (`useForm`)
* Todos los formularios interactivos emplean el hook `useForm` de `@inertiajs/react`.
* **Carga de Documentación (RF03):** El envío de imágenes de DNI y CLU se procesa automáticamente como `multipart/form-data` desde el componente React de registro/perfil.
* **Validación y Ayuda Contextual (RNF02, RNF12):** Los errores devueltos por los `FormRequest` de Laravel se enlazan directamente al objeto `errors` de React sin recargar la vista, desplegando *tooltips* y textos de guía en tiempo real.
* **Recargas Parciales (RNF06, RNF07):** En la grilla del turnero, al cambiar la fecha seleccionada se invoca `router.reload({ only: ['disponibilidadLineas', 'instructoresDisponibles'] })`, reduciendo al mínimo la transferencia de datos ante conexiones inestables en el predio de Ruta 11.

---

## 5. Reglas de Negocio Críticas en Servicios de Dominio

1. **Bloqueo Preventivo por Mora (RF08):**
   * El middleware `EnsureSocioHabilitado` intercepta las solicitudes de reserva de turnos. Si `estado_habilitacion === 'en_mora'`, impide la reserva y redirige al estado de cuenta del socio.
2. **Fiscalización de CLU y Asignación Forzosa de Instructor (RF03, RF10, RF16, RF18):**
   * Un socio solo puede reservar línea de tiro sin instructor si su `CredencialLu` figura en estado `aprobado`, su `fecha_vencimiento > now()` y registra `posee_arma_propia === true`.
   * Si el tirador carece de CLU vigente, no posee arma propia o asiste bajo la modalidad de **práctica individual por un día (RF16)**, `TurneroService` exige obligatoriamente vincular un `instructor_profile_id` disponible en ese horario y adiciona el arancel diario (derecho de línea + instrucción + municiones).
3. **Control de Concurrencia en Líneas de Tiro (RF13, RF15):**
   * El polígono parametriza 9 líneas en el edificio principal y el sector de tiro dinámico en las franjas habilitadas (miércoles por la noche, sábados y domingos hasta el mediodía).
   * La creación del turno se ejecuta dentro de `DB::transaction()`, verificando disponibilidad real de la línea y del instructor antes de confirmar el registro.
4. **Resguardo Privado de Legajos ANMaC (RF03, RNF01):**
   * Las fotos de DNI y CLU se guardan en `storage/app/private/legajos/` (fuera del alcance público web) y se sirven únicamente mediante rutas autenticadas autorizadas por `CredencialLuPolicy` para el Presidente y el titular de la cuenta.

---

## 6. Mapa de Rutas (`routes/web.php`) y Componentes React (`Pages/`)

### 6.1. Portal Institucional Público (RF29 a RF32)
| Método | URI | Controlador | Componente React (`Pages/Public/`) | Req. |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/` | `PublicController@home` | `Home.jsx` (Hero, Historia breve, Eventos, Decálogo, Reseñas, Mapa) | RF29-RF32 |
| `GET` | `/historia` | `PublicController@historia` | `Historia.jsx` (Reseña histórica desde 1911 y autoridades) | RF29 |
| `GET` | `/disciplinas` | `PublicController@disciplinas` | `Disciplinas.jsx` (Armas cortas, largas, neumático y práctico) | RF30 |
| `GET` | `/decalogo` | `PublicController@decalogo` | `Decalogo.jsx` (10 reglas de seguridad y protección obligatoria) | RF31 |
| `GET` | `/eventos` | `PublicController@eventos` | `Eventos.jsx` (Calendario de torneos, cursos y tiradas) | RF26 |
| `POST` | `/contacto` | `PublicController@enviarContacto`| Procesa consulta pública y retorna notificación flash | RF32 |

### 6.2. Módulo de Socio / Tirador (`middleware: ['auth', 'role:socio']`)
| Método | URI | Controlador | Componente React (`Pages/Socio/`) | Req. |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/panel` | `Socio\DashboardController@index` | `Dashboard.jsx` (Resumen de membresía, alerta CLU y turnos) | RF08, RF10 |
| `GET` | `/perfil` | `Socio\PerfilController@edit` | `Perfil/Edit.jsx` (Edición de datos permitidos, DNI/CLU y baja) | RF03, RF09 |
| `GET` | `/turnos` | `Socio\TurnoController@index` | `Turnos/Index.jsx` (Turnero interactivo por línea e instructor) | RF14, RF18 |
| `POST` | `/turnos` | `Socio\TurnoController@store` | Registra turno, valida cupo y envía correo SMTP | RF14, RF15, RF25 |
| `PATCH`| `/turnos/{turno}/cancelar`| `Socio\TurnoController@cancel` | Cancela reserva anticipadamente y libera cupo | RF14 |
| `GET` | `/pagos` | `Socio\PagoController@index` | `Pagos/Index.jsx` (Historial de pagos y estado de cuenta) | RF22, RF23 |
| `GET` | `/pagos/{pago}/pdf` | `Socio\PagoController@descargarPdf`| Genera y descarga recibo en formato PDF (`DomPDF`) | RF24 |
| `POST` | `/eventos/{evento}/inscribir` | `Socio\EventoController@inscribir` | Preinscripción en línea con descuento de cupo | RF27 |
| `POST` | `/evaluaciones` | `Socio\EvaluacionController@store` | Envía calificación (1-5) y reseña tras asistir a práctica/evento | RF12, RF20 |

### 6.3. Módulo de Instructor (`middleware: ['auth', 'role:instructor']`)
| Método | URI | Controlador | Componente React (`Pages/Instructor/`) | Req. |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/instructor/agenda` | `Instructor\AgendaController@index` | `Agenda.jsx` (Turnos asignados, alumnos y armamento requerido) | RF19 |
| `PATCH`| `/instructor/turnos/{turno}/asistencia`| `Instructor\AgendaController@confirmar` | Confirma asistencia en línea de tiro y habilita evaluación | RF19, RF20 |
| `GET` | `/instructor/evaluaciones`| `Instructor\EvaluacionController@index`| `Evaluaciones.jsx` (Visualización de calificaciones recibidas) | RF17, RF20 |

### 6.4. Módulo de Presidencia / Administración (`middleware: ['auth', 'role:presidente']`)
| Método | URI | Controlador | Componente React (`Pages/Admin/`) | Req. |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/admin/dashboard` | `Admin\DashboardController@index` | `Dashboard.jsx` (Métricas de afluencia, recaudación y calidad) | RF21, RF34 |
| `RESOURCE`| `/admin/socios` | `Admin\SocioController` | `Socios/Index.jsx`, `Create.jsx`, `Edit.jsx` (ABM padrón +100 socios) | RF06, RF08 |
| `GET` | `/admin/socios/exportar` | `Admin\SocioController@exportar` | Exporta padrón filtrado en Excel/CSV para contaduría | RF33 |
| `PATCH`| `/admin/clu/{credencial}/validar`| `Admin\CluController@validar` | Fiscaliza y aprueba/rechaza fotos de DNI y CLU | RF03, RF10 |
| `RESOURCE`| `/admin/membresias` | `Admin\MembresiaController` | `Membresias/Index.jsx` (Configuración de planes y aranceles) | RF07 |
| `RESOURCE`| `/admin/instructores`| `Admin\InstructorController` | `Instructores/Index.jsx` (ABM de instructores y matrículas) | RF17 |
| `RESOURCE`| `/admin/insumos` | `Admin\InsumoController` | `Insumos/Index.jsx` (CRUD de stock: municiones, blancos, etc.) | RF11 |
| `RESOURCE`| `/admin/pagos` | `Admin\PagoController` | `Pagos/Index.jsx` (Registro de cobros presenciales y recibos) | RF22, RF23 |
| `RESOURCE`| `/admin/eventos` | `Admin\EventoController` | `Eventos/Index.jsx` (ABM de cursos, torneos y preinscriptos) | RF26, RF27 |
| `RESOURCE`| `/admin/noticias` | `Admin\NoticiaController` | `Noticias/Index.jsx` (Publicación de comunicados oficiales) | RF28 |

---

## 7. Cumplimiento de Requisitos No Funcionales (RNF)

* **RNF01 (Cifrado de Credenciales):** Hashing irreversible mediante Bcrypt/Argon2id y reglas de contraseña estrictas (mínimo 8 caracteres, sin espacios, con números y símbolos especiales - RF02).
* **RNF02 (Validación Tipada):** Validación en servidor mediante `FormRequest` en todas las mutaciones de datos.
* **RNF03 (Diseño Orientado a Objetos):** Estructuración modular mediante Modelos Eloquent, Servicios de negocio desacoplados, Políticas de acceso y Enumeraciones tipadas en PHP 8.3.
* **RNF05 (Integridad Transaccional SQLite):** Ejecución de `PRAGMA foreign_keys = ON;`, `PRAGMA journal_mode = WAL;` y `PRAGMA busy_timeout = 5000;` al iniciar la conexión en `AppServiceProvider` para garantizar propiedades ACID sin bloqueos de concurrencia.
* **RNF06 y RNF07 (Tiempos de Respuesta < 1.5s y Baja Conectividad):** Empaquetado con división de código (*code splitting*) en Vite y recargas parciales de props en Inertia para minimizar el consumo de ancho de banda en la zona rural de la Ruta Nacional N.º 11.
* **RNF08, RNF11 y RNF12 (Responsividad, Accesibilidad y Guías Visuales):** Interfaz *Mobile-First* en TailwindCSS con contraste optimizado, etiquetas semánticas accesibles para lectores de pantalla y *tooltips* preventivos antes del envío de formularios.
* **RNF09 y RNF10 (Contenedores y Control de Versiones):** Despliegue reproducible con `Docker` y `docker-compose.yml` (persistiendo el archivo `database.sqlite` y el directorio `storage`), y flujo de trabajo distribuido en ramas de `Git` / `GitHub`.

---

## 8. Estrategia de Pruebas Automatizadas (Pest PHP + Inertia Testing)

Siguiendo la metodología **Extreme Programming (XP)**, cada iteración se valida con pruebas de integración y unitarias sobre SQLite en memoria:

1. **Autenticación y Reglas de Registro (`RF01, RF02, RF03`):** Comprobar rechazo de contraseñas débiles o con espacios y verificar el almacenamiento privado de imágenes DNI/CLU.
2. **Restricción de Roles (`RF04`):** Asegurar que un perfil `Socio` o `Instructor` reciba `403 Forbidden` al intentar acceder a rutas `/admin/*`.
3. **Reglas del Turnero (`RF08, RF10, RF15, RF16`):**
   * Bloqueo de reserva a socios con estado `en_mora`.
   * Exigencia obligatoria de `instructor_profile_id` para usuarios sin CLU vigente o tiradores por un día.
   * Rechazo de reserva duplicada en la misma línea de tiro, fecha y bloque horario.
4. **Flujo Contable y Comprobantes (`RF22, RF24, RF25`):** Verificar que al registrar un pago se actualice el estado del socio, se genere el archivo PDF con `DomPDF` y se encole el correo de confirmación (`Mail::fake()`).
5. **Contratos de Vista Inertia:** Validar mediante `$response->assertInertia(fn (Assert $page) =>$page->component('...')->has('...'))` que cada controlador entregue la estructura de datos esperada por los componentes de React.