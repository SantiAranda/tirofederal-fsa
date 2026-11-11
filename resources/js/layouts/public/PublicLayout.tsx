import { ReactNode } from 'react';
import PublicNavbar from '@/components/public/PublicNavbar';
import PublicFooter from '@/components/public/PublicFooter';

interface PublicLayoutProps {
    children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <PublicNavbar />
            <main className="flex-1">
                {children}
            </main>
            <PublicFooter />
        </div>
    );
}

