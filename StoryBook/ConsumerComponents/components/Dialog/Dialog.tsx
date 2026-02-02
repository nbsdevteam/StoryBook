import * as React from "react";
import { X } from "react-feather";
import { GlassEffectWrapper } from "../GlassEffectWrapper";
import { Button } from "../Button";
import { cn } from "../../utils/cn";
import styles from "./Dialog.module.css";
import { DialogProps } from "./Dialog.types";

export const Dialog: React.FC<DialogProps> = ({
  config,
  children,
  glassEffect = false,
  glassVariant = "shine",
  glassRandomHue = false,
  className,
  style,
}) => {
  const isOpen = !!config?.open;
  const dialogRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  React.useEffect(() => {
    if (isOpen && config?.trapFocus) {
      dialogRef.current?.focus();
    }
  }, [isOpen, config?.trapFocus]);

  React.useEffect(() => {
    if (!isOpen || config?.closeOnEscape === false) return;
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        config?.onOpenChange?.(false);
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [config, isOpen]);

  if (!isOpen) return null;

  const Icon = config?.icon?.component;
  const hasHeader =
    !!config?.customHeader ||
    !!config?.title ||
    !!config?.description ||
    !!config?.icon;
  const hasFooter = !!config?.footer?.actions;
  const showOverlay = config?.showOverlay !== false;
  const allowOverlayClose = config?.closeOnOverlayClick !== false;

  const dialogContent = (
    <div
      className={cn(
        styles.dialog,
        styles[`size_${config?.size ?? "md"}`],
        styles[`variant_${config?.variant ?? "default"}`],
        className
      )}
      style={style}
      role="dialog"
      aria-modal="true"
      aria-labelledby={config?.title ? "dialog-title" : undefined}
      tabIndex={-1}
      ref={dialogRef}
    >
      {hasHeader && (
        <div className={styles.header}>
          {config?.customHeader ? (
            <config.customHeader />
          ) : (
            <>
              {Icon && (
                <Icon
                  className={cn(
                    styles.headerIcon,
                    styles[`icon_${config?.icon?.variant ?? "default"}`]
                  )}
                />
              )}
              <div className={styles.headerText}>
                {config?.title && (
                  <h2 id="dialog-title" className={styles.title}>
                    {config.title}
                  </h2>
                )}
                {config?.description && (
                  <p className={styles.description}>{config.description}</p>
                )}
              </div>
            </>
          )}
          {config?.showCloseButton !== false && (
            <button
              type="button"
              className={styles.closeButton}
              aria-label="Close"
              onClick={() => config?.onOpenChange?.(false)}
            >
              <X size={20} />
            </button>
          )}
        </div>
      )}

      <div
        className={cn(
          styles.body,
          config?.scrollBehavior === "outside"
            ? styles.bodyScrollOutside
            : styles.bodyScrollInside
        )}
      >
        {config?.content ?? children}
      </div>

      {hasFooter && (
        <div
          className={cn(
            styles.footer,
            styles[`footer_${config?.footer?.alignment ?? "right"}`]
          )}
        >
          {config?.footer?.actions?.custom}
          {config?.footer?.actions?.tertiary && (
            <Button
              variant="secondary"
              size="small"
              disabled={config.footer.actions.tertiary.disabled}
              onClick={config.footer.actions.tertiary.onClick}
            >
              {config.footer.actions.tertiary.label}
            </Button>
          )}
          {config?.footer?.actions?.secondary && (
            <Button
              variant="secondary"
              size="small"
              disabled={config.footer.actions.secondary.disabled}
              onClick={config.footer.actions.secondary.onClick}
            >
              {config.footer.actions.secondary.label}
            </Button>
          )}
          {config?.footer?.actions?.primary && (
            <Button
              variant={
                config.footer.actions.primary.variant === "danger"
                  ? "danger"
                  : "primary"
              }
              size="small"
              disabled={config.footer.actions.primary.disabled}
              loading={config.footer.actions.primary.loading}
              onClick={config.footer.actions.primary.onClick}
            >
              {config.footer.actions.primary.icon && (
                <config.footer.actions.primary.icon size={14} />
              )}
              {config.footer.actions.primary.label}
            </Button>
          )}
        </div>
      )}

      {config?.loading && (
        <div className={styles.loadingOverlay}>Loading...</div>
      )}
    </div>
  );

  const wrappedContent = glassEffect ? (
    <GlassEffectWrapper
      asChild
      glassEffect
      variant={glassVariant}
      randomHue={glassVariant === "perfume" ? glassRandomHue : undefined}
    >
      {dialogContent}
    </GlassEffectWrapper>
  ) : (
    dialogContent
  );

  if (!showOverlay) {
    return wrappedContent;
  }

  return (
    <div
      className={cn(
        styles.overlay,
        config?.overlayBlur ? styles.overlayBlur : ""
      )}
      onClick={allowOverlayClose ? () => config?.onOpenChange?.(false) : undefined}
    >
      <div onClick={(event) => event.stopPropagation()}>{wrappedContent}</div>
    </div>
  );
};

export default Dialog;
