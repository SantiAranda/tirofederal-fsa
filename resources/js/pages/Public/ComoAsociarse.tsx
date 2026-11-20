import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public/PublicLayout';
import { CheckCircle2, UserPlus } from 'lucide-react';

const PASOS = [
    {
        paso: '1',
        titulo: 'Registrate',
        descripcion: 'Creá tu cuenta en el sistema con tus datos personales y una foto de tu DNI.',
    },
    {
        paso: '2',
        titulo: 'Completá tu perfil',
        descripcion: 'Cargá tu Credencial de Legítimo Usuario (CLU), si la tenés, y la documentación requerida.',
    },
    {
        paso: '3',
        titulo: 'Comenzá a tirar',
        descripcion: 'Una vez que presidencia aprueba tu legajo, reservá turnos y participá de eventos.',
    },
];

const REQUISITOS_GENERALES = [
    'DNI vigente (foto de frente y dorso).',
    'Datos personales y de contacto completos.',
    'Aceptar el reglamento interno y el decálogo de seguridad del polígono.',
    'Abonar la cuota del plan de membresía elegido una vez aprobada la solicitud.',
];

const REQUISITOS_MAYORES = [
    'Tener 18 años cumplidos.',
    'Si poseés Credencial de Legítimo Usuario (CLU), cargarla junto con su fecha de vencimiento para que presidencia la valide.',
    'Sin CLU podés asociarte igual como tirador principiante o de práctica diaria, siempre bajo supervisión de un instructor del club.',
];

const REQUISITOS_MENORES = [
    'Asistir siempre acompañado por su padre, madre o tutor legal.',
    'Presentar la autorización firmada por el padre, madre o tutor, junto con el DNI de ambos.',
    'El adulto responsable debe permanecer en el polígono durante toda la práctica.',
    'Practicar únicamente bajo la supervisión directa de un instructor del club.',
];

function ListaRequisitos({ items }: { items: string[] }) {
    return (
        <ul className="space-y-3">
            {items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-600 leading-relaxed">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 text-blue-600 shrink-0" />
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}

export default function ComoAsociarse() {
    return (
        <PublicLayout>
            <Head title="Cómo asociarse — Tiro Federal Formosa" />

            {/* Hero interior */}
            <section className="bg-gradient-to-br from-gray-900 to-blue-900 py-20 text-white text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <span className="text-blue-300 text-sm font-semibold uppercase tracking-wider">Únite al club</span>
                    <h1 className="text-4xl sm:text-5xl font-bold mt-3 mb-5">Cómo asociarse</h1>
                    <p className="text-gray-300 text-lg">
                        Requisitos y pasos para formar parte del Tiro Federal Formosa.
                    </p>
                </div>
            </section>

            {/* Pasos */}
            <section className="py-20 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Tres pasos para empezar</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {PASOS.map((p) => (
                            <div key={p.paso} className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                                <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center mb-4">
                                    {p.paso}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{p.titulo}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{p.descripcion}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Requisitos */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Requisitos</h2>

                    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm mb-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-5">Para todos los socios</h3>
                        <ListaRequisitos items={REQUISITOS_GENERALES} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                            <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                                18 años o más
                            </span>
                            <h3 className="text-xl font-bold text-gray-900 mb-5">Mayores de edad</h3>
                            <ListaRequisitos items={REQUISITOS_MAYORES} />
                        </div>

                        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                            <span className="inline-block bg-orange-50 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                                Menores de 18 años
                            </span>
                            <h3 className="text-xl font-bold text-gray-900 mb-5">Menores de edad</h3>
                            <ListaRequisitos items={REQUISITOS_MENORES} />
                        </div>
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            href="/register"
                            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all shadow-lg hover:shadow-blue-500/30"
                        >
                            <UserPlus className="w-5 h-5" />
                            Crear mi cuenta
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
