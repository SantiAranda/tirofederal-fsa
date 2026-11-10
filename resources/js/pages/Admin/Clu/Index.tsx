import { Head } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog';
import { ShieldCheck, AlertTriangle, FileText, CheckCircle2, XCircle, Eye, Search, Clock } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Inicio', href: '/admin/dashboard' },
    { title: 'Validación CLU y Legajos', href: '/admin/clu' },
];

interface CredencialSocio {
    id: number;
    socio: string;
    dni: string;
    numeroClu: string;
    vencimientoClu: string;
    estado: 'Habilitado' | 'Pendiente Validación' | 'Vencido' | 'Rechazado';
    archivosSubidos: {
        dniFrente: boolean;
        dniDorso: boolean;
        cluFrente: boolean;
        cluDorso: boolean;
    };
    observacion?: string;
}

const mockCredenciales: CredencialSocio[] = [
    {
        id: 1,
        socio: 'Juan Carlos Pérez',
        dni: '12.345.678',
        numeroClu: 'LU-1234567',
        vencimientoClu: '14/08/2027',
        estado: 'Habilitado',
        archivosSubidos: { dniFrente: true, dniDorso: true, cluFrente: true, cluDorso: true },
    },
    {
        id: 2,
        socio: 'Ignacio Agustín Valiente',
        dni: '38.223.119',
        numeroClu: 'LU-9844210',
        vencimientoClu: '25/03/2027',
        estado: 'Pendiente Validación',
        archivosSubidos: { dniFrente: true, dniDorso: true, cluFrente: true, cluDorso: true },
        observacion: 'Nueva alta online pendiente de revisión por secretaría',
    },
    {
        id: 3,
        socio: 'Martín Almada',
        dni: '31.234.567',
        numeroClu: 'LU-5512098',
        vencimientoClu: '10/10/2026',
        estado: 'Vencido',
        archivosSubidos: { dniFrente: true, dniDorso: true, cluFrente: true, cluDorso: true },
        observacion: 'Credencial caducada hace 1 mes. Requiere renovar trámite ANMaC',
    },
    {
        id: 4,
        socio: 'Lucas Benjamín Gómez',
        dni: '42.980.123',
        numeroClu: 'LU-7744112',
        vencimientoClu: '01/12/2026',
        estado: 'Pendiente Validación',
        archivosSubidos: { dniFrente: true, dniDorso: false, cluFrente: true, cluDorso: true },
        observacion: 'Falta foto legible del dorso del DNI',
    },
];

