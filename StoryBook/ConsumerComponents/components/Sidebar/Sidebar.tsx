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
  title?: string;
  glassEffect?: boolean;
  width?: number | string;
  className?: string;
  itemClassName?: string;
}

const defaultHoverColor = "hover:bg-primary/10 hover:text-primary dark:hover:text-primary";
const defaultActiveColor = "bg-primary/20 text-primary dark:text-primary border-primary/30";

// Memoized sidebar item component to prevent unnecessary re-renders
const SidebarItemComponent = React.memo<{
  item: SidebarItem;
  isActive: boolean;
  glassEffect: boolean;
  itemClassName?: string;
}>(({ item, isActive, glassEffect, itemClassName }) => {
  const hoverColor = item.hoverColor ?? defaultHoverColor;
  const activeColor = item.activeColor ?? defaultActiveColor;

  const buttonElement = React.useMemo(
    () => (
      <button
        type="button"
        onClick={() => item.onClick(item.href)}
        className={cn(
          "flex w-full items-center justify-start gap-3 rounded-lg text-left text-sm font-medium transition-all duration-200",
          // Keep glass styling but prevent overflow outside sidebar width
          // - clip the moving ::before shine
          // - remove outer glow that bleeds into adjacent content
          glassEffect && "hover:scale-100 hover:shadow-none",
          isActive ? cn(activeColor) : cn("text-muted-foreground border-transparent", hoverColor),
          itemClassName
        )}
      >
        <item.icon className="h-5 w-5" />
        {item.name}
      </button>
    ),
    [
      item,
      isActive,
      glassEffect,
      hoverColor,
      activeColor,
      itemClassName,
    ]
  );

  return (
    <GlassEffectWrapper
      key={item.name}
      asChild
      glassEffect={glassEffect && !isActive}
      variant="perfume"
      randomHue={glassEffect && !isActive}
    >
      {buttonElement}
    </GlassEffectWrapper>
  );
});

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
      className={cn(styles.sidebar, "flex h-full flex-col border-r bg-card", className)}
      style={sidebarStyle}
    >
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>{title}</h1>
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4">
        {items.map((item) => {
          const isActive = activeHref === item.href;
          return (
            <SidebarItemComponent
              key={item.href}
              item={item}
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
