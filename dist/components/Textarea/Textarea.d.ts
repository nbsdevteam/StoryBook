import React from 'react';
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    helperText?: string;
    error?: string;
    required?: boolean;
    size?: 'small' | 'medium' | 'large';
    variant?: 'default' | 'light' | 'primary';
    invalid?: boolean;
    valid?: boolean;
    autoResize?: boolean;
    showCharCount?: boolean;
    wrapperClassName?: string;
}
export declare const Textarea: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>>;
export default Textarea;
//# sourceMappingURL=Textarea.d.ts.map