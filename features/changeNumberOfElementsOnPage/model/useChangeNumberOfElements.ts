import { devtools } from 'zustand/middleware';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface ChangeNUmberI {
    limitNumber: number;
    setLimitNumber: (payload: number) => void;
}

export const useChangeNumberOfElements = create<ChangeNUmberI>()(
    devtools(
        immer((set) => ({
            limitNumber: 6,
            setLimitNumber: (payload: number) => {
                set((state) => void (state.limitNumber = payload));
            },
        })),
    ),
);
