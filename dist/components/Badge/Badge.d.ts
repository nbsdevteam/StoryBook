import React from 'react';
export interface BadgeProps {
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
    children?: React.ReactNode;
    rounded?: boolean;
    outline?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
export declare const Badge: React.FC<BadgeProps>;
export default Badge;
//# sourceMappingURL=Badge.d.ts.map