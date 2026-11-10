import { Head } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import { useState } from 'react';
import {
    Card, CardContent, CardHeader, CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog';
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
    Plus, Search, Pencil, Trash2, AlertTriangle, Package, DollarSign, TrendingDown, Activity,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Inicio', href: '/admin/dashboard' },
    { title: 'Armería / Insumos', href: '/admin/insumos' },
];

type Categoria = 'Municiones' | 'Protección' | 'Bastidores' | 'Otros';

interface Insumo {
    id: number;
    nombre: string;
    categoria: Categoria;
    stock: number;
    stockMinimo: number;
    precioUnitario: number;
}

const insumosIniciales: Insumo[] = [
    { id: 1, nombre: 'Balas 9mm', categoria: 'Municiones', stock: 200, stockMinimo: 50, precioUnitario: 1200 },
    { id: 2, nombre: 'Balas .22', categoria: 'Municiones', stock: 450, stockMinimo: 100, precioUnitario: 800 },
    { id: 3, nombre: 'Orejeras de protección', categoria: 'Protección', stock: 8, stockMinimo: 5, precioUnitario: 3500 },
    { id: 4, nombre: 'Lentes protectores', categoria: 'Protección', stock: 12, stockMinimo: 5, precioUnitario: 2800 },
    { id: 5, nombre: 'Bastidor papel A3', categoria: 'Bastidores', stock: 3, stockMinimo: 10, precioUnitario: 500 },
    { id: 6, nombre: 'Bastidor metálico', categoria: 'Bastidores', stock: 2, stockMinimo: 5, precioUnitario: 1500 },
    { id: 7, nombre: 'Chaleco antibalas', categoria: 'Protección', stock: 1, stockMinimo: 2, precioUnitario: 45000 },
    { id: 8, nombre: 'Tapones auditivos', categoria: 'Protección', stock: 50, stockMinimo: 20, precioUnitario: 200 },
];

const formatPrecio = (n: number) =>
    '$' + n.toLocaleString('es-AR', { minimumFractionDigits: 0 });

function getEstadoBadge(insumo: Insumo) {
    if (insumo.stock === 0) return <Badge className="bg-red-100 text-red-700 border-red-200">Sin stock</Badge>;
    if (insumo.stock < insumo.stockMinimo) return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Stock bajo</Badge>;
    return <Badge className="bg-green-100 text-green-700 border-green-200">Normal</Badge>;
}

