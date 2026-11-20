import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public/PublicLayout';
import { anio, badgeTipoEvento, dia, fechaLarga, hora, labelTipoEvento, mesCorto } from '@/lib/eventos';
import { CalendarDays, ChevronRight, Clock, Tag, Users, Wallet } from 'lucide-react';

interface Evento {
    id: number;
    nombre: string;
    descripcion: string | null;
    fecha_evento: string;
    tipo: string;
    cupos_disponibles?: number | null;
    cupo_maximo?: number | null;
    arancel?: number | null;
}

interface EventosProps {
    proximos: Evento[];
    anteriores: Evento[];
}

function formatArancel(valor: number | null | undefined) {
    if (!valor) {
        return 'Sin costo';
    }

    return valor.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 });
}

function EventoCard({ evento, pasado = false }: { evento: Evento; pasado?: boolean }) {
    return (
        <Link
            href={`/eventos/${evento.id}`}
            className={`group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col sm:flex-row transition-shadow hover:shadow-md ${
                pasado ? 'opacity-80 hover:opacity-100' : ''
            }`}
        >
            {/* Fecha lateral */}
            <div
                className={`${pasado ? 'bg-gray-500' : 'bg-blue-600'} text-white p-6 flex flex-col items-center justify-center text-center sm:min-w-[120px]`}
            >
                <CalendarDays className="w-6 h-6 mb-2 opacity-70" />
                <div className="text-2xl font-bold leading-none">{dia(evento.fecha_evento)}</div>
                <div className="text-sm capitalize opacity-80">{mesCorto(evento.fecha_evento)}</div>
                <div className="text-xs mt-1 opacity-70">{anio(evento.fecha_evento)}</div>
            </div>

            {/* Contenido */}
            <div className="p-6 flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badgeTipoEvento(evento.tipo)}`}
                    >
                        <Tag className="w-3 h-3" />
                        {labelTipoEvento(evento.tipo)}
                    </span>
                    {pasado && (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold border bg-gray-100 text-gray-500 border-gray-200">
                            Finalizado
                        </span>
                    )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{evento.nombre}</h3>
                {evento.descripcion && (
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{evento.descripcion}</p>
                )}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-gray-400 mt-4">
                    <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="capitalize">
                            {fechaLarga(evento.fecha_evento)} · {hora(evento.fecha_evento)} h
                        </span>
                    </span>
                    {!pasado && (
                        <>
                            <span className="flex items-center gap-1.5">
                                <Wallet className="w-3.5 h-3.5" />
                                {formatArancel(evento.arancel)}
                            </span>
                            {evento.cupos_disponibles != null && (
                                <span className="flex items-center gap-1.5">
                                    <Users className="w-3.5 h-3.5" />
                                    {evento.cupos_disponibles > 0
                                        ? `${evento.cupos_disponibles} cupos disponibles`
                                        : 'Cupo completo'}
                                </span>
                            )}
                        </>
                    )}
                </div>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 mt-4">
                    Ver detalle <ChevronRight className="w-4 h-4" />
                </span>
            </div>
        </Link>
    );
}

export default function Eventos({ proximos = [], anteriores = [] }: EventosProps) {
    return (
        <PublicLayout>
            <Head title="Eventos y Torneos — Tiro Federal Formosa" />

            {/* Hero */}
            <section className="bg-gradient-to-br from-gray-900 to-blue-900 py-20 text-white text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <span className="text-blue-300 text-sm font-semibold uppercase tracking-wider">Agenda institucional</span>
                    <h1 className="text-4xl sm:text-5xl font-bold mt-3 mb-5">Eventos y Torneos</h1>
                    <p className="text-gray-300 text-lg">
                        Torneos, tiradas nocturnas y cursos de capacitación organizados por el club.
                    </p>
                </div>
            </section>

            <section className="py-20 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Próximos */}
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Próximos eventos</h2>
                    {proximos.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                            <CalendarDays className="w-14 h-14 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-500">No hay eventos programados por el momento.</h3>
                            <p className="text-gray-400 mt-2 text-sm">
                                Revisá pronto o seguí las novedades en{' '}
                                <Link href="/noticias" className="text-blue-600 hover:underline">
                                    Prensa y Noticias
                                </Link>
                                .
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {proximos.map((evento) => (
                                <EventoCard key={evento.id} evento={evento} />
                            ))}
                        </div>
                    )}

                    {/* Anteriores */}
                    {anteriores.length > 0 && (
                        <>
                            <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6">Eventos anteriores</h2>
                            <div className="space-y-6">
                                {anteriores.map((evento) => (
                                    <EventoCard key={evento.id} evento={evento} pasado />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
