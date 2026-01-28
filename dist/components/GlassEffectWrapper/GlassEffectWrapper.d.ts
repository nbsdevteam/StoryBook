import * as React from "react";
export interface GlassEffectWrapperProps extends React.HTMLAttributes<HTMLElement> {
    asChild?: boolean;
    glassEffect?: boolean;
    variant?: "shine" | "perfume";
    randomHue?: boolean;
    className?: string;
}
export declare const GlassEffectWrapper: React.ForwardRefExoticComponent<GlassEffectWrapperProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=GlassEffectWrapper.d.ts.map