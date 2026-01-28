import * as React from "react";
import { LucideIcon } from "lucide-react";
export interface SidebarItem {
    name: string;
    href: string;
    icon: LucideIcon;
    onClick: (href: string) => void;
    hoverColor?: string;
    activeColor?: string;
}
export interface SidebarProps {
    items: SidebarItem[];
    activeHref?: string;
    title?: string;
    glassEffect?: boolean;
    width?: number | string;
    className?: string;
    itemClassName?: string;
}
export declare const Sidebar: React.NamedExoticComponent<SidebarProps>;
//# sourceMappingURL=Sidebar.d.ts.map