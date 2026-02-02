import * as React from "react";
import { ComponentWrapperProps } from "../../types/component-config.types";
/**
 * Component-specific config interface.
 */
export interface ConfigComponentConfig {
    title?: string;
    content?: React.ReactNode;
}
/**
 * Component props.
 */
export interface ConfigComponentProps extends ComponentWrapperProps<ConfigComponentConfig> {
    children?: React.ReactNode;
}
/**
 * ConfigComponent - A config-driven component.
 */
export declare const ConfigComponent: React.ForwardRefExoticComponent<ConfigComponentProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ConfigComponent.d.ts.map