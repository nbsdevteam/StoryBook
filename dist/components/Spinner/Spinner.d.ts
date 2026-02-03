import React from 'react';
/**
 * Spinner Props Interface
 */
export interface SpinnerProps {
    /**
     * Spinner size
     * @default 'md'
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * Spinner color variant
     * @default 'primary'
     */
    variant?: 'primary' | 'secondary' | 'muted';
    /**
     * Accessible label for screen readers
     * @default 'Loading'
     */
    label?: string;
    /**
     * Additional CSS classes
     */
    className?: string;
}
/**
 * Spinner Description
 *
 * This is a template component that demonstrates the structure
 * for creating reusable components in the library.
 */
export declare const Spinner: React.FC<SpinnerProps>;
export default Spinner;
//# sourceMappingURL=Spinner.d.ts.map