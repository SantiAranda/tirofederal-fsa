<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactoRequest;
use App\Models\Evaluacion;
use App\Models\Evento;
use App\Models\Noticia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PublicController extends Controller
{
    /**
     * Portal institucional público (RF29 a RF32).
     */
    public function home(): Response
    {
        $eventosProximos = Evento::where('publicado', true)
            ->where('fecha_evento', '>=', now())
            ->orderBy('fecha_evento')
            ->take(3)
            ->get();

        $testimonios = Evaluacion::where('aprobada_publicacion', true)
            ->with(['socioProfile.user'])
            ->latest()
            ->take(4)
            ->get();

        $noticiasRecientes = Noticia::query()->publicadas()
            ->latest('fecha_publicacion')
            ->take(3)
            ->get();

        return Inertia::render('Public/Home', [
            'eventosProximos' => $eventosProximos,
            'testimonios' => $testimonios,
            'noticiasRecientes' => $noticiasRecientes,
        ]);
    }

    /**
     * Reseña histórica institucional desde 1911 (RF29).
     */
    public function historia(): Response
    {
        return Inertia::render('Public/Historia', [
            'fundacionAnio' => 1911,
            'nombreClub' => 'Tiro Federal Formosa',
            'ubicacion' => 'Ruta Nacional N.º 11, Km 1172, Formosa',
        ]);
    }

    /**
     * Disciplinas habilitadas en el polígono (RF30).
     */
    public function disciplinas(): Response
    {
        return Inertia::render('Public/Disciplinas', [
            'disciplinas' => [
                [
                    'nombre' => 'Armas Cortas y Precisión',
                    'descripcion' => 'Tiro a 25 metros con pistola y revólver (calibres .22 LR, 9mm, .38 SPL, .45 ACP).',
                    'sector' => 'Edificio Principal (Pedanas 1-9)',
                ],
                [
                    'nombre' => 'Carabina y Tiro Neumático',
                    'descripcion' => 'Práctica de rifle de aire y carabina .22 para iniciación y tiro olímpico.',
                    'sector' => 'Sector Neumático y Pedanas Estándar',
                ],
                [
                    'nombre' => 'Tiro Práctico Dinámico (IPSC)',
                    'descripcion' => 'Recorridos de tiro dinámico con desplazamientos, blancos múltiples y cronometraje.',
                    'sector' => 'Sector Dinámico Especial (Pedana 10+)',
                ],
            ],
        ]);
    }

    /**
     * Decálogo de las 10 reglas de seguridad del tirador (RF31).
     */
    public function decalogo(): Response
    {
        $reglas = [
            '1. Trate siempre toda arma como si estuviera cargada.',
            '2. Nunca apunte con un arma a nada que no desee destruir.',
            '3. Mantenga el dedo fuera de la cola del disparador hasta alinearse sobre el blanco.',
            '4. Asegúrese de su blanco y de lo que hay detrás y alrededor de él.',
            '5. Mantenga el arma descargada y abierta con recámara a la vista hasta la orden del oficial de tiro.',
            '6. Uso obligatorio permanente de protección visual y auditiva homologada dentro del polígono.',
            '7. Transporte sus armas descargadas en fundas, cajas o estuches apropiados.',
            '8. No manipule armas bajo el efecto de alcohol, medicamentos o fatiga extrema.',
            '9. Acate de inmediato la orden de ALTO EL FUEGO dada por cualquier persona en la pedana.',
            '10. Conozca las características de funcionamiento y munición adecuada para su arma.',
        ];

        return Inertia::render('Public/Decalogo', [
            'reglas' => $reglas,
        ]);
    }

    /**
     * Calendario público de eventos, torneos y cursos (RF26).
     */
    public function eventos(): Response
    {
        $eventos = Evento::where('publicado', true)
            ->orderBy('fecha_evento')
            ->get();

        return Inertia::render('Public/Eventos', [
            'eventos' => $eventos,
        ]);
    }

    /**
     * Procesa una consulta desde el formulario de contacto público (RF32).
     */
    public function enviarContacto(ContactoRequest $request): RedirectResponse
    {
        // En una etapa posterior se despacha correo electrónico vía SMTP
        return back()->with('success', 'Su consulta ha sido enviada con éxito a la secretaría del club.');
    }
}
