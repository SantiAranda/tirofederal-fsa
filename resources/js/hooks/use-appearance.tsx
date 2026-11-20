/**
 * Tema visual de la aplicación.
 *
 * La interfaz del Tiro Federal está diseñada únicamente en modo claro: las
 * páginas usan colores fijos (bg-white, text-gray-*), mientras que los
 * componentes base (inputs, modales, menús, tarjetas) usan variables de tema.
 * Si se activara la clase `.dark` (por ejemplo, porque el sistema operativo
 * pasa a modo oscuro) esos componentes se volverían negros sobre páginas
 * claras. Por eso el tema se fija siempre en claro y no se sigue la
 * preferencia del sistema.
 *
 * Se conserva la misma API (`useAppearance`, `initializeTheme`) para no romper
 * a los componentes que la consumen.
 */

export type ResolvedAppearance = 'light' | 'dark';
export type Appearance = ResolvedAppearance | 'system';

export type UseAppearanceReturn = {
    readonly appearance: Appearance;
    readonly resolvedAppearance: ResolvedAppearance;
    readonly updateAppearance: (mode: Appearance) => void;
};

const applyLightTheme = (): void => {
    if (typeof document === 'undefined') {
        return;
    }

    document.documentElement.classList.remove('dark');
    document.documentElement.style.colorScheme = 'light';
};

export function initializeTheme(): void {
    if (typeof window === 'undefined') {
        return;
    }

    // Limpia preferencias viejas (p. ej. "system" o "dark") guardadas antes de fijar el tema.
    try {
        localStorage.removeItem('appearance');
    } catch {
        // localStorage puede no estar disponible (modo privado); no es crítico.
    }
    document.cookie = 'appearance=;path=/;max-age=0;SameSite=Lax';

    applyLightTheme();
}

export function useAppearance(): UseAppearanceReturn {
    return {
        appearance: 'light',
        resolvedAppearance: 'light',
        updateAppearance: applyLightTheme,
    } as const;
}
