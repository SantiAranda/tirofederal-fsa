import { Head, Link, router } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Newspaper, Plus, Calendar, Eye, Trash2, Edit3, ExternalLink, Image as ImageIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Inicio', href: '/admin/dashboard' },
    { title: 'Noticias y Prensa', href: '/admin/noticias' },
];

interface NoticiaItem {
    id: number;
    titulo: string;
    slug?: string;
    categoria?: string;
    copete?: string;
    contenido?: string;
    imagen_portada?: string | null;
    imagen_url?: string | null;
    fecha_publicacion?: string;
    publicada: boolean;
}

interface Props {
    noticias?: { data: NoticiaItem[] } | NoticiaItem[];
}

export default function NoticiasIndex({ noticias: serverNoticias }: Props) {
    const rawList = Array.isArray(serverNoticias) ? serverNoticias : (serverNoticias?.data || []);

    const handleDelete = (noticia: NoticiaItem) => {
        if (confirm(`¿Eliminar la noticia "${noticia.titulo}"?`)) {
            router.delete(`/admin/noticias/${noticia.id}`);
        }
    };

    return (
        <div className="space-y-6">
            <Head title="Noticias y Prensa - Tiro Federal Formosa" />

            {/* Cabecera con botón a /admin/noticias/create */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2.5">
                        <Newspaper className="w-6 h-6 text-blue-600" />
                        Prensa y Comunicados Oficiales
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Gestión de artículos y comunicados visibles en el portal público y el club
                    </p>
                </div>
                <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white gap-2 shadow-sm shadow-blue-500/20 w-full sm:w-auto">
                    <Link href="/admin/noticias/create">
                        <Plus className="w-4 h-4" /> Redactar Noticia
                    </Link>
                </Button>
            </div>

            {/* Listado de Artículos */}
            {rawList.length === 0 ? (
                <Card className="border-dashed border-2 py-12 text-center">
                    <CardContent className="flex flex-col items-center justify-center space-y-3">
                        <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                            <Newspaper className="w-6 h-6" />
                        </div>
                        <h3 className="font-semibold text-gray-900 text-lg">No hay noticias redactadas todavía</h3>
                        <p className="text-sm text-gray-500 max-w-sm">
                            Comenzá creando tu primer artículo institucional con el editor enriquecido WYSIWYG.
                        </p>
                        <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white mt-2">
                            <Link href="/admin/noticias/create">
                                <Plus className="w-4 h-4 mr-1.5" /> Redactar Noticia Ahora
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rawList.map((n) => {
                        const imgUrl = n.imagen_url
                            || (n.imagen_portada
                                ? (n.imagen_portada.startsWith('http') || n.imagen_portada.startsWith('/')
                                    ? n.imagen_portada
                                    : `/storage/${n.imagen_portada.replace(/^\/+/, '')}`)
                                : null);

                        const fechaStr = n.fecha_publicacion
                            ? new Date(n.fecha_publicacion).toLocaleDateString('es-AR', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                            })
                            : 'Borrador';

                        return (
                            <Card key={n.id} className="border border-gray-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                                {/* Imagen de portada */}
                                <div className="h-44 w-full bg-gray-100 relative overflow-hidden">
                                    {imgUrl && (
                                        <img
                                            src={imgUrl}
                                            alt={n.titulo}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                                const fallback = e.currentTarget.parentElement?.querySelector('.placeholder-fallback');
                                                if (fallback) (fallback as HTMLElement).style.display = 'flex';
                                            }}
                                        />
                                    )}
                                    <div className={`placeholder-fallback w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50 ${imgUrl ? 'hidden' : 'flex'}`}>
                                        <ImageIcon className="w-8 h-8 stroke-1 mb-1 text-gray-400" />
                                        <span className="text-[11px] text-gray-400">Sin imagen de portada</span>
                                    </div>
                                    <div className="absolute top-2.5 left-2.5">
                                        <Badge className="bg-white/90 backdrop-blur-xs text-blue-800 font-semibold border border-blue-200 text-xs">
                                            {n.categoria || 'Institucional'}
                                        </Badge>
                                    </div>
                                    <div className="absolute top-2.5 right-2.5">
                                        {n.publicada ? (
                                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-white shadow-xs">
                                                Publicada
                                            </span>
                                        ) : (
                                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gray-700 text-white shadow-xs">
                                                Borrador
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <CardHeader className="pb-2 flex-1">
                                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
                                        <Calendar className="w-3.5 h-3.5" />
                                        <span>{fechaStr}</span>
                                    </div>
                                    <CardTitle className="text-base font-bold text-gray-900 leading-snug line-clamp-2">
                                        {n.titulo}
                                    </CardTitle>
                                    {n.copete && (
                                        <p className="text-xs text-gray-600 line-clamp-2 mt-2 leading-relaxed">
                                            {n.copete}
                                        </p>
                                    )}
                                </CardHeader>

                                <CardContent className="pt-0 border-t border-gray-100 mt-2">
                                    <div className="flex items-center justify-between pt-3 gap-2">
                                        {n.publicada && n.slug && (
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                asChild
                                                className="h-8 text-xs text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 px-2"
                                            >
                                                <a href={`/noticias/${n.slug}`} target="_blank" rel="noreferrer">
                                                    <ExternalLink className="w-3.5 h-3.5 mr-1" /> Ver Web
                                                </a>
                                            </Button>
                                        )}

                                        <div className="flex items-center gap-1.5 ml-auto">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                asChild
                                                className="h-8 text-xs text-blue-600 hover:text-blue-700"
                                            >
                                                <Link href={`/admin/noticias/${n.id}/edit`}>
                                                    <Edit3 className="w-3.5 h-3.5 mr-1" /> Editar
                                                </Link>
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => handleDelete(n)}
                                                className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 hover:text-red-700"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

NoticiasIndex.layout = {
    breadcrumbs,
};
