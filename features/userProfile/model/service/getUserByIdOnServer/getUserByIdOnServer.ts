export const getUserByIdOnServer = async (profileId: string) => {
    const response = await fetch(`http://test-blog-api.ficuslife.com/api/v1/users/${profileId}`);

    if (!response.ok) {
        throw new Error('Cant load new pots!');
    }

    return response.json();
};
