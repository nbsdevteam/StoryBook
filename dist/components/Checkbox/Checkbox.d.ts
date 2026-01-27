import React from 'react';
/**
 * Checkbox Component Props
 */
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
    /**
     * Checkbox label
     */
    label?: React.ReactNode;
    /**
     * Helper text below checkbox
     */
    helperText?: string;
    /**
     * Error message to display
     */
    error?: string;
    /**
     * Whether checkbox is required
     * @default false
     */
    required?: boolean;
    /**
     * Checkbox size
     * @default 'medium'
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * Whether checkbox is in invalid state
     */
    invalid?: boolean;
    /**
     * Additional CSS classes for wrapper
     */
    wrapperClassName?: string;
    /**
     * Whether to show label before checkbox
     * @default false
     */
    labelBefore?: boolean;
}
/**
 * Checkbox Component
 *
 * A flexible checkbox component with support for labels,
 * helper text, error states, and multiple sizes.
 */
export declare const Checkbox: React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLInputElement>>;
export default Checkbox;
//# sourceMappingURL=Checkbox.d.ts.map