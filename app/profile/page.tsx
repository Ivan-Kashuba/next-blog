import React from 'react';
import { Profile } from '@/features/userProfile';
import { getServerSession } from 'next-auth';
import { authNextConfig } from '@/app/global/config/auth/auth';

export default async function GoogleProfilePage() {
    const session = await getServerSession(authNextConfig);

    return (
        <div>
            <Profile serverUser={session?.user} isOwnProfile={true} />
        </div>
    );
}
