'use client';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from 'next-auth/react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { ReactNode, useEffect } from 'react';
import { Theme } from '@/shared/types/theme';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import TokenProvider from '@/app/global/providers/TokenProvider';
import { SkeletonProvider } from '@/app/global/providers/SkeletonProvider';

interface ProvidersPropsI {
    children: ReactNode;
    initialTheme?: Theme;
}

export function Providers(props: ProvidersPropsI) {
    const { children, initialTheme } = props;
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setTheme(initialTheme || Theme.LIGHT);
    }, []);

    return (
        <>
            <SessionProvider>
                <TokenProvider />
                <SkeletonProvider theme={initialTheme || (theme as Theme)}>
                    <NextUIProvider>{children}</NextUIProvider>
                </SkeletonProvider>
            </SessionProvider>
            <ToastContainer autoClose={2200} theme={theme} />
            <ProgressBar height="6px" color="#a29999" shallowRouting />
        </>
    );
}
