import { Head, Link } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import {
    CalendarDays, Trophy, Target, GraduationCap, Clock, Plus, ExternalLink, Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GoogleCalendar, CalendarItem } from '@/components/calendar/GoogleCalendar';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Inicio', href: '/admin/dashboard' },
    { title: 'Calendario General', href: '/admin/calendario' },
];

interface Props {
    items: CalendarItem[];
    metricas: {
        totalEventos: number;
        totalTurnos: number;
        turnosHoy: number;
        evaluaciones: number;
    };
}

export default function AdminCalendarioIndex({ items = [], metricas }: Props) {
    return (
        <div className="space-y-6">
            <Head title="Calendario General del Polígono - Tiro Federal Formosa" />

            {/* Cabecera */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2.5">
                        <CalendarDays className="w-6 h-6 text-blue-600" />
                        Calendario General de Actividades
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Cronograma unificado de torneos, turnos de pedanas, cursos y evaluaciones en el club
                    </p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                    <Button asChild variant="outline" className="gap-2">
                        <Link href="/admin/eventos">
                            <Trophy className="w-4 h-4 text-blue-600" /> Listado de Torneos
                        </Link>
                    </Button>
                    <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white gap-2 shadow-sm">
                        <Link href="/admin/eventos/create">
                            <Plus className="w-4 h-4" /> Crear Evento
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Tarjetas KPI */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="rounded-xl border border-gray-200 shadow-2xs">
                    <CardContent className="p-4 flex items-center gap-3">
                        <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl shrink-0">
                            <Trophy className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="text-xs text-gray-500 block uppercase font-semibold">Torneos y Eventos</span>
                            <span className="text-xl font-bold text-gray-900">{metricas?.totalEventos ?? 0}</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-xl border border-gray-200 shadow-2xs">
                    <CardContent className="p-4 flex items-center gap-3">
                        <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
                            <Target className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="text-xs text-gray-500 block uppercase font-semibold">Turnos Registrados</span>
                            <span className="text-xl font-bold text-gray-900">{metricas?.totalTurnos ?? 0}</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-xl border border-gray-200 shadow-2xs">
                    <CardContent className="p-4 flex items-center gap-3">
                        <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl shrink-0">
                            <Clock className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="text-xs text-gray-500 block uppercase font-semibold">Turnos para Hoy</span>
                            <span className="text-xl font-bold text-gray-900">{metricas?.turnosHoy ?? 0}</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-xl border border-gray-200 shadow-2xs">
                    <CardContent className="p-4 flex items-center gap-3">
                        <div className="p-2.5 bg-cyan-50 text-cyan-600 rounded-xl shrink-0">
                            <GraduationCap className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="text-xs text-gray-500 block uppercase font-semibold">Evaluaciones ANMaC</span>
                            <span className="text-xl font-bold text-gray-900">{metricas?.evaluaciones ?? 0}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Google Calendar */}
            <GoogleCalendar
                items={items}
                role="admin"
                subtitle="Vista general de ocupación del polígono y eventos institucionales"
            />
        </div>
    );
}

AdminCalendarioIndex.layout = {
    breadcrumbs,
};
