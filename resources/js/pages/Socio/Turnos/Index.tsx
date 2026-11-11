import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import {
    Calendar, Clock, Target, User, AlertTriangle, CheckCircle2,
    XCircle, ChevronDown, ChevronUp, Trash2, Plus, Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Mi Panel', href: '/panel' },
    { title: 'Mis Turnos', href: '/panel/turnos' },
];

const TIME_SLOTS = [
    { label: '08:00', full: false },
    { label: '09:30', full: false },
    { label: '11:00', full: true },
    { label: '14:00', full: false },
    { label: '15:30', full: true },
    { label: '17:00', full: false },
];

const LINES = [
    { label: 'Línea 1', full: false },
    { label: 'Línea 2', full: false },
    { label: 'Línea 3', full: true },
    { label: 'Línea 4', full: false },
    { label: 'Línea 5', full: false },
    { label: 'Línea 6', full: true },
    { label: 'Línea 7', full: false },
    { label: 'Línea 8', full: false },
    { label: 'Línea 9', full: false },
];

const INSTRUCTORS = [
    { id: 0, nombre: 'Sin instructor asignado' },
    { id: 1, nombre: 'Prof. Roberto Almada' },
    { id: 2, nombre: 'Prof. Graciela Juárez' },
    { id: 3, nombre: 'Prof. Marcos Villafañe' },
];

const PROXIMOS_TURNOS = [
    {
        id: 1,
        fecha: '2026-11-14',
        hora: '09:30',
        linea: 'Línea 2',
        instructor: 'Prof. Roberto Almada',
        estado: 'Confirmado',
        puedeCancel: true,
    },
    {
        id: 2,
        fecha: '2026-11-18',
        hora: '14:00',
        linea: 'Línea 4',
        instructor: 'Sin instructor',
        estado: 'Pendiente',
        puedeCancel: true,
    },
];

const HISTORIAL = [
    { id: 10, fecha: '2026-11-01', hora: '08:00', linea: 'Línea 1', instructor: 'Prof. Graciela Juárez', estado: 'Realizado' },
    { id: 9, fecha: '2026-10-28', hora: '17:00', linea: 'Línea 5', instructor: 'Sin instructor', estado: 'Realizado' },
    { id: 8, fecha: '2026-10-22', hora: '11:00', linea: 'Línea 2', instructor: 'Prof. Roberto Almada', estado: 'Realizado' },
    { id: 7, fecha: '2026-10-15', hora: '14:00', linea: 'Línea 7', instructor: 'Sin instructor', estado: 'Cancelado' },
    { id: 6, fecha: '2026-10-10', hora: '09:30', linea: 'Línea 3', instructor: 'Prof. Marcos Villafañe', estado: 'Realizado' },
];

const today = new Date().toISOString().split('T')[0];

// Mock: set to true to show deuda warning
const tieneDeuda = false;

function formatFecha(fecha: string) {
    const [y, m, d] = fecha.split('-');
    return `${d}/${m}/${y}`;
}

function estadoBadge(estado: string) {
    if (estado === 'Confirmado') return <Badge className="bg-green-100 text-green-700 border-0">Confirmado</Badge>;
    if (estado === 'Pendiente') return <Badge className="bg-yellow-100 text-yellow-700 border-0">Pendiente</Badge>;
    if (estado === 'Cancelado') return <Badge className="bg-red-100 text-red-700 border-0">Cancelado</Badge>;
    if (estado === 'Realizado') return <Badge className="bg-blue-100 text-blue-700 border-0">Realizado</Badge>;
    return <Badge>{estado}</Badge>;
}

