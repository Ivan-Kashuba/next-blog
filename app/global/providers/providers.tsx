'use client';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from 'next-auth/react';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <>
            <SessionProvider>
                <NextUIProvider>{children}</NextUIProvider>
            </SessionProvider>
            <ProgressBar height="6px" color="#a29999" shallowRouting />
        </>
    );
}
