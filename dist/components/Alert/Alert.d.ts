import React from 'react';
/**
 * Alert Component Props
 */
export interface AlertProps {
    /**
     * Alert variant/type
     * @default 'info'
     */
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
    /**
     * Alert content
     */
    children?: React.ReactNode;
    /**
     * Alert title/heading
     */
    title?: React.ReactNode;
    /**
     * Whether alert can be dismissed
     * @default false
     */
    dismissible?: boolean;
    /**
     * Callback when alert is dismissed
     */
    onDismiss?: () => void;
    /**
     * Whether alert should have an icon
     * @default true
     */
    showIcon?: boolean;
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
 * Alert Component
 *
 * A component for displaying important messages to users.
 * Supports multiple variants and can be dismissible.
 */
export declare const Alert: React.FC<AlertProps>;
export default Alert;
//# sourceMappingURL=Alert.d.ts.map