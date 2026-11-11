import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { 
    Users, UserPlus, Search, Download, Filter, 
    CheckCircle2, Clock, AlertTriangle, ShieldCheck, MoreVertical, Eye, Edit
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface SocioItem {
    id: number;
    numero_socio: string;
    estado_habilitacion: string;
    fecha_alta: string;
    user: {
        id: number;
        nombre: string;
        apellido: string;
        dni: string;
        email: string;
        telefono?: string;
    };
    membresia?: {
        nombre_plan: string;
    };
    credencial_lu?: {
        numero_legajo: string;
        fecha_vencimiento: string;
        estado_validacion: string;
    };
}

interface Props {
    socios: {
        data: SocioItem[];
        current_page: number;
        last_page: number;
        total: number;
    };
    filtros: {
        q?: string;
        estado?: string;
    };
}

export default function SociosIndex({ socios, filtros }: Props) {
    const [search, setSearch] = useState(filtros.q || '');
    const [estado, setEstado] = useState(filtros.estado || '');

    const handleFilter = () => {
        router.get('/admin/socios', { q: search, estado }, { preserveState: true });
    };

    const badgeEstado = (est: string) => {
        switch (est) {
            case 'activo':
                return <Badge className="bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/25 border-emerald-200">Activo / Al día</Badge>;
            case 'en_mora':
                return <Badge className="bg-amber-500/15 text-amber-700 hover:bg-amber-500/25 border-amber-200">En Mora</Badge>;
            case 'pendiente_validacion':
                return <Badge className="bg-blue-500/15 text-blue-700 hover:bg-blue-500/25 border-blue-200">Pendiente CLU</Badge>;
            default:
                return <Badge variant="secondary">{est}</Badge>;
        }
    };

    return (
        <div className="space-y-6">
            <Head title="Padrón de Socios - Tiro Federal Formosa" />

            {/* Cabecera */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                        <Users className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Padrón de Socios</h1>
                        <p className="text-sm text-muted-foreground">
                            Administración centralizada de tiradores, legajos CLU y membresías.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="outline" asChild className="gap-2">
                        <a href="/admin/socios/exportar">
                            <Download className="w-4 h-4" /> Exportar Planilla (RF33)
                        </a>
                    </Button>
                    <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white gap-2 shadow-md shadow-blue-500/20">
                        <Link href="/admin/socios/create">
                            <UserPlus className="w-4 h-4" /> Añadir nuevo socio
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Filtros y Búsqueda */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                    <Input
                        placeholder="Buscar por nombre, apellido, DNI, email o Nº de socio..."
                        className="pl-9"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleFilter()}
                    />
                </div>

                <div className="flex gap-2 w-full md:w-auto">
                    <select
                        className="h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                    >
                        <option value="">Todos los estados</option>
                        <option value="activo">Activo</option>
                        <option value="en_mora">En Mora</option>
                        <option value="pendiente_validacion">Pendiente</option>
                    </select>

                    <Button onClick={handleFilter} variant="secondary" className="gap-2">
                        <Filter className="w-4 h-4" /> Filtrar
                    </Button>
                </div>
            </div>

            {/* Tabla de Socios */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50/70 border-b border-gray-100 text-xs uppercase font-semibold text-gray-500">
                            <tr>
                                <th className="px-5 py-4">Nº Socio</th>
                                <th className="px-5 py-4">Socio / Tirador</th>
                                <th className="px-5 py-4">DNI / Contacto</th>
                                <th className="px-5 py-4">Membresía</th>
                                <th className="px-5 py-4">Estado</th>
                                <th className="px-5 py-4">Legajo CLU</th>
                                <th className="px-5 py-4 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {socios.data.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-5 py-8 text-center text-muted-foreground">
                                        No se encontraron socios con los filtros indicados.
                                    </td>
                                </tr>
                            ) : (
                                socios.data.map((s) => (
                                    <tr key={s.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-5 py-4 font-mono font-medium text-blue-600">
                                            #{s.numero_socio || s.id}
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="font-semibold text-gray-900">
                                                {s.user.apellido}, {s.user.nombre}
                                            </div>
                                            <div className="text-xs text-muted-foreground">{s.user.email}</div>
                                        </td>
                                        <td className="px-5 py-4 text-gray-600">
                                            <div>DNI {s.user.dni}</div>
                                            {s.user.telefono && <div className="text-xs text-muted-foreground">{s.user.telefono}</div>}
                                        </td>
                                        <td className="px-5 py-4 text-gray-700">
                                            {s.membresia?.nombre_plan || 'Sin plan'}
                                        </td>
                                        <td className="px-5 py-4">
                                            {badgeEstado(s.estado_habilitacion)}
                                        </td>
                                        <td className="px-5 py-4">
                                            {s.credencial_lu ? (
                                                <div>
                                                    <span className="font-mono text-xs font-semibold">{s.credencial_lu.numero_legajo}</span>
                                                    <div className="text-[11px] text-muted-foreground">Vence: {s.credencial_lu.fecha_vencimiento}</div>
                                                </div>
                                            ) : (
                                                <span className="text-xs text-muted-foreground italic">Sin CLU</span>
                                            )}
                                        </td>
                                        <td className="px-5 py-4 text-right">
                                            <div className="flex justify-end gap-1">
                                                <Button variant="ghost" size="sm" asChild>
                                                    <Link href={`/admin/socios/${s.id}`}>
                                                        <Eye className="w-4 h-4 text-gray-500" />
                                                    </Link>
                                                </Button>
                                                <Button variant="ghost" size="sm" asChild>
                                                    <Link href={`/admin/socios/${s.id}/edit`}>
                                                        <Edit className="w-4 h-4 text-gray-500" />
                                                    </Link>
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}



SociosIndex.layout = {
    breadcrumbs: [{ title: 'Inicio', href: '/admin/dashboard' }, { title: 'Socios', href: '/admin/socios' }],
};
