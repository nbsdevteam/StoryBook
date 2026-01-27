import React from 'react';
/**
 * Textarea Component Props
 */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    /**
     * Textarea label
     */
    label?: string;
    /**
     * Helper text below textarea
     */
    helperText?: string;
    /**
     * Error message to display
     */
    error?: string;
    /**
     * Whether textarea is required
     * @default false
     */
    required?: boolean;
    /**
     * Textarea size
     * @default 'medium'
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * Textarea variant/style
     * @default 'default'
     */
    variant?: 'default' | 'light' | 'primary';
    /**
     * Whether textarea is in invalid state
     */
    invalid?: boolean;
    /**
     * Whether textarea is in valid state
     */
    valid?: boolean;
    /**
     * Number of rows (height)
     * @default 3
     */
    rows?: number;
    /**
     * Whether textarea should auto-resize
     * @default false
     */
    autoResize?: boolean;
    /**
     * Maximum number of characters
     */
    maxLength?: number;
    /**
     * Show character count
     * @default false
     */
    showCharCount?: boolean;
    /**
     * Additional CSS classes for wrapper
     */
    wrapperClassName?: string;
}
/**
 * Textarea Component
 *
 * A flexible textarea component with support for labels, helper text,
 * error states, character counting, and auto-resize.
 */
export declare const Textarea: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>>;
export default Textarea;
//# sourceMappingURL=Textarea.d.ts.map