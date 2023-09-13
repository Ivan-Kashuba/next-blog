import { User } from '@/entities/User/model/types/User';

interface UserFromCredentialLogin extends User {
    token: string;
}

interface UserFromGoogleLogin {
    token: string;
    email?: string;
    name?: string;
    image?: string;
    picture?: string;
}

export type UserSession = UserFromCredentialLogin & UserFromGoogleLogin;

declare module 'next-auth' {
    interface Session {
        user: UserSession;
    }
}
