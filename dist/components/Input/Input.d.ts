import React from 'react';
/**
 * Input Component Props
 */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /**
     * Input label
     */
    label?: string;
    /**
     * Helper text below input
     */
    helperText?: string;
    /**
     * Error message to display
     */
    error?: string;
    /**
     * Whether input is required
     * @default false
     */
    required?: boolean;
    /**
     * Input size
     * @default 'medium'
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * Input variant/style
     * @default 'default'
     */
    variant?: 'default' | 'light' | 'primary';
    /**
     * Whether input is in invalid state
     */
    invalid?: boolean;
    /**
     * Whether input is in valid state
     */
    valid?: boolean;
    /**
     * Icon to display on the left side
     */
    leftIcon?: React.ReactNode;
    /**
     * Icon to display on the right side
     */
    rightIcon?: React.ReactNode;
    /**
     * Additional CSS classes for wrapper
     */
    wrapperClassName?: string;
}
/**
 * Input Component
 *
 * A flexible input component with support for labels, helper text,
 * error states, icons, and multiple sizes.
 */
export declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
export default Input;
//# sourceMappingURL=Input.d.ts.map