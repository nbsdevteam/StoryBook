import React from 'react';
/**
 * Spinner Props Interface
 */
export interface SpinnerProps {
    /**
     * Brief description of the variant prop
     */
    variant?: 'primary' | 'secondary';
    /**
     * Spinner children
     */
    children?: React.ReactNode;
    /**
     * Additional CSS classes
     */
    className?: string;
    /**
     * Click handler
     */
    onClick?: () => void;
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