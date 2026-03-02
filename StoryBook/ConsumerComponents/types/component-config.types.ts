import * as React from "react";
import { LucideIcon } from "lucide-react";

/**
 * Base props that all wrapper components can accept.
 */
export interface ComponentWrapperProps<TConfig = any> {
  /**
   * Configuration object that drives the component rendering.
   */
  config?: TConfig;

  /**
   * Enable glass effect wrapper.
   */
  glassEffect?: boolean;

  /**
   * Glass effect variant.
   */
  glassVariant?: "shine" | "perfume";

  /**
   * Glass effect intensity (1-5).
   */
  glassIntensity?: number;

  /**
   * Random hue for perfume variant.
   */
  glassRandomHue?: boolean;

  /**
   * RTL mode: flips glass effect gradient direction (right-to-left sweep).
   */
  isRtl?: boolean;

  /**
   * Additional CSS class.
   */
  className?: string;

  /**
   * Inline styles.
   */
  style?: React.CSSProperties;

  /**
   * Data attributes.
   */
  [key: `data-${string}`]: any;
}

/**
 * Common badge configuration.
 */
export interface BadgeConfig {
  content: string | number;
  variant?: "default" | "primary" | "success" | "warning" | "danger" | "info";
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

/**
 * Common loading state.
 */
export interface LoadingConfig {
  loading?: boolean;
  loadingText?: string;
}

/**
 * Common error state.
 */
export interface ErrorConfig {
  message: string;
  retry?: () => void;
}

/**
 * Common empty state.
 */
export interface EmptyStateConfig {
  message?: string;
  icon?: LucideIcon;
  action?: {
    label: string;
    onClick: () => void;
  };
}
