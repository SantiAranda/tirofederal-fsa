import { Head } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { CreditCard, DollarSign, Download, Plus, Search, Trash2, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Inicio', href: '/admin/dashboard' },
    { title: 'Pagos y Recibos', href: '/admin/pagos' },
];

interface Pago {
    id: number;
    recibo: string;
    socio: string;
    dni: string;
    concepto: string;
    monto: number;
    metodo: 'Efectivo' | 'Transferencia' | 'Tarjeta';
    fecha: string;
    estado: 'Pagado' | 'Pendiente' | 'Anulado';
}

const mockPagos: Pago[] = [
    { id: 1, recibo: 'REC-2026-0089', socio: 'Carlos Eduardo Benítez', dni: '32.456.789', concepto: 'Cuota Mensual - Noviembre 2026', monto: 8000, metodo: 'Transferencia', fecha: '08/11/2026', estado: 'Pagado' },
    { id: 2, recibo: 'REC-2026-0088', socio: 'María Laura Insfrán', dni: '28.912.345', concepto: 'Cuota Mensual - Noviembre 2026', monto: 12000, metodo: 'Tarjeta', fecha: '07/11/2026', estado: 'Pagado' },
    { id: 3, recibo: 'REC-2026-0087', socio: 'Roberto Gómez', dni: '18.345.670', concepto: 'Cuota Ingreso + Membresía Inicial', monto: 23000, metodo: 'Efectivo', fecha: '06/11/2026', estado: 'Pagado' },
    { id: 4, recibo: 'REC-2026-0086', socio: 'Gonzalo Fernández', dni: '35.890.123', concepto: 'Arancel Torneo Provincial', monto: 5000, metodo: 'Transferencia', fecha: '05/11/2026', estado: 'Pagado' },
    { id: 5, recibo: 'REC-2026-0085', socio: 'Valeria Bogado', dni: '40.123.456', concepto: 'Insumos / Munición 9mm (x50)', monto: 12000, metodo: 'Efectivo', fecha: '05/11/2026', estado: 'Pagado' },
    { id: 6, recibo: 'REC-2026-0084', socio: 'Juan Carlos Pérez', dni: '12.345.678', concepto: 'Cuota Mensual - Noviembre 2026', monto: 8000, metodo: 'Transferencia', fecha: '01/11/2026', estado: 'Pendiente' },
    { id: 7, recibo: 'REC-2026-0083', socio: 'Esteban Morales', dni: '22.456.901', concepto: 'Derecho de Pedana Tirador Ocasional', monto: 4500, metodo: 'Efectivo', fecha: '30/10/2026', estado: 'Pagado' },
    { id: 8, recibo: 'REC-2026-0082', socio: 'Martín Almada', dni: '31.234.567', concepto: 'Cuota Mensual - Octubre 2026', monto: 8000, metodo: 'Transferencia', fecha: '28/10/2026', estado: 'Anulado' },
];

const fmt = (n: number) =>
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n);

