import React from 'react';
/**
 * Radio Component Props
 */
export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
    /**
     * Radio label
     */
    label?: React.ReactNode;
    /**
     * Helper text below radio
     */
    helperText?: string;
    /**
     * Error message to display
     */
    error?: string;
    /**
     * Whether radio is required
     * @default false
     */
    required?: boolean;
    /**
     * Radio size
     * @default 'medium'
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * Whether radio is in invalid state
     */
    invalid?: boolean;
    /**
     * Additional CSS classes for wrapper
     */
    wrapperClassName?: string;
    /**
     * Whether to show label before radio
     * @default false
     */
    labelBefore?: boolean;
}
/**
 * Radio Component
 *
 * A flexible radio button component with support for labels,
 * helper text, error states, and multiple sizes.
 */
export declare const Radio: React.ForwardRefExoticComponent<RadioProps & React.RefAttributes<HTMLInputElement>>;
export default Radio;
//# sourceMappingURL=Radio.d.ts.map