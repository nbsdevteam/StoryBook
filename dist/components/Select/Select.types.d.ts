import * as React from "react";
import { LucideIcon } from "lucide-react";
import { ComponentWrapperProps } from "../../types/component-config.types";
export interface SelectConfig {
    options: SelectOption[];
    groups?: SelectGroup[];
    value?: any;
    onValueChange?: (value: any) => void;
    placeholder?: string;
    searchable?: boolean;
    searchPlaceholder?: string;
    multiple?: boolean;
    disabled?: boolean;
    showCheckmarks?: boolean;
    renderOption?: (option: SelectOption) => React.ReactNode;
    renderValue?: (value: any) => React.ReactNode;
    emptyMessage?: string;
    maxHeight?: number;
}
export interface SelectOption {
    value: any;
    label: string;
    icon?: LucideIcon;
    disabled?: boolean;
    description?: string;
}
export interface SelectGroup {
    label: string;
    options: SelectOption[];
}
export interface SelectConfigProps extends ComponentWrapperProps<SelectConfig> {
}
//# sourceMappingURL=Select.types.d.ts.map