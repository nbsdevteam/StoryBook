import * as React from "react";
import styles from "./Avatar.module.css";
import { cn } from "../../utils/cn";

export interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg";
  rounded?: boolean;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "Avatar",
  fallback,
  size = "md",
  rounded = true,
  className,
}) => {
  return (
    <div
      className={cn(
        styles.avatar,
        styles[`size_${size}`],
        rounded ? styles.rounded : "",
        className
      )}
    >
      {src ? (
        <img src={src} alt={alt} className={styles.image} />
      ) : (
        <span className={styles.fallback}>
          {fallback ?? alt?.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
};

export default Avatar;
