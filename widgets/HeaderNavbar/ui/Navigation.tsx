'use client';
import React from 'react';
import { Link } from '@nextui-org/react';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface NavigationProps {
    navigationItems: { label: string; href: string }[];
}

export const Navigation = (props: NavigationProps) => {
    const { navigationItems } = props;

    const pathname = usePathname();

    return (
        <>
            {navigationItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                    <Link
                        key={item.label}
                        href={item.href}
                        underline={isActive ? 'always' : 'hover'}
                    >
                        {item.label}
                    </Link>
                );
            })}
        </>
    );
};
