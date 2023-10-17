import useSWR from 'swr';
import { UsersOnServerResponseT } from '@/entities/User';
import http from '@/shared/lib/api/http';

export const usePosts = () => {
    return useSWR<UsersOnServerResponseT>(`posts`, async () => {
        return await http.get('posts');
    });
};
