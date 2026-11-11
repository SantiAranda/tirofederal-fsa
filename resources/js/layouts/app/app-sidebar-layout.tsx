import { useEffect } from 'react';
import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import type { AppLayoutProps } from '@/types';

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
}: AppLayoutProps) {
    // El backoffice siempre usa light mode — el sidebar es oscuro por CSS vars,
    // no por el modo global del sistema.
    useEffect(() => {
        document.documentElement.classList.remove('dark');
        document.documentElement.style.colorScheme = 'light';
    }, []);

    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar" className="min-w-0 overflow-x-clip bg-gray-50">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </AppContent>
        </AppShell>
    );
}
