import { ProductList } from '@/entities/Product';
import { ChangeElementsSize } from '@/features/changeNumberOfElementsOnPage';
import { getInitialProductsList } from '@/entities/Product/service/getInitialProductsList/getInitialProductsList';

export default async function ShopPage() {
    const initialProducts = await getInitialProductsList();

    return (
        <>
            <ChangeElementsSize />
            <ProductList initialProducts={initialProducts} />
        </>
    );
}
