import { Head, Link } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import {
    CalendarDays, Target, Trophy, Plus, ArrowRight, ShieldCheck, Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GoogleCalendar, CalendarItem } from '@/components/calendar/GoogleCalendar';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Mi Panel', href: '/panel' },
    { title: 'Mi Calendario', href: '/socio/calendario' },
];

interface Props {
    items: CalendarItem[];
    misTurnosActivos: number;
    misInscripciones: number;
}

export default function SocioCalendarioIndex({ items = [], misTurnosActivos = 0, misInscripciones = 0 }: Props) {
    return (
        <div className="space-y-6">
            <Head title="Mi Calendario de Actividades - Tiro Federal Formosa" />

            {/* Cabecera */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2.5">
                        <CalendarDays className="w-6 h-6 text-blue-600" />
                        Mi Calendario de Actividades
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Tus turnos reservados de pedana, torneos en los que participás y eventos del club
                    </p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                    <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white gap-2 shadow-sm">
                        <Link href="/turnos">
                            <Plus className="w-4 h-4" /> Reservar Turno de Pedana
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Tarjetas informativas de resumen */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="rounded-xl border border-gray-200 shadow-2xs">
                    <CardContent className="p-4 flex items-center gap-3">
                        <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
                            <Target className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="text-xs text-gray-500 block uppercase font-semibold">Mis Turnos Activos</span>
                            <span className="text-xl font-bold text-gray-900">{misTurnosActivos} Reservas</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-xl border border-gray-200 shadow-2xs">
                    <CardContent className="p-4 flex items-center gap-3">
                        <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl shrink-0">
                            <Trophy className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="text-xs text-gray-500 block uppercase font-semibold">Mis Inscripciones a Torneos</span>
                            <span className="text-xl font-bold text-gray-900">{misInscripciones} Competencias</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-xl border border-gray-200 shadow-2xs">
                    <CardContent className="p-4 flex items-center gap-3">
                        <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl shrink-0">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="text-xs text-gray-500 block uppercase font-semibold">Estado de Habilitación</span>
                            <span className="text-sm font-bold text-emerald-700 flex items-center gap-1 mt-0.5">
                                Socio Habilitado
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Google Calendar */}
            <GoogleCalendar
                items={items}
                role="socio"
                subtitle="Hacé clic en cualquier fecha o turno para consultar horarios, instructor o detalles de competencia."
            />
        </div>
    );
}

SocioCalendarioIndex.layout = {
    breadcrumbs,
};
