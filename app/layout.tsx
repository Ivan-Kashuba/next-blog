import './global/style/globals.css';
import type { Metadata } from 'next';
import { Providers } from '@/app/global/hoc/providers';

import { Footer } from '@/app/global/ui/Footer';
import { HeaderNavbar } from '@/widgets/HeaderNavbar';

export const metadata: Metadata = {
    title: 'Blog',
    description: 'Read posts here',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <HeaderNavbar />
                    <main className="min-h-[calc(100vh-120px)] p-[30px]">{children}</main>
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}
