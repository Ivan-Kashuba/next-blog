'use client';
import { Avatar, Button, useDisclosure } from '@nextui-org/react';
import { useHover } from '@/shared/lib/hooks/useHover/useHover';

import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import { ProfileChangeAvatarModal } from '@/features/profileChangeAvatarModal';

interface ProfileHeaderUserImagePropsI {
    userPhoto?: string;
    isOwnProfile?: boolean;
}
export const ProfileHeaderUserImage = (props: ProfileHeaderUserImagePropsI) => {
    const { userPhoto, isOwnProfile } = props;
    const { isHovered, eventHandlers } = useHover();
    const disclosure = useDisclosure();

    const { onOpen } = disclosure;

    const avatarImage = useMemo(() => {
        if (userPhoto) {
            return `http://test-blog-api.ficuslife.com${userPhoto}`;
        }

        return undefined;
    }, [userPhoto]);

    return (
        <>
            <div
                className="relative mt-[20px] m-auto text-center flex justify-center items-center rounded-[50%] w-[200px] h-[200px]"
                {...eventHandlers}
            >
                <>
                    <Avatar src={avatarImage} className="w-[100%] h-[100%]" />
                    {isHovered && isOwnProfile && (
                        <>
                            <div className="w-[200px] h-[200px] z-10 rounded-[50%] bg-[rgba(59,67,76,0.9)] absolute" />
                            <Button
                                variant="solid"
                                color="primary"
                                className="absolute top-[40%] z-20"
                                onClick={onOpen}
                            >
                                Change logo
                            </Button>
                        </>
                    )}
                </>
            </div>

            <ProfileChangeAvatarModal disclosure={disclosure} />
        </>
    );
};
