import { Head, Link } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, User, Shield, CreditCard, Save, CheckCircle2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Inicio', href: '/admin/dashboard' },
    { title: 'Socios', href: '/admin/socios' },
    { title: 'Juan Carlos Pérez', href: '/admin/socios/1' },
    { title: 'Editar', href: '#' },
];

export default function SociosEdit() {
    const [saved, setSaved] = useState(false);
    const [form, setForm] = useState({
        nombre: 'Juan Carlos Pérez',
        dni: '12345678',
        fechaNacimiento: '1985-05-14',
        genero: 'Masculino',
        telefono: '3704 123456',
        email: 'juan.perez@email.com',
        domicilio: 'Av. 25 de Mayo 1420',
        localidad: 'Formosa, Formosa',
        codigoPostal: '3600',
        categoria: 'Plan Básico',
        fechaAlta: '2026-08-14',
        estado: 'Activo',
        clu: 'LU-1234567',
        cluVencimiento: '2027-08-14',
        observaciones: 'Socio activo sin observaciones disciplinarias.',
        profesion: 'Comerciante',
        conocio: 'Recomendación de otro socio',
        poseeArma: 'si',
        recibirNovedades: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <>
            <Head title="Editar Socio - Tiro Federal Formosa" />
            <div className="flex flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Editar Socio: {form.nombre}</h1>
                        <p className="text-xs text-gray-500 mt-1">
                            Modificación de datos del legajo, categoría de membresía y habilitación social (RF06 y RF08)
                        </p>
                    </div>
                    <Link href="/admin/socios">
                        <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                            <ArrowLeft className="w-3.5 h-3.5" /> Volver al listado
                        </Button>
                    </Link>
                </div>

                {saved && (
                    <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 p-3 rounded-lg font-semibold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Los datos del socio fueron actualizados correctamente.
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Columna Izquierda: Datos Personales (2/3) */}
                        <div className="lg:col-span-2 space-y-6">
                            <Card>
                                <CardContent className="p-6 space-y-4">
                                    <div className="flex items-center gap-2 pb-2 border-b border-gray-100 text-blue-600 font-bold text-sm">
                                        <User className="w-4 h-4" /> Datos personales
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="nombre">Nombre completo *</Label>
                                            <Input
                                                id="nombre"
                                                required
                                                value={form.nombre}
                                                onChange={e => setForm({ ...form, nombre: e.target.value })}
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="dni">DNI *</Label>
                                            <Input
                                                id="dni"
                                                required
                                                value={form.dni}
                                                onChange={e => setForm({ ...form, dni: e.target.value })}
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="fnac">Fecha de nacimiento *</Label>
                                            <Input
                                                id="fnac"
                                                type="date"
                                                required
                                                value={form.fechaNacimiento}
                                                onChange={e => setForm({ ...form, fechaNacimiento: e.target.value })}
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="genero">Género *</Label>
                                            <select
                                                id="genero"
                                                value={form.genero}
                                                onChange={e => setForm({ ...form, genero: e.target.value })}
                                                className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 mt-1"
                                            >
                                                <option value="Masculino">Masculino</option>
                                                <option value="Femenino">Femenino</option>
                                                <option value="Otro">Otro</option>
                                            </select>
                                        </div>
                                        <div>
                                            <Label htmlFor="tel">Teléfono *</Label>
                                            <Input
                                                id="tel"
                                                required
                                                value={form.telefono}
                                                onChange={e => setForm({ ...form, telefono: e.target.value })}
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="email">Email *</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                required
                                                value={form.email}
                                                onChange={e => setForm({ ...form, email: e.target.value })}
                                                className="mt-1"
                                            />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <Label htmlFor="domicilio">Domicilio</Label>
                                            <Input
                                                id="domicilio"
                                                value={form.domicilio}
                                                onChange={e => setForm({ ...form, domicilio: e.target.value })}
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="loc">Localidad / Provincia *</Label>
                                            <Input
                                                id="loc"
                                                value={form.localidad}
                                                onChange={e => setForm({ ...form, localidad: e.target.value })}
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="cp">Código Postal</Label>
                                            <Input
                                                id="cp"
                                                value={form.codigoPostal}
                                                onChange={e => setForm({ ...form, codigoPostal: e.target.value })}
                                                className="mt-1"
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Información adicional */}
                            <Card>
                                <CardContent className="p-6 space-y-4">
                                    <div className="text-blue-600 font-bold text-sm pb-2 border-b border-gray-100">
                                        Información adicional
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="prof">Profesión / Ocupación</Label>
                                            <Input
                                                id="prof"
                                                value={form.profesion}
                                                onChange={e => setForm({ ...form, profesion: e.target.value })}
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="conocio">¿Cómo nos conoció?</Label>
                                            <Input
                                                id="conocio"
                                                value={form.conocio}
                                                onChange={e => setForm({ ...form, conocio: e.target.value })}
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label className="block mb-2">¿Posee arma propia?</Label>
                                            <div className="flex gap-4 text-sm">
                                                <label className="flex items-center gap-1.5 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="poseeArma"
                                                        value="si"
                                                        checked={form.poseeArma === 'si'}
                                                        onChange={() => setForm({ ...form, poseeArma: 'si' })}
                                                    /> Sí
                                                </label>
                                                <label className="flex items-center gap-1.5 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="poseeArma"
                                                        value="no"
                                                        checked={form.poseeArma === 'no'}
                                                        onChange={() => setForm({ ...form, poseeArma: 'no' })}
                                                    /> No
                                                </label>
                                            </div>
                                        </div>
                                        <div>
                                            <Label className="block mb-2">¿Desea recibir novedades?</Label>
                                            <div className="flex items-center gap-2">
                                                <Switch
                                                    checked={form.recibirNovedades}
                                                    onCheckedChange={checked => setForm({ ...form, recibirNovedades: checked })}
                                                />
                                                <span className="text-xs text-gray-600">Sí, por WhatsApp y Email</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Columna Derecha: Membresía y CLU (1/3) */}
                        <div className="space-y-6">
                            <Card>
                                <CardContent className="p-6 space-y-4">
                                    <div className="flex items-center gap-2 pb-2 border-b border-gray-100 text-blue-600 font-bold text-sm">
                                        <CreditCard className="w-4 h-4" /> Membresía y Estado Social (RF08)
                                    </div>
                                    <div>
                                        <Label htmlFor="cat">Categoría de socio *</Label>
                                        <select
                                            id="cat"
                                            value={form.categoria}
                                            onChange={e => setForm({ ...form, categoria: e.target.value })}
                                            className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 mt-1"
                                        >
                                            <option value="Plan Básico">Plan Básico ($8.000 / mes)</option>
                                            <option value="Plan Familiar">Plan Familiar ($12.000 / mes)</option>
                                            <option value="Plan Juvenil">Plan Juvenil ($5.000 / mes)</option>
                                            <option value="Plan Premium">Plan Premium ($18.000 / mes)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <Label htmlFor="alta">Fecha de alta</Label>
                                        <Input
                                            id="alta"
                                            type="date"
                                            value={form.fechaAlta}
                                            onChange={e => setForm({ ...form, fechaAlta: e.target.value })}
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="estado">Estado de Habilitación Social (RF08)</Label>
                                        <select
                                            id="estado"
                                            value={form.estado}
                                            onChange={e => setForm({ ...form, estado: e.target.value })}
                                            className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 mt-1 font-semibold"
                                        >
                                            <option value="Activo">Activo / Al Día</option>
                                            <option value="En Mora">En Mora (Bloquea turnos)</option>
                                            <option value="Inactivo">Inactivo / De Baja</option>
                                        </select>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-6 space-y-4">
                                    <div className="flex items-center gap-2 pb-2 border-b border-gray-100 text-blue-600 font-bold text-sm">
                                        <Shield className="w-4 h-4" /> Documentación ANMaC (RF03/RF10)
                                    </div>
                                    <div>
                                        <Label htmlFor="clu">CLU (Legítimo Usuario)</Label>
                                        <Input
                                            id="clu"
                                            value={form.clu}
                                            onChange={e => setForm({ ...form, clu: e.target.value })}
                                            className="mt-1 font-mono"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="cluvenc">Fecha de vencimiento CLU</Label>
                                        <Input
                                            id="cluvenc"
                                            type="date"
                                            value={form.cluVencimiento}
                                            onChange={e => setForm({ ...form, cluVencimiento: e.target.value })}
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="obs">Observaciones del legajo</Label>
                                        <textarea
                                            id="obs"
                                            rows={3}
                                            value={form.observaciones}
                                            onChange={e => setForm({ ...form, observaciones: e.target.value })}
                                            className="w-full rounded-md border border-gray-300 p-2 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 mt-1"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Botones de acción inferiores (idéntico a la maqueta) */}
                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                        <Link href="/admin/socios">
                            <Button type="button" variant="outline" className="text-gray-600">
                                Cancelar
                            </Button>
                        </Link>
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                            <Save className="w-4 h-4" /> Guardar Cambios del Socio
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}



SociosEdit.layout = {
    breadcrumbs,
};
