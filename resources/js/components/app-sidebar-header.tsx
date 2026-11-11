import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { usePage, Link } from '@inertiajs/react';
import { Bell } from 'lucide-react';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    const { auth } = usePage<{ auth: { user: { name: string; rol: string } } }>().props;
    const user = auth?.user;

    // Iniciales del nombre
    const initials = user?.name
        ? user.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
        : 'U';

    // Rol legible
    const rolLabel: Record<string, string> = {
        presidente: 'Presidencia',
        instructor: 'Instructor',
        socio: 'Socio',
    };

    return (
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            {/* Izquierda: trigger + breadcrumbs */}
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1 text-gray-500 hover:text-gray-900" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>

            {/* Derecha: notificaciones + avatar */}
            <div className="flex items-center gap-3">
                {/* Campana de notificaciones */}
                <button className="relative p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-blue-600 rounded-full" />
                </button>

                {/* Avatar + nombre */}
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold select-none">
                        {initials}
                    </div>
                    <div className="hidden sm:flex flex-col leading-tight text-right">
                        <span className="text-sm font-semibold text-gray-800">{user?.name ?? 'Admin'}</span>
                        <span className="text-[11px] text-gray-500">{rolLabel[user?.rol] ?? user?.rol}</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
