import { useMemo, useState } from 'react';

export function useHover() {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const eventHandlers = useMemo(
        () => ({
            onMouseEnter() {
                setIsHovered(true);
            },
            onMouseLeave() {
                setIsHovered(false);
            },
        }),
        [],
    );

    return { isHovered, eventHandlers };
}
