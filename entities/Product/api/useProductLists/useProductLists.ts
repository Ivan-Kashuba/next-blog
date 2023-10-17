import axios from 'axios';
import useSWR from 'swr';
import { ProductI } from '../../model/types/product';

export const useProductLists = (limit: number) => {
    return useSWR<ProductI[], Error>([`products`, limit], async () => {
        return await axios
            .get(`https://fakestoreapi.com/products?limit=${limit}`)
            .then((res) => res.data);
    });
};