export default function MisTurnos() {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedSlot, setSelectedSlot] = useState('');
    const [selectedLine, setSelectedLine] = useState('');
    const [selectedInstructor, setSelectedInstructor] = useState('0');
    const [historialOpen, setHistorialOpen] = useState(false);
    const [confirmado, setConfirmado] = useState(false);
    const [proximos, setProximos] = useState(PROXIMOS_TURNOS);
    const [cancelDialog, setCancelDialog] = useState<number | null>(null);

    const handleReserva = () => {
        if (!selectedDate || !selectedSlot || !selectedLine) return;
        setConfirmado(true);
        setTimeout(() => setConfirmado(false), 3000);
        setSelectedDate('');
        setSelectedSlot('');
        setSelectedLine('');
        setSelectedInstructor('0');
    };

    const handleCancelar = (id: number) => {
        setProximos(prev => prev.filter(t => t.id !== id));
        setCancelDialog(null);
    };

    return (
        <>
            <Head title="Mis Turnos" />
            <div className="flex flex-col gap-6 p-6">

                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <Calendar className="w-6 h-6 text-blue-600" />
                        Mis Turnos
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Reservá tu lugar en el polígono</p>
                </div>

                {/* Alerta deuda */}
                {tieneDeuda && (
                    <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                        <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 shrink-0" />
                        <p className="text-sm text-yellow-800">
                            <strong>Tu membresía tiene pagos pendientes.</strong> No podés reservar turnos hasta regularizar tu situación.{' '}
                            <Link href="/panel/pagos" className="underline font-medium">Ver mis pagos</Link>
                        </p>
                    </div>
                )}

                {/* Confirmación */}
                {confirmado && (
                    <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-4">
                        <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                        <p className="text-sm text-green-800 font-medium">¡Turno reservado exitosamente!</p>
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
                        <label className="text-sm font-medium text-gray-700">Fecha *</label>
                        <input
                            type="date"
                            min={today}
                            value={selectedDate}
                            onChange={e => setSelectedDate(e.target.value)}
                            disabled={tieneDeuda}
                            className="w-full sm:w-56 h-10 px-3 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                    </div>

                    {/* Horario */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Horario disponible *</label>
                        <div className="flex flex-wrap gap-2">
                            {TIME_SLOTS.map(slot => (
                                <button
                                    key={slot.label}
                                    disabled={slot.full || tieneDeuda}
                                    onClick={() => setSelectedSlot(slot.label)}
                                    className={[
                                        'px-4 py-2 rounded-lg text-sm font-medium border transition-all',
                                        slot.full
                                            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through'
                                            : selectedSlot === slot.label
                                                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                                                : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:bg-blue-50',
                                    ].join(' ')}
                                >
                                    <Clock className="w-3.5 h-3.5 inline mr-1.5" />
                                    {slot.label}
                                    {slot.full && <span className="ml-1 text-xs">(lleno)</span>}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Línea de tiro */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Línea de tiro *</label>
                        <div className="flex flex-wrap gap-2">
                            {LINES.map(line => (
                                <button
                                    key={line.label}
                                    disabled={line.full || tieneDeuda}
                                    onClick={() => setSelectedLine(line.label)}
                                    className={[
                                        'px-3 py-2 rounded-lg text-sm font-medium border transition-all',
                                        line.full
                                            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                                            : selectedLine === line.label
                                                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                                                : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:bg-blue-50',
                                    ].join(' ')}
                                >
                                    <Target className="w-3.5 h-3.5 inline mr-1.5" />
                                    {line.label}
                                    {line.full && <span className="ml-1 text-xs">(llena)</span>}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Instructor */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Instructor (opcional)</label>
                        <select
                            value={selectedInstructor}
                            onChange={e => setSelectedInstructor(e.target.value)}
                            disabled={tieneDeuda}
                            className="w-full sm:w-72 h-10 px-3 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                        >
                            {INSTRUCTORS.map(i => (
                                <option key={i.id} value={i.id}>{i.nombre}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                        <Button
                            onClick={handleReserva}
                            disabled={!selectedDate || !selectedSlot || !selectedLine || tieneDeuda}
                            className="bg-blue-600 text-white hover:bg-blue-700 gap-2 px-6"
                        >
                            <CheckCircle2 className="w-4 h-4" />
                            Confirmar reserva
                        </Button>
                        {(!selectedDate || !selectedSlot || !selectedLine) && (
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                                <Info className="w-3.5 h-3.5" />
                                Seleccioná fecha, horario y línea para continuar
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
                            {proximos.map(t => (
                                <div key={t.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col gap-3">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="font-semibold text-gray-900 text-base">
                                                {formatFecha(t.fecha)} — {t.hora}
                                            </p>
                                            <p className="text-sm text-gray-500 mt-0.5 flex items-center gap-1.5">
                                                <Target className="w-3.5 h-3.5" /> {t.linea}
                                            </p>
                                            <p className="text-sm text-gray-500 flex items-center gap-1.5">
                                                <User className="w-3.5 h-3.5" /> {t.instructor}
                                            </p>
                                        </div>
                                        {estadoBadge(t.estado)}
                                    </div>
                                    {t.puedeCancel && (
                                        <div className="pt-2 border-t border-gray-100">
                                            {cancelDialog === t.id ? (
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs text-gray-600">¿Confirmás la cancelación?</span>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        className="h-7 text-xs"
                                                        onClick={() => handleCancelar(t.id)}
                                                    >
                                                        Sí, cancelar
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="h-7 text-xs"
                                                        onClick={() => setCancelDialog(null)}
                                                    >
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
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Historial */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <button
                        onClick={() => setHistorialOpen(o => !o)}
                        className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
                    >
                        <h2 className="text-base font-semibold text-gray-800">Historial (últimos 30 días)</h2>
                        {historialOpen ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                    </button>

                    {historialOpen && (
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
                                    {HISTORIAL.map(h => (
                                        <tr key={h.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 text-gray-700">{formatFecha(h.fecha)}</td>
                                            <td className="px-4 py-3 text-gray-700">{h.hora}</td>
                                            <td className="px-4 py-3 text-gray-700">{h.linea}</td>
                                            <td className="px-4 py-3 text-gray-500">{h.instructor}</td>
                                            <td className="px-4 py-3">{estadoBadge(h.estado)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}


MisTurnos.layout = {
    breadcrumbs,
};
