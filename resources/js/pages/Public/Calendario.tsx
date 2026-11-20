import { Head, Link } from '@inertiajs/react';
import { Trophy, Calendar as CalendarIcon, Clock, MapPin, ArrowRight, ShieldCheck, Target, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PublicNavbar from '@/components/public/PublicNavbar';
import PublicFooter from '@/components/public/PublicFooter';
import { GoogleCalendar, CalendarItem } from '@/components/calendar/GoogleCalendar';

interface Props {
    items: CalendarItem[];
    totalEventos: number;
    proximos: number;
}

export default function PublicCalendario({ items = [], totalEventos = 0, proximos = 0 }: Props) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Head title="Calendario Oficial de Torneos y Actividades - Tiro Federal Formosa" />

            <PublicNavbar />

            {/* Hero Banner */}
            <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-blue-900/50">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold mb-3">
                            <CalendarIcon className="w-3.5 h-3.5" />
                            Cronograma Oficial de Competencias y Cursos
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                            Calendario del Polígono
                        </h1>
                        <p className="text-sm sm:text-base text-gray-300 mt-2 max-w-2xl leading-relaxed">
                            Consultá las fechas de torneos oficiales, tiradas nocturnas, clínicas de tiro práctico y cursos de capacitación programados en nuestras instalaciones.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                        <Button asChild variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10 gap-2">
                            <Link href="/eventos">
                                <ArrowLeft className="w-4 h-4" /> Ver Listado de Eventos
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Main Calendar Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
                {/* Summary badges */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs flex items-center gap-3">
                        <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                            <Trophy className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="text-xs text-gray-500 block">Torneos y Competencias</span>
                            <span className="text-lg font-bold text-gray-900">
                                {items.filter(i => i.type === 'torneo').length} Programados
                            </span>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs flex items-center gap-3">
                        <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
                            <Target className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="text-xs text-gray-500 block">Cursos y Capacitación</span>
                            <span className="text-lg font-bold text-gray-900">
                                {items.filter(i => i.type === 'curso' || i.type === 'curso_capacitacion').length} Actividades
                            </span>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs flex items-center gap-3">
                        <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="text-xs text-gray-500 block">Eventos Próximos</span>
                            <span className="text-lg font-bold text-gray-900">
                                {proximos} Confirmados
                            </span>
                        </div>
                    </div>
                </div>

                {/* Google Calendar Component */}
                <GoogleCalendar
                    items={items}
                    title="Calendario de Actividades"
                    subtitle="Seleccioná cualquier evento para consultar bases, aranceles, cupos e inscribirte."
                    role="public"
                />

                {/* Info Footer Callout */}
                <div className="mt-8 bg-blue-50/70 border border-blue-200/80 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h3 className="text-base font-bold text-blue-900">¿Sos socio del club?</h3>
                        <p className="text-xs sm:text-sm text-blue-700/90 mt-1 max-w-xl">
                            Iniciá sesión en tu panel para reservar turnos exclusivos de pedanas de tiro, gestionar tu Credencial LU y anotarte con aranceles bonificados a todos los torneos.
                        </p>
                    </div>
                    <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white shrink-0 gap-2">
                        <Link href="/login">
                            Acceder al Portal de Socios <ArrowRight className="w-4 h-4" />
                        </Link>
                    </Button>
                </div>
            </main>

            <PublicFooter />
        </div>
    );
}
