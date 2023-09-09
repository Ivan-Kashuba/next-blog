'use client';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { AuthWrapper } from '@/app/global/providers/auth/ui/AuthWrapper';
import { useEffect } from 'react';
import { useAuth } from '@/app/global/providers/auth/model/store/useAuth';
import { NextUIProvider } from '@nextui-org/react';

export function Providers({ children }: { children: React.ReactNode }) {
    const { setRenderedTrue } = useAuth();

    useEffect(() => {
        setRenderedTrue();
    }, []);

    return (
        <>
            <NextUIProvider>
                <AuthWrapper>{children}</AuthWrapper>
            </NextUIProvider>
            <ProgressBar height="6px" color="#a29999" shallowRouting />
        </>
    );
}
