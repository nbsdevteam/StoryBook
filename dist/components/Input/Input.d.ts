import React from 'react';
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    label?: string;
    helperText?: string;
    error?: string;
    required?: boolean;
    size?: 'small' | 'medium' | 'large';
    variant?: 'default' | 'light' | 'primary';
    invalid?: boolean;
    valid?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    wrapperClassName?: string;
}
export declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
export default Input;
//# sourceMappingURL=Input.d.ts.map