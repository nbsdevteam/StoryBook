import * as React from "react";
import { LucideIcon } from "lucide-react";
import { GlassEffectWrapper } from "../GlassEffectWrapper";
import { cn } from "../../utils/cn";
import styles from "./sidebar.module.css";

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
  title?: React.ReactNode;
  glassEffect?: boolean;
  width?: number | string;
  className?: string;
  itemClassName?: string;
}

// Default hover/active styles are implemented via CSS modules so they cannot
// be overridden by consumer frameworks (e.g. Bootstrap) through class collisions.
const defaultHoverColor = styles.hoverPrimary;
const defaultActiveColor = styles.activePrimary;

// Memoized sidebar item component to prevent unnecessary re-renders
const SidebarItemComponent = React.memo<{
  name: string;
  href: string;
  icon: LucideIcon;
  onClick: (href: string) => void;
  hoverColor?: string;
  activeColor?: string;
  isActive: boolean;
  glassEffect: boolean;
  itemClassName?: string;
}>(
  ({
    name,
    href,
    icon: Icon,
    onClick,
    hoverColor,
    activeColor,
    isActive,
    glassEffect,
    itemClassName,
  }) => {
    const resolvedHoverColor = hoverColor ?? defaultHoverColor;
    const resolvedActiveColor = activeColor ?? defaultActiveColor;
    return (
      <GlassEffectWrapper
        asChild
        glassEffect={glassEffect && !isActive}
        variant="perfume"
        randomHue={false}
      >
        <button
          type="button"
          onClick={() => onClick(href)}
          className={cn(
            styles.itemButton,
            isActive
              ? cn(styles.itemActive, resolvedActiveColor)
              : cn(styles.itemInactive, resolvedHoverColor),
            itemClassName
          )}
        >
          <Icon className={styles.icon} />
          {name}
        </button>
      </GlassEffectWrapper>
    );
  }
);

SidebarItemComponent.displayName = "SidebarItemComponent";

export const Sidebar = React.memo(function Sidebar({
  items,
  activeHref,
  title = "Call Center",
  glassEffect = true,
  width = "256px",
  className,
  itemClassName,
}: SidebarProps) {
  const resolvedWidth = React.useMemo(
    () => (typeof width === "number" ? `${width}px` : width),
    [width]
  );

  const sidebarStyle = React.useMemo(
    () => ({ "--sidebar-width": resolvedWidth } as React.CSSProperties),
    [resolvedWidth]
  );

  return (
    <div
      className={cn(styles.sidebar, className)}
      style={sidebarStyle}
    >
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>{title}</h1>
      </div>
      <nav className={styles.nav}>
        {items.map((item) => {
          const isActive = activeHref === item.href;
          return (
            <SidebarItemComponent
              key={item.href}
              name={item.name}
              href={item.href}
              icon={item.icon}
              onClick={item.onClick}
              hoverColor={item.hoverColor}
              activeColor={item.activeColor}
              isActive={isActive}
              glassEffect={glassEffect}
              itemClassName={itemClassName}
            />
          );
        })}
      </nav>
    </div>
  );
});