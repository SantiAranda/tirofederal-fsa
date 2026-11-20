import { useMemo, useState } from 'react';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import {
    Calendar, CalendarDays, Clock, Target, User, AlertTriangle, CheckCircle2,
    ChevronDown, ChevronUp, Trash2, Plus, Info, XCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Mi Panel', href: '/panel' },
    { title: 'Mis Turnos', href: '/turnos' },
];

interface Linea {
    id: number;
    nombre: string | null;
    numero_linea: number;
}

interface Instructor {
    id: number;
    nombre: string;
}

interface Bloque {
    hora_inicio: string;
    hora_fin: string;
    pasado: boolean;
    lineas_ocupadas: number[];
    instructores_ocupados: number[];
}

interface Turno {
    id: number;
    fecha: string;
    hora_inicio: string;
    hora_fin: string;
    estado: string;
    monto_arancel: string | number;
    linea_de_tiro?: Linea | null;
    instructor_profile?: { user?: { nombre?: string; apellido?: string } | null } | null;
}

interface Condiciones {
    en_mora: boolean;
    requiere: boolean;
    motivo: string | null;
    arancel: number;
}

interface TurnosProps {
    fechaSeleccionada: string;
    hoy: string;
    lineas: Linea[];
    instructores: Instructor[];
    grilla: Bloque[];
    condiciones: Condiciones | null;
    proximos: Turno[];
    historial: Turno[];
}

interface PageProps {
    flash: { success?: string | null; error?: string | null };
    [key: string]: unknown;
}

/** Laravel serializa las fechas "date" como ISO; nos quedamos con YYYY-MM-DD. */
function soloFecha(fecha: string) {
    return fecha.slice(0, 10);
}

function formatFecha(fecha: string) {
    const [y, m, d] = soloFecha(fecha).split('-');
    return `${d}/${m}/${y}`;
}

function formatFechaLarga(fecha: string) {
    const [y, m, d] = soloFecha(fecha).split('-').map(Number);
    return new Date(y, m - 1, d).toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' });
}

const hhmm = (hora: string) => hora.slice(0, 5);

function nombreLinea(linea?: Linea | null) {
    if (!linea) return 'Línea';
    return linea.nombre || `Línea ${linea.numero_linea}`;
}

function nombreInstructor(t: Turno) {
    const u = t.instructor_profile?.user;
    return u ? `${u.nombre ?? ''} ${u.apellido ?? ''}`.trim() : 'Sin instructor';
}

function formatPesos(valor: number) {
    return valor.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 });
}

function estadoBadge(turno: Turno, pasado = false) {
    const estado = turno.estado;
    if (estado === 'confirmado') return <Badge className="bg-green-100 text-green-700 border-0">Confirmado</Badge>;
    if (estado === 'reservado' && pasado) return <Badge className="bg-gray-100 text-gray-600 border-0">Finalizado</Badge>;
    if (estado === 'reservado') return <Badge className="bg-yellow-100 text-yellow-700 border-0">Reservado</Badge>;
    if (estado === 'cancelado') return <Badge className="bg-red-100 text-red-700 border-0">Cancelado</Badge>;
    if (estado === 'asistido') return <Badge className="bg-blue-100 text-blue-700 border-0">Asistido</Badge>;
    return <Badge>{estado}</Badge>;
}

