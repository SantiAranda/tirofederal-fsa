import { Head, Link } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import {
    CreditCard, CheckCircle2, XCircle, Download, Calendar,
    TrendingUp, AlertCircle, Clock, Receipt,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import socioPagos from '@/routes/socio/pagos';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Mi Panel', href: '/panel' },
    { title: 'Mis Pagos', href: socioPagos.index().url },
];

type EstadoPago = 'aprobado' | 'pendiente' | 'anulado';
type EstadoSocio = 'activo' | 'en_mora' | 'inactivo' | 'pendiente_validacion';

interface Pago {
    id: number;
    concepto: string;
    periodo: string | null;
    monto: number;
    metodo: string | null;
    fecha_pago: string | null;
    estado: EstadoPago;
    codigo: string | null;
    tiene_comprobante: boolean;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    pagos: {
        data: Pago[];
        links: PaginationLink[];
        total: number;
    } | null;
    totalAbonadoAnio: number;
    estadoHabilitacion: { valor: EstadoSocio; etiqueta: string } | null;
    proximoVencimiento: string | null;
}

const MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

function formatMonto(n: number) {
    return `$${n.toLocaleString('es-AR')}`;
}

function formatFecha(f: string | null) {
    if (!f) return '—';
    const [y, m, d] = f.split('-');
    return `${d}/${m}/${y}`;
}

/** "2026-10" → "Oct 2026"; cualquier otro formato se muestra tal cual. */
function formatPeriodo(p: string | null) {
    if (!p) return '—';
    const match = /^(\d{4})-(\d{2})$/.exec(p);
    if (!match) return p;
    return `${MESES[Number(match[2]) - 1] ?? match[2]} ${match[1]}`;
}

function estadoBadge(estado: EstadoPago) {
    if (estado === 'aprobado') return <Badge className="bg-green-100 text-green-700 border-0">Pagado</Badge>;
    if (estado === 'pendiente') return <Badge className="bg-yellow-100 text-yellow-700 border-0">Pendiente</Badge>;
    return <Badge className="bg-gray-100 text-gray-600 border-0">Anulado</Badge>;
}

interface EstadoVisual {
    tono: 'verde' | 'rojo' | 'amarillo' | 'gris';
    resumen: string;
    titulo: string;
    detalle: string;
}

function estadoVisual(estado: Props['estadoHabilitacion']): EstadoVisual {
    switch (estado?.valor) {
        case 'activo':
            return {
                tono: 'verde',
                resumen: 'Al día',
                titulo: 'Membresía al día',
                detalle: 'Tu situación de pago está en regla. ¡Seguí disfrutando del club!',
            };
        case 'en_mora':
            return {
                tono: 'rojo',
                resumen: 'En mora',
                titulo: 'Tenés cuotas vencidas',
                detalle: 'Regularizá tu situación para continuar accediendo al polígono.',
            };
        case 'inactivo':
            return {
                tono: 'gris',
                resumen: 'Inactivo',
                titulo: 'Membresía inactiva',
                detalle: 'Contactá a administración para reactivar tu membresía.',
            };
        default:
            return {
                tono: 'amarillo',
                resumen: 'Pendiente',
                titulo: 'Cuenta pendiente de validación',
                detalle: 'Administración está revisando tu documentación. Una vez aprobada vas a poder abonar tu plan.',
            };
    }
}

const TONOS = {
    verde: { banner: 'bg-green-50 border-green-200', icono: 'text-green-600', titulo: 'text-green-800', texto: 'text-green-700', fondo: 'bg-green-50' },
    rojo: { banner: 'bg-red-50 border-red-200', icono: 'text-red-600', titulo: 'text-red-800', texto: 'text-red-700', fondo: 'bg-red-50' },
    amarillo: { banner: 'bg-yellow-50 border-yellow-200', icono: 'text-yellow-600', titulo: 'text-yellow-800', texto: 'text-yellow-700', fondo: 'bg-yellow-50' },
    gris: { banner: 'bg-gray-50 border-gray-200', icono: 'text-gray-500', titulo: 'text-gray-800', texto: 'text-gray-600', fondo: 'bg-gray-100' },
} as const;

