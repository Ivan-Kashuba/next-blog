import './globals.css';
import type { Metadata } from 'next';
import { Providers } from '@/app/providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'Blog',
    description: 'Read posts here',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <Header />
                    <main className="min-h-[calc(100vh-120px)] p-[30px]">{children}</main>
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}
