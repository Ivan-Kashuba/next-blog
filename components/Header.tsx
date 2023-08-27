import React from 'react';
import { Link } from '@/util/chakraClient';

const Header = () => {
    return (
        <div className="flex justify-center items-center h-[60px] border-b border-red-600 gap-[30px]">
            <Link href="/">Home</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/about">About </Link>
        </div>
    );
};

export default Header;