export default function InsumosIndex() {
    const [insumos, setInsumos] = useState<Insumo[]>(insumosIniciales);
    const [busqueda, setBusqueda] = useState('');
    const [filtroCategoria, setFiltroCategoria] = useState<string>('todas');
    const [filtroStock, setFiltroStock] = useState<string>('todo');

    // Ajuste de stock dialog
    const [ajusteOpen, setAjusteOpen] = useState(false);
    const [insumoSeleccionado, setInsumoSeleccionado] = useState<Insumo | null>(null);
    const [ajusteTipo, setAjusteTipo] = useState<'entrada' | 'salida'>('entrada');
    const [ajusteCantidad, setAjusteCantidad] = useState('');
    const [ajusteMotivo, setAjusteMotivo] = useState('compra');

    const insumosConStockBajo = insumos.filter(i => i.stock < i.stockMinimo);
    const valorTotalInventario = insumos.reduce((acc, i) => acc + i.stock * i.precioUnitario, 0);

    const insumosFiltrados = insumos.filter(i => {
        const matchBusqueda = i.nombre.toLowerCase().includes(busqueda.toLowerCase());
        const matchCategoria = filtroCategoria === 'todas' || i.categoria === filtroCategoria;
        const matchStock =
            filtroStock === 'todo' ||
            (filtroStock === 'bajo' && i.stock > 0 && i.stock < i.stockMinimo) ||
            (filtroStock === 'sin' && i.stock === 0);
        return matchBusqueda && matchCategoria && matchStock;
    });

    const abrirAjuste = (insumo: Insumo) => {
        setInsumoSeleccionado(insumo);
        setAjusteTipo('entrada');
        setAjusteCantidad('');
        setAjusteMotivo('compra');
        setAjusteOpen(true);
    };

    const aplicarAjuste = () => {
        if (!insumoSeleccionado || !ajusteCantidad) return;
        const cant = parseInt(ajusteCantidad, 10);
        setInsumos(prev => prev.map(i => {
            if (i.id !== insumoSeleccionado.id) return i;
            const nuevo = ajusteTipo === 'entrada' ? i.stock + cant : Math.max(0, i.stock - cant);
            return { ...i, stock: nuevo };
        }));
        setAjusteOpen(false);
    };

    return (
        <>
            <Head title="Armería e Insumos" />
            <div className="flex flex-col gap-6 p-6">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Armería e Insumos</h1>
                        <p className="text-sm text-gray-500 mt-1">Gestión de stock para venta presencial</p>
                    </div>
                    <Button className="bg-blue-600 text-white hover:bg-blue-700 gap-2">
                        <Plus className="h-4 w-4" />
                        Agregar Insumo
                    </Button>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="rounded-xl border border-gray-200 shadow-sm">
                        <CardContent className="p-5 flex items-center gap-4">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Package className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Total productos</p>
                                <p className="text-2xl font-bold text-gray-900">{insumos.length}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="rounded-xl border border-gray-200 shadow-sm">
                        <CardContent className="p-5 flex items-center gap-4">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <DollarSign className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Valor total inventario</p>
                                <p className="text-2xl font-bold text-gray-900">{formatPrecio(valorTotalInventario)}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="rounded-xl border border-gray-200 shadow-sm">
                        <CardContent className="p-5 flex items-center gap-4">
                            <div className="p-2 bg-yellow-100 rounded-lg">
                                <TrendingDown className="h-5 w-5 text-yellow-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Stock bajo</p>
                                <p className="text-2xl font-bold text-gray-900">{insumosConStockBajo.length}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="rounded-xl border border-gray-200 shadow-sm">
                        <CardContent className="p-5 flex items-center gap-4">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <Activity className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Movimientos hoy</p>
                                <p className="text-2xl font-bold text-gray-900">7</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Alert banner */}
                {insumosConStockBajo.length > 0 && (
                    <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 shrink-0" />
                        <div>
                            <p className="text-sm font-semibold text-yellow-800">
                                {insumosConStockBajo.length} producto(s) con stock bajo o sin stock
                            </p>
                            <p className="text-sm text-yellow-700 mt-0.5">
                                {insumosConStockBajo.map(i => i.nombre).join(', ')}
                            </p>
                        </div>
                    </div>
                )}

                {/* Filters */}
                <Card className="rounded-xl border border-gray-200 shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Buscar producto..."
                                    value={busqueda}
                                    onChange={e => setBusqueda(e.target.value)}
                                    className="pl-9"
                                />
                            </div>
                            <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
                                <SelectTrigger className="w-full sm:w-48">
                                    <SelectValue placeholder="Categoría" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="todas">Todas las categorías</SelectItem>
                                    <SelectItem value="Municiones">Municiones</SelectItem>
                                    <SelectItem value="Protección">Protección</SelectItem>
                                    <SelectItem value="Bastidores">Bastidores</SelectItem>
                                    <SelectItem value="Otros">Otros</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={filtroStock} onValueChange={setFiltroStock}>
                                <SelectTrigger className="w-full sm:w-44">
                                    <SelectValue placeholder="Stock" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="todo">Todo el stock</SelectItem>
                                    <SelectItem value="bajo">Stock bajo</SelectItem>
                                    <SelectItem value="sin">Sin stock</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Table */}
                <Card className="rounded-xl border border-gray-200 shadow-sm">
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-100">
                                    <TableHead className="font-semibold text-gray-700">Producto</TableHead>
                                    <TableHead className="font-semibold text-gray-700">Categoría</TableHead>
                                    <TableHead className="font-semibold text-gray-700 text-center">Stock Actual</TableHead>
                                    <TableHead className="font-semibold text-gray-700 text-center">Stock Mínimo</TableHead>
                                    <TableHead className="font-semibold text-gray-700 text-right">Precio Unit.</TableHead>
                                    <TableHead className="font-semibold text-gray-700 text-center">Estado</TableHead>
                                    <TableHead className="font-semibold text-gray-700 text-center">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {insumosFiltrados.map(insumo => (
                                    <TableRow key={insumo.id} className="hover:bg-gray-50">
                                        <TableCell className="font-medium text-gray-900">{insumo.nombre}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="text-gray-600">{insumo.categoria}</Badge>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <span className={`font-semibold ${insumo.stock < insumo.stockMinimo ? 'text-red-600' : 'text-gray-900'}`}>
                                                {insumo.stock}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-center text-gray-500">{insumo.stockMinimo}</TableCell>
                                        <TableCell className="text-right font-medium text-gray-900">
                                            {formatPrecio(insumo.precioUnitario)}
                                        </TableCell>
                                        <TableCell className="text-center">{getEstadoBadge(insumo)}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center justify-center gap-1">
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                                    title="Ajustar stock"
                                                    onClick={() => abrirAjuste(insumo)}
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-8 w-8 p-0 text-gray-600 hover:text-gray-700 hover:bg-gray-100"
                                                    title="Editar"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                                                    title="Eliminar"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {insumosFiltrados.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-10 text-gray-400">
                                            No se encontraron productos con los filtros aplicados.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            {/* Ajustar Stock Dialog */}
            <Dialog open={ajusteOpen} onOpenChange={setAjusteOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Ajustar Stock — {insumoSeleccionado?.nombre}</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-4 py-2">
                        <div>
                            <Label className="text-sm font-medium text-gray-700 mb-1 block">Tipo de movimiento</Label>
                            <div className="flex gap-2">
                                <Button
                                    variant={ajusteTipo === 'entrada' ? 'default' : 'outline'}
                                    className={ajusteTipo === 'entrada' ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}
                                    onClick={() => setAjusteTipo('entrada')}
                                >
                                    Entrada
                                </Button>
                                <Button
                                    variant={ajusteTipo === 'salida' ? 'default' : 'outline'}
                                    className={ajusteTipo === 'salida' ? 'bg-red-600 text-white hover:bg-red-700' : ''}
                                    onClick={() => setAjusteTipo('salida')}
                                >
                                    Salida
                                </Button>
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="cantidad" className="text-sm font-medium text-gray-700 mb-1 block">
                                Cantidad
                            </Label>
                            <Input
                                id="cantidad"
                                type="number"
                                min="1"
                                placeholder="Ej: 10"
                                value={ajusteCantidad}
                                onChange={e => setAjusteCantidad(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label className="text-sm font-medium text-gray-700 mb-1 block">Motivo</Label>
                            <Select value={ajusteMotivo} onValueChange={setAjusteMotivo}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Seleccionar motivo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="compra">Compra</SelectItem>
                                    <SelectItem value="venta">Venta</SelectItem>
                                    <SelectItem value="perdida">Pérdida</SelectItem>
                                    <SelectItem value="devolucion">Devolución</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        {insumoSeleccionado && (
                            <p className="text-sm text-gray-500 bg-gray-50 rounded-lg p-3">
                                Stock actual: <span className="font-semibold text-gray-800">{insumoSeleccionado.stock} unidades</span>
                                {ajusteCantidad && parseInt(ajusteCantidad) > 0 && (
                                    <> → Nuevo stock:{' '}
                                        <span className="font-semibold text-blue-700">
                                            {ajusteTipo === 'entrada'
                                                ? insumoSeleccionado.stock + parseInt(ajusteCantidad)
                                                : Math.max(0, insumoSeleccionado.stock - parseInt(ajusteCantidad))
                                            } unidades
                                        </span>
                                    </>
                                )}
                            </p>
                        )}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setAjusteOpen(false)}>Cancelar</Button>
                        <Button
                            className="bg-blue-600 text-white hover:bg-blue-700"
                            onClick={aplicarAjuste}
                            disabled={!ajusteCantidad || parseInt(ajusteCantidad) <= 0}
                        >
                            Aplicar ajuste
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}


InsumosIndex.layout = {
    breadcrumbs,
};
