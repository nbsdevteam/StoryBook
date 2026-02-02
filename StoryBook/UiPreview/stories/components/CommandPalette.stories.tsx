import type { Meta, StoryObj } from "@storybook/react";
import { CommandPalette, type CommandPaletteProps } from "@consumer/components/CommandPalette";
import { Home, Settings } from "lucide-react";

const meta: Meta<CommandPaletteProps> = {
  title: "Components/CommandPalette",
  component: CommandPalette,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<CommandPaletteProps>;

export const Basic: Story = {
  args: {
    config: {
      open: true,
      onOpenChange: () => undefined,
      placeholder: "Type a command...",
      showShortcuts: true,
      groups: [
        {
          heading: "Navigation",
          commands: [
            { id: "home", label: "Go Home", icon: Home, onSelect: () => undefined, shortcut: "H" },
            { id: "settings", label: "Settings", icon: Settings, onSelect: () => undefined, shortcut: "S" },
          ],
        },
      ],
    },
  },
};
