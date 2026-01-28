import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../utils/cn";
import styles from "./glass-effect.module.css";

export interface GlassEffectWrapperProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean;
  glassEffect?: boolean;
  variant?: "shine" | "perfume";
  randomHue?: boolean;
  className?: string;
}

export const GlassEffectWrapper = React.forwardRef<HTMLElement, GlassEffectWrapperProps>(
  (
    {
      asChild = true,
      glassEffect = true,
      variant = "shine",
      randomHue = false,
      className,
      onMouseEnter,
      onMouseLeave,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const [randomHueValue, setRandomHueValue] = React.useState(0);

    const handleMouseEnter = React.useCallback(
      (e: React.MouseEvent<HTMLElement>) => {
        if (glassEffect && variant === "perfume" && randomHue) {
          const hue = Math.floor(Math.random() * 360);
          setRandomHueValue(hue);
          e.currentTarget.style.setProperty("--random-hue", `${hue}deg`);
        }
        onMouseEnter?.(e);
      },
      [glassEffect, variant, randomHue, onMouseEnter]
    );

    const handleMouseLeave = React.useCallback(
      (e: React.MouseEvent<HTMLElement>) => {
        if (glassEffect && variant === "perfume" && randomHue) {
          setRandomHueValue(0);
          e.currentTarget.style.setProperty("--random-hue", "0deg");
        }
        onMouseLeave?.(e);
      },
      [glassEffect, variant, randomHue, onMouseLeave]
    );

    const glassClass = React.useMemo(() => {
      if (!glassEffect) return "";
      return variant === "perfume" ? styles.perfumeGlass : styles.glassShine;
    }, [glassEffect, variant]);

    const mergedStyle = React.useMemo(() => {
      if (!glassEffect || variant !== "perfume" || !randomHue) {
        return style;
      }
      return {
        ...style,
        "--random-hue": `${randomHueValue}deg`,
      } as React.CSSProperties;
    }, [glassEffect, variant, randomHue, randomHueValue, style]);

    if (asChild) {
      return (
        <Slot
          ref={ref as any}
          className={cn(glassClass, className)}
          style={mergedStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={cn(glassClass, className)}
        style={mergedStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassEffectWrapper.displayName = "GlassEffectWrapper";
