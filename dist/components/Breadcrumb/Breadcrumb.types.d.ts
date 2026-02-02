import * as React from "react";
import { LucideIcon } from "lucide-react";
import { ComponentWrapperProps } from "../../types/component-config.types";
export interface BreadcrumbConfig {
    items: BreadcrumbItem[];
    separator?: React.ReactNode | "slash" | "chevron" | "arrow";
    maxItems?: number;
    showHome?: boolean;
    homeIcon?: LucideIcon;
}
export interface BreadcrumbItem {
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: LucideIcon;
}
export interface BreadcrumbProps extends ComponentWrapperProps<BreadcrumbConfig> {
}
//# sourceMappingURL=Breadcrumb.types.d.ts.map