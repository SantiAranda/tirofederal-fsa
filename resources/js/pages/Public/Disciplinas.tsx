import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/public/PublicLayout';
import { Target, Shield, Trophy } from 'lucide-react';

interface Disciplina {
    nombre: string;
    descripcion: string;
    sector: string;
}

interface DisciplinasProps {
    disciplinas: Disciplina[];
}

const ICONOS = [Target, Shield, Trophy];
const COLORES = [
    { bg: 'bg-blue-50', text: 'text-blue-600', badge: 'bg-blue-100 text-blue-700' },
    { bg: 'bg-green-50', text: 'text-green-600', badge: 'bg-green-100 text-green-700' },
    { bg: 'bg-orange-50', text: 'text-orange-600', badge: 'bg-orange-100 text-orange-700' },
];

export default function Disciplinas({ disciplinas }: DisciplinasProps) {
    return (
        <PublicLayout>
            <Head title="Disciplinas — Tiro Federal Formosa" />

            {/* Hero */}
            <section className="bg-gradient-to-br from-gray-900 to-blue-900 py-20 text-white text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <span className="text-blue-300 text-sm font-semibold uppercase tracking-wider">Lo que practicamos</span>
                    <h1 className="text-4xl sm:text-5xl font-bold mt-3 mb-5">Disciplinas</h1>
                    <p className="text-gray-300 text-lg">
                        Modalidades del tiro deportivo con infraestructura certificada y docentes habilitados.
                    </p>
                </div>
            </section>

            {/* Disciplinas */}
            <section className="py-20 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-10">
                        {disciplinas.map((disc, i) => {
                            const Icon = ICONOS[i % ICONOS.length];
                            const color = COLORES[i % COLORES.length];
                            return (
                                <div key={disc.nombre} className="flex flex-col sm:flex-row gap-6 p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${color.bg}`}>
                                        <Icon className={`w-8 h-8 ${color.text}`} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{disc.nombre}</h2>
                                        <p className="text-gray-600 leading-relaxed mb-4">{disc.descripcion}</p>
                                        <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${color.badge}`}>
                                            📍 {disc.sector}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}

