import { FormEvent, useState, useMemo } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { 
    CreditCard, ArrowLeft, Receipt, DollarSign, User, 
    Save, RotateCcw, CheckCircle2, Calendar, FileText,
    Search, ShieldCheck, AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SocioItem {
    id: number;
    numero_socio?: string;
    user?: {
        id: number;
        nombre: string;
        apellido: string;
        dni: string;
    };
}

interface MembresiaItem {
    id: number;
    nombre_plan: string;
    monto_mensual: number;
    cuota_ingreso: number;
}

interface Props {
    socios?: SocioItem[];
    membresias?: MembresiaItem[];
}

const CONCEPTOS = [
    { value: 'cuota_mensual', label: 'Cuota Mensual Ordinaria', desc: 'Aporte mensual de mantenimiento de membresía' },
    { value: 'plan_inicial', label: 'Cuota de Ingreso / Matrícula', desc: 'Apertura de legajo y alta societaria' },
    { value: 'derecho_linea_diario', label: 'Derecho de Pedana / Tirador Diario', desc: 'Uso de línea de tiro individual' },
    { value: 'inscripcion_evento', label: 'Inscripción a Torneo / Certamen', desc: 'Arancel de competencia oficial' },
    { value: 'compra_insumos', label: 'Compra de Munición / Armería', desc: 'Venta de cartuchería y blancos en polígono' },
];

const METODOS = [
    { value: 'efectivo', label: 'Efectivo en Tesorería' },
    { value: 'transferencia', label: 'Transferencia Bancaria' },
    { value: 'tarjeta', label: 'Tarjeta de Débito / Crédito' },
    { value: 'pasarela_online', label: 'Pasarela Digital / Mercado Pago' },
];

export default function CreatePago({ socios = [], membresias = [] }: Props) {
    const today = new Date();
    const currentMonthStr = today.toLocaleDateString('es-AR', { month: 'long', year: 'numeric' });
    const formattedDate = today.toLocaleDateString('es-AR');

    const { data, setData, post, processing, errors, reset } = useForm({
        socio_profile_id: socios.length > 0 ? String(socios[0].id) : '',
        monto: '',
        tipo_concepto: 'cuota_mensual',
        periodo_imputado: currentMonthStr.charAt(0).toUpperCase() + currentMonthStr.slice(1),
        metodo_pago: 'efectivo',
        observaciones: '',
    });

    const [socioSearch, setSocioSearch] = useState('');

    const filteredSocios = useMemo(() => {
        if (!socioSearch.trim()) return socios;
        const q = socioSearch.toLowerCase();
        return socios.filter(s => {
            const nom = `${s.user?.nombre || ''} ${s.user?.apellido || ''}`.toLowerCase();
            const dni = s.user?.dni || '';
            const num = s.numero_socio || '';
            return nom.includes(q) || dni.includes(q) || num.toLowerCase().includes(q);
        });
    }, [socios, socioSearch]);

    const selectedSocio = useMemo(() => {
        return socios.find(s => String(s.id) === String(data.socio_profile_id));
    }, [socios, data.socio_profile_id]);

    const handleConceptoChange = (val: string) => {
        setData('tipo_concepto', val);
        // Sugerir monto si es cuota mensual y tenemos membresías
        if (val === 'cuota_mensual' && membresias.length > 0 && (!data.monto || data.monto === '0')) {
            setData('monto', String(membresias[0].monto_mensual));
        } else if (val === 'plan_inicial' && membresias.length > 0) {
            setData('monto', String(membresias[0].cuota_ingreso));
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post('/admin/pagos');
    };

    const fmt = (n: number) =>
        new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n);

    const montoNum = Number(data.monto) || 0;
    const selectedConceptoLabel = CONCEPTOS.find(c => c.value === data.tipo_concepto)?.label || data.tipo_concepto;
    const selectedMetodoLabel = METODOS.find(m => m.value === data.metodo_pago)?.label || data.metodo_pago;

    return (
        <div className="space-y-6 pb-12">
            <Head title="Registrar nuevo pago - Tiro Federal Formosa" />

            {/* Breadcrumbs y Título superior */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                        <Receipt className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Registrar nuevo pago / cobranza</h1>
                        <p className="text-sm text-muted-foreground">
                            Asiente un cobro presencial en tesorería y emita el comprobante oficial.
                        </p>
                    </div>
                </div>

                <Button variant="outline" asChild className="gap-2 w-full sm:w-auto">
                    <Link href="/admin/pagos">
                        <ArrowLeft className="w-4 h-4" /> Volver al listado
                    </Link>
                </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* COLUMNA 1 & 2: Datos del Socio y Transacción */}
                    <div className="lg:col-span-2 space-y-6">
                        
                        {/* Card: Selección del Socio */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
                            <div className="flex items-center gap-2 text-blue-600 font-semibold border-b border-gray-100 pb-3">
                                <User className="w-4 h-4" />
                                <span>Datos del socio aportante</span>
                            </div>

                            <div className="space-y-3">
                                <div className="space-y-1.5">
                                    <Label htmlFor="filtro_socio">Buscar socio (Nombre, Apellido o DNI)</Label>
                                    <div className="relative">
                                        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                        <Input
                                            id="filtro_socio"
                                            placeholder="Escriba para filtrar la lista..."
                                            value={socioSearch}
                                            onChange={(e) => setSocioSearch(e.target.value)}
                                            className="pl-9"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="socio_profile_id">Seleccionar Socio *</Label>
                                    <select
                                        id="socio_profile_id"
                                        value={data.socio_profile_id}
                                        onChange={(e) => setData('socio_profile_id', e.target.value)}
                                        className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                        required
                                    >
                                        <option value="">-- Seleccione un socio --</option>
                                        {filteredSocios.map((s) => (
                                            <option key={s.id} value={s.id}>
                                                {s.user ? `${s.user.apellido}, ${s.user.nombre} — DNI: ${s.user.dni}` : `Socio #${s.id}`}
                                                {s.numero_socio ? ` (${s.numero_socio})` : ''}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.socio_profile_id && <p className="text-xs text-red-500">{errors.socio_profile_id}</p>}
                                </div>

                                {selectedSocio?.user && (
                                    <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-100 flex items-center justify-between text-xs">
                                        <div className="space-y-0.5">
                                            <p className="font-semibold text-blue-900">
                                                {selectedSocio.user.nombre} {selectedSocio.user.apellido}
                                            </p>
                                            <p className="text-blue-700">DNI: {selectedSocio.user.dni}</p>
                                        </div>
                                        <Badge className="bg-blue-600 text-white font-normal">
                                            {selectedSocio.numero_socio || `TF-${String(selectedSocio.id).padStart(5, '0')}`}
                                        </Badge>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Card: Concepto e Importe */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
                            <div className="flex items-center gap-2 text-blue-600 font-semibold border-b border-gray-100 pb-3">
                                <DollarSign className="w-4 h-4" />
                                <span>Concepto, arancel y forma de cobro</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5 md:col-span-2">
                                    <Label htmlFor="tipo_concepto">Concepto de cobro *</Label>
                                    <select
                                        id="tipo_concepto"
                                        value={data.tipo_concepto}
                                        onChange={(e) => handleConceptoChange(e.target.value)}
                                        className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                        required
                                    >
                                        {CONCEPTOS.map((c) => (
                                            <option key={c.value} value={c.value}>
                                                {c.label}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.tipo_concepto && <p className="text-xs text-red-500">{errors.tipo_concepto}</p>}
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="monto">Monto a cobrar ($ ARS) *</Label>
                                    <div className="relative">
                                        <DollarSign className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                        <Input
                                            id="monto"
                                            type="number"
                                            min="1"
                                            step="100"
                                            placeholder="Ej: 8000"
                                            className="pl-9 text-base font-semibold"
                                            value={data.monto}
                                            onChange={(e) => setData('monto', e.target.value)}
                                            required
                                        />
                                    </div>
                                    {errors.monto && <p className="text-xs text-red-500">{errors.monto}</p>}
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="metodo_pago">Método de pago *</Label>
                                    <select
                                        id="metodo_pago"
                                        value={data.metodo_pago}
                                        onChange={(e) => setData('metodo_pago', e.target.value)}
                                        className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                        required
                                    >
                                        {METODOS.map((m) => (
                                            <option key={m.value} value={m.value}>
                                                {m.label}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.metodo_pago && <p className="text-xs text-red-500">{errors.metodo_pago}</p>}
                                </div>

                                <div className="space-y-1.5 md:col-span-2">
                                    <Label htmlFor="periodo_imputado">Período imputado / Observación del concepto</Label>
                                    <Input
                                        id="periodo_imputado"
                                        placeholder="Ej: Noviembre 2026, Matrícula Anual, o Torneo 9mm"
                                        value={data.periodo_imputado}
                                        onChange={(e) => setData('periodo_imputado', e.target.value)}
                                    />
                                    {errors.periodo_imputado && <p className="text-xs text-red-500">{errors.periodo_imputado}</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* COLUMNA 3: Vista Previa del Recibo Oficial */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Card: Resumen de Comprobante */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
                            <div className="flex items-center gap-2 text-blue-600 font-semibold border-b border-gray-100 pb-3">
                                <FileText className="w-4 h-4" />
                                <span>Comprobante transaccional</span>
                            </div>

                            <div className="space-y-3 text-xs">
                                <div className="flex justify-between items-center py-1 border-b border-gray-100">
                                    <span className="text-muted-foreground">Estado inicial:</span>
                                    <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">Aprobado / Asentado</Badge>
                                </div>
                                <div className="flex justify-between items-center py-1 border-b border-gray-100">
                                    <span className="text-muted-foreground">Fecha de emisión:</span>
                                    <span className="font-medium text-gray-900">{formattedDate}</span>
                                </div>
                                <div className="flex justify-between items-center py-1 border-b border-gray-100">
                                    <span className="text-muted-foreground">Código recibo:</span>
                                    <span className="font-mono text-gray-700">Autogenerado</span>
                                </div>
                                <div className="flex justify-between items-center py-1 border-b border-gray-100">
                                    <span className="text-muted-foreground">Emisor:</span>
                                    <span className="font-medium text-gray-900">Tesorería Central TF</span>
                                </div>
                            </div>
                        </div>

                        {/* Recibo Card Estilizado */}
                        <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-6 text-white shadow-xl space-y-4 border border-blue-800/40">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold tracking-wider uppercase text-blue-300">Tiro Federal Formosa</span>
                                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-400/30 text-[10px]">Tesorería</Badge>
                            </div>

                            <div className="pt-1">
                                <p className="text-xs text-blue-200">Total a Percibir</p>
                                <p className="text-3xl font-extrabold tracking-tight text-white mt-0.5">
                                    {fmt(montoNum)}
                                </p>
                            </div>

                            <div className="space-y-2 pt-3 border-t border-white/10 text-xs">
                                <div className="flex justify-between text-slate-300">
                                    <span>Titular:</span>
                                    <span className="font-semibold text-white truncate max-w-[150px]">
                                        {selectedSocio?.user ? `${selectedSocio.user.apellido}, ${selectedSocio.user.nombre}` : 'Sin seleccionar'}
                                    </span>
                                </div>
                                <div className="flex justify-between text-slate-300">
                                    <span>Concepto:</span>
                                    <span className="font-semibold text-white truncate max-w-[150px]">
                                        {selectedConceptoLabel}
                                    </span>
                                </div>
                                <div className="flex justify-between text-slate-300">
                                    <span>Período:</span>
                                    <span className="text-blue-200">{data.periodo_imputado || '-'}</span>
                                </div>
                                <div className="flex justify-between text-slate-300">
                                    <span>Método:</span>
                                    <span className="text-white">{selectedMetodoLabel}</span>
                                </div>
                            </div>

                            <div className="pt-2 border-t border-white/10 flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                                <ShieldCheck className="w-4 h-4 shrink-0" />
                                <span>Emisión de recibo PDF habilitada</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* BOTONES DE ACCIÓN INFERIORES */}
                <div className="flex flex-col-reverse sm:flex-row justify-end items-stretch sm:items-center gap-3 pt-4 border-t border-gray-100">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => reset()}
                        className="gap-2 w-full sm:w-auto"
                    >
                        <RotateCcw className="w-4 h-4" /> Limpiar formulario
                    </Button>
                    <Button
                        type="submit"
                        disabled={processing || !data.socio_profile_id || !data.monto}
                        className="bg-blue-600 hover:bg-blue-700 text-white gap-2 px-6 shadow-md shadow-blue-500/20 w-full sm:w-auto"
                    >
                        <Save className="w-4 h-4" /> Registrar y emitir comprobante
                    </Button>
                </div>
            </form>
        </div>
    );
}

CreatePago.layout = {
    breadcrumbs: [
        { title: 'Inicio', href: '/admin/dashboard' },
        { title: 'Pagos y Recibos', href: '/admin/pagos' },
        { title: 'Registrar nuevo pago', href: '/admin/pagos/create' },
    ],
};
