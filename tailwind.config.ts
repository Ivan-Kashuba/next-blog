import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './entities/**/*.{js,ts,jsx,tsx,mdx}',
        './shared/**/*.{js,ts,jsx,tsx,mdx}',
        './features/**/*.{js,ts,jsx,tsx,mdx}',
        './widgets/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        fontSize: {
            h3: ['16px', '21px'],
            h2: ['18px', '26.3px'],
            h1: ['24px', '31.2px'],
            small: ['11px', '15,4'],
        },
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
    },
    darkMode: 'class',
    plugins: [nextui()],
};
export default config;
