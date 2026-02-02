import * as React from "react";
import { ChevronDown, LucideIcon } from "lucide-react";
import { GlassEffectWrapper } from "../GlassEffectWrapper";
import { cn } from "../../utils/cn";
import styles from "./sidebar.module.css";

export interface SidebarItem {
  name: string;
  href: string;
  icon: LucideIcon;
  onClick: (href: string) => void;
}

type SidebarColorVariant =
  | "neutral"
  | "primary"
  | "blue"
  | "orange"
  | "green"
  | "purple"
  | "pink"
  | "cyan"
  | "indigo"
  | "emerald"
  | "amber"
  | "violet"
  | "slate"
  | "red"
  | "teal"
  | "lime";

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

// Default hover/active styles are implemented via CSS modules so they cannot
// be overridden by consumer frameworks (e.g. Bootstrap) through class collisions.
const colorVariants: Record<
  SidebarColorVariant,
  { hoverClass: string; activeClass: string }
> = {
  neutral: {
    hoverClass: styles.hoverNeutral,
    activeClass: styles.activeNeutral,
  },
  primary: {
    hoverClass: styles.hoverPrimary,
    activeClass: styles.activePrimary,
  },
  blue: {
    hoverClass: styles.hoverBlue,
    activeClass: styles.activeBlue,
  },
  orange: {
    hoverClass: styles.hoverOrange,
    activeClass: styles.activeOrange,
  },
  green: {
    hoverClass: styles.hoverGreen,
    activeClass: styles.activeGreen,
  },
  purple: {
    hoverClass: styles.hoverPurple,
    activeClass: styles.activePurple,
  },
  pink: {
    hoverClass: styles.hoverPink,
    activeClass: styles.activePink,
  },
  cyan: {
    hoverClass: styles.hoverCyan,
    activeClass: styles.activeCyan,
  },
  indigo: {
    hoverClass: styles.hoverIndigo,
    activeClass: styles.activeIndigo,
  },
  emerald: {
    hoverClass: styles.hoverEmerald,
    activeClass: styles.activeEmerald,
  },
  amber: {
    hoverClass: styles.hoverAmber,
    activeClass: styles.activeAmber,
  },
  violet: {
    hoverClass: styles.hoverViolet,
    activeClass: styles.activeViolet,
  },
  slate: {
    hoverClass: styles.hoverSlate,
    activeClass: styles.activeSlate,
  },
  red: {
    hoverClass: styles.hoverRed,
    activeClass: styles.activeRed,
  },
  teal: {
    hoverClass: styles.hoverTeal,
    activeClass: styles.activeTeal,
  },
  lime: {
    hoverClass: styles.hoverLime,
    activeClass: styles.activeLime,
  },
};

const autoColorPalette: SidebarColorVariant[] = [
  "orange",
  "green",
  "purple",
  "pink",
  "cyan",
  "indigo",
  "emerald",
  "amber",
  "violet",
  "slate",
  "red",
  "teal",
  "lime",
  "blue",
  "primary",
];

const getColorClasses = (variant: SidebarColorVariant) => colorVariants[variant];

// Memoized sidebar item component to prevent unnecessary re-renders
const SidebarItemComponent = React.memo<{
  name: React.ReactNode;
  href: string;
  icon?: LucideIcon;
  onClick?: (href: string) => void;
  color: SidebarColorVariant;
  isActive: boolean;
  glassEffect: boolean;
  itemClassName?: string;
}>(
  ({
    name,
    href,
    icon: Icon,
    onClick,
    color,
    isActive,
    glassEffect,
    itemClassName,
  }) => {
    const { hoverClass, activeClass } = getColorClasses(color);
    const resolvedHoverColor = hoverClass;
    const resolvedActiveColor = activeClass;
    return (
      <GlassEffectWrapper
        asChild
        glassEffect={glassEffect && !isActive}
        variant="perfume"
        randomHue={false}
      >
        <button
          type="button"
          onClick={() => onClick?.(href)}
          className={cn(
            styles.itemButton,
            isActive
              ? cn(styles.itemActive, resolvedActiveColor)
              : cn(styles.itemInactive, resolvedHoverColor),
            itemClassName
          )}
        >
          {Icon ? (
            <Icon className={styles.icon} />
          ) : (
            <span className={styles.iconPlaceholder} />
          )}
          {name}
        </button>
      </GlassEffectWrapper>
    );
  }
);

SidebarItemComponent.displayName = "SidebarItemComponent";

export interface SidebarHeaderProps {
  title: React.ReactNode;
}

export const SidebarHeader = React.memo(function SidebarHeader({
  title,
}: SidebarHeaderProps) {
  return (
    <div className={styles.header}>
      <h1 className={styles.headerTitle}>{title}</h1>
    </div>
  );
});

SidebarHeader.displayName = "SidebarHeader";

