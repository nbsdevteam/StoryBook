import * as React from "react";
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
export declare const GlassEffectWrapper: React.ForwardRefExoticComponent<GlassEffectWrapperProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=GlassEffectWrapper.d.ts.map