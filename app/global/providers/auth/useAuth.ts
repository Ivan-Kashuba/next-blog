import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface UsePostsI {
    isAuthorized: boolean;
    isRendered: boolean;
    setAuthorized: (payload: boolean) => void;
    setRenderedTrue: () => void;
}

export const useAuth = create<UsePostsI>()(
    devtools(
        immer((set) => ({
            isAuthorized: false,
            isRendered: false,
            setAuthorized: (payload: boolean) => {
                set((state) => void (state.isAuthorized = payload));
            },
            setRenderedTrue: () => {
                set((state) => void (state.isRendered = true));
            },
        })),
    ),
);
