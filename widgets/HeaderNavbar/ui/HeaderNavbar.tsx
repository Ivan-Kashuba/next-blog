import { Navigation } from '../ui/Navigation';
import { UserMenu } from '../ui/UserMenu';
import { getServerSession } from 'next-auth';
import { authNextConfig } from '@/app/global/config/auth/auth';

const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
    { label: 'Users', href: '/users' },
    { label: 'Popular items', href: '/shop' },
];

export const HeaderNavbar = async () => {
    const session = await getServerSession(authNextConfig);
    const isAuthorizedOnServer = !!session?.user;

    return (
        <header className="flex h-[60px] gap-[30px] items-center border-b border-b-blue-200 px-[100px]">
            <Navigation navigationItems={navItems} />
            <UserMenu user={session?.user} isAuthorizedOnServer={isAuthorizedOnServer} />
        </header>
    );
};
