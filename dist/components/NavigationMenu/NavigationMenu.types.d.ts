import * as React from "react";
import { LucideIcon } from "lucide-react";
import { ComponentWrapperProps } from "../../types/component-config.types";
export interface NavigationMenuConfig {
    items: NavigationMenuItem[];
    orientation?: "horizontal" | "vertical";
    variant?: "default" | "pills" | "underline";
    activeItem?: string;
    onItemClick?: (item: NavigationMenuItem) => void;
    trigger?: "hover" | "click";
    showIcons?: boolean;
    showBadges?: boolean;
}
export interface NavigationMenuItem {
    id: string;
    label: string;
    href?: string;
    icon?: LucideIcon;
    badge?: {
        content: string | number;
        variant?: "default" | "primary" | "success" | "warning" | "danger";
    };
    onClick?: () => void;
    disabled?: boolean;
    children?: NavigationMenuItem[];
    customContent?: React.ReactNode;
    className?: string;
}
export interface NavigationMenuProps extends ComponentWrapperProps<NavigationMenuConfig> {
}
//# sourceMappingURL=NavigationMenu.types.d.ts.map