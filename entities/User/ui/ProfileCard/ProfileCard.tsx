'use client';
import React from 'react';
import { UserSession } from '@/app/api/auth/[...nextauth]/next-auth';
import { Image } from '@nextui-org/react';
import { Card, CardBody } from '@nextui-org/card';
import DateHelper from '@/shared/lib/dateHelper/dateHelper';
import { ProfileHeaderUserImage } from '@/entities/User/ui/ProfileHeaderUserImage/ProfileHeaderUserImage';
import { useSession } from 'next-auth/react';

interface ProfileCardPropsI {
    serverUser?: UserSession;
}

export const ProfileCard = (props: ProfileCardPropsI) => {
    const { serverUser } = props;
    const isGoogleUser = !serverUser?.token;
    const { data: session } = useSession();

    const clientUser = session?.user;

    return (
        <div>
            <div className="mt-[20px] text-3xl text-center">
                {clientUser?.name || serverUser?.name}
            </div>
            {isGoogleUser ? (
                <div className="flex gap-[30px] items-center">
                    <Image
                        className="rounded-[50%]"
                        src={serverUser?.image || undefined}
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
                    <ProfileHeaderUserImage userPhoto={clientUser?.avatar || serverUser?.avatar} />
                    <div className="flex justify-between mt-[50px]">
                        <Card className="w-[45%]">
                            <CardBody>
                                <p>
                                    <span className="font-bold">Skills</span> :{' '}
                                    {clientUser?.skills || serverUser?.skills || '-'}
                                </p>
                                <p>
                                    <span className="font-bold">Details</span> :{' '}
                                    {clientUser?.details || serverUser?.details || '-'}
                                </p>
                                <p>
                                    <span className="font-bold">Extra details</span> :{' '}
                                    {clientUser?.extra_details || serverUser?.extra_details || '-'}
                                </p>
                            </CardBody>
                        </Card>
                        <Card className="w-[45%]">
                            <CardBody>
                                <p>
                                    <span className="font-bold">Profession</span> :{' '}
                                    {clientUser?.profession || serverUser?.profession || '-'}
                                </p>
                                <p>
                                    <span className="font-bold">Contacts</span> :{' '}
                                    {clientUser?.email || serverUser?.email || '-'}
                                </p>
                                <p>
                                    <span className="font-bold">Created account date</span> :{' '}
                                    {new DateHelper(
                                        serverUser?.dateCreated,
                                    ).formatToPointDDMMYYYY() || '-'}
                                </p>
                            </CardBody>
                        </Card>
                    </div>
                </>
            )}
        </div>
    );
};
