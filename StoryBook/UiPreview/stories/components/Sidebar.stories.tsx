import type { Meta, StoryObj } from '@storybook/react';
import {
  Sidebar,
  SidebarHeader,
  type SidebarConfig,
  type SidebarItem,
} from '@consumer/components/Sidebar';
import {
  LayoutDashboard,
  PhoneIncoming,
  PhoneCall,
  Users,
  CreditCard,
  FileText,
  MessageSquare,
  UserCheck,
  Ticket,
  BarChart3,
  Settings,
  ChevronRight,
} from 'lucide-react';

const meta: Meta<typeof Sidebar> = {
  title: 'Components/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    glassEffect: false,
    randomHue: false,
  },
  decorators: [
    (Story) => (
      <div style={{ height: '100vh', display: 'flex' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    title: {
      control: 'text',
      description: 'Sidebar title',
    },
    glassEffect: {
      control: 'boolean',
      description: 'Enable glass effect on hover',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems: SidebarItem[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    onClick: (href) => console.log('Navigate to:', href),
  },
  {
    name: 'Call Queue',
    href: '/call-queue',
    icon: PhoneIncoming,
    onClick: (href) => console.log('Navigate to:', href),
  },
  {
    name: 'Active Calls',
    href: '/active-calls',
    icon: PhoneCall,
    onClick: (href) => console.log('Navigate to:', href),
  },
  {
    name: 'Customers',
    href: '/customers',
    icon: Users,
    onClick: (href) => console.log('Navigate to:', href),
  },
  {
    name: 'Customers Card',
    href: '/customers-card',
    icon: CreditCard,
    onClick: (href) => console.log('Navigate to:', href),
  },
  {
    name: 'Price List',
    href: '/price-list',
    icon: FileText,
    onClick: (href) => console.log('Navigate to:', href),
  },
  {
    name: 'Omni Channel',
    href: '/omni-channel',
    icon: MessageSquare,
    onClick: (href) => console.log('Navigate to:', href),
  },
  {
    name: 'Agents',
    href: '/agents',
    icon: UserCheck,
    onClick: (href) => console.log('Navigate to:', href),
  },
  {
    name: 'Tickets',
    href: '/tickets',
    icon: Ticket,
    onClick: (href) => console.log('Navigate to:', href),
  },
  {
    name: 'Reports',
    href: '/reports',
    icon: BarChart3,
    onClick: (href) => console.log('Navigate to:', href),
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
    onClick: (href) => console.log('Navigate to:', href),
  },
];

const mainMenuConfig: SidebarConfig = {
  sections: [
    {
      id: 'main',
      label: 'Main menu',
      collapsible: true,
      defaultOpen: true,
      items: [
        {
          type: 'link',
          name: 'Dashboard',
          href: '/dashboard',
          icon: LayoutDashboard,
          onClick: (href) => console.log('Navigate to:', href),
        },
        {
          type: 'link',
          name: 'Customers',
          href: '/customers',
          icon: Users,
          onClick: (href) => console.log('Navigate to:', href),
        },
        {
          type: 'link',
          name: 'Reports',
          href: '/reports',
          icon: BarChart3,
          onClick: (href) => console.log('Navigate to:', href),
        },
      ],
    },
  ],
};

const nestedConfig: SidebarConfig = {
  sections: [
    {
      id: 'main',
      label: 'Main menu',
      collapsible: true,
      defaultOpen: true,
      items: [
        {
          type: 'group',
          name: 'Analytics',
          icon: BarChart3,
          defaultOpen: true,
          children: [
            {
              type: 'link',
              name: 'Overview',
              href: '/analytics/overview',
              onClick: (href) => console.log('Navigate to:', href),
            },
            {
              type: 'link',
              name: 'Trends',
              href: '/analytics/trends',
              onClick: (href) => console.log('Navigate to:', href),
            },
          ],
        },
        {
          type: 'link',
          name: 'Settings',
          href: '/settings',
          icon: Settings,
          color: 'slate',
          onClick: (href) => console.log('Navigate to:', href),
        },
      ],
    },
    {
      id: 'support',
      label: 'Support',
      collapsible: false,
      items: [
        {
          type: 'link',
          name: 'Help Center',
          href: '/support/help',
          icon: ChevronRight,
          color: 'cyan',
          onClick: (href) => console.log('Navigate to:', href),
        },
      ],
    },
  ],
};

export const ItemsOnlyNoHeader: Story = {
  args: {
    items: sampleItems,
    activeHref: '/dashboard',
  },
};

export const WithSidebarHeader: Story = {
  args: {
    items: sampleItems,
    activeHref: '/dashboard',
    sidebarHeader: (
      <SidebarHeader title="Call Center" />
    ),
  },
};

export const WithGlassEffect: Story = {
  args: {
    items: sampleItems,
    activeHref: '/analytics',
    glassEffect: true,
  },
};

export const RandomHueHover: Story = {
  args: {
    items: sampleItems,
    activeHref: '/dashboard',
    glassEffect: true,
    randomHue: true,
  },
};

export const WithoutGlassEffect: Story = {
  args: {
    items: sampleItems,
    activeHref: '/users',
    glassEffect: false,
  },
};

export const CustomTitle: Story = {
  args: {
    items: sampleItems,
    activeHref: '/dashboard',
    title: 'Admin Panel',
    glassEffect: true,
  },
};

export const NoActiveItem: Story = {
  args: {
    items: sampleItems,
    activeHref: undefined,
    glassEffect: true,
  },
};

export const ShowActivePriceList: Story = {
  args: {
    items: sampleItems,
    activeHref: '/price-list',
    title: 'Call Center',
    glassEffect: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows Price List as the active item with cyan background and darker cyan text.',
      },
    },
  },
};

export const CssCollisionTest: Story = {
  args: {
    items: sampleItems,
    activeHref: '/price-list',
    title: 'Call Center',
    glassEffect: true,
  },
  decorators: [
    (Story) => (
      <div style={{ height: '100vh', display: 'flex' }}>
        <style>{`
          button {
            color: #16a34a;
            background-color: rgba(34, 197, 94, 0.12);
            border-color: rgba(34, 197, 94, 0.3);
          }
          button:hover {
            color: #15803d;
            background-color: rgba(34, 197, 94, 0.2);
          }
        `}</style>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Simulates global button styles (Bootstrap/Tailwind-like) to verify Sidebar hover/active styles still win.',
      },
    },
  },
};

export const ConfigMainMenuAccordion: Story = {
  args: {
    config: mainMenuConfig,
    activeHref: '/dashboard',
  },
};

export const ConfigNestedItems: Story = {
  args: {
    config: nestedConfig,
    activeHref: '/analytics/trends',
  },
};
