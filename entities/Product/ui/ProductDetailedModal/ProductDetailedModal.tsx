import StarIcon from '@/shared/assets/icons/star-icon.svg';
import { Image, Modal, ModalContent, Spinner } from '@nextui-org/react';
import { useProductItem } from '../../api/useProductItem/useProductItem';
import { Disclosure } from '@/shared/types/disclosure';

interface ProductDetailedModalI {
    productId: number;
    disclosure: Disclosure;
}

export const ProductDetailedModal = ({ productId, disclosure }: ProductDetailedModalI) => {
    const { data, error, isLoading } = useProductItem(productId);
    const { isOpen, onClose, onOpenChange } = disclosure;

    if (isLoading) {
        return (
            <Modal isOpen={isOpen} onClose={onClose}>
                <h1 className="w-[640px] h-[540px] flex items-center justify-center text-red-600 font-bold">
                    <Spinner size="lg" />
                </h1>
            </Modal>
        );
    }

    if (error) {
        return (
            <Modal isOpen={isOpen} onClose={onClose}>
                <h1 className="w-[640px] h-[540px] flex items-center justify-center text-red-600 font-bold">
                    Can not upload data about this product. Try again later.
                </h1>
            </Modal>
        );
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose}>
            <ModalContent className="p-[30px]">
                <h2 className="text-h2 font-bold text-center">{data?.title}</h2>
                <div className="text-center mb-[30px]">({data?.category})</div>
                <img
                    src={data?.image}
                    className="w-[200px] h-[200px] mb-[30px] m-auto"
                    alt="Product Image"
                />
                <p className="text-h3 mb-[50px]">{data?.description}</p>
                <div className="flex justify-between items-center font-bold text-h1">
                    <h1>{data?.price} $</h1>
                    <div>
                        <div className="flex items-center gap-[5px]">
                            <div>{data?.rating.rate}</div>
                            <Image className="w-[30px] h-[30px]" src={StarIcon.src} alt="Stars" />
                        </div>
                        <p className="text-small">
                            <span>{data?.rating.count}</span> reviews
                        </p>
                    </div>
                </div>
            </ModalContent>
        </Modal>
    );
};
