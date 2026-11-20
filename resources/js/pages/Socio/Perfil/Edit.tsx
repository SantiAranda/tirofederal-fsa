import { Head, useForm, usePage } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    User, ShieldCheck, ShieldAlert, Lock, Upload, AlertTriangle, CheckCircle2, Save, AlertCircle, FileText, ExternalLink, XCircle, Clock,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Mi Panel', href: '/panel' },
    { title: 'Mi Perfil y CLU', href: '/perfil' },
];

interface Usuario {
    nombre: string | null;
    apellido: string | null;
    dni: string | null;
    fecha_nacimiento: string | null;
    email: string;
    username: string;
    telefono: string | null;
    domicilio: string | null;
}

interface Socio {
    numero_socio: string | null;
    estado: string | null;
    estado_label: string | null;
    fecha_alta: string | null;
    plan: string | null;
    posee_arma_propia: boolean;
    es_tirador_diario: boolean;
}

type TipoDocumento = 'dni_frente' | 'dni_dorso' | 'clu_frente' | 'clu_dorso';

interface Credencial {
    id: number;
    numero_clu: string | null;
    fecha_emision: string | null;
    fecha_vencimiento: string | null;
    estado: string | null;
    estado_label: string | null;
    vigente: boolean;
    observaciones: string | null;
    apto_psicofisico: boolean;
    certificado_idoneidad: boolean;
    documentos: Record<TipoDocumento, boolean>;
    alerta: { tipo: string; mensaje: string; dias_restantes?: number } | null;
}

interface PerfilProps {
    usuario: Usuario;
    socio: Socio | null;
    credencial: Credencial | null;
}

interface PageProps {
    flash: { success?: string | null; error?: string | null };
    [key: string]: unknown;
}

const DOCUMENTOS: { tipo: TipoDocumento; campo: string; label: string }[] = [
    { tipo: 'dni_frente', campo: 'foto_dni_frente', label: 'DNI — frente' },
    { tipo: 'dni_dorso', campo: 'foto_dni_dorso', label: 'DNI — dorso' },
    { tipo: 'clu_frente', campo: 'foto_clu_frente', label: 'CLU — frente' },
    { tipo: 'clu_dorso', campo: 'foto_clu_dorso', label: 'CLU — dorso' },
];

/** "2029-05-01" → "01/05/2029" */
function formatFecha(fecha: string | null) {
    if (!fecha) return '—';
    const [y, m, d] = fecha.slice(0, 10).split('-');
    return `${d}/${m}/${y}`;
}

function formatDni(dni: string | null) {
    if (!dni) return '—';
    return /^\d+$/.test(dni) ? Number(dni).toLocaleString('es-AR') : dni;
}

/** Estilos del recuadro de estado de la CLU según su situación. */
function estiloClu(credencial: Credencial | null) {
    if (!credencial || credencial.estado === 'sin_clu' || !credencial.numero_clu) {
        return { caja: 'border-amber-200 bg-amber-50/60', icono: 'bg-amber-500', badge: 'bg-amber-100 text-amber-800', Icono: ShieldAlert };
    }
    if (credencial.vigente) {
        return { caja: 'border-emerald-200 bg-emerald-50/50', icono: 'bg-emerald-600', badge: 'bg-emerald-100 text-emerald-800', Icono: ShieldCheck };
    }
    if (credencial.estado === 'pendiente') {
        return { caja: 'border-blue-200 bg-blue-50/50', icono: 'bg-blue-600', badge: 'bg-blue-100 text-blue-800', Icono: Clock };
    }
    return { caja: 'border-rose-200 bg-rose-50/50', icono: 'bg-rose-600', badge: 'bg-rose-100 text-rose-800', Icono: ShieldAlert };
}

function textoClu(credencial: Credencial | null): { titulo: string; detalle: string } {
    if (!credencial || !credencial.numero_clu) {
        return {
            titulo: 'Sin Credencial de Legítimo Usuario cargada',
            detalle: 'Hasta cargar y validar tu CLU, tus turnos requieren reservar con instructor. Podés cargarla abajo.',
        };
    }
    if (credencial.vigente) {
        return {
            titulo: `CLU ${credencial.numero_clu}`,
            detalle: `Tu credencial vence el ${formatFecha(credencial.fecha_vencimiento)}. Estás habilitado para reservar pedanas libres.`,
        };
    }
    if (credencial.estado === 'pendiente') {
        return { titulo: `CLU ${credencial.numero_clu}`, detalle: 'Tu documentación está siendo revisada por presidencia.' };
    }
    if (credencial.estado === 'rechazado') {
        return {
            titulo: `CLU ${credencial.numero_clu}`,
            detalle: `Tu documentación fue rechazada${credencial.observaciones ? `: ${credencial.observaciones}` : '.'} Corregila y volvé a enviarla.`,
        };
    }
    if (!credencial.fecha_vencimiento) {
        return { titulo: `CLU ${credencial.numero_clu}`, detalle: 'Falta cargar la fecha de vencimiento de tu credencial.' };
    }
    return { titulo: `CLU ${credencial.numero_clu}`, detalle: `Tu credencial venció el ${formatFecha(credencial.fecha_vencimiento)}. Cargá la renovación.` };
}

