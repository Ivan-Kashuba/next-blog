import { useState } from 'react';
import { Button, Card, Image, useDisclosure } from '@nextui-org/react';
import { ProductDetailedModal } from '../ProductDetailedModal/ProductDetailedModal';
import { ProductI } from '@/entities/Product/model/types/product';
import StarIcon from '@/shared/assets/icons/star-icon.svg';

interface ProductItemI {
    product: ProductI;
}

export const ProductItem = ({ product }: ProductItemI) => {
    const { description, rating, title, price, category, image, id } = product;
    const disclosure = useDisclosure();
    const { isOpen, onOpen } = disclosure;

    return (
        <>
            <Card className="w-[400px] p-[20px]">
                <h2 className="text-h2 font-bold mb-[15px]">{title}</h2>
                <img src={image} className="w-[200px] h-[200px] m-auto" alt="Product Image" />
                <p className="mt-[15px] text-h3 display-box box-orient-vertical line-clamp-2 overflow-ellipsis">
                    {description}
                </p>
                <p className="mt-[20px] mb-[10px]">
                    Category: <span className="font-bold">{category}</span>
                </p>
                <div className="flex justify-between items-center font-bold text-h1">
                    <h1>{price} $</h1>
                    <div>
                        <div className="flex items-center gap-[5px]">
                            <div>{rating.rate}</div>
                            <Image className="w-[30px] h-[30px]" src={StarIcon.src} alt="Stars" />
                        </div>
                        <p className="text-small">
                            <span>{rating.count}</span> reviews
                        </p>
                    </div>
                </div>
                <Button
                    color="primary"
                    variant="ghost"
                    className="mt-[10px] font-bold"
                    onClick={onOpen}
                >
                    More information
                </Button>
            </Card>
            {isOpen && <ProductDetailedModal productId={id} disclosure={disclosure} />}
        </>
    );
};
