'use client';
import { Link } from '@/shared/lib/chakraClient';
import { Post } from '@/app/blog/page';
import { Spinner } from '@chakra-ui/react';
import useSWR from 'swr';
import { fetcher } from '@/shared/lib/fetcher';

const Posts = () => {
    // const { posts, isLoading, getAllPosts } = usePosts();
    const { data: posts, isLoading } = useSWR<Post[]>(
        'https://jsonplaceholder.typicode.com/posts',
        fetcher,
        { isPaused: () => false },
    );
    console.log('posts:', posts);

    // useEffect(() => {
    //     if (!posts.length) {
    //         getAllPosts();
    //     }
    // }, []);

    if (isLoading) {
        return (
            <h2>
                <Spinner size={'xl'} />
            </h2>
        );
    }

    return (
        <ul>
            {(posts as Post[])?.map((post) => {
                return (
                    <li key={post.id}>
                        <Link href={`/blog/${post.id}`}>{post.title}</Link>
                    </li>
                );
            })}
        </ul>
    );
};

export default Posts;
