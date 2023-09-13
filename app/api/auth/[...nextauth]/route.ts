import NextAuth from 'next-auth';
import { authNextConfig } from '@/app/global/config/auth/auth';

const handler = NextAuth(authNextConfig);

export { handler as GET, handler as POST };
