import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

interface UsePaginationPropsT {
    limit?: number;
    total?: number;
}

export default function usePagination(props: UsePaginationPropsT) {
    const { limit, total } = props;
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentPageFromUrl = Number(searchParams.get('page')) || 1;

    const onPaginationChange = useCallback(
        (page: number) => {
            router.push(`${pathname}?page=${page}`, { scroll: false });
        },
        [pathname, router],
    );

    const skip = useMemo(() => {
        return (limit || 10) * (currentPageFromUrl - 1);
    }, [currentPageFromUrl, limit]);

    const totalPagesCount = useMemo(() => {
        return Math.ceil((total || 10) / (limit || 10));
    }, [limit, total]);

    return { onPaginationChange, totalPagesCount, currentPageFromUrl, skip };
}
