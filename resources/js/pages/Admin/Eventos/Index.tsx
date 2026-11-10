import { Head } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog';
import { Calendar, Users, Target, Plus, Trophy, Clock, CheckCircle2, Sliders, Shield } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Inicio', href: '/admin/dashboard' },
    { title: 'Eventos y Torneos', href: '/admin/eventos' },
];

interface Evento {
    id: number;
    titulo: string;
    disciplina: string;
    fecha: string;
    hora: string;
    cupoMaximo: number;
    inscriptos: number;
    arancel: number;
    estado: 'Abierto' | 'Lleno' | 'Finalizado';
    lugar: string;
}

const initialEventos: Evento[] = [
    { id: 1, titulo: 'Torneo Provincial FBI & Tiro Rápido', disciplina: 'Pistola Grueso Calibre', fecha: '22/11/2026', hora: '09:00', cupoMaximo: 35, inscriptos: 28, arancel: 6500, estado: 'Abierto', lugar: 'Líneas 1 a 6 + Sector Dinámico' },
    { id: 2, titulo: 'Clínica de Iniciación al Tiro Deportivo', disciplina: 'Tiro Neumático y .22 LR', fecha: '29/11/2026', hora: '10:00', cupoMaximo: 18, inscriptos: 18, arancel: 4000, estado: 'Lleno', lugar: 'Líneas 7 a 9 (Pedanas Neumáticas)' },
    { id: 3, titulo: 'Copa Aniversario Tiro Federal Formosa', disciplina: 'Rifle Precisión 50m', fecha: '12/12/2026', hora: '08:30', cupoMaximo: 45, inscriptos: 14, arancel: 8000, estado: 'Abierto', lugar: 'Polígono Completo' },
    { id: 4, titulo: 'Torneo Nocturno de Precisión Calibre .22', disciplina: 'Pistola .22 LR', fecha: '18/10/2026', hora: '20:00', cupoMaximo: 25, inscriptos: 25, arancel: 5000, estado: 'Finalizado', lugar: 'Líneas 1 a 5' },
];

interface LineaPoligono {
    numero: number;
    nombre: string;
    disciplina: string;
    capacidad: number;
    activa: boolean;
}

const defaultLineas: LineaPoligono[] = [
    { numero: 1, nombre: 'Línea 1', disciplina: 'Armas Cortas (9mm, .45, .40)', capacidad: 3, activa: true },
    { numero: 2, nombre: 'Línea 2', disciplina: 'Armas Cortas (9mm, .45, .40)', capacidad: 3, activa: true },
    { numero: 3, nombre: 'Línea 3', disciplina: 'Armas Cortas y .22 LR', capacidad: 3, activa: true },
    { numero: 4, nombre: 'Línea 4', disciplina: 'Armas Cortas y .22 LR', capacidad: 3, activa: true },
    { numero: 5, nombre: 'Línea 5', disciplina: 'Armas Largas Carabina .22', capacidad: 3, activa: true },
    { numero: 6, nombre: 'Línea 6', disciplina: 'Armas Largas / Fusil FUSIL 50m', capacidad: 2, activa: true },
    { numero: 7, nombre: 'Línea 7', disciplina: 'Tiro Neumático / Aire 10m', capacidad: 3, activa: true },
    { numero: 8, nombre: 'Línea 8', disciplina: 'Tiro Neumático / Aire 10m', capacidad: 3, activa: true },
    { numero: 9, nombre: 'Línea 9', disciplina: 'Tiro Neumático y Escuela', capacidad: 3, activa: true },
];

