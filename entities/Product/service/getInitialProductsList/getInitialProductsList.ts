export const getInitialProductsList = async () => {
    const response = await fetch(`https://fakestoreapi.com/products?limit=${6}`);

    if (!response.ok) {
        throw new Error('Cant load products!');
    }

    return response.json();
};
