import React from 'react';
export interface AlertProps {
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
    children?: React.ReactNode;
    title?: React.ReactNode;
    dismissible?: boolean;
    onDismiss?: () => void;
    showIcon?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
export declare const Alert: React.FC<AlertProps>;
export default Alert;
//# sourceMappingURL=Alert.d.ts.map