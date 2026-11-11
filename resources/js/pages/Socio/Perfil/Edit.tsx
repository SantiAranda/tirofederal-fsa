import { Head } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, ShieldCheck, Lock, Upload, AlertTriangle, CheckCircle2, Save, AlertCircle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Mi Panel', href: '/panel' },
    { title: 'Mi Perfil y CLU', href: '/perfil' },
];

export default function SocioPerfilEdit() {
    const [saved, setSaved] = useState(false);
    const [form, setForm] = useState({
        nombre: 'Juan Carlos Pérez',
        usuario: 'jcperez',
        email: 'juan.perez@email.com',
        currentPassword: '',
        newPassword: '',
        newPasswordConfirmation: '',
    });

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <>
            <Head title="Mi Perfil y Credencial CLU - Tiro Federal Formosa" />
            <div className="flex flex-col gap-6 p-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Mi Perfil y Credenciales</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Datos de tu cuenta, seguridad y estado de tu credencial de Legítimo Usuario ANMaC (RF09 y RF10)
                    </p>
                </div>

                {saved && (
                    <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 p-3 rounded-lg font-semibold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Los cambios de tu perfil fueron guardados con éxito.
                    </div>
                )}

                {/* Alerta de Estado CLU (RF10) */}
                <Card className="border-emerald-200 bg-emerald-50/50">
                    <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="font-bold text-gray-900 text-sm">CLU Habilitado: LU-1234567</h3>
                                    <Badge className="bg-emerald-100 text-emerald-800 border-none text-[10px]">Vigente</Badge>
                                </div>
                                <p className="text-xs text-gray-600 mt-0.5">
                                    Tu credencial vence el <strong>14/08/2027</strong>. Estás habilitado para reservar pedanas libres.
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="text-xs font-semibold text-emerald-700 bg-white px-3 py-1.5 rounded-lg border border-emerald-200 shadow-sm">
                                Aptitud ANMaC Aprobada
                            </span>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Formulario editable de datos (RF09: solo nombre, usuario, email, clave) */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-blue-600" />
                                    <CardTitle className="text-base font-bold text-gray-900">Datos Personales Editables (RF09)</CardTitle>
                                </div>
                                <CardDescription className="text-xs text-gray-500">
                                    Los datos de identificación oficial (DNI y fecha de nacimiento) se encuentran validados con tu legajo
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSave} className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="perfilNombre">Nombre completo</Label>
                                            <Input
                                                id="perfilNombre"
                                                value={form.nombre}
                                                onChange={e => setForm({ ...form, nombre: e.target.value })}
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="perfilUsuario">Nombre de usuario</Label>
                                            <Input
                                                id="perfilUsuario"
                                                value={form.usuario}
                                                onChange={e => setForm({ ...form, usuario: e.target.value })}
                                                className="mt-1"
                                            />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <Label htmlFor="perfilEmail">Correo electrónico</Label>
                                            <Input
                                                id="perfilEmail"
                                                type="email"
                                                value={form.email}
                                                onChange={e => setForm({ ...form, email: e.target.value })}
                                                className="mt-1"
                                            />
                                        </div>
                                    </div>

                                    {/* Datos fijos no editables */}
                                    <div className="pt-3 border-t border-gray-100">
                                        <div className="text-xs font-semibold text-gray-500 mb-2">Datos oficiales del legajo (solo lectura por secretaría)</div>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-gray-50 p-3 rounded-lg border border-gray-200">
                                            <div>
                                                <span className="text-gray-400 block">DNI</span>
                                                <span className="font-semibold text-gray-800">12.345.678</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-400 block">Fecha Nacimiento</span>
                                                <span className="font-semibold text-gray-800">14/05/1985</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-400 block">Categoría Socio</span>
                                                <span className="font-semibold text-blue-600">Plan Básico</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-2">
                                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                                            <Save className="w-4 h-4" /> Guardar Cambios
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>

                        {/* Cambio de Contraseña */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Lock className="w-4 h-4 text-blue-600" />
                                    <CardTitle className="text-base font-bold text-gray-900">Seguridad y Contraseña</CardTitle>
                                </div>
                                <CardDescription className="text-xs text-gray-500">
                                    La contraseña debe tener mínimo 8 caracteres con números y símbolos especiales
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div>
                                        <Label htmlFor="pwdActual">Contraseña actual</Label>
                                        <Input
                                            id="pwdActual"
                                            type="password"
                                            placeholder="••••••••"
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="pwdNueva">Nueva contraseña</Label>
                                        <Input
                                            id="pwdNueva"
                                            type="password"
                                            placeholder="••••••••"
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="pwdRep">Confirmar nueva</Label>
                                        <Input
                                            id="pwdRep"
                                            type="password"
                                            placeholder="••••••••"
                                            className="mt-1"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <Button variant="outline" className="text-xs">
                                        Actualizar Contraseña
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Columna Derecha: Documentos subidos (DNI y CLU) */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm font-bold text-gray-900">Documentación Presentada (RF03)</CardTitle>
                                <CardDescription className="text-xs text-gray-500">
                                    Copia digital de tus credenciales para habilitación social
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3 text-xs">
                                <div className="p-3 border rounded-lg bg-gray-50/50 flex items-center justify-between">
                                    <div>
                                        <div className="font-semibold text-gray-800">DNI (Frente y Dorso)</div>
                                        <div className="text-[11px] text-emerald-600 font-medium">Validado por Secretaría ✓</div>
                                    </div>
                                    <Button size="sm" variant="ghost" className="h-7 text-xs text-blue-600">
                                        Renovar
                                    </Button>
                                </div>

                                <div className="p-3 border rounded-lg bg-gray-50/50 flex items-center justify-between">
                                    <div>
                                        <div className="font-semibold text-gray-800">Credencial CLU (ANMaC)</div>
                                        <div className="text-[11px] text-emerald-600 font-medium">Vence: 14/08/2027 ✓</div>
                                    </div>
                                    <Button size="sm" variant="ghost" className="h-7 text-xs text-blue-600">
                                        Subir nueva
                                    </Button>
                                </div>

                                <div className="p-3 border rounded-lg bg-gray-50/50 flex items-center justify-between">
                                    <div>
                                        <div className="font-semibold text-gray-800">Apto Médico / Psicológico</div>
                                        <div className="text-[11px] text-emerald-600 font-medium">Incorporado al legajo ✓</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Zona de Peligro / Baja de Cuenta (RF09) */}
                        <Card className="border-rose-200 bg-rose-50/20">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-xs font-bold text-rose-700 uppercase tracking-wider flex items-center gap-1.5">
                                    <AlertCircle className="w-4 h-4 text-rose-600" /> Baja Voluntaria de Cuenta (RF09)
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <p className="text-[11px] text-gray-600">
                                    Podés solicitar la suspensión de tu membresía o baja definitiva de tu usuario.
                                </p>
                                <Button size="sm" variant="outline" className="text-xs text-rose-600 border-rose-200 hover:bg-rose-50 w-full">
                                    Solicitar Baja de Socio
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}



SocioPerfilEdit.layout = {
    breadcrumbs,
};
