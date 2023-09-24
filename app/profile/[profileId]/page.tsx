import React from 'react';
import { Profile } from '@/features/userProfile';
import { getServerSession } from 'next-auth';
import { authNextConfig } from '@/app/global/config/auth/auth';
import { getUserByIdOnServer } from '@/features/userProfile/model/service/getUserByIdOnServer/getUserByIdOnServer';

interface ProfilePropsT {
    params: {
        profileId: string;
    };
}

export default async function UserProfilePage(props: ProfilePropsT) {
    const profileId = props.params.profileId;
    const session = await getServerSession(authNextConfig);
    const ownServerProfile = session?.user;

    const isOwnProfile = profileId === ownServerProfile?._id;
    const userProfile = await getUserByIdOnServer(profileId);
    const profileUser = isOwnProfile ? ownServerProfile : userProfile;

    return (
        <div className="px-[10%]">
            <Profile isOwnProfile={isOwnProfile} serverUser={profileUser} />
        </div>
    );
}
