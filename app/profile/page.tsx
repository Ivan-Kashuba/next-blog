import React from 'react';
import { getServerSession } from 'next-auth';
import { authNextConfig } from '@/app/global/config/auth/auth';

export default async function ProfilePage() {
    const session = await getServerSession(authNextConfig);

    return (
        <div>
            Profile of {session?.user?.email}, {session?.user?.name}
        </div>
    );
}