function ErrorCampo({ mensaje }: { mensaje?: string }) {
    return mensaje ? <p className="text-xs text-rose-600 mt-1">{mensaje}</p> : null;
}

export default function SocioPerfilEdit({ usuario, socio, credencial }: PerfilProps) {
    const { flash } = usePage<PageProps>().props;
    const [confirmarBaja, setConfirmarBaja] = useState(false);

    const datos = useForm({
        email: usuario.email ?? '',
        username: usuario.username ?? '',
        telefono: usuario.telefono ?? '',
        domicilio: usuario.domicilio ?? '',
    });

    const clu = useForm<{
        posee_arma_propia: boolean;
        numero_clu: string;
        fecha_emision: string;
        fecha_vencimiento: string;
        foto_dni_frente: File | null;
        foto_dni_dorso: File | null;
        foto_clu_frente: File | null;
        foto_clu_dorso: File | null;
    }>({
        posee_arma_propia: socio?.posee_arma_propia ?? false,
        numero_clu: credencial?.numero_clu ?? '',
        fecha_emision: credencial?.fecha_emision ?? '',
        fecha_vencimiento: credencial?.fecha_vencimiento ?? '',
        foto_dni_frente: null,
        foto_dni_dorso: null,
        foto_clu_frente: null,
        foto_clu_dorso: null,
    });

    const clave = useForm({ current_password: '', password: '', password_confirmation: '' });
    const baja = useForm({ password: '' });

    const estilo = estiloClu(credencial);
    const texto = textoClu(credencial);
    const nombreCompleto = [usuario.nombre, usuario.apellido].filter(Boolean).join(' ');

    function guardarDatos(e: React.FormEvent) {
        e.preventDefault();
        datos.patch('/perfil', { preserveScroll: true });
    }

    function guardarClu(e: React.FormEvent) {
        e.preventDefault();
        clu.transform((d) => ({
            ...d,
            posee_arma_propia: d.posee_arma_propia ? 1 : 0,
            numero_clu: d.numero_clu || null,
            fecha_emision: d.fecha_emision || null,
            fecha_vencimiento: d.fecha_vencimiento || null,
        }));
        clu.post('/perfil/clu', {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => clu.setData((d) => ({ ...d, foto_dni_frente: null, foto_dni_dorso: null, foto_clu_frente: null, foto_clu_dorso: null })),
        });
    }

    function guardarClave(e: React.FormEvent) {
        e.preventDefault();
        clave.put('/settings/password', {
            preserveScroll: true,
            onSuccess: () => clave.reset(),
            onError: () => clave.reset('current_password'),
        });
    }

    function darDeBaja(e: React.FormEvent) {
        e.preventDefault();
        baja.delete('/perfil', { preserveScroll: true, onError: () => baja.reset() });
    }

    return (
        <>
            <Head title="Mi Perfil y Credencial CLU - Tiro Federal Formosa" />
            <div className="flex flex-col gap-6 p-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Mi Perfil y Credenciales</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Datos de tu cuenta, seguridad y estado de tu credencial de Legítimo Usuario ANMaC
                    </p>
                </div>

                {flash?.success && (
                    <div className="flex items-center gap-2 text-sm text-emerald-800 bg-emerald-50 border border-emerald-200 p-3 rounded-lg font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> {flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div className="flex items-center gap-2 text-sm text-rose-800 bg-rose-50 border border-rose-200 p-3 rounded-lg font-medium">
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0" /> {flash.error}
                    </div>
                )}

                {/* Estado CLU */}
                <Card className={estilo.caja}>
                    <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full ${estilo.icono} text-white flex items-center justify-center shrink-0`}>
                                <estilo.Icono className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <h3 className="font-bold text-gray-900 text-sm">{texto.titulo}</h3>
                                    {credencial?.numero_clu && credencial.estado_label && (
                                        <Badge className={`${estilo.badge} border-none text-[10px]`}>
                                            {credencial.vigente ? 'Vigente' : credencial.estado_label}
                                        </Badge>
                                    )}
                                </div>
                                <p className="text-xs text-gray-600 mt-0.5">{texto.detalle}</p>
                            </div>
                        </div>
                        {credencial?.alerta && credencial.vigente && (
                            <span className="text-xs font-semibold text-amber-700 bg-white px-3 py-1.5 rounded-lg border border-amber-200 shadow-sm flex items-center gap-1.5">
                                <AlertTriangle className="w-3.5 h-3.5" /> {credencial.alerta.mensaje}
                            </span>
                        )}
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        {/* Datos personales */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-blue-600" />
                                    <CardTitle className="text-base font-bold text-gray-900">Datos Personales</CardTitle>
                                </div>
                                <CardDescription className="text-xs text-gray-500">
                                    Tus datos de contacto y de acceso. Los datos de identidad los modifica secretaría.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={guardarDatos} className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="perfilUsuario">Nombre de usuario</Label>
                                            <Input id="perfilUsuario" value={datos.data.username} onChange={(e) => datos.setData('username', e.target.value)} className="mt-1" autoComplete="username" />
                                            <ErrorCampo mensaje={datos.errors.username} />
                                        </div>
                                        <div>
                                            <Label htmlFor="perfilEmail">Correo electrónico</Label>
                                            <Input id="perfilEmail" type="email" value={datos.data.email} onChange={(e) => datos.setData('email', e.target.value)} className="mt-1" autoComplete="email" />
                                            <ErrorCampo mensaje={datos.errors.email} />
                                        </div>
                                        <div>
                                            <Label htmlFor="perfilTelefono">Teléfono</Label>
                                            <Input id="perfilTelefono" type="tel" value={datos.data.telefono} onChange={(e) => datos.setData('telefono', e.target.value)} className="mt-1" autoComplete="tel" />
                                            <ErrorCampo mensaje={datos.errors.telefono} />
                                        </div>
                                        <div>
                                            <Label htmlFor="perfilDomicilio">Domicilio</Label>
                                            <Input id="perfilDomicilio" value={datos.data.domicilio} onChange={(e) => datos.setData('domicilio', e.target.value)} className="mt-1" autoComplete="street-address" />
                                            <ErrorCampo mensaje={datos.errors.domicilio} />
                                        </div>
                                    </div>

                                    {/* Datos del legajo (solo lectura) */}
                                    <div className="pt-3 border-t border-gray-100">
                                        <div className="text-xs font-semibold text-gray-500 mb-2">Datos oficiales del legajo (solo lectura)</div>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-gray-50 p-3 rounded-lg border border-gray-200">
                                            <div className="col-span-2 sm:col-span-3">
                                                <span className="text-gray-400 block">Nombre y apellido</span>
                                                <span className="font-semibold text-gray-800 capitalize">{nombreCompleto || '—'}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-400 block">DNI</span>
                                                <span className="font-semibold text-gray-800">{formatDni(usuario.dni)}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-400 block">Fecha de nacimiento</span>
                                                <span className="font-semibold text-gray-800">{formatFecha(usuario.fecha_nacimiento)}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-400 block">N.º de socio</span>
                                                <span className="font-semibold text-gray-800">{socio?.numero_socio ?? '—'}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-400 block">Plan</span>
                                                <span className="font-semibold text-blue-600">{socio?.plan ?? 'Sin plan asignado'}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-400 block">Estado</span>
                                                <span className="font-semibold text-gray-800">{socio?.estado_label ?? '—'}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-400 block">Socio desde</span>
                                                <span className="font-semibold text-gray-800">{formatFecha(socio?.fecha_alta ?? null)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-2">
                                        <Button type="submit" disabled={datos.processing || !datos.isDirty} className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                                            <Save className="w-4 h-4" /> {datos.processing ? 'Guardando…' : 'Guardar cambios'}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>

                        {/* Documentación CLU */}
                        {socio && (
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck className="w-4 h-4 text-blue-600" />
                                        <CardTitle className="text-base font-bold text-gray-900">Credencial CLU y tenencia</CardTitle>
                                    </div>
                                    <CardDescription className="text-xs text-gray-500">
                                        Si cambiás los datos de la credencial o subís nuevas imágenes, la documentación vuelve a quedar pendiente de validación por presidencia.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={guardarClu} className="space-y-4">
                                        <label className="flex items-center gap-2 text-sm text-gray-700">
                                            <input
                                                type="checkbox"
                                                checked={clu.data.posee_arma_propia}
                                                onChange={(e) => clu.setData('posee_arma_propia', e.target.checked)}
                                                className="h-4 w-4 rounded border-gray-300"
                                            />
                                            Poseo arma propia registrada
                                        </label>

                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            <div>
                                                <Label htmlFor="cluNumero">N.º de CLU</Label>
                                                <Input id="cluNumero" value={clu.data.numero_clu} onChange={(e) => clu.setData('numero_clu', e.target.value)} placeholder="Ej.: CLU-1234567" className="mt-1" />
                                                <ErrorCampo mensaje={clu.errors.numero_clu} />
                                            </div>
                                            <div>
                                                <Label htmlFor="cluEmision">Fecha de emisión</Label>
                                                <Input id="cluEmision" type="date" value={clu.data.fecha_emision} onChange={(e) => clu.setData('fecha_emision', e.target.value)} className="mt-1" />
                                                <ErrorCampo mensaje={clu.errors.fecha_emision} />
                                            </div>
                                            <div>
                                                <Label htmlFor="cluVencimiento">Fecha de vencimiento</Label>
                                                <Input id="cluVencimiento" type="date" value={clu.data.fecha_vencimiento} onChange={(e) => clu.setData('fecha_vencimiento', e.target.value)} className="mt-1" />
                                                <ErrorCampo mensaje={clu.errors.fecha_vencimiento} />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {DOCUMENTOS.map((doc) => {
                                                const campo = doc.campo as 'foto_dni_frente' | 'foto_dni_dorso' | 'foto_clu_frente' | 'foto_clu_dorso';
                                                const archivo = clu.data[campo];
                                                return (
                                                    <div key={doc.tipo}>
                                                        <Label htmlFor={`doc-${doc.tipo}`}>{doc.label}</Label>
                                                        <label
                                                            htmlFor={`doc-${doc.tipo}`}
                                                            className="mt-1 flex items-center gap-2 rounded-md border border-dashed border-gray-300 px-3 py-2 text-xs text-gray-600 cursor-pointer hover:border-blue-400 hover:bg-blue-50/40"
                                                        >
                                                            <Upload className="w-3.5 h-3.5 shrink-0" />
                                                            <span className="truncate">
                                                                {archivo ? archivo.name : credencial?.documentos[doc.tipo] ? 'Reemplazar imagen cargada' : 'Subir imagen'}
                                                            </span>
                                                        </label>
                                                        <input
                                                            id={`doc-${doc.tipo}`}
                                                            type="file"
                                                            accept="image/*"
                                                            className="sr-only"
                                                            onChange={(e) => clu.setData(campo, e.target.files?.[0] ?? null)}
                                                        />
                                                        <ErrorCampo mensaje={clu.errors[campo]} />
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        <div className="flex justify-end pt-2 border-t border-gray-100">
                                            <Button type="submit" disabled={clu.processing || !clu.isDirty} className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                                                <Upload className="w-4 h-4" /> {clu.processing ? 'Enviando…' : 'Guardar documentación'}
                                            </Button>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        )}

                        {/* Contraseña */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Lock className="w-4 h-4 text-blue-600" />
                                    <CardTitle className="text-base font-bold text-gray-900">Seguridad y Contraseña</CardTitle>
                                </div>
                                <CardDescription className="text-xs text-gray-500">
                                    Mínimo 8 caracteres, con letras, números y algún símbolo, sin espacios
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={guardarClave} className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div>
                                            <Label htmlFor="pwdActual">Contraseña actual</Label>
                                            <Input id="pwdActual" type="password" autoComplete="current-password" value={clave.data.current_password} onChange={(e) => clave.setData('current_password', e.target.value)} className="mt-1" />
                                            <ErrorCampo mensaje={clave.errors.current_password} />
                                        </div>
                                        <div>
                                            <Label htmlFor="pwdNueva">Nueva contraseña</Label>
                                            <Input id="pwdNueva" type="password" autoComplete="new-password" value={clave.data.password} onChange={(e) => clave.setData('password', e.target.value)} className="mt-1" />
                                            <ErrorCampo mensaje={clave.errors.password} />
                                        </div>
                                        <div>
                                            <Label htmlFor="pwdRep">Confirmar nueva</Label>
                                            <Input id="pwdRep" type="password" autoComplete="new-password" value={clave.data.password_confirmation} onChange={(e) => clave.setData('password_confirmation', e.target.value)} className="mt-1" />
                                        </div>
                                    </div>
                                    {clave.recentlySuccessful && (
                                        <p className="text-xs text-emerald-700 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Contraseña actualizada.</p>
                                    )}
                                    <div className="flex justify-end">
                                        <Button type="submit" variant="outline" className="text-xs" disabled={clave.processing || !clave.data.current_password || !clave.data.password}>
                                            {clave.processing ? 'Actualizando…' : 'Actualizar contraseña'}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Columna derecha */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm font-bold text-gray-900">Documentación Presentada</CardTitle>
                                <CardDescription className="text-xs text-gray-500">
                                    Copia digital de tus credenciales en tu legajo
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3 text-xs">
                                {!credencial ? (
                                    <p className="text-gray-500">Todavía no cargaste documentación.</p>
                                ) : (
                                    <>
                                        {DOCUMENTOS.map((doc) => (
                                            <div key={doc.tipo} className="p-3 border rounded-lg bg-gray-50/50 flex items-center justify-between gap-2">
                                                <div className="flex items-center gap-2 min-w-0">
                                                    <FileText className="w-4 h-4 text-gray-400 shrink-0" />
                                                    <div className="min-w-0">
                                                        <div className="font-semibold text-gray-800">{doc.label}</div>
                                                        <div className={`text-[11px] font-medium ${credencial.documentos[doc.tipo] ? 'text-emerald-600' : 'text-gray-400'}`}>
                                                            {credencial.documentos[doc.tipo] ? 'Cargado ✓' : 'Sin cargar'}
                                                        </div>
                                                    </div>
                                                </div>
                                                {credencial.documentos[doc.tipo] && (
                                                    <a
                                                        href={`/legajo/${credencial.id}/documento/${doc.tipo}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 text-blue-600 hover:underline shrink-0"
                                                    >
                                                        Ver <ExternalLink className="w-3 h-3" />
                                                    </a>
                                                )}
                                            </div>
                                        ))}
                                        <div className="p-3 border rounded-lg bg-gray-50/50">
                                            <div className="font-semibold text-gray-800">Apto psicofísico</div>
                                            <div className={`text-[11px] font-medium ${credencial.apto_psicofisico ? 'text-emerald-600' : 'text-gray-400'}`}>
                                                {credencial.apto_psicofisico ? 'Incorporado al legajo ✓' : 'Pendiente (lo registra secretaría)'}
                                            </div>
                                        </div>
                                        <div className="p-3 border rounded-lg bg-gray-50/50">
                                            <div className="font-semibold text-gray-800">Certificado de idoneidad</div>
                                            <div className={`text-[11px] font-medium ${credencial.certificado_idoneidad ? 'text-emerald-600' : 'text-gray-400'}`}>
                                                {credencial.certificado_idoneidad ? 'Incorporado al legajo ✓' : 'Pendiente (lo registra secretaría)'}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </Card>

                        {/* Baja de cuenta */}
                        <Card className="border-rose-200 bg-rose-50/20">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-xs font-bold text-rose-700 uppercase tracking-wider flex items-center gap-1.5">
                                    <AlertCircle className="w-4 h-4 text-rose-600" /> Baja Voluntaria de Cuenta
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <p className="text-[11px] text-gray-600">
                                    Da de baja tu usuario y tu legajo de socio. Esta acción no se puede deshacer desde el sistema.
                                </p>
                                {!confirmarBaja ? (
                                    <Button size="sm" variant="outline" onClick={() => setConfirmarBaja(true)} className="text-xs text-rose-600 border-rose-200 hover:bg-rose-50 w-full">
                                        Solicitar baja de socio
                                    </Button>
                                ) : (
                                    <form onSubmit={darDeBaja} className="space-y-2">
                                        <Label htmlFor="bajaPassword" className="text-xs">Confirmá con tu contraseña</Label>
                                        <Input id="bajaPassword" type="password" autoComplete="current-password" value={baja.data.password} onChange={(e) => baja.setData('password', e.target.value)} />
                                        <ErrorCampo mensaje={baja.errors.password} />
                                        <div className="flex gap-2">
                                            <Button type="submit" size="sm" variant="destructive" className="text-xs flex-1" disabled={baja.processing || !baja.data.password}>
                                                Confirmar baja
                                            </Button>
                                            <Button type="button" size="sm" variant="ghost" className="text-xs" onClick={() => { setConfirmarBaja(false); baja.reset(); baja.clearErrors(); }}>
                                                Cancelar
                                            </Button>
                                        </div>
                                    </form>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}

SocioPerfilEdit.layout = {
    breadcrumbs,
};
