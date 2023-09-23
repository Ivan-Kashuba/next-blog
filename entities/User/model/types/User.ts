import { PaginationResult } from '@/app/global/types/pagination';

export interface User {
    _id: string;
    email: string;
    name?: string;
    avatar?: string;
    extra_details?: string;
    skills?: string;
    profession?: string;
    details?: string;
    dateCreated?: string;
}

export type ProfileChangeType = Pick<
    User,
    'name' | 'extra_details' | 'skills' | 'profession' | 'details'
>;

export interface UsersOnServerResponseT extends PaginationResult {
    data: User[];
}
