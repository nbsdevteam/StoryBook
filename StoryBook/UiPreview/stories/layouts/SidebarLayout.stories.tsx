import type { Meta, StoryObj } from '@storybook/react';
import type { StoryContext } from '@storybook/react';
import { Sidebar, SidebarHeader } from '@consumer/components/Sidebar';
import { Card } from '@consumer/components/Card';
import { Button } from '@consumer/components/Button';
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

const meta: Meta = {
  title: 'Layouts/Sidebar Layout',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sidebarItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    onClick: (href: string) => console.log('Navigate:', href),
  },
  {
    name: 'Call Queue',
    href: '/call-queue',
    icon: PhoneIncoming,
    onClick: (href: string) => console.log('Navigate:', href),
  },
  {
    name: 'Active Calls',
    href: '/active-calls',
    icon: PhoneCall,
    onClick: (href: string) => console.log('Navigate:', href),
  },
  {
    name: 'Customers',
    href: '/customers',
    icon: Users,
    onClick: (href: string) => console.log('Navigate:', href),
  },
  {
    name: 'Customers Card',
    href: '/customers-card',
    icon: CreditCard,
    onClick: (href: string) => console.log('Navigate:', href),
  },
  {
    name: 'Price List',
    href: '/price-list',
    icon: FileText,
    onClick: (href: string) => console.log('Navigate:', href),
  },
  {
    name: 'Omni Channel',
    href: '/omni-channel',
    icon: MessageSquare,
    onClick: (href: string) => console.log('Navigate:', href),
  },
  {
    name: 'Agents',
    href: '/agents',
    icon: UserCheck,
    onClick: (href: string) => console.log('Navigate:', href),
  },
  {
    name: 'Tickets',
    href: '/tickets',
    icon: Ticket,
    onClick: (href: string) => console.log('Navigate:', href),
  },
  {
    name: 'Reports',
    href: '/reports',
    icon: BarChart3,
    onClick: (href: string) => console.log('Navigate:', href),
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
    onClick: (href: string) => console.log('Navigate:', href),
  },
];

export const CompleteDashboard: Story = {
  render: (_args, context: StoryContext) => {
    const isRtl = context.globals?.nbsDirection === 'rtl';
    return (
      <div
        style={{
          display: 'flex',
          height: '100vh',
          width: '100%',
          backgroundColor: '#ffffff',
          overflow: 'hidden',
        }}
      >
        <Sidebar
          items={sidebarItems}
          activeHref="/price-list"
          sidebarHeader={<SidebarHeader title="Call Center" />}
          glassEffect
          isRtl={isRtl}
        />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header
          style={{
            height: '64px',
            borderBottom: '1px solid #dee2e6',
            display: 'flex',
            alignItems: 'center',
            padding: '0 24px',
            backgroundColor: '#ffffff',
          }}
        >
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 600, whiteSpace: 'nowrap' }}>
            Price List
          </h2>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '12px' }}>
            <Button variant="outline-primary" size="small">
              Export
            </Button>
            <Button variant="primary" size="small">
              Add Item
            </Button>
          </div>
        </header>

        <main style={{ flex: 1, padding: '24px', backgroundColor: '#f8f9fa', overflow: 'auto' }}>
          <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            <Card title="Total Items" shadow glassEffect isRtl={isRtl}>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#17a2b8' }}>247</div>
              <p style={{ color: '#6c757d', margin: '8px 0 0' }}>Active price list items</p>
            </Card>
            <Card title="Revenue" shadow glassEffect isRtl={isRtl}>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#198754' }}>$45,231</div>
              <p style={{ color: '#6c757d', margin: '8px 0 0' }}>Monthly revenue</p>
            </Card>
            <Card title="Average Price" shadow glassEffect isRtl={isRtl}>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#0d6efd' }}>$183</div>
              <p style={{ color: '#6c757d', margin: '8px 0 0' }}>Per item</p>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
  },
};

export const WithoutGlassEffect: Story = {
  render: (_args, context: StoryContext) => {
    const isRtl = context.globals?.nbsDirection === 'rtl';
    return (
      <div style={{ display: 'flex', height: '100vh', width: '100%' }}>
        <Sidebar
          items={sidebarItems}
          activeHref="/dashboard"
          sidebarHeader={<SidebarHeader title="Call Center" />}
          glassEffect={false}
          isRtl={isRtl}
        />
        <div style={{ flex: 1, padding: '24px', backgroundColor: '#f8f9fa' }}>
          <Card title="Dashboard" shadow>
            <p>Main content area</p>
          </Card>
        </div>
      </div>
    );
  },
};
