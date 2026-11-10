import { Head } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import {
    CreditCard, CheckCircle2, XCircle, Download, Calendar,
    TrendingUp, AlertCircle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Mi Panel', href: '/panel' },
    { title: 'Mis Pagos', href: '/panel/pagos' },
];

type EstadoPago = 'Pagado' | 'Pendiente' | 'Vencido';

interface Pago {
    id: number;
    concepto: string;
    periodo: string;
    monto: number;
    metodo: string;
    fecha_pago: string | null;
    estado: EstadoPago;
}

const PAGOS: Pago[] = [
    { id: 108, concepto: 'Cuota Mensual', periodo: 'Nov 2026', monto: 15000, metodo: 'Transferencia', fecha_pago: '2026-11-02', estado: 'Pagado' },
    { id: 97, concepto: 'Cuota Mensual', periodo: 'Oct 2026', monto: 15000, metodo: 'Efectivo', fecha_pago: '2026-10-04', estado: 'Pagado' },
    { id: 86, concepto: 'Cuota Mensual', periodo: 'Sep 2026', monto: 14000, metodo: '', fecha_pago: null, estado: 'Vencido' },
    { id: 75, concepto: 'Cuota Mensual', periodo: 'Ago 2026', monto: 14000, metodo: '', fecha_pago: null, estado: 'Vencido' },
    { id: 64, concepto: 'Cuota Mensual', periodo: 'Jul 2026', monto: 12000, metodo: 'Transferencia', fecha_pago: '2026-07-01', estado: 'Pagado' },
    { id: 53, concepto: 'Cuota Mensual', periodo: 'Jun 2026', monto: 12000, metodo: 'Transferencia', fecha_pago: '2026-06-02', estado: 'Pagado' },
    { id: 42, concepto: 'Cuota Mensual', periodo: 'May 2026', monto: 10000, metodo: 'Efectivo', fecha_pago: '2026-05-03', estado: 'Pagado' },
    { id: 31, concepto: 'Inscripción', periodo: 'Ago 2026', monto: 5000, metodo: 'Efectivo', fecha_pago: '2026-08-14', estado: 'Pagado' },
];

// Computed stats
const totalPagado = PAGOS.filter(p => p.estado === 'Pagado').reduce((s, p) => s + p.monto, 0);
const tieneVencidas = PAGOS.some(p => p.estado === 'Vencido');
const proximoVencimiento = '01/12/2026';

function formatMonto(n: number) {
    return `$${n.toLocaleString('es-AR')}`;
}

function formatFecha(f: string | null) {
    if (!f) return '—';
    const [y, m, d] = f.split('-');
    return `${d}/${m}/${y}`;
}

function estadoBadge(estado: EstadoPago) {
    if (estado === 'Pagado') return <Badge className="bg-green-100 text-green-700 border-0">Pagado</Badge>;
    if (estado === 'Pendiente') return <Badge className="bg-yellow-100 text-yellow-700 border-0">Pendiente</Badge>;
    if (estado === 'Vencido') return <Badge className="bg-red-100 text-red-700 border-0">Vencido</Badge>;
}

export default function MisPagos() {
    return (
        <>
            <Head title="Mis Pagos y Recibos" />
            <div className="flex flex-col gap-6 p-6">

                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <CreditCard className="w-6 h-6 text-blue-600" />
                        Mis Pagos y Recibos
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Consultá el estado de tu membresía y descargá tus comprobantes</p>
                </div>

                {/* Banner de estado */}
                {tieneVencidas ? (
                    <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
                        <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                        <div>
                            <p className="font-semibold text-red-800">Tenés cuotas vencidas</p>
                            <p className="text-sm text-red-700">Regularizá tu situación para continuar accediendo al polígono.</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-4">
                        <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                        <div>
                            <p className="font-semibold text-green-800">Membresía al día</p>
                            <p className="text-sm text-green-700">Tu situación de pago está en regla. ¡Seguí disfrutando del club!</p>
                        </div>
                    </div>
                )}

                {/* Summary cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex items-center gap-4">
                        <div className={`p-3 rounded-full ${tieneVencidas ? 'bg-red-50' : 'bg-green-50'}`}>
                            {tieneVencidas
                                ? <XCircle className="w-6 h-6 text-red-600" />
                                : <CheckCircle2 className="w-6 h-6 text-green-600" />}
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Estado</p>
                            <p className={`text-base font-semibold ${tieneVencidas ? 'text-red-700' : 'text-green-700'}`}>
                                {tieneVencidas ? 'En mora' : 'Al día'}
                            </p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex items-center gap-4">
                        <div className="p-3 rounded-full bg-blue-50">
                            <Calendar className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Próximo vencimiento</p>
                            <p className="text-base font-semibold text-gray-800">{proximoVencimiento}</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex items-center gap-4">
                        <div className="p-3 rounded-full bg-indigo-50">
                            <TrendingUp className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Total pagado (año)</p>
                            <p className="text-base font-semibold text-gray-800">{formatMonto(totalPagado)}</p>
                        </div>
                    </div>
                </div>

                {/* Tabla de pagos */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-800">Historial de pagos</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left font-medium text-gray-600">#</th>
                                    <th className="px-4 py-3 text-left font-medium text-gray-600">Concepto</th>
                                    <th className="px-4 py-3 text-left font-medium text-gray-600">Período</th>
                                    <th className="px-4 py-3 text-left font-medium text-gray-600">Monto</th>
                                    <th className="px-4 py-3 text-left font-medium text-gray-600">Método</th>
                                    <th className="px-4 py-3 text-left font-medium text-gray-600">Fecha pago</th>
                                    <th className="px-4 py-3 text-left font-medium text-gray-600">Estado</th>
                                    <th className="px-4 py-3 text-left font-medium text-gray-600">PDF</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {PAGOS.map(p => (
                                    <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-3 text-gray-400 text-xs">#{p.id}</td>
                                        <td className="px-4 py-3 text-gray-800 font-medium">
                                            {p.concepto} — {p.periodo}
                                        </td>
                                        <td className="px-4 py-3 text-gray-600">{p.periodo}</td>
                                        <td className="px-4 py-3 text-gray-800 font-semibold">{formatMonto(p.monto)}</td>
                                        <td className="px-4 py-3 text-gray-500">{p.metodo || '—'}</td>
                                        <td className="px-4 py-3 text-gray-500">{formatFecha(p.fecha_pago)}</td>
                                        <td className="px-4 py-3">{estadoBadge(p.estado)}</td>
                                        <td className="px-4 py-3">
                                            {p.estado === 'Pagado' ? (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                                                    title="Descargar PDF"
                                                >
                                                    <Download className="w-4 h-4" />
                                                </Button>
                                            ) : (
                                                <span className="text-gray-300 text-xs px-2">—</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-500">
                        <AlertCircle className="w-3.5 h-3.5" />
                        Los PDFs de recibos son generados al momento de la descarga. Si no encontrás un recibo, contactá a administración.
                    </div>
                </div>
            </div>
        </>
    );
}


MisPagos.layout = {
    breadcrumbs,
};
