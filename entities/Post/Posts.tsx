'use client';
import { Post } from '@/app/blog/page';
import { Link } from '@chakra-ui/next-js';
import { fetcher } from '@/shared/lib/api/fetcher';
import useSWR from 'swr';

interface IPostProps {
    defaultPosts: Post[];
}

const Posts = ({ defaultPosts }: IPostProps) => {
    const { data: posts, isLoading } = useSWR<Post[]>(
        'https://jsonplaceholder.typicode.com/posts',
        fetcher,
        {
            fallbackData: defaultPosts,
        },
    );

    return (
        <ul>
            {posts?.map((post) => {
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
