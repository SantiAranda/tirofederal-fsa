import { Head, Link } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from '@/components/ui/dialog';
import {
    ArrowLeft, User, Phone, Mail, MapPin, Shield, Calendar,
    CreditCard, Clock, FileText, CheckCircle2, XCircle, Eye,
    RotateCw, ZoomIn, ZoomOut
} from 'lucide-react';

interface Props {
    socio?: any;
}

export default function SociosShow({ socio }: Props) {
    const [tab, setTab] = useState<'general' | 'pagos' | 'turnos'>('general');
    const [viewingDoc, setViewingDoc] = useState<{ url: string; label: string } | null>(null);

    const user = socio?.user;
    const credencial = socio?.credencial_lu || socio?.credencialLu;
    const membresia = socio?.membresia;
    const pagos = socio?.pagos || [];
    const turnos = socio?.turnos || [];

    const nombreCompleto = user ? `${user.nombre || user.name} ${user.apellido || ''}`.trim() : 'Juan Carlos Pérez';
    const initials = user ? `${(user.nombre || user.name || 'S')[0]}${(user.apellido || 'P')[0]}`.toUpperCase() : 'JP';
    const numeroSocio = socio?.numero_socio || '1042';
    const fechaAlta = socio?.fecha_alta
        ? new Date(socio.fecha_alta).toLocaleDateString('es-AR')
        : '14/08/2026';

    const estadoHabilitacion = socio?.estado_habilitacion || 'activo';
    const isActivo = estadoHabilitacion === 'activo';

    const cluNumero = credencial?.numero_clu || 'LU-1234567';
    const cluVencimiento = credencial?.fecha_vencimiento
        ? new Date(credencial.fecha_vencimiento).toLocaleDateString('es-AR')
        : '14/08/2027';

    const credencialId = credencial?.id || 1;

    const archivosConfig = [
        { label: 'DNI (Frente)', cargado: !!credencial?.foto_dni_frente_path, tipo: 'dni_frente' },
        { label: 'DNI (Dorso)', cargado: !!credencial?.foto_dni_dorso_path, tipo: 'dni_dorso' },
        { label: 'CLU (Frente)', cargado: !!credencial?.foto_clu_frente_path, tipo: 'clu_frente' },
        { label: 'CLU (Dorso)', cargado: !!credencial?.foto_clu_dorso_path, tipo: 'clu_dorso' },
    ];

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Inicio', href: '/admin/dashboard' },
        { title: 'Socios', href: '/admin/socios' },
        { title: nombreCompleto, href: '#' },
    ];

    return (
        <div className="flex flex-col gap-6">
            <Head title={`Ficha de ${nombreCompleto} - Tiro Federal Formosa`} />

            {/* Header con botón volver */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" asChild className="gap-1.5 text-xs">
                        <Link href="/admin/socios">
                            <ArrowLeft className="w-3.5 h-3.5" /> Volver al listado
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{nombreCompleto}</h1>
                        <p className="text-xs text-gray-500">Socio N° {numeroSocio} — Miembro desde {fechaAlta}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" asChild className="text-xs">
                        <Link href={`/admin/socios/${socio?.id || 1}/edit`}>
                            Editar Socio
                        </Link>
                    </Button>
                    <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white text-xs">
                        <Link href="/admin/pagos">
                            Registrar Cobro
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Perfil Header Card */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-blue-600 text-white font-bold text-xl flex items-center justify-center">
                                {initials}
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h2 className="text-xl font-bold text-gray-900">{nombreCompleto}</h2>
                                    {isActivo ? (
                                        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">
                                            Activo / Al Día
                                        </Badge>
                                    ) : (
                                        <Badge className="bg-amber-50 text-amber-700 border-amber-200">
                                            {estadoHabilitacion}
                                        </Badge>
                                    )}
                                </div>
                                <div className="text-xs text-gray-500 mt-1 flex flex-wrap gap-4">
                                    <span>DNI: <strong className="text-gray-700">{user?.dni || '34.567.890'}</strong></span>
                                    <span>Categoría: <strong className="text-blue-600">{membresia?.nombre || 'Plan Estándar'}</strong></span>
                                    <span>Fecha de Alta: <strong className="text-gray-700">{fechaAlta}</strong></span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-6 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 text-xs">
                            <div>
                                <div className="text-gray-400">Credencial CLU</div>
                                <div className="font-mono font-bold text-blue-600 text-sm mt-0.5">{cluNumero}</div>
                                <div className="text-emerald-600 font-semibold mt-0.5">Vigente ({cluVencimiento})</div>
                            </div>
                            <div>
                                <div className="text-gray-400">Turnos en Pedana</div>
                                <div className="font-bold text-gray-900 text-sm mt-0.5">{turnos.length} turnos</div>
                                <div className="text-gray-500 mt-0.5">Historial registrado</div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Navegación pestañas */}
            <div className="flex border-b border-gray-200">
                <button
                    onClick={() => setTab('general')}
                    className={`pb-3 px-4 font-semibold text-sm border-b-2 transition-colors ${
                        tab === 'general' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'
                    }`}
                >
                    Datos Personales y Legajo
                </button>
                <button
                    onClick={() => setTab('pagos')}
                    className={`pb-3 px-4 font-semibold text-sm border-b-2 transition-colors ${
                        tab === 'pagos' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'
                    }`}
                >
                    Historial de Pagos y Cuotas
                </button>
                <button
                    onClick={() => setTab('turnos')}
                    className={`pb-3 px-4 font-semibold text-sm border-b-2 transition-colors ${
                        tab === 'turnos' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'
                    }`}
                >
                    Asistencia y Turnos de Polígono
                </button>
            </div>

            {tab === 'general' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Datos de contacto */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                <User className="w-4 h-4 text-blue-600" /> Información de Contacto
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-xs">
                            <div className="flex justify-between py-1.5 border-b border-gray-100">
                                <span className="text-gray-500">Correo Electrónico:</span>
                                <span className="font-medium text-gray-900">{user?.email || 'usuario@email.com'}</span>
                            </div>
                            <div className="flex justify-between py-1.5 border-b border-gray-100">
                                <span className="text-gray-500">Teléfono:</span>
                                <span className="font-medium text-gray-900">{user?.telefono || '+54 3704 000000'}</span>
                            </div>
                            <div className="flex justify-between py-1.5 border-b border-gray-100">
                                <span className="text-gray-500">Domicilio:</span>
                                <span className="font-medium text-gray-900">{user?.domicilio || 'Av. 25 de Mayo 1420'}</span>
                            </div>
                            <div className="flex justify-between py-1.5 border-b border-gray-100">
                                <span className="text-gray-500">Localidad / Provincia:</span>
                                <span className="font-medium text-gray-900">{user?.ciudad || 'Formosa'}, {user?.provincia || 'Formosa'}</span>
                            </div>
                            <div className="flex justify-between py-1.5">
                                <span className="text-gray-500">Código Postal:</span>
                                <span className="font-medium text-gray-900">{user?.codigo_postal || '3600'}</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Documentación ANMaC y Archivos Adjuntos */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                <Shield className="w-4 h-4 text-blue-600" /> Legajo ANMaC y Documentación
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-xs">
                            <div className="flex justify-between py-1.5 border-b border-gray-100">
                                <span className="text-gray-500">N° Legítimo Usuario (CLU):</span>
                                <span className="font-mono font-bold text-blue-600">{cluNumero}</span>
                            </div>
                            <div className="flex justify-between py-1.5 border-b border-gray-100">
                                <span className="text-gray-500">Vencimiento CLU:</span>
                                <span className="font-medium text-gray-900">{cluVencimiento}</span>
                            </div>
                            <div className="flex justify-between py-1.5 border-b border-gray-100">
                                <span className="text-gray-500">¿Posee arma propia?:</span>
                                <span className="font-medium text-emerald-700">
                                    {socio?.posee_arma_propia ? 'Sí (Registrada)' : 'No'}
                                </span>
                            </div>

                            {/* Acceso a archivos del legajo */}
                            <div className="pt-2">
                                <span className="text-gray-700 font-bold block mb-2">Archivos del Legajo Digital:</span>
                                <div className="grid grid-cols-2 gap-2">
                                    {archivosConfig.map((doc) => (
                                        <div key={doc.tipo} className="border rounded-md p-2 bg-gray-50 flex flex-col justify-between gap-1.5">
                                            <div className="flex items-center justify-between">
                                                <span className="font-semibold text-gray-800 text-[11px]">{doc.label}</span>
                                                {doc.cargado ? (
                                                    <span className="text-emerald-600 font-bold text-[10px] flex items-center gap-0.5">
                                                        <CheckCircle2 className="w-2.5 h-2.5" /> Cargado
                                                    </span>
                                                ) : (
                                                    <span className="text-rose-600 font-bold text-[10px] flex items-center gap-0.5">
                                                        <XCircle className="w-2.5 h-2.5" /> Faltante
                                                    </span>
                                                )}
                                            </div>
                                            {doc.cargado && (
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    type="button"
                                                    onClick={() => setViewingDoc({
                                                        url: `/admin/clu/${credencialId}/documento/${doc.tipo}`,
                                                        label: `${nombreCompleto} — ${doc.label}`,
                                                    })}
                                                    className="h-6 text-[10px] w-full gap-1 bg-white hover:bg-blue-50 text-blue-700"
                                                >
                                                    <Eye className="w-2.5 h-2.5" /> Ver en Modal
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {tab === 'pagos' && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base font-bold text-gray-900">Historial de Cuotas y Pagos</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50">
                                    <TableHead>Recibo</TableHead>
                                    <TableHead>Concepto</TableHead>
                                    <TableHead>Monto</TableHead>
                                    <TableHead>Método</TableHead>
                                    <TableHead>Fecha</TableHead>
                                    <TableHead>Estado</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {(pagos.length > 0 ? pagos : [
                                    { numero_comprobante: 'REC-2026-0084', concepto: 'Cuota Mensual - Noviembre 2026', monto: 8000, metodo_pago: 'Transferencia', fecha_pago: '2026-11-01', estado: 'aprobado' },
                                    { numero_comprobante: 'REC-2026-0045', concepto: 'Cuota Mensual - Octubre 2026', monto: 8000, metodo_pago: 'Transferencia', fecha_pago: '2026-10-03', estado: 'aprobado' },
                                ]).map((p: any, i: number) => (
                                    <TableRow key={i}>
                                        <TableCell className="font-mono text-xs text-blue-600">{p.numero_comprobante || p.recibo || '-'}</TableCell>
                                        <TableCell className="text-xs text-gray-800">{p.concepto || 'Cuota Social'}</TableCell>
                                        <TableCell className="text-xs font-bold text-gray-900">${(p.monto || 0).toLocaleString('es-AR')}</TableCell>
                                        <TableCell className="text-xs text-gray-600">{p.metodo_pago || p.metodo || 'Transferencia'}</TableCell>
                                        <TableCell className="text-xs text-gray-500">{p.fecha_pago ? new Date(p.fecha_pago).toLocaleDateString('es-AR') : p.fecha}</TableCell>
                                        <TableCell>
                                            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px]">
                                                {p.estado === 'aprobado' ? 'Pagado' : (p.estado || 'Pagado')}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}

            {tab === 'turnos' && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base font-bold text-gray-900">Historial de Turnos en Líneas de Tiro</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50">
                                    <TableHead>Fecha</TableHead>
                                    <TableHead>Horario</TableHead>
                                    <TableHead>Pedana</TableHead>
                                    <TableHead>Estado</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {(turnos.length > 0 ? turnos : [
                                    { fecha: '2026-11-07', hora_inicio: '10:00', hora_fin: '11:30', linea_de_tiro: { nombre: 'Línea 2 (Pistola 9mm)' }, estado: 'asistido' },
                                    { fecha: '2026-10-28', hora_inicio: '15:30', hora_fin: '17:00', linea_de_tiro: { nombre: 'Línea 2 (Pistola 9mm)' }, estado: 'asistido' },
                                ]).map((t: any, i: number) => (
                                    <TableRow key={i}>
                                        <TableCell className="text-xs text-gray-600">{t.fecha ? new Date(t.fecha).toLocaleDateString('es-AR') : t.fecha}</TableCell>
                                        <TableCell className="text-xs font-semibold text-gray-900">{t.hora_inicio} - {t.hora_fin}</TableCell>
                                        <TableCell className="text-xs text-gray-800">{t.linea_de_tiro?.nombre || t.pedana || 'Pedana estándar'}</TableCell>
                                        <TableCell>
                                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                                                <CheckCircle2 className="w-3 h-3" /> {t.estado || 'Presente'}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}
            {/* Modal Visor de Documento */}
            <Dialog open={!!viewingDoc} onOpenChange={open => !open && setViewingDoc(null)}>
                {viewingDoc && (
                    <DialogContent className="max-w-3xl p-0 overflow-hidden bg-slate-900 border-slate-800 text-white">
                        <DialogHeader className="p-4 bg-slate-950 border-b border-slate-800 flex flex-row items-center justify-between">
                            <div>
                                <DialogTitle className="text-sm font-semibold">{viewingDoc.label}</DialogTitle>
                                <DialogDescription className="text-xs text-slate-400">Visor de legajo digital del socio</DialogDescription>
                            </div>
                        </DialogHeader>
                        <div className="p-4 flex items-center justify-center min-h-[400px] max-h-[70vh] overflow-auto bg-slate-900/90">
                            <img
                                src={viewingDoc.url}
                                alt={viewingDoc.label}
                                className="max-h-[60vh] max-w-full object-contain rounded shadow"
                                onError={(e) => {
                                    const target = e.currentTarget;
                                    target.style.display = 'none';
                                    const fallback = document.getElementById('socio-pdf-fallback');
                                    if (fallback) fallback.style.display = 'block';
                                }}
                            />
                            <iframe
                                id="socio-pdf-fallback"
                                src={viewingDoc.url}
                                className="w-full h-[60vh] rounded bg-white hidden"
                                title={viewingDoc.label}
                            />
                        </div>
                        <DialogFooter className="p-3 bg-slate-950 border-t border-slate-800">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setViewingDoc(null)}
                                className="text-xs bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700"
                            >
                                Cerrar Visor
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                )}
            </Dialog>
        </div>
    );
}

SociosShow.layout = {
    breadcrumbs: [
        { title: 'Inicio', href: '/admin/dashboard' },
        { title: 'Socios', href: '/admin/socios' },
    ],
};
