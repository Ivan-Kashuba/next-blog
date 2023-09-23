'use client';
import React, { useMemo } from 'react';
import { User } from '@nextui-org/user';
import { Button, useDisclosure } from '@nextui-org/react';
import { UserSession } from '@/app/api/auth/[...nextauth]/next-auth';
import { useSession } from 'next-auth/react';
import { ProfileChangeDataModal } from '@/features/profileChangeDataModal';

interface ProfileHeaderPropsI {
    serverUser?: UserSession;
}

export const ProfileHeader = (props: ProfileHeaderPropsI) => {
    const { serverUser } = props;
    const { data: session } = useSession();
    const isGoogleUser = !serverUser?.token;
    const isPageEditable = !isGoogleUser;

    const disclosure = useDisclosure();
    const { onOpen } = disclosure;

    const avatarImage = useMemo(() => {
        if (serverUser?.image) {
            return serverUser?.image;
        }

        if (session?.user.avatar) {
            return `http://test-blog-api.ficuslife.com${session?.user.avatar}`;
        }

        if (serverUser?.avatar) {
            return `http://test-blog-api.ficuslife.com${serverUser?.avatar}`;
        }

        return undefined;
    }, [session?.user.avatar, serverUser?.avatar, serverUser?.image]);

    return (
        <div className="flex items-center justify-between w-[100%] ">
            <User
                name={session?.user.name || serverUser?.name}
                description={session?.user.email || serverUser?.email}
                avatarProps={{
                    src: avatarImage,
                }}
            />
            {isPageEditable && (
                <>
                    <Button variant="ghost" onClick={onOpen}>
                        Edit
                    </Button>
                    <ProfileChangeDataModal disclosure={disclosure} />
                </>
            )}
        </div>
    );
};
