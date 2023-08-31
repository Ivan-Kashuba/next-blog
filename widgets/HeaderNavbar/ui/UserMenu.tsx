'use client';
import { Avatar, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';

export const UserMenu = () => {
    return (
        <div className="ml-auto">
            <Menu>
                <MenuButton as={Avatar} className="cursor-pointer" />
                <MenuList>
                    <MenuItem>Download</MenuItem>
                    <MenuItem onClick={() => alert('Kagebunshin')}>Create a Copy</MenuItem>
                </MenuList>
            </Menu>
        </div>
    );
};
