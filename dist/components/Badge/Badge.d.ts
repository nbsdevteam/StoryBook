import React from 'react';
/**
 * Badge Component Props
 */
export interface BadgeProps {
    /**
     * Badge variant/color
     * @default 'primary'
     */
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
    /**
     * Badge content
     */
    children?: React.ReactNode;
    /**
     * Whether badge should be rounded/pill shaped
     * @default false
     */
    rounded?: boolean;
    /**
     * Whether badge should have outline style
     * @default false
     */
    outline?: boolean;
    /**
     * Additional CSS classes
     */
    className?: string;
    /**
     * Inline styles
     */
    style?: React.CSSProperties;
}
/**
 * Badge Component
 *
 * A small status indicator component for displaying labels, counts, or tags.
 */
export declare const Badge: React.FC<BadgeProps>;
export default Badge;
//# sourceMappingURL=Badge.d.ts.map