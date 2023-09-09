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
import { STORAGE_KEY } from '@/shared/lib/api/http';
import { useCallback } from 'react';
import { removeLocalStorageKey } from '@/shared/lib/localStorage/removeLocalStorageKey';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/global/providers/auth/model/store/useAuth';

enum Theme {
    DARK = 'dark',
    LIGHT = 'light',
}

export const UserMenu = () => {
    const { isAuthorized, setAuthorized, isRendered } = useAuth();

    const router = useRouter();

    const onLogout = useCallback(() => {
        removeLocalStorageKey(STORAGE_KEY);
        setAuthorized(false);
        router.replace('/login');
    }, [router, setAuthorized]);

    const toggleColorMode = useCallback(() => {
        const root = document.getElementsByTagName('html')[0];

        root.classList.toggle(Theme.DARK);

        if (root.classList.contains(Theme.DARK)) {
            document.cookie = `theme=${Theme.DARK}`;
        } else {
            document.cookie = `theme=${Theme.LIGHT}`;
        }
    }, []);

    return (
        <div className="ml-auto">
            {isRendered && (
                <>
                    {isAuthorized ? (
                        <Dropdown>
                            <DropdownTrigger>
                                <Avatar className="cursor-pointer" />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Static Actions">
                                <DropdownItem onClick={toggleColorMode} key="theme color">
                                    Change color theme
                                </DropdownItem>
                                <DropdownItem
                                    onClick={onLogout}
                                    key="delete"
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
            )}
        </div>
    );
};
