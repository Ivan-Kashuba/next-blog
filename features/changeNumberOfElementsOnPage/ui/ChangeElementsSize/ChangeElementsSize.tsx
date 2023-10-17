import { Select, SelectItem } from '@nextui-org/react';

interface ChangeElementsSizePropsI {
    limitNumber: number;
    setLimitNumber: (num: number) => void;
}

const selectOptions = [6, 10, 15, 20];

export const ChangeElementsSize = ({
    limitNumber = 6,
    setLimitNumber,
}: ChangeElementsSizePropsI) => {
    const onSelectChange = (e: any) => {
        setLimitNumber(e.target.value);
    };

    return (
        <div className="flex items-center justify-center mb-[30px]">
            <div>Elements on 1 page:</div>
            <h1 className="font-bold text-h1 ml-[10px]">{limitNumber}</h1>
            <Select
                size="md"
                variant="underlined"
                className="w-[100px] ml-[20px] mr-[5px]"
                onChange={onSelectChange}
                color="primary"
            >
                {selectOptions.map((option) => {
                    return (
                        <SelectItem key={option} value={option}>
                            {option}
                        </SelectItem>
                    );
                })}
            </Select>
        </div>
    );
};
