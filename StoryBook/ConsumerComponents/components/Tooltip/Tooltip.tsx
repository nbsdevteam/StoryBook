import * as React from "react";
import styles from "./Tooltip.module.css";
import { cn } from "../../utils/cn";

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: "top" | "right" | "bottom" | "left";
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = "top",
  className,
}) => {
  return (
    <span className={cn(styles.wrapper, className)}>
      {children}
      <span className={cn(styles.tooltip, styles[`pos_${position}`])}>
        {content}
      </span>
    </span>
  );
};

export default Tooltip;
