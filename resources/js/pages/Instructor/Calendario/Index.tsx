import { Head, Link } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import {
    CalendarDays, Target, GraduationCap, Clock, CheckCircle2, UserCheck, ShieldAlert
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GoogleCalendar, CalendarItem } from '@/components/calendar/GoogleCalendar';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Agenda de Pedanas', href: '/instructor/agenda' },
    { title: 'Calendario de Clases', href: '/instructor/calendario' },
];

interface Props {
    items: CalendarItem[];
    metricas: {
        clasesProgramadas: number;
        clasesHoy: number;
        evaluaciones: number;
    };
}

export default function InstructorCalendarioIndex({ items = [], metricas }: Props) {
    return (
        <div className="space-y-6">
            <Head title="Calendario de Clases y Pedanas - Instructor Tiro Federal Formosa" />

            {/* Cabecera */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2.5">
                        <CalendarDays className="w-6 h-6 text-blue-600" />
                        Calendario del Instructor
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Organización de clases prácticas con alumnos, evaluaciones de idoneidad y torneos
                    </p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                    <Button asChild variant="outline" className="gap-2">
                        <Link href="/instructor/agenda">
                            <Clock className="w-4 h-4" /> Ver Agenda Diaria
                        </Link>
                    </Button>
                    <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white gap-2 shadow-sm">
                        <Link href="/instructor/evaluaciones">
                            <GraduationCap className="w-4 h-4" /> Evaluaciones Técnicas
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Tarjetas informativas de métricas */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="rounded-xl border border-gray-200 shadow-2xs">
                    <CardContent className="p-4 flex items-center gap-3">
                        <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
                            <Target className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="text-xs text-gray-500 block uppercase font-semibold">Clases Próximas</span>
                            <span className="text-xl font-bold text-gray-900">{metricas?.clasesProgramadas ?? 0}</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-xl border border-gray-200 shadow-2xs">
                    <CardContent className="p-4 flex items-center gap-3">
                        <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl shrink-0">
                            <Clock className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="text-xs text-gray-500 block uppercase font-semibold">Clases para Hoy</span>
                            <span className="text-xl font-bold text-gray-900">{metricas?.clasesHoy ?? 0}</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-xl border border-gray-200 shadow-2xs">
                    <CardContent className="p-4 flex items-center gap-3">
                        <div className="p-2.5 bg-cyan-50 text-cyan-600 rounded-xl shrink-0">
                            <GraduationCap className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="text-xs text-gray-500 block uppercase font-semibold">Evaluaciones Asignadas</span>
                            <span className="text-xl font-bold text-gray-900">{metricas?.evaluaciones ?? 0}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Google Calendar */}
            <GoogleCalendar
                items={items}
                role="instructor"
                subtitle="Hacé clic en cualquier clase para consultar detalles del alumno, pedana asignada y requisitos."
            />
        </div>
    );
}

InstructorCalendarioIndex.layout = {
    breadcrumbs,
};
