import React, { useState, useMemo } from 'react';
import {
    ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin,
    User, Trophy, Target, GraduationCap, Moon, Eye, ExternalLink,
    Filter, X, CheckCircle2, AlertCircle, Info, CalendarDays
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
} from '@/components/ui/dialog';

export interface CalendarItem {
    id: string | number;
    raw_id?: number | string;
    title: string;
    date: string; // 'YYYY-MM-DD'
    time?: string; // '09:00' or '14:30 - 16:00'
    type: 'torneo' | 'curso' | 'tirada_nocturna' | 'evento' | 'turno' | 'evaluacion' | 'mantenimiento' | string;
    badgeText?: string;
    status?: 'reservado' | 'confirmado' | 'asistido' | 'cancelado' | 'publicado' | 'borrador' | string;
    color?: 'blue' | 'purple' | 'emerald' | 'amber' | 'rose' | 'indigo' | 'cyan';
    description?: string;
    location?: string;
    instructor?: string;
    socio?: string;
    costo?: number;
    cupos?: string;
    link?: string;
    linkText?: string;
    actionButton?: {
        label: string;
        onClick: () => void;
        variant?: 'default' | 'outline' | 'destructive';
    };
    raw?: any;
}

interface FilterOption {
    key: string;
    label: string;
    color: string;
}

interface GoogleCalendarProps {
    items: CalendarItem[];
    initialDate?: string; // 'YYYY-MM-DD'
    title?: string;
    subtitle?: string;
    role?: 'admin' | 'socio' | 'instructor' | 'public';
    filters?: FilterOption[];
    headerExtra?: React.ReactNode;
    onDateSelect?: (dateStr: string) => void;
}

const DIAS_SEMANA = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
const DIAS_SEMANA_COMPLETO = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

