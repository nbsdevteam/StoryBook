import * as React from "react";
import { cn } from "../../utils/cn";
import styles from "./NavigationMenu.module.css";
import { NavigationMenuProps, NavigationMenuItem } from "./NavigationMenu.types";

export const NavigationMenu: React.FC<NavigationMenuProps> = ({
  config,
  className,
}) => {
  const [openItem, setOpenItem] = React.useState<string | null>(null);
  const trigger = config?.trigger ?? "hover";

  const handleItemClick = (item: NavigationMenuItem) => {
    item.onClick?.();
    config?.onItemClick?.(item);
    if (trigger === "click") {
      setOpenItem((prev) => (prev === item.id ? null : item.id));
    }
  };

  const renderItem = (item: NavigationMenuItem) => {
    const isActive = config?.activeItem === item.id;
    const isOpen = openItem === item.id;

    return (
      <div
        key={item.id}
        className={cn(styles.item, item.className)}
        onMouseEnter={
          trigger === "hover" ? () => setOpenItem(item.id) : undefined
        }
        onMouseLeave={trigger === "hover" ? () => setOpenItem(null) : undefined}
      >
        <button
          type="button"
          className={cn(
            styles.link,
            config?.variant === "underline" ? styles.linkUnderline : "",
            config?.variant === "underline" && isActive
              ? styles.linkUnderlineActive
              : "",
            config?.variant === "pills" ? styles.linkPill : "",
            config?.variant === "pills" && isActive
              ? styles.linkPillActive
              : "",
            isActive ? styles.linkActive : ""
          )}
          onClick={() => handleItemClick(item)}
          disabled={item.disabled}
        >
          {config?.showIcons && item.icon && <item.icon size={16} />}
          {item.customContent ?? item.label}
          {config?.showBadges && item.badge && (
            <span
              className={cn(
                styles.badge,
                styles[`badge_${item.badge.variant ?? "default"}`]
              )}
            >
              {item.badge.content}
            </span>
          )}
        </button>

        {item.children && item.children.length > 0 && isOpen && (
          <div className={styles.dropdown}>
            {item.children.map((child) => (
              <div
                key={child.id}
                className={styles.dropdownItem}
                onClick={() => handleItemClick(child)}
              >
                {config?.showIcons && child.icon && <child.icon size={14} />}
                {child.customContent ?? child.label}
                {config?.showBadges && child.badge && (
                  <span
                    className={cn(
                      styles.badge,
                      styles[`badge_${child.badge.variant ?? "default"}`]
                    )}
                  >
                    {child.badge.content}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav
      className={cn(
        styles.root,
        config?.orientation === "vertical" ? styles.vertical : styles.horizontal,
        className
      )}
    >
      {(config?.items ?? []).map(renderItem)}
    </nav>
  );
};

export default NavigationMenu;
