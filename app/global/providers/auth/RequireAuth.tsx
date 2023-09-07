import { useRouter } from 'next/navigation';

interface RequireAuthProps {
    children: Node;
}

export const RequireAuth = (props: RequireAuthProps) => {
    const { children } = props;
    const isAuthored = false;
    const router = useRouter();

    if (!isAuthored) {
        router.replace('/login');
    }

    return children;
};
