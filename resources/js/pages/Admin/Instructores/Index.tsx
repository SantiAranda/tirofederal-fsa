import { Head } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog';
import { GraduationCap, Award, Calendar, Phone, Mail, Plus, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Inicio', href: '/admin/dashboard' },
    { title: 'Instructores', href: '/admin/instructores' },
];

interface Instructor {
    id: number;
    nombre: string;
    matricula: string;
    vencimientoMatricula: string;
    especialidad: string;
    telefono: string;
    email: string;
    turnosAsignadosSemana: number;
    estado: 'Vigente' | 'Por Vencer' | 'Vencida';
    calificacionPromedio: number;
}

const mockInstructores: Instructor[] = [
    {
        id: 1,
        nombre: 'Carlos Alberto Rodríguez',
        matricula: 'ITA-ANMaC-45812',
        vencimientoMatricula: '15/08/2027',
        especialidad: 'Pistola Grueso Calibre e IPSC',
        telefono: '3704 554433',
        email: 'carlos.rodriguez@tirofederalformosa.org.ar',
        turnosAsignadosSemana: 8,
        estado: 'Vigente',
        calificacionPromedio: 4.9,
    },
    {
        id: 2,
        nombre: 'Ana Laura Gómez',
        matricula: 'ITB-ANMaC-90231',
        vencimientoMatricula: '20/12/2026',
        especialidad: 'Tiro Neumático y Carabina .22',
        telefono: '3704 667788',
        email: 'ana.gomez@tirofederalformosa.org.ar',
        turnosAsignadosSemana: 5,
        estado: 'Por Vencer',
        calificacionPromedio: 4.8,
    },
    {
        id: 3,
        nombre: 'Luis Fernando Morales',
        matricula: 'ITA-ANMaC-33419',
        vencimientoMatricula: '05/03/2027',
        especialidad: 'Fusil de Precisión y Polígono General',
        telefono: '3704 112233',
        email: 'luis.morales@tirofederalformosa.org.ar',
        turnosAsignadosSemana: 12,
        estado: 'Vigente',
        calificacionPromedio: 4.7,
    },
];

