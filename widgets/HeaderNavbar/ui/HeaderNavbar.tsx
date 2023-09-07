import { Navigation } from '../ui/Navigation';
import { UserMenu } from '../ui/UserMenu';

const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
];

export const HeaderNavbar = () => {
    return (
        <header className="flex h-[60px] gap-[30px] items-center border-b border-red-600 px-[100px]">
            <Navigation navigationItems={navItems} />
            <UserMenu />
        </header>
    );
};
