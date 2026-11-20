import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import type { AppLayoutProps } from '@/types';

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
}: AppLayoutProps) {
    // El tema claro se fija globalmente en hooks/use-appearance.tsx.
    // El sidebar es oscuro por sus propias variables CSS, no por el modo global.
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar" className="min-w-0 overflow-x-clip bg-gray-50">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                <div className="px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
                    {children}
                </div>
            </AppContent>
        </AppShell>
    );
}
