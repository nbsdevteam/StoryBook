import type { Meta, StoryObj } from "@storybook/react";
import { Accordion, type AccordionProps } from "@consumer/components/Accordion";
import { Settings, Shield } from "lucide-react";

const meta: Meta<AccordionProps> = {
  title: "Components/Accordion",
  component: Accordion,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<AccordionProps>;

export const Basic: Story = {
  args: {
    config: {
      items: [
        {
          id: "q1",
          trigger: { label: "What is this product?" },
          content: "This is a comprehensive component library.",
        },
        {
          id: "q2",
          trigger: { label: "How do I get started?" },
          content: "Install the package and import styles.",
        },
      ],
      type: "single",
      collapsible: true,
      variant: "bordered",
    },
  },
};

export const WithIcons: Story = {
  args: {
    config: {
      items: [
        {
          id: "general",
          trigger: { label: "General Settings", icon: Settings },
          content: "General settings content.",
        },
        {
          id: "security",
          trigger: { label: "Security Settings", icon: Shield },
          content: "Security settings content.",
        },
      ],
      type: "multiple",
      defaultOpen: ["general"],
      variant: "separated",
    },
  },
};
