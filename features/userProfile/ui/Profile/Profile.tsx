import React from 'react';
import { ProfileCard } from '../ProfileCard/ProfileCard';
import { ProfileHeader } from '../ProfileCardHeader/ProfileHeader';
import { UserSession } from '@/app/api/auth/[...nextauth]/next-auth';

interface ProfilePropsT {
    serverUser?: UserSession;
}

export const Profile = ({ serverUser }: ProfilePropsT) => {
    return (
        <>
            <ProfileHeader serverUser={serverUser} />
            <ProfileCard serverUser={serverUser} />
        </>
    );
};
