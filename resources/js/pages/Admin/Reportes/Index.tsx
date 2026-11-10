import { Head } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { TrendingUp, Users, DollarSign, Award, Target, Download, Calendar, Star } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Inicio', href: '/admin/dashboard' },
    { title: 'Reportes y Métricas', href: '/admin/reportes' },
];

export default function ReportesIndex() {
    return (
        <>
            <Head title="Reportes y Métricas - Tiro Federal Formosa" />
            <div className="flex flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Reportes Institucionales y Calidad</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Métricas de satisfacción, ocupación de líneas de tiro y recaudación del polígono (RF21)
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" className="gap-2 text-xs">
                            <Calendar className="w-4 h-4" /> Noviembre 2026
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2 text-xs">
                            <Download className="w-4 h-4" /> Exportar Informe
                        </Button>
                    </div>
                </div>

                {/* 4 KPIs Clave */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Padrón de Socios</CardTitle>
                            <Users className="w-4 h-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">87 Socios</div>
                            <p className="text-xs text-emerald-600 mt-1 font-medium flex items-center gap-1">
                                <TrendingUp className="w-3.5 h-3.5" /> +8 nuevas altas este mes
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Recaudación Mensual</CardTitle>
                            <DollarSign className="w-4 h-4 text-emerald-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">$ 648.500</div>
                            <p className="text-xs text-emerald-600 mt-1 font-medium flex items-center gap-1">
                                <TrendingUp className="w-3.5 h-3.5" /> +14.2% vs mes anterior
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Ocupación Polígono</CardTitle>
                            <Target className="w-4 h-4 text-purple-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">76.4 %</div>
                            <p className="text-xs text-gray-500 mt-1">214 turnos ejecutados</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Índice de Satisfacción</CardTitle>
                            <Award className="w-4 h-4 text-amber-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">4.8 / 5.0</div>
                            <p className="text-xs text-amber-600 mt-1 font-medium flex items-center gap-1">
                                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> 94% valoraciones de 5★
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Gráficos de barra simulados (Tailwind) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recaudación por Concepto */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base font-bold text-gray-900">Distribución de Ingresos</CardTitle>
                            <CardDescription className="text-xs text-gray-500">Composición de la recaudación mensual del club</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <div className="flex justify-between text-xs font-semibold text-gray-700 mb-1">
                                    <span>Cuotas Sociales Mensuales</span>
                                    <span>$ 390.000 (60%)</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-3">
                                    <div className="bg-blue-600 h-3 rounded-full" style={{ width: '60%' }} />
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-xs font-semibold text-gray-700 mb-1">
                                    <span>Inscripciones a Torneos y Cursos</span>
                                    <span>$ 136.000 (21%)</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-3">
                                    <div className="bg-emerald-600 h-3 rounded-full" style={{ width: '21%' }} />
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-xs font-semibold text-gray-700 mb-1">
                                    <span>Venta de Insumos y Municiones (Armería)</span>
                                    <span>$ 82.500 (13%)</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-3">
                                    <div className="bg-amber-500 h-3 rounded-full" style={{ width: '13%' }} />
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-xs font-semibold text-gray-700 mb-1">
                                    <span>Aranceles de Pedana Ocasionales (No Socios)</span>
                                    <span>$ 40.000 (6%)</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-3">
                                    <div className="bg-purple-600 h-3 rounded-full" style={{ width: '6%' }} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Ocupación por Línea */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base font-bold text-gray-900">Uso de Líneas de Tiro</CardTitle>
                            <CardDescription className="text-xs text-gray-500">Porcentaje de ocupación en horarios pico</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {[
                                { linea: 'Líneas 1 a 4 (Pistola Grueso Calibre)', pct: 88, color: 'bg-blue-600' },
                                { linea: 'Línea 5 (Carabina .22 Precisión)', pct: 72, color: 'bg-indigo-600' },
                                { linea: 'Línea 6 (Fusil 50m)', pct: 65, color: 'bg-purple-600' },
                                { linea: 'Líneas 7 a 9 (Tiro Neumático 10m)', pct: 58, color: 'bg-emerald-600' },
                                { linea: 'Sector Dinámico (Recorridos IPSC)', pct: 92, color: 'bg-rose-500' },
                            ].map((item, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between text-xs font-medium text-gray-700 mb-1">
                                        <span>{item.linea}</span>
                                        <span className="font-bold">{item.pct}%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                        <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.pct}%` }} />
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Evaluaciones de Satisfacción y Calidad (RF21) */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base font-bold text-gray-900">
                            Últimas Evaluaciones de Calidad del Servicio (RF20 / RF21)
                        </CardTitle>
                        <CardDescription className="text-xs text-gray-500">
                            Devoluciones realizadas por socios tras sus prácticas de tiro y cursos con instructores
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50/70">
                                    <TableHead>Fecha</TableHead>
                                    <TableHead>Socio Evaluador</TableHead>
                                    <TableHead>Instructor / Servicio</TableHead>
                                    <TableHead>Calificación</TableHead>
                                    <TableHead>Comentario de Experiencia</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {[
                                    { fecha: '08/11/2026', socio: 'Carlos Eduardo Benítez', instructor: 'Carlos Rodríguez', estrellas: 5, comentario: 'Excelente atención en la pedana, muy claras las pautas del decálogo de seguridad.' },
                                    { fecha: '07/11/2026', socio: 'María Laura Insfrán', instructor: 'Ana Gómez', estrellas: 5, comentario: 'La clase de tiro neumático para principiantes fue impecable. Muy paciente y didáctica.' },
                                    { fecha: '06/11/2026', socio: 'Roberto Gómez', instructor: 'Polígono General', estrellas: 4, comentario: 'Muy buen mantenimiento de las pedanas. Bastidores firmes y buena iluminación.' },
                                    { fecha: '04/11/2026', socio: 'Gonzalo Fernández', instructor: 'Luis Morales', estrellas: 5, comentario: 'Práctica de fusil a 50m muy bien coordinada. Cumplimiento estricto de las directivas.' },
                                ].map((ev, i) => (
                                    <TableRow key={i}>
                                        <TableCell className="text-xs text-gray-500">{ev.fecha}</TableCell>
                                        <TableCell className="font-medium text-gray-900 text-xs">{ev.socio}</TableCell>
                                        <TableCell className="text-xs text-blue-600 font-medium">{ev.instructor}</TableCell>
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



ReportesIndex.layout = {
    breadcrumbs,
};
