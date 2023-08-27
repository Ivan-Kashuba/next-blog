import React from 'react';
import { Link } from '@/util/chakraClient';

export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
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

const BlogPage = async () => {
    const posts: Post[] = await getData();

    return (
        <div className="flex gap-[10px]">
            <div>Read our blog 7:</div>
            <Link href="/blog/7">Read</Link>
            <ul className="mt-[30px]">
                {posts.map((post) => {
                    return (
                        <li key={post.id}>
                            <Link href={`/blog/${post.id}`}>{post.title}</Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default BlogPage;
