import Posts from '@/entities/Post/Posts';

export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

async function getData() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');

    if (!response.ok) {
        throw new Error('Cant load new pots!');
    }

    return response.json();
}

const BlogPage = async () => {
    const defaultPosts = await getData();

    return (
        <div className="flex gap-[10px]">
            <Posts defaultPosts={defaultPosts} />
        </div>
    );
};

export default BlogPage;
