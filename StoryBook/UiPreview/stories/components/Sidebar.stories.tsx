import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar, SidebarItem } from '@consumer/components/Sidebar';
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
} from 'lucide-react';
import sidebarStyles from '@consumer/components/Sidebar/sidebar.module.css';

const meta: Meta<typeof Sidebar> = {
  title: 'Components/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
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
    hoverColor: sidebarStyles.hoverBlueText,
    activeColor: sidebarStyles.activeBlue,
  },
  {
    name: 'Call Queue',
    href: '/call-queue',
    icon: PhoneIncoming,
    onClick: (href) => console.log('Navigate to:', href),
    hoverColor: sidebarStyles.hoverOrangeText,
    activeColor: sidebarStyles.activeOrange,
  },
  {
    name: 'Active Calls',
    href: '/active-calls',
    icon: PhoneCall,
    onClick: (href) => console.log('Navigate to:', href),
    hoverColor: sidebarStyles.hoverGreenText,
    activeColor: sidebarStyles.activeGreen,
  },
  {
    name: 'Customers',
    href: '/customers',
    icon: Users,
    onClick: (href) => console.log('Navigate to:', href),
    hoverColor: sidebarStyles.hoverPurpleText,
    activeColor: sidebarStyles.activePurple,
  },
  {
    name: 'Customers Card',
    href: '/customers-card',
    icon: CreditCard,
    onClick: (href) => console.log('Navigate to:', href),
    hoverColor: sidebarStyles.hoverPinkText,
    activeColor: sidebarStyles.activePink,
  },
  {
    name: 'Price List',
    href: '/price-list',
    icon: FileText,
    onClick: (href) => console.log('Navigate to:', href),
    hoverColor: sidebarStyles.hoverCyanText,
    activeColor: sidebarStyles.activeCyan,
  },
  {
    name: 'Omni Channel',
    href: '/omni-channel',
    icon: MessageSquare,
    onClick: (href) => console.log('Navigate to:', href),
    hoverColor: sidebarStyles.hoverIndigoText,
    activeColor: sidebarStyles.activeIndigo,
  },
  {
    name: 'Agents',
    href: '/agents',
    icon: UserCheck,
    onClick: (href) => console.log('Navigate to:', href),
    hoverColor: sidebarStyles.hoverEmeraldText,
    activeColor: sidebarStyles.activeEmerald,
  },
  {
    name: 'Tickets',
    href: '/tickets',
    icon: Ticket,
    onClick: (href) => console.log('Navigate to:', href),
    hoverColor: sidebarStyles.hoverAmberText,
    activeColor: sidebarStyles.activeAmber,
  },
  {
    name: 'Reports',
    href: '/reports',
    icon: BarChart3,
    onClick: (href) => console.log('Navigate to:', href),
    hoverColor: sidebarStyles.hoverVioletText,
    activeColor: sidebarStyles.activeViolet,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
    onClick: (href) => console.log('Navigate to:', href),
    hoverColor: sidebarStyles.hoverSlateText,
    activeColor: sidebarStyles.activeSlate,
  },
];

export const Default: Story = {
  args: {
    items: sampleItems,
    activeHref: '/dashboard',
  },
};

export const WithGlassEffect: Story = {
  args: {
    items: sampleItems,
    activeHref: '/analytics',
    glassEffect: true,
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
