import Skeleton from 'react-loading-skeleton';
import { Card } from '@nextui-org/card';

export const ProductListLoader = () => {
    const mockArray = new Array(8).fill(0);
    return (
        <div className="flex flex-wrap justify-center gap-[30px]">
            {mockArray.map((_, index) => (
                <Card className="w-[400px] p-[20px]" key={index}>
                    <Skeleton height={'26px'} />
                    <div className="m-auto my-[10px]">
                        <Skeleton
                            className="text-center m-auto flex items-center justify-center"
                            height={'200px'}
                            width={'200px'}
                        />
                    </div>
                    <Skeleton
                        count={3}
                        className="text-center m-auto flex items-center justify-center"
                    />
                    <Skeleton width={'200px'} />
                    <div className="flex justify-between items-center font-bold text-h1">
                        <Skeleton width={'100px'} />
                        <div>
                            <div className="flex items-center gap-[5px]">
                                <Skeleton width={60} />
                            </div>
                            <Skeleton height={12} />
                        </div>
                    </div>
                    <Skeleton height={'38px'} borderRadius={'8px'} width={'100%'} />
                </Card>
            ))}
        </div>
    );
};
