import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, CreditCard, ShieldCheck, AlertTriangle, ArrowRight, UserCheck } from 'lucide-react';

interface Turno {
    id: number;
    fecha: string;
    hora_inicio: string;
    hora_fin: string;
    estado: string;
    linea_de_tiro?: {
        numero_linea: number;
        nombre: string;
    };
    instructor_profile?: {
        user?: {
            name: string;
        };
    };
}

interface Pago {
    id: number;
    monto: number;
    fecha_pago: string;
    estado: string;
    concepto?: string;
}

interface SocioDashboardProps {
    socio: {
        id: number;
        numero_socio: string;
        estado_habilitacion: string;
        membresia?: {
            nombre_plan: string;
        };
        credencial_lu?: {
            numero_legajo: string;
            fecha_vencimiento: string;
            estado_validacion: string;
        };
    } | null;
    turnosProximos: Turno[];
    ultimosPagos: Pago[];
    alertaClu?: {
        tipo: 'vencida' | 'proxima_a_vencer' | 'ok';
        mensaje: string;
        dias_restantes?: number;
    } | null;
}

export default function SocioDashboard({ socio, turnosProximos, ultimosPagos, alertaClu }: SocioDashboardProps) {
    return (
        <div className="space-y-6">
            <Head title="Mi Panel de Socio" />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Panel de Socio</h1>
                    <p className="text-sm text-muted-foreground">
                        Bienvenido a tu portal de tirador. Gestioná tus turnos, credenciales y pagos.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button asChild>
                        <Link href="/turnos">Reservar Pedana</Link>
                    </Button>
                </div>
            </div>

            {/* Alerta CLU si existe */}
            {alertaClu && alertaClu.tipo !== 'ok' && (
                <div className={`p-4 rounded-xl border flex items-center gap-3 ${
                    alertaClu.tipo === 'vencida' 
                        ? 'bg-destructive/10 border-destructive/20 text-destructive' 
                        : 'bg-amber-500/10 border-amber-500/20 text-amber-600'
                }`}>
                    <AlertTriangle className="w-5 h-5 shrink-0" />
                    <div className="text-sm">
                        <span className="font-semibold">Atención de Credencial: </span>
                        {alertaClu.mensaje}
                    </div>
                </div>
            )}

            {/* Resumen del Socio */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Estado de Socio</CardTitle>
                        <UserCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold capitalize">
                            {socio?.estado_habilitacion?.replace('_', ' ') || 'Pendiente'}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Socio #{socio?.numero_socio || 'S/N'} • {socio?.membresia?.nombre_plan || 'Sin plan activo'}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Credencial CLU (ANMaC)</CardTitle>
                        <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {socio?.credencial_lu?.numero_legajo || 'Sin Legajo'}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {socio?.credencial_lu?.fecha_vencimiento 
                                ? `Vence: ${socio.credencial_lu.fecha_vencimiento}` 
                                : 'Debe presentar documentación'}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Próximo Turno</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {turnosProximos.length > 0 ? turnosProximos[0].fecha : 'Sin turnos'}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {turnosProximos.length > 0 
                                ? `${turnosProximos[0].hora_inicio} hs - ${turnosProximos[0].linea_de_tiro?.nombre || 'Pedana'}`
                                : 'Podés agendar una pedana hoy'}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Listados */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Próximos turnos */}
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle>Mis Turnos en Pedana</CardTitle>
                                <CardDescription>Próximas reservas programadas</CardDescription>
                            </div>
                            <Button variant="ghost" size="sm" asChild>
                                <Link href="/turnos" className="flex items-center gap-1 text-xs">
                                    Ver todos <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {turnosProximos.length === 0 ? (
                            <p className="text-sm text-muted-foreground py-4 text-center">
                                No tenés turnos reservados actualmente.
                            </p>
                        ) : (
                            <div className="space-y-4">
                                {turnosProximos.map((t) => (
                                    <div key={t.id} className="flex justify-between items-center p-3 border rounded-lg bg-card">
                                        <div>
                                            <div className="font-semibold text-sm">
                                                {t.linea_de_tiro?.nombre || `Línea #${t.id}`}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                {t.fecha} • {t.hora_inicio} a {t.hora_fin} hs
                                                {t.instructor_profile?.user && ` • Inst: ${t.instructor_profile.user.name}`}
                                            </div>
                                        </div>
                                        <Badge variant={t.estado === 'confirmado' ? 'default' : 'secondary'}>
                                            {t.estado}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Últimos pagos */}
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle>Historial de Cuotas y Pagos</CardTitle>
                                <CardDescription>Últimos movimientos registrados</CardDescription>
                            </div>
                            <Button variant="ghost" size="sm" asChild>
                                <Link href="/pagos" className="flex items-center gap-1 text-xs">
                                    Ver todos <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {ultimosPagos.length === 0 ? (
                            <p className="text-sm text-muted-foreground py-4 text-center">
                                No hay pagos registrados recientes.
                            </p>
                        ) : (
                            <div className="space-y-4">
                                {ultimosPagos.map((p) => (
                                    <div key={p.id} className="flex justify-between items-center p-3 border rounded-lg bg-card">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-muted rounded-full">
                                                <CreditCard className="w-4 h-4 text-muted-foreground" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-sm">
                                                    ${Number(p.monto).toLocaleString('es-AR')}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    {p.fecha_pago} {p.concepto && `• ${p.concepto}`}
                                                </div>
                                            </div>
                                        </div>
                                        <Badge variant={p.estado === 'aprobado' ? 'default' : 'secondary'}>
                                            {p.estado}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

