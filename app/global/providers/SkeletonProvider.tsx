import { SkeletonTheme } from 'react-loading-skeleton';
import { ReactNode } from 'react';
import { Theme } from '@/shared/types/theme';

interface SkeletonProviderI {
    children: ReactNode;
    theme: Theme;
}
export const SkeletonProvider = ({ children, theme }: SkeletonProviderI) => {
    const baseColor = theme === Theme.DARK ? 'black' : '';
    const highlightColor = theme === Theme.DARK ? '#18181b' : '';

    return (
        <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
            {children}
        </SkeletonTheme>
    );
};
