import { useEffect, useState } from 'react';

export function useInitialLoading(isLoading: boolean) {
    const [isFirstLoadingDone, setIsFirstLoadingDone] = useState(false);

    useEffect(() => {
        if (!isFirstLoadingDone && !isLoading) {
            setIsFirstLoadingDone(true);
        }
    }, [isFirstLoadingDone, isLoading]);

    return { isFirstLoadingDone };
}
