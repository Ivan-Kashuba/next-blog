import React from 'react';
import { getServerSession } from 'next-auth';
import { authNextConfig } from '@/app/global/config/auth/auth';
import { Profile } from '@/features/userProfile';

export default async function ProfilePage() {
    const session = await getServerSession(authNextConfig);
    const user = session?.user;

    return (
        <div className="px-[10%]">
            <Profile serverUser={user} />
        </div>
    );
}
