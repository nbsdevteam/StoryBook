import type { Meta, StoryObj } from "@storybook/react";
import { Progress, type ProgressProps } from "@consumer/components/Progress";

const meta: Meta<ProgressProps> = {
  title: "Components/Progress",
  component: Progress,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<ProgressProps>;

export const Basic: Story = {
  args: {
    value: 45,
    max: 100,
    showLabel: true,
  },
};
