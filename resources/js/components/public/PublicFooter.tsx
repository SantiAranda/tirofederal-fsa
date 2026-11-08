import { Target, Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function PublicFooter() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

                    {/* Logo + descripción */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                                <Target className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Tiro Federal</span>
                                <span className="block text-sm font-bold text-white uppercase tracking-wide">Formosa</span>
                            </div>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
                            Promovemos la práctica responsable del tiro deportivo, el espíritu de superación y los valores del deporte desde 1911.
                        </p>
                        <div className="flex gap-3 mt-5">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-colors">
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-pink-600 flex items-center justify-center transition-colors">
                                <Instagram className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Navegación */}
                    <div>
                        <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Navegación</h3>
                        <ul className="space-y-2 text-sm">
                            {[
                                { label: 'Inicio', href: '/' },
                                { label: 'Institución', href: '/historia' },
                                { label: 'Disciplinas', href: '/disciplinas' },
                                { label: 'Eventos y Cursos', href: '/eventos' },
                                { label: 'Decálogo', href: '/decalogo' },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="hover:text-white transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contacto */}
                    <div>
                        <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Contacto</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 mt-0.5 text-blue-400 shrink-0" />
                                <span>Ruta Nacional N.º 11, Km 1172, Formosa</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                                <span>+54 (370) XXX-XXXX</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                                <a href="mailto:noreply@tirofederalformosa.org.ar"
                                    className="hover:text-white transition-colors truncate">
                                    contacto@tirofederalformosa.org.ar
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
                    <span>© {year} Tiro Federal Formosa. Todos los derechos reservados.</span>
                    <span>Desarrollado por el equipo de sistemas del club</span>
                </div>
            </div>
        </footer>
    );
}

