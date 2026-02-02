import * as React from "react";
export interface TooltipProps {
    content: React.ReactNode;
    children: React.ReactNode;
    position?: "top" | "right" | "bottom" | "left";
    className?: string;
}
export declare const Tooltip: React.FC<TooltipProps>;
export default Tooltip;
//# sourceMappingURL=Tooltip.d.ts.map