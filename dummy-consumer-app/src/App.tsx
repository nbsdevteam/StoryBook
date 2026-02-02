import { useState, useMemo } from 'react';
import {
  Sidebar,
  SidebarHeader,
  type SidebarItem,
  type SidebarConfig,
} from '@nbs/component-library';
import { LayoutDashboard, Users, Settings, BarChart3 } from 'lucide-react';

// Config API (sections + nested)
const config: SidebarConfig = {
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
          color: 'blue',
        },
        {
          type: 'group',
          name: 'Analytics',
          icon: BarChart3,
          defaultOpen: true,
          children: [
            { type: 'link', name: 'Overview', href: '/analytics/overview', color: 'indigo' },
            { type: 'link', name: 'Trends', href: '/analytics/trends', color: 'emerald' },
          ],
        },
        {
          type: 'link',
          name: 'Settings',
          href: '/settings',
          icon: Settings,
          color: 'slate',
        },
      ],
    },
  ],
};

function App() {
  const [activeHref, setActive] = useState('/dashboard');
  const [useConfig, setUseConfig] = useState(false);

  const items: SidebarItem[] = useMemo(
    () => [
      {
        name: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
        onClick: (href) => setActive(href),
       },
      {
        name: 'Users',
        href: '/users',
        icon: Users,
        onClick: (href) => setActive(href),
       },
      {
        name: 'Settings',
        href: '/settings',
        icon: Settings,
        onClick: (href) => setActive(href),
       },
    ],
    []
  );

  return (
    <div style={{ display: 'flex', height: '100vh', margin: 0 }}>
      <Sidebar
        items={useConfig ? undefined : items}
        config={useConfig ? config : undefined}
        activeHref={activeHref}
        sidebarHeader={<SidebarHeader title="Dummy Consumer" />}
        glassEffect
        width={256}
      />
      <main
        style={{
          flex: 1,
          padding: 24,
          overflow: 'auto',
          background: 'var(--nbs-bg, #f5f5f5)',
        }}
      >
        <h1 style={{ marginTop: 0 }}>Sidebar test</h1>
        <p>
          Current route: <strong>{activeHref}</strong>
        </p>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16 }}>
          <input
            type="checkbox"
            checked={useConfig}
            onChange={(e) => setUseConfig(e.target.checked)}
          />
          Use <code>config</code> (sections + nested) instead of <code>items</code>
        </label>
        <p style={{ marginTop: 24, color: 'var(--nbs-muted, #666)' }}>
          Click sidebar items to see active state. Toggle to compare items vs config API.
        </p>
      </main>
    </div>
  );
}

export default App;
