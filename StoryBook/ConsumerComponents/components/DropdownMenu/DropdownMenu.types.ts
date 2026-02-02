import * as React from "react";
import { LucideIcon } from "lucide-react";
import { ComponentWrapperProps } from "../../types/component-config.types";

export interface DropdownMenuConfig {
  items: DropdownMenuItem[];
  trigger?: {
    label?: string;
    icon?: LucideIcon;
    variant?: "default" | "outline" | "ghost";
    customComponent?: React.ReactNode;
  };
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface DropdownMenuItem {
  type: "item" | "checkbox" | "radio" | "separator" | "label" | "sub";
  id?: string;
  label?: string;
  icon?: LucideIcon;
  onClick?: () => void;
  disabled?: boolean;
  checked?: boolean;
  shortcut?: string;
  children?: DropdownMenuItem[];
  destructive?: boolean;
  className?: string;
}

export interface DropdownMenuProps
  extends ComponentWrapperProps<DropdownMenuConfig> {}
