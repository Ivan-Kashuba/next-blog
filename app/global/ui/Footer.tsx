'use client';
import { Link } from '@nextui-org/react';

export const Footer = () => {
    return (
        <div className="flex justify-center items-center h-[60px] border-t border-b-blue-200 gap-[30px]">
            <Link href="/contact">Contact us</Link>
        </div>
    );
};
