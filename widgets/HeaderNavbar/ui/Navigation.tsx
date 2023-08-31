'use client';
import React from 'react';
import { Link } from '@chakra-ui/next-js';
import { usePathname } from 'next/navigation';

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
                        className={isActive ? 'text-blue-600' : ''}
                        key={item.label}
                        href={item.href}
                    >
                        {item.label}
                    </Link>
                );
            })}
        </>
    );
};
