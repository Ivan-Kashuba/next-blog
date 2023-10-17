import http from '@/shared/lib/api/http';

export const fetcher = async (url: string) => {
    return await http.get(url);
};
