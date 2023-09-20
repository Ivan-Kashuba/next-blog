import React from 'react';
import { getServerSession } from 'next-auth';
import { authNextConfig } from '@/app/global/config/auth/auth';
import { ProfileCard, ProfileHeader } from '@/entities/User';

export default async function ProfilePage() {
    const session = await getServerSession(authNextConfig);
    const user = session?.user;

    return (
        <div className="px-[10%]">
            <ProfileHeader serverUser={user} />
            <ProfileCard serverUser={user} />
        </div>
    );
}
