import * as React from "react";
import { LucideIcon } from "lucide-react";
import {
  BadgeConfig,
  ComponentWrapperProps,
} from "../../types/component-config.types";

export interface CardConfig {
  header?: {
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
    icon?: LucideIcon;
    iconVariant?: "default" | "primary" | "success" | "warning" | "danger";
    actions?: React.ReactNode[];
    customComponent?: React.ComponentType<any>;
    className?: string;
    glassEffect?: boolean;
  };

  content?: React.ReactNode;
  contentPadding?: "none" | "sm" | "md" | "lg";

  footer?: {
    content?: React.ReactNode;
    actions?: {
      primary?: {
        label: string;
        onClick: () => void;
        loading?: boolean;
        disabled?: boolean;
        icon?: LucideIcon;
      };
      secondary?: {
        label: string;
        onClick: () => void;
        disabled?: boolean;
        icon?: LucideIcon;
      };
      additional?: React.ReactNode[];
    };
    alignment?: "left" | "center" | "right" | "space-between";
    className?: string;
    glassEffect?: boolean;
  };

  variant?: "default" | "outlined" | "elevated" | "filled" | "ghost";
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onClick?: () => void;
  loading?: boolean;
  error?: {
    message: string;
    retry?: () => void;
  };
  badge?: BadgeConfig;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

export interface CardProps extends ComponentWrapperProps<CardConfig> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  header?: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  shadow?: boolean;
  bordered?: boolean;
}
