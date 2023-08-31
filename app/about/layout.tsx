import { Metadata } from 'next';
import { Link } from '@/shared/lib/chakraClient';
import { Heading } from '@chakra-ui/react';

export const metadata: Metadata = {
    title: 'About',
    description: 'Info about us',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <h1 className="text-2xl">About us</h1>
            <Link href="/contacts">Contact us</Link>
            <Link href="/team">Team</Link>
            {children}
        </div>
    );
}
