import { Head } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog';
import { Newspaper, Plus, Calendar, Eye, Trash2, Edit3 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Inicio', href: '/admin/dashboard' },
    { title: 'Noticias y Prensa', href: '/admin/noticias' },
];

interface Noticia {
    id: number;
    titulo: string;
    categoria: string;
    fecha: string;
    publicado: boolean;
    vistas: number;
}

const mockNoticias: Noticia[] = [
    { id: 1, titulo: 'Apertura de inscripciones para el Torneo Provincial FBI 2026', categoria: 'Torneos', fecha: '05/11/2026', publicado: true, vistas: 342 },
    { id: 2, titulo: 'Horarios de verano y mantenimiento programado en pedanas', categoria: 'Institucional', fecha: '28/10/2026', publicado: true, vistas: 215 },
    { id: 3, titulo: 'Nuevo convenio de municiones e insumos para socios activos', categoria: 'Beneficios', fecha: '14/10/2026', publicado: true, vistas: 489 },
    { id: 4, titulo: 'Conmemoración del Aniversario Fundacional del Tiro Federal Formosa', categoria: 'Historia', fecha: '01/09/2026', publicado: true, vistas: 820 },
];

export default function NoticiasIndex() {
    const [noticias, setNoticias] = useState<Noticia[]>(mockNoticias);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [categoria, setCategoria] = useState('Institucional');

    const handleCrear = (e: React.FormEvent) => {
        e.preventDefault();
        const nueva: Noticia = {
            id: Date.now(),
            titulo,
            categoria,
            fecha: new Date().toLocaleDateString('es-AR'),
            publicado: true,
            vistas: 0,
        };
        setNoticias([nueva, ...noticias]);
        setDialogOpen(false);
        setTitulo('');
    };

    return (
        <>
            <Head title="Noticias y Prensa - Tiro Federal Formosa" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Prensa y Comunicados del Club</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Publicación de novedades visibles en la landing page pública y portal de socios (RF31)
                        </p>
                    </div>
                    <Button onClick={() => setDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                        <Plus className="w-4 h-4" /> Nueva Noticia
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {noticias.map((n) => (
                        <Card key={n.id} className="border border-gray-200 hover:shadow-sm transition-shadow">
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between gap-2 mb-2">
                                    <Badge className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                                        {n.categoria}
                                    </Badge>
                                    <span className="text-xs text-gray-500 flex items-center gap-1">
                                        <Calendar className="w-3.5 h-3.5" /> {n.fecha}
                                    </span>
                                </div>
                                <CardTitle className="text-base font-bold text-gray-900 leading-snug">
                                    {n.titulo}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs text-gray-500">
                                    <span className="flex items-center gap-1">
                                        <Eye className="w-3.5 h-3.5" /> {n.vistas} lecturas
                                    </span>
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="ghost" className="h-7 text-xs text-blue-600">
                                            <Edit3 className="w-3.5 h-3.5 mr-1" /> Editar
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Publicar Nueva Noticia</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleCrear} className="space-y-4 pt-2">
                            <div>
                                <Label htmlFor="notTitulo">Título del Comunicado</Label>
                                <Input
                                    id="notTitulo"
                                    required
                                    placeholder="Ej: Resultados del Campeonato Provincial"
                                    value={titulo}
                                    onChange={e => setTitulo(e.target.value)}
                                />
                            </div>
                            <div>
                                <Label htmlFor="notCat">Categoría</Label>
                                <select
                                    id="notCat"
                                    value={categoria}
                                    onChange={e => setCategoria(e.target.value)}
                                    className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 mt-1"
                                >
                                    <option value="Institucional">Institucional</option>
                                    <option value="Torneos">Torneos y Competencias</option>
                                    <option value="Beneficios">Beneficios para Socios</option>
                                    <option value="Capacitación">Capacitaciones y Cursos</option>
                                </select>
                            </div>
                            <DialogFooter className="pt-2">
                                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                                    Cancelar
                                </Button>
                                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                                    Publicar
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}



NoticiasIndex.layout = {
    breadcrumbs,
};