export default function CluIndex() {
    const [credenciales, setCredenciales] = useState<CredencialSocio[]>(mockCredenciales);
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState<CredencialSocio | null>(null);

    const filtradas = credenciales.filter(c =>
        c.socio.toLowerCase().includes(search.toLowerCase()) ||
        c.dni.includes(search) ||
        c.numeroClu.toLowerCase().includes(search.toLowerCase())
    );

    const validarCredencial = (id: number, aprobar: boolean) => {
        setCredenciales(credenciales.map(c =>
            c.id === id ? { ...c, estado: aprobar ? 'Habilitado' : 'Rechazado' } : c
        ));
        setSelected(null);
    };

    return (
        <>
            <Head title="Validación CLU y Legajos - Tiro Federal Formosa" />
            <div className="flex flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Validación de CLU y Legajos Digitales</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Auditoría de credenciales ANMaC, DNI y aptitudes físicas/psicológicas de socios (RF03 y RF10)
                        </p>
                    </div>
                </div>

                {/* Métricas */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Pendientes de Auditoría</CardTitle>
                            <Clock className="w-4 h-4 text-amber-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">
                                {credenciales.filter(c => c.estado === 'Pendiente Validación').length}
                            </div>
                            <p className="text-xs text-amber-600 mt-1 font-medium">Requieren verificación de legajo</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-xs font-semibold text-gray-500 uppercase tracking-wider">CLU Habilitadas</CardTitle>
                            <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">
                                {credenciales.filter(c => c.estado === 'Habilitado').length}
                            </div>
                            <p className="text-xs text-emerald-600 mt-1 font-medium">Socios aptos para pedana libre</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-xs font-semibold text-gray-500 uppercase tracking-wider">CLU Vencidas / Alertas</CardTitle>
                            <AlertTriangle className="w-4 h-4 text-rose-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">
                                {credenciales.filter(c => c.estado === 'Vencido').length}
                            </div>
                            <p className="text-xs text-rose-600 mt-1 font-medium">Exigen vincular instructor al turno</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Filtro búsqueda */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Buscar por socio, DNI o N° de Legítimo Usuario..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="pl-9"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Tabla */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base font-bold text-gray-900">
                            Legajos Presentados ({filtradas.length})
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50/70">
                                    <TableHead>Socio</TableHead>
                                    <TableHead>N° CLU (ANMaC)</TableHead>
                                    <TableHead>Vencimiento</TableHead>
                                    <TableHead>Documentación</TableHead>
                                    <TableHead>Estado Legajo</TableHead>
                                    <TableHead className="text-right">Auditoría</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filtradas.map((c) => (
                                    <TableRow key={c.id}>
                                        <TableCell>
                                            <div className="font-semibold text-gray-900 text-sm">{c.socio}</div>
                                            <div className="text-xs text-gray-500">DNI: {c.dni}</div>
                                        </TableCell>
                                        <TableCell className="font-mono text-xs font-bold text-blue-600">
                                            {c.numeroClu}
                                        </TableCell>
                                        <TableCell className="text-xs font-medium text-gray-700">
                                            {c.vencimientoClu}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-1.5 text-[11px]">
                                                <span className={`px-1.5 py-0.5 rounded ${c.archivosSubidos.dniFrente && c.archivosSubidos.dniDorso ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                                                    DNI {c.archivosSubidos.dniFrente && c.archivosSubidos.dniDorso ? '✓' : 'Incompleto'}
                                                </span>
                                                <span className={`px-1.5 py-0.5 rounded ${c.archivosSubidos.cluFrente && c.archivosSubidos.cluDorso ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                                                    CLU {c.archivosSubidos.cluFrente && c.archivosSubidos.cluDorso ? '✓' : 'Incompleto'}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {c.estado === 'Habilitado' && (
                                                <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">Habilitado</Badge>
                                            )}
                                            {c.estado === 'Pendiente Validación' && (
                                                <Badge className="bg-amber-50 text-amber-700 border-amber-200">Pendiente</Badge>
                                            )}
                                            {c.estado === 'Vencido' && (
                                                <Badge className="bg-rose-50 text-rose-700 border-rose-200">Vencido</Badge>
                                            )}
                                            {c.estado === 'Rechazado' && (
                                                <Badge className="bg-gray-100 text-gray-700">Rechazado</Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => setSelected(c)}
                                                className="text-xs h-8 gap-1.5 text-blue-600 hover:text-blue-700"
                                            >
                                                <Eye className="w-3.5 h-3.5" /> Revisar Legajo
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Dialog Ver y Validar Legajo */}
                <Dialog open={!!selected} onOpenChange={open => !open && setSelected(null)}>
                    {selected && (
                        <DialogContent className="max-w-xl">
                            <DialogHeader>
                                <DialogTitle>Legajo Digital - {selected.socio}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 pt-2">
                                <div className="grid grid-cols-2 gap-3 text-xs bg-gray-50 p-3 rounded-lg border border-gray-100">
                                    <div><span className="text-gray-500">DNI:</span> <span className="font-semibold text-gray-900">{selected.dni}</span></div>
                                    <div><span className="text-gray-500">N° CLU:</span> <span className="font-mono font-bold text-blue-600">{selected.numeroClu}</span></div>
                                    <div><span className="text-gray-500">Vencimiento CLU:</span> <span className="font-semibold text-gray-900">{selected.vencimientoClu}</span></div>
                                    <div><span className="text-gray-500">Estado actual:</span> <span className="font-bold">{selected.estado}</span></div>
                                </div>

                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                                        Archivos Adjuntos Requeridos (RF03)
                                    </h4>
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                        <div className="border rounded p-2.5 flex items-center justify-between bg-white">
                                            <span className="flex items-center gap-1.5 text-gray-700">
                                                <FileText className="w-4 h-4 text-blue-600" /> DNI (Frente)
                                            </span>
                                            <span className="text-emerald-600 font-bold">Cargado</span>
                                        </div>
                                        <div className="border rounded p-2.5 flex items-center justify-between bg-white">
                                            <span className="flex items-center gap-1.5 text-gray-700">
                                                <FileText className="w-4 h-4 text-blue-600" /> DNI (Dorso)
                                            </span>
                                            <span className={selected.archivosSubidos.dniDorso ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>
                                                {selected.archivosSubidos.dniDorso ? 'Cargado' : 'Faltante'}
                                            </span>
                                        </div>
                                        <div className="border rounded p-2.5 flex items-center justify-between bg-white">
                                            <span className="flex items-center gap-1.5 text-gray-700">
                                                <FileText className="w-4 h-4 text-blue-600" /> CLU (Frente)
                                            </span>
                                            <span className="text-emerald-600 font-bold">Cargado</span>
                                        </div>
                                        <div className="border rounded p-2.5 flex items-center justify-between bg-white">
                                            <span className="flex items-center gap-1.5 text-gray-700">
                                                <FileText className="w-4 h-4 text-blue-600" /> CLU (Dorso)
                                            </span>
                                            <span className="text-emerald-600 font-bold">Cargado</span>
                                        </div>
                                    </div>
                                </div>

                                {selected.observacion && (
                                    <div className="text-xs p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800">
                                        <strong>Observación:</strong> {selected.observacion}
                                    </div>
                                )}

                                <DialogFooter className="pt-2 gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="text-rose-600 border-rose-200 hover:bg-rose-50"
                                        onClick={() => validarCredencial(selected.id, false)}
                                    >
                                        <XCircle className="w-4 h-4 mr-1" /> Rechazar
                                    </Button>
                                    <Button
                                        type="button"
                                        className="bg-emerald-600 hover:bg-emerald-700 text-white"
                                        onClick={() => validarCredencial(selected.id, true)}
                                    >
                                        <CheckCircle2 className="w-4 h-4 mr-1" /> Aprobar y Habilitar Socio
                                    </Button>
                                </DialogFooter>
                            </div>
                        </DialogContent>
                    )}
                </Dialog>
            </div>
        </>
    );
}

CluIndex.layout = {
    breadcrumbs,
};

