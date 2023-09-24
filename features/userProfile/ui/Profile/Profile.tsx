import React from 'react';
import { ProfileCard } from '../ProfileCard/ProfileCard';
import { ProfileHeader } from '../ProfileCardHeader/ProfileHeader';
import { UserSession } from '@/app/api/auth/[...nextauth]/next-auth';

interface ProfilePropsT {
    serverUser?: UserSession;
    isOwnProfile?: boolean;
}

export const Profile = ({ serverUser, isOwnProfile }: ProfilePropsT) => {
    return (
        <>
            <ProfileHeader serverUser={serverUser} isOwnProfile={isOwnProfile} />
            <ProfileCard serverUser={serverUser} isOwnProfile={isOwnProfile} />
        </>
    );
};
