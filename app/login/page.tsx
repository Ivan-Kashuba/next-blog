import React from 'react';
import { GoogleLoginButton } from '@/features/loginByGoogle';
import { LoginByEmailForm } from '@/features/loginByEmail';

export default function LoginPage() {
    return (
        <div className="flex flex-col gap-[30px]">
            <LoginByEmailForm />
            <GoogleLoginButton className="w-[500px] m-auto flex items-center justify-center" />
        </div>
    );
}
