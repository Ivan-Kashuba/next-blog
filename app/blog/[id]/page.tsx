import React from 'react';
import { Post } from '@/app/blog/page';

interface PostProps {
    params: {
        id: string;
    };
}

export async function generateMetadata({ params: { id } }: PostProps) {
    const post: Post = await getData(id);
    return { title: `${post.title}` };
}

async function getData(id: string) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        next: {
            revalidate: 3,
        },
    });
    return response.json();
}

const Post = async (props: PostProps) => {
    const { params } = props;
    const id = params.id;

    const post: Post = await getData(id);

    return (
        <div>
            <h1 className="text-3xl">Post #{post.id}</h1>
            <h1 className="text-2xl mt-[20px]">{post.title}</h1>
            <div className="text-xl mt-[20px]">{post.body}</div>
        </div>
    );
};

export default Post;
