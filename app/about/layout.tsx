import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About',
    description: 'Info about us',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <h1 className="text-2xl">About us</h1>

            {children}
        </div>
    );
}
