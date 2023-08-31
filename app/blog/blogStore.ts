import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { Post } from '@/app/blog/page';

interface UsePostsI {
    posts: Post[] | string;
    getAllPosts: () => void;
    isLoading: boolean;
}

async function getData() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        next: {
            revalidate: 60,
        },
    });

    if (!response.ok) {
        throw new Error('Cant load new pots!');
    }

    return response.json();
}

export const usePosts = create<UsePostsI>()(
    devtools(
        immer((set) => ({
            posts: [],
            isLoading: false,
            getAllPosts: async () => {
                set((state) => void (state.isLoading = true));
                const newPosts: Post[] = await getData();
                set({ posts: newPosts });
                set((state) => void (state.isLoading = false));
            },
        })),
    ),
);
