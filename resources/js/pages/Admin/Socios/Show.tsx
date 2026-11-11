import { Head, Link } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, User, Phone, Mail, MapPin, Shield, Calendar, CreditCard, Clock, FileText, CheckCircle2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Inicio', href: '/admin/dashboard' },
    { title: 'Socios', href: '/admin/socios' },
    { title: 'Juan Carlos Pérez', href: '#' },
];

export default function SociosShow() {
    const [tab, setTab] = useState<'general' | 'pagos' | 'turnos'>('general');

    return (
        <>
            <Head title="Ficha del Socio - Tiro Federal Formosa" />
            <div className="flex flex-col gap-6 p-6">
                {/* Header con botón volver */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Link href="/admin/socios">
                            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                                <ArrowLeft className="w-3.5 h-3.5" /> Volver al listado
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Juan Carlos Pérez</h1>
                            <p className="text-xs text-gray-500">Socio N° 1042 — Miembro desde Agosto 2026</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Link href="/admin/socios/1/edit">
                            <Button variant="outline" className="text-xs">
                                Editar Socio
                            </Button>
                        </Link>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xs">
                            Registrar Cobro
                        </Button>
                    </div>
                </div>

                {/* Perfil Header Card */}
                <Card>
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-blue-600 text-white font-bold text-xl flex items-center justify-center">
                                    JP
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h2 className="text-xl font-bold text-gray-900">Juan Carlos Pérez</h2>
                                        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">
                                            Activo / Al Día (RF08)
                                        </Badge>
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1 flex flex-wrap gap-4">
                                        <span>DNI: <strong className="text-gray-700">12.345.678</strong></span>
                                        <span>Categoría: <strong className="text-blue-600">Plan Básico</strong></span>
                                        <span>Fecha de Alta: <strong className="text-gray-700">14/08/2026</strong></span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-6 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 text-xs">
                                <div>
                                    <div className="text-gray-400">Credencial CLU</div>
                                    <div className="font-mono font-bold text-blue-600 text-sm mt-0.5">LU-1234567</div>
                                    <div className="text-emerald-600 font-semibold mt-0.5">Vigente (14/08/2027)</div>
                                </div>
                                <div>
                                    <div className="text-gray-400">Turnos en Pedana</div>
                                    <div className="font-bold text-gray-900 text-sm mt-0.5">14 turnos</div>
                                    <div className="text-gray-500 mt-0.5">Último: hace 3 días</div>
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
                                    <User className="w-4 h-4 text-blue-600" /> Información de Contacto (RF02)
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 text-xs">
                                <div className="flex justify-between py-1.5 border-b border-gray-100">
                                    <span className="text-gray-500">Correo Electrónico:</span>
                                    <span className="font-medium text-gray-900">juan.perez@email.com</span>
                                </div>
                                <div className="flex justify-between py-1.5 border-b border-gray-100">
                                    <span className="text-gray-500">Teléfono:</span>
                                    <span className="font-medium text-gray-900">+54 3704 123456</span>
                                </div>
                                <div className="flex justify-between py-1.5 border-b border-gray-100">
                                    <span className="text-gray-500">Domicilio:</span>
                                    <span className="font-medium text-gray-900">Av. 25 de Mayo 1420</span>
                                </div>
                                <div className="flex justify-between py-1.5 border-b border-gray-100">
                                    <span className="text-gray-500">Localidad / Provincia:</span>
                                    <span className="font-medium text-gray-900">Formosa, Formosa</span>
                                </div>
                                <div className="flex justify-between py-1.5">
                                    <span className="text-gray-500">Código Postal:</span>
                                    <span className="font-medium text-gray-900">3600</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Documentación ANMaC */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                    <Shield className="w-4 h-4 text-blue-600" /> Legajo ANMaC y Documentación (RF03)
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 text-xs">
                                <div className="flex justify-between py-1.5 border-b border-gray-100">
                                    <span className="text-gray-500">N° Legítimo Usuario (CLU):</span>
                                    <span className="font-mono font-bold text-blue-600">LU-1234567</span>
                                </div>
                                <div className="flex justify-between py-1.5 border-b border-gray-100">
                                    <span className="text-gray-500">Vencimiento CLU:</span>
                                    <span className="font-medium text-gray-900">14/08/2027</span>
                                </div>
                                <div className="flex justify-between py-1.5 border-b border-gray-100">
                                    <span className="text-gray-500">¿Posee arma propia?:</span>
                                    <span className="font-medium text-emerald-700">Sí (Registrada)</span>
                                </div>
                                <div className="flex justify-between py-1.5 border-b border-gray-100">
                                    <span className="text-gray-500">Profesión / Ocupación:</span>
                                    <span className="font-medium text-gray-900">Comerciante</span>
                                </div>
                                <div className="flex justify-between py-1.5">
                                    <span className="text-gray-500">Fotos de Legajo (DNI/CLU):</span>
                                    <span className="font-semibold text-emerald-600">Completas y Auditadas ✓</span>
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
                                    {[
                                        { recibo: 'REC-2026-0084', concepto: 'Cuota Mensual - Noviembre 2026', monto: 8000, metodo: 'Transferencia', fecha: '01/11/2026', estado: 'Pagado' },
                                        { recibo: 'REC-2026-0045', concepto: 'Cuota Mensual - Octubre 2026', monto: 8000, metodo: 'Transferencia', fecha: '03/10/2026', estado: 'Pagado' },
                                        { recibo: 'REC-2026-0012', concepto: 'Cuota Ingreso + Membresía Inicial', monto: 23000, metodo: 'Efectivo', fecha: '14/08/2026', estado: 'Pagado' },
                                    ].map((p, i) => (
                                        <TableRow key={i}>
                                            <TableCell className="font-mono text-xs text-blue-600">{p.recibo}</TableCell>
                                            <TableCell className="text-xs text-gray-800">{p.concepto}</TableCell>
                                            <TableCell className="text-xs font-bold text-gray-900">${p.monto.toLocaleString('es-AR')}</TableCell>
                                            <TableCell className="text-xs text-gray-600">{p.metodo}</TableCell>
                                            <TableCell className="text-xs text-gray-500">{p.fecha}</TableCell>
                                            <TableCell>
                                                <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px]">
                                                    {p.estado}
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
                                        <TableHead>Instructor</TableHead>
                                        <TableHead>Asistencia</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {[
                                        { fecha: '07/11/2026', hora: '10:00 - 11:30', pedana: 'Línea 2 (Pistola 9mm)', instructor: 'Carlos Rodríguez', asistencia: 'Presente' },
                                        { fecha: '28/10/2026', hora: '15:30 - 17:00', pedana: 'Línea 2 (Pistola 9mm)', instructor: 'Sin instructor (Tirador habilitado)', asistencia: 'Presente' },
                                        { fecha: '14/10/2026', hora: '09:00 - 10:30', pedana: 'Sector Dinámico IPSC', instructor: 'Luis Morales', asistencia: 'Presente' },
                                    ].map((t, i) => (
                                        <TableRow key={i}>
                                            <TableCell className="text-xs text-gray-600">{t.fecha}</TableCell>
                                            <TableCell className="text-xs font-semibold text-gray-900">{t.hora}</TableCell>
                                            <TableCell className="text-xs text-gray-800">{t.pedana}</TableCell>
                                            <TableCell className="text-xs text-blue-600">{t.instructor}</TableCell>
                                            <TableCell>
                                                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                                                    <CheckCircle2 className="w-3 h-3" /> {t.asistencia}
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                )}
            </div>
        </>
    );
}



SociosShow.layout = {
    breadcrumbs,
};
