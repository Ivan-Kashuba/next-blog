import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const FORBIDDEN_FOR_AUTHENTICATED_USERS = ['/login', '/register'];
const AUTHENTICATED_ONLY_PATHS = ['/profile'];

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });
    const isAuthenticated = !!token;

    if (
        FORBIDDEN_FOR_AUTHENTICATED_USERS.some((forbiddenUrl) =>
            request.nextUrl.pathname.startsWith(forbiddenUrl),
        ) &&
        isAuthenticated
    ) {
        return NextResponse.redirect(new URL('/profile', request.url));
    }

    if (
        AUTHENTICATED_ONLY_PATHS.some((authOnlyUrl) =>
            request.nextUrl.pathname.startsWith(authOnlyUrl),
        ) &&
        !isAuthenticated
    ) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
}
