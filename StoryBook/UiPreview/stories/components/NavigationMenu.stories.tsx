import type { Meta, StoryObj } from "@storybook/react";
import { NavigationMenu, type NavigationMenuProps } from "@consumer/components/NavigationMenu";
import { Home, Settings } from "lucide-react";

const meta: Meta<NavigationMenuProps> = {
  title: "Components/NavigationMenu",
  component: NavigationMenu,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<NavigationMenuProps>;

export const Basic: Story = {
  args: {
    config: {
      items: [
        { id: "home", label: "Home", icon: Home },
        {
          id: "settings",
          label: "Settings",
          icon: Settings,
          children: [
            { id: "profile", label: "Profile" },
            { id: "billing", label: "Billing" },
          ],
        },
      ],
      orientation: "horizontal",
      variant: "underline",
      showIcons: true,
    },
  },
};
