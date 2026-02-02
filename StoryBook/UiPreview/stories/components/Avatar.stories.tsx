import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, type AvatarProps } from "@consumer/components/Avatar";

const meta: Meta<AvatarProps> = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<AvatarProps>;

export const Basic: Story = {
  args: {
    fallback: "SN",
    size: "md",
  },
};
