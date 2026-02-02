import * as React from "react";
import { cn } from "../../utils/cn";
import styles from "./Tabs.module.css";
import { TabsProps } from "./Tabs.types";

export const Tabs: React.FC<TabsProps> = ({ config, className }) => {
  const tabs = config?.tabs ?? [];
  const defaultTab = config?.defaultTab ?? tabs[0]?.id;
  const isControlled = typeof config?.activeTab === "string";
  const [internalTab, setInternalTab] = React.useState(defaultTab);
  const activeTab = isControlled ? config?.activeTab : internalTab;

  const handleTabChange = (tabId: string) => {
    if (!isControlled) {
      setInternalTab(tabId);
    }
    config?.onTabChange?.(tabId);
  };

  const renderTabButton = (tab: typeof tabs[number]) => {
    const isActive = tab.id === activeTab;
    const ButtonComponent = tab.customButton;
    if (ButtonComponent) {
      return (
        <ButtonComponent
          key={tab.id}
          onClick={() => handleTabChange(tab.id)}
          disabled={tab.disabled}
        />
      );
    }

    return (
      <button
        key={tab.id}
        type="button"
        className={cn(
          styles.tabButton,
          config?.variant === "underline" && isActive
            ? styles.tabButtonUnderline
            : "",
          config?.variant === "pills" ? styles.tabButtonPill : "",
          config?.variant === "pills" && isActive
            ? styles.tabButtonPillActive
            : "",
          config?.variant === "enclosed" ? styles.tabButtonEnclosed : "",
          config?.variant === "enclosed" && isActive
            ? styles.tabButtonEnclosedActive
            : "",
          isActive ? styles.tabButtonActive : "",
          tab.className
        )}
        onClick={() => handleTabChange(tab.id)}
        disabled={tab.disabled}
        title={tab.tooltip}
        aria-selected={isActive}
        role="tab"
      >
        {tab.icon && <tab.icon size={16} />}
        {tab.label}
        {config?.showIndicators && tab.badge && (
          <span
            className={cn(
              styles.badge,
              styles[`badge_${tab.badge.variant ?? "default"}`]
            )}
          >
            {tab.badge.content}
          </span>
        )}
      </button>
    );
  };

  const renderContent = () => {
    if (!config?.lazyLoad) {
      return tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        if (!config?.keepMounted && !isActive) return null;
        return (
          <div
            key={tab.id}
            className={cn(
              styles.content,
              config?.animated ? styles.contentAnimated : "",
              config?.animated && !isActive ? styles.contentEnter : "",
              config?.animated && isActive ? styles.contentActive : ""
            )}
            role="tabpanel"
            hidden={!isActive}
          >
            {tab.content}
          </div>
        );
      });
    }

    const active = tabs.find((tab) => tab.id === activeTab);
    return (
      <div
        className={cn(
          styles.content,
          config?.animated ? styles.contentAnimated : "",
          config?.animated ? styles.contentActive : ""
        )}
        role="tabpanel"
      >
        {active?.content}
      </div>
    );
  };

  return (
    <div
      className={cn(
        styles.root,
        styles[`size_${config?.size ?? "md"}`],
        config?.fullWidth ? styles.fullWidth : "",
        className
      )}
    >
      <div
        className={cn(
          styles.tabsRow,
          config?.orientation === "vertical" ? styles.tabsRowVertical : "",
          config?.centered ? styles.centered : ""
        )}
        role="tablist"
        aria-orientation={config?.orientation ?? "horizontal"}
      >
        {tabs.map(renderTabButton)}
      </div>
      {renderContent()}
    </div>
  );
};

export default Tabs;
