import { Head, Link } from '@inertiajs/react';
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
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from '@/components/ui/dialog';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Tags, Users, DollarSign, Pencil, Plus, ToggleLeft, Save, X } from 'lucide-react';

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

interface Props {
    membresias?: any[];
}

export default function MembresiasIndex({ membresias: serverMembresias }: Props) {
    const parsedInitial: Membresia[] = (serverMembresias && serverMembresias.length > 0)
        ? serverMembresias.map(m => ({
            id: m.id,
            nombre: m.nombre_plan || m.nombre,
            descripcion: m.descripcion || '',
            cuotaMensual: Number(m.monto_mensual ?? m.cuotaMensual ?? 0),
            cuotaIngreso: Number(m.cuota_ingreso ?? m.cuotaIngreso ?? 0),
            activo: m.activa ?? m.activo ?? true,
            socios: m.socio_profiles_count ?? m.socios ?? 0,
        }))
        : initialData;

    const [membresias, setMembresias] = useState<Membresia[]>(parsedInitial);
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
            <div className="flex flex-col gap-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Membresías</h1>
                        <p className="text-sm text-gray-500 mt-1">Gestión de categorías de membresía y cuotas del club.</p>
                    </div>
                    <Button asChild className="bg-blue-600 text-white hover:bg-blue-700 gap-2 w-full sm:w-auto">
                        <Link href="/admin/membresias/create">
                            <Plus className="h-4 w-4" />
                            Nueva Membresía
                        </Link>
                    </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card className="rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 p-4 sm:p-5">
                            <CardTitle className="text-xs font-semibold text-gray-500 uppercase tracking-wider truncate">
                                Categorías activas
                            </CardTitle>
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                                <Tags className="h-4 w-4" />
                            </div>
                        </CardHeader>
                        <CardContent className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 min-w-0">
                            <div className="text-2xl font-bold text-gray-900 tracking-tight truncate">
                                {membresias.filter(m => m.activo).length}
                            </div>
                            <p className="text-xs text-gray-400 mt-0.5 truncate">Planes societarios vigentes</p>
                        </CardContent>
                    </Card>

                    <Card className="rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 p-4 sm:p-5">
                            <CardTitle className="text-xs font-semibold text-gray-500 uppercase tracking-wider truncate">
                                Socios activos
                            </CardTitle>
                            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg shrink-0">
                                <Users className="h-4 w-4" />
                            </div>
                        </CardHeader>
                        <CardContent className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 min-w-0">
                            <div className="text-2xl font-bold text-gray-900 tracking-tight truncate">
                                {totalSocios}
                            </div>
                            <p className="text-xs text-emerald-600 mt-0.5 font-medium truncate">Cuotas al día</p>
                        </CardContent>
                    </Card>

                    <Card className="rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 p-4 sm:p-5">
                            <CardTitle className="text-xs font-semibold text-gray-500 uppercase tracking-wider truncate">
                                Ingreso mensual est.
                            </CardTitle>
                            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg shrink-0">
                                <DollarSign className="h-4 w-4" />
                            </div>
                        </CardHeader>
                        <CardContent className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 min-w-0">
                            <div className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight truncate" title={fmt(ingresoMensual)}>
                                {fmt(ingresoMensual)}
                            </div>
                            <p className="text-xs text-gray-400 mt-0.5 truncate">Proyección mensual</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Table */}
                <Card className="rounded-xl border border-gray-200 shadow-sm">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-xl font-semibold text-gray-800">Categorías de Membresía</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 overflow-x-auto">
                        <Table className="min-w-[680px]">
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
                <DialogContent className="max-w-lg w-[95vw] sm:w-full">
                    <DialogHeader>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                                <Tags className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <DialogTitle>{editTarget ? 'Editar Categoría' : 'Nueva Categoría'}</DialogTitle>
                                <DialogDescription>Definí aranceles y parámetros del plan societario</DialogDescription>
                            </div>
                        </div>
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
                        <Button variant="outline" onClick={() => setDialogOpen(false)} className="gap-1.5">
                            <X className="w-4 h-4" /> Cancelar
                        </Button>
                        <Button className="bg-blue-600 text-white hover:bg-blue-700 gap-1.5" onClick={handleSave}>
                            <Save className="w-4 h-4" /> {editTarget ? 'Guardar cambios' : 'Crear categoría'}
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
