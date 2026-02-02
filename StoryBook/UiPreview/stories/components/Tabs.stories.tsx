import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, type TabsProps } from "@consumer/components/Tabs";
import { Mail, Send, FileText } from "lucide-react";

const meta: Meta<TabsProps> = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<TabsProps>;

export const Basic: Story = {
  args: {
    config: {
      tabs: [
        { id: "overview", label: "Overview", content: "Overview content" },
        { id: "analytics", label: "Analytics", content: "Analytics content" },
        { id: "settings", label: "Settings", content: "Settings content" },
      ],
      defaultTab: "overview",
      variant: "underline",
    },
  },
};

export const WithIcons: Story = {
  args: {
    config: {
      tabs: [
        {
          id: "inbox",
          label: "Inbox",
          icon: Mail,
          badge: { content: 5, variant: "primary" },
          content: "Inbox content",
        },
        { id: "sent", label: "Sent", icon: Send, content: "Sent content" },
        {
          id: "drafts",
          label: "Drafts",
          icon: FileText,
          badge: { content: 2, variant: "warning" },
          content: "Drafts content",
        },
      ],
      variant: "pills",
      showIndicators: true,
    },
  },
};
