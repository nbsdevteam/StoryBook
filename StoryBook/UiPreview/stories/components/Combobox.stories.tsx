import type { Meta, StoryObj } from "@storybook/react";
import { Combobox, type ComboboxProps } from "@consumer/components/Combobox";

const meta: Meta<ComboboxProps> = {
  title: "Components/Combobox",
  component: Combobox,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<ComboboxProps>;

export const Basic: Story = {
  args: {
    config: {
      options: [
        { label: "Apple", value: "apple" },
        { label: "Banana", value: "banana" },
        { label: "Cherry", value: "cherry" },
      ],
      placeholder: "Select fruit",
    },
  },
};
