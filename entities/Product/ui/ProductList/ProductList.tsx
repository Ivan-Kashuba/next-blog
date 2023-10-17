'use client';
import { ProductItem } from '../ProductItem/ProductItem';
import { ProductListLoader } from '../ProductListLoader/ProductListLoader';
import { useProductLists } from '../../api/useProductLists/useProductLists';

interface ProductListPropsI {
    pageSize: number;
}

export const ProductList = ({ pageSize }: ProductListPropsI) => {
    const { data, isLoading } = useProductLists(pageSize);

    if (isLoading) {
        return <ProductListLoader />;
    }

    return (
        <>
            <div className="flex flex-wrap justify-center gap-[30px]">
                {data?.map((productItem) => {
                    return <ProductItem product={productItem} key={productItem.id} />;
                })}
            </div>
        </>
    );
};
