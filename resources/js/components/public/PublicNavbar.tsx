import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Menu, X, Target, User, LogIn } from 'lucide-react';

const navLinks = [
    { label: 'Inicio', href: '/' },
    { label: 'Institución', href: '/historia' },
    { label: 'Disciplinas', href: '/disciplinas' },
    { label: 'Como asociarse', href: '/historia#asociarse' },
    { label: 'Eventos y Cursos', href: '/eventos' },
];

export default function PublicNavbar() {
    const { auth } = usePage<{ auth: { user: { name: string } | null } }>().props;
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 shrink-0">
                        <img 
                            src="/images/logo.png" 
                            alt="Tiro Federal Formosa" 
                            className="h-10 w-auto object-contain"
                            onError={(e) => {
                                // Fallback si no carga la imagen
                                (e.target as HTMLElement).style.display = 'none';
                            }}
                        />
                        <div className="leading-tight">
                            <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Tiro Federal</span>
                            <span className="block text-sm font-bold text-blue-700 uppercase tracking-wide">Formosa</span>
                        </div>
                    </Link>

                    {/* Links desktop */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="hidden md:flex items-center gap-2">
                        {auth?.user ? (
                            <Link
                                href="/dashboard"
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
                            >
                                <User className="w-4 h-4" />
                                Mi panel
                            </Link>
                        ) : (
                            <Link
                                href="/login"
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
                            >
                                <LogIn className="w-4 h-4" />
                                Iniciar sesión
                            </Link>
                        )}
                    </div>

                    {/* Mobile toggle */}
                    <button
                        className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Menú"
                    >
                        {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>

                {/* Mobile menu */}
                {menuOpen && (
                    <div className="md:hidden border-t border-gray-100 py-3 space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
                                onClick={() => setMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="pt-2 px-4">
                            {auth?.user ? (
                                <Link href="/dashboard" className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                                    <User className="w-4 h-4" /> Mi panel
                                </Link>
                            ) : (
                                <Link href="/login" className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                                    <LogIn className="w-4 h-4" /> Iniciar sesión
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}

