import React from 'react';
/**
 * Switch Component Props
 */
export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
    /**
     * Switch label
     */
    label?: React.ReactNode;
    /**
     * Helper text below switch
     */
    helperText?: string;
    /**
     * Error message to display
     */
    error?: string;
    /**
     * Whether switch is required
     * @default false
     */
    required?: boolean;
    /**
     * Switch size
     * @default 'medium'
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * Switch variant/color
     * @default 'primary'
     */
    variant?: 'primary' | 'success' | 'danger' | 'warning' | 'info';
    /**
     * Whether switch is in invalid state
     */
    invalid?: boolean;
    /**
     * Additional CSS classes for wrapper
     */
    wrapperClassName?: string;
    /**
     * Whether to show label before switch
     * @default false
     */
    labelBefore?: boolean;
}
/**
 * Switch Component
 *
 * A toggle switch component with support for labels, helper text,
 * error states, multiple sizes, and color variants.
 */
export declare const Switch: React.ForwardRefExoticComponent<SwitchProps & React.RefAttributes<HTMLInputElement>>;
export default Switch;
//# sourceMappingURL=Switch.d.ts.map