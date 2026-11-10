import { Head } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import { useState } from 'react';
import {
    Card, CardContent, CardHeader, CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Tags, Users, DollarSign, Pencil, Plus, ToggleLeft } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Inicio', href: '/admin/dashboard' },
    { title: 'Membresías', href: '/admin/membresias' },
];

interface Membresia {
    id: number;
    nombre: string;
    descripcion: string;
    cuotaMensual: number;
    cuotaIngreso: number;
    activo: boolean;
    socios: number;
}

const initialData: Membresia[] = [
    { id: 1, nombre: 'Plan Básico', descripcion: 'Acceso estándar a instalaciones y polígono de tiro.', cuotaMensual: 8000, cuotaIngreso: 15000, activo: true, socios: 42 },
    { id: 2, nombre: 'Plan Familiar', descripcion: 'Cobertura para grupo familiar (hasta 4 integrantes).', cuotaMensual: 12000, cuotaIngreso: 20000, activo: true, socios: 18 },
    { id: 3, nombre: 'Plan Juvenil', descripcion: 'Para socios menores de 25 años con acreditación.', cuotaMensual: 5000, cuotaIngreso: 8000, activo: true, socios: 11 },
    { id: 4, nombre: 'Plan Premium', descripcion: 'Acceso VIP, clases con instructor incluidas.', cuotaMensual: 18000, cuotaIngreso: 30000, activo: false, socios: 0 },
];

const fmt = (n: number) =>
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n);

