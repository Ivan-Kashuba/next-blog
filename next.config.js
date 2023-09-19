/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'dfstudio-d420.kxcdn.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: 'test-blog-api.ficuslife.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

module.exports = nextConfig;
