import type { Meta, StoryObj } from "@storybook/react";
import { Separator, type SeparatorProps } from "@consumer/components/Separator";

const meta: Meta<SeparatorProps> = {
  title: "Components/Separator",
  component: Separator,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<SeparatorProps>;

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
  },
};
