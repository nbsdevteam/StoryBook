import React from 'react';
/**
 * Select Option
 */
export interface SelectOption {
    label: string;
    value: string | number;
    disabled?: boolean;
}
/**
 * Select Component Props
 */
export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
    /**
     * Select label
     */
    label?: string;
    /**
     * Options for the select
     */
    options?: SelectOption[];
    /**
     * Helper text below select
     */
    helperText?: string;
    /**
     * Error message to display
     */
    error?: string;
    /**
     * Whether select is required
     * @default false
     */
    required?: boolean;
    /**
     * Select size
     * @default 'medium'
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * Whether select is in invalid state
     */
    invalid?: boolean;
    /**
     * Whether select is in valid state
     */
    valid?: boolean;
    /**
     * Placeholder text (for first option)
     */
    placeholder?: string;
    /**
     * Additional CSS classes for wrapper
     */
    wrapperClassName?: string;
}
/**
 * Select Component
 *
 * A flexible select/dropdown component with support for labels,
 * helper text, error states, and multiple sizes.
 */
export declare const Select: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLSelectElement>>;
export default Select;
//# sourceMappingURL=Select.d.ts.map