import * as React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "../../utils/cn";
import styles from "./Accordion.module.css";
import { AccordionProps } from "./Accordion.types";

export const Accordion: React.FC<AccordionProps> = ({ config, className }) => {
  const type = config?.type ?? "single";
  const defaultOpen = config?.defaultOpen ?? [];
  const isControlled = Array.isArray(config?.openItems);
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const openItems = isControlled ? config?.openItems ?? [] : internalOpen;

  const setOpenItems = (items: string[]) => {
    if (!isControlled) {
      setInternalOpen(items);
    }
    config?.onOpenChange?.(items);
  };

  const handleToggle = (id: string) => {
    const isOpen = openItems.includes(id);
    if (type === "single") {
      if (isOpen) {
        if (config?.collapsible) setOpenItems([]);
      } else {
        setOpenItems([id]);
      }
      return;
    }

    if (isOpen) {
      setOpenItems(openItems.filter((itemId) => itemId !== id));
    } else {
      setOpenItems([...openItems, id]);
    }
  };

  const ExpandIcon = config?.icons?.expand ?? ChevronRight;
  const CollapseIcon = config?.icons?.collapse ?? ChevronDown;

  return (
    <div className={cn(styles.root, className)}>
      {(config?.items ?? []).map((item) => {
        const isOpen = openItems.includes(item.id);
        const TriggerComponent = item.trigger.customComponent;
        const iconPosition = config?.iconPosition ?? "left";

        return (
          <div
            key={item.id}
            className={cn(
              styles.item,
              config?.variant === "ghost" ? styles.itemGhost : "",
              config?.variant === "separated" ? styles.itemSeparated : ""
            )}
          >
            <button
              type="button"
              className={cn(
                styles.trigger,
                item.trigger.className,
                item.disabled ? styles.triggerDisabled : ""
              )}
              onClick={() => !item.disabled && handleToggle(item.id)}
              aria-expanded={isOpen}
              disabled={item.disabled}
            >
              {iconPosition === "left" && (
                <span className={styles.triggerIcon}>
                  {isOpen ? <CollapseIcon size={16} /> : <ExpandIcon size={16} />}
                </span>
              )}
              {item.trigger.icon && (
                <item.trigger.icon size={16} className={styles.triggerIcon} />
              )}
              <div className={styles.triggerText}>
                {TriggerComponent ? (
                  <TriggerComponent />
                ) : (
                  <>
                    <div className={styles.triggerLabel}>
                      {item.trigger.label}
                    </div>
                    {item.trigger.subtitle && (
                      <div className={styles.triggerSubtitle}>
                        {item.trigger.subtitle}
                      </div>
                    )}
                  </>
                )}
              </div>
              {item.badge && (
                <span
                  className={cn(
                    styles.badge,
                    styles[`badge_${item.badge.variant ?? "default"}`]
                  )}
                >
                  {item.badge.content}
                </span>
              )}
              {iconPosition === "right" && (
                <span className={styles.triggerIcon}>
                  {isOpen ? <CollapseIcon size={16} /> : <ExpandIcon size={16} />}
                </span>
              )}
            </button>
            <div
              className={cn(
                styles.content,
                !isOpen ? styles.contentHidden : "",
                config?.animated ? styles.contentAnimated : "",
                item.contentClassName
              )}
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
