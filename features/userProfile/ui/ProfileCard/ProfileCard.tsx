'use client';
import React, { useMemo } from 'react';
import { UserSession } from '@/app/api/auth/[...nextauth]/next-auth';
import { Image } from '@nextui-org/react';
import { Card, CardBody } from '@nextui-org/card';
import DateHelper from '@/shared/lib/dateHelper/dateHelper';
import { useSession } from 'next-auth/react';
import { ProfileHeaderUserImage } from '../ProfileHeaderUserImage/ProfileHeaderUserImage';

interface ProfileCardPropsI {
    serverUser?: UserSession;
    isOwnProfile?: boolean;
}

export const ProfileCard = (props: ProfileCardPropsI) => {
    const { serverUser, isOwnProfile } = props;
    const isGoogleUser = !serverUser?.token && isOwnProfile;
    const { data: session } = useSession();

    const currentUser = useMemo(() => {
        if (isOwnProfile) {
            return session?.user || serverUser;
        }

        if (!isOwnProfile) {
            return serverUser;
        }
    }, [isOwnProfile, serverUser, session?.user]);

    return (
        <div>
            <div className="mt-[20px] text-3xl text-center">{currentUser?.name}</div>
            {isGoogleUser ? (
                <div className="flex gap-[30px] items-center">
                    <Image
                        className="rounded-[50%]"
                        src={currentUser?.image || undefined}
                        width={300}
                        height={300}
                        alt={'Image'}
                    />
                    <div>
                        You are authenticated via Google as guest, if you wanna have extended
                        functional, please create account
                    </div>
                </div>
            ) : (
                <>
                    <ProfileHeaderUserImage
                        userPhoto={currentUser?.avatar}
                        isOwnProfile={isOwnProfile}
                    />
                    <div className="flex justify-between mt-[50px]">
                        <Card className="w-[45%]">
                            <CardBody>
                                <p>
                                    <span className="font-bold">Skills</span> :{' '}
                                    {currentUser?.skills || '-'}
                                </p>
                                <p>
                                    <span className="font-bold">Details</span> :{' '}
                                    {currentUser?.details || '-'}
                                </p>
                                <p>
                                    <span className="font-bold">Extra details</span> :{' '}
                                    {currentUser?.extra_details || '-'}
                                </p>
                            </CardBody>
                        </Card>
                        <Card className="w-[45%]">
                            <CardBody>
                                <p>
                                    <span className="font-bold">Profession</span> :{' '}
                                    {currentUser?.profession || '-'}
                                </p>
                                <p>
                                    <span className="font-bold">Contacts</span> :{' '}
                                    {currentUser?.email || '-'}
                                </p>
                                <p>
                                    <span className="font-bold">Created account date</span> :{' '}
                                    {currentUser?.dateCreated
                                        ? new DateHelper(
                                              currentUser?.dateCreated,
                                          ).formatToPointDDMMYYYY()
                                        : '-'}
                                </p>
                            </CardBody>
                        </Card>
                    </div>
                </>
            )}
        </div>
    );
};
