import { Link, router } from '@inertiajs/react';
import { ChevronDown, LayoutGrid, LogOut, UserCheck } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useInitials } from '@/hooks/use-initials';
import { logout } from '@/routes';

export interface PublicUser {
    name: string;
    nombre_completo?: string;
    email: string;
    avatar?: string | null;
    rol?: string;
}

const ROL_LABEL: Record<string, string> = {
    presidente: 'Presidencia',
    instructor: 'Instructor',
    socio: 'Socio',
};

export function UserAvatar({ user, className = 'h-9 w-9' }: { user: PublicUser; className?: string }) {
    const getInitials = useInitials();
    const nombre = user.nombre_completo || user.name;

    return (
        <Avatar className={`${className} overflow-hidden rounded-full ring-2 ring-blue-100`}>
            {user.avatar && <AvatarImage src={user.avatar} alt={nombre} className="object-cover" />}
            <AvatarFallback className="rounded-full bg-blue-600 text-white text-xs font-bold">
                {getInitials(nombre)}
            </AvatarFallback>
        </Avatar>
    );
}

function cerrarSesion() {
    router.flushAll();
}

/** Botón con la foto del usuario que despliega accesos a su panel y el cierre de sesión. */
export default function PublicUserMenu({ user }: { user: PublicUser }) {
    const nombre = user.nombre_completo || user.name;

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger
                className="flex items-center gap-2 rounded-full border border-gray-200 bg-white py-1 pl-1 pr-3 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:border-blue-200 hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                aria-label="Abrir menú de usuario"
            >
                <UserAvatar user={user} className="h-8 w-8" />
                <span className="max-w-[9rem] truncate">{user.name}</span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-60">
                <DropdownMenuLabel className="flex items-center gap-3 py-2 font-normal">
                    <UserAvatar user={user} className="h-10 w-10" />
                    <div className="grid min-w-0 leading-tight">
                        <span className="truncate font-semibold text-gray-900">{nombre}</span>
                        <span className="truncate text-xs text-gray-500">{user.email}</span>
                        {user.rol && (
                            <span className="text-[11px] text-blue-600">{ROL_LABEL[user.rol] ?? user.rol}</span>
                        )}
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">
                        <LayoutGrid className="mr-2 h-4 w-4" />
                        Mi panel
                    </Link>
                </DropdownMenuItem>
                {user.rol === 'socio' && (
                    <DropdownMenuItem asChild>
                        <Link href="/perfil" className="cursor-pointer">
                            <UserCheck className="mr-2 h-4 w-4" />
                            Mi perfil y CLU
                        </Link>
                    </DropdownMenuItem>
                )}

                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link
                        href={logout()}
                        as="button"
                        onClick={cerrarSesion}
                        className="w-full cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700"
                        data-test="public-logout-button"
                    >
                        <LogOut className="mr-2 h-4 w-4 text-current" />
                        Cerrar sesión
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
