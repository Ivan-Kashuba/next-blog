export const fetcher = async (url: string, init?: RequestInit) => {
    return await fetch(url, {
        ...init,
        headers: {
            Authorization: 'Bearer 123',
            'Content-Type': 'application/json',
            ...init?.headers,
        },
    }).then((res) => res.json());
};
