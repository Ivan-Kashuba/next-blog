import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { Theme } from '@/shared/types/theme';

interface ThemeI {
    theme?: Theme;
    setTheme: (theme: Theme) => void;
}

export const useTheme = create<ThemeI>()(
    devtools(
        immer((set) => ({
            theme: undefined,
            setTheme: (payload: Theme) => {
                set((state) => void (state.theme = payload));
            },
        })),
    ),
);
