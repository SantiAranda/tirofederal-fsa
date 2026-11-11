import { Head, Link } from '@inertiajs/react';
import PublicNavbar from '@/components/public/PublicNavbar';
import PublicFooter from '@/components/public/PublicFooter';
import { Clock, CheckCircle2, Mail, LogOut, ArrowRight } from 'lucide-react';

interface UserSummary {
    nombre: string;
    apellido: string;
    email: string;
    numero_socio: string;
    estado_habilitacion: string;
}

interface Props {
    user?: UserSummary | null;
}

export default function SolicitudEnTramite({ user }: Props) {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50 text-gray-800 font-sans selection:bg-blue-600 selection:text-white">
            <Head title="Solicitud en Trámite - Tiro Federal Formosa" />

            {/* 1. Header idéntico al del Landing Page */}
            <PublicNavbar />

            {/* 2 y 3. Contenido 100% centrado con fondo claro (sin foto ni cuadros laterales) */}
            <main className="flex-1 flex items-center justify-center py-12 md:py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl w-full mx-auto space-y-8">
                    {/* Encabezado y Título Centrados */}
                    <div className="text-center space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold tracking-wider uppercase shadow-xs">
                            <Clock className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                            <span>Solicitud de Admisión en Trámite</span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                            Solicitud en proceso de auditoría<span className="text-blue-600">.</span>
                        </h1>

                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-xl mx-auto">
                            Tu legajo institucional y la documentación adjuntada (DNI y CLU) fueron recibidos correctamente.{' '}
                            <span className="font-semibold text-gray-900">
                                Le estaremos avisando por correo electrónico el estado del mismo
                            </span>{' '}
                            una vez que Presidencia y Secretaría validen tus credenciales.
                        </p>
                    </div>

                    {/* Resumen de Datos de la Solicitud */}
                    {user && (
                        <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-7 shadow-sm">
                            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                                <span className="text-[11px] font-bold tracking-wider uppercase text-gray-500">
                                    Datos de la Solicitud Presentada
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                                    Pendiente de Validación
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-sm">
                                <div className="p-3.5 rounded-xl bg-gray-50/80 border border-gray-100">
                                    <span className="text-xs text-gray-500 block">Postulante</span>
                                    <span className="text-gray-900 font-bold block truncate mt-0.5">
                                        {user.nombre} {user.apellido}
                                    </span>
                                </div>

                                <div className="p-3.5 rounded-xl bg-gray-50/80 border border-gray-100">
                                    <span className="text-xs text-gray-500 block">Correo Electrónico</span>
                                    <span className="text-gray-900 font-bold block truncate mt-0.5">
                                        {user.email}
                                    </span>
                                </div>

                                <div className="p-3.5 rounded-xl bg-gray-50/80 border border-gray-100">
                                    <span className="text-xs text-gray-500 block">N° Legajo Provisorio</span>
                                    <span className="text-blue-700 font-bold font-mono block mt-0.5">
                                        {user.numero_socio}
                                    </span>
                                </div>

                                <div className="p-3.5 rounded-xl bg-gray-50/80 border border-gray-100">
                                    <span className="text-xs text-gray-500 block">Documentos Adjuntos</span>
                                    <span className="text-emerald-700 font-semibold flex items-center gap-1.5 mt-0.5">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                        DNI y Credencial CLU cargados
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Pasos del Proceso (Stepper en Fondo Claro) */}
                    <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-7 shadow-sm space-y-4">
                        <span className="text-[11px] font-bold tracking-wider uppercase text-gray-500 block">
                            Etapas de Incorporación
                        </span>

                        <div className="space-y-4 pt-1">
                            <div className="flex items-start gap-3.5">
                                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                                    <CheckCircle2 className="w-4 h-4" />
                                </div>
                                <div className="text-xs sm:text-sm">
                                    <p className="font-bold text-gray-900">1. Formulario y datos personales</p>
                                    <p className="text-gray-500 text-xs mt-0.5">Datos ingresados y pre-cargados en el padrón institucional.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3.5">
                                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                                    <CheckCircle2 className="w-4 h-4" />
                                </div>
                                <div className="text-xs sm:text-sm">
                                    <p className="font-bold text-gray-900">2. Documentación Digital Presentada</p>
                                    <p className="text-gray-500 text-xs mt-0.5">Copia digital de DNI y Credencial Legítimo Usuario (CLU) adjuntadas.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3.5">
                                <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                                    <Clock className="w-4 h-4 text-amber-700 animate-spin" />
                                </div>
                                <div className="text-xs sm:text-sm">
                                    <p className="font-bold text-amber-900">3. Auditoría por Presidencia y Secretaría (En curso)</p>
                                    <p className="text-gray-600 text-xs mt-0.5">Verificación de legajo, vigencia de credenciales y antecedentes conforme normativa ANMaC.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3.5 opacity-60">
                                <div className="w-7 h-7 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <div className="text-xs sm:text-sm">
                                    <p className="font-bold text-gray-700">4. Notificación por Correo y Habilitación Definitiva</p>
                                    <p className="text-gray-500 text-xs mt-0.5">Recibirás un email confirmando la admisión con instrucciones para abonar la membresía y acceder a las pedanas.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Botones de Navegación Centrados */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                        <Link
                            href="/"
                            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm tracking-wide shadow-md shadow-blue-500/20 transition-all text-center flex items-center justify-center gap-2"
                        >
                            <span>Ir al Portal Principal</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>

                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 hover:text-gray-900 font-semibold text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <LogOut className="w-4 h-4 text-gray-500" />
                            <span>Cerrar Sesión</span>
                        </Link>
                    </div>
                </div>
            </main>

            {/* Footer Oficial */}
            <PublicFooter />
        </div>
    );
}
