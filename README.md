# Sistema Web de Gestión y Portal Institucional – Tiro Federal Formosa

Plataforma web integral diseñada para la modernización, digitalización y centralización operativa del **Tiro Federal Formosa**, complementada con un portal institucional de acceso público orientado a la comunidad deportiva y civil.

Este proyecto se desarrolla en el marco de la cátedra **Ingeniería de Software III** de la carrera **Licenciatura en Sistemas de Información** en la **Universidad de la Cuenca del Plata (Sede Formosa)**.

---

## 👥 Integrantes y Cátedra

* **Institución:** Universidad de la Cuenca del Plata – Sede Formosa
* **Carrera:** Licenciatura en Sistemas de Información
* **Cátedra:** Ingeniería de Software III
* **Profesor Titular:** Dr. Marcelo Toledo
* **Equipo de Desarrollo:**
  * Aranda, Santiago Nicolás – DNI 45.901.018
  * Bordón Sbardella, Lourdes Antonella – DNI 42.993.948
  * Luján, Sofía Antonela – DNI 44.464.918
* **Fecha:** Septiembre – Noviembre 2026

---

## 🏛️ Contexto Institucional

El **Tiro Federal Formosa**, fundado el **1 de septiembre de 1911**, es una de las instituciones civiles y deportivas más antiguas y prestigiosas de la provincia de Formosa (más de 115 años de vida institucional). Su predio actual se ubica en el Lote Rural 18, sobre la Ruta Nacional N.º 11 (Km 1134).

### Problemática Detectada
A pesar de contar con un padrón activo de más de 100 socios, la administración cotidiana del club dependía enteramente de registros manuales (cuadernos y planillas físicas):
* Dificultad en la trazabilidad del padrón social y estados de cuotas/aranceles.
* Complejidad en la fiscalización de la **Credencial de Legítimo Usuario (CLU)** y normativas exigidas por la **ANMaC**.
* Falta de un sistema de turnos para optimizar el uso de las líneas de tiro y la disponibilidad limitada de instructores matriculados.
* Ausencia de presencia digital formal que difunda la historia, decálogo de seguridad y disciplinas formativas.

---

## 🎯 Objetivos

### Objetivo General
Desarrollar e implementar una solución web integral para el Tiro Federal Formosa, compuesta por un portal público informativo y un sistema de gestión interna modular con arquitectura SPA moderna, que permita centralizar la administración de socios, optimizar la coordinación de turnos en las líneas de tiro, transparentar el control de pagos y fortalecer la presencia institucional y la difusión del manejo seguro del armamento.

### Objetivos Específicos
1. **Modelar la arquitectura relacional y de dominio** para dar soporte a socios, instructores, turnos de tiro, membresías, eventos, insumos y pagos garantizando integridad transaccional ACID.
2. **Construir el portal institucional público** con información histórica, comisiones, catálogo de disciplinas deportivas, decálogo de seguridad y canales de contacto.
3. **Implementar un sistema de gestión interna con control de acceso basado en roles (RBAC)**: Presidente (Administrador), Instructor y Socio.
4. **Desarrollar el turnero digital para líneas de tiro** (9 líneas principales y sector dinámico), gestionando cupos, bloqueos por mora y asignación de instructores matriculados.
5. **Digitalizar la fiscalización de documentación ANMaC** (DNI y CLU frente/dorso, certificados de idoneidad y apto psicofísico) con alertas de caducidad.
6. **Integrar el módulo contable y de pagos**, registrando cobros presenciales/electrónicos, cuentas corrientes y emisión de comprobantes digitales en PDF.

---

## 🛠️ Stack Tecnológico

El proyecto está construido bajo una arquitectura monolítica moderna desacoplada con **Laravel + Inertia.js + React**:

* **Backend:** [PHP 8.2+] con [Laravel 11+]
  * Lógica de negocio bajo POO rigurosa.
  * Autenticación segura y RBAC (Policies & Gates / Middleware).
  * Generación de comprobantes en PDF con `barryvdh/laravel-dompdf`.
  * Notificaciones por email con Mailables / Markdown.
* **Frontend:** [React 18+] sobre [Inertia.js v2]
  * Arquitectura SPA sin necesidad de crear APIs REST desacopladas ni lidiar con tokens cliente manuales.
  * Ruteo e intercambio de estado fluido directo desde los controladores de Laravel.
  * Componentes modulares, tipados y reutilizables.
* **Estilos & UI:** [Tailwind CSS]
  * Diseño responsivo (Mobile-First) adaptado a tablets y teléfonos de instructores en el predio.
  * Iconografía con Lucide React.
