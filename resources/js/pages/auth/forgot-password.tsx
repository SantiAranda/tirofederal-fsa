import { Head, Link, useForm } from '@inertiajs/react';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import InputError from '@/components/input-error';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/forgot-password');
    };

    return (
        <div className="min-h-screen w-full bg-[#0c111d] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
            <Head title="Recuperar Contraseña - Tiro Federal Formosa" />

            <div className="flex-1 flex flex-col lg:flex-row w-full min-h-screen">
                {/* ══════════════════════════════════════════════
                    COLUMNA IZQUIERDA: Formulario Recuperación (50%)
                   ══════════════════════════════════════════════ */}
                <div className="w-full lg:w-1/2 flex flex-col justify-between bg-[#0c111d] border-r border-slate-800/80 px-6 sm:px-12 md:px-16 lg:px-20 py-8 z-10">
                    {/* Header */}
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

                        <Link
                            href="/login"
                            className="text-xs sm:text-sm font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" /> Volver al login
                        </Link>
                    </div>

                    {/* Contenido Central */}
                    <div className="max-w-md w-full mx-auto my-auto py-10 space-y-6">
                        <div>
                            <span className="text-[11px] font-bold tracking-[0.2em] text-slate-400 uppercase block">
                                Seguridad y Acceso
                            </span>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mt-1.5">
                                Recuperar contraseña<span className="text-blue-500">.</span>
                            </h1>
                            <p className="text-xs sm:text-sm text-slate-400 mt-2">
                                Ingresá el correo electrónico asociado a tu cuenta de socio y te enviaremos un enlace seguro para restablecerla.
                            </p>
                        </div>

                        {status && (
                            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 shrink-0" />
                                <span>{status}</span>
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-4 pt-1">
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

                            <div className="flex items-center gap-4 pt-3">
                                <Link
                                    href="/login"
                                    className="px-7 py-3.5 rounded-full bg-slate-800/90 hover:bg-slate-700 border border-slate-700/60 text-slate-300 hover:text-white font-medium text-xs sm:text-sm transition-all text-center"
                                >
                                    Cancelar
                                </Link>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-blue-600/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
                                >
                                    {processing && <Spinner className="w-4 h-4 text-white" />}
                                    <span>Enviar enlace</span>
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
