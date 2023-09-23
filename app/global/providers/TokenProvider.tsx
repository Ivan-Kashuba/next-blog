'use client';
import { useEffect } from 'react';
import { setLocalStorageKey } from '@/shared/lib/localStorage/setLocalStorageKey';
import http, { STORAGE_KEY } from '@/shared/lib/api/http';
import { useSession } from 'next-auth/react';

export const TokenProvider = () => {
    const { data: session } = useSession();

    useEffect(() => {
        if (session?.user?.token) {
            http.setAuthHeader(session?.user.token);
        } else {
            setLocalStorageKey(STORAGE_KEY, '');
        }
    }, [session?.user.token]);

    return <></>;
};

export default TokenProvider;
