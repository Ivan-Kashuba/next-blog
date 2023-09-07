'use client';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { AuthWrapper } from '@/app/global/providers/auth/AuthWrapper';
import { useEffect } from 'react';
import { useAuth } from '@/app/global/providers/auth/useAuth';

export function Providers({ children }: { children: React.ReactNode }) {
    const { setRenderedTrue } = useAuth();

    useEffect(() => {
        setRenderedTrue();
    }, []);

    return (
        <CacheProvider>
            <ChakraProvider>
                <AuthWrapper>{children}</AuthWrapper>
            </ChakraProvider>
            <ProgressBar height="6px" color="#a29999" shallowRouting />
        </CacheProvider>
    );
}
