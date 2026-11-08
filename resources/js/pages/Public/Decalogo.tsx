import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/public/PublicLayout';
import { ShieldCheck } from 'lucide-react';

interface DecalogoProps {
    reglas: string[];
}

export default function Decalogo({ reglas }: DecalogoProps) {
    return (
        <PublicLayout>
            <Head title="Decálogo del Tirador — Tiro Federal Formosa" />

            {/* Hero */}
            <section className="bg-gradient-to-br from-gray-900 to-blue-900 py-20 text-white text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <span className="text-blue-300 text-sm font-semibold uppercase tracking-wider">Seguridad ante todo</span>
                    <h1 className="text-4xl sm:text-5xl font-bold mt-3 mb-5">Decálogo del Tirador</h1>
                    <p className="text-gray-300 text-lg">
                        Las 10 reglas fundamentales de seguridad que rigen toda actividad en el polígono.
                    </p>
                </div>
            </section>

            {/* Reglas */}
            <section className="py-20 bg-white">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-5">
                        {reglas.map((regla, i) => (
                            <div key={i} className="flex gap-5 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-colors">
                                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-lg shrink-0">
                                    {i + 1}
                                </div>
                                <p className="text-gray-700 leading-relaxed self-center">{regla.replace(/^\d+\.\s*/, '')}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 p-6 bg-yellow-50 border border-yellow-200 rounded-2xl flex gap-4">
                        <ShieldCheck className="w-6 h-6 text-yellow-600 shrink-0 mt-0.5" />
                        <p className="text-yellow-800 text-sm leading-relaxed">
                            El incumplimiento de estas normas puede resultar en la inhabilitación temporal o permanente del tirador.
                            La seguridad de todos los presentes es responsabilidad de cada tirador.
                        </p>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}