export default function MembresiasIndex() {
    const [membresias, setMembresias] = useState<Membresia[]>(initialData);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editTarget, setEditTarget] = useState<Membresia | null>(null);

    const [form, setForm] = useState({
        nombre: '',
        descripcion: '',
        cuotaMensual: '',
        cuotaIngreso: '',
        activo: true,
    });

    const totalSocios = membresias.filter(m => m.activo).reduce((s, m) => s + m.socios, 0);
    const ingresoMensual = membresias
        .filter(m => m.activo)
        .reduce((s, m) => s + m.cuotaMensual * m.socios, 0);

    const openNew = () => {
        setEditTarget(null);
        setForm({ nombre: '', descripcion: '', cuotaMensual: '', cuotaIngreso: '', activo: true });
        setDialogOpen(true);
    };

    const openEdit = (m: Membresia) => {
        setEditTarget(m);
        setForm({
            nombre: m.nombre,
            descripcion: m.descripcion,
            cuotaMensual: String(m.cuotaMensual),
            cuotaIngreso: String(m.cuotaIngreso),
            activo: m.activo,
        });
        setDialogOpen(true);
    };

    const handleSave = () => {
        if (editTarget) {
            setMembresias(prev =>
                prev.map(m =>
                    m.id === editTarget.id
                        ? { ...m, ...form, cuotaMensual: Number(form.cuotaMensual), cuotaIngreso: Number(form.cuotaIngreso) }
                        : m,
                ),
            );
        } else {
            setMembresias(prev => [
                ...prev,
                {
                    id: Date.now(),
                    nombre: form.nombre,
                    descripcion: form.descripcion,
                    cuotaMensual: Number(form.cuotaMensual),
                    cuotaIngreso: Number(form.cuotaIngreso),
                    activo: form.activo,
                    socios: 0,
                },
            ]);
        }
        setDialogOpen(false);
    };

    const toggleActivo = (id: number) => {
        setMembresias(prev => prev.map(m => (m.id === id ? { ...m, activo: !m.activo } : m)));
    };

    return (
        <>
            <Head title="Membresías" />
            <div className="flex flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Membresías</h1>
                        <p className="text-sm text-gray-500 mt-1">Gestión de categorías de membresía y cuotas del club.</p>
                    </div>
                    <Button className="bg-blue-600 text-white hover:bg-blue-700 gap-2" onClick={openNew}>
                        <Plus className="h-4 w-4" />
                        Nueva Categoría
                    </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card className="rounded-xl border border-gray-200 shadow-sm">
                        <CardContent className="flex items-center gap-4 p-5">
                            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-100">
                                <Tags className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Categorías activas</p>
                                <p className="text-2xl font-bold text-gray-900">{membresias.filter(m => m.activo).length}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="rounded-xl border border-gray-200 shadow-sm">
                        <CardContent className="flex items-center gap-4 p-5">
                            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-100">
                                <Users className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Socios activos</p>
                                <p className="text-2xl font-bold text-gray-900">{totalSocios}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="rounded-xl border border-gray-200 shadow-sm">
                        <CardContent className="flex items-center gap-4 p-5">
                            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-yellow-100">
                                <DollarSign className="h-5 w-5 text-yellow-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Ingreso mensual estimado</p>
                                <p className="text-2xl font-bold text-gray-900">{fmt(ingresoMensual)}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Table */}
                <Card className="rounded-xl border border-gray-200 shadow-sm">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-xl font-semibold text-gray-800">Categorías de Membresía</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-100">
                                    <TableHead className="font-semibold text-gray-700">Categoría</TableHead>
                                    <TableHead className="font-semibold text-gray-700">Descripción</TableHead>
                                    <TableHead className="font-semibold text-gray-700">Cuota Mensual</TableHead>
                                    <TableHead className="font-semibold text-gray-700">Cuota de Ingreso</TableHead>
                                    <TableHead className="font-semibold text-gray-700">Socios</TableHead>
                                    <TableHead className="font-semibold text-gray-700">Estado</TableHead>
                                    <TableHead className="font-semibold text-gray-700">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {membresias.map(m => (
                                    <TableRow key={m.id} className="hover:bg-gray-50">
                                        <TableCell className="font-medium text-gray-900">{m.nombre}</TableCell>
                                        <TableCell className="text-sm text-gray-500 max-w-xs truncate">{m.descripcion}</TableCell>
                                        <TableCell className="font-semibold text-gray-800">{fmt(m.cuotaMensual)}</TableCell>
                                        <TableCell className="text-gray-700">{fmt(m.cuotaIngreso)}</TableCell>
                                        <TableCell className="text-gray-700">{m.socios}</TableCell>
                                        <TableCell>
                                            {m.activo ? (
                                                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Activo</Badge>
                                            ) : (
                                                <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Inactivo</Badge>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="h-8 w-8 p-0"
                                                    onClick={() => openEdit(m)}
                                                    title="Editar"
                                                >
                                                    <Pencil className="h-3.5 w-3.5" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className={`h-8 w-8 p-0 ${m.activo ? 'text-red-500 hover:text-red-600' : 'text-green-600 hover:text-green-700'}`}
                                                    onClick={() => toggleActivo(m.id)}
                                                    title={m.activo ? 'Desactivar' : 'Activar'}
                                                >
                                                    <ToggleLeft className="h-3.5 w-3.5" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            {/* Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>{editTarget ? 'Editar Categoría' : 'Nueva Categoría'}</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-4 py-2">
                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="nombre">Nombre</Label>
                            <Input
                                id="nombre"
                                placeholder="Ej: Plan Básico"
                                value={form.nombre}
                                onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))}
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="descripcion">Descripción</Label>
                            <Textarea
                                id="descripcion"
                                placeholder="Descripción de la categoría..."
                                value={form.descripcion}
                                onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))}
                                rows={3}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <Label htmlFor="cuotaMensual">Cuota Mensual ($)</Label>
                                <Input
                                    id="cuotaMensual"
                                    type="number"
                                    placeholder="8000"
                                    value={form.cuotaMensual}
                                    onChange={e => setForm(f => ({ ...f, cuotaMensual: e.target.value }))}
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <Label htmlFor="cuotaIngreso">Cuota de Ingreso ($)</Label>
                                <Input
                                    id="cuotaIngreso"
                                    type="number"
                                    placeholder="15000"
                                    value={form.cuotaIngreso}
                                    onChange={e => setForm(f => ({ ...f, cuotaIngreso: e.target.value }))}
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Switch
                                id="activo"
                                checked={form.activo}
                                onCheckedChange={v => setForm(f => ({ ...f, activo: v }))}
                            />
                            <Label htmlFor="activo">Categoría activa</Label>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
                        <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={handleSave}>
                            {editTarget ? 'Guardar cambios' : 'Crear categoría'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}


MembresiasIndex.layout = {
    breadcrumbs,
};
