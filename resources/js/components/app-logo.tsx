export default function AppLogo() {
    return (
        <div className="flex items-center gap-3">
            {/* Logo circular — visible siempre, ajusta tamaño en modo colapsado */}
            <div className="flex-shrink-0 w-9 h-9 rounded-full overflow-hidden border-2 border-blue-500/40 bg-white/5 p-0.5">
                <img
                    src="/images/logo.png"
                    alt="Tiro Federal Formosa"
                    className="w-full h-full object-contain rounded-full"
                />
            </div>
            {/* Texto — oculto en modo icono */}
            <div className="flex flex-col leading-tight group-data-[collapsible=icon]:hidden">
                <span className="text-[11px] font-medium text-sidebar-foreground/60 uppercase tracking-widest">
                    Tiro Federal
                </span>
                <span className="text-base font-bold text-sidebar-foreground uppercase tracking-wide">
                    Formosa
                </span>
                <span className="text-[10px] text-sidebar-foreground/45 italic mt-0.5">
                    Tradición, disciplina y seguridad
                </span>
            </div>
        </div>
    );
}
