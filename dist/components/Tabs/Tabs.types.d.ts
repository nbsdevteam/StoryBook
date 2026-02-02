import * as React from "react";
import { LucideIcon } from "lucide-react";
import { ComponentWrapperProps } from "../../types/component-config.types";
export interface TabsConfig {
    tabs: TabItem[];
    defaultTab?: string;
    activeTab?: string;
    onTabChange?: (tabId: string) => void;
    orientation?: "horizontal" | "vertical";
    variant?: "default" | "pills" | "underline" | "enclosed";
    size?: "sm" | "md" | "lg";
    fullWidth?: boolean;
    centered?: boolean;
    showIndicators?: boolean;
    lazyLoad?: boolean;
    keepMounted?: boolean;
    animated?: boolean;
}
export interface TabItem {
    id: string;
    label: string;
    icon?: LucideIcon;
    content: React.ReactNode;
    disabled?: boolean;
    badge?: {
        content: string | number;
        variant?: "default" | "primary" | "success" | "warning" | "danger";
    };
    customButton?: React.ComponentType<any>;
    loading?: boolean;
    tooltip?: string;
    className?: string;
}
export interface TabsProps extends ComponentWrapperProps<TabsConfig> {
}
//# sourceMappingURL=Tabs.types.d.ts.map