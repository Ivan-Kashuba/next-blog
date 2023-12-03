import { useCallback, useMemo, useState } from 'react';

export function useFocused() {
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const onFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    const onBlur = useCallback((e: any) => {
        if (!e.relatedTarget || !e.relatedTarget.closest('.clickable-content')) {
            setIsFocused(false);
        }
    }, []);

    const focusEventHandlers = useMemo(
        () => ({
            onFocus,
            onBlur,
        }),
        [onBlur, onFocus],
    );

    return { isFocused, focusEventHandlers };
}
