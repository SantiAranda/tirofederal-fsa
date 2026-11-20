import { Head, router } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from '@/components/ui/dialog';
import {
    ShieldCheck, AlertTriangle, FileText, CheckCircle2, XCircle,
    Eye, Search, Clock, RotateCw, ZoomIn, ZoomOut,
    Maximize2, Minimize2
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Inicio', href: '/admin/dashboard' },
    { title: 'Validación CLU y Legajos', href: '/admin/clu' },
];

type DocTipo = 'dni_frente' | 'dni_dorso' | 'clu_frente' | 'clu_dorso';
type ModalWidth = 'normal' | 'ancho' | 'fullscreen';

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
        socio: 'Lourdes Antonella Bordon Sbardella',
        dni: '42.993.848',
        numeroClu: 'S/N',
        vencimientoClu: 'Sin fecha',
        estado: 'Pendiente Validación',
        archivosSubidos: { dniFrente: true, dniDorso: false, cluFrente: true, cluDorso: false },
        observacion: 'Solicitud online de nuevo socio pendiente de auditoría documental',
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

interface Props {
    credenciales?: { data: any[] } | any[];
    filtros?: { estado?: string; q?: string };
    estadosDisponibles?: string[];
}

export default function CluIndex({ credenciales: serverCredenciales }: Props) {
    const rawList = Array.isArray(serverCredenciales) ? serverCredenciales : (serverCredenciales?.data || []);
    const parsedInitial: CredencialSocio[] = rawList.length > 0
        ? rawList.map((c: any) => {
            const user = c.socio_profile?.user || c.socioProfile?.user;
            const estadoMap: Record<string, CredencialSocio['estado']> = {
                'aprobado': 'Habilitado',
                'pendiente': 'Pendiente Validación',
                'vencido': 'Vencido',
                'rechazado': 'Rechazado',
            };
            return {
                id: c.id,
                socio: user ? `${user.nombre} ${user.apellido}` : 'Socio #' + c.id,
                dni: user?.dni || '-',
                numeroClu: c.numero_clu || 'S/N',
                vencimientoClu: c.fecha_vencimiento ? new Date(c.fecha_vencimiento).toLocaleDateString('es-AR') : 'Sin fecha',
                estado: estadoMap[c.estado_validacion] || 'Pendiente Validación',
                archivosSubidos: {
                    dniFrente: !!c.foto_dni_frente_path,
                    dniDorso: !!c.foto_dni_dorso_path,
                    cluFrente: !!c.foto_clu_frente_path,
                    cluDorso: !!c.foto_clu_dorso_path,
                },
                observacion: c.observaciones_auditoria || undefined,
            };
        })
        : mockCredenciales;

    const [credenciales, setCredenciales] = useState<CredencialSocio[]>(parsedInitial);
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState<CredencialSocio | null>(null);

    // Ajuste de ancho y controles del visor
    const [modalWidth, setModalWidth] = useState<ModalWidth>('ancho');
    const [activeDoc, setActiveDoc] = useState<DocTipo>('dni_frente');
    const [zoomLevel, setZoomLevel] = useState<number>(1);
    const [rotation, setRotation] = useState<number>(0);

    // Cuando se selecciona un socio, seleccionar el primer documento cargado disponible
    useEffect(() => {
        if (selected) {
            setZoomLevel(1);
            setRotation(0);
            if (selected.archivosSubidos.dniFrente) setActiveDoc('dni_frente');
            else if (selected.archivosSubidos.cluFrente) setActiveDoc('clu_frente');
            else if (selected.archivosSubidos.dniDorso) setActiveDoc('dni_dorso');
            else if (selected.archivosSubidos.cluDorso) setActiveDoc('clu_dorso');
            else setActiveDoc('dni_frente');
        }
    }, [selected]);

    const filtradas = credenciales.filter(c =>
        c.socio.toLowerCase().includes(search.toLowerCase()) ||
        c.dni.includes(search) ||
        c.numeroClu.toLowerCase().includes(search.toLowerCase())
    );

    const pendientesCount = credenciales.filter(c => c.estado === 'Pendiente Validación').length;
    const habilitadasCount = credenciales.filter(c => c.estado === 'Habilitado').length;
    const vencidasCount = credenciales.filter(c => c.estado === 'Vencido' || c.estado === 'Rechazado').length;

    const validarCredencial = (id: number, aprobar: boolean) => {
        router.patch(`/admin/clu/${id}/validar`, {
            estado: aprobar ? 'aprobado' : 'rechazado',
            observaciones: aprobar ? 'Aprobado formalmente por Secretaría' : 'Rechazado por documentación inconsistente',
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setCredenciales(credenciales.map(c =>
                    c.id === id ? { ...c, estado: aprobar ? 'Habilitado' : 'Rechazado' } : c
                ));
                setSelected(null);
            }
        });
    };

    // Configuración de los 4 documentos requeridos
    const docsConfig: { tipo: DocTipo; label: string; cargado: boolean }[] = selected ? [
        { tipo: 'dni_frente', label: 'DNI (Frente)', cargado: selected.archivosSubidos.dniFrente },
        { tipo: 'dni_dorso',  label: 'DNI (Dorso)',  cargado: selected.archivosSubidos.dniDorso },
        { tipo: 'clu_frente', label: 'CLU (Frente)', cargado: selected.archivosSubidos.cluFrente },
        { tipo: 'clu_dorso',  label: 'CLU (Dorso)',  cargado: selected.archivosSubidos.cluDorso },
    ] : [];

    const currentDocConfig = docsConfig.find(d => d.tipo === activeDoc);

    // Cálculo dinámico de ancho en píxeles/porcentaje
    const widthStyle = modalWidth === 'fullscreen'
        ? '96vw'
        : modalWidth === 'ancho'
            ? '1260px'
            : '1000px';

    return (
        <>
            <Head title="Validación CLU y Legajos - Tiro Federal Formosa" />
            <div className="flex flex-col gap-6">
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
                            <div className="text-2xl font-bold text-amber-600">{pendientesCount}</div>
                            <p className="text-xs text-gray-500 mt-1">Requieren verificación de legajo</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-xs font-semibold text-gray-500 uppercase tracking-wider">CLU Habilitadas</CardTitle>
                            <ShieldCheck className="w-4 h-4 text-emerald-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-emerald-600">{habilitadasCount}</div>
                            <p className="text-xs text-gray-500 mt-1">Socios aptos para pedana libre</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-xs font-semibold text-gray-500 uppercase tracking-wider">CLU Vencidas / Alertas</CardTitle>
                            <AlertTriangle className="w-4 h-4 text-rose-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-rose-600">{vencidasCount}</div>
                            <p className="text-xs text-gray-500 mt-1">Exigen vincular instructor al turno</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Tabla de Legajos */}
                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <CardTitle className="text-base font-bold text-gray-900">
                                    Legajos Presentados ({filtradas.length})
                                </CardTitle>
                                <CardDescription className="text-xs">
                                    Hacé clic en "Revisar Legajo" para abrir el visor apaisado e inspeccionar los documentos en alta definición.
                                </CardDescription>
                            </div>
                            <div className="relative w-full sm:w-72">
                                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <Input
                                    placeholder="Buscar por socio, DNI o N° CLU..."
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    className="pl-9 h-9 text-xs"
                                />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50">
                                    <TableHead>Socio</TableHead>
                                    <TableHead>N° CLU</TableHead>
                                    <TableHead>Vencimiento</TableHead>
                                    <TableHead>Documentación</TableHead>
                                    <TableHead>Estado Legajo</TableHead>
                                    <TableHead className="text-right">Auditoría</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filtradas.map(c => (
                                    <TableRow key={c.id} className="hover:bg-gray-50/70">
                                        <TableCell>
                                            <div className="font-semibold text-gray-900 text-sm">{c.socio}</div>
                                            <div className="text-xs text-gray-500">DNI: {c.dni}</div>
                                        </TableCell>
                                        <TableCell className="font-mono text-xs font-bold text-blue-600">
                                            {c.numeroClu}
                                        </TableCell>
                                        <TableCell className="text-xs text-gray-600">
                                            {c.vencimientoClu}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2 flex-wrap items-center">
                                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold ${
                                                    c.archivosSubidos.dniFrente || c.archivosSubidos.dniDorso
                                                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                                                }`}>
                                                    {c.archivosSubidos.dniFrente && c.archivosSubidos.dniDorso
                                                        ? <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                                        : <XCircle className="w-3 h-3 text-rose-600" />
                                                    }
                                                    DNI
                                                </span>

                                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold ${
                                                    c.archivosSubidos.cluFrente || c.archivosSubidos.cluDorso
                                                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                                                }`}>
                                                    {c.archivosSubidos.cluFrente && c.archivosSubidos.cluDorso
                                                        ? <CheckCircle2 className="w-3 h-3 text-blue-600" />
                                                        : <XCircle className="w-3 h-3 text-rose-600" />
                                                    }
                                                    CLU
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
                                                className="text-xs h-8 gap-1.5 text-blue-600 hover:text-blue-700 border-blue-200 hover:bg-blue-50"
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

                {/* MODAL HORIZONTAL / APAISADO AJUSTABLE */}
                <Dialog open={!!selected} onOpenChange={open => !open && setSelected(null)}>
                    {selected && (
                        <DialogContent
                            style={{
                                width: widthStyle,
                                maxWidth: '96vw',
                                height: modalWidth === 'fullscreen' ? '92vh' : 'auto',
                                maxHeight: '92vh',
                            }}
                            className="sm:max-w-none p-0 overflow-hidden flex flex-col rounded-2xl border border-gray-200 shadow-2xl transition-all duration-200"
                        >
                            {/* Cabecera del Modal */}
                            <div className="p-4 px-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white shrink-0">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                                        <ShieldCheck className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <DialogTitle className="text-base font-bold text-gray-900">
                                            Auditoría de Legajo Digital — {selected.socio}
                                        </DialogTitle>
                                        <DialogDescription className="text-xs text-gray-500">
                                            DNI: {selected.dni} · N° CLU: {selected.numeroClu} ({selected.estado})
                                        </DialogDescription>
                                    </div>
                                </div>

                                {/* Ajustador Manual de Ancho */}
                                <div className="flex items-center gap-1 mr-6 bg-gray-100 p-1 rounded-xl self-start sm:self-auto select-none">
                                    <span className="text-[11px] font-medium text-gray-500 px-2">Ancho:</span>
                                    <button
                                        type="button"
                                        onClick={() => setModalWidth('normal')}
                                        className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                                            modalWidth === 'normal'
                                                ? 'bg-white text-blue-700 shadow-xs'
                                                : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                    >
                                        Estándar (1000px)
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setModalWidth('ancho')}
                                        className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                                            modalWidth === 'ancho'
                                                ? 'bg-white text-blue-700 shadow-xs'
                                                : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                    >
                                        Ancho (1260px)
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setModalWidth('fullscreen')}
                                        className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all flex items-center gap-1 ${
                                            modalWidth === 'fullscreen'
                                                ? 'bg-white text-blue-700 shadow-xs'
                                                : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                    >
                                        <Maximize2 className="w-3 h-3 text-blue-600" />
                                        <span>Completo</span>
                                    </button>
                                </div>
                            </div>

                            {/* Contenido en 2 Columnas Horizontales */}
                            <div className="flex-1 min-h-0 flex flex-col md:flex-row overflow-hidden bg-white">
                                {/* Columna Izquierda (320px): Ficha, Selector de Documentos y Decisiones */}
                                <div className="w-full md:w-80 lg:w-96 border-r border-gray-100 p-5 flex flex-col justify-between overflow-y-auto bg-gray-50/50 shrink-0">
                                    <div className="space-y-4">
                                        {/* Datos del Socio */}
                                        <div className="bg-white p-3.5 rounded-xl border border-gray-200 text-xs space-y-1.5 shadow-2xs">
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">DNI:</span>
                                                <span className="font-semibold text-gray-900">{selected.dni}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">N° CLU:</span>
                                                <span className="font-mono font-bold text-blue-600">{selected.numeroClu}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Vencimiento:</span>
                                                <span className="font-medium text-gray-800">{selected.vencimientoClu}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Estado actual:</span>
                                                <span className="font-bold text-gray-900">{selected.estado}</span>
                                            </div>
                                        </div>

                                        {/* Selector Vertical de Documentos */}
                                        <div>
                                            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-600 block mb-2">
                                                Documentos Adjuntos (RF03)
                                            </span>
                                            <div className="space-y-2">
                                                {docsConfig.map((doc) => {
                                                    const isActive = activeDoc === doc.tipo;
                                                    return (
                                                        <button
                                                            key={doc.tipo}
                                                            type="button"
                                                            onClick={() => {
                                                                setActiveDoc(doc.tipo);
                                                                setZoomLevel(1);
                                                                setRotation(0);
                                                            }}
                                                            className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                                                                isActive
                                                                    ? 'border-blue-600 bg-blue-50/90 shadow-xs ring-2 ring-blue-600/20'
                                                                    : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                                                            }`}
                                                        >
                                                            <span className="text-xs font-semibold text-gray-900 flex items-center gap-2">
                                                                <FileText className={`w-4 h-4 ${doc.cargado ? 'text-blue-600' : 'text-gray-400'}`} />
                                                                {doc.label}
                                                            </span>

                                                            {doc.cargado ? (
                                                                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                                                                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Cargado
                                                                </span>
                                                            ) : (
                                                                <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200 flex items-center gap-1">
                                                                    <XCircle className="w-3 h-3 text-rose-500" /> Faltante
                                                                </span>
                                                            )}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* Observación Registrada */}
                                        {selected.observacion && (
                                            <div className="text-xs p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 leading-relaxed">
                                                <strong>Observación:</strong> {selected.observacion}
                                            </div>
                                        )}
                                    </div>

                                    {/* Botones de Decisión en la columna izquierda */}
                                    <div className="pt-4 mt-4 border-t border-gray-200 space-y-2">
                                        <Button
                                            type="button"
                                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs h-9 shadow-xs"
                                            onClick={() => validarCredencial(selected.id, true)}
                                        >
                                            <CheckCircle2 className="w-4 h-4 mr-1.5" /> Aprobar y Habilitar Socio
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="w-full text-rose-600 border-rose-200 hover:bg-rose-50 hover:text-rose-700 text-xs h-9"
                                            onClick={() => validarCredencial(selected.id, false)}
                                        >
                                            <XCircle className="w-4 h-4 mr-1.5" /> Rechazar Legajo
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            onClick={() => setSelected(null)}
                                            className="w-full text-xs text-gray-500 h-8 hover:text-gray-800"
                                        >
                                            Cerrar Visor
                                        </Button>
                                    </div>
                                </div>

                                {/* Columna Derecha: Visor Ancho del Documento */}
                                <div className="flex-1 flex flex-col bg-slate-900 min-w-0">
                                    {/* Barra Superior del Visor */}
                                    <div className="bg-slate-950 px-5 py-2.5 flex items-center justify-between text-xs text-gray-300 border-b border-slate-800 shrink-0">
                                        <div className="flex items-center gap-2">
                                            <Eye className="w-4 h-4 text-blue-400" />
                                            <span className="font-semibold text-white text-sm">
                                                {currentDocConfig?.label}
                                            </span>
                                            {currentDocConfig?.cargado ? (
                                                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-[10px] py-0">
                                                    Disponible
                                                </Badge>
                                            ) : (
                                                <Badge className="bg-rose-500/20 text-rose-400 border-rose-500/30 text-[10px] py-0">
                                                    No adjuntado
                                                </Badge>
                                            )}
                                        </div>

                                        {/* Controles de Zoom y Rotación */}
                                        {currentDocConfig?.cargado && (
                                            <div className="flex items-center gap-2">
                                                <div className="flex items-center bg-slate-800/80 rounded-md border border-slate-700 p-0.5">
                                                    <Button
                                                        type="button"
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() => setZoomLevel(prev => Math.max(0.5, prev - 0.2))}
                                                        className="h-6 w-6 p-0 text-slate-300 hover:text-white hover:bg-slate-700"
                                                        title="Reducir zoom"
                                                    >
                                                        <ZoomOut className="w-3.5 h-3.5" />
                                                    </Button>
                                                    <span className="text-[11px] font-mono w-12 text-center text-slate-300 font-semibold">
                                                        {Math.round(zoomLevel * 100)}%
                                                    </span>
                                                    <Button
                                                        type="button"
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() => setZoomLevel(prev => Math.min(3.5, prev + 0.2))}
                                                        className="h-6 w-6 p-0 text-slate-300 hover:text-white hover:bg-slate-700"
                                                        title="Aumentar zoom"
                                                    >
                                                        <ZoomIn className="w-3.5 h-3.5" />
                                                    </Button>
                                                </div>

                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => setRotation(prev => (prev + 90) % 360)}
                                                    className="h-7 px-2.5 text-xs text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700 gap-1.5"
                                                    title="Girar imagen 90°"
                                                >
                                                    <RotateCw className="w-3.5 h-3.5" />
                                                    <span>Girar 90°</span>
                                                </Button>

                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => { setZoomLevel(1); setRotation(0); }}
                                                    className="h-7 px-2 text-[11px] text-slate-400 hover:text-white hover:bg-slate-800"
                                                    title="Restablecer vista"
                                                >
                                                    Reset
                                                </Button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Área Visual Principal (Ocupa todo el alto y ancho disponible) */}
                                    <div className="flex-1 p-6 flex items-center justify-center overflow-auto bg-slate-900/95 select-none min-h-[480px]">
                                        {currentDocConfig?.cargado ? (
                                            <div className="flex items-center justify-center w-full h-full">
                                                <img
                                                    key={`${selected.id}-${activeDoc}-${zoomLevel}-${rotation}`}
                                                    src={`/admin/clu/${selected.id}/documento/${activeDoc}`}
                                                    alt={currentDocConfig.label}
                                                    style={{
                                                        transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
                                                        transition: 'transform 0.15s ease-out',
                                                    }}
                                                    className="max-h-[68vh] max-w-full object-contain rounded-lg shadow-xl"
                                                    onError={(e) => {
                                                        const target = e.currentTarget;
                                                        target.style.display = 'none';
                                                        const fallback = document.getElementById('pdf-embed-fallback');
                                                        if (fallback) fallback.style.display = 'block';
                                                    }}
                                                />
                                                <iframe
                                                    id="pdf-embed-fallback"
                                                    src={`/admin/clu/${selected.id}/documento/${activeDoc}`}
                                                    className="w-full h-[68vh] rounded-lg bg-white hidden"
                                                    title={currentDocConfig.label}
                                                />
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center py-20 text-center text-slate-400 space-y-3">
                                                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center">
                                                    <XCircle className="w-8 h-8 text-rose-500" />
                                                </div>
                                                <p className="font-semibold text-lg text-slate-200">
                                                    {currentDocConfig?.label} no fue adjuntado
                                                </p>
                                                <p className="text-xs text-slate-400 max-w-sm">
                                                    El aspirante no adjuntó este documento en su solicitud de adhesión digital.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
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
