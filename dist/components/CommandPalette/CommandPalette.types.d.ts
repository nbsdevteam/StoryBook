import { LucideIcon } from "lucide-react";
import { ComponentWrapperProps } from "../../types/component-config.types";
export interface CommandPaletteConfig {
    groups: CommandGroup[];
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    placeholder?: string;
    emptyMessage?: string;
    shortcut?: string;
    showShortcuts?: boolean;
}
export interface CommandGroup {
    heading?: string;
    commands: Command[];
}
export interface Command {
    id: string;
    label: string;
    icon?: LucideIcon;
    onSelect: () => void;
    shortcut?: string;
    keywords?: string[];
    disabled?: boolean;
}
export interface CommandPaletteProps extends ComponentWrapperProps<CommandPaletteConfig> {
}
//# sourceMappingURL=CommandPalette.types.d.ts.map