import { Link, usePage } from '@inertiajs/react';
import {
    LayoutGrid, Users, CreditCard, Calendar,
    GraduationCap, Package, FileBarChart, Settings, ShieldCheck, UserCheck
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

export function AppSidebar() {
    const { auth } = usePage<{ auth: { user: { rol: string; name: string } } }>().props;
    const userRole = auth?.user?.rol;

    const adminNavItems: NavItem[] = [
        { title: 'Inicio',            href: '/admin/dashboard',   icon: LayoutGrid },
        { title: 'Socios',            href: '/admin/socios',      icon: Users },
        { title: 'Validación CLU',    href: '/admin/clu',         icon: ShieldCheck },
        { title: 'Membresías',        href: '/admin/membresias',  icon: CreditCard },
        { title: 'Pagos y Recibos',   href: '/admin/pagos',       icon: CreditCard },
        { title: 'Eventos y Torneos', href: '/admin/eventos',     icon: Calendar },
        { title: 'Instructores',      href: '/admin/instructores',icon: GraduationCap },
        { title: 'Armería / Insumos', href: '/admin/insumos',     icon: Package },
        { title: 'Prensa y Noticias', href: '/admin/noticias',    icon: FileBarChart },
        { title: 'Reportes',          href: '/admin/reportes',    icon: FileBarChart },
        { title: 'Configuración',     href: '/admin/configuracion',icon: Settings },
    ];

    const socioNavItems: NavItem[] = [
        { title: 'Mi Panel',       href: '/panel',   icon: LayoutGrid },
        { title: 'Reservar Turno', href: '/turnos',  icon: Calendar },
        { title: 'Mis Pagos',      href: '/pagos',   icon: CreditCard },
        { title: 'Mi Perfil y CLU',href: '/perfil',  icon: UserCheck },
    ];

    const instructorNavItems: NavItem[] = [
        { title: 'Agenda de Pedanas',    href: '/instructor/agenda',       icon: Calendar },
        { title: 'Evaluaciones Técnicas',href: '/instructor/evaluaciones', icon: GraduationCap },
    ];

    let itemsToDisplay = adminNavItems;
    if (userRole === 'socio') itemsToDisplay = socioNavItems;
    else if (userRole === 'instructor') itemsToDisplay = instructorNavItems;

    return (
        <Sidebar collapsible="icon" variant="inset">
            {/* ── Header: logo + nombre club ── */}
            <SidebarHeader className="pb-3 pt-4 px-4 border-b border-white/10">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            {/* ── Nav items ── */}
            <SidebarContent className="px-2 py-4">
                <NavMain items={itemsToDisplay} />
            </SidebarContent>

            {/* ── Footer: Decálogo + usuario ── */}
            <SidebarFooter className="p-3 border-t border-white/10 space-y-3">
                {/* Botón Decálogo de Seguridad — siempre visible cuando está expandido */}
                <Link
                    href="/decalogo"
                    className="flex items-center gap-2 w-full rounded-xl bg-blue-600 hover:bg-blue-700 transition-colors px-3 py-2.5 text-white text-xs font-semibold group-data-[collapsible=icon]:hidden"
                >
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <div className="flex flex-col leading-tight">
                        <span className="font-bold">Decálogo de Seguridad</span>
                        <span className="font-normal text-blue-100/80">Ver normas</span>
                    </div>
                </Link>

                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
