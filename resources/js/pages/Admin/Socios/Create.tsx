import { useState, FormEvent } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { 
    UserPlus, ArrowLeft, User, CreditCard, FileText, 
    Save, RotateCcw, ShieldCheck, Upload, CheckCircle2 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Membresia {
    id: number;
    nombre_plan: string;
    monto_mensual: number;
}

interface Props {
    membresias: Membresia[];
}

export default function CreateSocio({ membresias = [] }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        nombre: '',
        apellido: '',
        dni: '',
        fecha_nacimiento: '',
        genero: 'M',
        telefono: '',
        email: '',
        username: '',
        domicilio: '',
        localidad: 'Formosa',
        codigo_postal: '3600',
        membresia_id: membresias.length > 0 ? String(membresias[0].id) : '',
        fecha_alta: new Date().toISOString().split('T')[0],
        estado_habilitacion: 'activo',
        numero_socio: '',
        numero_legajo_clu: '',
        fecha_vencimiento_clu: '',
        observaciones: '',
        profesion: '',
        como_nos_conocio: '',
        posee_arma_propia: false,
        recibir_novedades: true,
        password: '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Generar username automático si está vacío a partir del DNI
        if (!data.username && data.dni) {
            data.username = `socio_${data.dni}`;
        }
        post('/admin/socios');
    };

    return (
        <div className="space-y-6 pb-12">
            <Head title="Añadir nuevo socio - Tiro Federal Formosa" />

            {/* Breadcrumbs y Título superior */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                        <UserPlus className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Añadir nuevo socio</h1>
                        <p className="text-sm text-muted-foreground">
                            Complete los datos para registrar un nuevo miembro del club.
                        </p>
                    </div>
                </div>

                <Button variant="outline" asChild className="gap-2">
                    <Link href="/admin/socios">
                        <ArrowLeft className="w-4 h-4" /> Volver al listado
                    </Link>
                </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* COLUMNA 1 & 2: Datos Personales (2 cols en pantallas grandes) */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
                            <div className="flex items-center gap-2 text-blue-600 font-semibold border-b border-gray-100 pb-3">
                                <User className="w-4 h-4" />
                                <span>Datos personales</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="nombre">Nombre completo / Nombres *</Label>
                                    <Input
                                        id="nombre"
                                        placeholder="Ej: Juan Carlos"
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
                                        placeholder="Ej: Pérez"
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
                                        placeholder="Ej: 34567890"
                                        value={data.dni}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            setData((prev) => ({
                                                ...prev,
                                                dni: val,
                                                username: prev.username || (val ? `socio_${val}` : '')
                                            }));
                                        }}
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
                                    <Label htmlFor="genero">Género</Label>
                                    <select
                                        id="genero"
                                        className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                        value={data.genero}
                                        onChange={(e) => setData('genero', e.target.value)}
                                    >
                                        <option value="M">Masculino</option>
                                        <option value="F">Femenino</option>
                                        <option value="Otro">Otro</option>
                                    </select>
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="telefono">Teléfono / WhatsApp *</Label>
                                    <Input
                                        id="telefono"
                                        placeholder="Ej: 3704 123456"
                                        value={data.telefono}
                                        onChange={(e) => setData('telefono', e.target.value)}
                                    />
                                </div>

                                <div className="md:col-span-2 space-y-1.5">
                                    <Label htmlFor="email">Correo electrónico *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Ej: juan.perez@gmail.com"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                    />
                                    {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                                </div>

                                <div className="md:col-span-2 space-y-1.5">
                                    <Label htmlFor="domicilio">Domicilio completo</Label>
                                    <Input
                                        id="domicilio"
                                        placeholder="Ej: Calle, número, barrio, ciudad"
                                        value={data.domicilio}
                                        onChange={(e) => setData('domicilio', e.target.value)}
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="localidad">Localidad / Provincia</Label>
                                    <Input
                                        id="localidad"
                                        placeholder="Ej: Formosa, Formosa"
                                        value={data.localidad}
                                        onChange={(e) => setData('localidad', e.target.value)}
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="codigo_postal">Código Postal</Label>
                                    <Input
                                        id="codigo_postal"
                                        placeholder="Ej: 3600"
                                        value={data.codigo_postal}
                                        onChange={(e) => setData('codigo_postal', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* COLUMNA 3: Membresía y Documentación */}
                    <div className="space-y-6">
                        {/* Membresía */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
                            <div className="flex items-center gap-2 text-blue-600 font-semibold border-b border-gray-100 pb-3">
                                <CreditCard className="w-4 h-4" />
                                <span>Membresía</span>
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="membresia_id">Categoría de socio *</Label>
                                <select
                                    id="membresia_id"
                                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                    value={data.membresia_id}
                                    onChange={(e) => setData('membresia_id', e.target.value)}
                                >
                                    <option value="">Seleccione categoría</option>
                                    {membresias.map((m) => (
                                        <option key={m.id} value={m.id}>
                                            {m.nombre_plan} (${Number(m.monto_mensual).toLocaleString('es-AR')}/mes)
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1.5">
                                    <Label htmlFor="fecha_alta">Fecha de alta</Label>
                                    <Input
                                        id="fecha_alta"
                                        type="date"
                                        value={data.fecha_alta}
                                        onChange={(e) => setData('fecha_alta', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="estado_habilitacion">Estado</Label>
                                    <select
                                        id="estado_habilitacion"
                                        className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                        value={data.estado_habilitacion}
                                        onChange={(e) => setData('estado_habilitacion', e.target.value)}
                                    >
                                        <option value="activo">Activo</option>
                                        <option value="pendiente_validacion">Pendiente</option>
                                        <option value="en_mora">En Mora</option>
                                        <option value="suspendido">Suspendido</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Documentación CLU (ANMaC) */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
                            <div className="flex items-center gap-2 text-blue-600 font-semibold border-b border-gray-100 pb-3">
                                <FileText className="w-4 h-4" />
                                <span>Documentación CLU</span>
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="numero_legajo_clu">CLU (Legítimo Usuario)</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="numero_legajo_clu"
                                        placeholder="Ej: LU 1234567"
                                        value={data.numero_legajo_clu}
                                        onChange={(e) => setData('numero_legajo_clu', e.target.value)}
                                    />
                                    <Button type="button" variant="outline" size="sm" className="gap-1 shrink-0">
                                        <Upload className="w-3.5 h-3.5" /> Subir
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="fecha_vencimiento_clu">Fecha de vencimiento CLU</Label>
                                <Input
                                    id="fecha_vencimiento_clu"
                                    type="date"
                                    value={data.fecha_vencimiento_clu}
                                    onChange={(e) => setData('fecha_vencimiento_clu', e.target.value)}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="observaciones">Observaciones</Label>
                                <textarea
                                    id="observaciones"
                                    rows={2}
                                    className="w-full p-2.5 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                    placeholder="Información adicional (opcional)"
                                    value={data.observaciones}
                                    onChange={(e) => setData('observaciones', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* FILA INFERIOR: Información adicional */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
                    <div className="flex items-center gap-2 text-blue-600 font-semibold border-b border-gray-100 pb-3">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Información adicional</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                        <div className="space-y-1.5">
                            <Label htmlFor="profesion">Profesión / Ocupación</Label>
                            <Input
                                id="profesion"
                                placeholder="Ej: Docente"
                                value={data.profesion}
                                onChange={(e) => setData('profesion', e.target.value)}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="como_nos_conocio">¿Cómo nos conoció?</Label>
                            <select
                                id="como_nos_conocio"
                                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                value={data.como_nos_conocio}
                                onChange={(e) => setData('como_nos_conocio', e.target.value)}
                            >
                                <option value="">Seleccione una opción</option>
                                <option value="redes_sociales">Redes Sociales</option>
                                <option value="recomendacion">Recomendación</option>
                                <option value="web">Búsqueda Web</option>
                                <option value="otro">Otro</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label>¿Posee arma propia?</Label>
                            <div className="flex items-center gap-4 text-sm">
                                <label className="flex items-center gap-1.5 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="posee_arma"
                                        checked={data.posee_arma_propia === true}
                                        onChange={() => setData('posee_arma_propia', true)}
                                    />
                                    Sí
                                </label>
                                <label className="flex items-center gap-1.5 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="posee_arma"
                                        checked={data.posee_arma_propia === false}
                                        onChange={() => setData('posee_arma_propia', false)}
                                    />
                                    No
                                </label>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>¿Desea recibir novedades?</Label>
                            <label className="flex items-center gap-2 text-sm cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={data.recibir_novedades}
                                    onChange={(e) => setData('recibir_novedades', e.target.checked)}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                Sí, quiero recibir información
                            </label>
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
                        <Save className="w-4 h-4" /> Guardar socio
                    </Button>
                </div>
            </form>
        </div>
    );
}



CreateSocio.layout = {
    breadcrumbs: [{ title: 'Inicio', href: '/admin/dashboard' }, { title: 'Socios', href: '/admin/socios' }, { title: 'A�adir nuevo socio', href: '/admin/socios/create' }],
};
