import { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { User } from '@/entities/User/model/types/User';

export const authNextConfig: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        }),
        Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: 'email', type: 'email', required: true },
                password: { label: 'password', type: 'password', required: true },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const response = await fetch('http://test-blog-api.ficuslife.com/api/v1/auth', {
                    method: 'POST',
                    body: JSON.stringify({
                        email: credentials.email,
                        password: credentials.password,
                    }),
                    headers: { 'Content-Type': 'application/json' },
                });

                const tokenResponse = await response.json();

                const userResponse: Response = await fetch(
                    'http://test-blog-api.ficuslife.com/api/v1/auth/user',
                    {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${tokenResponse.token}`,
                            'Content-Type': 'application/json',
                        },
                    },
                );

                const user: User = await userResponse.json();

                if (response.ok && userResponse.ok) {
                    return { ...tokenResponse, ...user };
                }

                if (response.ok && !userResponse.ok) {
                    return { ...tokenResponse, email: credentials.email };
                }

                return null;
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token, user }) {
            session.user = token as any;
            return session;
        },
    },
    pages: {
        signIn: '/login',
    },
};
