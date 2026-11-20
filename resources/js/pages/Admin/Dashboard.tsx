import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Users, DollarSign, Target, Star, AlertCircle, ArrowUpRight,
    Download, Plus, TrendingUp, ShieldAlert, Clock, Trophy,
    CheckCircle2, AlertTriangle, CalendarDays, Crosshair,
    BookOpen, CreditCard, Package,
} from 'lucide-react';

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
    // Datos estáticos de ejemplo para elementos visuales (se pueden conectar al backend luego)
    const alertas = [
        metricas.socios_mora > 0 && {
            tipo: 'warning' as const,
            mensaje: `${metricas.socios_mora} socio(s) con cuota en mora`,
            icono: AlertTriangle,
        },
        metricas.socios_pendientes > 0 && {
            tipo: 'info' as const,
            mensaje: `${metricas.socios_pendientes} solicitud(es) de ingreso pendientes`,
            icono: Clock,
        },
    ].filter(Boolean) as { tipo: 'warning' | 'info'; mensaje: string; icono: typeof AlertTriangle }[];

    const actividadReciente = [
        { accion: 'Pago registrado', detalle: 'Socio #0042 — $15.000', tiempo: 'Hace 10 min', icono: CreditCard, color: 'text-green-600' },
        { accion: 'Nueva inscripción', detalle: 'Torneo Provincial de Pistola', tiempo: 'Hace 25 min', icono: Trophy, color: 'text-blue-600' },
        { accion: 'CLU validada', detalle: 'Legajo ANMaC 2024-1183', tiempo: 'Hace 1 h', icono: CheckCircle2, color: 'text-emerald-600' },
        { accion: 'Stock bajo', detalle: 'Munición 9mm — 50 unid. restantes', tiempo: 'Hace 2 h', icono: Package, color: 'text-amber-600' },
        { accion: 'Turno reservado', detalle: 'Pedana 3 — 16:00 hs', tiempo: 'Hace 3 h', icono: Crosshair, color: 'text-indigo-600' },
    ];

    const pedanas = [
        { nombre: 'Pedana 1', ocupacion: 80, turnos: 8 },
        { nombre: 'Pedana 2', ocupacion: 60, turnos: 6 },
        { nombre: 'Pedana 3', ocupacion: 30, turnos: 3 },
        { nombre: 'Pedana 4', ocupacion: 10, turnos: 1 },
    ];

    const proximosEventos = [
        { nombre: 'Torneo Provincial de Pistola', fecha: '28 Nov 2026', modalidad: 'Pistola 25m' },
        { nombre: 'Campeonato Zonal Rifle', fecha: '12 Dic 2026', modalidad: 'Rifle 50m' },
        { nombre: 'Copa Apertura Formosa', fecha: '20 Ene 2027', modalidad: 'Pistola / Rifle' },
    ];

    return (
        <div className="space-y-6">
            <Head title="Panel de Presidencia / Administración" />

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Presidencia y Administración</h1>
                    <p className="text-sm text-muted-foreground">
                        Control institucional del Tiro Federal Formosa: padrón, recaudación y polígono.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" asChild className="gap-1.5">
                        <Link href="/admin/socios/exportar">
                            <Download className="w-4 h-4" /> Exportar Padrón
                        </Link>
                    </Button>
                    <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white gap-1.5 shadow-sm shadow-blue-500/20">
                        <Link href="/admin/eventos/create">
                            <Plus className="w-4 h-4" /> Nuevo Torneo
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Alertas institucionales */}
            {alertas.length > 0 && (
                <div className="flex flex-col gap-2">
                    {alertas.map((alerta, i) => (
                        <div
                            key={i}
                            className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-sm font-medium ${
                                alerta.tipo === 'warning'
                                    ? 'border-amber-300 bg-amber-50 text-amber-800 dark:bg-amber-950/30 dark:border-amber-700 dark:text-amber-300'
                                    : 'border-blue-300 bg-blue-50 text-blue-800 dark:bg-blue-950/30 dark:border-blue-700 dark:text-blue-300'
                            }`}
                        >
                            <alerta.icono className="w-4 h-4 shrink-0" />
                            {alerta.mensaje}
                        </div>
                    ))}
                </div>
            )}

            {/* Métricas Principales */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-l-4 border-l-blue-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Socios Activos</CardTitle>
                        <div className="rounded-full bg-blue-100 dark:bg-blue-900/40 p-2">
                            <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{metricas.socios_activos}</div>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3 text-green-500" />
                            {metricas.socios_pendientes} pendientes de validar
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Recaudación Mensual</CardTitle>
                        <div className="rounded-full bg-green-100 dark:bg-green-900/40 p-2">
                            <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">
                            ${metricas.recaudacion_mes.toLocaleString('es-AR')}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            {metricas.socios_mora > 0 ? (
                                <><AlertCircle className="w-3 h-3 text-amber-500" />{metricas.socios_mora} socios en mora</>
                            ) : (
                                <><CheckCircle2 className="w-3 h-3 text-green-500" />Al día</>
                            )}
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-indigo-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Ocupación Hoy</CardTitle>
                        <div className="rounded-full bg-indigo-100 dark:bg-indigo-900/40 p-2">
                            <Target className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{metricas.turnos_hoy}</div>
                        <p className="text-xs text-muted-foreground mt-1">Turnos registrados para hoy</p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-amber-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Calidad de Servicio</CardTitle>
                        <div className="rounded-full bg-amber-100 dark:bg-amber-900/40 p-2">
                            <Star className="h-4 w-4 text-amber-500 fill-amber-400" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{metricas.promedio_calidad} / 5.0</div>
                        <p className="text-xs text-muted-foreground mt-1">Evaluación de instructores</p>
                    </CardContent>
                </Card>
            </div>

            {/* Fila: Ocupación de pedanas + Actividad reciente */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Ocupación del polígono */}
                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex items-center gap-2">
                            <Crosshair className="w-5 h-5 text-indigo-500" />
                            <CardTitle className="text-base">Estado del Polígono — Hoy</CardTitle>
                        </div>
                        <CardDescription>Ocupación por pedana en tiempo real</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {pedanas.map((p) => (
                            <div key={p.nombre} className="space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium">{p.nombre}</span>
                                    <span className="text-muted-foreground">{p.turnos} turnos · {p.ocupacion}%</span>
                                </div>
                                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all ${
                                            p.ocupacion >= 70 ? 'bg-indigo-500' : p.ocupacion >= 40 ? 'bg-blue-400' : 'bg-blue-200'
                                        }`}
                                        style={{ width: `${p.ocupacion}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Actividad reciente */}
                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-slate-500" />
                            <CardTitle className="text-base">Actividad Reciente</CardTitle>
                        </div>
                        <CardDescription>Últimas acciones registradas en el sistema</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="divide-y divide-border">
                            {actividadReciente.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 py-2.5 first:pt-0 last:pb-0">
                                    <div className={`mt-0.5 shrink-0 ${item.color}`}>
                                        <item.icono className="w-4 h-4" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium leading-tight">{item.accion}</p>
                                        <p className="text-xs text-muted-foreground truncate">{item.detalle}</p>
                                    </div>
                                    <span className="text-xs text-muted-foreground whitespace-nowrap">{item.tiempo}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>

            {/* Fila: Próximos eventos + Accesos rápidos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Próximos eventos */}
                <Card className="md:col-span-1">
                    <CardHeader className="pb-3">
                        <div className="flex items-center gap-2">
                            <CalendarDays className="w-5 h-5 text-blue-500" />
                            <CardTitle className="text-base">Próximos Torneos</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {proximosEventos.map((ev, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                                    <Trophy className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium leading-tight">{ev.nombre}</p>
                                    <p className="text-xs text-muted-foreground">{ev.fecha} · {ev.modalidad}</p>
                                </div>
                            </div>
                        ))}
                        <Button variant="outline" className="w-full justify-between mt-2" asChild>
                            <Link href="/admin/eventos">
                                Ver todos los torneos <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>

                {/* Accesos Rápidos */}
                <Card className="md:col-span-2">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base">Accesos Rápidos</CardTitle>
                        <CardDescription>Gestión diaria del club</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { label: 'Padrón de socios', href: '/admin/socios', icono: Users, color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
                                { label: 'Validar CLU', href: '/admin/clu', icono: ShieldAlert, color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' },
                                { label: 'Stock de insumos', href: '/admin/insumos', icono: Package, color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' },
                                { label: 'Instructores', href: '/admin/instructores', icono: BookOpen, color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' },
                                { label: 'Pagos y Recibos', href: '/admin/pagos', icono: CreditCard, color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
                                { label: 'Publicar Noticias', href: '/admin/noticias', icono: Trophy, color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
                            ].map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="flex items-center gap-3 rounded-lg border p-3 text-sm font-medium hover:bg-muted/50 transition-colors"
                                >
                                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${item.color}`}>
                                        <item.icono className="w-4 h-4" />
                                    </div>
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

AdminDashboard.layout = {
    breadcrumbs: [{ title: 'Inicio', href: '/admin/dashboard' }],
};
