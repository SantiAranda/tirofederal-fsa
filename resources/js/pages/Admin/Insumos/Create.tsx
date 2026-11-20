import { FormEvent } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { 
    Package, ArrowLeft, DollarSign, TrendingDown, 
    Save, RotateCcw, ShieldCheck, AlertTriangle, Layers, CheckCircle2 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

const CATEGORIAS: { value: string; label: string; desc: string }[] = [
    { value: 'Municiones', label: 'Municiones y Cartuchería', desc: 'Calibres 9mm, .22 LR, .38, .45, 12/70, etc.' },
    { value: 'Protección', label: 'Protección Auditiva y Visual', desc: 'Protectores de copa, tapones, gafas balísticas' },
    { value: 'Bastidores', label: 'Blancos y Bastidores', desc: 'Blancos de silueta, bastidores metálicos y de madera' },
    { value: 'Otros', label: 'Insumos Varios y Accesorios', desc: 'Fundas, cargadores, parches y elementos de limpieza' },
];

export default function CreateInsumo() {
    const { data, setData, post, processing, errors, reset } = useForm({
        nombre: '',
        categoria: 'Municiones',
        cantidad_stock: '',
        stock_minimo: '50',
        precio_unitario: '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post('/admin/insumos');
    };

    const fmt = (n: number) =>
        new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n);

    const stockNum = Number(data.cantidad_stock) || 0;
    const stockMinNum = Number(data.stock_minimo) || 0;
    const precioNum = Number(data.precio_unitario) || 0;
    const valorizacionTotal = stockNum * precioNum;
    const esStockBajo = stockNum > 0 && stockNum <= stockMinNum;
    const esSinStock = stockNum === 0 && data.cantidad_stock !== '';

    return (
        <div className="space-y-6 pb-12">
            <Head title="Añadir nuevo insumo de armería - Tiro Federal Formosa" />

            {/* Breadcrumbs y Título superior */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                        <Package className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Añadir nuevo insumo de armería</h1>
                        <p className="text-sm text-muted-foreground">
                            Registre municiones, protectores auditivos, blancos y material del polígono.
                        </p>
                    </div>
                </div>

                <Button variant="outline" asChild className="gap-2">
                    <Link href="/admin/insumos">
                        <ArrowLeft className="w-4 h-4" /> Volver al listado
                    </Link>
                </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* COLUMNA 1 & 2: Identificación y Existencias */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Card: Identificación del Producto */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
                            <div className="flex items-center gap-2 text-blue-600 font-semibold border-b border-gray-100 pb-3">
                                <Package className="w-4 h-4" />
                                <span>Identificación y clasificación del material</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5 md:col-span-2">
                                    <Label htmlFor="nombre">Nombre del insumo o munición *</Label>
                                    <Input
                                        id="nombre"
                                        placeholder="Ej: Munición Magtech 9mm Luger (Caja x50) o Protector Auditivo de Copa 3M"
                                        value={data.nombre}
                                        onChange={(e) => setData('nombre', e.target.value)}
                                        required
                                    />
                                    {errors.nombre && <p className="text-xs text-red-500">{errors.nombre}</p>}
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="categoria">Categoría de armería *</Label>
                                    <select
                                        id="categoria"
                                        value={data.categoria}
                                        onChange={(e) => setData('categoria', e.target.value)}
                                        className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                        required
                                    >
                                        {CATEGORIAS.map((c) => (
                                            <option key={c.value} value={c.value}>
                                                {c.label}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.categoria && <p className="text-xs text-red-500">{errors.categoria}</p>}
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="precio_unitario">Precio unitario ($ ARS) *</Label>
                                    <div className="relative">
                                        <DollarSign className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                        <Input
                                            id="precio_unitario"
                                            type="number"
                                            min="0"
                                            step="10"
                                            placeholder="Ej: 1200"
                                            className="pl-9 font-semibold"
                                            value={data.precio_unitario}
                                            onChange={(e) => setData('precio_unitario', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground">Arancel de venta al socio o tirador.</p>
                                    {errors.precio_unitario && <p className="text-xs text-red-500">{errors.precio_unitario}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Card: Control de Existencias y Seguridad */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
                            <div className="flex items-center gap-2 text-blue-600 font-semibold border-b border-gray-100 pb-3">
                                <TrendingDown className="w-4 h-4" />
                                <span>Control de existencias en polvorín / depósito</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="cantidad_stock">Cantidad inicial en stock (unidades) *</Label>
                                    <Input
                                        id="cantidad_stock"
                                        type="number"
                                        min="0"
                                        placeholder="Ej: 500"
                                        value={data.cantidad_stock}
                                        onChange={(e) => setData('cantidad_stock', e.target.value)}
                                        required
                                    />
                                    <p className="text-xs text-muted-foreground">Unidades físicas verificadas en depósito.</p>
                                    {errors.cantidad_stock && <p className="text-xs text-red-500">{errors.cantidad_stock}</p>}
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="stock_minimo">Umbral de alerta (stock mínimo) *</Label>
                                    <Input
                                        id="stock_minimo"
                                        type="number"
                                        min="0"
                                        placeholder="Ej: 50"
                                        value={data.stock_minimo}
                                        onChange={(e) => setData('stock_minimo', e.target.value)}
                                        required
                                    />
                                    <p className="text-xs text-muted-foreground">Nivel bajo el cual el sistema emite alerta de compra.</p>
                                    {errors.stock_minimo && <p className="text-xs text-red-500">{errors.stock_minimo}</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* COLUMNA 3: Indicadores y Valorización */}
                    <div className="lg:col-span-1 space-y-6">

                        {/* Card: Diagnóstico de Alerta */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
                            <div className="flex items-center gap-2 text-blue-600 font-semibold border-b border-gray-100 pb-3">
                                <ShieldCheck className="w-4 h-4" />
                                <span>Diagnóstico de reposición</span>
                            </div>

                            <div className="space-y-3 text-xs">
                                <div className="flex justify-between items-center py-1 border-b border-gray-100">
                                    <span className="text-muted-foreground">Categoría:</span>
                                    <Badge variant="outline" className="text-gray-700">{data.categoria}</Badge>
                                </div>
                                <div className="flex justify-between items-center py-1 border-b border-gray-100">
                                    <span className="text-muted-foreground">Estado de stock:</span>
                                    {esSinStock ? (
                                        <Badge className="bg-red-100 text-red-700 border-red-200">Sin stock</Badge>
                                    ) : esStockBajo ? (
                                        <Badge className="bg-amber-100 text-amber-700 border-amber-200">Stock Crítico</Badge>
                                    ) : (
                                        <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">Stock Óptimo</Badge>
                                    )}
                                </div>
                                <div className="flex justify-between items-center py-1 border-b border-gray-100">
                                    <span className="text-muted-foreground">Ubicación física:</span>
                                    <span className="font-medium text-gray-900">Armería / Polvorín TF</span>
                                </div>
                            </div>
                        </div>

                        {/* Tarjeta de Valorización de Inventario */}
                        <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-6 text-white shadow-xl space-y-4 border border-blue-800/40">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold tracking-wider uppercase text-blue-300">Depósito & Armería</span>
                                <Badge className="bg-blue-600 text-white text-[10px]">Activo Corriente</Badge>
                            </div>

                            <div className="pt-1">
                                <p className="text-xs text-blue-200">Valorización de la Partida</p>
                                <p className="text-3xl font-extrabold tracking-tight text-white mt-0.5">
                                    {fmt(valorizacionTotal)}
                                </p>
                            </div>

                            <div className="space-y-2 pt-3 border-t border-white/10 text-xs">
                                <div className="flex justify-between text-slate-300">
                                    <span>Insumo:</span>
                                    <span className="font-semibold text-white truncate max-w-[150px]">
                                        {data.nombre || 'Sin denominación'}
                                    </span>
                                </div>
                                <div className="flex justify-between text-slate-300">
                                    <span>Stock ingresado:</span>
                                    <span className="font-semibold text-white">{stockNum} un.</span>
                                </div>
                                <div className="flex justify-between text-slate-300">
                                    <span>Precio p/ unidad:</span>
                                    <span className="font-semibold text-white">{fmt(precioNum)}</span>
                                </div>
                                <div className="flex justify-between text-slate-300">
                                    <span>Umbral de alerta:</span>
                                    <span className="text-amber-400 font-semibold">{stockMinNum} un.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* BOTONES DE ACCIÓN INFERIORES */}
                <div className="flex justify-end items-center gap-3 pt-2">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => reset()}
                        className="gap-2"
                    >
                        <RotateCcw className="w-4 h-4" /> Limpiar formulario
                    </Button>
                    <Button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-600 hover:bg-blue-700 text-white gap-2 px-6 shadow-md shadow-blue-500/20"
                    >
                        <Save className="w-4 h-4" /> Guardar insumo
                    </Button>
                </div>
            </form>
        </div>
    );
}

CreateInsumo.layout = {
    breadcrumbs: [
        { title: 'Inicio', href: '/admin/dashboard' },
        { title: 'Armería / Insumos', href: '/admin/insumos' },
        { title: 'Añadir nuevo insumo', href: '/admin/insumos/create' },
    ],
};
