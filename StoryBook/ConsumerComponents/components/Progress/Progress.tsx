import * as React from "react";
import styles from "./Progress.module.css";
import { cn } from "../../utils/cn";

export interface ProgressProps {
  value: number;
  max?: number;
  showLabel?: boolean;
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  showLabel = false,
  className,
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.track}>
        <div className={styles.bar} style={{ width: `${percentage}%` }} />
      </div>
      {showLabel && <span className={styles.label}>{Math.round(percentage)}%</span>}
    </div>
  );
};

export default Progress;
