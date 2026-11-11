import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/public/PublicLayout';
import { CalendarDays, ChevronRight, MapPin } from 'lucide-react';

interface HistoriaProps {
    fundacionAnio: number;
    nombreClub: string;
    ubicacion: string;
}

const HITOS = [
    { anio: '1911', descripcion: 'Fundación del club bajo el nombre Tiro Federal Formosa, con práctica de fusiles militares.' },
    { anio: '1950s', descripcion: 'Incorporación del tiro con armas cortas y construcción de las primeras pedanas cubiertas.' },
    { anio: '1980s', descripcion: 'Expansión del polígono y apertura del sector de tiro neumático olímpico.' },
    { anio: '2000s', descripcion: 'Inicio del tiro práctico dinámico (IPSC) y participación en torneos nacionales.' },
    { anio: '2020s', descripcion: 'Digitalización del club: sistema de gestión de socios, turnos y legajos online.' },
];

export default function Historia({ fundacionAnio, nombreClub, ubicacion }: HistoriaProps) {
    return (
        <PublicLayout>
            <Head title="Institución — Tiro Federal Formosa" />

            {/* Hero interior */}
            <section className="bg-gradient-to-br from-gray-900 to-blue-900 py-20 text-white text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <span className="text-blue-300 text-sm font-semibold uppercase tracking-wider">Nuestra historia</span>
                    <h1 className="text-4xl sm:text-5xl font-bold mt-3 mb-5">Institución</h1>
                    <p className="text-gray-300 text-lg">
                        Más de un siglo de trayectoria al servicio del tiro deportivo en Formosa.
                    </p>
                </div>
            </section>

            {/* Info rápida */}
            <section className="py-10 bg-blue-600 text-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-center gap-10 text-center">
                    <div>
                        <div className="text-3xl font-bold">{fundacionAnio}</div>
                        <div className="text-blue-200 text-sm mt-1">Año de fundación</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold">+115</div>
                        <div className="text-blue-200 text-sm mt-1">Años de historia</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold">3</div>
                        <div className="text-blue-200 text-sm mt-1">Disciplinas</div>
                    </div>
                </div>
            </section>

            {/* Historia */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Reseña histórica</h2>
                    <p className="text-gray-600 leading-relaxed mb-5">
                        Fundado el <strong>1 de septiembre de {fundacionAnio}</strong>, el{' '}
                        <strong>{nombreClub}</strong> surge como una de las instituciones sociales y
                        deportivas más antiguas y representativas de la provincia de Formosa.
                    </p>
                    <p className="text-gray-600 leading-relaxed mb-5">
                        A lo largo de sus más de 115 años de trayectoria institucional, el polígono
                        evolucionó desde el adiestramiento en fusiles militares hacia una propuesta
                        polideportiva que abarca disciplinas de armas cortas, armas largas y tiro
                        neumático, consolidándose como un referente regional centrado en la docencia
                        técnica, la seguridad y la práctica deportiva responsable.
                    </p>
                    <div className="flex items-start gap-2 text-gray-500 mt-6">
                        <MapPin className="w-5 h-5 mt-0.5 text-blue-500 shrink-0" />
                        <span>{ubicacion}</span>
                    </div>

                    {/* Timeline */}
                    <div className="mt-16">
                        <h3 className="text-2xl font-bold text-gray-900 mb-8">Línea del tiempo</h3>
                        <div className="relative border-l-2 border-blue-200 pl-8 space-y-10">
                            {HITOS.map((h) => (
                                <div key={h.anio} className="relative">
                                    <div className="absolute -left-10 w-5 h-5 rounded-full bg-blue-600 border-4 border-white shadow" />
                                    <div className="inline-block bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full mb-3">
                                        {h.anio}
                                    </div>
                                    <p className="text-gray-600 leading-relaxed">{h.descripcion}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}

