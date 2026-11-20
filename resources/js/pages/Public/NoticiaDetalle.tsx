import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public/PublicLayout';
import NewsArticlePreview from '@/components/news-article-preview';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Newspaper, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Noticia {
    id: number;
    titulo: string;
    slug: string;
    categoria?: string;
    copete?: string;
    contenido: string;
    imagen_portada?: string | null;
    epigrafe?: string | null;
    fecha_publicacion?: string;
    user?: {
        name?: string;
        nombre?: string;
        apellido?: string;
    };
}

interface Props {
    noticia: Noticia;
    relacionadas?: Noticia[];
}

export default function NoticiaDetalle({ noticia, relacionadas = [] }: Props) {
    const autorNombre = noticia.user
        ? (noticia.user.nombre && noticia.user.apellido ? `${noticia.user.nombre} ${noticia.user.apellido}` : (noticia.user.name || 'Prensa Tiro Federal'))
        : 'Prensa Tiro Federal Formosa';

    const imagenUrl = noticia.imagen_portada
        ? (/^(https?:)?\//.test(noticia.imagen_portada) ? noticia.imagen_portada : `/storage/${noticia.imagen_portada}`)
        : null;

    const fechaFormateada = noticia.fecha_publicacion
        ? new Date(noticia.fecha_publicacion).toLocaleDateString('es-AR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })
        : undefined;

    return (
        <PublicLayout>
            <Head title={`${noticia.titulo} - Tiro Federal Formosa`} />

            {/* Navegación de migas de pan y volver */}
            <div className="bg-gray-50 border-b border-gray-200">
                <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="hover:text-blue-600">Inicio</Link>
                        <span>/</span>
                        <Link href="/noticias" className="hover:text-blue-600">Prensa y Noticias</Link>
                        <span>/</span>
                        <span className="text-gray-700 font-medium">{noticia.categoria || 'Prensa'}</span>
                    </div>
                    <Button variant="ghost" size="sm" asChild className="h-7 text-xs text-blue-600 gap-1">
                        <Link href="/noticias">
                            <ArrowLeft className="w-3.5 h-3.5" /> Volver a Noticias
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Artículo Periodístico Principal (Imagen 3) */}
            <div className="bg-white py-6">
                <NewsArticlePreview
                    titulo={noticia.titulo}
                    categoria={noticia.categoria}
                    copete={noticia.copete}
                    contenido={noticia.contenido}
                    imagenPortadaUrl={imagenUrl}
                    epigrafe={noticia.epigrafe}
                    autorNombre={autorNombre}
                    fecha={fechaFormateada}
                    isSimulatedBrowser={false}
                />
            </div>

            {/* Sección de Otras Noticias Relacionadas */}
            {relacionadas.length > 0 && (
                <section className="bg-gray-50 border-t border-gray-200 py-12">
                    <div className="max-w-5xl mx-auto px-4">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-widest text-blue-700">Más comunicados</span>
                                <h3 className="text-2xl font-bold text-gray-900 mt-1">Otras Noticias del Club</h3>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relacionadas.map((rel) => {
                                const relImg = rel.imagen_portada
                                    ? (/^(https?:)?\//.test(rel.imagen_portada) ? rel.imagen_portada : `/storage/${rel.imagen_portada}`)
                                    : null;

                                return (
                                    <Link
                                        key={rel.id}
                                        href={`/noticias/${rel.slug}`}
                                        className="group block bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                                    >
                                        <div className="h-40 bg-gray-100 overflow-hidden">
                                            {relImg ? (
                                                <img
                                                    src={relImg}
                                                    alt={rel.titulo}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                    <Newspaper className="w-8 h-8 stroke-1" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <Badge variant="outline" className="text-[10px] text-blue-700 border-blue-200 mb-2">
                                                {rel.categoria || 'Institucional'}
                                            </Badge>
                                            <h4 className="font-bold text-gray-900 text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">
                                                {rel.titulo}
                                            </h4>
                                            {rel.copete && (
                                                <p className="text-xs text-gray-500 line-clamp-2 mt-1.5">
                                                    {rel.copete}
                                                </p>
                                            )}
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}
        </PublicLayout>
    );
}
