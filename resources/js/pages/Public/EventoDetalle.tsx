import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import PublicLayout from '@/layouts/public/PublicLayout';
import { badgeTipoEvento, dia, fechaLarga as formatFecha, hora as formatHora, labelTipoEvento, mesCorto } from '@/lib/eventos';
import { ArrowLeft, CalendarDays, CheckCircle2, ChevronRight, Clock, LogIn, Tag, Users, Wallet } from 'lucide-react';

interface Evento {
    id: number;
    nombre: string;
    descripcion: string | null;
    fecha_evento: string;
    tipo: string;
    cupo_maximo: number | null;
    cupos_disponibles: number | null;
    arancel: number | null;
}

interface EventoDetalleProps {
    evento: Evento;
    finalizado: boolean;
    esSocio: boolean;
    yaInscripto: boolean;
    otrosEventos: Evento[];
}

interface PageProps {
    auth: { user: { rol: string } | null };
    flash: { success?: string | null; error?: string | null };
    errors: Record<string, string>;
    [key: string]: unknown;
}

function formatArancel(valor: number | null | undefined) {
    if (!valor) {
        return 'Sin costo';
    }

    return valor.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 });
}

export default function EventoDetalle({ evento, finalizado, esSocio, yaInscripto, otrosEventos = [] }: EventoDetalleProps) {
    const { auth, flash, errors } = usePage<PageProps>().props;
    const [enviando, setEnviando] = useState(false);

    const sinCupo = evento.cupos_disponibles !== null && evento.cupos_disponibles <= 0;

    function inscribirme() {
        setEnviando(true);
        router.post(`/eventos/${evento.id}/inscribir`, {}, {
            preserveScroll: true,
            onFinish: () => setEnviando(false),
        });
    }

    function renderInscripcion() {
        if (finalizado) {
            return <p className="text-sm text-gray-500">Este evento ya finalizó.</p>;
        }

        if (yaInscripto) {
            return (
                <p className="flex items-center gap-2 text-sm font-medium text-green-700">
                    <CheckCircle2 className="w-5 h-5" /> Ya estás preinscripto en este evento.
                </p>
            );
        }

        if (sinCupo) {
            return <p className="text-sm font-medium text-red-600">Cupo completo.</p>;
        }

        if (esSocio) {
            return (
                <button
                    type="button"
                    onClick={inscribirme}
                    disabled={enviando}
                    className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold px-5 py-3 rounded-xl transition-colors"
                >
                    {enviando ? 'Enviando…' : 'Preinscribirme'}
                </button>
            );
        }

        if (!auth?.user) {
            return (
                <Link
                    href="/login"
                    className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-xl transition-colors"
                >
                    <LogIn className="w-4 h-4" /> Ingresá para inscribirte
                </Link>
            );
        }

        return <p className="text-sm text-gray-500">La inscripción en línea está disponible para socios.</p>;
    }

    return (
        <PublicLayout>
            <Head title={`${evento.nombre} — Tiro Federal Formosa`} />

            {/* Migas de pan */}
            <div className="bg-gray-50 border-b border-gray-200">
                <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-2 min-w-0">
                        <Link href="/" className="hover:text-blue-600">Inicio</Link>
                        <span>/</span>
                        <Link href="/eventos" className="hover:text-blue-600">Eventos y Torneos</Link>
                        <span>/</span>
                        <span className="text-gray-700 font-medium truncate">{evento.nombre}</span>
                    </div>
                    <Link href="/eventos" className="shrink-0 inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium">
                        <ArrowLeft className="w-3.5 h-3.5" /> Volver a Eventos
                    </Link>
                </div>
            </div>

            {/* Encabezado */}
            <section className="bg-gradient-to-br from-gray-900 to-blue-900 py-16 text-white">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badgeTipoEvento(evento.tipo)}`}>
                            <Tag className="w-3 h-3" />
                            {labelTipoEvento(evento.tipo)}
                        </span>
                        {finalizado && (
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold border bg-gray-100 text-gray-600 border-gray-200">
                                Finalizado
                            </span>
                        )}
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-bold leading-tight">{evento.nombre}</h1>
                    <p className="mt-4 text-blue-100 capitalize flex items-center gap-2">
                        <CalendarDays className="w-5 h-5" />
                        {formatFecha(evento.fecha_evento)} · {formatHora(evento.fecha_evento)} h
                    </p>
                </div>
            </section>

            <section className="py-12 bg-white">
                <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Descripción */}
                    <div className="lg:col-span-2">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Sobre el evento</h2>
                        {evento.descripcion ? (
                            <div className="text-gray-700 leading-relaxed whitespace-pre-line">{evento.descripcion}</div>
                        ) : (
                            <p className="text-gray-400">El club todavía no cargó una descripción para este evento.</p>
                        )}
                    </div>

                    {/* Ficha */}
                    <aside className="bg-gray-50 border border-gray-200 rounded-2xl p-6 h-fit space-y-5">
                        <div className="flex items-start gap-3">
                            <div className="bg-blue-600 text-white rounded-xl px-3 py-2 text-center leading-none">
                                <div className="text-xl font-bold">{dia(evento.fecha_evento)}</div>
                                <div className="text-[11px] uppercase mt-1">{mesCorto(evento.fecha_evento)}</div>
                            </div>
                            <div className="text-sm">
                                <div className="font-semibold text-gray-900 capitalize">{formatFecha(evento.fecha_evento)}</div>
                                <div className="text-gray-500 flex items-center gap-1 mt-0.5">
                                    <Clock className="w-3.5 h-3.5" /> {formatHora(evento.fecha_evento)} h
                                </div>
                            </div>
                        </div>

                        <dl className="space-y-3 text-sm">
                            <div className="flex items-center justify-between gap-4">
                                <dt className="flex items-center gap-2 text-gray-500"><Wallet className="w-4 h-4" /> Inscripción</dt>
                                <dd className="font-semibold text-gray-900">{formatArancel(evento.arancel)}</dd>
                            </div>
                            {evento.cupo_maximo !== null && (
                                <div className="flex items-center justify-between gap-4">
                                    <dt className="flex items-center gap-2 text-gray-500"><Users className="w-4 h-4" /> Cupos</dt>
                                    <dd className="font-semibold text-gray-900">
                                        {finalizado
                                            ? `${evento.cupo_maximo} lugares`
                                            : `${evento.cupos_disponibles ?? 0} de ${evento.cupo_maximo} disponibles`}
                                    </dd>
                                </div>
                            )}
                        </dl>

                        <div className="pt-4 border-t border-gray-200 space-y-3">
                            {flash?.success && <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">{flash.success}</p>}
                            {(errors?.evento || flash?.error) && (
                                <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{errors?.evento || flash?.error}</p>
                            )}
                            {renderInscripcion()}
                        </div>
                    </aside>
                </div>
            </section>

            {/* Otros eventos */}
            {otrosEventos.length > 0 && (
                <section className="bg-gray-50 border-t border-gray-200 py-12">
                    <div className="max-w-5xl mx-auto px-4">
                        <div className="flex items-end justify-between mb-8">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-widest text-blue-700">Agenda</span>
                                <h3 className="text-2xl font-bold text-gray-900 mt-1">Otros próximos eventos</h3>
                            </div>
                            <Link href="/eventos" className="hidden sm:inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm">
                                Ver todos <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {otrosEventos.map((otro) => (
                                <Link
                                    key={otro.id}
                                    href={`/eventos/${otro.id}`}
                                    className="group block bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
                                >
                                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold border mb-2 ${badgeTipoEvento(otro.tipo)}`}>
                                        {labelTipoEvento(otro.tipo)}
                                    </span>
                                    <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">{otro.nombre}</h4>
                                    <p className="text-xs text-gray-500 mt-2 capitalize">{formatFecha(otro.fecha_evento)}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </PublicLayout>
    );
}
