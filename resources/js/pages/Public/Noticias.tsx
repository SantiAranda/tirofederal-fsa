import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public/PublicLayout';
import { Badge } from '@/components/ui/badge';
import { Clock, Newspaper } from 'lucide-react';

interface Noticia {
    id: number;
    titulo: string;
    slug: string;
    categoria: string | null;
    resumen: string | null;
    epigrafe: string | null;
    fecha_publicacion: string;
    imagen_url: string | null;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface NoticiasProps {
    noticias: {
        data: Noticia[];
        links: PaginationLink[];
        current_page: number;
        last_page: number;
    };
    categorias: string[];
    categoriaActual: string | null;
}

function formatFecha(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' });
}

function limpiarEtiqueta(label: string) {
    return label.replace('&laquo;', '«').replace('&raquo;', '»').replace('Previous', 'Anterior').replace('Next', 'Siguiente');
}

function NoticiaCard({ noticia, destacada = false }: { noticia: Noticia; destacada?: boolean }) {
    return (
        <Link
            href={`/noticias/${noticia.slug}`}
            className={`group block bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow ${
                destacada ? 'md:col-span-2 md:grid md:grid-cols-2' : ''
            }`}
        >
            <div className={`bg-gray-100 overflow-hidden ${destacada ? 'aspect-video md:aspect-auto md:h-full' : 'aspect-video'}`}>
                {noticia.imagen_url ? (
                    <img
                        src={noticia.imagen_url}
                        alt={noticia.epigrafe || noticia.titulo}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full min-h-40 flex items-center justify-center text-gray-300 bg-gradient-to-br from-gray-100 to-blue-50">
                        <Newspaper className="w-12 h-12 stroke-1" />
                    </div>
                )}
            </div>
            <div className={destacada ? 'p-8 flex flex-col justify-center' : 'p-6'}>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                    <Badge variant="outline" className="text-[10px] text-blue-700 border-blue-200">
                        {noticia.categoria || 'Institucional'}
                    </Badge>
                    <span className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Clock className="w-3.5 h-3.5" />
                        {formatFecha(noticia.fecha_publicacion)}
                    </span>
                </div>
                <h3
                    className={`font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 ${
                        destacada ? 'text-2xl sm:text-3xl' : 'text-lg line-clamp-2'
                    }`}
                >
                    {noticia.titulo}
                </h3>
                {noticia.resumen && (
                    <p className={`text-gray-500 text-sm leading-relaxed ${destacada ? 'line-clamp-4' : 'line-clamp-3'}`}>
                        {noticia.resumen}
                    </p>
                )}
            </div>
        </Link>
    );
}

export default function Noticias({ noticias, categorias = [], categoriaActual }: NoticiasProps) {
    const items = noticias.data ?? [];
    const esPrimeraPagina = noticias.current_page === 1;
    const [destacada, ...resto] = esPrimeraPagina ? items : [null, ...items];

    return (
        <PublicLayout>
            <Head title="Prensa y Noticias — Tiro Federal Formosa" />

            {/* Hero */}
            <section className="bg-gradient-to-br from-gray-900 to-blue-900 py-20 text-white text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <span className="text-blue-300 text-sm font-semibold uppercase tracking-wider">Novedades del club</span>
                    <h1 className="text-4xl sm:text-5xl font-bold mt-3 mb-5">Prensa y Noticias</h1>
                    <p className="text-gray-300 text-lg">
                        Comunicados oficiales, resultados de torneos y novedades de la institución.
                    </p>
                </div>
            </section>

            <section className="py-16 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Filtro por categoría */}
                    {categorias.length > 1 && (
                        <div className="flex flex-wrap gap-2 mb-10">
                            <Link
                                href="/noticias"
                                preserveScroll
                                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                                    !categoriaActual
                                        ? 'bg-blue-600 text-white border-blue-600'
                                        : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'
                                }`}
                            >
                                Todas
                            </Link>
                            {categorias.map((cat) => (
                                <Link
                                    key={cat}
                                    href={`/noticias?categoria=${encodeURIComponent(cat)}`}
                                    preserveScroll
                                    className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                                        categoriaActual === cat
                                            ? 'bg-blue-600 text-white border-blue-600'
                                            : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'
                                    }`}
                                >
                                    {cat}
                                </Link>
                            ))}
                        </div>
                    )}

                    {items.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                            <Newspaper className="w-14 h-14 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-500">Todavía no hay noticias publicadas.</h3>
                            <p className="text-gray-400 mt-2 text-sm">Pronto vas a encontrar acá los comunicados del club.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {destacada && <NoticiaCard noticia={destacada} destacada />}
                            {resto.map((n) => n && <NoticiaCard key={n.id} noticia={n} />)}
                        </div>
                    )}

                    {/* Paginación */}
                    {noticias.last_page > 1 && (
                        <nav className="flex flex-wrap justify-center gap-2 mt-12" aria-label="Paginación">
                            {noticias.links.map((link, i) =>
                                link.url ? (
                                    <Link
                                        key={i}
                                        href={link.url}
                                        className={`px-3.5 py-2 rounded-lg text-sm border transition-colors ${
                                            link.active
                                                ? 'bg-blue-600 text-white border-blue-600'
                                                : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'
                                        }`}
                                    >
                                        {limpiarEtiqueta(link.label)}
                                    </Link>
                                ) : (
                                    <span key={i} className="px-3.5 py-2 rounded-lg text-sm border border-gray-100 text-gray-300">
                                        {limpiarEtiqueta(link.label)}
                                    </span>
                                ),
                            )}
                        </nav>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
