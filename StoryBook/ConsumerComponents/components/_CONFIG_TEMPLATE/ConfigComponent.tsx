import * as React from "react";
import { GlassEffectWrapper } from "../GlassEffectWrapper";
import { cn } from "../../utils/cn";
import { ComponentWrapperProps } from "../../types/component-config.types";
import styles from "./ConfigComponent.module.css";

/**
 * Component-specific config interface.
 */
export interface ConfigComponentConfig {
  title?: string;
  content?: React.ReactNode;
}

/**
 * Component props.
 */
export interface ConfigComponentProps
  extends ComponentWrapperProps<ConfigComponentConfig> {
  children?: React.ReactNode;
}

/**
 * ConfigComponent - A config-driven component.
 */
export const ConfigComponent = React.forwardRef<
  HTMLDivElement,
  ConfigComponentProps
>(
  (
    {
      config,
      children,
      glassEffect = false,
      glassVariant = "shine",
      glassRandomHue = false,
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const hasContent = !!config?.content || !!children;

    const content = (
      <div
        ref={ref}
        className={cn(styles.root, className)}
        style={style}
        {...rest}
      >
        {config?.title && <div className={styles.title}>{config.title}</div>}
        {hasContent && (
          <div className={styles.content}>{config?.content || children}</div>
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
          {content}
        </GlassEffectWrapper>
      );
    }

    return content;
  }
);

ConfigComponent.displayName = "ConfigComponent";