export default function MisTurnos({
    fechaSeleccionada, hoy, lineas = [], instructores = [], grilla = [], condiciones, proximos = [], historial = [],
}: TurnosProps) {
    const { flash } = usePage<PageProps>().props;
    const [historialOpen, setHistorialOpen] = useState(false);
    const [cancelDialog, setCancelDialog] = useState<number | null>(null);
    const [cargandoFecha, setCargandoFecha] = useState(false);

    const enMora = condiciones?.en_mora ?? false;
    const requiereInstructor = condiciones?.requiere ?? false;

    const form = useForm({
        fecha: fechaSeleccionada,
        hora_inicio: '',
        hora_fin: '',
        linea_de_tiro_id: '' as number | '',
        instructor_profile_id: '' as number | '',
    });

    const bloque = useMemo(
        () => grilla.find((b) => b.hora_inicio === form.data.hora_inicio) ?? null,
        [grilla, form.data.hora_inicio],
    );

    const lineasLibres = (b: Bloque) => lineas.filter((l) => !b.lineas_ocupadas.includes(l.id)).length;

    function cambiarFecha(fecha: string) {
        if (!fecha) return;
        form.setData({ ...form.data, fecha, hora_inicio: '', hora_fin: '', linea_de_tiro_id: '', instructor_profile_id: '' });
        form.clearErrors();
        setCargandoFecha(true);
        router.get('/turnos', { fecha }, {
            only: ['fechaSeleccionada', 'grilla'],
            preserveState: true,
            preserveScroll: true,
            replace: true,
            onFinish: () => setCargandoFecha(false),
        });
    }

    function elegirBloque(b: Bloque) {
        form.setData({
            ...form.data,
            hora_inicio: b.hora_inicio,
            hora_fin: b.hora_fin,
            // Si la línea o el instructor elegidos están ocupados en el nuevo bloque, se limpian.
            linea_de_tiro_id: form.data.linea_de_tiro_id && b.lineas_ocupadas.includes(form.data.linea_de_tiro_id) ? '' : form.data.linea_de_tiro_id,
            instructor_profile_id: form.data.instructor_profile_id && b.instructores_ocupados.includes(form.data.instructor_profile_id) ? '' : form.data.instructor_profile_id,
        });
    }

    const faltaInstructor = requiereInstructor && !form.data.instructor_profile_id;
    const puedeReservar = !enMora && !!form.data.hora_inicio && !!form.data.linea_de_tiro_id && !faltaInstructor && !form.processing;

    function reservar() {
        if (!puedeReservar) return;
        form.transform((data) => ({
            ...data,
            instructor_profile_id: data.instructor_profile_id || null,
        }));
        form.post('/turnos', {
            preserveScroll: true,
            onSuccess: () => {
                form.setData({ ...form.data, hora_inicio: '', hora_fin: '', linea_de_tiro_id: '', instructor_profile_id: '' });
            },
        });
    }

    function cancelar(id: number) {
        router.patch(`/turnos/${id}/cancelar`, {}, {
            preserveScroll: true,
            onFinish: () => setCancelDialog(null),
        });
    }

    const erroresGenerales = Object.entries(form.errors) as [string, string][];

    return (
        <>
            <Head title="Mis Turnos" />
            <div className="flex flex-col gap-6 p-6">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <Calendar className="w-6 h-6 text-blue-600" />
                            Mis Turnos
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">Reservá tu lugar en el polígono</p>
                    </div>
                    <Button asChild variant="outline" className="gap-2 w-full sm:w-auto">
                        <Link href="/socio/calendario">
                            <CalendarDays className="w-4 h-4 text-blue-600" /> Ver en Mi Calendario
                        </Link>
                    </Button>
                </div>

                {/* Alerta deuda */}
                {enMora && (
                    <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                        <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 shrink-0" />
                        <p className="text-sm text-yellow-800">
                            <strong>Tu membresía tiene pagos pendientes.</strong> No podés reservar turnos hasta regularizar tu situación.{' '}
                            <Link href="/pagos" className="underline font-medium">Ver mis pagos</Link>
                        </p>
                    </div>
                )}

                {/* Mensajes del servidor */}
                {flash?.success && (
                    <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-4">
                        <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                        <p className="text-sm text-green-800 font-medium">{flash.success}</p>
                    </div>
                )}
                {(flash?.error || erroresGenerales.length > 0) && (
                    <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
                        <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                        <div className="text-sm text-red-800 space-y-1">
                            {flash?.error && <p>{flash.error}</p>}
                            {erroresGenerales.map(([campo, mensaje]) => <p key={campo}>{mensaje}</p>)}
                        </div>
                    </div>
                )}

                {/* Formulario de reserva */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-6">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                        <Plus className="w-5 h-5 text-blue-600" />
                        Reservar nuevo turno
                    </h2>

                    {/* Fecha */}
                    <div className="space-y-2">
                        <label htmlFor="fecha-turno" className="text-sm font-medium text-gray-700">Fecha *</label>
                        <div className="flex flex-wrap items-center gap-3">
                            <input
                                id="fecha-turno"
                                type="date"
                                min={hoy}
                                value={form.data.fecha}
                                onChange={(e) => cambiarFecha(e.target.value)}
                                disabled={enMora}
                                className="w-full sm:w-56 h-10 px-3 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                            <span className="text-sm text-gray-500 capitalize">{formatFechaLarga(form.data.fecha)}</span>
                        </div>
                    </div>

                    {/* Horario */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Horario disponible *</label>
                        <div className={`flex flex-wrap gap-2 ${cargandoFecha ? 'opacity-50 pointer-events-none' : ''}`}>
                            {grilla.map((b) => {
                                const lleno = lineasLibres(b) === 0;
                                const deshabilitado = b.pasado || lleno || enMora;
                                return (
                                    <button
                                        key={b.hora_inicio}
                                        type="button"
                                        disabled={deshabilitado}
                                        onClick={() => elegirBloque(b)}
                                        className={[
                                            'px-4 py-2 rounded-lg text-sm font-medium border transition-all',
                                            deshabilitado
                                                ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                                                : form.data.hora_inicio === b.hora_inicio
                                                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                                                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:bg-blue-50',
                                        ].join(' ')}
                                    >
                                        <Clock className="w-3.5 h-3.5 inline mr-1.5" />
                                        {b.hora_inicio} – {b.hora_fin}
                                        {b.pasado && <span className="ml-1 text-xs">(pasado)</span>}
                                        {!b.pasado && lleno && <span className="ml-1 text-xs">(lleno)</span>}
                                    </button>
                                );
                            })}
                        </div>
                        {grilla.length > 0 && grilla.every((b) => b.pasado) && (
                            <p className="text-xs text-gray-500">Ya no quedan horarios para hoy. Elegí otra fecha.</p>
                        )}
                    </div>

                    {/* Línea de tiro */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Línea de tiro *</label>
                        {!bloque ? (
                            <p className="text-xs text-gray-400">Elegí primero un horario para ver las líneas libres.</p>
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {lineas.map((linea) => {
                                    const ocupada = bloque.lineas_ocupadas.includes(linea.id);
                                    return (
                                        <button
                                            key={linea.id}
                                            type="button"
                                            disabled={ocupada || enMora}
                                            onClick={() => form.setData('linea_de_tiro_id', linea.id)}
                                            className={[
                                                'px-3 py-2 rounded-lg text-sm font-medium border transition-all',
                                                ocupada
                                                    ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                                                    : form.data.linea_de_tiro_id === linea.id
                                                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                                                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:bg-blue-50',
                                            ].join(' ')}
                                        >
                                            <Target className="w-3.5 h-3.5 inline mr-1.5" />
                                            {nombreLinea(linea)}
                                            {ocupada && <span className="ml-1 text-xs">(ocupada)</span>}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Instructor */}
                    <div className="space-y-2">
                        <label htmlFor="instructor-turno" className="text-sm font-medium text-gray-700">
                            Instructor {requiereInstructor ? '*' : '(opcional)'}
                        </label>
                        {requiereInstructor && condiciones?.motivo && (
                            <p className="text-xs text-amber-700 flex items-start gap-1.5">
                                <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                                <span>
                                    {condiciones.motivo} Necesitás reservar con un instructor
                                    {condiciones.arancel > 0 && <> (arancel de práctica: {formatPesos(condiciones.arancel)})</>}.
                                </span>
                            </p>
                        )}
                        <select
                            id="instructor-turno"
                            value={form.data.instructor_profile_id}
                            onChange={(e) => form.setData('instructor_profile_id', e.target.value ? Number(e.target.value) : '')}
                            disabled={enMora}
                            className="w-full sm:w-72 h-10 px-3 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                        >
                            <option value="">{requiereInstructor ? 'Seleccioná un instructor' : 'Sin instructor asignado'}</option>
                            {instructores.map((i) => {
                                const ocupado = !!bloque?.instructores_ocupados.includes(i.id);
                                return (
                                    <option key={i.id} value={i.id} disabled={ocupado}>
                                        {i.nombre}{ocupado ? ' (ocupado en este horario)' : ''}
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-gray-100">
                        <Button
                            type="button"
                            onClick={reservar}
                            disabled={!puedeReservar}
                            className="bg-blue-600 text-white hover:bg-blue-700 gap-2 px-6"
                        >
                            <CheckCircle2 className="w-4 h-4" />
                            {form.processing ? 'Reservando…' : 'Confirmar reserva'}
                        </Button>
                        {!puedeReservar && !form.processing && !enMora && (
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                                <Info className="w-3.5 h-3.5" />
                                {faltaInstructor && form.data.linea_de_tiro_id
                                    ? 'Seleccioná un instructor para continuar'
                                    : 'Seleccioná fecha, horario y línea para continuar'}
                            </span>
                        )}
                    </div>
                </div>

                {/* Próximos turnos */}
                <div className="space-y-3">
                    <h2 className="text-xl font-semibold text-gray-800">Próximos turnos</h2>
                    {proximos.length === 0 ? (
                        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
                            <Calendar className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">No tenés turnos próximos. ¡Reservá uno arriba!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {proximos.map((t) => (
                                <div key={t.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col gap-3">
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <p className="font-semibold text-gray-900 text-base">
                                                {formatFecha(t.fecha)} — {hhmm(t.hora_inicio)} a {hhmm(t.hora_fin)}
                                            </p>
                                            <p className="text-sm text-gray-500 mt-0.5 flex items-center gap-1.5">
                                                <Target className="w-3.5 h-3.5" /> {nombreLinea(t.linea_de_tiro)}
                                            </p>
                                            <p className="text-sm text-gray-500 flex items-center gap-1.5">
                                                <User className="w-3.5 h-3.5" /> {nombreInstructor(t)}
                                            </p>
                                            {Number(t.monto_arancel) > 0 && (
                                                <p className="text-xs text-gray-500 mt-1">Arancel: {formatPesos(Number(t.monto_arancel))}</p>
                                            )}
                                        </div>
                                        {estadoBadge(t)}
                                    </div>
                                    <div className="pt-2 border-t border-gray-100">
                                        {cancelDialog === t.id ? (
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="text-xs text-gray-600">¿Confirmás la cancelación?</span>
                                                <Button size="sm" variant="destructive" className="h-7 text-xs" onClick={() => cancelar(t.id)}>
                                                    Sí, cancelar
                                                </Button>
                                                <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => setCancelDialog(null)}>
                                                    No
                                                </Button>
                                            </div>
                                        ) : (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 gap-1.5 h-8 text-xs"
                                                onClick={() => setCancelDialog(t.id)}
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                                Cancelar turno
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Historial */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <button
                        type="button"
                        onClick={() => setHistorialOpen((o) => !o)}
                        className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
                    >
                        <h2 className="text-base font-semibold text-gray-800">
                            Historial de turnos {historial.length > 0 && <span className="text-gray-400 font-normal">({historial.length})</span>}
                        </h2>
                        {historialOpen ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                    </button>

                    {historialOpen && (
                        historial.length === 0 ? (
                            <p className="border-t border-gray-100 p-5 text-sm text-gray-500">Todavía no tenés turnos anteriores.</p>
                        ) : (
                            <div className="overflow-x-auto border-t border-gray-100">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left font-medium text-gray-600">Fecha</th>
                                            <th className="px-4 py-3 text-left font-medium text-gray-600">Hora</th>
                                            <th className="px-4 py-3 text-left font-medium text-gray-600">Línea</th>
                                            <th className="px-4 py-3 text-left font-medium text-gray-600">Instructor</th>
                                            <th className="px-4 py-3 text-left font-medium text-gray-600">Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {historial.map((h) => (
                                            <tr key={h.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-3 text-gray-700">{formatFecha(h.fecha)}</td>
                                                <td className="px-4 py-3 text-gray-700">{hhmm(h.hora_inicio)}</td>
                                                <td className="px-4 py-3 text-gray-700">{nombreLinea(h.linea_de_tiro)}</td>
                                                <td className="px-4 py-3 text-gray-500">{nombreInstructor(h)}</td>
                                                <td className="px-4 py-3">{estadoBadge(h, true)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )
                    )}
                </div>
            </div>
        </>
    );
}

MisTurnos.layout = {
    breadcrumbs,
};
