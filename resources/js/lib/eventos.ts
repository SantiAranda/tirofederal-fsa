/**
 * Tipos de evento tal como los guarda el panel de administración
 * (Admin\EventoController: torneo | tirada_nocturna | curso_capacitacion).
 */
const TIPOS_EVENTO: Record<string, { label: string; badge: string }> = {
    torneo: {
        label: 'Torneo',
        badge: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    },
    tirada_nocturna: {
        label: 'Tirada nocturna',
        badge: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    },
    curso_capacitacion: {
        label: 'Curso de capacitación',
        badge: 'bg-blue-100 text-blue-700 border-blue-200',
    },
};

const FALLBACK_BADGE = 'bg-gray-100 text-gray-600 border-gray-200';

export function labelTipoEvento(tipo: string | null | undefined): string {
    if (!tipo) {
        return 'Evento';
    }

    return TIPOS_EVENTO[tipo.toLowerCase()]?.label
        ?? tipo.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
}

export function badgeTipoEvento(tipo: string | null | undefined): string {
    return (tipo && TIPOS_EVENTO[tipo.toLowerCase()]?.badge) || FALLBACK_BADGE;
}

/*
 * Formateo de fechas con zona horaria fija: el render del servidor (SSR, en UTC)
 * y el del navegador deben producir exactamente el mismo texto, o React
 * descarta el HTML del servidor ("Hydration failed").
 */
const ZONA = 'America/Argentina/Buenos_Aires';

function fmt(dateStr: string, options: Intl.DateTimeFormatOptions): string {
    return new Date(dateStr).toLocaleString('es-AR', { timeZone: ZONA, ...options });
}

/** "sábado, 5 de diciembre de 2026" */
export const fechaLarga = (d: string) => fmt(d, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

/** "5 de diciembre de 2026" */
export const fechaMedia = (d: string) => fmt(d, { day: 'numeric', month: 'long', year: 'numeric' });

/** "09:30" */
export const hora = (d: string) => fmt(d, { hour: '2-digit', minute: '2-digit', hour12: false });

/** Partes sueltas para los bloques de calendario: día, mes abreviado y año. */
export const dia = (d: string) => fmt(d, { day: 'numeric' });
export const mesCorto = (d: string) => fmt(d, { month: 'short' }).replace('.', '');
export const anio = (d: string) => fmt(d, { year: 'numeric' });
