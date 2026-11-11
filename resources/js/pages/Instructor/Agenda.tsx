import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, CheckCircle2, UserCheck, ShieldAlert } from 'lucide-react';

interface Turno {
    id: number;
    fecha: string;
    hora_inicio: string;
    hora_fin: string;
    estado: string;
    socio_profile?: {
        numero_socio: string;
        user?: {
            name: string;
        };
    };
    linea_de_tiro?: {
        numero_linea: number;
        nombre: string;
    };
}

interface InstructorAgendaProps {
    turnosHoy: Turno[];
}

export default function InstructorAgenda({ turnosHoy = [] }: InstructorAgendaProps) {
    return (
        <div className="space-y-6">
            <Head title="Agenda de Pedanas — Instructor" />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Agenda de Pedanas y Líneas de Tiro</h1>
                    <p className="text-sm text-muted-foreground">
                        Supervisión técnica de seguridad, idoneidad de tiro y control de asistencia en pedana.
                    </p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Turnos Asignados para Hoy</CardTitle>
                    <CardDescription>
                        Verificá la presencia del tirador y su idoneidad en el manejo del arma.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {turnosHoy.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            <Calendar className="w-12 h-12 mx-auto mb-3 opacity-40" />
                            <p>No hay turnos asignados para la jornada de hoy.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {turnosHoy.map((t) => (
                                <div key={t.id} className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 p-4 border rounded-xl bg-card">
                                    <div>
                                        <div className="font-semibold text-base">
                                            {t.linea_de_tiro?.nombre || `Pedana #${t.id}`}
                                        </div>
                                        <div className="text-sm text-muted-foreground mt-0.5">
                                            Horario: {t.hora_inicio} a {t.hora_fin} hs
                                        </div>
                                        <div className="text-xs text-muted-foreground mt-1">
                                            Tirador: <span className="font-medium text-foreground">{t.socio_profile?.user?.name || 'Socio'}</span> (Socio #{t.socio_profile?.numero_socio || 'S/N'})
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Badge variant={t.estado === 'confirmado' ? 'default' : 'secondary'}>
                                            {t.estado}
                                        </Badge>
                                        <Button size="sm" variant="outline" className="flex items-center gap-1.5">
                                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                                            Asistencia
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}



InstructorAgenda.layout = {
    breadcrumbs: [{ title: 'Agenda de Pedanas', href: '/instructor/agenda' }],
};
