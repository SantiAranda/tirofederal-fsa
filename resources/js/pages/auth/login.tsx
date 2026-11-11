import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Mail, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import InputError from '@/components/input-error';

type Props = {
    status?: string;
    canResetPassword?: boolean;
};

export default function Login({ status, canResetPassword = true }: Props) {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/login', {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen w-full bg-[#0c111d] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
            <Head title="Iniciar Sesión - Tiro Federal Formosa" />

            {/* ── Contenedor Split Screen 50/50 ── */}
            <div className="flex-1 flex flex-col lg:flex-row w-full min-h-screen">
                {/* ══════════════════════════════════════════════
                    COLUMNA IZQUIERDA: Formulario de Login (50%)
                   ══════════════════════════════════════════════ */}
                <div className="w-full lg:w-1/2 flex flex-col justify-between bg-[#0c111d] border-r border-slate-800/80 px-6 sm:px-12 md:px-16 lg:px-20 py-8 z-10">
                    {/* Header de la columna */}
                    <div className="w-full flex items-center justify-between">
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

                        <nav className="flex items-center gap-6 text-xs sm:text-sm font-medium text-slate-400">
                            <Link href="/" className="hover:text-white transition-colors">
                                Inicio
                            </Link>
                            <Link href="/register" className="hover:text-white transition-colors">
                                Asociarse
                            </Link>
                        </nav>
                    </div>

                    {/* Contenido Central: Formulario */}
                    <div className="max-w-md w-full mx-auto my-auto py-10 space-y-6">
                        {/* Títulos */}
                        <div>
                            <span className="text-[11px] font-bold tracking-[0.2em] text-slate-400 uppercase block">
                                Portal Institucional
                            </span>
                            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mt-1.5">
                                Iniciar sesión<span className="text-blue-500">.</span>
                            </h1>
                            <p className="text-xs sm:text-sm text-slate-400 mt-2">
                                ¿Todavía no sos socio?{' '}
                                <Link
                                    href="/register"
                                    className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                                >
                                    Asociate acá
                                </Link>
                            </p>
                        </div>

                        {/* Estado */}
                        {status && (
                            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 shrink-0" />
                                <span>{status}</span>
                            </div>
                        )}

                        {/* Formulario */}
                        <form onSubmit={submit} className="space-y-4 pt-1">
                            {/* Input: Correo Electrónico */}
                            <div>
                                <div className="rounded-2xl bg-[#192233] border border-slate-700/70 p-3.5 px-5 transition-all focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/30">
                                    <div className="flex items-center justify-between">
                                        <label
                                            htmlFor="email"
                                            className="text-[10px] font-bold tracking-wider uppercase text-slate-400 select-none"
                                        >
                                            Correo electrónico
                                        </label>
                                        <Mail className="w-4 h-4 text-slate-500" />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        autoFocus
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="usuario@tirofederalformosa.org.ar"
                                        className="w-full bg-transparent border-0 p-0 pt-1 text-sm sm:text-base text-white placeholder:text-slate-500 focus:outline-none focus:ring-0"
                                    />
                                </div>
                                <InputError message={errors.email} className="mt-1" />
                            </div>

                            {/* Input: Contraseña */}
                            <div>
                                <div className="rounded-2xl bg-[#192233] border border-slate-700/70 p-3.5 px-5 transition-all focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/30">
                                    <div className="flex items-center justify-between">
                                        <label
                                            htmlFor="password"
                                            className="text-[10px] font-bold tracking-wider uppercase text-slate-400 select-none"
                                        >
                                            Contraseña
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="text-slate-500 hover:text-slate-300 transition-colors focus:outline-none"
                                            tabIndex={-1}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="w-4 h-4" />
                                            ) : (
                                                <Eye className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full bg-transparent border-0 p-0 pt-1 text-sm sm:text-base text-white placeholder:text-slate-500 focus:outline-none focus:ring-0"
                                    />
                                </div>
                                <InputError message={errors.password} className="mt-1" />
                            </div>

                            {/* Opciones: Recordarme & Olvidé contraseña */}
                            <div className="flex items-center justify-between text-xs text-slate-400 pt-1 px-1">
                                <label className="flex items-center gap-2 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                                    />
                                    <span className="hover:text-slate-200 transition-colors">Recordarme</span>
                                </label>

                                {canResetPassword && (
                                    <Link
                                        href="/forgot-password"
                                        className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                                    >
                                        ¿Olvidaste tu contraseña?
                                    </Link>
                                )}
                            </div>

                            {/* Botones de acción inferiores */}
                            <div className="flex items-center gap-4 pt-3">
                                <Link
                                    href="/"
                                    className="px-7 py-3.5 rounded-full bg-slate-800/90 hover:bg-slate-700 border border-slate-700/60 text-slate-300 hover:text-white font-medium text-xs sm:text-sm transition-all text-center"
                                >
                                    Volver al inicio
                                </Link>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-blue-600/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
                                >
                                    {processing && <Spinner className="w-4 h-4 text-white" />}
                                    <span>Ingresar</span>
                                </button>
                            </div>

                            <div className="text-center pt-3 text-xs text-slate-400">
                                ¿No tenés una cuenta todavía?{' '}
                                <Link
                                    href="/register"
                                    className="text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-4 decoration-blue-500/40 hover:decoration-blue-400 transition-colors"
                                >
                                    Asociate acá
                                </Link>
                            </div>
                        </form>
                    </div>

                    {/* Footer de la columna izquierda */}
                    <div className="w-full text-xs text-slate-500 pt-6">
                        © {new Date().getFullYear()} Tiro Federal Formosa. Todos los derechos reservados.
                    </div>
                </div>

                {/* ══════════════════════════════════════════════
                    COLUMNA DERECHA: Imagen Nítida Dividida (50%)
                    (Sin fade del medio - Corte limpio de panel)
                   ══════════════════════════════════════════════ */}
                <div className="hidden lg:flex lg:w-1/2 relative bg-[#0b0f19] items-center justify-center p-12 overflow-hidden">
                    {/* Imagen de fondo nítida */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('/images/hero-bg.jpg')` }}
                    />

                    {/* 
                      👇 CONTROL DE TRANSPARENCIA / OSCURIDAD DE LA IMAGEN:
                      Podés regular la opacidad cambiando el valor '/40' (ejemplos: /20 más claro, /60 más oscuro, /0 sin capa):
                    */}
                    <div className="absolute inset-0 bg-[#090d16]/40" />

                    {/* Marca de agua institucional en la esquina inferior */}
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