function IconoEstado({ tono, className }: { tono: EstadoVisual['tono']; className: string }): ReactNode {
    const cls = `${className} ${TONOS[tono].icono}`;
    if (tono === 'verde') return <CheckCircle2 className={cls} />;
    if (tono === 'rojo') return <XCircle className={cls} />;
    if (tono === 'amarillo') return <Clock className={cls} />;
    return <AlertCircle className={cls} />;
}

export default function MisPagos({ pagos, totalAbonadoAnio, estadoHabilitacion, proximoVencimiento }: Props) {
    const estado = estadoVisual(estadoHabilitacion);
    const tono = TONOS[estado.tono];
    const lista = pagos?.data ?? [];

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
                <div className={`flex items-center gap-3 border rounded-xl p-4 ${tono.banner}`}>
                    <IconoEstado tono={estado.tono} className="w-5 h-5 shrink-0" />
                    <div>
                        <p className={`font-semibold ${tono.titulo}`}>{estado.titulo}</p>
                        <p className={`text-sm ${tono.texto}`}>{estado.detalle}</p>
                    </div>
                </div>

                {/* Summary cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5 flex items-center gap-4 overflow-hidden">
                        <div className={`p-3 rounded-xl shrink-0 ${tono.fondo}`}>
                            <IconoEstado tono={estado.tono} className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs text-gray-500 truncate">Estado</p>
                            <p className={`text-base font-semibold truncate ${tono.texto}`}>{estado.resumen}</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5 flex items-center gap-4 overflow-hidden">
                        <div className="p-3 rounded-xl bg-blue-50 shrink-0">
                            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs text-gray-500 truncate">Próximo vencimiento</p>
                            <p className="text-base font-semibold text-gray-800 truncate">
                                {proximoVencimiento ? formatFecha(proximoVencimiento) : 'Sin cuotas aún'}
                            </p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5 flex items-center gap-4 overflow-hidden">
                        <div className="p-3 rounded-xl bg-indigo-50 shrink-0">
                            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs text-gray-500 truncate">Total pagado (año)</p>
                            <p className="text-base font-semibold text-gray-800 truncate" title={formatMonto(totalAbonadoAnio)}>
                                {formatMonto(totalAbonadoAnio)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tabla de pagos */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-800">Historial de pagos</h2>
                    </div>

                    {lista.length === 0 ? (
                        <div className="flex flex-col items-center justify-center gap-2 px-6 py-12 text-center">
                            <Receipt className="w-10 h-10 text-gray-300" />
                            <p className="font-medium text-gray-700">Todavía no registrás pagos</p>
                            <p className="text-sm text-gray-500">Cuando abones tu plan o una cuota, el pago y su recibo van a aparecer acá.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-medium text-gray-600">Comprobante</th>
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
                                    {lista.map(p => (
                                        <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-3 text-gray-400 text-xs">{p.codigo ?? `#${p.id}`}</td>
                                            <td className="px-4 py-3 text-gray-800 font-medium">{p.concepto}</td>
                                            <td className="px-4 py-3 text-gray-600">{formatPeriodo(p.periodo)}</td>
                                            <td className="px-4 py-3 text-gray-800 font-semibold">{formatMonto(p.monto)}</td>
                                            <td className="px-4 py-3 text-gray-500">{p.metodo ?? '—'}</td>
                                            <td className="px-4 py-3 text-gray-500">{formatFecha(p.fecha_pago)}</td>
                                            <td className="px-4 py-3">{estadoBadge(p.estado)}</td>
                                            <td className="px-4 py-3">
                                                {p.estado === 'aprobado' && p.tiene_comprobante ? (
                                                    <Button
                                                        asChild
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 w-8 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                                                        title="Descargar PDF"
                                                    >
                                                        <a href={socioPagos.pdf(p.id).url}>
                                                            <Download className="w-4 h-4" />
                                                        </a>
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
                    )}

                    {pagos && pagos.links.length > 3 && (
                        <div className="flex flex-wrap items-center justify-center gap-1 px-6 py-3 border-t border-gray-100">
                            {pagos.links.map((link, i) =>
                                link.url ? (
                                    <Link
                                        key={i}
                                        href={link.url}
                                        preserveScroll
                                        className={`px-3 py-1 rounded-md text-sm ${link.active ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ) : (
                                    <span
                                        key={i}
                                        className="px-3 py-1 text-sm text-gray-300"
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ),
                            )}
                        </div>
                    )}

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
