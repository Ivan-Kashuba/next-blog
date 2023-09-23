import useSWR from 'swr';
import { UsersOnServerResponseT } from '@/entities/User';
import { fetcher } from '@/shared/lib/api/fetcher';

export const useUsers = (skip: number, defaultUsersResponse: UsersOnServerResponseT) => {
    return useSWR<UsersOnServerResponseT>(
        `http://test-blog-api.ficuslife.com/api/v1/users?skip=${skip}`,
        fetcher,
        {
            fallbackData: defaultUsersResponse,
        },
    );
};
