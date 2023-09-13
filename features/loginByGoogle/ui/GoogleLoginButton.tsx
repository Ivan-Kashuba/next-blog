'use client';
import { useSearchParams } from 'next/navigation';
import { Button } from '@nextui-org/react';
import { signIn } from 'next-auth/react';
import { useCallback } from 'react';
import { FcGoogle } from 'react-icons/fc';

interface GoogleButtonPropsI {
    className?: string;
}

export const GoogleLoginButton = (props: GoogleButtonPropsI) => {
    const { className } = props;
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/profile';

    const onLoginWithGoogle = useCallback(() => {
        return signIn('google', {
            callbackUrl,
        });
    }, [callbackUrl]);

    return (
        <Button variant="light" className={className} onClick={onLoginWithGoogle}>
            <FcGoogle />
            <div> Login with Google (visit mode only)</div>
        </Button>
    );
};