export default function InstructoresIndex() {
    const [instructores, setInstructores] = useState<Instructor[]>(mockInstructores);
    const [dialogOpen, setDialogOpen] = useState(false);

    const [form, setForm] = useState({
        nombre: '',
        matricula: '',
        vencimientoMatricula: '',
        especialidad: 'Pistola y Armas Cortas',
        telefono: '',
        email: '',
    });

    const handleCrear = (e: React.FormEvent) => {
        e.preventDefault();
        const nuevo: Instructor = {
            id: Date.now(),
            nombre: form.nombre,
            matricula: form.matricula,
            vencimientoMatricula: form.vencimientoMatricula,
            especialidad: form.especialidad,
            telefono: form.telefono,
            email: form.email,
            turnosAsignadosSemana: 0,
            estado: 'Vigente',
            calificacionPromedio: 5.0,
        };
        setInstructores([...instructores, nuevo]);
        setDialogOpen(false);
        setForm({ nombre: '', matricula: '', vencimientoMatricula: '', especialidad: 'Pistola y Armas Cortas', telefono: '', email: '' });
    };

    return (
        <>
            <Head title="Instructores de Tiro - Tiro Federal Formosa" />
            <div className="flex flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Cuerpo de Instructores Matriculados</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Control de matrículas habilitantes ANMaC (ITA / ITB) y asignación de clases (RF17 y RF18)
                        </p>
                    </div>
                    <Button onClick={() => setDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                        <Plus className="w-4 h-4" /> Alta Instructor
                    </Button>
                </div>

                {/* Métricas rápidas */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Instructores Activos</CardTitle>
                            <GraduationCap className="w-4 h-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">{instructores.length}</div>
                            <p className="text-xs text-gray-500 mt-1">Habilitados en ANMaC</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Matrículas Vigentes</CardTitle>
                            <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">
                                {instructores.filter(i => i.estado === 'Vigente').length}
                            </div>
                            <p className="text-xs text-emerald-600 mt-1 font-medium">Habilitados sin observaciones</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Atención de Alumnos</CardTitle>
                            <Award className="w-4 h-4 text-amber-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">4.8 / 5.0</div>
                            <p className="text-xs text-gray-500 mt-1">Promedio de satisfacción (RF20)</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Grilla de Instructores */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {instructores.map((inst) => (
                        <Card key={inst.id} className="border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg">
                                            {inst.nombre.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-base">{inst.nombre}</h3>
                                            <p className="text-xs text-blue-600 font-medium">{inst.especialidad}</p>
                                        </div>
                                    </div>
                                    <Badge className={`text-xs ${
                                        inst.estado === 'Vigente' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                        inst.estado === 'Por Vencer' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                        'bg-rose-50 text-rose-700 border-rose-200'
                                    }`}>
                                        {inst.estado}
                                    </Badge>
                                </div>

                                <div className="mt-4 pt-4 border-t border-gray-100 space-y-2 text-xs text-gray-600">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-500 font-medium">Matrícula ANMaC:</span>
                                        <span className="font-mono font-semibold text-gray-900">{inst.matricula}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-500 font-medium">Vencimiento:</span>
                                        <span className={`font-medium ${inst.estado === 'Por Vencer' ? 'text-amber-600 font-bold' : 'text-gray-700'}`}>
                                            {inst.vencimientoMatricula}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-500 font-medium">Turnos esta semana:</span>
                                        <span className="font-semibold text-blue-600">{inst.turnosAsignadosSemana} turnos</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-500 font-medium">Calificación:</span>
                                        <span className="font-bold text-amber-600">★ {inst.calificacionPromedio}</span>
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-gray-100 space-y-1.5 text-xs text-gray-500">
                                    <div className="flex items-center gap-2 truncate">
                                        <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                        <span className="truncate">{inst.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                        <span>{inst.telefono}</span>
                                    </div>
                                </div>

                                <div className="mt-5 flex gap-2">
                                    <Button size="sm" variant="outline" className="flex-1 text-xs h-8">
                                        Ver Agenda
                                    </Button>
                                    <Button size="sm" variant="ghost" className="text-xs h-8 text-blue-600 hover:bg-blue-50">
                                        Editar
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Modal Nuevo Instructor */}
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Registrar Instructor Matriculado</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleCrear} className="space-y-4 pt-2">
                            <div>
                                <Label htmlFor="instNombre">Nombre y Apellido</Label>
                                <Input
                                    id="instNombre"
                                    required
                                    placeholder="Ej: Marcelo Daniel Ríos"
                                    value={form.nombre}
                                    onChange={e => setForm({ ...form, nombre: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="instMatr">N° Matrícula ANMaC</Label>
                                    <Input
                                        id="instMatr"
                                        required
                                        placeholder="ITA-ANMaC-..."
                                        value={form.matricula}
                                        onChange={e => setForm({ ...form, matricula: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="instVenc">Vencimiento Matrícula</Label>
                                    <Input
                                        id="instVenc"
                                        type="date"
                                        required
                                        value={form.vencimientoMatricula}
                                        onChange={e => setForm({ ...form, vencimientoMatricula: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="instEsp">Especialidad Principal</Label>
                                <Input
                                    id="instEsp"
                                    required
                                    value={form.especialidad}
                                    onChange={e => setForm({ ...form, especialidad: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="instTel">Teléfono</Label>
                                    <Input
                                        id="instTel"
                                        placeholder="3704 ..."
                                        value={form.telefono}
                                        onChange={e => setForm({ ...form, telefono: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="instMail">Correo Electrónico</Label>
                                    <Input
                                        id="instMail"
                                        type="email"
                                        placeholder="nombre@club.org.ar"
                                        value={form.email}
                                        onChange={e => setForm({ ...form, email: e.target.value })}
                                    />
                                </div>
                            </div>
                            <DialogFooter className="pt-2">
                                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                                    Cancelar
                                </Button>
                                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                                    Guardar Instructor
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}



InstructoresIndex.layout = {
    breadcrumbs,
};
