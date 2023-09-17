'use client';
import React from 'react';
import { User } from '@nextui-org/user';
import { Button } from '@nextui-org/react';
import { UserSession } from '@/app/api/auth/[...nextauth]/next-auth';

interface ProfileHeaderPropsI {
    user?: UserSession;
}

export const ProfileHeader = (props: ProfileHeaderPropsI) => {
    const { user } = props;
    const isGoogleUser = !user?.token;
    const isPageEditable = !isGoogleUser;

    return (
        <div className="flex items-center justify-between w-[100%] ">
            <User
                name={user?.name}
                description={user?.email}
                avatarProps={{
                    src: user?.avatar || user?.image,
                }}
            />
            {isPageEditable && <Button variant="ghost">Edit</Button>}
        </div>
    );
};
