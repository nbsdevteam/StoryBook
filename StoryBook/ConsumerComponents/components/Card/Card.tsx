import * as React from "react";
import { ChevronDown, ChevronRight, RefreshCcw } from "lucide-react";
import { GlassEffectWrapper } from "../GlassEffectWrapper";
import { Button } from "../Button";
import { cn } from "../../utils/cn";
import styles from "./Card.module.css";
import { CardProps, CardConfig } from "./Card.types";

const buildLegacyConfig = (props: CardProps): CardConfig | undefined => {
  const {
    title,
    subtitle,
    children,
    footer,
    header,
    shadow,
    bordered,
    hoverEffect,
  } = props;

  if (!title && !subtitle && !children && !footer && !header) {
    return undefined;
  }

  return {
    header: header
      ? {
          customComponent: () => <>{header}</>,
        }
      : title || subtitle
        ? { title, subtitle }
        : undefined,
    content: children,
    footer: footer ? { content: footer } : undefined,
    variant: bordered === false ? "ghost" : "default",
    size: "md",
    interactive: false,
    hoverEffect,
    loading: false,
    error: undefined,
  };
};

export const Card: React.FC<CardProps> = ({
  config,
  title,
  subtitle,
  children,
  footer,
  header,
  imageSrc,
  imageAlt = "Card image",
  className,
  style,
  shadow = true,
  bordered = true,
  hoverEffect = true,
  glassEffect = false,
  glassVariant = "shine",
  glassRandomHue = false,
}) => {
  const resolvedConfig = config ?? buildLegacyConfig({
    title,
    subtitle,
    children,
    footer,
    header,
    shadow,
    bordered,
    hoverEffect,
  });
  const effectiveHoverEffect = resolvedConfig?.hoverEffect ?? hoverEffect ?? true;

  const [collapsed, setCollapsed] = React.useState(
    resolvedConfig?.collapsible ? !!resolvedConfig?.defaultCollapsed : false
  );

  const hasHeader =
    !!resolvedConfig?.header &&
    (resolvedConfig.header.title ||
      resolvedConfig.header.subtitle ||
      resolvedConfig.header.customComponent ||
      resolvedConfig.header.actions?.length);
  const hasFooter =
    !!resolvedConfig?.footer &&
    (resolvedConfig.footer.content ||
      resolvedConfig.footer.actions?.primary ||
      resolvedConfig.footer.actions?.secondary ||
      resolvedConfig.footer.actions?.additional?.length);
  const footerAlignment =
    resolvedConfig?.footer?.alignment ??
    (resolvedConfig?.footer?.content ? "space-between" : "right");
  const contentNode = children ?? resolvedConfig?.content;
  const hasContent = !!contentNode;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!resolvedConfig?.interactive) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      resolvedConfig.onClick?.();
    }
  };

  const cardRoot = (
    <div
      className={cn(
        styles.cardRoot,
        styles[`variant_${resolvedConfig?.variant ?? "default"}`],
        styles[`size_${resolvedConfig?.size ?? "md"}`],
        shadow ? styles.shadow : styles.noShadow,
        bordered ? styles.bordered : styles.noBorder,
        effectiveHoverEffect ? styles.hoverEffect : "",
        resolvedConfig?.interactive ? styles.interactive : "",
        className
      )}
      style={style}
      onClick={resolvedConfig?.interactive ? resolvedConfig.onClick : undefined}
      onKeyDown={handleKeyDown}
      tabIndex={resolvedConfig?.interactive ? 0 : undefined}
      role={resolvedConfig?.interactive ? "button" : undefined}
      data-padding={resolvedConfig?.contentPadding ?? "md"}
      data-loading={resolvedConfig?.loading ? "true" : "false"}
    >
      {resolvedConfig?.badge && (
        <div
          className={cn(
            styles.badge,
            styles[`badge_${resolvedConfig.badge.variant ?? "default"}`],
            styles[
              `badge_${resolvedConfig.badge.position ?? "top-right"}`
            ]
          )}
        >
          {resolvedConfig.badge.content}
        </div>
      )}

      {imageSrc && (
        <img src={imageSrc} className={styles.image} alt={imageAlt} />
      )}

      {hasHeader && (
        <div
          className={cn(
            styles.header,
            resolvedConfig?.header?.className
          )}
        >
          {resolvedConfig?.collapsible && (
            <button
              type="button"
              className={styles.collapseButton}
              onClick={() => setCollapsed((prev) => !prev)}
              aria-expanded={!collapsed}
            >
              {collapsed ? <ChevronRight /> : <ChevronDown />}
            </button>
          )}
          {resolvedConfig?.header?.customComponent ? (
            <resolvedConfig.header.customComponent />
          ) : (
            <div className={styles.headerContent}>
              {resolvedConfig?.header?.icon && (
                <resolvedConfig.header.icon
                  className={cn(
                    styles.headerIcon,
                    styles[
                      `icon_${resolvedConfig.header.iconVariant ?? "default"}`
                    ]
                  )}
                />
              )}
              <div className={styles.headerText}>
                {resolvedConfig?.header?.title && (
                  <div className={styles.title}>
                    {resolvedConfig.header.title}
                  </div>
                )}
                {resolvedConfig?.header?.subtitle && (
                  <div className={styles.subtitle}>
                    {resolvedConfig.header.subtitle}
                  </div>
                )}
              </div>
              {resolvedConfig?.header?.actions?.length ? (
                <div className={styles.headerActions}>
                  {resolvedConfig.header.actions.map((action, idx) => (
                    <div key={idx} className={styles.headerActionItem}>
                      {action}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          )}
        </div>
      )}

      {resolvedConfig?.error ? (
        <div className={styles.errorState}>
          <div className={styles.errorMessage}>
            {resolvedConfig.error.message}
          </div>
          {resolvedConfig.error.retry && (
            <Button
              variant="outline-primary"
              size="small"
              onClick={resolvedConfig.error.retry}
            >
              <span className={styles.errorRetryIcon}>
                <RefreshCcw size={14} />
              </span>
              Retry
            </Button>
          )}
        </div>
      ) : (
        !collapsed &&
        hasContent && (
          <div className={styles.body}>
            <div className={styles.content}>{contentNode}</div>
          </div>
        )
      )}

      {hasFooter && !collapsed && (
        <div
          className={cn(
            styles.footer,
            styles[`footer_${footerAlignment}`],
            resolvedConfig?.footer?.className
          )}
        >
          {resolvedConfig?.footer?.content && (
            <div className={styles.footerContent}>
              {resolvedConfig.footer.content}
            </div>
          )}
          {(resolvedConfig?.footer?.actions?.primary ||
            resolvedConfig?.footer?.actions?.secondary ||
            resolvedConfig?.footer?.actions?.additional?.length) && (
            <div className={styles.footerActions}>
              {resolvedConfig?.footer?.actions?.secondary && (
                <Button
                  variant="outline-secondary"
                  size="small"
                  disabled={resolvedConfig.footer.actions.secondary.disabled}
                  onClick={resolvedConfig.footer.actions.secondary.onClick}
                >
                  {resolvedConfig.footer.actions.secondary.icon && (
                    <resolvedConfig.footer.actions.secondary.icon
                      size={14}
                      className={styles.footerActionIcon}
                    />
                  )}
                  {resolvedConfig.footer.actions.secondary.label}
                </Button>
              )}
              {resolvedConfig?.footer?.actions?.primary && (
                <Button
                  variant="primary"
                  size="small"
                  disabled={resolvedConfig.footer.actions.primary.disabled}
                  loading={resolvedConfig.footer.actions.primary.loading}
                  onClick={resolvedConfig.footer.actions.primary.onClick}
                >
                  {resolvedConfig.footer.actions.primary.icon && (
                    <resolvedConfig.footer.actions.primary.icon
                      size={14}
                      className={styles.footerActionIcon}
                    />
                  )}
                  {resolvedConfig.footer.actions.primary.label}
                </Button>
              )}
              {resolvedConfig?.footer?.actions?.additional?.map((action, idx) => (
                <div key={idx} className={styles.footerActionItem}>
                  {action}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );

  if (glassEffect) {
    return (
      <GlassEffectWrapper
        asChild
        glassEffect
        variant={glassVariant}
        randomHue={glassVariant === "perfume" ? glassRandomHue : undefined}
      >
        {cardRoot}
      </GlassEffectWrapper>
    );
  }

  return cardRoot;
};

export default Card;