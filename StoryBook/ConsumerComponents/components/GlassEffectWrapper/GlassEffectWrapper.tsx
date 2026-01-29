import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../utils/cn";
import styles from "./glass-effect.module.css";

export interface GlassEffectWrapperProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean;
  glassEffect?: boolean;
  variant?: "shine" | "perfume";
  randomHue?: boolean;
  /**
   * Optional stable seed for deterministic hue selection.
   * Useful for reduced-motion users or when you want consistent colors per item.
   */
  hueSeed?: string | number;
  className?: string;
}

// Pre-calculated stable hue values to avoid Math.random() causing flashing
const STABLE_HUES = [
  180, 200, 220, 240, 260, 280, 300, 320, 340, 0, 20, 40, 60, 80, 100, 120, 140, 160
];

export const GlassEffectWrapper = React.forwardRef<HTMLElement, GlassEffectWrapperProps>(
  (
    {
      asChild = true,
      glassEffect = true,
      variant = "shine",
      randomHue = false,
      hueSeed,
      className,
      onMouseEnter,
      onMouseLeave,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const shouldRandomHue = glassEffect && variant === "perfume" && randomHue;
    const hueIndexRef = React.useRef(0);

    const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

    React.useEffect(() => {
      if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;

      const media = window.matchMedia("(prefers-reduced-motion: reduce)");
      const onChange = () => setPrefersReducedMotion(media.matches);

      onChange();
      media.addEventListener?.("change", onChange);
      return () => media.removeEventListener?.("change", onChange);
    }, []);

    const seededHue = React.useMemo(() => {
      if (hueSeed === undefined || hueSeed === null) return STABLE_HUES[0];
      if (typeof hueSeed === "number") {
        const idx = Math.abs(hueSeed) % STABLE_HUES.length;
        return STABLE_HUES[idx];
      }
      // Simple deterministic string hash (KISS; good enough for hue selection)
      let hash = 0;
      for (let i = 0; i < hueSeed.length; i++) {
        hash = (hash * 31 + hueSeed.charCodeAt(i)) | 0;
      }
      const idx = Math.abs(hash) % STABLE_HUES.length;
      return STABLE_HUES[idx];
    }, [hueSeed]);

    const setHue = React.useCallback((el: HTMLElement, hue: number) => {
      requestAnimationFrame(() => {
        el.style.setProperty("--random-hue", `${hue}deg`);
      });
    }, []);

    const handleMouseEnter = React.useCallback(
      (e: React.MouseEvent<HTMLElement>) => {
        if (shouldRandomHue) {
          const el = e.currentTarget;
          
          if (prefersReducedMotion) {
            // Reduced-motion: stable deterministic hue (no cycling)
            setHue(el, seededHue);
          } else if (hueSeed !== undefined && hueSeed !== null) {
            // FIXED: Just use the seededHue directly - it's already calculated!
            setHue(el, seededHue);
          } else {
            // No seed: cycle from 0
            hueIndexRef.current = (hueIndexRef.current + 1) % STABLE_HUES.length;
            setHue(el, STABLE_HUES[hueIndexRef.current]);
          }
        }
        onMouseEnter?.(e);
      },
      [shouldRandomHue, prefersReducedMotion, seededHue, hueSeed, onMouseEnter, setHue]
    );

    const handleMouseLeave = React.useCallback(
      (e: React.MouseEvent<HTMLElement>) => {
        if (shouldRandomHue) {
          // Reset to baseline; tinted styles only apply on :hover anyway.
          setHue(e.currentTarget, 0);
        }
        onMouseLeave?.(e);
      },
      [shouldRandomHue, onMouseLeave, setHue]
    );

    const glassClass = React.useMemo(() => {
      if (!glassEffect) return "";
      return variant === "perfume" ? styles.perfumeGlass : styles.glassShine;
    }, [glassEffect, variant]);

    const dataRandomHue = shouldRandomHue ? "true" : undefined;

    const slotProps = {
      ref: ref as any,
      className: cn(glassClass, className),
      style,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      "data-random-hue": dataRandomHue,
      ...props,
    };

    if (asChild) {
      return <Slot {...slotProps}>{children}</Slot>;
    }

    return (
      <div {...slotProps}>
        {children}
      </div>
    );
  }
);

GlassEffectWrapper.displayName = "GlassEffectWrapper";