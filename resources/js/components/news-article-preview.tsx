import React from 'react';
import {
    Calendar, Clock, User, Share2, Bookmark,
    MessageCircle, Twitter, Facebook, Link as LinkIcon, Check,
    ExternalLink
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface NewsArticlePreviewProps {
    titulo: string;
    categoria?: string;
    copete?: string;
    contenido: string;
    imagenPortadaUrl?: string | null;
    epigrafe?: string | null;
    autorNombre?: string;
    fecha?: string;
    isSimulatedBrowser?: boolean;
}

export default function NewsArticlePreview({
    titulo,
    categoria = 'Institucional',
    copete,
    contenido,
    imagenPortadaUrl,
    epigrafe,
    autorNombre = 'Prensa Tiro Federal Formosa',
    fecha,
    isSimulatedBrowser = true,
}: NewsArticlePreviewProps) {
    const [copied, setCopied] = React.useState(false);

    const formattedDate = fecha || new Date().toLocaleDateString('es-AR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    }) + ' ' + new Date().toLocaleTimeString('es-AR', {
        hour: '2-digit',
        minute: '2-digit',
    }) + ' hs';

    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const articleContent = (
        <article className="max-w-3xl mx-auto py-6 px-4 sm:px-6">
            {/* Categoría / Sección — Idéntico a Imagen 3 */}
            <div className="mb-3">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-700 bg-blue-50 px-2.5 py-1 rounded">
                    {categoria || 'Institucional'}
                </span>
            </div>

            {/* Título Principal H1 — Idéntico a Imagen 3 */}
            <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-950 tracking-tight leading-snug sm:leading-tight mb-4">
                {titulo || 'Título del artículo o comunicado oficial'}
            </h1>

            {/* Bajada / Copete / Resumen Destacado — Idéntico a Imágenes 1 y 3 */}
            {copete && (
                <div className="text-base sm:text-xl text-gray-700 leading-relaxed font-normal mb-6 pb-6 border-b border-gray-200">
                    {copete}
                </div>
            )}

            {/* Fila de Autor, Fecha y Utilidades — Idéntico a Imagen 3 */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-3 mb-6 border-y border-gray-100 text-xs text-gray-500">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                        TF
                    </div>
                    <div>
                        <div className="font-semibold text-gray-800 text-sm">
                            Por {autorNombre}
                        </div>
                        <div className="text-gray-500 flex items-center gap-1.5 mt-0.5">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{formattedDate}</span>
                            <span>·</span>
                            <Clock className="w-3.5 h-3.5" />
                            <span>Lectura 3 min</span>
                        </div>
                    </div>
                </div>

                {/* Botones de Compartir (Simulados como en Infobae / Imagen 3) */}
                <div className="flex items-center gap-1.5 self-end sm:self-auto">
                    <button
                        type="button"
                        title="Compartir en WhatsApp"
                        className="w-8 h-8 rounded-full bg-green-50 text-green-700 hover:bg-green-100 flex items-center justify-center transition-colors"
                    >
                        <MessageCircle className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        title="Compartir en X"
                        className="w-8 h-8 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    >
                        <Twitter className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        title="Compartir en Facebook"
                        className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 flex items-center justify-center transition-colors"
                    >
                        <Facebook className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={handleCopy}
                        title="Copiar enlace"
                        className="w-8 h-8 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    >
                        {copied ? <Check className="w-4 h-4 text-green-600" /> : <LinkIcon className="w-4 h-4" />}
                    </button>
                    <button
                        type="button"
                        title="Guardar artículo"
                        className="w-8 h-8 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    >
                        <Bookmark className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Imagen Principal con Epígrafe — Idéntico a Imagen 3 */}
            {imagenPortadaUrl && (
                <figure className="mb-8">
                    <div className="rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shadow-sm">
                        <img
                            src={imagenPortadaUrl}
                            alt={titulo}
                            className="w-full max-h-[480px] object-cover"
                        />
                    </div>
                    {epigrafe ? (
                        <figcaption className="text-xs sm:text-sm text-gray-500 italic mt-2 px-1">
                            {epigrafe}
                        </figcaption>
                    ) : (
                        <figcaption className="text-xs text-gray-400 italic mt-2 px-1">
                            Foto oficial del Tiro Federal Formosa
                        </figcaption>
                    )}
                </figure>
            )}

            {/* Cuerpo del Artículo — Redactado con WYSIWYG, sin publicidad molesta */}
            <div
                className="prose prose-lg max-w-none text-gray-800 leading-relaxed font-sans
                    [&_p]:mb-5 [&_p]:text-[17px] [&_p]:leading-[1.75]
                    [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-gray-900 [&_h1]:mt-8 [&_h1]:mb-3
                    [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-7 [&_h2]:mb-3
                    [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-gray-900 [&_h3]:mt-6 [&_h3]:mb-2
                    [&_blockquote]:border-l-4 [&_blockquote]:border-blue-600 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-6 [&_blockquote]:bg-blue-50/40 [&_blockquote]:py-2 [&_blockquote]:rounded-r
                    [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-4
                    [&_li]:mb-1.5 [&_li]:text-[16px]
                    [&_figure]:my-6 [&_img]:rounded-lg [&_img]:shadow-sm
                    [&_table]:w-full [&_table]:border-collapse [&_table]:my-6
                    [&_th]:border [&_th]:border-gray-300 [&_th]:bg-gray-100 [&_th]:p-2.5 [&_th]:text-left
                    [&_td]:border [&_td]:border-gray-300 [&_td]:p-2.5"
                dangerouslySetInnerHTML={{
                    __html: contenido || '<p class="text-gray-400 italic">El contenido redactado en el editor se previsualizará aquí con el formato web exacto...</p>'
                }}
            />

            {/* Cierre institucional del artículo */}
            <div className="mt-12 pt-6 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
                <span className="font-semibold text-gray-700">Tiro Federal Formosa · Prensa Oficial</span>
                <span>Fundado en 1911 · Formosa, Argentina</span>
            </div>
        </article>
    );

    // Si se activa el modo simulador de navegador (Wireframe Imagen 2)
    if (isSimulatedBrowser) {
        return (
            <div className="rounded-2xl border border-gray-300 bg-white shadow-xl overflow-hidden max-w-4xl mx-auto">
                {/* Barra superior de navegador web (Imagen 2) */}
                <div className="bg-gray-100 border-b border-gray-200 px-4 py-2.5 flex items-center justify-between select-none">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                        <div className="w-3 h-3 rounded-full bg-green-400" />
                        <span className="text-xs font-mono text-gray-500 ml-2 hidden sm:inline">
                            tirofederalformosa.com.ar/noticias/...
                        </span>
                    </div>
                    <Badge variant="outline" className="text-[10px] bg-white text-gray-600 border-gray-300">
                        Vista Previa Artículo Web (Imágenes 2 y 3)
                    </Badge>
                </div>

                {/* Menú institucional superior simulado (Imagen 2) */}
                <div className="bg-slate-900 text-white px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xs">
                            TF
                        </div>
                        <span className="font-bold text-sm tracking-wide uppercase">Tiro Federal Formosa</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-300 font-medium hidden sm:flex">
                        <span>Inicio</span>
                        <span>Historia</span>
                        <span>Disciplinas</span>
                        <span className="text-blue-400 font-bold">Prensa y Noticias</span>
                        <span>Contacto</span>
                    </div>
                </div>

                {/* Contenido del Artículo */}
                <div className="bg-white">
                    {articleContent}
                </div>

                {/* Pie de página institucional simulado (Imagen 2) */}
                <div className="bg-slate-900 text-gray-400 px-6 py-6 border-t border-slate-800 text-xs">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                            <span className="text-white font-medium">Tiro Federal Formosa</span>
                            <span>— Tradición, disciplina y seguridad</span>
                        </div>
                        <div className="text-center sm:text-right text-[11px] text-gray-500">
                            Ruta Nacional N.º 11, Km 1172 · Formosa, Argentina
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return articleContent;
}
