import React from 'react';
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
    label?: React.ReactNode;
    helperText?: string;
    error?: string;
    required?: boolean;
    size?: 'small' | 'medium' | 'large';
    invalid?: boolean;
    wrapperClassName?: string;
    labelBefore?: boolean;
}
export declare const Checkbox: React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLInputElement>>;
export default Checkbox;
//# sourceMappingURL=Checkbox.d.ts.map