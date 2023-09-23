import React from 'react';
import { User } from '../../model/types/User';
import {
    Avatar,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    Link,
    Tooltip,
} from '@nextui-org/react';

interface UserListItemPropT {
    user: User;
}
export const UserListItem = (props: UserListItemPropT) => {
    const { user } = props;

    return (
        <Card className="w-[300px] max-w-[300px]">
            <CardHeader className="flex gap-3">
                <Avatar
                    src={
                        user?.avatar
                            ? `http://test-blog-api.ficuslife.com${user?.avatar}`
                            : undefined
                    }
                />

                <div className="flex flex-col">
                    <p className="text-md">{user.name || 'No named user'}</p>
                    <Tooltip
                        content={user.email}
                        className={user.email.length < 28 ? 'hidden' : ''}
                    >
                        <p className="text-small text-default-500 text-ellipsis overflow-hidden w-[200px] whitespace-nowrap">
                            {user.email}
                        </p>
                    </Tooltip>
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                <p className="break-words">
                    <span className="font-bold">Profession :</span> {user?.profession || '-'}
                </p>
                <p className="break-words">
                    <span className="font-bold">Skills :</span> {user?.skills || '-'}
                </p>
                <p className="break-words">
                    <span className="font-bold">Profession :</span> {user?.profession || '-'}
                </p>
            </CardBody>
            <Divider />
            <CardFooter>
                <Link href={`/users/${user._id}`}>See full profile</Link>
            </CardFooter>
        </Card>
    );
};
