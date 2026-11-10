import { Head } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Settings, Shield, Clock, Bell, Save, CheckCircle2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Inicio', href: '/admin/dashboard' },
    { title: 'Configuración', href: '/admin/configuracion' },
];

export default function ConfiguracionIndex() {
    const [saved, setSaved] = useState(false);
    const [form, setForm] = useState({
        clubNombre: 'Tiro Federal Formosa',
        clubCuit: '30-70123456-8',
        direccion: 'Av. Costanera y Río Paraguay, Formosa Capital',
        telefono: '+54 3704 42-8899',
        email: 'contacto@tirofederalformosa.org.ar',
        diasGraciaCuota: '10',
        alertaVencimientoCluDias: '30',
        bloquearTurnosMora: true,
        exigirInstructorSinClu: true,
        notificacionesEmail: true,
        permitirAutoRegistro: true,
    });

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <>
            <Head title="Configuración del Sistema - Tiro Federal Formosa" />
            <div className="flex flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Configuración del Sistema</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Parámetros institucionales, reglas de negocio del polígono y políticas de seguridad ANMaC
                        </p>
                    </div>
                    {saved && (
                        <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg font-semibold animate-fade-in-up">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Cambios guardados correctamente
                        </div>
                    )}
                </div>

                <form onSubmit={handleSave} className="space-y-6">
                    {/* Parámetros de Seguridad y ANMaC (RF08, RF10) */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Shield className="w-5 h-5 text-blue-600" />
                                <CardTitle className="text-base font-bold text-gray-900">
                                    Reglas de Negocio y Validación ANMaC
                                </CardTitle>
                            </div>
                            <CardDescription className="text-xs text-gray-500">
                                Restricciones automáticas para la habilitación de turnos y seguridad en pedana
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-gray-50/50">
                                <div>
                                    <div className="text-sm font-semibold text-gray-900">Bloqueo Preventivo por Cuotas Vencidas (RF08)</div>
                                    <div className="text-xs text-gray-500">
                                        Impide a socios con estado "En Mora" reservar turnos en las líneas de tiro
                                    </div>
                                </div>
                                <Switch
                                    checked={form.bloquearTurnosMora}
                                    onCheckedChange={checked => setForm({ ...form, bloquearTurnosMora: checked })}
                                />
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-gray-50/50">
                                <div>
                                    <div className="text-sm font-semibold text-gray-900">Exigencia de Instructor para Tiradores sin CLU (RF10)</div>
                                    <div className="text-xs text-gray-500">
                                        Si el usuario carece de CLU/arma, el sistema obliga a vincular un instructor al turno
                                    </div>
                                </div>
                                <Switch
                                    checked={form.exigirInstructorSinClu}
                                    onCheckedChange={checked => setForm({ ...form, exigirInstructorSinClu: checked })}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                <div>
                                    <Label htmlFor="diasGracia">Días de Gracia para Vencimiento de Cuota</Label>
                                    <Input
                                        id="diasGracia"
                                        type="number"
                                        className="mt-1"
                                        value={form.diasGraciaCuota}
                                        onChange={e => setForm({ ...form, diasGraciaCuota: e.target.value })}
                                    />
                                    <p className="text-[11px] text-gray-500 mt-1">Días posteriores al 10 de cada mes antes de marcar en mora</p>
                                </div>
                                <div>
                                    <Label htmlFor="alertaClu">Alerta Anticipada Vencimiento CLU (días)</Label>
                                    <Input
                                        id="alertaClu"
                                        type="number"
                                        className="mt-1"
                                        value={form.alertaVencimientoCluDias}
                                        onChange={e => setForm({ ...form, alertaVencimientoCluDias: e.target.value })}
                                    />
                                    <p className="text-[11px] text-gray-500 mt-1">Aviso visual en panel del socio antes de caducar credencial</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Horarios Operativos del Polígono (RF13) */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-blue-600" />
                                <CardTitle className="text-base font-bold text-gray-900">
                                    Horarios y Cronograma Semanal del Polígono
                                </CardTitle>
                            </div>
                            <CardDescription className="text-xs text-gray-500">
                                Rangos horarios habilitados para la reserva de turnos
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                                <div className="p-3 border rounded-lg bg-white space-y-1">
                                    <span className="font-bold text-gray-800">Martes a Viernes</span>
                                    <p className="text-gray-500">08:00 - 12:00 | 14:00 - 18:30</p>
                                    <span className="inline-block px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold text-[10px]">Habilitado</span>
                                </div>
                                <div className="p-3 border rounded-lg bg-white space-y-1">
                                    <span className="font-bold text-gray-800">Sábados</span>
                                    <p className="text-gray-500">08:00 - 19:00 (Jornada extendida)</p>
                                    <span className="inline-block px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold text-[10px]">Habilitado</span>
                                </div>
                                <div className="p-3 border rounded-lg bg-white space-y-1">
                                    <span className="font-bold text-gray-800">Domingos</span>
                                    <p className="text-gray-500">08:30 - 13:00 (Torneos oficiales)</p>
                                    <span className="inline-block px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold text-[10px]">Habilitado</span>
                                </div>
                                <div className="p-3 border rounded-lg bg-gray-50 space-y-1 opacity-70">
                                    <span className="font-bold text-gray-800">Lunes</span>
                                    <p className="text-gray-500">Mantenimiento de pedanas</p>
                                    <span className="inline-block px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 font-semibold text-[10px]">Cerrado</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Datos Institucionales */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Settings className="w-5 h-5 text-blue-600" />
                                <CardTitle className="text-base font-bold text-gray-900">
                                    Identidad Institucional del Club
                                </CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="clubNom">Nombre Institucional</Label>
                                    <Input
                                        id="clubNom"
                                        className="mt-1"
                                        value={form.clubNombre}
                                        onChange={e => setForm({ ...form, clubNombre: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="cuit">CUIT / Personería Jurídica</Label>
                                    <Input
                                        id="cuit"
                                        className="mt-1"
                                        value={form.clubCuit}
                                        onChange={e => setForm({ ...form, clubCuit: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="dir">Dirección de la Sede y Polígono</Label>
                                    <Input
                                        id="dir"
                                        className="mt-1"
                                        value={form.direccion}
                                        onChange={e => setForm({ ...form, direccion: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="mail">Correo Institucional</Label>
                                    <Input
                                        id="mail"
                                        type="email"
                                        className="mt-1"
                                        value={form.email}
                                        onChange={e => setForm({ ...form, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="pt-2 flex justify-end">
                                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                                    <Save className="w-4 h-4" /> Guardar Todos los Cambios
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </>
    );
}



ConfiguracionIndex.layout = {
    breadcrumbs,
};
