import * as React from "react";
import { cn } from "../../utils/cn";
import styles from "./DropdownMenu.module.css";
import { DropdownMenuProps, DropdownMenuItem } from "./DropdownMenu.types";

const renderItems = (
  items: DropdownMenuItem[],
  onSelect: () => void
) =>
  items.map((item, index) => {
    if (item.type === "separator") {
      return <div key={`sep-${index}`} className={styles.separator} />;
    }

    if (item.type === "label") {
      return (
        <div key={item.id ?? `label-${index}`} className={styles.label}>
          {item.label}
        </div>
      );
    }

    if (item.type === "sub") {
      return (
        <div key={item.id ?? `sub-${index}`} className={styles.item}>
          {item.icon && <item.icon size={14} />}
          {item.label}
          {item.children && (
            <div className={styles.submenu}>{renderItems(item.children)}</div>
          )}
        </div>
      );
    }

    const checked = item.type === "checkbox" || item.type === "radio";
    return (
      <div
        key={item.id ?? `item-${index}`}
        className={cn(
          styles.item,
          item.disabled ? styles.itemDisabled : "",
          item.destructive ? styles.itemDestructive : "",
          item.className
        )}
        onClick={() => {
          if (item.disabled) return;
          item.onClick?.();
          onSelect();
        }}
      >
        {checked && <span>{item.checked ? "✓" : ""}</span>}
        {item.icon && <item.icon size={14} />}
        {item.label}
        {item.shortcut && <span className={styles.shortcut}>{item.shortcut}</span>}
      </div>
    );
  });

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ config }) => {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isControlled = typeof config?.open === "boolean";
  const open = isControlled ? config?.open : internalOpen;

  const toggleOpen = () => {
    if (isControlled) {
      config?.onOpenChange?.(!config?.open);
    } else {
      setInternalOpen((prev) => !prev);
      config?.onOpenChange?.(!open);
    }
  };

  const align = config?.align ?? "start";
  const side = config?.side ?? "bottom";
  const trigger = config?.trigger;

  return (
    <div className={styles.root}>
      {trigger?.customComponent ? (
        <div onClick={toggleOpen}>{trigger.customComponent}</div>
      ) : (
        <button
          type="button"
          className={cn(
            styles.trigger,
            trigger?.variant === "ghost" ? styles.triggerGhost : "",
            trigger?.variant === "outline" ? styles.triggerOutline : ""
          )}
          onClick={toggleOpen}
        >
          {trigger?.icon && <trigger.icon size={14} />}
          {trigger?.label ?? "Menu"}
        </button>
      )}
      {open && (
        <div
          className={cn(
            styles.menu,
            styles[`align_${align}`],
            styles[`side_${side}`]
          )}
        >
          {renderItems(config?.items ?? [], () => {
            if (isControlled) {
              config?.onOpenChange?.(false);
            } else {
              setInternalOpen(false);
              config?.onOpenChange?.(false);
            }
          })}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
