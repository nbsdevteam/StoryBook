import type { Meta, StoryObj } from "@storybook/react";
import { Form, type FormProps } from "@consumer/components/Form";

const meta: Meta<FormProps> = {
  title: "Components/Form",
  component: Form,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<FormProps>;

export const Basic: Story = {
  args: {
    config: {
      fields: [
        { name: "name", label: "Name", type: "text", required: true },
        { name: "email", label: "Email", type: "email", required: true },
        { name: "message", label: "Message", type: "textarea" },
      ],
      onSubmit: () => undefined,
      submitButton: { label: "Send" },
      showRequiredIndicators: true,
    },
  },
};
