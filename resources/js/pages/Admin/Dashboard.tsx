import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, DollarSign, Target, Star, AlertCircle, ArrowUpRight } from 'lucide-react';

interface Metricas {
    socios_activos: number;
    socios_mora: number;
    socios_pendientes: number;
    recaudacion_mes: number;
    turnos_hoy: number;
    promedio_calidad: number;
}

interface AdminDashboardProps {
    metricas: Metricas;
}

export default function AdminDashboard({ metricas }: AdminDashboardProps) {
    return (
        <div className="space-y-6">
            <Head title="Panel de Presidencia / Administración" />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Presidencia y Administración</h1>
                    <p className="text-sm text-muted-foreground">
                        Control institucional del Tiro Federal Formosa: padrón, recaudación y polígono.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" asChild>
                        <Link href="/admin/socios/exportar">Exportar Padrón</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/admin/eventos/create">Nuevo Torneo</Link>
                    </Button>
                </div>
            </div>

            {/* Métricas Principales */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Socios Activos</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{metricas.socios_activos}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {metricas.socios_pendientes} pendientes de validar
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Recaudación Mensual</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            ${metricas.recaudacion_mes.toLocaleString('es-AR')}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {metricas.socios_mora > 0 ? `${metricas.socios_mora} socios en mora` : 'Al día'}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Ocupación Hoy</CardTitle>
                        <Target className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{metricas.turnos_hoy}</div>
                        <p className="text-xs text-muted-foreground mt-1">Turnos registrados para hoy</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Calidad de Servicio</CardTitle>
                        <Star className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{metricas.promedio_calidad} / 5.0</div>
                        <p className="text-xs text-muted-foreground mt-1">Evaluación de instructores</p>
                    </CardContent>
                </Card>
            </div>

            {/* Accesos Rápidos de Gestión */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Gestión de Socios y CLU</CardTitle>
                        <CardDescription>Padrón, legajos ANMaC y validación de credenciales</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Button variant="outline" className="w-full justify-between" asChild>
                            <Link href="/admin/socios">
                                Ver padrón de socios <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </Button>
                        <Button variant="outline" className="w-full justify-between" asChild>
                            <Link href="/admin/clu">
                                Validar credenciales CLU <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Polígono e Inventario</CardTitle>
                        <CardDescription>Municiones, insumos, blancos y control de stock</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Button variant="outline" className="w-full justify-between" asChild>
                            <Link href="/admin/insumos">
                                Stock de insumos y municiones <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </Button>
                        <Button variant="outline" className="w-full justify-between" asChild>
                            <Link href="/admin/instructores">
                                Instructores habilitados <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Torneos y Prensa</CardTitle>
                        <CardDescription>Eventos competitivos y noticias del portal público</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Button variant="outline" className="w-full justify-between" asChild>
                            <Link href="/admin/eventos">
                                Gestión de torneos <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </Button>
                        <Button variant="outline" className="w-full justify-between" asChild>
                            <Link href="/admin/noticias">
                                Publicar noticias <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