export default function EventosIndex() {
    const [tab, setTab] = useState<'proximos' | 'poligono'>('proximos');
    const [eventos, setEventos] = useState<Evento[]>(initialEventos);
    const [lineas, setLineas] = useState<LineaPoligono[]>(defaultLineas);
    const [capacidadDinamica, setCapacidadDinamica] = useState(12);
    const [sectorDinamicoActivo, setSectorDinamicoActivo] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);

    const [form, setForm] = useState({
        titulo: '',
        disciplina: 'Pistola Grueso Calibre',
        fecha: '',
        hora: '09:00',
        cupoMaximo: '30',
        arancel: '5000',
        lugar: 'Polígono Principal',
    });

    const toggleLinea = (numero: number) => {
        setLineas(lineas.map(l => l.numero === numero ? { ...l, activa: !l.activa } : l));
    };

    const handleCrearEvento = (e: React.FormEvent) => {
        e.preventDefault();
        const nuevo: Evento = {
            id: Date.now(),
            titulo: form.titulo,
            disciplina: form.disciplina,
            fecha: form.fecha,
            hora: form.hora,
            cupoMaximo: Number(form.cupoMaximo) || 20,
            inscriptos: 0,
            arancel: Number(form.arancel) || 0,
            estado: 'Abierto',
            lugar: form.lugar,
        };
        setEventos([nuevo, ...eventos]);
        setDialogOpen(false);
        setForm({ titulo: '', disciplina: 'Pistola Grueso Calibre', fecha: '', hora: '09:00', cupoMaximo: '30', arancel: '5000', lugar: 'Polígono Principal' });
    };

    const capacidadTotal = lineas.filter(l => l.activa).reduce((acc, l) => acc + l.capacidad, 0) + (sectorDinamicoActivo ? capacidadDinamica : 0);

    return (
        <>
            <Head title="Eventos y Torneos - Tiro Federal Formosa" />
            <div className="flex flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Eventos, Torneos y Capacidad</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Cronograma competitivo, cursos formativos y parametrización de líneas del polígono (RF12, RF13, RF14)
                        </p>
                    </div>
                    {tab === 'proximos' && (
                        <Button onClick={() => setDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                            <Plus className="w-4 h-4" /> Nuevo Evento
                        </Button>
                    )}
                </div>

                {/* Tabs switcher */}
                <div className="flex border-b border-gray-200">
                    <button
                        onClick={() => setTab('proximos')}
                        className={`pb-3 px-4 font-semibold text-sm border-b-2 flex items-center gap-2 transition-colors ${
                            tab === 'proximos'
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-800'
                        }`}
                    >
                        <Trophy className="w-4 h-4" /> Cronograma de Torneos y Cursos
                    </button>
                    <button
                        onClick={() => setTab('poligono')}
                        className={`pb-3 px-4 font-semibold text-sm border-b-2 flex items-center gap-2 transition-colors ${
                            tab === 'poligono'
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-800'
                        }`}
                    >
                        <Target className="w-4 h-4" /> Capacidad Física del Polígono ({capacidadTotal} tiradores simultáneos)
                    </button>
                </div>

                {tab === 'proximos' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {eventos.map((ev) => (
                            <Card key={ev.id} className="overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                                <div className="h-3 bg-blue-600" />
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between gap-2 mb-2">
                                        <Badge className={`text-xs ${
                                            ev.estado === 'Abierto' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                            ev.estado === 'Lleno' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                            'bg-gray-100 text-gray-600'
                                        }`}>
                                            {ev.estado}
                                        </Badge>
                                        <span className="text-xs text-gray-500 flex items-center gap-1">
                                            <Calendar className="w-3.5 h-3.5" /> {ev.fecha}
                                        </span>
                                    </div>
                                    <CardTitle className="text-base font-bold text-gray-900 leading-snug">
                                        {ev.titulo}
                                    </CardTitle>
                                    <CardDescription className="text-xs text-blue-600 font-medium">
                                        {ev.disciplina}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3 pt-0">
                                    <div className="text-xs text-gray-600 flex items-center gap-1.5">
                                        <Clock className="w-3.5 h-3.5 text-gray-400" /> {ev.hora} hs — {ev.lugar}
                                    </div>

                                    {/* Barra de progreso de cupos */}
                                    <div>
                                        <div className="flex justify-between text-xs font-medium text-gray-600 mb-1">
                                            <span className="flex items-center gap-1">
                                                <Users className="w-3.5 h-3.5" /> Inscriptos
                                            </span>
                                            <span>{ev.inscriptos} / {ev.cupoMaximo}</span>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                                            <div
                                                className={`h-2 rounded-full ${
                                                    ev.inscriptos >= ev.cupoMaximo ? 'bg-amber-500' : 'bg-blue-600'
                                                }`}
                                                style={{ width: `${Math.min(100, (ev.inscriptos / ev.cupoMaximo) * 100)}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                        <div className="text-xs text-gray-500">
                                            Arancel: <span className="font-semibold text-gray-900">${ev.arancel.toLocaleString('es-AR')}</span>
                                        </div>
                                        <Button size="sm" variant="outline" className="text-xs h-8">
                                            Ver Inscriptos
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    /* Configuración de Capacidad del Polígono (RF13) */
                    <div className="space-y-6">
                        <Card className="bg-blue-50/50 border-blue-200">
                            <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                                        <Shield className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-sm">Parametrización Operativa del Polígono</h3>
                                        <p className="text-xs text-gray-600">
                                            Establece la capacidad física máxima por línea para prevenir solapamientos de turnos (RF13 y RF15)
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-black text-blue-700">{capacidadTotal}</div>
                                    <div className="text-xs text-gray-500">Capacidad Total Simultánea</div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Grilla de 9 Líneas */}
                        <div>
                            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">
                                Las 9 Líneas Principales de Tiro (Pedanas Fijas)
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {lineas.map((linea) => (
                                    <Card key={linea.numero} className={`border transition-all ${linea.activa ? 'border-gray-200 bg-white' : 'border-gray-200 bg-gray-50 opacity-70'}`}>
                                        <CardContent className="p-4 flex items-center justify-between">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-gray-900 text-base">{linea.nombre}</span>
                                                    <Badge className={linea.activa ? 'bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px]' : 'bg-gray-100 text-gray-500 text-[10px]'}>
                                                        {linea.activa ? 'Operativa' : 'Mantenimiento'}
                                                    </Badge>
                                                </div>
                                                <div className="text-xs text-gray-500">{linea.disciplina}</div>
                                                <div className="text-xs font-semibold text-blue-600">
                                                    Capacidad: {linea.capacidad} tiradores simultáneos
                                                </div>
                                            </div>
                                            <Switch
                                                checked={linea.activa}
                                                onCheckedChange={() => toggleLinea(linea.numero)}
                                            />
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        {/* Sector Dinámico */}
                        <Card className="border-gray-200">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="text-base font-bold text-gray-900">Sector Dinámico (IPSC / Tiro Práctico)</CardTitle>
                                        <CardDescription className="text-xs text-gray-500">
                                            Espacio libre para recorridos y tiro en movimiento con instructor asignado
                                        </CardDescription>
                                    </div>
                                    <Switch
                                        checked={sectorDinamicoActivo}
                                        onCheckedChange={setSectorDinamicoActivo}
                                    />
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <Label htmlFor="capDinamica" className="text-sm font-medium text-gray-700 min-w-40">
                                        Capacidad permitida:
                                    </Label>
                                    <Input
                                        id="capDinamica"
                                        type="number"
                                        className="w-24"
                                        min={1}
                                        max={30}
                                        value={capacidadDinamica}
                                        onChange={e => setCapacidadDinamica(Number(e.target.value) || 0)}
                                    />
                                    <span className="text-xs text-gray-500">tiradores en pedana simultáneos</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Modal Crear Evento */}
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Programar Nuevo Evento o Torneo</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleCrearEvento} className="space-y-4 pt-2">
                            <div>
                                <Label htmlFor="evTitulo">Título del Evento</Label>
                                <Input
                                    id="evTitulo"
                                    required
                                    placeholder="Ej: Torneo Apertura 2026"
                                    value={form.titulo}
                                    onChange={e => setForm({ ...form, titulo: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="evDisc">Disciplina</Label>
                                    <Input
                                        id="evDisc"
                                        required
                                        value={form.disciplina}
                                        onChange={e => setForm({ ...form, disciplina: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="evLugar">Líneas Asignadas</Label>
                                    <Input
                                        id="evLugar"
                                        required
                                        value={form.lugar}
                                        onChange={e => setForm({ ...form, lugar: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <Label htmlFor="evFecha">Fecha</Label>
                                    <Input
                                        id="evFecha"
                                        type="date"
                                        required
                                        value={form.fecha}
                                        onChange={e => setForm({ ...form, fecha: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="evHora">Hora Inicio</Label>
                                    <Input
                                        id="evHora"
                                        type="time"
                                        required
                                        value={form.hora}
                                        onChange={e => setForm({ ...form, hora: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="evCupo">Cupo Máx.</Label>
                                    <Input
                                        id="evCupo"
                                        type="number"
                                        required
                                        value={form.cupoMaximo}
                                        onChange={e => setForm({ ...form, cupoMaximo: e.target.value })}
                                    />
                                </div>
                            </div>
                            <DialogFooter className="pt-2">
                                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                                    Cancelar
                                </Button>
                                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                                    Publicar Evento
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}



EventosIndex.layout = {
    breadcrumbs,
};
