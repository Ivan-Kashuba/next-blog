'use client';
import { ProductList } from '@/entities/Product';
import { ChangeElementsSize } from '@/features/changeNumberOfElementsOnPage';
import { useState } from 'react';

export default function ShopPage() {
    const [pageLimit, setLimitPage] = useState(6);

    return (
        <div>
            <ChangeElementsSize setLimitNumber={setLimitPage} limitNumber={pageLimit} />
            <ProductList pageSize={pageLimit} />
        </div>
    );
}
