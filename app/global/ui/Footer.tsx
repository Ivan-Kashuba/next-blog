'use client';
import { Link } from '@chakra-ui/next-js';

export const Footer = () => {
    return (
        <div className="flex justify-center items-center h-[60px] border-t border-red-600 gap-[30px]">
            <Link href="/contact">Contact us</Link>
        </div>
    );
};
