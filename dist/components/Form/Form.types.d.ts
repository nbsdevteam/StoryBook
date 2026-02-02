import * as React from "react";
import { LucideIcon } from "lucide-react";
import { ComponentWrapperProps } from "../../types/component-config.types";
export interface FormConfig {
    fields: FormField[];
    sections?: FormSection[];
    values?: Record<string, any>;
    onValuesChange?: (values: Record<string, any>) => void;
    onSubmit: (values: Record<string, any>) => void | Promise<void>;
    validationSchema?: any;
    errors?: Record<string, string>;
    onErrorsChange?: (errors: Record<string, any>) => void;
    loading?: boolean;
    disabled?: boolean;
    layout?: "vertical" | "horizontal" | "inline";
    spacing?: "sm" | "md" | "lg";
    showRequiredIndicators?: boolean;
    submitButton?: {
        label?: string;
        loading?: boolean;
        disabled?: boolean;
        position?: "left" | "center" | "right";
    };
    cancelButton?: {
        label?: string;
        onClick: () => void;
    };
    actions?: React.ReactNode[];
    autoSave?: {
        enabled: boolean;
        debounce?: number;
        onSave: (values: Record<string, any>) => void;
    };
}
export interface FormField {
    name: string;
    label?: string;
    type: "text" | "email" | "password" | "number" | "tel" | "url" | "textarea" | "select" | "multiselect" | "checkbox" | "radio" | "switch" | "date" | "time" | "datetime" | "file" | "color" | "custom";
    placeholder?: string;
    description?: string;
    defaultValue?: any;
    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    validation?: {
        min?: number;
        max?: number;
        minLength?: number;
        maxLength?: number;
        pattern?: RegExp;
        custom?: (value: any) => string | undefined;
    };
    options?: {
        label: string;
        value: any;
        disabled?: boolean;
    }[];
    customComponent?: React.ComponentType<any>;
    icon?: LucideIcon;
    addon?: React.ReactNode;
    width?: "full" | "half" | "third" | "quarter";
    show?: boolean | ((values: Record<string, any>) => boolean);
    className?: string;
    onChange?: (value: any, allValues: Record<string, any>) => void;
}
export interface FormSection {
    id: string;
    title?: string;
    description?: string;
    icon?: LucideIcon;
    fields: FormField[];
    collapsible?: boolean;
    defaultCollapsed?: boolean;
    className?: string;
}
export interface FormProps extends ComponentWrapperProps<FormConfig> {
}
//# sourceMappingURL=Form.types.d.ts.map