export const fetcher = async (url: string, init?: RequestInit) => {
    return await fetch(url, {
        ...init,
        headers: {
            Authorization: '12314214',
            'Content-Type': 'application/json',
            ...init?.headers,
        },
    }).then((res) => res.json());
};
