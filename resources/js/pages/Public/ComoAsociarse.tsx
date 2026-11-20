import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public/PublicLayout';
import { CheckCircle2, Info, Shield, Target, UserPlus, UserRound, Users } from 'lucide-react';

interface ComoAsociarseProps {
    requisitos: {
        mayores: string[];
        menores: string[];
        condicionesMenores: string[];
    };
}

const PASOS = [
    {
        titulo: 'Registrate',
        descripcion: 'Creá tu cuenta en el sistema con tus datos personales.',
        icono: UserPlus,
    },
    {
        titulo: 'Presentá la documentación',
        descripcion: 'Cargá los requisitos según tu edad. La comisión revisa tu legajo.',
        icono: Shield,
    },
    {
        titulo: 'Comenzá a tirar',
        descripcion: 'Una vez aprobado tu legajo, reservá turnos y participá de eventos.',
        icono: Target,
    },
];

function ListaRequisitos({ items }: { items: string[] }) {
    return (
        <ul className="space-y-3">
            {items.map((item) => (
                <li key={item} className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                </li>
            ))}
        </ul>
    );
}

export default function ComoAsociarse({ requisitos }: ComoAsociarseProps) {
    return (
        <PublicLayout>
            <Head title="Cómo asociarse — Tiro Federal Formosa" />

            {/* Hero */}
            <section className="bg-gradient-to-br from-gray-900 to-blue-900 py-20 text-white text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <span className="text-blue-300 text-sm font-semibold uppercase tracking-wider">Únite al club</span>
                    <h1 className="text-4xl sm:text-5xl font-bold mt-3 mb-5">Cómo asociarse</h1>
                    <p className="text-gray-300 text-lg">
                        Conocé los requisitos para ser socio del Tiro Federal Formosa, tanto si sos mayor como menor de edad.
                    </p>
                </div>
            </section>

            {/* Requisitos */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <span className="text-blue-600 text-sm font-semibold uppercase tracking-wider">Documentación</span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">Requisitos para ser socio</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Mayores */}
                        <article className="flex flex-col rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                                    <UserRound className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">Mayores de 18 años</h3>
                                    <p className="text-sm text-gray-500">Inscripción online desde el sitio</p>
                                </div>
                            </div>

                            <ListaRequisitos items={requisitos.mayores} />
                        </article>

                        {/* Menores */}
                        <article className="flex flex-col rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
                                    <Users className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">Menores de 18 años</h3>
                                    <p className="text-sm text-gray-500">Inscripción presencial con su tutor</p>
                                </div>
                            </div>

                            <ListaRequisitos items={requisitos.menores} />

                            <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-5">
                                <p className="flex items-center gap-2 font-semibold text-amber-900 mb-3">
                                    <Info className="w-4 h-4" />
                                    Condiciones para menores
                                </p>
                                <ul className="space-y-2 list-disc pl-5 text-sm text-amber-900 leading-relaxed">
                                    {requisitos.condicionesMenores.map((condicion) => (
                                        <li key={condicion}>{condicion}</li>
                                    ))}
                                </ul>
                            </div>
                        </article>
                    </div>

                    <div className="mt-12 text-center">
                        <Link
                            href="/register"
                            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all shadow-lg hover:shadow-blue-500/30"
                        >
                            <UserPlus className="w-5 h-5" />
                            Crear mi cuenta
                        </Link>
                    </div>
                </div>
            </section>

            {/* Pasos */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <span className="text-blue-600 text-sm font-semibold uppercase tracking-wider">Proceso</span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">Tres pasos para asociarte</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {PASOS.map((paso, i) => {
                            const Icon = paso.icono;
                            return (
                                <div key={paso.titulo} className="flex flex-col items-center text-center">
                                    <div className="relative w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-200">
                                        <Icon className="w-9 h-9 text-white" />
                                        <span className="absolute -top-2 -right-2 w-6 h-6 bg-white border-2 border-blue-600 rounded-full text-xs font-bold text-blue-600 flex items-center justify-center shadow">
                                            {i + 1}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{paso.titulo}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{paso.descripcion}</p>
                                </div>
                            );
                        })}
                    </div>

                    <p className="mt-14 text-center text-sm text-gray-500">
                        ¿Tenés dudas? Acercate a la secretaría del club o leé el{' '}
                        <Link href="/decalogo" className="font-medium text-blue-600 hover:underline">
                            Decálogo del Tirador
                        </Link>
                        .
                    </p>
                </div>
            </section>
        </PublicLayout>
    );
}
