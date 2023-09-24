'use client';
import React, { useMemo } from 'react';
import { User } from '@nextui-org/user';
import { Button, useDisclosure } from '@nextui-org/react';
import { UserSession } from '@/app/api/auth/[...nextauth]/next-auth';
import { useSession } from 'next-auth/react';
import { ProfileChangeDataModal } from '@/features/profileChangeDataModal';

interface ProfileHeaderPropsI {
    serverUser?: UserSession;
    isOwnProfile?: boolean;
}

export const ProfileHeader = (props: ProfileHeaderPropsI) => {
    const { serverUser, isOwnProfile } = props;

    const { data: session } = useSession();
    const isGoogleUser = !serverUser?.token;
    const isPageEditable = !isGoogleUser && isOwnProfile;

    const disclosure = useDisclosure();
    const { onOpen } = disclosure;

    const currentUser = useMemo(() => {
        if (isOwnProfile) {
            return session?.user || serverUser;
        }

        if (!isOwnProfile) {
            return serverUser;
        }
    }, [isOwnProfile, serverUser, session?.user]);

    const avatarImage = useMemo(() => {
        if (currentUser?.image) {
            return serverUser?.image;
        }

        if (currentUser?.avatar) {
            return `http://test-blog-api.ficuslife.com${currentUser.avatar}`;
        }

        return undefined;
    }, [currentUser, serverUser?.image]);

    return (
        <div className="flex items-center justify-between w-[100%] ">
            <User
                name={currentUser?.name}
                description={currentUser?.email}
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
