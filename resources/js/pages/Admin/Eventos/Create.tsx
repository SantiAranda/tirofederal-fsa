import { Head, Link, useForm } from '@inertiajs/react';
import {
    ArrowLeft,
    Calendar,
    Trophy,
    Moon,
    BookOpen,
    Users,
    DollarSign,
    FileText,
    Eye,
    Save,
    AlertCircle,
} from 'lucide-react';

type TipoEvento = 'torneo' | 'tirada_nocturna' | 'curso_capacitacion';

interface FormData {
    titulo: string;
    tipo_evento: TipoEvento | '';
    descripcion: string;
    fecha_evento: string;
    cupo_maximo: string;
    costo_inscripcion: string;
    publicado: boolean;
}

const TIPOS_EVENTO: { value: TipoEvento; label: string; Icon: React.ComponentType<{ className?: string }> }[] = [
    { value: 'torneo', label: 'Torneo Deportivo', Icon: Trophy },
    { value: 'tirada_nocturna', label: 'Tirada Nocturna', Icon: Moon },
    { value: 'curso_capacitacion', label: 'Curso de Capacitación', Icon: BookOpen },
];

export default function EventosCreate() {
    const { data, setData, post, processing, errors } = useForm<FormData>({
        titulo: '',
        tipo_evento: '',
        descripcion: '',
        fecha_evento: '',
        cupo_maximo: '',
        costo_inscripcion: '0',
        publicado: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/eventos');
    };

    return (
        <>
            <Head title="Nuevo Evento — Backoffice" />

            <div className="max-w-3xl mx-auto space-y-6">
                {/* Encabezado */}
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/eventos"
                        className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                        title="Volver a Eventos"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Nuevo Evento</h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            Creá un torneo, tirada nocturna o curso de capacitación
                        </p>
                    </div>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Tarjeta principal */}
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm divide-y divide-gray-100">

                        {/* Sección: Información básica */}
                        <div className="p-6 space-y-5">
                            <h2 className="text-xs font-bold tracking-wider uppercase text-gray-400">
                                Información del Evento
                            </h2>

                            {/* Título */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    <span className="flex items-center gap-1.5">
                                        <FileText className="w-4 h-4 text-gray-400" />
                                        Título
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    value={data.titulo}
                                    onChange={e => setData('titulo', e.target.value)}
                                    placeholder="Ej: Torneo Apertura 9mm — Categoría Producción"
                                    maxLength={150}
                                    className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                                        errors.titulo
                                            ? 'border-red-300 focus:ring-red-200'
                                            : 'border-gray-200 focus:ring-blue-200 focus:border-blue-400'
                                    }`}
                                />
                                {errors.titulo && (
                                    <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                                        <AlertCircle className="w-3.5 h-3.5" /> {errors.titulo}
                                    </p>
                                )}
                            </div>

                            {/* Tipo de evento */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    <span className="flex items-center gap-1.5">
                                        <Trophy className="w-4 h-4 text-gray-400" />
                                        Tipo de evento
                                    </span>
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    {TIPOS_EVENTO.map(tipo => (
                                        <button
                                            key={tipo.value}
                                            type="button"
                                            onClick={() => setData('tipo_evento', tipo.value)}
                                            className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 text-sm font-medium transition-all cursor-pointer ${
                                                data.tipo_evento === tipo.value
                                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                    : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300 hover:bg-gray-100'
                                            }`}
                                        >
                                            <div className={`p-2.5 rounded-xl ${data.tipo_evento === tipo.value ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-500 shadow-2xs'}`}>
                                                <tipo.Icon className="w-6 h-6" />
                                            </div>
                                            <span className="text-center leading-tight">{tipo.label}</span>
                                        </button>
                                    ))}
                                </div>
                                {errors.tipo_evento && (
                                    <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                                        <AlertCircle className="w-3.5 h-3.5" /> {errors.tipo_evento}
                                    </p>
                                )}
                            </div>

                            {/* Descripción */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Descripción
                                </label>
                                <textarea
                                    value={data.descripcion}
                                    onChange={e => setData('descripcion', e.target.value)}
                                    rows={4}
                                    placeholder="Describí el evento, reglamento, categorías, premios u otra información relevante para los participantes..."
                                    className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 resize-none transition-all ${
                                        errors.descripcion
                                            ? 'border-red-300 focus:ring-red-200'
                                            : 'border-gray-200 focus:ring-blue-200 focus:border-blue-400'
                                    }`}
                                />
                                {errors.descripcion && (
                                    <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                                        <AlertCircle className="w-3.5 h-3.5" /> {errors.descripcion}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Sección: Fecha y cupos */}
                        <div className="p-6 space-y-5">
                            <h2 className="text-xs font-bold tracking-wider uppercase text-gray-400">
                                Fecha y Capacidad
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {/* Fecha */}
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                        <span className="flex items-center gap-1.5">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            Fecha y hora del evento
                                        </span>
                                    </label>
                                    <input
                                        type="datetime-local"
                                        value={data.fecha_evento}
                                        onChange={e => setData('fecha_evento', e.target.value)}
                                        className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                                            errors.fecha_evento
                                                ? 'border-red-300 focus:ring-red-200'
                                                : 'border-gray-200 focus:ring-blue-200 focus:border-blue-400'
                                        }`}
                                    />
                                    {errors.fecha_evento && (
                                        <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                                            <AlertCircle className="w-3.5 h-3.5" /> {errors.fecha_evento}
                                        </p>
                                    )}
                                </div>

                                {/* Cupo máximo */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                        <span className="flex items-center gap-1.5">
                                            <Users className="w-4 h-4 text-gray-400" />
                                            Cupo máximo
                                        </span>
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={data.cupo_maximo}
                                        onChange={e => setData('cupo_maximo', e.target.value)}
                                        placeholder="Ej: 30"
                                        className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                                            errors.cupo_maximo
                                                ? 'border-red-300 focus:ring-red-200'
                                                : 'border-gray-200 focus:ring-blue-200 focus:border-blue-400'
                                        }`}
                                    />
                                    {errors.cupo_maximo && (
                                        <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                                            <AlertCircle className="w-3.5 h-3.5" /> {errors.cupo_maximo}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Sección: Inscripción */}
                        <div className="p-6 space-y-5">
                            <h2 className="text-xs font-bold tracking-wider uppercase text-gray-400">
                                Inscripción
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Costo */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                        <span className="flex items-center gap-1.5">
                                            <DollarSign className="w-4 h-4 text-gray-400" />
                                            Costo de inscripción ($)
                                        </span>
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={data.costo_inscripcion}
                                        onChange={e => setData('costo_inscripcion', e.target.value)}
                                        placeholder="0.00"
                                        className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                                            errors.costo_inscripcion
                                                ? 'border-red-300 focus:ring-red-200'
                                                : 'border-gray-200 focus:ring-blue-200 focus:border-blue-400'
                                        }`}
                                    />
                                    {errors.costo_inscripcion && (
                                        <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                                            <AlertCircle className="w-3.5 h-3.5" /> {errors.costo_inscripcion}
                                        </p>
                                    )}
                                    <p className="mt-1.5 text-xs text-gray-400">
                                        Ingresá 0 si el evento es sin costo
                                    </p>
                                </div>

                                {/* Publicado */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                        <span className="flex items-center gap-1.5">
                                            <Eye className="w-4 h-4 text-gray-400" />
                                            Visibilidad
                                        </span>
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => setData('publicado', !data.publicado)}
                                        className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                                            data.publicado
                                                ? 'border-emerald-400 bg-emerald-50 text-emerald-700'
                                                : 'border-gray-200 bg-gray-50 text-gray-500'
                                        }`}
                                    >
                                        <div
                                            className={`w-10 h-5 rounded-full flex items-center transition-all ${
                                                data.publicado ? 'bg-emerald-500' : 'bg-gray-300'
                                            }`}
                                        >
                                            <div
                                                className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform mx-0.5 ${
                                                    data.publicado ? 'translate-x-5' : 'translate-x-0'
                                                }`}
                                            />
                                        </div>
                                        <span>
                                            {data.publicado
                                                ? 'Publicado en el portal público'
                                                : 'Guardado como borrador'}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Botones */}
                    <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pb-8">
                        <Link
                            href="/admin/eventos"
                            className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors text-center"
                        >
                            Cancelar
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold text-sm shadow-md shadow-blue-500/25 transition-all"
                        >
                            <Save className="w-4 h-4" />
                            {processing ? 'Guardando...' : 'Crear Evento'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

EventosCreate.layout = {
    breadcrumbs: [
        { title: 'Inicio', href: '/admin/dashboard' },
        { title: 'Eventos', href: '/admin/eventos' },
        { title: 'Nuevo Evento', href: '/admin/eventos/create' },
    ],
};
