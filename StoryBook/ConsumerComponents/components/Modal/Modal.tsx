import * as React from "react";
import { Dialog } from "../Dialog";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  centered?: boolean;
  backdrop?: boolean | "static";
  keyboard?: boolean;
  className?: string;
  dialogClassName?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
  centered = false,
  backdrop = true,
  keyboard = true,
  className = "",
  dialogClassName = "",
}) => {
  const dialogSize =
    size === "xl" ? "xl" : size === "lg" ? "lg" : size === "sm" ? "sm" : "md";

  return (
    <Dialog
      config={{
        open: isOpen,
        onOpenChange: (open) => {
          if (!open) onClose();
        },
        title,
        content: children,
        footer: footer ? { actions: { custom: footer } } : undefined,
        size: dialogSize,
        showOverlay: backdrop !== false,
        closeOnOverlayClick: backdrop !== "static",
        closeOnEscape: keyboard !== false,
        showCloseButton: true,
      }}
      className={className}
      data-dialog-class={dialogClassName}
      data-centered={centered ? "true" : "false"}
    />
  );
};

export default Modal;
