import type { Meta, StoryObj } from "@storybook/react";
import { DropdownMenu, type DropdownMenuProps } from "@consumer/components/DropdownMenu";
import { MoreVertical } from "lucide-react";

const meta: Meta<DropdownMenuProps> = {
  title: "Components/DropdownMenu",
  component: DropdownMenu,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<DropdownMenuProps>;

export const Basic: Story = {
  args: {
    config: {
      trigger: { label: "Actions", icon: MoreVertical },
      items: [
        { type: "item", label: "New File", onClick: () => undefined },
        { type: "item", label: "Open", onClick: () => undefined },
        { type: "separator" },
        { type: "item", label: "Delete", onClick: () => undefined, destructive: true },
      ],
    },
  },
};