export function GoogleCalendar({
    items = [],
    initialDate,
    title,
    subtitle,
    role = 'public',
    filters,
    headerExtra,
    onDateSelect,
}: GoogleCalendarProps) {
    // Determine initial viewing date
    const parseInitialDate = () => {
        if (initialDate) {
            const d = new Date(initialDate + 'T00:00:00');
            if (!isNaN(d.getTime())) return d;
        }
        // If items exist, check if there's an item in current or future month
        if (items.length > 0) {
            const firstSorted = [...items].sort((a, b) => a.date.localeCompare(b.date))[0];
            const d = new Date(firstSorted.date + 'T00:00:00');
            if (!isNaN(d.getTime())) return d;
        }
        return new Date();
    };

    const [currentDate, setCurrentDate] = useState<Date>(parseInitialDate);
    const [viewMode, setViewMode] = useState<'month' | 'week' | 'agenda'>('month');
    const [selectedItem, setSelectedItem] = useState<CalendarItem | null>(null);
    const [selectedDayEvents, setSelectedDayEvents] = useState<{ date: string; items: CalendarItem[] } | null>(null);
    const [activeFilter, setActiveFilter] = useState<string>('all');

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Default filters if none provided
    const defaultFilters: FilterOption[] = useMemo(() => {
        if (filters && filters.length > 0) return filters;
        if (role === 'admin') {
            return [
                { key: 'all', label: 'Todos', color: 'bg-gray-500' },
                { key: 'torneo', label: 'Torneos', color: 'bg-blue-600' },
                { key: 'turno', label: 'Turnos Pedana', color: 'bg-emerald-600' },
                { key: 'curso', label: 'Cursos / Clínicas', color: 'bg-amber-600' },
                { key: 'tirada_nocturna', label: 'Tiradas Nocturnas', color: 'bg-purple-600' },
            ];
        }
        if (role === 'socio') {
            return [
                { key: 'all', label: 'Todos', color: 'bg-gray-500' },
                { key: 'turno', label: 'Mis Turnos', color: 'bg-emerald-600' },
                { key: 'torneo', label: 'Torneos', color: 'bg-blue-600' },
                { key: 'curso', label: 'Cursos y Capacitación', color: 'bg-amber-600' },
            ];
        }
        if (role === 'instructor') {
            return [
                { key: 'all', label: 'Todos', color: 'bg-gray-500' },
                { key: 'turno', label: 'Mis Clases / Turnos', color: 'bg-emerald-600' },
                { key: 'evaluacion', label: 'Evaluaciones', color: 'bg-cyan-600' },
                { key: 'torneo', label: 'Torneos Oficiales', color: 'bg-blue-600' },
            ];
        }
        return [
            { key: 'all', label: 'Todas las actividades', color: 'bg-gray-500' },
            { key: 'torneo', label: 'Torneos', color: 'bg-blue-600' },
            { key: 'curso', label: 'Cursos y Clínicas', color: 'bg-amber-600' },
            { key: 'tirada_nocturna', label: 'Tiradas Nocturnas', color: 'bg-purple-600' },
        ];
    }, [filters, role]);

    // Format current month title: "Noviembre 2026"
    const monthTitle = useMemo(() => {
        const raw = new Intl.DateTimeFormat('es-AR', { month: 'long', year: 'numeric' }).format(currentDate);
        return raw.charAt(0).toUpperCase() + raw.slice(1);
    }, [currentDate]);

    // Navigation functions
    const handlePrev = () => {
        if (viewMode === 'week') {
            const prev = new Date(currentDate);
            prev.setDate(prev.getDate() - 7);
            setCurrentDate(prev);
        } else {
            setCurrentDate(new Date(year, month - 1, 1));
        }
    };

    const handleNext = () => {
        if (viewMode === 'week') {
            const next = new Date(currentDate);
            next.setDate(next.getDate() + 7);
            setCurrentDate(next);
        } else {
            setCurrentDate(new Date(year, month + 1, 1));
        }
    };

    const handleToday = () => {
        setCurrentDate(new Date());
    };

    // Filter items
    const filteredItems = useMemo(() => {
        if (activeFilter === 'all') return items;
        return items.filter(it => it.type === activeFilter || (activeFilter === 'curso' && it.type === 'curso_capacitacion'));
    }, [items, activeFilter]);

    // Group items by date string 'YYYY-MM-DD'
    const itemsByDate = useMemo(() => {
        const map = new Map<string, CalendarItem[]>();
        filteredItems.forEach(item => {
            const list = map.get(item.date) || [];
            list.push(item);
            map.set(item.date, list);
        });
        return map;
    }, [filteredItems]);

    // Today's date string 'YYYY-MM-DD'
    const todayStr = useMemo(() => {
        const t = new Date();
        const y = t.getFullYear();
        const m = String(t.getMonth() + 1).padStart(2, '0');
        const d = String(t.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    }, []);

    // Generate Month Grid cells (42 cells: 6 rows of 7 days)
    const monthCells = useMemo(() => {
        const firstDayOfMonth = new Date(year, month, 1);
        // In JS: 0 = Dom, 1 = Lun, ... 6 = Sab. We want 0 = Lun, 6 = Dom:
        const firstDayWeekday = (firstDayOfMonth.getDay() + 6) % 7;
        const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();

        const cells: Array<{
            dateStr: string;
            dayNumber: number;
            isCurrentMonth: boolean;
            isToday: boolean;
            items: CalendarItem[];
        }> = [];

        // 1. Previous month trailing days
        for (let i = firstDayWeekday - 1; i >= 0; i--) {
            const dayNum = daysInPrevMonth - i;
            const prevMonthDate = new Date(year, month - 1, dayNum);
            const py = prevMonthDate.getFullYear();
            const pm = String(prevMonthDate.getMonth() + 1).padStart(2, '0');
            const pd = String(dayNum).padStart(2, '0');
            const dStr = `${py}-${pm}-${pd}`;
            cells.push({
                dateStr: dStr,
                dayNumber: dayNum,
                isCurrentMonth: false,
                isToday: dStr === todayStr,
                items: itemsByDate.get(dStr) || [],
            });
        }

        // 2. Current month days
        for (let day = 1; day <= daysInCurrentMonth; day++) {
            const cy = year;
            const cm = String(month + 1).padStart(2, '0');
            const cd = String(day).padStart(2, '0');
            const dStr = `${cy}-${cm}-${cd}`;
            cells.push({
                dateStr: dStr,
                dayNumber: day,
                isCurrentMonth: true,
                isToday: dStr === todayStr,
                items: itemsByDate.get(dStr) || [],
            });
        }

        // 3. Next month leading days (fill until multiple of 7, at least 35 or 42)
        const targetTotal = cells.length > 35 ? 42 : 35;
        const remaining = targetTotal - cells.length;
        for (let day = 1; day <= remaining; day++) {
            const nextMonthDate = new Date(year, month + 1, day);
            const ny = nextMonthDate.getFullYear();
            const nm = String(nextMonthDate.getMonth() + 1).padStart(2, '0');
            const nd = String(day).padStart(2, '0');
            const dStr = `${ny}-${nm}-${nd}`;
            cells.push({
                dateStr: dStr,
                dayNumber: day,
                isCurrentMonth: false,
                isToday: dStr === todayStr,
                items: itemsByDate.get(dStr) || [],
            });
        }

        return cells;
    }, [year, month, todayStr, itemsByDate]);

    // Week view days
    const weekDays = useMemo(() => {
        const start = new Date(currentDate);
        const dayOfWeek = (start.getDay() + 6) % 7;
        start.setDate(start.getDate() - dayOfWeek); // Go to Monday of this week

        const days = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date(start);
            d.setDate(start.getDate() + i);
            const y = d.getFullYear();
            const m = String(d.getMonth() + 1).padStart(2, '0');
            const dayNum = String(d.getDate()).padStart(2, '0');
            const dStr = `${y}-${m}-${dayNum}`;
            days.push({
                date: d,
                dateStr: dStr,
                dayName: DIAS_SEMANA_COMPLETO[i],
                dayShort: DIAS_SEMANA[i],
                dayNumber: d.getDate(),
                isToday: dStr === todayStr,
                items: itemsByDate.get(dStr) || [],
            });
        }
        return days;
    }, [currentDate, todayStr, itemsByDate]);

    // Color styling helper
    const getItemStyle = (item: CalendarItem) => {
        const color = item.color || (
            item.type === 'torneo' ? 'blue' :
            item.type === 'turno' ? 'emerald' :
            item.type === 'tirada_nocturna' ? 'purple' :
            item.type === 'curso' || item.type === 'curso_capacitacion' ? 'amber' :
            item.type === 'evaluacion' ? 'cyan' : 'indigo'
        );

        if (item.status === 'cancelado') {
            return {
                chip: 'bg-gray-100 text-gray-500 border-l-2 border-gray-400 opacity-60 line-through',
                dot: 'bg-gray-400',
                banner: 'bg-gray-100 text-gray-700',
            };
        }

        switch (color) {
            case 'blue':
                return {
                    chip: 'bg-blue-50 text-blue-800 border-l-2 border-blue-600 hover:bg-blue-100',
                    dot: 'bg-blue-600',
                    banner: 'bg-blue-600 text-white',
                };
            case 'emerald':
                return {
                    chip: 'bg-emerald-50 text-emerald-800 border-l-2 border-emerald-600 hover:bg-emerald-100',
                    dot: 'bg-emerald-600',
                    banner: 'bg-emerald-600 text-white',
                };
            case 'purple':
                return {
                    chip: 'bg-purple-50 text-purple-800 border-l-2 border-purple-600 hover:bg-purple-100',
                    dot: 'bg-purple-600',
                    banner: 'bg-purple-600 text-white',
                };
            case 'amber':
                return {
                    chip: 'bg-amber-50 text-amber-900 border-l-2 border-amber-600 hover:bg-amber-100',
                    dot: 'bg-amber-600',
                    banner: 'bg-amber-600 text-white',
                };
            case 'rose':
                return {
                    chip: 'bg-rose-50 text-rose-800 border-l-2 border-rose-600 hover:bg-rose-100',
                    dot: 'bg-rose-600',
                    banner: 'bg-rose-600 text-white',
                };
            case 'cyan':
                return {
                    chip: 'bg-cyan-50 text-cyan-800 border-l-2 border-cyan-600 hover:bg-cyan-100',
                    dot: 'bg-cyan-600',
                    banner: 'bg-cyan-600 text-white',
                };
            default:
                return {
                    chip: 'bg-indigo-50 text-indigo-800 border-l-2 border-indigo-600 hover:bg-indigo-100',
                    dot: 'bg-indigo-600',
                    banner: 'bg-indigo-600 text-white',
                };
        }
    };

    // Helper for icons based on item type
    const getItemIcon = (type: string) => {
        switch (type) {
            case 'torneo':
                return <Trophy className="w-3.5 h-3.5 shrink-0" />;
            case 'turno':
                return <Target className="w-3.5 h-3.5 shrink-0" />;
            case 'curso':
            case 'curso_capacitacion':
                return <GraduationCap className="w-3.5 h-3.5 shrink-0" />;
            case 'tirada_nocturna':
                return <Moon className="w-3.5 h-3.5 shrink-0" />;
            default:
                return <CalendarIcon className="w-3.5 h-3.5 shrink-0" />;
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            {/* ── TOP HEADER / TOOLBAR ── */}
            <div className="p-4 sm:p-5 border-b border-gray-100 flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    {/* Title & Navigation */}
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl shrink-0">
                            <CalendarDays className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                                    {monthTitle}
                                </h2>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleToday}
                                    className="h-7 text-xs font-semibold px-2.5 text-gray-700 hover:text-blue-600 hover:border-blue-300"
                                >
                                    Hoy
                                </Button>
                            </div>
                            {subtitle && (
                                <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
                            )}
                        </div>
                    </div>

                    {/* Controls: Prev/Next & View Switcher & Extra buttons */}
                    <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                        {/* Prev / Next buttons */}
                        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-0.5">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handlePrev}
                                className="h-8 w-8 p-0 text-gray-600 hover:text-gray-900"
                                title="Período anterior"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleNext}
                                className="h-8 w-8 p-0 text-gray-600 hover:text-gray-900"
                                title="Período siguiente"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        </div>

                        {/* View Switcher: Mes | Semana | Agenda */}
                        <div className="flex items-center bg-gray-100 p-1 rounded-lg text-xs font-medium text-gray-600">
                            <button
                                type="button"
                                onClick={() => setViewMode('month')}
                                className={`px-2.5 py-1 rounded-md transition-all ${
                                    viewMode === 'month'
                                        ? 'bg-white text-gray-900 shadow-2xs font-semibold'
                                        : 'hover:text-gray-900'
                                }`}
                            >
                                Mes
                            </button>
                            <button
                                type="button"
                                onClick={() => setViewMode('week')}
                                className={`px-2.5 py-1 rounded-md transition-all ${
                                    viewMode === 'week'
                                        ? 'bg-white text-gray-900 shadow-2xs font-semibold'
                                        : 'hover:text-gray-900'
                                }`}
                            >
                                Semana
                            </button>
                            <button
                                type="button"
                                onClick={() => setViewMode('agenda')}
                                className={`px-2.5 py-1 rounded-md transition-all ${
                                    viewMode === 'agenda'
                                        ? 'bg-white text-gray-900 shadow-2xs font-semibold'
                                        : 'hover:text-gray-900'
                                }`}
                            >
                                Agenda
                            </button>
                        </div>

                        {headerExtra}
                    </div>
                </div>

                {/* ── FILTER PILLS BAR ── */}
                {defaultFilters.length > 0 && (
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
                        <span className="text-gray-400 font-medium flex items-center gap-1 mr-1 text-[11px]">
                            <Filter className="w-3 h-3" /> Filtrar:
                        </span>
                        {defaultFilters.map(f => {
                            const isSelected = activeFilter === f.key;
                            return (
                                <button
                                    key={f.key}
                                    type="button"
                                    onClick={() => setActiveFilter(f.key)}
                                    className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                                        isSelected
                                            ? 'bg-blue-600 text-white shadow-xs'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-white' : f.color}`} />
                                    {f.label}
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* ── VIEW 1: GOOGLE CALENDAR MONTH GRID ── */}
            {viewMode === 'month' && (
                <div className="flex flex-col flex-1">
                    {/* Days of week header */}
                    <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50/70 text-center text-xs font-semibold text-gray-600">
                        {DIAS_SEMANA.map((dia, idx) => (
                            <div key={idx} className="py-2.5 border-r border-gray-100 last:border-r-0">
                                <span className="hidden sm:inline">{DIAS_SEMANA_COMPLETO[idx]}</span>
                                <span className="sm:hidden">{dia}</span>
                            </div>
                        ))}
                    </div>

                    {/* Month cells grid */}
                    <div className="grid grid-cols-7 auto-rows-fr bg-gray-200 gap-px flex-1">
                        {monthCells.map((cell, idx) => {
                            const maxVisible = 2; // Show 2 items + '+X más' on standard view
                            const visibleItems = cell.items.slice(0, maxVisible);
                            const moreCount = cell.items.length - maxVisible;

                            return (
                                <div
                                    key={idx}
                                    onClick={() => {
                                        if (onDateSelect) onDateSelect(cell.dateStr);
                                        if (cell.items.length > 0) {
                                            setSelectedDayEvents({ date: cell.dateStr, items: cell.items });
                                        }
                                    }}
                                    className={`min-h-[90px] sm:min-h-[110px] p-1.5 sm:p-2 bg-white flex flex-col justify-start transition-colors ${
                                        !cell.isCurrentMonth ? 'bg-gray-50/60 text-gray-400' : 'text-gray-800'
                                    } hover:bg-blue-50/30 cursor-pointer`}
                                >
                                    {/* Date number */}
                                    <div className="flex items-center justify-between mb-1">
                                        <span
                                            className={`text-xs font-semibold inline-flex items-center justify-center w-6 h-6 rounded-full ${
                                                cell.isToday
                                                    ? 'bg-blue-600 text-white shadow-xs'
                                                    : cell.isCurrentMonth
                                                    ? 'text-gray-800'
                                                    : 'text-gray-400'
                                            }`}
                                        >
                                            {cell.dayNumber}
                                        </span>
                                        {cell.items.length > 0 && (
                                            <span className="sm:hidden text-[10px] font-bold text-blue-600 bg-blue-50 px-1 rounded">
                                                {cell.items.length}
                                            </span>
                                        )}
                                    </div>

                                    {/* Events List for this day */}
                                    <div className="space-y-1 flex-1 overflow-hidden">
                                        {visibleItems.map(item => {
                                            const style = getItemStyle(item);
                                            return (
                                                <button
                                                    key={item.id}
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedItem(item);
                                                    }}
                                                    className={`w-full text-left rounded px-1.5 py-0.5 text-[11px] leading-tight font-medium truncate flex items-center gap-1 shadow-2xs transition-all ${style.chip}`}
                                                    title={`${item.time ? item.time + ' - ' : ''}${item.title}`}
                                                >
                                                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${style.dot}`} />
                                                    {item.time && (
                                                        <span className="font-bold shrink-0 text-[10px] opacity-90">
                                                            {item.time}
                                                        </span>
                                                    )}
                                                    <span className="truncate">{item.title}</span>
                                                </button>
                                            );
                                        })}

                                        {/* '+X más' indicator */}
                                        {moreCount > 0 && (
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedDayEvents({ date: cell.dateStr, items: cell.items });
                                                }}
                                                className="w-full text-left text-[10px] font-semibold text-blue-600 hover:text-blue-800 px-1 py-0.5 rounded hover:bg-blue-50/80 transition-colors"
                                            >
                                                +{moreCount} más
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* ── VIEW 2: WEEK VIEW ── */}
            {viewMode === 'week' && (
                <div className="flex flex-col flex-1">
                    <div className="grid grid-cols-1 sm:grid-cols-7 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
                        {weekDays.map(day => (
                            <div key={day.dateStr} className="p-3 sm:p-4 min-h-[300px] flex flex-col bg-white">
                                {/* Header of Day */}
                                <div className="flex sm:flex-col items-center justify-between sm:justify-start pb-2 border-b border-gray-100 gap-1 mb-3">
                                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        {day.dayName}
                                    </span>
                                    <span
                                        className={`text-lg font-bold inline-flex items-center justify-center w-8 h-8 rounded-full ${
                                            day.isToday ? 'bg-blue-600 text-white shadow-xs' : 'text-gray-800'
                                        }`}
                                    >
                                        {day.dayNumber}
                                    </span>
                                </div>

                                {/* Items for the day */}
                                <div className="space-y-2 flex-1">
                                    {day.items.length === 0 ? (
                                        <p className="text-xs text-gray-400 italic text-center py-6">Sin actividades</p>
                                    ) : (
                                        day.items.map(item => {
                                            const style = getItemStyle(item);
                                            return (
                                                <div
                                                    key={item.id}
                                                    onClick={() => setSelectedItem(item)}
                                                    className={`p-2.5 rounded-xl border border-gray-200/80 shadow-2xs hover:shadow-sm cursor-pointer transition-all ${style.chip}`}
                                                >
                                                    <div className="flex items-center justify-between gap-1 mb-1">
                                                        <Badge variant="outline" className="text-[10px] py-0 px-1.5 bg-white/70">
                                                            {item.badgeText || item.type}
                                                        </Badge>
                                                        {item.time && (
                                                            <span className="text-[11px] font-bold flex items-center gap-1">
                                                                <Clock className="w-3 h-3" /> {item.time}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-xs font-bold leading-snug line-clamp-2">{item.title}</p>
                                                    {item.location && (
                                                        <p className="text-[10px] text-gray-500 mt-1 flex items-center gap-1">
                                                            <MapPin className="w-3 h-3" /> {item.location}
                                                        </p>
                                                    )}
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ── VIEW 3: AGENDA / LIST VIEW ── */}
            {viewMode === 'agenda' && (
                <div className="p-4 sm:p-6 space-y-4 max-h-[600px] overflow-y-auto">
                    {filteredItems.length === 0 ? (
                        <div className="py-12 text-center text-gray-500">
                            <CalendarDays className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                            <p className="font-semibold text-gray-700">No hay eventos ni turnos en este período</p>
                            <p className="text-xs text-gray-400 mt-1">Podés seleccionar otro mes o cambiar los filtros superiores.</p>
                        </div>
                    ) : (
                        [...filteredItems]
                            .sort((a, b) => a.date.localeCompare(b.date) || (a.time || '').localeCompare(b.time || ''))
                            .map(item => {
                                const style = getItemStyle(item);
                                const itemDate = new Date(item.date + 'T00:00:00');
                                const dateFormatted = new Intl.DateTimeFormat('es-AR', {
                                    weekday: 'long',
                                    day: 'numeric',
                                    month: 'long',
                                }).format(itemDate);

                                return (
                                    <div
                                        key={item.id}
                                        onClick={() => setSelectedItem(item)}
                                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-sm cursor-pointer transition-all bg-white gap-3"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="p-2.5 rounded-xl bg-gray-50 text-gray-700 shrink-0">
                                                {getItemIcon(item.type)}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span className="text-xs font-semibold text-blue-600 capitalize">
                                                        {dateFormatted}
                                                    </span>
                                                    {item.time && (
                                                        <span className="text-xs text-gray-500 flex items-center gap-1 font-medium">
                                                            <Clock className="w-3 h-3" /> {item.time} hs
                                                        </span>
                                                    )}
                                                    <Badge variant="outline" className="text-[10px] uppercase">
                                                        {item.badgeText || item.type}
                                                    </Badge>
                                                </div>
                                                <h4 className="text-sm sm:text-base font-bold text-gray-900 mt-1">
                                                    {item.title}
                                                </h4>
                                                {item.location && (
                                                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                                        <MapPin className="w-3.5 h-3.5" /> {item.location}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 ml-auto sm:ml-0 shrink-0">
                                            {item.costo !== undefined && (
                                                <span className="text-xs font-bold text-gray-900 bg-gray-100 px-2.5 py-1 rounded-lg">
                                                    {item.costo > 0 ? `$${item.costo.toLocaleString('es-AR')}` : 'Sin cargo'}
                                                </span>
                                            )}
                                            <Button size="sm" variant="outline" className="text-xs gap-1">
                                                Ver detalle <Eye className="w-3.5 h-3.5" />
                                            </Button>
                                        </div>
                                    </div>
                                );
                            })
                    )}
                </div>
            )}

            {/* ── MODAL 1: EVENT DETAIL MODAL ── */}
            <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
                {selectedItem && (
                    <DialogContent className="sm:max-w-md w-[95vw] sm:w-full p-0 overflow-hidden">
                        {/* Header Banner */}
                        <div className={`p-5 ${getItemStyle(selectedItem).banner}`}>
                            <div className="flex items-center justify-between gap-2">
                                <Badge className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-xs text-xs font-semibold uppercase">
                                    {selectedItem.badgeText || selectedItem.type}
                                </Badge>
                                {selectedItem.status && (
                                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-white text-gray-900 font-bold capitalize shadow-xs">
                                        {selectedItem.status}
                                    </span>
                                )}
                            </div>
                            <DialogTitle className="text-lg sm:text-xl font-bold mt-2 text-white">
                                {selectedItem.title}
                            </DialogTitle>
                        </div>

                        {/* Content */}
                        <div className="p-5 space-y-4">
                            {/* Date & Time */}
                            <div className="flex items-start gap-3 text-sm text-gray-700">
                                <CalendarIcon className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                                <div>
                                    <p className="font-semibold text-gray-900 capitalize">
                                        {new Intl.DateTimeFormat('es-AR', {
                                            weekday: 'long',
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        }).format(new Date(selectedItem.date + 'T00:00:00'))}
                                    </p>
                                    {selectedItem.time && (
                                        <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                                            <Clock className="w-3.5 h-3.5" /> Horario: {selectedItem.time} hs
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Location */}
                            {selectedItem.location && (
                                <div className="flex items-center gap-3 text-sm text-gray-700">
                                    <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
                                    <div>
                                        <span className="text-xs text-gray-500 block">Lugar / Sector:</span>
                                        <span className="font-semibold text-gray-900">{selectedItem.location}</span>
                                    </div>
                                </div>
                            )}

                            {/* Instructor / Socio info */}
                            {selectedItem.instructor && (
                                <div className="flex items-center gap-3 text-sm text-gray-700">
                                    <GraduationCap className="w-4 h-4 text-amber-600 shrink-0" />
                                    <div>
                                        <span className="text-xs text-gray-500 block">Instructor a cargo:</span>
                                        <span className="font-semibold text-gray-900">{selectedItem.instructor}</span>
                                    </div>
                                </div>
                            )}

                            {selectedItem.socio && (
                                <div className="flex items-center gap-3 text-sm text-gray-700">
                                    <User className="w-4 h-4 text-emerald-600 shrink-0" />
                                    <div>
                                        <span className="text-xs text-gray-500 block">Tirador / Socio:</span>
                                        <span className="font-semibold text-gray-900">{selectedItem.socio}</span>
                                    </div>
                                </div>
                            )}

                            {/* Arancel & Cupos */}
                            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-100">
                                {selectedItem.costo !== undefined && (
                                    <div className="bg-gray-50 p-2.5 rounded-xl">
                                        <span className="text-[11px] text-gray-500 block">Arancel / Costo</span>
                                        <span className="text-sm font-bold text-gray-900">
                                            {selectedItem.costo > 0 ? `$${selectedItem.costo.toLocaleString('es-AR')}` : 'Sin costo'}
                                        </span>
                                    </div>
                                )}
                                {selectedItem.cupos && (
                                    <div className="bg-gray-50 p-2.5 rounded-xl">
                                        <span className="text-[11px] text-gray-500 block">Cupos disponibles</span>
                                        <span className="text-sm font-bold text-gray-900">{selectedItem.cupos}</span>
                                    </div>
                                )}
                            </div>

                            {/* Description */}
                            {selectedItem.description && (
                                <div className="text-xs text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-xl">
                                    {selectedItem.description}
                                </div>
                            )}
                        </div>

                        {/* Footer Actions */}
                        <DialogFooter className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-2">
                            <Button variant="ghost" size="sm" onClick={() => setSelectedItem(null)}>
                                Cerrar
                            </Button>

                            {selectedItem.link && (
                                <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 text-white gap-1.5">
                                    <a href={selectedItem.link}>
                                        {selectedItem.linkText || 'Ver detalles'} <ExternalLink className="w-3.5 h-3.5" />
                                    </a>
                                </Button>
                            )}

                            {selectedItem.actionButton && (
                                <Button
                                    size="sm"
                                    variant={selectedItem.actionButton.variant || 'default'}
                                    onClick={() => {
                                        selectedItem.actionButton?.onClick();
                                        setSelectedItem(null);
                                    }}
                                >
                                    {selectedItem.actionButton.label}
                                </Button>
                            )}
                        </DialogFooter>
                    </DialogContent>
                )}
            </Dialog>

            {/* ── MODAL 2: DAY DETAILS MODAL (when clicking a day with events or '+X más') ── */}
            <Dialog open={!!selectedDayEvents} onOpenChange={(open) => !open && setSelectedDayEvents(null)}>
                {selectedDayEvents && (
                    <DialogContent className="sm:max-w-md w-[95vw] sm:w-full">
                        <DialogHeader>
                            <DialogTitle className="text-base font-bold text-gray-900 capitalize flex items-center gap-2">
                                <CalendarIcon className="w-4 h-4 text-blue-600" />
                                {new Intl.DateTimeFormat('es-AR', {
                                    weekday: 'long',
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                }).format(new Date(selectedDayEvents.date + 'T00:00:00'))}
                            </DialogTitle>
                            <DialogDescription className="text-xs text-gray-500">
                                {selectedDayEvents.items.length} actividad(es) programada(s)
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-2.5 max-h-[350px] overflow-y-auto py-2">
                            {selectedDayEvents.items.map(item => {
                                const style = getItemStyle(item);
                                return (
                                    <div
                                        key={item.id}
                                        onClick={() => {
                                            setSelectedDayEvents(null);
                                            setSelectedItem(item);
                                        }}
                                        className={`p-3 rounded-xl border border-gray-200 cursor-pointer hover:shadow-xs transition-all ${style.chip}`}
                                    >
                                        <div className="flex items-center justify-between gap-1 mb-1">
                                            <Badge variant="outline" className="text-[10px] uppercase font-semibold">
                                                {item.badgeText || item.type}
                                            </Badge>
                                            {item.time && (
                                                <span className="text-xs font-bold flex items-center gap-1">
                                                    <Clock className="w-3 h-3" /> {item.time} hs
                                                </span>
                                            )}
                                        </div>
                                        <h5 className="text-sm font-bold text-gray-900">{item.title}</h5>
                                        {item.location && (
                                            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                                <MapPin className="w-3 h-3" /> {item.location}
                                            </p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        <DialogFooter>
                            <Button variant="outline" size="sm" onClick={() => setSelectedDayEvents(null)}>
                                Cerrar
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                )}
            </Dialog>
        </div>
    );
}
