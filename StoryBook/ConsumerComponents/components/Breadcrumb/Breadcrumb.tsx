import * as React from "react";
import { Home, ChevronRight, ArrowRight } from "lucide-react";
import { cn } from "../../utils/cn";
import styles from "./Breadcrumb.module.css";
import { BreadcrumbProps } from "./Breadcrumb.types";

const renderSeparator = (
  separator: React.ReactNode | "slash" | "chevron" | "arrow"
) => {
  if (separator === "chevron") return <ChevronRight size={14} />;
  if (separator === "arrow") return <ArrowRight size={14} />;
  if (separator === "slash") return <span>/</span>;
  return separator ?? <span>/</span>;
};

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ config, className }) => {
  if (!config?.items?.length) return null;

  const separator = renderSeparator(config.separator ?? "slash");
  let items = config.items;

  if (config.maxItems && items.length > config.maxItems) {
    const first = items[0];
    const last = items[items.length - 1];
    items = [first, { label: "..." }, last];
  }

  return (
    <nav className={cn(styles.root, className)} aria-label="Breadcrumb">
      {config.showHome && (
        <span className={styles.item}>
          {config.homeIcon ? (
            <config.homeIcon size={14} />
          ) : (
            <Home size={14} />
          )}
          <span className={styles.separator}>{separator}</span>
        </span>
      )}
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={`${item.label}-${index}`} className={styles.item}>
            {item.href ? (
              <a
                href={item.href}
                onClick={item.onClick}
                className={cn(styles.link, isLast ? styles.active : "")}
              >
                {item.icon && <item.icon size={14} />}
                {item.label}
              </a>
            ) : (
              <span className={cn(isLast ? styles.active : "")}>
                {item.icon && <item.icon size={14} />}
                {item.label}
              </span>
            )}
            {!isLast && <span className={styles.separator}>{separator}</span>}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
