'use client';
import { UserListItem } from '../UserListItem/UserListItem';
import { Pagination } from '@nextui-org/react';
import usePagination from '@/shared/lib/hooks/usePagination/usePagination';
import { UsersOnServerResponseT } from '../../model/types/User';
import { useUsers } from '../../model/api/useUsers/useUser';

interface UserListPropsT {
    defaultUsersResponse: UsersOnServerResponseT;
}

export const UsersList = (props: UserListPropsT) => {
    const { defaultUsersResponse } = props;

    const { skip, currentPageFromUrl, totalPagesCount, onPaginationChange } = usePagination({
        limit: defaultUsersResponse?.pagination.limit || 10,
        total: defaultUsersResponse?.pagination.total || 10,
    });

    const { data: usersResponse } = useUsers(skip, defaultUsersResponse);

    return (
        <>
            <div className="flex gap-[30px] justify-center flex-wrap">
                {usersResponse?.data?.map((user) => {
                    return <UserListItem key={user._id} user={user} />;
                })}
            </div>
            <Pagination
                showControls
                onChange={onPaginationChange}
                total={totalPagesCount}
                initialPage={currentPageFromUrl}
                size="md"
                className="mt-[50px] flex items-center justify-center"
            />
        </>
    );
};
