'use client';
import React from 'react';
import { User } from '@nextui-org/user';
import { Button } from '@nextui-org/react';
import { UserSession } from '@/app/api/auth/[...nextauth]/next-auth';
import { useSession } from 'next-auth/react';

interface ProfileHeaderPropsI {
    user?: UserSession;
}

export const ProfileHeader = (props: ProfileHeaderPropsI) => {
    const { user } = props;
    const { data: session } = useSession();
    const isGoogleUser = !user?.token;
    const isPageEditable = !isGoogleUser;

    return (
        <div className="flex items-center justify-between w-[100%] ">
            <User
                name={user?.name}
                description={user?.email}
                avatarProps={{
                    src:
                        user?.image ||
                        `http://test-blog-api.ficuslife.com${
                            session?.user?.avatar || user?.avatar
                        }`,
                }}
            />
            {isPageEditable && <Button variant="ghost">Edit</Button>}
        </div>
    );
};
