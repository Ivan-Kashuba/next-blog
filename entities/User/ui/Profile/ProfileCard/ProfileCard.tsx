'use client';
import React from 'react';
import { UserSession } from '@/app/api/auth/[...nextauth]/next-auth';
import { Image } from '@nextui-org/react';
import { Card, CardBody } from '@nextui-org/card';
import DateHelper from '@/shared/lib/dateHelper/dateHelper';
import { ProfileHeaderUserImage } from '@/entities/User/ui/Profile/ProfileHeaderUserImage/ProfileHeaderUserImage';

interface ProfileCardPropsI {
    user?: UserSession;
}

export const ProfileCard = (props: ProfileCardPropsI) => {
    const { user } = props;
    const isGoogleUser = !user?.token;

    return (
        <div>
            <div className="mt-[20px] text-3xl text-center">{user?.name}</div>
            {isGoogleUser ? (
                <div className="flex gap-[30px] items-center">
                    <Image
                        className="rounded-[50%]"
                        src={user?.image || ''}
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
                    <ProfileHeaderUserImage userPhoto={user?.avatar} />
                    <div className="flex justify-between mt-[50px]">
                        <Card className="w-[45%]">
                            <CardBody>
                                <p>Skills : {user?.skills || '-'}</p>
                                <p>Details : {user?.details || '-'}</p>
                                <p>Extra details : {user?.extra_details || '-'}</p>
                            </CardBody>
                        </Card>
                        <Card className="w-[45%]">
                            <CardBody>
                                <p>Profession : {user?.profession || '-'}</p>
                                <p>Contacts : {user?.email || '-'}</p>
                                <p>
                                    Created account date :{' '}
                                    {new DateHelper(user?.dateCreated).formatToPointDDMMYYYY() ||
                                        '-'}
                                </p>
                            </CardBody>
                        </Card>
                    </div>
                </>
            )}
        </div>
    );
};
