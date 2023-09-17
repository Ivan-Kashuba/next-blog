import React from 'react';
import { Avatar, Button, useDisclosure } from '@nextui-org/react';
import { useHover } from '@/shared/lib/hooks/useHover/useHover';
import { ProfileChangeAvatarModal } from '@/entities/User/ui/Profile/ProfileChangeAvatarModal/ProfileChangeAvatarModal';

interface ProfileHeaderUserImagePropsI {
    userPhoto?: string;
}
export const ProfileHeaderUserImage = (props: ProfileHeaderUserImagePropsI) => {
    const { userPhoto } = props;
    const { isHovered, eventHandlers } = useHover();
    const disclosure = useDisclosure();

    const { onOpen } = disclosure;

    return (
        <>
            <div
                className="relative mt-[20px] m-auto text-center flex justify-center items-center rounded-[50%] w-[200px] h-[200px]"
                {...eventHandlers}
            >
                <>
                    <Avatar src={userPhoto || ''} className="w-[100%] h-[100%]" />
                    {isHovered && (
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