export default function PagosIndex() {
    const [pagos, setPagos] = useState<Pago[]>(mockPagos);
    const [search, setSearch] = useState('');
    const [filtroMetodo, setFiltroMetodo] = useState('todos');
    const [filtroEstado, setFiltroEstado] = useState('todos');
    const [dialogOpen, setDialogOpen] = useState(false);

    const [form, setForm] = useState({
        socio: '',
        concepto: 'Cuota Mensual',
        monto: '',
        metodo: 'Efectivo' as Pago['metodo'],
    });

    const pagosFiltrados = pagos.filter(p => {
        const matchesSearch = p.socio.toLowerCase().includes(search.toLowerCase()) ||
            p.recibo.toLowerCase().includes(search.toLowerCase()) ||
            p.dni.includes(search);
        const matchesMetodo = filtroMetodo === 'todos' || p.metodo === filtroMetodo;
        const matchesEstado = filtroEstado === 'todos' || p.estado === filtroEstado;
        return matchesSearch && matchesMetodo && matchesEstado;
    });

    const totalCobrado = pagos
        .filter(p => p.estado === 'Pagado')
        .reduce((sum, p) => sum + p.monto, 0);

    const handleRegistrar = (e: React.FormEvent) => {
        e.preventDefault();
        const nuevo: Pago = {
            id: Date.now(),
            recibo: `REC-2026-00${pagos.length + 90}`,
            socio: form.socio,
            dni: '40.000.000',
            concepto: form.concepto,
            monto: Number(form.monto) || 0,
            metodo: form.metodo,
            fecha: new Date().toLocaleDateString('es-AR'),
            estado: 'Pagado',
        };
        setPagos([nuevo, ...pagos]);
        setDialogOpen(false);
        setForm({ socio: '', concepto: 'Cuota Mensual', monto: '', metodo: 'Efectivo' });
    };

    const anularPago = (id: number) => {
        setPagos(pagos.map(p => p.id === id ? { ...p, estado: 'Anulado' } : p));
    };

    return (
        <>
            <Head title="Pagos y Recibos - Tiro Federal Formosa" />
            <div className="flex flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Cobros, Pagos y Recibos</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Gestión de recaudación, cuotas societarias, eventos y venta de insumos (RF22)
                        </p>
                    </div>
                    <Button onClick={() => setDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                        <Plus className="w-4 h-4" /> Registrar Cobro
                    </Button>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Cobrado (Mes)</CardTitle>
                            <DollarSign className="w-4 h-4 text-emerald-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">{fmt(totalCobrado)}</div>
                            <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1 font-medium">
                                <CheckCircle2 className="w-3.5 h-3.5" /> 7 transacciones completadas
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Pagos Pendientes</CardTitle>
                            <Clock className="w-4 h-4 text-amber-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">
                                {pagos.filter(p => p.estado === 'Pendiente').length}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Cuotas por acreditar</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Transferencias</CardTitle>
                            <CreditCard className="w-4 h-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">
                                {pagos.filter(p => p.metodo === 'Transferencia').length}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Canal electrónico</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Cobros en Efectivo</CardTitle>
                            <AlertCircle className="w-4 h-4 text-indigo-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">
                                {pagos.filter(p => p.metodo === 'Efectivo').length}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Caja sede social</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Filtros */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Buscar por socio, DNI o N° de recibo..."
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    className="pl-9"
                                />
                            </div>
                            <div className="flex gap-2">
                                <select
                                    value={filtroMetodo}
                                    onChange={e => setFiltroMetodo(e.target.value)}
                                    className="h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                >
                                    <option value="todos">Todos los métodos</option>
                                    <option value="Efectivo">Efectivo</option>
                                    <option value="Transferencia">Transferencia</option>
                                    <option value="Tarjeta">Tarjeta</option>
                                </select>
                                <select
                                    value={filtroEstado}
                                    onChange={e => setFiltroEstado(e.target.value)}
                                    className="h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                >
                                    <option value="todos">Todos los estados</option>
                                    <option value="Pagado">Pagado</option>
                                    <option value="Pendiente">Pendiente</option>
                                    <option value="Anulado">Anulado</option>
                                </select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Tabla de Pagos */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base font-semibold text-gray-800">
                            Registro de Transacciones ({pagosFiltrados.length})
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50/70">
                                    <TableHead>Recibo</TableHead>
                                    <TableHead>Socio / Tirador</TableHead>
                                    <TableHead>Concepto</TableHead>
                                    <TableHead>Monto</TableHead>
                                    <TableHead>Método</TableHead>
                                    <TableHead>Fecha</TableHead>
                                    <TableHead>Estado</TableHead>
                                    <TableHead className="text-right">Comprobante</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {pagosFiltrados.map((p) => (
                                    <TableRow key={p.id} className="hover:bg-gray-50/50">
                                        <TableCell className="font-mono text-xs font-semibold text-blue-600">{p.recibo}</TableCell>
                                        <TableCell>
                                            <div className="font-medium text-gray-900">{p.socio}</div>
                                            <div className="text-xs text-gray-500">DNI: {p.dni}</div>
                                        </TableCell>
                                        <TableCell className="text-sm text-gray-700">{p.concepto}</TableCell>
                                        <TableCell className="font-semibold text-gray-900">{fmt(p.monto)}</TableCell>
                                        <TableCell>
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                                {p.metodo}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-xs text-gray-500">{p.fecha}</TableCell>
                                        <TableCell>
                                            {p.estado === 'Pagado' && (
                                                <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">Pagado</Badge>
                                            )}
                                            {p.estado === 'Pendiente' && (
                                                <Badge className="bg-amber-50 text-amber-700 border-amber-200">Pendiente</Badge>
                                            )}
                                            {p.estado === 'Anulado' && (
                                                <Badge className="bg-rose-50 text-rose-700 border-rose-200">Anulado</Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-1">
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                                    title="Descargar comprobante PDF"
                                                >
                                                    <Download className="w-4 h-4 mr-1" /> PDF
                                                </Button>
                                                {p.estado === 'Pagado' && (
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() => anularPago(p.id)}
                                                        className="h-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                                                        title="Anular pago"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </Button>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Dialog Registrar Cobro */}
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Registrar Nuevo Cobro</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleRegistrar} className="space-y-4 pt-2">
                            <div>
                                <Label htmlFor="socio">Nombre del Socio / Tirador</Label>
                                <Input
                                    id="socio"
                                    required
                                    placeholder="Ej: Juan Carlos Pérez"
                                    value={form.socio}
                                    onChange={e => setForm({ ...form, socio: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label htmlFor="concepto">Concepto de Cobro</Label>
                                <select
                                    id="concepto"
                                    value={form.concepto}
                                    onChange={e => setForm({ ...form, concepto: e.target.value })}
                                    className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 mt-1"
                                >
                                    <option value="Cuota Mensual">Cuota Mensual</option>
                                    <option value="Cuota de Ingreso + Membresía">Cuota de Ingreso + Membresía</option>
                                    <option value="Arancel de Torneo / Inscripción">Arancel de Torneo / Inscripción</option>
                                    <option value="Venta de Municiones e Insumos">Venta de Municiones e Insumos</option>
                                    <option value="Derecho de Línea Tirador No Socio">Derecho de Línea Tirador No Socio</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="monto">Monto (ARS)</Label>
                                    <Input
                                        id="monto"
                                        type="number"
                                        required
                                        placeholder="8000"
                                        value={form.monto}
                                        onChange={e => setForm({ ...form, monto: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="metodo">Método de Cobro</Label>
                                    <select
                                        id="metodo"
                                        value={form.metodo}
                                        onChange={e => setForm({ ...form, metodo: e.target.value as Pago['metodo'] })}
                                        className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 mt-1"
                                    >
                                        <option value="Efectivo">Efectivo (Caja)</option>
                                        <option value="Transferencia">Transferencia bancaria</option>
                                        <option value="Tarjeta">Tarjeta Débito/Crédito</option>
                                    </select>
                                </div>
                            </div>
                            <DialogFooter className="pt-2">
                                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                                    Cancelar
                                </Button>
                                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                                    Emitir Recibo y Guardar
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}



PagosIndex.layout = {
    breadcrumbs,
};
