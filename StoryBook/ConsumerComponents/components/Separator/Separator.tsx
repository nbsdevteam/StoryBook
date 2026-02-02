import * as React from "react";
import styles from "./Separator.module.css";
import { cn } from "../../utils/cn";

export interface SeparatorProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export const Separator: React.FC<SeparatorProps> = ({
  orientation = "horizontal",
  className,
}) => {
  return (
    <div
      className={cn(
        styles.separator,
        orientation === "vertical" ? styles.vertical : "",
        className
      )}
      role="separator"
      aria-orientation={orientation}
    />
  );
};

export default Separator;
