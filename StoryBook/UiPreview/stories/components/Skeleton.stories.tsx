import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton, type SkeletonProps } from "@consumer/components/Skeleton";

const meta: Meta<SkeletonProps> = {
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<SkeletonProps>;

export const Basic: Story = {
  args: {
    width: "100%",
    height: "1rem",
  },
};

export const Circle: Story = {
  args: {
    width: 48,
    height: 48,
    circle: true,
  },
};
