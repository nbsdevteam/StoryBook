import * as React from "react";
import { LucideIcon } from "lucide-react";
export interface SidebarItem {
    name: string;
    href: string;
    icon: LucideIcon;
    onClick: (href: string) => void;
}
export interface SidebarNavLinkItem {
    type: "link";
    name: React.ReactNode;
    href: string;
    icon?: LucideIcon;
    onClick?: (href: string) => void;
}
export interface SidebarNavGroupItem {
    type: "group";
    name: React.ReactNode;
    icon?: LucideIcon;
    defaultOpen?: boolean;
    children: SidebarNavLinkItem[];
}
export type SidebarNavItem = SidebarNavLinkItem | SidebarNavGroupItem;
export interface SidebarSection {
    id: string;
    label?: React.ReactNode;
    collapsible?: boolean;
    defaultOpen?: boolean;
    items: SidebarNavItem[];
}
export interface SidebarConfig {
    sections: SidebarSection[];
}
export interface SidebarProps {
    items?: SidebarItem[];
    config?: SidebarConfig;
    activeHref?: string;
    title?: React.ReactNode;
    sidebarHeader?: React.ReactNode;
    glassEffect?: boolean;
    randomHue?: boolean;
    width?: number | string;
    className?: string;
    itemClassName?: string;
}
export interface SidebarHeaderProps {
    title: React.ReactNode;
}
export declare const SidebarHeader: React.NamedExoticComponent<SidebarHeaderProps>;
export declare const Sidebar: React.NamedExoticComponent<SidebarProps>;
//# sourceMappingURL=Sidebar.d.ts.map