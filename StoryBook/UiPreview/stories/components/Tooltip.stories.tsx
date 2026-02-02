import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip, type TooltipProps } from "@consumer/components/Tooltip";
import { Button } from "@consumer/components/Button";

const meta: Meta<TooltipProps> = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<TooltipProps>;

export const Basic: Story = {
  args: {
    content: "Tooltip text",
    children: <Button>Hover me</Button>,
  },
};