* **Persistencia:** [SQLite] (entorno local y servidor embebido con respaldo ACID de archivo único, ideal para la infraestructura del predio) / Preparado para PostgreSQL / MySQL.
* **Entorno & Despliegue:** [Docker] & [Docker Compose], Git / GitHub.
* **Gestión de Proyecto:** Metodología Ágil **Extreme Programming (XP)** coordinada en [Trello](https://trello.com/b/3N14kXfu/tiro-federal).

---

## 📐 Arquitectura y Módulos del Sistema

```
tirofederal-fsa/
├── app/
│   ├── Http/
│   │   ├── Controllers/          # Controladores de dominio (Portal, Turnos, Socios, Pagos, etc.)
│   │   ├── Requests/             # Form Requests de validación estricta (DNI, CLU, montos)
│   │   └── Middleware/           # Control de roles (RBAC) y verificación de estados
│   ├── Models/                   # Modelos Eloquent
│   │   ├── User.php              # Modelo base de usuario (RBAC)
│   │   ├── Socio.php             # Perfil de asociado, número de socio, estado de cuenta
│   │   ├── Instructor.php        # Matrícula habilitante, especialidad, calificaciones
│   │   ├── CredencialLU.php      # Documentación ANMaC, vigencia, fotos DNI/CLU
│   │   ├── Membresia.php         # Planes (Plan Inicial, Cuota Mensual, Plan Familiar)
│   │   ├── LineaDeTiro.php       # 9 líneas principales + sector dinámico
│   │   ├── Turno.php             # Reservas de pedanas con o sin instructor
│   │   ├── Pago.php              # Registro contable y pasarela
│   │   ├── Comprobante.php       # Recibos descargables en PDF
│   │   ├── Evento.php            # Torneos, tiradas nocturnas, capacitaciones
│   │   ├── Evaluacion.php        # Sistema de reseñas hacia instructores y eventos
│   │   ├── Insumo.php            # Control de stock (blancos, municiones, protectores)
│   │   └── Noticia.php           # Comunicados institucionales de comisión directiva
│   └── Notifications/            # Notificaciones por correo electrónico
├── database/
│   ├── migrations/               # Esquema relacional de la base de datos
│   ├── seeders/                  # Carga inicial (usuarios directivos, líneas, planes)
│   └── factories/                # Generación de datos de prueba
├── resources/
│   ├── js/                       # Frontend SPA (Inertia + React)
│   │   ├── Components/           # Componentes UI reutilizables (Botones, Modales, Inputs, Navbar)
│   │   ├── Layouts/              # PublicLayout, AdminLayout, SocioLayout, InstructorLayout
│   │   ├── Pages/                # Vistas de React renderizadas por Inertia
│   │   │   ├── Public/           # Home, Historia, Disciplinas, Decálogo, Cómo Asociarse, Contacto
│   │   │   ├── Auth/             # Login, Registro de socios, Recuperación de contraseña
│   │   │   ├── Admin/            # Padrón social, Fiscalización CLU, Turnos, Cobranzas, Reportes
│   │   │   ├── Socio/            # Perfil personal, Turnero, Pagos, Credenciales, Reseñas
│   │   │   └── Instructor/       # Agenda operativa de tiradas y calificaciones recibidas
│   │   └── app.jsx               # Entrypoint de Inertia y React
│   └── views/
│       ├── app.blade.php         # Plantilla HTML raíz para Inertia
│       └── pdf/comprobante.blade.php # Plantilla imprimible para DOMPDF
├── routes/
│   ├── web.php                   # Rutas web autenticadas y públicas
│   └── console.php               # Comandos Artisan y tareas programadas
└── docker-compose.yml            # Orquestación del entorno contenedorizado
```

---

## 🔒 Control de Acceso Basado en Roles (RBAC)

1. **Visitante / Aspirante:** Navegación libre por el portal público, consulta de historia institucional, decálogo de seguridad, catálogo de disciplinas y formulario de solicitud de contacto o pre-afiliación.
2. **Socio:** Gestión de perfil personal, reserva y cancelación de turnos en líneas de tiro, carga de credencial ANMaC (CLU), consulta de estado de membresía, pago de cuotas y emisión de reseñas/evaluaciones.
3. **Instructor:** Consulta de agenda de turnos asignados, supervisión de tiradores principiantes o sin arma propia, registro de asistencias y visualización de feedback.
4. **Presidente (Administrador):** Gestión integral del padrón social (+100 socios), fiscalización y validación de credenciales CLU, parametrización de categorías de membresía y aranceles, gestión de eventos/torneos, inventario de insumos y reportes contables/estadísticos para la comisión directiva.

---

## 🚀 Puesta en Marcha (Entorno de Desarrollo)

### Prerrequisitos
* PHP >= 8.2
* Composer
* Node.js >= 18.x y npm
* SQLite3 o Docker

### Instalación Local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/SantiAranda/tiro-federal-fsa.git
   cd tiro-federal-fsa
   ```

2. **Instalar dependencias de PHP y JavaScript:**
   ```bash
   composer install
   npm install
   ```

3. **Configurar el entorno:**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Configurar la base de datos (SQLite):**
   ```bash
   touch database/database.sqlite
   php artisan migrate --seed
   ```

5. **Compilar assets y levantar el servidor:**
   ```bash
   # En una terminal:
   npm run dev

   # En otra terminal:
   php artisan serve
   ```
   La aplicación estará disponible en `http://localhost:8000`.

### Despliegue con Docker
```bash
docker compose up -d --build
docker compose exec app php artisan migrate --seed
```

---

## 📋 Metodología y Planificación (XP)

El proyecto se estructura en 5 iteraciones incrementales bajo la metodología **Extreme Programming**:
* **Iteración 1:** Relevamiento, entrevistas a directivos e instructores, especificación de requerimientos y configuración de entornos (Trello, Git, Docker).
* **Iteración 2:** Modelado relacional, autenticación segura RBAC y maquetación del portal institucional público + decálogo.
* **Iteración 3:** Lógica del turnero en pedanas (9 líneas principales + sector dinámico), asignación de instructores matriculados y módulo de evaluaciones.
* **Iteración 4:** Administración del padrón social, fiscalización de credenciales ANMaC (CLU), cobranzas, cuenta corriente y eventos/cursos.
* **Iteración 5:** Pruebas de aceptación con directivos, correcciones de usabilidad, empaquetamiento Docker y defensa de cátedra.

---

## 📄 Licencia y Derechos

Desarrollado con fines académicos y de impacto social para el **Tiro Federal Formosa**. Todos los derechos reservados © 2026.
