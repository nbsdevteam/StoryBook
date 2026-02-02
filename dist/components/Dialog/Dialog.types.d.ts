import * as React from "react";
import { LucideIcon } from "lucide-react";
import { ComponentWrapperProps } from "../../types/component-config.types";
export interface DialogConfig {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    title?: React.ReactNode;
    description?: React.ReactNode;
    icon?: {
        component: LucideIcon;
        variant?: "default" | "primary" | "success" | "warning" | "danger";
    };
    content?: React.ReactNode;
    footer?: {
        actions?: {
            primary?: {
                label: string;
                onClick: () => void | Promise<void>;
                loading?: boolean;
                disabled?: boolean;
                variant?: "default" | "primary" | "danger";
                icon?: LucideIcon;
            };
            secondary?: {
                label: string;
                onClick: () => void;
                disabled?: boolean;
            };
            tertiary?: {
                label: string;
                onClick: () => void;
                disabled?: boolean;
            };
            custom?: React.ReactNode;
        };
        alignment?: "left" | "center" | "right" | "space-between";
    };
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
    variant?: "default" | "alert" | "confirmation" | "form";
    showCloseButton?: boolean;
    closeOnOverlayClick?: boolean;
    closeOnEscape?: boolean;
    trapFocus?: boolean;
    showOverlay?: boolean;
    overlayBlur?: boolean;
    loading?: boolean;
    customHeader?: React.ComponentType<any>;
    scrollBehavior?: "inside" | "outside";
}
export interface DialogProps extends ComponentWrapperProps<DialogConfig> {
    children?: React.ReactNode;
}
//# sourceMappingURL=Dialog.types.d.ts.map