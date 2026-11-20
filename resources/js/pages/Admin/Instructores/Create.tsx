import { FormEvent } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { 
    GraduationCap, ArrowLeft, User, Award, 
    Save, RotateCcw, ShieldCheck, Mail, Phone, Lock, Star, CheckCircle2 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

const ESPECIALIDADES_SUGERIDAS = [
    'Pistola Grueso Calibre e IPSC / Tiro Dinámico',
    'Tiro Neumático y Carabina .22 Precisión',
    'Fusil de Caza y Polígono General',
    'Seguridad y Manejo de Armas de Fuego (Curso Inicial)',
    'Tiro al Vuelo / Escopeta',
    'Instrucción Táctica y Tiro Defensivo',
];

export default function CreateInstructor() {
    const { data, setData, post, processing, errors, reset } = useForm({
        nombre: '',
        apellido: '',
        dni: '',
        fecha_nacimiento: '',
        email: '',
        telefono: '',
        username: '',
        password: '',
        matricula_habilitante: '',
        especialidad: ESPECIALIDADES_SUGERIDAS[0],
        disponible: true,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Generar username automático si está vacío
        if (!data.username && data.dni) {
            data.username = `instructor_${data.dni}`;
        }
        post('/admin/instructores');
    };

    return (
        <div className="space-y-6 pb-12">
            <Head title="Añadir nuevo instructor - Tiro Federal Formosa" />

            {/* Breadcrumbs y Título superior */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                        <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Añadir nuevo instructor</h1>
                        <p className="text-sm text-muted-foreground">
                            Complete los datos personales y de habilitación ANMaC del nuevo instructor de tiro.
                        </p>
                    </div>
                </div>

                <Button variant="outline" asChild className="gap-2">
                    <Link href="/admin/instructores">
                        <ArrowLeft className="w-4 h-4" /> Volver al listado
                    </Link>
                </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* COLUMNA 1 & 2: Datos Personales e Instrucción */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Card: Datos Personales */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
                            <div className="flex items-center gap-2 text-blue-600 font-semibold border-b border-gray-100 pb-3">
                                <User className="w-4 h-4" />
                                <span>Datos personales y de contacto</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="nombre">Nombre completo / Nombres *</Label>
                                    <Input
                                        id="nombre"
                                        placeholder="Ej: Carlos Alberto"
                                        value={data.nombre}
                                        onChange={(e) => setData('nombre', e.target.value)}
                                        required
                                    />
                                    {errors.nombre && <p className="text-xs text-red-500">{errors.nombre}</p>}
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="apellido">Apellido(s) *</Label>
                                    <Input
                                        id="apellido"
                                        placeholder="Ej: Rodríguez"
                                        value={data.apellido}
                                        onChange={(e) => setData('apellido', e.target.value)}
                                        required
                                    />
                                    {errors.apellido && <p className="text-xs text-red-500">{errors.apellido}</p>}
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="dni">DNI / Documento *</Label>
                                    <Input
                                        id="dni"
                                        placeholder="Ej: 28456123"
                                        value={data.dni}
                                        onChange={(e) => setData('dni', e.target.value)}
                                        required
                                    />
                                    {errors.dni && <p className="text-xs text-red-500">{errors.dni}</p>}
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="fecha_nacimiento">Fecha de nacimiento *</Label>
                                    <Input
                                        id="fecha_nacimiento"
                                        type="date"
                                        value={data.fecha_nacimiento}
                                        onChange={(e) => setData('fecha_nacimiento', e.target.value)}
                                        required
                                    />
                                    {errors.fecha_nacimiento && <p className="text-xs text-red-500">{errors.fecha_nacimiento}</p>}
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="email">Correo electrónico *</Label>
                                    <div className="relative">
                                        <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="carlos.rodriguez@email.com"
                                            className="pl-9"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            required
                                        />
                                    </div>
                                    {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="telefono">Teléfono / WhatsApp</Label>
                                    <div className="relative">
                                        <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                        <Input
                                            id="telefono"
                                            placeholder="Ej: 3704 554433"
                                            className="pl-9"
                                            value={data.telefono}
                                            onChange={(e) => setData('telefono', e.target.value)}
                                        />
                                    </div>
                                    {errors.telefono && <p className="text-xs text-red-500">{errors.telefono}</p>}
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="username">Usuario para el sistema (opcional)</Label>
                                    <Input
                                        id="username"
                                        placeholder="Ej: instructor_carlos (autogenerado si vacío)"
                                        value={data.username}
                                        onChange={(e) => setData('username', e.target.value)}
                                    />
                                    {errors.username && <p className="text-xs text-red-500">{errors.username}</p>}
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="password">Contraseña inicial (opcional)</Label>
                                    <div className="relative">
                                        <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="Por defecto: InstructorFsa123!"
                                            className="pl-9"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                        />
                                    </div>
                                    {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Card: Habilitación ANMaC y Especialidades */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
                            <div className="flex items-center gap-2 text-blue-600 font-semibold border-b border-gray-100 pb-3">
                                <Award className="w-4 h-4" />
                                <span>Habilitación profesional ANMaC y disciplina</span>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="matricula_habilitante">Matrícula de Instructor ANMaC (ITA / ITB) *</Label>
                                    <Input
                                        id="matricula_habilitante"
                                        placeholder="Ej: ITA-ANMaC-45812 o ITB-ANMaC-90231"
                                        value={data.matricula_habilitante}
                                        onChange={(e) => setData('matricula_habilitante', e.target.value)}
                                        required
                                    />
                                    <p className="text-xs text-muted-foreground">Número oficial expedido por la Agencia Nacional de Materiales Controlados.</p>
                                    {errors.matricula_habilitante && <p className="text-xs text-red-500">{errors.matricula_habilitante}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="especialidad">Especialidad de instrucción principal *</Label>
                                    <Input
                                        id="especialidad"
                                        placeholder="Ej: Pistola Grueso Calibre e IPSC"
                                        value={data.especialidad}
                                        onChange={(e) => setData('especialidad', e.target.value)}
                                        required
                                    />
                                    {errors.especialidad && <p className="text-xs text-red-500">{errors.especialidad}</p>}

                                    <div className="pt-2">
                                        <p className="text-xs text-muted-foreground mb-1.5 font-medium">Sugerencias rápidas:</p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {ESPECIALIDADES_SUGERIDAS.map((esp) => (
                                                <button
                                                    key={esp}
                                                    type="button"
                                                    onClick={() => setData('especialidad', esp)}
                                                    className="px-2.5 py-1 text-xs rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors"
                                                >
                                                    {esp}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* COLUMNA 3: Disponibilidad y Credencial Preview */}
                    <div className="lg:col-span-1 space-y-6">

                        {/* Disponibilidad */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
                            <div className="flex items-center gap-2 text-blue-600 font-semibold border-b border-gray-100 pb-3">
                                <ShieldCheck className="w-4 h-4" />
                                <span>Disponibilidad operativa</span>
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">Disponible para turnos</p>
                                    <p className="text-xs text-muted-foreground">Los socios pueden agendar clases con él</p>
                                </div>
                                <Switch
                                    checked={data.disponible}
                                    onCheckedChange={(val) => setData('disponible', val)}
                                />
                            </div>

                            <div className="text-xs text-muted-foreground space-y-2 pt-2 border-t border-gray-100">
                                <div className="flex justify-between items-center">
                                    <span>Calificación inicial:</span>
                                    <span className="flex items-center gap-1 font-semibold text-amber-600">
                                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                                        5.00
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Rol en sistema:</span>
                                    <Badge className="bg-blue-100 text-blue-800 border-blue-200">Instructor de Tiro</Badge>
                                </div>
                            </div>
                        </div>

                        {/* Credencial Preview */}
                        <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-6 text-white shadow-xl space-y-4 border border-blue-800/40">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold tracking-wider uppercase text-blue-300">Cuerpo de Instructores</span>
                                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-400/30 text-[10px]">ANMaC</Badge>
                            </div>

                            <div className="flex items-center gap-3 pt-2">
                                <div className="w-12 h-12 rounded-xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-blue-200 text-lg font-bold">
                                    {data.nombre ? data.nombre.charAt(0) : 'I'}
                                    {data.apellido ? data.apellido.charAt(0) : 'N'}
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-white line-clamp-1">
                                        {data.nombre || data.apellido ? `${data.nombre} ${data.apellido}` : 'Nombre del Instructor'}
                                    </h3>
                                    <p className="text-xs text-blue-300 font-mono">
                                        {data.matricula_habilitante || 'ITA-ANMaC-00000'}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-2 pt-3 border-t border-white/10 text-xs">
                                <div className="flex justify-between text-slate-300">
                                    <span>Especialidad:</span>
                                    <span className="font-semibold text-white truncate max-w-[150px]">
                                        {data.especialidad || 'Sin especialidad'}
                                    </span>
                                </div>
                                <div className="flex justify-between text-slate-300">
                                    <span>DNI:</span>
                                    <span className="text-white">{data.dni || '-'}</span>
                                </div>
                                <div className="flex justify-between text-slate-300">
                                    <span>Estado:</span>
                                    <span className="text-emerald-400 font-medium">
                                        {data.disponible ? 'Habilitado y Activo' : 'No disponible'}
                                    </span>
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
                        <Save className="w-4 h-4" /> Guardar instructor
                    </Button>
                </div>
            </form>
        </div>
    );
}

CreateInstructor.layout = {
    breadcrumbs: [
        { title: 'Inicio', href: '/admin/dashboard' },
        { title: 'Instructores', href: '/admin/instructores' },
        { title: 'Añadir nuevo instructor', href: '/admin/instructores/create' },
    ],
};
