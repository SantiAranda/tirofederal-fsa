import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public/PublicLayout';
import {
    UserPlus,
    CalendarDays,
    ChevronRight,
    Target,
    Shield,
    Trophy,
    Users,
    ArrowRight,
    Star,
    Clock,
    MapPin,
} from 'lucide-react';

interface Evento {
    id: number;
    nombre: string;
    descripcion: string | null;
    fecha_evento: string;
    tipo: string;
}

interface Testimonio {
    id: number;
    comentario: string;
    puntaje: number;
    socioProfile?: {
        user?: { name: string };
        [key: string]: unknown;
    };
}

interface Noticia {
    id: number;
    titulo: string;
    resumen: string | null;
    fecha_publicacion: string;
    imagen_url: string | null;
}

interface HomeProps {
    eventosProximos: Evento[];
    testimonios: Testimonio[];
    noticiasRecientes: Noticia[];
}

// --- Disciplinas hardcodeadas (hasta que vengan del back) ---
const DISCIPLINAS = [
    {
        icono: Target,
        nombre: 'Armas Cortas',
        descripcion: 'Pistola y revólver a 25 metros. Calibres .22 LR, 9 mm, .38 SPL y .45 ACP.',
        color: 'bg-blue-50 text-blue-600',
    },
    {
        icono: Shield,
        nombre: 'Tiro Neumático',
        descripcion: 'Rifle de aire comprimido y carabina .22 para iniciación y tiro olímpico.',
        color: 'bg-green-50 text-green-600',
    },
    {
        icono: Trophy,
        nombre: 'Tiro Práctico IPSC',
        descripcion: 'Recorridos dinámicos con desplazamientos, blancos múltiples y cronometraje.',
        color: 'bg-orange-50 text-orange-600',
    },
];

// --- Estadísticas ---
const STATS = [
    { valor: '1911', label: 'Fundación' },
    { valor: '+115', label: 'Años de trayectoria' },
    { valor: '3', label: 'Disciplinas' },
    { valor: '10', label: 'Pedanas de tiro' },
];

// Helpers
function formatFecha(dateStr: string) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' });
}

function badgeTipo(tipo: string) {
    const map: Record<string, string> = {
        torneo: 'bg-yellow-100 text-yellow-700',
        curso: 'bg-blue-100 text-blue-700',
        evento: 'bg-purple-100 text-purple-700',
    };
    return map[tipo?.toLowerCase()] ?? 'bg-gray-100 text-gray-600';
}

