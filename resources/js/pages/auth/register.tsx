import { Head, Link, useForm } from '@inertiajs/react';
import { Mail, Lock, User, Phone, MapPin, Calendar, CheckCircle2, ArrowLeft, UploadCloud, FileText, ShieldCheck } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import InputError from '@/components/input-error';

type Props = {
    passwordRules?: string;
};

export default function Register({ passwordRules }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm<{
        name: string;
        nombre: string;
        apellido: string;
        dni: string;
        fecha_nacimiento: string;
        telefono: string;
        domicilio: string;
        usuario: string;
        username: string;
        email: string;
        password: string;
        password_confirmation: string;
        archivo_dni: File | null;
        archivo_clu: File | null;
        terminos: boolean;
        novedades: boolean;
    }>({
        name: '',
        nombre: '',
        apellido: '',
        dni: '',
        fecha_nacimiento: '',
        telefono: '',
        domicilio: '',
        usuario: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        archivo_dni: null,
        archivo_clu: null,
        terminos: false,
        novedades: true,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/register', {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen w-full bg-[#0c111d] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
            <Head title="Asociate al Club - Tiro Federal Formosa" />

            <div className="flex-1 flex flex-col lg:flex-row w-full min-h-screen">
                {/* ══════════════════════════════════════════════
                    COLUMNA IZQUIERDA: Formulario de Registro (50%)
                   ══════════════════════════════════════════════ */}
                <div className="w-full lg:w-1/2 flex flex-col justify-between bg-[#0c111d] border-r border-slate-800/80 px-6 sm:px-10 lg:px-14 py-8 z-10 overflow-y-auto">
                    {/* Header */}
                    <div className="w-full flex items-center justify-between pb-6">
                        <Link href="/" className="flex items-center gap-3 group">
                            <img
                                src="/images/logo.png"
                                alt="Logo Tiro Federal Formosa"
                                className="w-10 h-10 sm:w-11 sm:h-11 object-contain drop-shadow group-hover:scale-105 transition-transform"
                            />
                            <div className="flex flex-col justify-center -space-y-1 select-none">
                                <span className="text-xs sm:text-sm font-bold tracking-wide text-slate-200 group-hover:text-white transition-colors leading-none">
                                    Tiro Federal
                                </span>
                                <span className="text-lg sm:text-xl font-black tracking-tight text-white uppercase group-hover:text-blue-400 transition-colors leading-none pt-0.5">
                                    Formosa
                                </span>
                            </div>
                        </Link>

                        <Link
                            href="/login"
                            className="text-xs sm:text-sm font-medium text-slate-400 hover:text-white transition-colors"
                        >
                            ¿Ya sos socio? <span className="text-blue-400 font-semibold ml-1">Ingresar</span>
                        </Link>
                    </div>

                    {/* Contenido Central */}
                    <div className="max-w-2xl w-full mx-auto my-auto py-6 space-y-6">
                        <div>
                            <span className="text-[11px] font-bold tracking-[0.2em] text-slate-400 uppercase block">
                                Solicitud de Admisión
                            </span>
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1.5">
                                Hacete socio del club<span className="text-blue-500">.</span>
                            </h1>
                            <p className="text-xs sm:text-sm text-slate-400 mt-2">
                                Completá tus datos para iniciar tu legajo institucional conforme al reglamento ANMaC.
                            </p>
                        </div>

                        <form onSubmit={submit} className="space-y-3.5 pt-1">
                            {/* 1 y 2: Nombre y Apellido */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                <div>
                                    <div className="rounded-2xl bg-[#192233] border border-slate-700/70 py-2.5 px-4.5 sm:py-3 sm:px-5 transition-all focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/30">
                                        <label className="text-[10px] font-bold tracking-wider uppercase text-slate-400 select-none block">
                                            Nombre *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={data.nombre}
                                            onChange={(e) => {
                                                setData({
                                                    ...data,
                                                    nombre: e.target.value,
                                                    name: e.target.value,
                                                });
                                            }}
                                            placeholder="Ej: Juan Carlos"
                                            className="w-full bg-transparent border-0 p-0 pt-0.5 text-sm sm:text-base text-white placeholder:text-slate-500 focus:outline-none focus:ring-0"
                                        />
                                    </div>
                                    <InputError message={errors.nombre || errors.name} className="mt-1" />
                                </div>

                                <div>
                                    <div className="rounded-2xl bg-[#192233] border border-slate-700/70 py-2.5 px-4.5 sm:py-3 sm:px-5 transition-all focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/30">
                                        <label className="text-[10px] font-bold tracking-wider uppercase text-slate-400 select-none block">
                                            Apellido *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={data.apellido}
                                            onChange={(e) => setData('apellido', e.target.value)}
                                            placeholder="Ej: Pérez"
                                            className="w-full bg-transparent border-0 p-0 pt-0.5 text-sm sm:text-base text-white placeholder:text-slate-500 focus:outline-none focus:ring-0"
                                        />
                                    </div>
                                    <InputError message={errors.apellido} className="mt-1" />
                                </div>
                            </div>

                            {/* DNI y Fecha Nacimiento */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                <div>
                                    <div className="rounded-2xl bg-[#192233] border border-slate-700/70 py-2.5 px-4.5 sm:py-3 sm:px-5 transition-all focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/30">
                                        <label className="text-[10px] font-bold tracking-wider uppercase text-slate-400 select-none block">
                                            DNI *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={data.dni}
                                            onChange={(e) => setData('dni', e.target.value)}
                                            placeholder="Sin puntos: 35123456"
                                            className="w-full bg-transparent border-0 p-0 pt-0.5 text-sm sm:text-base text-white placeholder:text-slate-500 focus:outline-none focus:ring-0"
                                        />
                                    </div>
                                    <InputError message={errors.dni} className="mt-1" />
                                </div>

                                <div>
                                    <div className="rounded-2xl bg-[#192233] border border-slate-700/70 py-2.5 px-4.5 sm:py-3 sm:px-5 transition-all focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/30">
                                        <label className="text-[10px] font-bold tracking-wider uppercase text-slate-400 select-none block">
                                            Fecha Nacimiento *
                                        </label>
                                        <input
                                            type="date"
                                            required
                                            value={data.fecha_nacimiento}
                                            onChange={(e) => setData('fecha_nacimiento', e.target.value)}
                                            className="w-full bg-transparent border-0 p-0 pt-0.5 text-sm sm:text-base text-white placeholder:text-slate-500 focus:outline-none focus:ring-0"
                                        />
                                    </div>
                                    <InputError message={errors.fecha_nacimiento} className="mt-1" />
                                </div>
                            </div>

                            {/* Teléfono y Nombre de Usuario */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                <div>
                                    <div className="rounded-2xl bg-[#192233] border border-slate-700/70 py-2.5 px-4.5 sm:py-3 sm:px-5 transition-all focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/30">
                                        <label className="text-[10px] font-bold tracking-wider uppercase text-slate-400 select-none block">
                                            Teléfono *
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            value={data.telefono}
                                            onChange={(e) => setData('telefono', e.target.value)}
                                            placeholder="3704 123456"
                                            className="w-full bg-transparent border-0 p-0 pt-0.5 text-sm sm:text-base text-white placeholder:text-slate-500 focus:outline-none focus:ring-0"
                                        />
                                    </div>
                                    <InputError message={errors.telefono} className="mt-1" />
                                </div>

                                <div>
                                    <div className="rounded-2xl bg-[#192233] border border-slate-700/70 py-2.5 px-4.5 sm:py-3 sm:px-5 transition-all focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/30">
                                        <label className="text-[10px] font-bold tracking-wider uppercase text-slate-400 select-none block">
                                            Nombre de Usuario *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={data.usuario}
                                            onChange={(e) => {
                                                setData({
                                                    ...data,
                                                    usuario: e.target.value,
                                                    username: e.target.value,
                                                });
                                            }}
                                            placeholder="6 a 30 caracteres alfanuméricos"
                                            className="w-full bg-transparent border-0 p-0 pt-0.5 text-sm sm:text-base text-white placeholder:text-slate-500 focus:outline-none focus:ring-0"
                                        />
                                    </div>
                                    <InputError message={errors.usuario || errors.username} className="mt-1" />
                                </div>
                            </div>

                            {/* 3: Domicilio en Formosa (Ancho completo) */}
                            <div>
                                <div className="rounded-2xl bg-[#192233] border border-slate-700/70 py-2.5 px-4.5 sm:py-3 sm:px-5 transition-all focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/30">
                                    <label className="text-[10px] font-bold tracking-wider uppercase text-slate-400 select-none block">
                                        Domicilio en Formosa *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={data.domicilio}
                                        onChange={(e) => setData('domicilio', e.target.value)}
                                        placeholder="Calle, número, barrio / departamento"
                                        className="w-full bg-transparent border-0 p-0 pt-0.5 text-sm sm:text-base text-white placeholder:text-slate-500 focus:outline-none focus:ring-0"
                                    />
                                </div>
                                <InputError message={errors.domicilio} className="mt-1" />
                            </div>

                            {/* 4: Correo Electrónico (Ancho completo) */}
                            <div>
                                <div className="rounded-2xl bg-[#192233] border border-slate-700/70 py-2.5 px-4.5 sm:py-3 sm:px-5 transition-all focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/30">
                                    <label className="text-[10px] font-bold tracking-wider uppercase text-slate-400 select-none block">
                                        Correo Electrónico *
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="ejemplo@correo.com"
                                        className="w-full bg-transparent border-0 p-0 pt-0.5 text-sm sm:text-base text-white placeholder:text-slate-500 focus:outline-none focus:ring-0"
                                    />
                                </div>
                                <InputError message={errors.email} className="mt-1" />
                            </div>

                            {/* 5 y 6: Contraseña y Confirmar Contraseña */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                <div>
                                    <div className="rounded-2xl bg-[#192233] border border-slate-700/70 py-2.5 px-4.5 sm:py-3 sm:px-5 transition-all focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/30">
                                        <label className="text-[10px] font-bold tracking-wider uppercase text-slate-400 select-none block">
                                            Contraseña *
                                        </label>
                                        <input
                                            type="password"
                                            required
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            placeholder="Mínimo 8 caracteres"
                                            className="w-full bg-transparent border-0 p-0 pt-0.5 text-sm sm:text-base text-white placeholder:text-slate-500 focus:outline-none focus:ring-0"
                                        />
                                    </div>
                                    <InputError message={errors.password} className="mt-1" />
                                </div>

                                <div>
                                    <div className="rounded-2xl bg-[#192233] border border-slate-700/70 py-2.5 px-4.5 sm:py-3 sm:px-5 transition-all focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/30">
                                        <label className="text-[10px] font-bold tracking-wider uppercase text-slate-400 select-none block">
                                            Confirmar Contraseña *
                                        </label>
                                        <input
                                            type="password"
                                            required
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            placeholder="Repetí tu contraseña"
                                            className="w-full bg-transparent border-0 p-0 pt-0.5 text-sm sm:text-base text-white placeholder:text-slate-500 focus:outline-none focus:ring-0"
                                        />
                                    </div>
                                    <InputError message={errors.password_confirmation} className="mt-1" />
                                </div>
                            </div>

                            {/* Apartado: Subida de Documentación (DNI y CLU) */}
                            <div className="pt-2 space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-[11px] font-bold tracking-wider uppercase text-slate-300 flex items-center gap-1.5">
                                        <FileText className="w-3.5 h-3.5 text-blue-400" />
                                        Documentación ANMaC (DNI y CLU)
                                    </span>
                                    <span className="text-[10px] text-slate-500 font-medium hidden sm:inline">
                                        Formatos: PDF, JPG o PNG (Máx. 10MB)
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                    {/* Upload DNI */}
                                    <div className="rounded-2xl bg-[#192233] border border-slate-700/70 p-3 px-4.5 transition-all hover:border-slate-600 focus-within:border-blue-500">
                                        <div className="flex items-center justify-between mb-1.5">
                                            <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400 select-none">
                                                DNI (Foto o PDF) *
                                            </span>
                                            {data.archivo_dni && (
                                                <button
                                                    type="button"
                                                    onClick={() => setData('archivo_dni', null)}
                                                    className="text-[10px] text-red-400 hover:text-red-300 font-semibold"
                                                >
                                                    Quitar
                                                </button>
                                            )}
                                        </div>

                                        <label className="flex flex-col items-center justify-center py-2.5 px-3 rounded-xl border border-dashed border-slate-700 hover:border-blue-500/60 bg-[#0f1523]/70 cursor-pointer group transition-all">
                                            <input
                                                type="file"
                                                accept=".pdf,image/*"
                                                className="hidden"
                                                onChange={(e) => {
                                                    if (e.target.files?.[0]) {
                                                        setData('archivo_dni', e.target.files[0]);
                                                    }
                                                }}
                                            />
                                            {data.archivo_dni ? (
                                                <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
                                                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                                                    <span className="truncate max-w-[180px]">{data.archivo_dni.name}</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 text-slate-400 group-hover:text-blue-400 text-xs transition-colors">
                                                    <UploadCloud className="w-4 h-4 text-blue-400 shrink-0" />
                                                    <span className="truncate">Subir copia DNI</span>
                                                </div>
                                            )}
                                        </label>
                                        <InputError message={errors.archivo_dni} className="mt-1" />
                                    </div>

                                    {/* Upload CLU */}
                                    <div className="rounded-2xl bg-[#192233] border border-slate-700/70 p-3 px-4.5 transition-all hover:border-slate-600 focus-within:border-blue-500">
                                        <div className="flex items-center justify-between mb-1.5">
                                            <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400 select-none flex items-center gap-1">
                                                Credencial CLU (Foto o PDF) *
                                            </span>
                                            {data.archivo_clu && (
                                                <button
                                                    type="button"
                                                    onClick={() => setData('archivo_clu', null)}
                                                    className="text-[10px] text-red-400 hover:text-red-300 font-semibold"
                                                >
                                                    Quitar
                                                </button>
                                            )}
                                        </div>

                                        <label className="flex flex-col items-center justify-center py-2.5 px-3 rounded-xl border border-dashed border-slate-700 hover:border-blue-500/60 bg-[#0f1523]/70 cursor-pointer group transition-all">
                                            <input
                                                type="file"
                                                accept=".pdf,image/*"
                                                className="hidden"
                                                onChange={(e) => {
                                                    if (e.target.files?.[0]) {
                                                        setData('archivo_clu', e.target.files[0]);
                                                    }
                                                }}
                                            />
                                            {data.archivo_clu ? (
                                                <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
                                                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                                                    <span className="truncate max-w-[180px]">{data.archivo_clu.name}</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 text-slate-400 group-hover:text-blue-400 text-xs transition-colors">
                                                    <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                                                    <span className="truncate">Subir copia de CLU *</span>
                                                </div>
                                            )}
                                        </label>
                                        <InputError message={errors.archivo_clu} className="mt-1" />
                                    </div>
                                </div>
                            </div>

                            {/* Términos y Condiciones + Novedades (Checkboxes) */}
                            <div className="pt-2 space-y-2.5">
                                <div>
                                    <label className="flex items-start gap-3 cursor-pointer group select-none">
                                        <input
                                            type="checkbox"
                                            required
                                            checked={data.terminos}
                                            onChange={(e) => setData('terminos', e.target.checked)}
                                            className="mt-0.5 w-4 h-4 rounded border-slate-700 bg-[#192233] text-blue-600 focus:ring-blue-500/30 focus:ring-offset-0 focus:ring-2 cursor-pointer transition-all"
                                        />
                                        <span className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors leading-relaxed">
                                            Acepto los{' '}
                                            <Link
                                                href="/decalogo"
                                                target="_blank"
                                                className="text-blue-400 hover:text-blue-300 underline underline-offset-2 font-semibold"
                                            >
                                                términos del servicio
                                            </Link>
                                            , el estatuto social y el{' '}
                                            <Link
                                                href="/decalogo"
                                                target="_blank"
                                                className="text-blue-400 hover:text-blue-300 underline underline-offset-2 font-semibold"
                                            >
                                                decálogo de seguridad en polígono
                                            </Link>
                                            . *
                                        </span>
                                    </label>
                                    <InputError message={errors.terminos} className="mt-1" />
                                </div>

                                <label className="flex items-start gap-3 cursor-pointer group select-none">
                                    <input
                                        type="checkbox"
                                        checked={data.novedades}
                                        onChange={(e) => setData('novedades', e.target.checked)}
                                        className="mt-0.5 w-4 h-4 rounded border-slate-700 bg-[#192233] text-blue-600 focus:ring-blue-500/30 focus:ring-offset-0 focus:ring-2 cursor-pointer transition-all"
                                    />
                                    <span className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors leading-relaxed">
                                        Deseo recibir novedades institucionales, torneos oficiales, cursos y circulares del club por correo electrónico.
                                    </span>
                                </label>
                            </div>

                            {/* Botones de acción inferiores (Más grandes y destacados) */}
                            <div className="flex items-center gap-4 pt-4">
                                <Link
                                    href="/login"
                                    className="px-8 sm:px-10 py-4 rounded-full bg-slate-800/90 hover:bg-slate-700 border border-slate-700/60 text-slate-300 hover:text-white font-bold text-sm sm:text-base transition-all text-center"
                                >
                                    Volver
                                </Link>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 px-8 sm:px-10 py-4 sm:py-4.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm sm:text-base tracking-wide shadow-xl shadow-blue-600/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                                >
                                    {processing && <Spinner className="w-5 h-5 text-white" />}
                                    <span>Solicitar Admisión</span>
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="w-full text-xs text-slate-500 pt-6">
                        © {new Date().getFullYear()} Tiro Federal Formosa. Todos los derechos reservados.
                    </div>
                </div>

                {/* ══════════════════════════════════════════════
                    COLUMNA DERECHA: Imagen Nítida Dividida (50%)
                   ══════════════════════════════════════════════ */}
                <div className="hidden lg:flex lg:w-1/2 relative bg-[#0b0f19] items-center justify-center p-12 overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('/images/hero-bg.jpg')` }}
                    />
                    <div className="absolute inset-0 bg-[#090d16]/40" />

                    <div className="absolute bottom-8 right-10 flex items-center gap-3 select-none opacity-40 hover:opacity-80 transition-opacity">
                        <img
                            src="/images/logo.png"
                            alt="TFF"
                            className="w-10 h-10 object-contain grayscale invert"
                        />
                        <div className="flex flex-col text-right leading-none">
                            <span className="text-[10px] font-black tracking-widest text-white uppercase">
                                Tiro Federal
                            </span>
                            <span className="text-xs font-black tracking-wider text-white uppercase">
                                Formosa
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
