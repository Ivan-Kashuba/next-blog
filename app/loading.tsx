'use client';
import React from 'react';
import { Spinner } from '@nextui-org/react';

export default function Loader() {
    return (
        <div className="w-[calc(100vw-60px)] h-[calc(100vh-180px)] flex items-center justify-center">
            <Spinner size="lg" />
        </div>
    );
}
