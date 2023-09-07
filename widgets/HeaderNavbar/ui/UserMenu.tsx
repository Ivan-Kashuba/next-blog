'use client';
import {
    Avatar,
    Button,
    Flex,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    useColorMode,
} from '@chakra-ui/react';
import Link from 'next/link';
import { STORAGE_KEY } from '@/shared/lib/api/http';
import { useCallback } from 'react';
import { removeLocalStorageKey } from '@/shared/lib/localStorage/removeLocalStorageKey';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/global/providers/auth/useAuth';

export const UserMenu = () => {
    const { isAuthorized, setAuthorized, isRendered } = useAuth();

    const { toggleColorMode } = useColorMode();
    const router = useRouter();

    const onLogout = useCallback(() => {
        removeLocalStorageKey(STORAGE_KEY);
        setAuthorized(false);
        router.replace('/login');
    }, [router, setAuthorized]);

    return (
        <div className="ml-auto">
            {isRendered && (
                <>
                    {isAuthorized ? (
                        <Menu>
                            <MenuButton as={Avatar} className="cursor-pointer" />
                            <MenuList>
                                <MenuItem onClick={toggleColorMode}>Change color theme</MenuItem>
                                <MenuItem onClick={onLogout}>Logout</MenuItem>
                            </MenuList>
                        </Menu>
                    ) : (
                        <Flex gap={30}>
                            <Link href={'/login'}>
                                <Button variant="outline" colorScheme={'purple'}>
                                    Login
                                </Button>
                            </Link>
                            <Link href={'register'}>
                                <Button colorScheme={'pink'}>Register</Button>
                            </Link>
                        </Flex>
                    )}
                </>
            )}
        </div>
    );
};
