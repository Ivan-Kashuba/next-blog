'use client';
import Error from 'next/error';

interface BlogError {
    error: Error & { message: string };
}

const BlogError = ({ error }: BlogError) => {
    return (
        <div>
            <div className="text-center text-red-500 text-3xl">Error, {error.message}</div>
        </div>
    );
};

export default BlogError;
