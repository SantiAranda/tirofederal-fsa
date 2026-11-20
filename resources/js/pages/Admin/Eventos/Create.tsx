import { FormEvent } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    ArrowLeft, Calendar, Trophy, Moon, BookOpen, Users,
    DollarSign, FileText, Save, RotateCcw, ShieldCheck, Sparkles, CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

type TipoEvento = 'torneo' | 'tirada_nocturna' | 'curso_capacitacion';

const TIPOS_EVENTO: { value: TipoEvento; label: string; desc: string; Icon: React.ComponentType<{ className?: string }> }[] = [
    { value: 'torneo', label: 'Torneo Deportivo', desc: 'Competencia oficial por categorías y puntajes federados', Icon: Trophy },
    { value: 'tirada_nocturna', label: 'Tirada Nocturna', desc: 'Jornada nocturna con iluminación de pedanas y siluetas', Icon: Moon },
    { value: 'curso_capacitacion', label: 'Curso / Capacitación', desc: 'Clínica técnica con instructores ITA/ITB habilitados', Icon: BookOpen },
];

export default function CreateEvento() {
    const { data, setData, post, processing, errors, reset } = useForm({
        titulo: '',
        tipo_evento: 'torneo' as TipoEvento,
        descripcion: '',
        fecha_evento: '',
        cupo_maximo: '',
        costo_inscripcion: '',
        publicado: true,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post('/admin/eventos');
    };

    const fmt = (n: number) =>
        new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n);

    const arancelNum = Number(data.costo_inscripcion) || 0;
    const cupoNum = Number(data.cupo_maximo) || 0;
    const recaudacionPotencial = arancelNum * cupoNum;
    const selectedTipo = TIPOS_EVENTO.find(t => t.value === data.tipo_evento) || TIPOS_EVENTO[0];
    const TipoIcon = selectedTipo.Icon;

    return (
        <div className="space-y-6 pb-12">
            <Head title="Añadir nuevo evento o torneo - Tiro Federal Formosa" />

            {/* Breadcrumbs y Título superior */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                        <Trophy className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Añadir nuevo evento o torneo</h1>
                        <p className="text-sm text-muted-foreground">
                            Programe un torneo deportivo, tirada nocturna o clínica de tiro.
                        </p>
                    </div>
                </div>

                <Button variant="outline" asChild className="gap-2">
                    <Link href="/admin/eventos">
                        <ArrowLeft className="w-4 h-4" /> Volver al listado
                    </Link>
                </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* COLUMNA 1 & 2: Información del Certamen y Cronograma */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Card: Información Básica y Disciplina */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
                            <div className="flex items-center gap-2 text-blue-600 font-semibold border-b border-gray-100 pb-3">
                                <Trophy className="w-4 h-4" />
                                <span>Información del certamen o actividad</span>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="titulo">Título o Denominación del evento *</Label>
                                    <Input
                                        id="titulo"
                                        placeholder="Ej: Torneo Apertura 9mm — Categoría Producción o Tirada de Precisión .22"
                                        value={data.titulo}
                                        onChange={(e) => setData('titulo', e.target.value)}
                                        maxLength={150}
                                        required
                                    />
                                    {errors.titulo && <p className="text-xs text-red-500">{errors.titulo}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label>Modalidad / Tipo de certamen *</Label>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        {TIPOS_EVENTO.map((t) => {
                                            const IconComp = t.Icon;
                                            const active = data.tipo_evento === t.value;
                                            return (
                                                <button
                                                    key={t.value}
                                                    type="button"
                                                    onClick={() => setData('tipo_evento', t.value)}
                                                    className={`p-3.5 rounded-xl border text-left transition-all flex flex-col gap-2 ${
                                                        active
                                                            ? 'border-blue-600 bg-blue-50/70 ring-1 ring-blue-500 shadow-sm'
                                                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/50'
                                                    }`}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div className={`p-2 rounded-lg ${active ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                                                            <IconComp className="w-4 h-4" />
                                                        </div>
                                                        {active && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                                                    </div>
                                                    <div>
                                                        <p className={`text-xs font-semibold ${active ? 'text-blue-900' : 'text-gray-900'}`}>{t.label}</p>
                                                        <p className="text-[11px] text-muted-foreground line-clamp-2 mt-0.5">{t.desc}</p>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                    {errors.tipo_evento && <p className="text-xs text-red-500">{errors.tipo_evento}</p>}
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="descripcion">Reglamento, descripción y requisitos *</Label>
                                    <Textarea
                                        id="descripcion"
                                        rows={4}
                                        placeholder="Detalle de etapas, cantidad mínima de disparos, calibres admitidos, equipamiento de seguridad y premiación..."
                                        value={data.descripcion}
                                        onChange={(e) => setData('descripcion', e.target.value)}
                                        required
                                        className="resize-none"
                                    />
                                    {errors.descripcion && <p className="text-xs text-red-500">{errors.descripcion}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Card: Fechas, Cupos y Aranceles */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
                            <div className="flex items-center gap-2 text-blue-600 font-semibold border-b border-gray-100 pb-3">
                                <Calendar className="w-4 h-4" />
                                <span>Cronograma, capacidad y arancel</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-1.5 md:col-span-1">
                                    <Label htmlFor="fecha_evento">Fecha y hora del evento *</Label>
                                    <Input
                                        id="fecha_evento"
                                        type="datetime-local"
                                        value={data.fecha_evento}
                                        onChange={(e) => setData('fecha_evento', e.target.value)}
                                        required
                                    />
                                    {errors.fecha_evento && <p className="text-xs text-red-500">{errors.fecha_evento}</p>}
                                </div>

                                <div className="space-y-1.5 md:col-span-1">
                                    <Label htmlFor="cupo_maximo">Cupo máximo de tiradores *</Label>
                                    <div className="relative">
                                        <Users className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                        <Input
                                            id="cupo_maximo"
                                            type="number"
                                            min="1"
                                            placeholder="Ej: 30"
                                            className="pl-9"
                                            value={data.cupo_maximo}
                                            onChange={(e) => setData('cupo_maximo', e.target.value)}
                                            required
                                        />
                                    </div>
                                    {errors.cupo_maximo && <p className="text-xs text-red-500">{errors.cupo_maximo}</p>}
                                </div>

                                <div className="space-y-1.5 md:col-span-1">
                                    <Label htmlFor="costo_inscripcion">Arancel de inscripción ($) *</Label>
                                    <div className="relative">
                                        <DollarSign className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                        <Input
                                            id="costo_inscripcion"
                                            type="number"
                                            min="0"
                                            step="100"
                                            placeholder="Ej: 5000 (0 = Gratuito)"
                                            className="pl-9"
                                            value={data.costo_inscripcion}
                                            onChange={(e) => setData('costo_inscripcion', e.target.value)}
                                            required
                                        />
                                    </div>
                                    {errors.costo_inscripcion && <p className="text-xs text-red-500">{errors.costo_inscripcion}</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* COLUMNA 3: Publicación y Vista Previa */}
                    <div className="lg:col-span-1 space-y-6">
                        
                        {/* Estado y Visibilidad */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
                            <div className="flex items-center gap-2 text-blue-600 font-semibold border-b border-gray-100 pb-3">
                                <ShieldCheck className="w-4 h-4" />
                                <span>Publicación e inscripciones</span>
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">Publicar de inmediato</p>
                                    <p className="text-xs text-muted-foreground">Visible en cartelera pública y portal de socios</p>
                                </div>
                                <Switch
                                    checked={data.publicado}
                                    onCheckedChange={(val) => setData('publicado', val)}
                                />
                            </div>

                            <div className="text-xs text-muted-foreground space-y-2 pt-2 border-t border-gray-100">
                                <div className="flex justify-between items-center">
                                    <span>Cupos iniciales disponibles:</span>
                                    <Badge className="bg-blue-100 text-blue-800 border-blue-200">{cupoNum || '0'} lugares</Badge>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Estado en portal:</span>
                                    {data.publicado ? (
                                        <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">Publicado</Badge>
                                    ) : (
                                        <Badge variant="outline" className="text-gray-500">Borrador</Badge>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Tarjeta de Resumen / Credencial del Evento */}
                        <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-6 text-white shadow-xl space-y-4 border border-blue-800/40">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5 text-blue-300 text-xs font-semibold uppercase tracking-wider">
                                    <TipoIcon className="w-4 h-4" />
                                    <span>{selectedTipo.label}</span>
                                </div>
                                <Badge className="bg-blue-600 text-white text-[10px]">Polígono Principal</Badge>
                            </div>

                            <div className="pt-1">
                                <h3 className="text-lg font-bold tracking-tight text-white line-clamp-2">
                                    {data.titulo || 'Título del Evento o Torneo'}
                                </h3>
                                <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                                    {data.descripcion || 'Sin descripción ingresada aún'}
                                </p>
                            </div>

                            <div className="space-y-2 pt-3 border-t border-white/10 text-xs">
                                <div className="flex justify-between text-slate-300">
                                    <span>Fecha programada:</span>
                                    <span className="font-semibold text-white">
                                        {data.fecha_evento ? new Date(data.fecha_evento).toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'short' }) : 'A definir'}
                                    </span>
                                </div>
                                <div className="flex justify-between text-slate-300">
                                    <span>Cupo total:</span>
                                    <span className="font-semibold text-white">{cupoNum} participantes</span>
                                </div>
                                <div className="flex justify-between text-slate-300">
                                    <span>Inscripción:</span>
                                    <span className="font-semibold text-emerald-400">{arancelNum > 0 ? fmt(arancelNum) : 'Gratuito'}</span>
                                </div>
                                <div className="flex justify-between text-blue-300 pt-2 border-t border-white/10 font-bold text-sm">
                                    <span>Recaudación estimada:</span>
                                    <span className="text-white">{fmt(recaudacionPotencial)}</span>
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
                        <Save className="w-4 h-4" /> Guardar evento
                    </Button>
                </div>
            </form>
        </div>
    );
}

CreateEvento.layout = {
    breadcrumbs: [
        { title: 'Inicio', href: '/admin/dashboard' },
        { title: 'Eventos y Torneos', href: '/admin/eventos' },
        { title: 'Añadir nuevo evento', href: '/admin/eventos/create' },
    ],
};
