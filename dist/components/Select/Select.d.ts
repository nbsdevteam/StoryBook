import React from 'react';
export interface SelectOption {
    label: string;
    value: string | number;
    disabled?: boolean;
}
export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
    label?: string;
    options?: SelectOption[];
    helperText?: string;
    error?: string;
    required?: boolean;
    size?: 'small' | 'medium' | 'large';
    invalid?: boolean;
    valid?: boolean;
    placeholder?: string;
    wrapperClassName?: string;
}
export declare const Select: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLSelectElement>>;
export default Select;
//# sourceMappingURL=Select.d.ts.map