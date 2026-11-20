import { FormEvent, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { 
    CreditCard, ArrowLeft, ShieldCheck, FileText, 
    Save, RotateCcw, CheckCircle2, DollarSign, Sparkles, AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

const PRESET_BENEFICIOS = [
    'Acceso libre a pedanas de tiro en días habilitados',
    'Aranceles bonificados en torneos y competencias sociales',
    'Descuento preferencial en municiones e insumos de armería',
    'Asesoramiento técnico con instructores habilitados por ANMaC',
    'Casillero / locker en sector de polígono para resguardo de equipo',
    'Cobertura de seguro de tirador federado',
];

export default function CreateMembresia() {
    const { data, setData, post, processing, errors, reset } = useForm({
        nombre_plan: '',
        monto_mensual: '',
        cuota_ingreso: '',
        descripcion: '',
        activa: true,
    });

    const [selectedBenefits, setSelectedBenefits] = useState<string[]>([
        PRESET_BENEFICIOS[0],
        PRESET_BENEFICIOS[1],
        PRESET_BENEFICIOS[2],
    ]);

    const toggleBenefit = (benefit: string) => {
        const next = selectedBenefits.includes(benefit)
            ? selectedBenefits.filter(b => b !== benefit)
            : [...selectedBenefits, benefit];
        setSelectedBenefits(next);

        // Auto-sincronizar con la descripción si no está editada manualmente de forma compleja
        const benefitsText = next.map(b => `• ${b}`).join('\n');
        setData('descripcion', benefitsText);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post('/admin/membresias');
    };

    const fmt = (n: number) =>
        new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n);

    const cuota = Number(data.monto_mensual) || 0;
    const ingreso = Number(data.cuota_ingreso) || 0;
    const costoPrimerAno = ingreso + (cuota * 12);

    return (
        <div className="space-y-6 pb-12">
            <Head title="Añadir nuevo plan de membresía - Tiro Federal Formosa" />

            {/* Breadcrumbs y Título superior */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                        <CreditCard className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Añadir nuevo plan de membresía</h1>
                        <p className="text-sm text-muted-foreground">
                            Defina los aranceles, beneficios y condiciones del nuevo plan societario.
                        </p>
                    </div>
                </div>

                <Button variant="outline" asChild className="gap-2 w-full sm:w-auto">
                    <Link href="/admin/membresias">
                        <ArrowLeft className="w-4 h-4" /> Volver al listado
                    </Link>
                </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* COLUMNA 1 & 2: Datos Principales del Plan */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Card: Aranceles y Nombres */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
                            <div className="flex items-center gap-2 text-blue-600 font-semibold border-b border-gray-100 pb-3">
                                <CreditCard className="w-4 h-4" />
                                <span>Información del plan y valores arancelarios</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5 md:col-span-2">
                                    <Label htmlFor="nombre_plan">Nombre del plan / Categoría social *</Label>
                                    <Input
                                        id="nombre_plan"
                                        placeholder="Ej: Socio Activo Pleno, Socio Cadete o Plan Familiar"
                                        value={data.nombre_plan}
                                        onChange={(e) => setData('nombre_plan', e.target.value)}
                                        required
                                    />
                                    {errors.nombre_plan && <p className="text-xs text-red-500">{errors.nombre_plan}</p>}
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="monto_mensual">Cuota mensual ordinaria ($ ARS) *</Label>
                                    <div className="relative">
                                        <DollarSign className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                        <Input
                                            id="monto_mensual"
                                            type="number"
                                            min="0"
                                            step="100"
                                            placeholder="Ej: 12000"
                                            className="pl-9"
                                            value={data.monto_mensual}
                                            onChange={(e) => setData('monto_mensual', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground">Importe cobrado mensualmente a cada socio activo.</p>
                                    {errors.monto_mensual && <p className="text-xs text-red-500">{errors.monto_mensual}</p>}
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="cuota_ingreso">Cuota de ingreso / Matrícula inicial ($ ARS) *</Label>
                                    <div className="relative">
                                        <DollarSign className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                        <Input
                                            id="cuota_ingreso"
                                            type="number"
                                            min="0"
                                            step="100"
                                            placeholder="Ej: 20000"
                                            className="pl-9"
                                            value={data.cuota_ingreso}
                                            onChange={(e) => setData('cuota_ingreso', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground">Pago único por alta y apertura de legajo.</p>
                                    {errors.cuota_ingreso && <p className="text-xs text-red-500">{errors.cuota_ingreso}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Card: Descripción y Beneficios */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
                            <div className="flex items-center gap-2 text-blue-600 font-semibold border-b border-gray-100 pb-3">
                                <Sparkles className="w-4 h-4" />
                                <span>Beneficios incluidos y términos del plan</span>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                                        Sugerencias de beneficios institucionales (clic para alternar)
                                    </Label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {PRESET_BENEFICIOS.map((b) => {
                                            const active = selectedBenefits.includes(b);
                                            return (
                                                <button
                                                    key={b}
                                                    type="button"
                                                    onClick={() => toggleBenefit(b)}
                                                    className={`text-left p-2.5 rounded-xl border text-xs transition-all flex items-start gap-2 ${
                                                        active
                                                            ? 'border-blue-500 bg-blue-50/60 text-blue-900 font-medium'
                                                            : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                                                    }`}
                                                >
                                                    <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${active ? 'text-blue-600' : 'text-gray-300'}`} />
                                                    <span>{b}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="descripcion">Descripción detallada y alcance institucional</Label>
                                    <Textarea
                                        id="descripcion"
                                        rows={4}
                                        placeholder="Detalle de coberturas, condiciones de admisión, reglamento y alcance..."
                                        value={data.descripcion}
                                        onChange={(e) => setData('descripcion', e.target.value)}
                                        className="resize-none"
                                    />
                                    {errors.descripcion && <p className="text-xs text-red-500">{errors.descripcion}</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* COLUMNA 3: Estado, Resumen y Configuración */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Estado */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
                            <div className="flex items-center gap-2 text-blue-600 font-semibold border-b border-gray-100 pb-3">
                                <ShieldCheck className="w-4 h-4" />
                                <span>Estado y vigencia</span>
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">Plan Habilitado</p>
                                    <p className="text-xs text-muted-foreground">Disponible para asociar nuevos miembros</p>
                                </div>
                                <Switch
                                    checked={data.activa}
                                    onCheckedChange={(val) => setData('activa', val)}
                                />
                            </div>

                            <div className="text-xs text-muted-foreground space-y-1 pt-2 border-t border-gray-100">
                                <div className="flex justify-between">
                                    <span>Estado en catálogo:</span>
                                    {data.activa ? (
                                        <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">Activo</Badge>
                                    ) : (
                                        <Badge variant="outline" className="text-gray-500">Inactivo</Badge>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Vista previa de resumen financiero */}
                        <div className="bg-gradient-to-br from-blue-900 to-slate-900 rounded-2xl p-6 text-white shadow-lg space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold uppercase tracking-wider text-blue-300">Resumen Arancelario</span>
                                <Badge className="bg-blue-800/80 text-blue-200 border-blue-600/50">Proyección 1° Año</Badge>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold tracking-tight text-white line-clamp-1">
                                    {data.nombre_plan || 'Nombre del Plan'}
                                </h3>
                                <p className="text-xs text-slate-300 mt-1">
                                    {data.activa ? 'Habilitado para admisiones' : 'Borrador o inactivo'}
                                </p>
                            </div>

                            <div className="space-y-2 pt-3 border-t border-white/10 text-xs">
                                <div className="flex justify-between text-slate-300">
                                    <span>Cuota mensual:</span>
                                    <span className="font-semibold text-white">{fmt(cuota)}</span>
                                </div>
                                <div className="flex justify-between text-slate-300">
                                    <span>Ingreso inicial:</span>
                                    <span className="font-semibold text-white">{fmt(ingreso)}</span>
                                </div>
                                <div className="flex justify-between text-blue-300 pt-2 border-t border-white/10 font-bold text-sm">
                                    <span>Total primer año:</span>
                                    <span className="text-white">{fmt(costoPrimerAno)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* BOTONES DE ACCIÓN INFERIORES */}
                <div className="flex flex-col-reverse sm:flex-row justify-end items-stretch sm:items-center gap-3 pt-4 border-t border-gray-100">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => {
                            reset();
                            setSelectedBenefits([]);
                        }}
                        className="gap-2 w-full sm:w-auto"
                    >
                        <RotateCcw className="w-4 h-4" /> Limpiar formulario
                    </Button>
                    <Button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-600 hover:bg-blue-700 text-white gap-2 px-6 shadow-md shadow-blue-500/20 w-full sm:w-auto"
                    >
                        <Save className="w-4 h-4" /> Guardar plan de membresía
                    </Button>
                </div>
            </form>
        </div>
    );
}

CreateMembresia.layout = {
    breadcrumbs: [
        { title: 'Inicio', href: '/admin/dashboard' },
        { title: 'Membresías', href: '/admin/membresias' },
        { title: 'Añadir nuevo plan', href: '/admin/membresias/create' },
    ],
};
