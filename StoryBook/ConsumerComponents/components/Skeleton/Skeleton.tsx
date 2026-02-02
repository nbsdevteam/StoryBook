import * as React from "react";
import styles from "./Skeleton.module.css";
import { cn } from "../../utils/cn";

export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  circle?: boolean;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = "100%",
  height = "1rem",
  circle = false,
  className,
}) => {
  return (
    <div
      className={cn(styles.skeleton, circle ? styles.circle : "", className)}
      style={{ width, height }}
    />
  );
};

export default Skeleton;
