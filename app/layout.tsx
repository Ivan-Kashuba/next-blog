import './global/style/globals.css';
import type { Metadata } from 'next';
import { Providers } from '@/app/global/providers/providers';
import { Footer } from '@/app/global/ui/Footer';
import { HeaderNavbar } from '@/widgets/HeaderNavbar';
import { cookies } from 'next/headers';
import { Theme } from '@/shared/types/theme';

export const metadata: Metadata = {
    title: 'Blog',
    description: 'Read posts here',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const theme = cookies().get('theme');

    return (
        <html lang="en" className={theme?.value || Theme.LIGHT}>
            <body>
                <Providers initialTheme={theme?.value as Theme}>
                    <HeaderNavbar />
                    <main className="min-h-[calc(100vh-120px)] p-[30px]">{children}</main>
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}
