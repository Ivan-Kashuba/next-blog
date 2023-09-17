'use client';
import {
    Avatar,
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from '@nextui-org/react';
import Link from 'next/link';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { UserSession } from '@/app/api/auth/[...nextauth]/next-auth';
import { Theme } from '@/shared/types/theme';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';

interface UserMenuPropsI {
    user?: UserSession;
    isAuthorizedOnServer?: boolean;
}

export const UserMenu = (props: UserMenuPropsI) => {
    const { isAuthorizedOnServer, user } = props;
    const { setTheme } = useTheme();

    const router = useRouter();
    const session = useSession();

    const isUserAuthorized = isAuthorizedOnServer || session?.data?.user;

    const onLogout = useCallback(() => {
        signOut({ callbackUrl: '/login' });
    }, [router]);

    const onNavigateToProfile = useCallback(() => {
        router.push('/profile');
    }, [router]);

    const toggleColorMode = useCallback(() => {
        const root = document.getElementsByTagName('html')[0];

        root.classList.toggle(Theme.DARK);

        if (root.classList.contains(Theme.DARK)) {
            document.cookie = `theme=${Theme.DARK}`;
            setTheme(Theme.DARK);
        } else {
            document.cookie = `theme=${Theme.LIGHT}`;
            setTheme(Theme.LIGHT);
        }
    }, []);

    return (
        <div className="ml-auto">
            <>
                {isUserAuthorized ? (
                    <Dropdown>
                        <DropdownTrigger>
                            <Avatar
                                src={user?.image || user?.avatar || ''}
                                className="cursor-pointer"
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions">
                            <DropdownItem key="profile" onClick={onNavigateToProfile}>
                                Profile
                            </DropdownItem>
                            <DropdownItem key="theme" onClick={toggleColorMode}>
                                Change color theme
                            </DropdownItem>
                            <DropdownItem
                                key="logout"
                                onClick={onLogout}
                                className="text-danger"
                                color="danger"
                            >
                                Logout
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                ) : (
                    <div className="flex gap-[30px]">
                        <Link href={'/login'}>
                            <Button color="secondary" variant="ghost">
                                Login
                            </Button>
                        </Link>
                        <Link href={'register'}>
                            <Button color="danger">Register</Button>
                        </Link>
                    </div>
                )}
            </>
        </div>
    );
};
