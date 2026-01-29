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

// Pre-calculated stable hue values - MAXIMALLY different colors
const STABLE_HUES = [
  0,    // Red
  120,  // Green
  240,  // Blue
  60,   // Yellow
  180,  // Cyan
  300,  // Magenta
  30,   // Orange
  90,   // Yellow-green
  150,  // Cyan-green
  210,  // Sky blue
  270,  // Purple
  330,  // Pink
  45,   // Orange-yellow
  135,  // Green-cyan
  225,  // Blue-purple
  315,  // Pink-red
  15,   // Red-orange
  105,  // Green-yellow
];

// Use WeakMap to track instance numbers per component to survive strict mode
const instanceMap = new WeakMap<object, number>();
let globalCounter = 0;

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
    const shouldRandomHue = glassEffect && variant === "perfume" && randomHue;

    // Use a stable reference object that survives strict mode double-mounting
    const instanceRef = React.useRef<object>({});

    // Get or create instance number
    const getInstanceNumber = () => {
      if (!instanceMap.has(instanceRef.current)) {
        instanceMap.set(instanceRef.current, globalCounter++);
      }
      return instanceMap.get(instanceRef.current)!;
    };

    const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

    React.useEffect(() => {
      if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;

      const media = window.matchMedia("(prefers-reduced-motion: reduce)");
      const onChange = () => setPrefersReducedMotion(media.matches);

      onChange();
      media.addEventListener?.("change", onChange);
      return () => media.removeEventListener?.("change", onChange);
    }, []);

    // Get stable hue based on instance number
    const stableHue = React.useMemo(() => {
      const instanceNum = getInstanceNumber();
      const idx = instanceNum % STABLE_HUES.length;
      const hue = STABLE_HUES[idx];
      return hue;
    }, []);

    const setHue = React.useCallback((el: HTMLElement, hue: number) => {
      requestAnimationFrame(() => {
        el.style.setProperty("--random-hue", `${hue}deg`);
      });
    }, []);

    const handleMouseEnter = React.useCallback(
      (e: React.MouseEvent<HTMLElement>) => {
        if (shouldRandomHue) {
          const el = e.currentTarget;
          setHue(el, stableHue);
        }
        onMouseEnter?.(e);
      },
      [shouldRandomHue, stableHue, onMouseEnter, setHue]
    );

    const handleMouseLeave = React.useCallback(
      (e: React.MouseEvent<HTMLElement>) => {
        if (shouldRandomHue) {
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