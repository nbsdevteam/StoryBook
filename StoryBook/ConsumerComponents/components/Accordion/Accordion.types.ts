import * as React from "react";
import { LucideIcon } from "lucide-react";
import { ComponentWrapperProps } from "../../types/component-config.types";

export interface AccordionConfig {
  items: AccordionItem[];
  type?: "single" | "multiple";
  defaultOpen?: string[];
  openItems?: string[];
  onOpenChange?: (openItems: string[]) => void;
  collapsible?: boolean;
  variant?: "default" | "bordered" | "separated" | "ghost";
  iconPosition?: "left" | "right";
  icons?: {
    expand?: LucideIcon;
    collapse?: LucideIcon;
  };
  animated?: boolean;
}

export interface AccordionItem {
  id: string;
  trigger: {
    label: string;
    icon?: LucideIcon;
    subtitle?: string;
    customComponent?: React.ComponentType<any>;
    className?: string;
  };
  content: React.ReactNode;
  disabled?: boolean;
  badge?: {
    content: string | number;
    variant?: "default" | "primary" | "success" | "warning" | "danger";
  };
  loading?: boolean;
  contentClassName?: string;
}

export interface AccordionProps extends ComponentWrapperProps<AccordionConfig> {}
