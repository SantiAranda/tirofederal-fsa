import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import {
    Newspaper, ArrowLeft, Eye, Edit3, Save, Upload,
    Image as ImageIcon, Calendar, CheckCircle2, AlertCircle, FileText
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import WysiwygEditor from '@/components/wysiwyg-editor';
import NewsArticlePreview from '@/components/news-article-preview';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Inicio', href: '/admin/dashboard' },
    { title: 'Noticias y Prensa', href: '/admin/noticias' },
    { title: 'Redactar Noticia', href: '/admin/noticias/create' },
];

export default function NoticiaCreate() {
    const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm({
        titulo: '',
        categoria: 'Institucional',
        copete: '',
        contenido: '',
        epigrafe: '',
        imagen: null as File | null,
        publicada: true,
        fecha_publicacion: new Date().toISOString().slice(0, 16),
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('imagen', file);
            const objectUrl = URL.createObjectURL(file);
            setImagePreviewUrl(objectUrl);
        }
    };

    const handleSubmit = (e: React.FormEvent, publicada: boolean = true) => {
        e.preventDefault();
        // Guardamos el estado deseado
        data.publicada = publicada;
        post('/admin/noticias', {
            forceFormData: true,
        });
    };

    // Contador de caracteres para la descripción corta (0/180) — Imagen 1
    const copeteLength = data.copete.length;
    const maxCopete = 180;

    return (
        <div className="space-y-6 max-w-6xl mx-auto pb-12">
            <Head title="Redactar Noticia - Tiro Federal Formosa" />

            {/* Cabecera */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="icon" asChild className="h-9 w-9">
                        <Link href="/admin/noticias">
                            <ArrowLeft className="w-4 h-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
                            <Newspaper className="w-6 h-6 text-blue-600" />
                            Redactar Nueva Noticia
                        </h1>
                        <p className="text-sm text-gray-500">
                            Publicación para la landing page institucional y el portal de socios
                        </p>
                    </div>
                </div>

                {/* Alternador de Modo: Editor vs Vista Previa Artículo Web */}
                <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-xl self-start sm:self-auto">
                    <button
                        type="button"
                        onClick={() => setActiveTab('editor')}
                        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            activeTab === 'editor'
                                ? 'bg-white text-blue-700 shadow-xs'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        <Edit3 className="w-3.5 h-3.5" />
                        Editor / Redacción
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('preview')}
                        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            activeTab === 'preview'
                                ? 'bg-white text-blue-700 shadow-xs'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        <Eye className="w-3.5 h-3.5" />
                        Vista Previa Artículo Web
                    </button>
                </div>
            </div>

            {/* Contenido según pestaña */}
            {activeTab === 'preview' ? (
                <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-800 flex items-center justify-between">
                        <span>
                            💡 Estás viendo cómo se presentará este artículo en la web según el estándar editorial (Imágenes 2 y 3).
                        </span>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setActiveTab('editor')}
                            className="text-xs bg-white text-blue-700 border-blue-200"
                        >
                            <Edit3 className="w-3.5 h-3.5 mr-1" /> Volver al Editor
                        </Button>
                    </div>

                    <NewsArticlePreview
                        titulo={data.titulo}
                        categoria={data.categoria}
                        copete={data.copete}
                        contenido={data.contenido}
                        imagenPortadaUrl={imagePreviewUrl}
                        epigrafe={data.epigrafe}
                        fecha={data.fecha_publicacion}
                        isSimulatedBrowser={true}
                    />
                </div>
            ) : (
                <form onSubmit={(e) => handleSubmit(e, true)} className="space-y-6">
                    {/* Tarjeta de Datos Principales */}
                    <Card>
                        <CardHeader className="pb-4">
                            <CardTitle className="text-base font-semibold">Encabezado y Metadatos de la Noticia</CardTitle>
                            <CardDescription>Definí el título principal y la categoría institucional</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="md:col-span-2 space-y-1.5">
                                    <Label htmlFor="titulo" className="font-semibold text-gray-800">
                                        Título Principal de la Noticia (H1) *
                                    </Label>
                                    <Input
                                        id="titulo"
                                        required
                                        placeholder="Ej: El Tiro Federal Formosa inaugura nueva pedana de tiro práctico"
                                        value={data.titulo}
                                        onChange={(e) => setData('titulo', e.target.value)}
                                        className="h-11 text-base font-medium"
                                    />
                                    {errors.titulo && <p className="text-xs text-red-600">{errors.titulo}</p>}
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="categoria" className="font-semibold text-gray-800">
                                        Categoría / Sección *
                                    </Label>
                                    <select
                                        id="categoria"
                                        value={data.categoria}
                                        onChange={(e) => setData('categoria', e.target.value)}
                                        className="w-full h-11 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    >
                                        <option value="Institucional">Institucional</option>
                                        <option value="Torneos">Torneos y Competencias</option>
                                        <option value="Capacitación">Capacitación y Cursos</option>
                                        <option value="Armería">Armería y Municiones</option>
                                        <option value="Comunidad">Comunidad de Tiradores</option>
                                    </select>
                                    {errors.categoria && <p className="text-xs text-red-600">{errors.categoria}</p>}
                                </div>
                            </div>

                            {/* 1. Descripción Corta (Resumen Destacado) * — Idéntico a Imagen 1 */}
                            <div className="space-y-1.5 pt-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="copete" className="font-semibold text-gray-800">
                                        Descripción Corta (Resumen Destacado) *
                                    </Label>
                                    <span className={`text-xs font-mono ${copeteLength > maxCopete ? 'text-red-600 font-bold' : 'text-gray-500'}`}>
                                        {copeteLength}/{maxCopete}
                                    </span>
                                </div>
                                <textarea
                                    id="copete"
                                    rows={2}
                                    placeholder="Ej: Calzado deportivo de alto rendimiento para entrenamientos intensos y fondo de larga distancia."
                                    value={data.copete}
                                    onChange={(e) => setData('copete', e.target.value)}
                                    maxLength={300}
                                    className="w-full rounded-lg border border-gray-300 p-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all leading-relaxed"
                                />
                                <div className="flex items-center justify-between text-xs text-gray-500">
                                    <span>Se visualiza en los primeros renglones y alimenta los resultados de búsqueda.</span>
                                </div>
                                {errors.copete && <p className="text-xs text-red-600">{errors.copete}</p>}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tarjeta de Imagen de Portada y Epígrafe — Idéntico a Imagen 3 */}
                    <Card>
                        <CardHeader className="pb-4">
                            <CardTitle className="text-base font-semibold">Fotografía de Portada y Epígrafe</CardTitle>
                            <CardDescription>
                                Imagen principal que encabezará el artículo (estilo periodístico)
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                                <div className="space-y-2">
                                    <Label htmlFor="imagenPortada">Seleccionar archivo de imagen</Label>
                                    <div className="flex items-center gap-3">
                                        <label className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg cursor-pointer text-xs font-semibold border border-gray-300 transition-colors">
                                            <Upload className="w-4 h-4 text-gray-600" />
                                            Subir fotografía
                                            <input
                                                id="imagenPortada"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="hidden"
                                            />
                                        </label>
                                        <span className="text-xs text-gray-500">JPG, PNG o WEBP (hasta 5MB)</span>
                                    </div>
                                    {errors.imagen && <p className="text-xs text-red-600">{errors.imagen}</p>}

                                    {/* Epígrafe de la Foto de Portada — Imagen 3 */}
                                    <div className="space-y-1.5 pt-3">
                                        <Label htmlFor="epigrafe" className="text-xs font-semibold text-gray-700">
                                            Epígrafe de la Foto Principal (Pie de foto)
                                        </Label>
                                        <Input
                                            id="epigrafe"
                                            placeholder="Ej: El plano general de la línea de tiro durante la jornada de apertura..."
                                            value={data.epigrafe}
                                            onChange={(e) => setData('epigrafe', e.target.value)}
                                            className="text-xs h-9"
                                        />
                                        <p className="text-[11px] text-gray-500 italic">
                                            Aparece exactamente debajo de la imagen en cursiva, estilo Infobae/Clarín.
                                        </p>
                                    </div>
                                </div>

                                {/* Preview de la foto cargada */}
                                <div className="border border-dashed border-gray-300 rounded-xl p-3 bg-gray-50/50 flex flex-col items-center justify-center min-h-[160px] text-center">
                                    {imagePreviewUrl ? (
                                        <div className="w-full space-y-2">
                                            <img
                                                src={imagePreviewUrl}
                                                alt="Previsualización"
                                                className="max-h-48 w-full object-cover rounded-lg shadow-xs"
                                            />
                                            {data.epigrafe && (
                                                <p className="text-xs text-gray-500 italic text-left">{data.epigrafe}</p>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center gap-1.5 text-gray-400 py-4">
                                            <ImageIcon className="w-8 h-8 stroke-1" />
                                            <span className="text-xs">No hay imagen seleccionada todavía</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 2. Descripción Detallada con WYSIWYG — Idéntico a Imagen 1 */}
                    <Card>
                        <CardHeader className="pb-3 flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-base font-semibold">Descripción Detallada</CardTitle>
                                <CardDescription>Cuerpo del artículo con formato enriquecido</CardDescription>
                            </div>
                            <span className="text-xs text-gray-500 font-medium">
                                Editor con formato enriquecido (WYSIWYG)
                            </span>
                        </CardHeader>
                        <CardContent>
                            <WysiwygEditor
                                value={data.contenido}
                                onChange={(html) => setData('contenido', html)}
                                placeholder="Detalla los beneficios, sensación al uso, tecnologías patentadas e información relevante para el cliente..."
                                minHeight="360px"
                            />
                            {errors.contenido && <p className="text-xs text-red-600 mt-2">{errors.contenido}</p>}
                        </CardContent>
                    </Card>

                    {/* Opciones de Publicación */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                                <div className="space-y-1.5">
                                    <Label htmlFor="fecha_publicacion" className="text-xs font-semibold text-gray-700">
                                        Fecha y Hora de Publicación
                                    </Label>
                                    <Input
                                        id="fecha_publicacion"
                                        type="datetime-local"
                                        value={data.fecha_publicacion}
                                        onChange={(e) => setData('fecha_publicacion', e.target.value)}
                                        className="h-10 text-xs"
                                    />
                                </div>

                                <div className="flex items-center gap-3 pt-4 sm:pt-0">
                                    <input
                                        id="publicada"
                                        type="checkbox"
                                        checked={data.publicada}
                                        onChange={(e) => setData('publicada', e.target.checked)}
                                        className="w-4 h-4 rounded text-blue-600 border-gray-300 focus:ring-blue-500"
                                    />
                                    <Label htmlFor="publicada" className="text-sm font-medium text-gray-800 cursor-pointer">
                                        Publicar de inmediato en el portal web público
                                    </Label>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Botones de acción */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-200">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setActiveTab('preview')}
                            className="gap-2 w-full sm:w-auto"
                        >
                            <Eye className="w-4 h-4" /> Previsualizar como Artículo Web
                        </Button>

                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <Button
                                type="button"
                                variant="ghost"
                                asChild
                                className="w-full sm:w-auto"
                            >
                                <Link href="/admin/noticias">Cancelar</Link>
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                disabled={processing}
                                onClick={(e) => handleSubmit(e, false)}
                                className="w-full sm:w-auto"
                            >
                                Guardar Borrador
                            </Button>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 hover:bg-blue-700 text-white gap-2 w-full sm:w-auto shadow-sm"
                            >
                                <Save className="w-4 h-4" />
                                {processing ? 'Guardando...' : 'Publicar Noticia'}
                            </Button>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
}

NoticiaCreate.layout = {
    breadcrumbs,
};