export default function Home({ eventosProximos, testimonios, noticiasRecientes }: HomeProps) {
    return (
        <PublicLayout>
            <Head title="Tiro Federal Formosa — Inicio" />

            {/* ═══════════════════════════════════════
                HERO
            ═══════════════════════════════════════ */}
            <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-gray-900">
                {/* Overlay imagen de fondo */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-gray-900/30" />

                {/* Contenido */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="max-w-2xl animate-fade-in-up">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                            Bienvenidos al{' '}
                            <span className="text-blue-400">Tiro Federal</span>{' '}
                            Formosa
                        </h1>
                        <p className="text-lg text-gray-300 leading-relaxed mb-10 max-w-xl animate-fade-in-up-delay">
                            Promovemos la práctica responsable del tiro deportivo, el espíritu
                            de superación y los valores del deporte.
                        </p>
                        <div className="flex flex-wrap gap-4 animate-fade-in-up-delay">
                            <Link
                                href="/login"
                                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0"
                            >
                                <UserPlus className="w-5 h-5" />
                                Volvete miembro
                            </Link>
                            <Link
                                href="/eventos"
                                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl border border-white/20 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                            >
                                <CalendarDays className="w-5 h-5" />
                                Ver eventos
                            </Link>
                        </div>
                    </div>
                </div>

                {/* WhatsApp flotante */}
                <a
                    href="https://wa.me/543704000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-110"
                    aria-label="Contactar por WhatsApp"
                >
                    <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                        <path d="M12 0C5.374 0 0 5.373 0 12c0 2.136.564 4.14 1.546 5.877L0 24l6.316-1.518A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.797 9.797 0 01-4.964-1.348l-.356-.211-3.748.901.934-3.643-.232-.374A9.767 9.767 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
                    </svg>
                </a>
            </section>

            {/* ═══════════════════════════════════════
                ESTADÍSTICAS
            ═══════════════════════════════════════ */}
            <section className="bg-blue-600 py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
                        {STATS.map((s) => (
                            <div key={s.label}>
                                <div className="text-3xl sm:text-4xl font-bold">{s.valor}</div>
                                <div className="text-sm text-blue-200 mt-1">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
                SOBRE NOSOTROS
            ═══════════════════════════════════════ */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        {/* Imagen */}
                        <div className="relative">
                            <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] bg-gray-200">
                                <img
                                    src="/images/sobre-nosotros.jpg"
                                    alt="Polígono Tiro Federal Formosa"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://placehold.co/800x600/1e3a5f/ffffff?text=Tiro+Federal+Formosa';
                                    }}
                                />
                            </div>
                            {/* Tarjeta flotante */}
                            <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white rounded-xl p-5 shadow-xl hidden sm:block">
                                <div className="text-3xl font-bold">+115</div>
                                <div className="text-sm text-blue-200">años de historia</div>
                            </div>
                        </div>

                        {/* Texto */}
                        <div>
                            <span className="text-blue-600 text-sm font-semibold uppercase tracking-wider">Nuestra institución</span>
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-6">Sobre Nosotros</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Fundado el <strong>1 de septiembre de 1911</strong>, el{' '}
                                <strong>Tiro Federal Formosa</strong> surge como una de las instituciones
                                sociales y deportivas más antiguas y representativas de nuestra provincia.
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-8">
                                A lo largo de sus más de 115 años de trayectoria institucional, el polígono
                                evolucionó desde el adiestramiento en fusiles militares hacia una propuesta
                                polideportiva que abarca disciplinas de armas cortas, armas largas y tiro
                                neumático, consolidándose como un referente regional centrado en la docencia
                                técnica, la seguridad y la práctica deportiva responsable.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="/historia"
                                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors"
                                >
                                    Ver más <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link
                                    href="/decalogo"
                                    className="inline-flex items-center gap-2 border border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 font-semibold px-5 py-2.5 rounded-lg transition-colors"
                                >
                                    Decálogo del tirador
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
                DISCIPLINAS
            ═══════════════════════════════════════ */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <span className="text-blue-600 text-sm font-semibold uppercase tracking-wider">Lo que practicamos</span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">Disciplinas</h2>
                        <p className="text-gray-500 mt-3 max-w-xl mx-auto">
                            Contamos con infraestructura y docentes certificados para las principales modalidades del tiro deportivo.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {DISCIPLINAS.map((disc) => {
                            const Icon = disc.icono;
                            return (
                                <div key={disc.nombre} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-gray-100 group">
                                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${disc.color} group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">{disc.nombre}</h3>
                                    <p className="text-gray-500 leading-relaxed text-sm">{disc.descripcion}</p>
                                </div>
                            );
                        })}
                    </div>

                    <div className="text-center mt-10">
                        <Link
                            href="/disciplinas"
                            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
                        >
                            Ver todas las disciplinas <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
                CÓMO ASOCIARSE
            ═══════════════════════════════════════ */}
            <section className="py-20 bg-white" id="asociarse">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <span className="text-blue-600 text-sm font-semibold uppercase tracking-wider">Únite al club</span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">Cómo asociarse</h2>
                        <p className="text-gray-500 mt-3 max-w-xl mx-auto">
                            Tres pasos simples para comenzar tu experiencia en el tiro deportivo.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        {/* Línea conectora (desktop) */}
                        <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-0.5 bg-blue-100" />

                        {[
                            {
                                paso: '01',
                                titulo: 'Registrate',
                                descripcion: 'Creá tu cuenta en el sistema con tus datos personales.',
                                icono: UserPlus,
                            },
                            {
                                paso: '02',
                                titulo: 'Completá tu perfil',
                                descripcion: 'Cargá tu Credencial de Legítimo Usuario (CLU) y documentación requerida.',
                                icono: Shield,
                            },
                            {
                                paso: '03',
                                titulo: 'Comenzá a tirar',
                                descripcion: 'Una vez aprobado tu legajo, reservá turnos y participá de eventos.',
                                icono: Target,
                            },
                        ].map((item) => {
                            const Icon = item.icono;
                            return (
                                <div key={item.paso} className="flex flex-col items-center text-center group">
                                    <div className="relative w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-200 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                                        <Icon className="w-9 h-9 text-white" />
                                        <span className="absolute -top-2 -right-2 w-6 h-6 bg-white border-2 border-blue-600 rounded-full text-xs font-bold text-blue-600 flex items-center justify-center shadow">
                                            {item.paso.slice(-1)}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">{item.titulo}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{item.descripcion}</p>
                                </div>
                            );
                        })}
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            href="/register"
                            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all shadow-lg hover:shadow-blue-500/30"
                        >
                            <UserPlus className="w-5 h-5" />
                            Crear mi cuenta gratuita
                        </Link>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
                PRÓXIMOS EVENTOS
            ═══════════════════════════════════════ */}
            {eventosProximos.length > 0 && (
                <section className="py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-end justify-between mb-12">
                            <div>
                                <span className="text-blue-600 text-sm font-semibold uppercase tracking-wider">Agenda</span>
                                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-1">Próximos Eventos</h2>
                            </div>
                            <Link href="/eventos" className="hidden sm:inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm">
                                Ver todos <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {eventosProximos.map((evento) => (
                                <div key={evento.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                                    <div className="bg-blue-600 px-6 py-4 flex items-center gap-3">
                                        <CalendarDays className="w-5 h-5 text-blue-200" />
                                        <span className="text-white text-sm font-medium">{formatFecha(evento.fecha_evento)}</span>
                                    </div>
                                    <div className="p-6">
                                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold mb-3 ${badgeTipo(evento.tipo)}`}>
                                            {evento.tipo}
                                        </span>
                                        <h3 className="font-bold text-gray-900 text-lg mb-2">{evento.nombre}</h3>
                                        {evento.descripcion && (
                                            <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{evento.descripcion}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="text-center mt-8 sm:hidden">
                            <Link href="/eventos" className="inline-flex items-center gap-1 text-blue-600 font-medium text-sm">
                                Ver todos los eventos <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* ═══════════════════════════════════════
                NOTICIAS
            ═══════════════════════════════════════ */}
            {noticiasRecientes.length > 0 && (
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <span className="text-blue-600 text-sm font-semibold uppercase tracking-wider">Novedades</span>
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">Últimas Noticias</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {noticiasRecientes.map((noticia) => (
                                <article key={noticia.id} className="group cursor-pointer">
                                    <div className="rounded-2xl overflow-hidden aspect-video bg-gray-100 mb-5">
                                        <img
                                            src={noticia.imagen_url ?? `https://placehold.co/800x450/1e3a5f/ffffff?text=${encodeURIComponent(noticia.titulo)}`}
                                            alt={noticia.titulo}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                                        <Clock className="w-3.5 h-3.5" />
                                        {formatFecha(noticia.fecha_publicacion)}
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                                        {noticia.titulo}
                                    </h3>
                                    {noticia.resumen && (
                                        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{noticia.resumen}</p>
                                    )}
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ═══════════════════════════════════════
                TESTIMONIOS
            ═══════════════════════════════════════ */}
            {testimonios.length > 0 && (
                <section className="py-20 bg-blue-600">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <span className="text-blue-200 text-sm font-semibold uppercase tracking-wider">Nuestra comunidad</span>
                            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">Lo que dicen nuestros socios</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {testimonios.map((t) => (
                                <div key={t.id} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                    <div className="flex gap-1 mb-4">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${i < t.puntaje ? 'fill-yellow-400 text-yellow-400' : 'text-blue-300'}`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-blue-100 text-sm leading-relaxed mb-4 italic">"{t.comentario}"</p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center">
                                            <Users className="w-4 h-4 text-white" />
                                        </div>
                                        <div>
                                            <div className="text-white text-sm font-semibold">
                                                {t.socioProfile?.user?.name ?? 'Socio'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ═══════════════════════════════════════
                UBICACIÓN / CTA FINAL
            ═══════════════════════════════════════ */}
            <section className="py-20 bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="text-blue-400 text-sm font-semibold uppercase tracking-wider">Encontranos</span>
                            <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-6">Dónde estamos</h2>
                            <div className="flex items-start gap-3 mb-4">
                                <MapPin className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                                <p className="text-gray-300">Ruta Nacional N.º 11, Km 1172, Formosa, Argentina</p>
                            </div>
                            <div className="flex items-center gap-3 mb-8">
                                <Clock className="w-5 h-5 text-blue-400 shrink-0" />
                                <p className="text-gray-300">Martes a Domingo · 8:00 hs — 20:00 hs</p>
                            </div>
                            <Link
                                href="/login"
                                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-colors"
                            >
                                <UserPlus className="w-5 h-5" />
                                Quiero ser socio
                            </Link>
                        </div>

                        {/* Mapa embed */}
                        <div className="rounded-2xl overflow-hidden h-72 bg-gray-700 shadow-2xl">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3561.8!2d-58.1800!3d-26.1850!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDExJzA2LjAiUyA1OMKwMTAnNDguMCJX!5e0!3m2!1ses!2sar!4v1600000000000"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Ubicación Tiro Federal Formosa"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
