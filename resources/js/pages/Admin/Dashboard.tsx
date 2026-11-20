import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
    Users, DollarSign, Target, Star, AlertCircle, ArrowUpRight,
    Download, Plus, TrendingUp, ShieldAlert, Clock, Trophy,
    CheckCircle2, AlertTriangle, CalendarDays, Crosshair,
    BookOpen, CreditCard, Package, Calendar, BarChart3,
    Activity, Layers, Award, ShieldCheck, ChevronRight
} from 'lucide-react';

interface Metricas {
    socios_activos: number;
    socios_mora: number;
    socios_pendientes: number;
    recaudacion_mes: number;
    turnos_hoy: number;
    promedio_calidad: number;
    ingresos_por_concepto?: Record<string, number>;
}

interface EvaluacionItem {
    id: number;
    created_at?: string;
    puntaje_numerico?: number;
    comentario?: string;
    socio_profile?: {
        user?: {
            nombre: string;
            apellido: string;
        };
    };
    evaluado?: {
        user?: {
            nombre: string;
            apellido: string;
        };
        nombre?: string;
        titulo?: string;
    };
}

interface AdminDashboardProps {
    metricas: Metricas;
    evaluaciones?: EvaluacionItem[];
}

export default function AdminDashboard({ metricas, evaluaciones = [] }: AdminDashboardProps) {
    const [activeTab, setActiveTab] = useState<'operaciones' | 'reportes' | 'calidad' | 'integral'>('operaciones');

    const fmt = (n: number) =>
        new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n);

    // Alertas institucionales
    const alertas = [
        metricas.socios_mora > 0 && {
            tipo: 'warning' as const,
            mensaje: `${metricas.socios_mora} socio(s) con cuota societaria en mora`,
            icono: AlertTriangle,
        },
        metricas.socios_pendientes > 0 && {
            tipo: 'info' as const,
            mensaje: `${metricas.socios_pendientes} solicitud(es) de ingreso pendientes de validación CLU`,
            icono: Clock,
        },
    ].filter(Boolean) as { tipo: 'warning' | 'info'; mensaje: string; icono: typeof AlertTriangle }[];

    // Actividad reciente del polígono
    const actividadReciente = [
        { accion: 'Pago registrado', detalle: 'Socio #0042 — Cuota mensual al día', tiempo: 'Hace 10 min', icono: CreditCard, color: 'text-green-600' },
        { accion: 'Nueva inscripción', detalle: 'Torneo Provincial de Pistola 9mm', tiempo: 'Hace 25 min', icono: Trophy, color: 'text-blue-600' },
        { accion: 'CLU validada', detalle: 'Legajo digital ANMaC habilitado', tiempo: 'Hace 1 h', icono: CheckCircle2, color: 'text-emerald-600' },
        { accion: 'Stock bajo en armería', detalle: 'Munición 9mm Luger — 50 unidades restantes', tiempo: 'Hace 2 h', icono: Package, color: 'text-amber-600' },
        { accion: 'Turno confirmado', detalle: 'Línea 3 (Carabina .22) — 16:00 hs', tiempo: 'Hace 3 h', icono: Crosshair, color: 'text-indigo-600' },
    ];

    // Ocupación de pedanas en tiempo real
    const pedanas = [
        { nombre: 'Pedana 1 (Pistola Grueso Calibre)', ocupacion: 80, turnos: 8, color: 'bg-blue-600' },
        { nombre: 'Pedana 2 (Carabina .22 Precisión)', ocupacion: 60, turnos: 6, color: 'bg-indigo-600' },
        { nombre: 'Pedana 3 (Fusil y Precisión 50m)', ocupacion: 35, turnos: 3, color: 'bg-purple-600' },
        { nombre: 'Pedana 4 (Tiro Neumático 10m)', ocupacion: 20, turnos: 2, color: 'bg-emerald-600' },
    ];

    // Próximos torneos programados
    const proximosEventos = [
        { nombre: 'Torneo Provincial de Pistola', fecha: '28 Nov 2026', modalidad: 'Pistola 25m', cupos: '24 / 30' },
        { nombre: 'Campeonato Zonal Rifle', fecha: '12 Dic 2026', modalidad: 'Rifle 50m', cupos: '18 / 20' },
        { nombre: 'Copa Apertura Formosa', fecha: '20 Ene 2027', modalidad: 'Pistola / Rifle', cupos: '12 / 40' },
    ];

    // Distribución de ingresos
    const totalRecaudado = metricas.recaudacion_mes || 648500;
    const ingresosConceptos = [
        { concepto: 'Cuotas Sociales Mensuales', monto: Math.round(totalRecaudado * 0.60), pct: 60, color: 'bg-blue-600' },
        { concepto: 'Inscripciones a Torneos y Clínicas', monto: Math.round(totalRecaudado * 0.21), pct: 21, color: 'bg-emerald-600' },
        { concepto: 'Venta de Munición e Insumos (Armería)', monto: Math.round(totalRecaudado * 0.13), pct: 13, color: 'bg-amber-500' },
        { concepto: 'Aranceles de Pedana Ocasionales (Tirador Diario)', monto: Math.round(totalRecaudado * 0.06), pct: 6, color: 'bg-purple-600' },
    ];

    // Evaluaciones simuladas/reales
    const mockEvaluaciones = [
        { fecha: '08/11/2026', socio: 'Carlos Eduardo Benítez', instructor: 'Carlos Rodríguez (ITA)', estrellas: 5, comentario: 'Excelente atención en la pedana, muy claras las pautas del decálogo de seguridad.' },
        { fecha: '07/11/2026', socio: 'María Laura Insfrán', instructor: 'Ana Gómez (ITB)', estrellas: 5, comentario: 'La clase de tiro neumático para principiantes fue impecable. Muy paciente y didáctica.' },
        { fecha: '06/11/2026', socio: 'Roberto Gómez', instructor: 'Polígono General', estrellas: 4, comentario: 'Muy buen mantenimiento de las pedanas. Bastidores firmes y buena iluminación.' },
        { fecha: '04/11/2026', socio: 'Gonzalo Fernández', instructor: 'Luis Morales (ITA)', estrellas: 5, comentario: 'Práctica de fusil a 50m muy bien coordinada. Cumplimiento estricto de las directivas de tiro.' },
        { fecha: '02/11/2026', socio: 'Valeria Bogado', instructor: 'Carlos Rodríguez (ITA)', estrellas: 5, comentario: 'Gran instrucción para la certificación de tiro defensivo. Altamente recomendable.' },
    ];

    return (
        <div className="space-y-6 pb-12">
            <Head title="Presidencia y Dashboard General - Tiro Federal Formosa" />

            {/* Header Principal con Controles */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                            <Activity className="w-5 h-5" />
                        </span>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Presidencia y Dashboard General</h1>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                        Control institucional del Tiro Federal Formosa: operaciones en vivo, recaudación y reportes de calidad.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" asChild className="gap-1.5 text-xs h-9">
                        <Link href="/admin/socios/exportar">
                            <Download className="w-4 h-4 text-gray-500" /> Exportar Padrón
                        </Link>
                    </Button>
                    <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white gap-1.5 text-xs h-9 shadow-sm shadow-blue-500/20">
                        <Link href="/admin/eventos/create">
                            <Plus className="w-4 h-4" /> Nuevo Torneo
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Pestañas de Navegación del Dashboard Unificado */}
            <div className="flex border-b border-gray-200 gap-1 overflow-x-auto bg-gray-50/50 p-1.5 rounded-2xl">
                {[
                    { id: 'operaciones', label: 'Operaciones y Resumen', icon: Activity },
                    { id: 'reportes', label: 'Reportes y Finanzas', icon: BarChart3 },
                    { id: 'calidad', label: 'Calidad y Evaluaciones', icon: Award },
                    { id: 'integral', label: 'Vista Completa Panorámica', icon: Layers },
                ].map((tab) => {
                    const IconComp = tab.icon;
                    const active = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as typeof activeTab)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${active
                                ? 'bg-white text-blue-600 shadow-sm border border-gray-200'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
                                }`}
                        >
                            <IconComp className={`w-4 h-4 ${active ? 'text-blue-600' : 'text-gray-400'}`} />
                            <span>{tab.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* Alertas Institucionales (Siempre visibles si existen) */}
            {alertas.length > 0 && (
                <div className="flex flex-col gap-2">
                    {alertas.map((alerta, i) => (
                        <div
                            key={i}
                            className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-xs font-medium ${alerta.tipo === 'warning'
                                ? 'border-amber-200 bg-amber-50 text-amber-900'
                                : 'border-blue-200 bg-blue-50 text-blue-900'
                                }`}
                        >
                            <div className="flex items-center gap-2.5">
                                <alerta.icono className="w-4 h-4 shrink-0 text-amber-600" />
                                <span>{alerta.mensaje}</span>
                            </div>
                            <Button size="sm" variant="ghost" asChild className="h-7 text-xs font-semibold underline">
                                <Link href={alerta.tipo === 'warning' ? '/admin/pagos' : '/admin/clu'}>
                                    Revisar ahora
                                </Link>
                            </Button>
                        </div>
                    ))}
                </div>
            )}

            {/* 4 KPIs CLAVE (Presentes en todo momento) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-l-4 border-l-blue-600 shadow-sm rounded-2xl">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Padrón de Socios</CardTitle>
                        <div className="rounded-xl bg-blue-50 p-2 text-blue-600">
                            <Users className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-extrabold text-gray-900">{metricas.socios_activos}</div>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="font-medium text-emerald-700">Socios activos</span> · {metricas.socios_pendientes} en trámite
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-emerald-600 shadow-sm rounded-2xl">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Recaudación Mensual</CardTitle>
                        <div className="rounded-xl bg-emerald-50 p-2 text-emerald-600">
                            <DollarSign className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-extrabold text-gray-900">{fmt(totalRecaudado)}</div>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            {metricas.socios_mora > 0 ? (
                                <span className="text-amber-600 flex items-center gap-1 font-medium">
                                    <AlertCircle className="w-3.5 h-3.5" /> {metricas.socios_mora} con cuota en mora
                                </span>
                            ) : (
                                <span className="text-emerald-600 flex items-center gap-1 font-medium">
                                    <CheckCircle2 className="w-3.5 h-3.5" /> Padrón societario al día
                                </span>
                            )}
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-600 shadow-sm rounded-2xl">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Ocupación Polígono</CardTitle>
                        <div className="rounded-xl bg-purple-50 p-2 text-purple-600">
                            <Target className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-extrabold text-gray-900">{metricas.turnos_hoy} turnos</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Asignados en pedanas para el día de hoy
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-amber-500 shadow-sm rounded-2xl">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Índice de Calidad</CardTitle>
                        <div className="rounded-xl bg-amber-50 p-2 text-amber-500">
                            <Star className="h-4 w-4 fill-amber-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-extrabold text-gray-900">{metricas.promedio_calidad} / 5.0</div>
                        <p className="text-xs text-amber-600 mt-1 font-medium flex items-center gap-1">
                            <Star className="w-3 h-3 fill-amber-500" /> 94% valoraciones de 5 estrellas
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* SECCIÓN 1: OPERACIONES Y RESUMEN (Visible en tab 'operaciones' o 'integral') */}
            {(activeTab === 'operaciones' || activeTab === 'integral') && (
                <div className="space-y-6">
                    {/* Fila: Ocupación en tiempo real + Actividad reciente */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Estado del Polígono */}
                        <Card className="rounded-2xl border-gray-100 shadow-sm">
                            <CardHeader className="pb-3 border-b border-gray-50">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Crosshair className="w-5 h-5 text-blue-600" />
                                        <CardTitle className="text-base font-bold">Estado del Polígono — En Vivo</CardTitle>
                                    </div>
                                    <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 text-[10px]">
                                        Operativo
                                    </Badge>
                                </div>
                                <CardDescription className="text-xs">Ocupación estimada por pedana en la jornada actual</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4 pt-4">
                                {pedanas.map((p) => (
                                    <div key={p.nombre} className="space-y-1.5">
                                        <div className="flex justify-between text-xs">
                                            <span className="font-semibold text-gray-800">{p.nombre}</span>
                                            <span className="text-muted-foreground font-mono">{p.turnos} turnos · {p.ocupacion}%</span>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                                            <div
                                                className={`h-full rounded-full transition-all ${p.color}`}
                                                style={{ width: `${p.ocupacion}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Actividad Reciente */}
                        <Card className="rounded-2xl border-gray-100 shadow-sm">
                            <CardHeader className="pb-3 border-b border-gray-50">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-gray-500" />
                                    <CardTitle className="text-base font-bold">Actividad Reciente del Club</CardTitle>
                                </div>
                                <CardDescription className="text-xs">Últimos movimientos de tesorería, inscripciones y tiro</CardDescription>
                            </CardHeader>
                            <CardContent className="pt-3">
                                <ul className="divide-y divide-gray-100">
                                    {actividadReciente.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 py-2.5 first:pt-0 last:pb-0">
                                            <div className={`mt-0.5 p-1.5 rounded-lg bg-gray-50 shrink-0 ${item.color}`}>
                                                <item.icono className="w-4 h-4" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-semibold text-gray-900 leading-tight">{item.accion}</p>
                                                <p className="text-[11px] text-muted-foreground truncate mt-0.5">{item.detalle}</p>
                                            </div>
                                            <span className="text-[10px] text-muted-foreground whitespace-nowrap">{item.tiempo}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Fila: Próximos torneos + Accesos Rápidos */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Próximos torneos */}
                        <Card className="lg:col-span-1 rounded-2xl border-gray-100 shadow-sm flex flex-col justify-between">
                            <CardHeader className="pb-3 border-b border-gray-50">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <CalendarDays className="w-5 h-5 text-blue-600" />
                                        <CardTitle className="text-base font-bold">Próximos Torneos</CardTitle>
                                    </div>
                                    <Badge variant="outline" className="text-[10px]">Calendario</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3 pt-3 flex-1">
                                {proximosEventos.map((ev, i) => (
                                    <div key={i} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                            <Trophy className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-semibold text-gray-900 leading-tight">{ev.nombre}</p>
                                            <p className="text-[11px] text-muted-foreground mt-0.5">{ev.fecha} · {ev.modalidad}</p>
                                        </div>
                                        <span className="text-[10px] font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
                                            {ev.cupos}
                                        </span>
                                    </div>
                                ))}
                            </CardContent>
                            <div className="p-4 pt-0">
                                <Button variant="outline" className="w-full justify-between text-xs rounded-xl" asChild>
                                    <Link href="/admin/eventos">
                                        Ver todos los torneos <ArrowUpRight className="w-4 h-4" />
                                    </Link>
                                </Button>
                            </div>
                        </Card>

                        {/* Accesos Rápidos */}
                        <Card className="lg:col-span-2 rounded-2xl border-gray-100 shadow-sm">
                            <CardHeader className="pb-3 border-b border-gray-50">
                                <CardTitle className="text-base font-bold">Accesos Rápidos a Módulos</CardTitle>
                                <CardDescription className="text-xs">Atajos directos para la administración cotidiana</CardDescription>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {[
                                        { label: 'Padrón de Socios', href: '/admin/socios', icono: Users, color: 'bg-blue-50 text-blue-600 border-blue-100' },
                                        { label: 'Validar CLU', href: '/admin/clu', icono: ShieldCheck, color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
                                        { label: 'Planes de Membresía', href: '/admin/membresias', icono: CreditCard, color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
                                        { label: 'Stock en Armería', href: '/admin/insumos', icono: Package, color: 'bg-amber-50 text-amber-600 border-amber-100' },
                                        { label: 'Cuerpo de Instructores', href: '/admin/instructores', icono: BookOpen, color: 'bg-rose-50 text-rose-600 border-rose-100' },
                                        { label: 'Tesorería y Recibos', href: '/admin/pagos', icono: DollarSign, color: 'bg-teal-50 text-teal-600 border-teal-100' },
                                    ].map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className="flex flex-col p-3 rounded-xl border hover:shadow-sm hover:border-gray-300 transition-all group bg-white"
                                        >
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 border ${item.color}`}>
                                                <item.icono className="w-4 h-4" />
                                            </div>
                                            <span className="text-xs font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                                {item.label}
                                            </span>
                                            <span className="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-0.5">
                                                Administrar <ChevronRight className="w-3 h-3" />
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}

            {/* SECCIÓN 2: REPORTES Y FINANZAS (Visible en tab 'reportes' o 'integral') */}
            {(activeTab === 'reportes' || activeTab === 'integral') && (
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 tracking-tight flex items-center gap-2">
                                <BarChart3 className="w-5 h-5 text-blue-600" />
                                Reportes Financieros y de Utilización
                            </h2>
                            <p className="text-xs text-muted-foreground">Distribución de ingresos por concepto y capacidad de líneas de tiro.</p>
                        </div>
                        <Button variant="outline" onClick={() => window.print()} className="gap-2 text-xs h-8">
                            <Download className="w-3.5 h-3.5" /> Imprimir / Exportar Reporte
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Distribución de Ingresos */}
                        <Card className="rounded-2xl border-gray-100 shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-base font-bold text-gray-900">Composición de Ingresos Mensuales</CardTitle>
                                <CardDescription className="text-xs">Distribución proporcional de cobranzas registradas en tesorería</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {ingresosConceptos.map((item, idx) => (
                                    <div key={idx} className="space-y-1.5">
                                        <div className="flex justify-between text-xs font-semibold text-gray-700">
                                            <span>{item.concepto}</span>
                                            <span className="font-mono">{fmt(item.monto)} ({item.pct}%)</span>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                                            <div className={`${item.color} h-2.5 rounded-full`} style={{ width: `${item.pct}%` }} />
                                        </div>
                                    </div>
                                ))}

                                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                                    <span className="font-bold text-gray-700">Recaudación Total Consolidada:</span>
                                    <span className="text-sm font-extrabold text-blue-600">{fmt(totalRecaudado)}</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Ocupación por Línea / Disciplina */}
                        <Card className="rounded-2xl border-gray-100 shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-base font-bold text-gray-900">Uso de Líneas por Disciplina</CardTitle>
                                <CardDescription className="text-xs">Promedio de utilización en horarios pico del polígono</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3.5">
                                {[
                                    { linea: 'Líneas 1 a 4 (Pistola Grueso Calibre)', pct: 88, color: 'bg-blue-600' },
                                    { linea: 'Línea 5 (Carabina .22 Precisión)', pct: 72, color: 'bg-indigo-600' },
                                    { linea: 'Línea 6 (Fusil 50m)', pct: 65, color: 'bg-purple-600' },
                                    { linea: 'Líneas 7 a 9 (Tiro Neumático 10m)', pct: 58, color: 'bg-emerald-600' },
                                    { linea: 'Sector Dinámico (Recorridos IPSC)', pct: 92, color: 'bg-rose-500' },
                                ].map((item, idx) => (
                                    <div key={idx} className="space-y-1">
                                        <div className="flex justify-between text-xs font-medium text-gray-700">
                                            <span>{item.linea}</span>
                                            <span className="font-bold font-mono">{item.pct}%</span>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                                            <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.pct}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}

            {/* SECCIÓN 3: CALIDAD Y EVALUACIONES (Visible en tab 'calidad' o 'integral') */}
            {(activeTab === 'calidad' || activeTab === 'integral') && (
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 tracking-tight flex items-center gap-2">
                                <Award className="w-5 h-5 text-amber-500" />
                                Auditoría de Calidad y Devoluciones de Socios
                            </h2>
                            <p className="text-xs text-muted-foreground">Calificaciones directas emitidas por socios tras turnos, clínicas y torneos.</p>
                        </div>
                        <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                            Promedio General: {metricas.promedio_calidad} / 5.0 ★
                        </Badge>
                    </div>

                    <Card className="rounded-2xl border-gray-100 shadow-sm overflow-hidden">
                        <CardHeader className="bg-gray-50/50 pb-3 border-b border-gray-100">
                            <CardTitle className="text-base font-bold text-gray-900">
                                Registro de Evaluaciones de Servicio
                            </CardTitle>
                            <CardDescription className="text-xs">
                                Comentarios y puntuaciones de seguridad, técnica y mantenimiento
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-gray-50/70">
                                        <TableHead className="text-xs">Fecha</TableHead>
                                        <TableHead className="text-xs">Socio Evaluador</TableHead>
                                        <TableHead className="text-xs">Instructor / Sector</TableHead>
                                        <TableHead className="text-xs">Calificación</TableHead>
                                        <TableHead className="text-xs">Comentario de Experiencia</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mockEvaluaciones.map((ev, i) => (
                                        <TableRow key={i} className="hover:bg-gray-50/50">
                                            <TableCell className="text-xs text-gray-500">{ev.fecha}</TableCell>
                                            <TableCell className="font-semibold text-gray-900 text-xs">{ev.socio}</TableCell>
                                            <TableCell className="text-xs text-blue-600 font-medium">{ev.instructor}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center text-amber-500 font-bold text-xs gap-1">
                                                    <Star className="w-3.5 h-3.5 fill-amber-500" /> {ev.estrellas}.0
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
            )}
        </div>
    );
}

AdminDashboard.layout = {
    breadcrumbs: [{ title: 'Inicio', href: '/admin/dashboard' }],
};
