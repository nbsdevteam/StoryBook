import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb, type BreadcrumbProps } from "@consumer/components/Breadcrumb";
import { Home } from "lucide-react";

const meta: Meta<BreadcrumbProps> = {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<BreadcrumbProps>;

export const Basic: Story = {
  args: {
    config: {
      items: [
        { label: "Home", href: "/", icon: Home },
        { label: "Products", href: "/products" },
        { label: "Electronics", href: "/products/electronics" },
        { label: "Laptops" },
      ],
      separator: "chevron",
      maxItems: 4,
      showHome: true,
    },
  },
};
