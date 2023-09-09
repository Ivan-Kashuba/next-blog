import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { getLocalStorageKey } from '@/shared/lib/localStorage/getLocalStorageKey';
import { STORAGE_KEY } from '@/shared/lib/api/http';
import { useAuth } from '@/app/global/providers/auth/model/store/useAuth';

interface RequireAuthProps {
    children: ReactNode;
}

export const AuthWrapper = (props: RequireAuthProps) => {
    const { children } = props;
    const token = getLocalStorageKey(STORAGE_KEY);
    const { setAuthorized } = useAuth();

    useEffect(() => {
        if (token) {
            setAuthorized(true);
        } else {
            setAuthorized(false);
        }
    }, [token]);

    return children;
};
