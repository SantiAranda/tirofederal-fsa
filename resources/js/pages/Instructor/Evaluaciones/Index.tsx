import { Head } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Award, Star, MessageSquare, CheckCircle2, UserCheck } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Agenda de Pedanas', href: '/instructor/agenda' },
    { title: 'Mis Evaluaciones', href: '/instructor/evaluaciones' },
];

export default function InstructorEvaluacionesIndex() {
    return (
        <>
            <Head title="Evaluaciones Técnicas - Instructor" />
            <div className="flex flex-col gap-6 p-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Evaluaciones de Alumnos y Cursos</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Devoluciones recibidas por socios sobre seguridad en pedana, técnica y pedagogía (RF20)
                    </p>
                </div>

                {/* Métricas del Instructor */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Promedio General</CardTitle>
                            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">4.9 / 5.0</div>
                            <p className="text-xs text-emerald-600 mt-1 font-medium">Calificación de excelencia</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Evaluaciones</CardTitle>
                            <Award className="w-4 h-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">38</div>
                            <p className="text-xs text-gray-500 mt-1">Alumnos evaluadores</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Cumplimiento Decálogo</CardTitle>
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">100%</div>
                            <p className="text-xs text-gray-500 mt-1">Sin incidentes de seguridad</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Tabla de Evaluaciones */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base font-bold text-gray-900">Historial de Calificaciones Recibidas</CardTitle>
                        <CardDescription className="text-xs text-gray-500">Comentarios cualitativos y puntuación cuantitativa (escala 1 a 5)</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50/70">
                                    <TableHead>Fecha</TableHead>
                                    <TableHead>Alumno / Socio</TableHead>
                                    <TableHead>Actividad / Pedana</TableHead>
                                    <TableHead>Puntaje</TableHead>
                                    <TableHead>Comentario de la Práctica</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {[
                                    { fecha: '08/11/2026', alumno: 'Carlos Eduardo Benítez', actividad: 'Práctica Inicial Pistola 9mm (Pedana 2)', estrellas: 5, comentario: 'Excelente instructor. Muy atento a la posición del dedo en el disparador y dirección del cañón. Me sentí muy seguro.' },
                                    { fecha: '05/11/2026', alumno: 'Valeria Bogado', actividad: 'Curso Básico de Tiro con Munición .22', estrellas: 5, comentario: 'Muy claro para explicar respiración y alineación de miras. Volveré la semana que viene.' },
                                    { fecha: '01/11/2026', alumno: 'Roberto Gómez', actividad: 'Tiro Rápido y Desenfunde', estrellas: 5, comentario: 'Gran dominio de la técnica IPSC y normas de seguridad en pedana.' },
                                    { fecha: '28/10/2026', alumno: 'Gonzalo Fernández', actividad: 'Iniciación al Fusil 50m', estrellas: 4, comentario: 'Muy buena clase, pudimos corregir postura y apoyo.' },
                                ].map((ev, i) => (
                                    <TableRow key={i}>
                                        <TableCell className="text-xs text-gray-500">{ev.fecha}</TableCell>
                                        <TableCell className="font-semibold text-gray-900 text-xs">{ev.alumno}</TableCell>
                                        <TableCell className="text-xs text-blue-600">{ev.actividad}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center text-amber-500 font-bold text-xs gap-1">
                                                <span>★</span> {ev.estrellas}.0
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-xs text-gray-600 max-w-md">{ev.comentario}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}



InstructorEvaluacionesIndex.layout = {
    breadcrumbs,
};
