import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/public/PublicLayout';
import { CalendarDays, Clock, Tag } from 'lucide-react';

interface Evento {
    id: number;
    nombre: string;
    descripcion: string | null;
    fecha_evento: string;
    tipo: string;
}

interface EventosProps {
    eventos: Evento[];
}

function formatFecha(dateStr: string) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

function badgeTipo(tipo: string) {
    const map: Record<string, string> = {
        torneo: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        curso: 'bg-blue-100 text-blue-700 border-blue-200',
        evento: 'bg-purple-100 text-purple-700 border-purple-200',
    };
    return map[tipo?.toLowerCase()] ?? 'bg-gray-100 text-gray-600 border-gray-200';
}

export default function Eventos({ eventos }: EventosProps) {
    return (
        <PublicLayout>
            <Head title="Eventos y Cursos — Tiro Federal Formosa" />

            {/* Hero */}
            <section className="bg-gradient-to-br from-gray-900 to-blue-900 py-20 text-white text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <span className="text-blue-300 text-sm font-semibold uppercase tracking-wider">Agenda institucional</span>
                    <h1 className="text-4xl sm:text-5xl font-bold mt-3 mb-5">Eventos y Cursos</h1>
                    <p className="text-gray-300 text-lg">
                        Torneos, competencias y cursos de capacitación organizados por el club.
                    </p>
                </div>
            </section>

            {/* Lista de eventos */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {eventos.length === 0 ? (
                        <div className="text-center py-20">
                            <CalendarDays className="w-14 h-14 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-500">No hay eventos publicados por el momento.</h3>
                            <p className="text-gray-400 mt-2 text-sm">Revisá pronto, estamos preparando nuevas actividades.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {eventos.map((evento) => (
                                <div key={evento.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col sm:flex-row">
                                    {/* Fecha lateral */}
                                    <div className="bg-blue-600 text-white p-6 flex flex-col items-center justify-center text-center min-w-[120px]">
                                        <CalendarDays className="w-6 h-6 mb-2 text-blue-200" />
                                        <div className="text-2xl font-bold leading-none">
                                            {new Date(evento.fecha_evento).getDate()}
                                        </div>
                                        <div className="text-blue-200 text-sm capitalize">
                                            {new Date(evento.fecha_evento).toLocaleDateString('es-AR', { month: 'short' })}
                                        </div>
                                        <div className="text-blue-300 text-xs mt-1">
                                            {new Date(evento.fecha_evento).getFullYear()}
                                        </div>
                                    </div>

                                    {/* Contenido */}
                                    <div className="p-6 flex-1">
                                        <div className="flex flex-wrap items-center gap-2 mb-3">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badgeTipo(evento.tipo)}`}>
                                                <Tag className="w-3 h-3" />
                                                {evento.tipo}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{evento.nombre}</h3>
                                        {evento.descripcion && (
                                            <p className="text-gray-500 text-sm leading-relaxed">{evento.descripcion}</p>
                                        )}
                                        <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-4">
                                            <Clock className="w-3.5 h-3.5" />
                                            <span className="capitalize">{formatFecha(evento.fecha_evento)}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}

