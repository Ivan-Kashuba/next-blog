import React from 'react';
import { getUsersOnServer, UsersList, UsersOnServerResponseT } from '@/entities/User';

interface UsersPagePropsT {
    searchParams?: { page: string | undefined };
}

export default async function UsersPage({ searchParams }: UsersPagePropsT) {
    const usersResponse: UsersOnServerResponseT = await getUsersOnServer(
        Number(searchParams?.page),
    );

    return (
        <div>
            <h1 className="mb-[40px] pl-[40px] text-h1 text-center font-bold">Users</h1>
            <UsersList defaultUsersResponse={usersResponse} />
        </div>
    );
}