export const Sidebar = React.memo(function Sidebar({
  items,
  config,
  activeHref,
  title,
  sidebarHeader,
  glassEffect = false,
  randomHue = false,
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

  const sections = React.useMemo(() => {
    let colorIndex = 0;
    const getNextColor = () => autoColorPalette[colorIndex++ % autoColorPalette.length];
    const getItemColor = () => (randomHue ? getNextColor() : "neutral");

    if (config) {
      return (config.sections ?? []).map((section) => ({
        ...section,
        items: section.items.map((item) => {
          if (item.type === "group") {
            return {
              ...item,
              children: item.children.map((child) => ({
                ...child,
                color: getItemColor(),
              })),
            };
          }
          return {
            ...item,
            color: getItemColor(),
          };
        }),
      }));
    }

    if (items?.length) {
      return [
        {
          id: "default",
          items: items.map((item) => ({
            type: "link" as const,
            name: item.name,
            href: item.href,
            icon: item.icon,
            onClick: item.onClick,
            color: getItemColor(),
          })),
        },
      ];
    }
    return [];
  }, [config, items, randomHue]);

  const [openSections, setOpenSections] = React.useState<Record<string, boolean>>(
    () =>
      sections.reduce<Record<string, boolean>>((acc, section) => {
        acc[section.id] = section.defaultOpen ?? true;
        return acc;
      }, {})
  );

  const [openGroups, setOpenGroups] = React.useState<Record<string, boolean>>(
    () => ({})
  );

  React.useEffect(() => {
    setOpenSections(
      sections.reduce<Record<string, boolean>>((acc, section) => {
        acc[section.id] = section.defaultOpen ?? true;
        return acc;
      }, {})
    );
    setOpenGroups({});
  }, [sections]);

  const toggleSection = React.useCallback((sectionId: string) => {
    setOpenSections((prev) => ({ ...prev, [sectionId]: !prev[sectionId] }));
  }, []);

  const toggleGroup = React.useCallback((groupKey: string) => {
    setOpenGroups((prev) => ({ ...prev, [groupKey]: !prev[groupKey] }));
  }, []);

  return (
    <div
      className={cn(styles.sidebar, className)}
      style={sidebarStyle}
    >
      {sidebarHeader ?? (title ? <SidebarHeader title={title} /> : null)}
      <nav className={styles.nav}>
        {sections.map((section, sectionIndex) => {
          const isSectionOpen = !section.collapsible || openSections[section.id];
          return (
            <div key={`${section.id}-${sectionIndex}`} className={styles.section}>
              {section.label &&
                (section.collapsible ? (
                  <button
                    type="button"
                    className={styles.sectionToggle}
                    aria-expanded={isSectionOpen}
                    onClick={() => toggleSection(section.id)}
                  >
                    <span className={styles.sectionLabel}>{section.label}</span>
                    <ChevronDown
                      className={cn(
                        styles.sectionChevron,
                        isSectionOpen && styles.sectionChevronOpen
                      )}
                      aria-hidden="true"
                    />
                  </button>
                ) : (
                  <div className={styles.sectionLabelStatic}>
                    {section.label}
                  </div>
                ))}
              <div
                className={cn(
                  styles.sectionContent,
                  !isSectionOpen && styles.sectionContentCollapsed
                )}
              >
                {section.items.map((item, itemIndex) => {
                  if (item.type === "group") {
                    const groupKey = `${section.id}:${itemIndex}`;
                    const isGroupOpen =
                      openGroups[groupKey] ?? (item.defaultOpen ?? false);
                    return (
                      <div key={groupKey} className={styles.group}>
                        <button
                          type="button"
                          className={styles.groupToggle}
                          aria-expanded={isGroupOpen}
                          onClick={() => toggleGroup(groupKey)}
                        >
                          {item.icon ? (
                            <item.icon className={styles.icon} />
                          ) : (
                            <span className={styles.iconPlaceholder} />
                          )}
                          <span className={styles.groupLabel}>{item.name}</span>
                          <ChevronDown
                            className={cn(
                              styles.groupChevron,
                              isGroupOpen && styles.groupChevronOpen
                            )}
                            aria-hidden="true"
                          />
                        </button>
                        <div
                          className={cn(
                            styles.groupContent,
                            !isGroupOpen && styles.groupContentCollapsed
                          )}
                        >
                          {item.children.map((child) => {
                            const isActive = activeHref === child.href;
                            return (
                              <SidebarItemComponent
                                key={child.href}
                                name={child.name}
                                href={child.href}
                                icon={child.icon ?? item.icon}
                                onClick={(href) => child.onClick?.(href)}
                                color={child.color}
                                isActive={isActive}
                                glassEffect={glassEffect}
                                itemClassName={cn(
                                  styles.groupItem,
                                  itemClassName
                                )}
                              />
                            );
                          })}
                        </div>
                      </div>
                    );
                  }

                  const isActive = activeHref === item.href;
                  return (
                    <SidebarItemComponent
                      key={item.href}
                      name={item.name}
                      href={item.href}
                      icon={item.icon}
                      onClick={(href) => item.onClick?.(href)}
                      color={item.color}
                      isActive={isActive}
                      glassEffect={glassEffect}
                      itemClassName={itemClassName}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>
    </div>
  );
});