import * as React from "react";
import { ComponentWrapperProps } from "../../types/component-config.types";
export interface ComboboxConfig {
    options: ComboboxOption[];
    value?: any;
    onValueChange?: (value: any) => void;
    placeholder?: string;
    searchPlaceholder?: string;
    disabled?: boolean;
    renderOption?: (option: ComboboxOption) => React.ReactNode;
    emptyMessage?: string;
}
export interface ComboboxOption {
    label: string;
    value: any;
    disabled?: boolean;
}
export interface ComboboxProps extends ComponentWrapperProps<ComboboxConfig> {
}
//# sourceMappingURL=Combobox.types.d.ts.map