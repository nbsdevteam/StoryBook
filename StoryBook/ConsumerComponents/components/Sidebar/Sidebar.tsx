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
        // CRITICAL FIX: Disable randomHue to prevent flashing
        randomHue={false}
      >
        <button
          type="button"
          onClick={() => onClick(href)}
          className={cn(
            "flex w-full items-center justify-start gap-3 rounded-lg text-left text-sm font-medium transition-colors duration-150",
            // Keep glass styling but prevent overflow outside sidebar width
            // - clip the moving ::before shine
            // - remove outer glow that bleeds into adjacent content
            glassEffect && "hover:scale-100 hover:shadow-none",
            isActive
              ? cn(resolvedActiveColor)
              : cn("text-muted-foreground border-transparent", resolvedHoverColor),
            itemClassName
          )}
        >
          <Icon className="h-5 w-5" />
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