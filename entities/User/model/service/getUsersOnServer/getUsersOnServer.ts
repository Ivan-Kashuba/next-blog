export async function getUsersOnServer(page?: number) {
    const response: Response = await fetch(
        `http://test-blog-api.ficuslife.com/api/v1/users?skip=${page ? (page - 1) * 10 : 0}`,
        {
            next: {
                revalidate: 60,
            },
        },
    );

    if (!response.ok) {
        throw new Error('Cant load users!');
    }

    return response.json();
}
