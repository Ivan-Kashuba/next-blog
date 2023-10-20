'use client';
import { ProductItem } from '../ProductItem/ProductItem';
import { ProductListLoader } from '../ProductListLoader/ProductListLoader';
import { useProductLists } from '../../api/useProductLists/useProductLists';
import { useChangeNumberOfElements } from '@/features/changeNumberOfElementsOnPage';
import { ProductI } from '../../model/types/product';
import { useInitialLoading } from '@/shared/lib/hooks/useInitialLoading/useInitialLoading';

interface ProductListPropsI {
    initialProducts: ProductI[];
}

export const ProductList = ({ initialProducts }: ProductListPropsI) => {
    const { limitNumber } = useChangeNumberOfElements();
    const { data, isLoading } = useProductLists(limitNumber, initialProducts);
    const { isFirstLoadingDone } = useInitialLoading(isLoading);

    if (isLoading && isFirstLoadingDone) {
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
