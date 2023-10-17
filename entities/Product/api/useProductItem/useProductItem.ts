import axios from 'axios';
import useSWR from 'swr';
import { ProductI } from '../../model/types/product';

export const useProductItem = (productId: number) => {
    return useSWR<ProductI, Error>([`productItem`, productId], async () => {
        return await axios
            .get(`https://fakestoreapi.com/products/${productId}`)
            .then((res) => res.data);
    });
};
