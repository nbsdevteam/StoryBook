import React, { useState, useMemo } from 'react';
import {
  Sidebar as NbsSidebarImport,
  SidebarHeader as NbsSidebarHeaderImport,
  Card as NbsCardImport,
  Button as NbsButtonImport,
  type SidebarProps,
  type SidebarConfig,
  type SidebarItem,
  type SidebarHeaderProps,
  type CardProps,
  type CardConfig,
  type ButtonProps,
} from '@nbs/component-library';
import { LayoutDashboard, Users, Settings, BarChart3, Star } from 'lucide-react';

/**
 * Typed wrappers so the IDE shows prop suggestions for JSX.
 * Assigning to React.FC<Props> helps IntelliSense resolve component props.
 * Tip: inside <NbsCard …>, press Ctrl+Space to force TypeScript completion (not word completion).
 */
const NbsSidebar: React.FC<SidebarProps> = (props) => <NbsSidebarImport {...props} />;
const NbsSidebarHeader: React.FC<SidebarHeaderProps> = (props) => <NbsSidebarHeaderImport {...props} />;

/** NbsCard – direct props: title, subtitle, children, footer, header, shadow, bordered, imageSrc, imageAlt; or config (CardConfig) */
const NbsCard: React.FC<CardProps> = (props) => <NbsCardImport {...props} />;

const NbsButton: React.FC<ButtonProps> = (props) => <NbsButtonImport {...props} />;

const asIcon = (icon: unknown) => icon as SidebarItem['icon'];

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
          icon: asIcon(LayoutDashboard),
        },
        {
          type: 'link',
          name: 'Cards',
          href: '/cards',
          icon: asIcon(Star),
        },
        {
          type: 'group',
          name: 'Analytics',
          icon: asIcon(BarChart3),
          defaultOpen: true,
          children: [
            { type: 'link', name: 'Overview', href: '/analytics/overview' },
            { type: 'link', name: 'Trends', href: '/analytics/trends' },
          ],
        },
        {
          type: 'link',
          name: 'Settings',
          href: '/settings',
          icon: asIcon(Settings),
        },
      ],
    },
  ],
};

/** Data for the mapped cards row (same NbsCard, different props – easy to compare effects) */
const MAPPED_CARDS: Array<{ id: string; title: string; subtitle: string; footer: string; body: string }> = [
  { id: '1', title: 'Card One', subtitle: 'From map', footer: 'Footer 1', body: 'Content for first card.' },
  { id: '2', title: 'Card Two', subtitle: 'From map', footer: 'Footer 2', body: 'Content for second card.' },
  { id: '3', title: 'Card Three', subtitle: 'From map', footer: 'Footer 3', body: 'Content for third card.' },
  { id: '4', title: 'Card Four', subtitle: 'From map', footer: 'Footer 4', body: 'Content for fourth card.' },
];

const cardGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: 16,
};

function CardsView() {
  return (
    <>
      <h1 style={{ marginTop: 0 }}>NBS Cards</h1>
      <p style={{ color: 'var(--nbs-text-muted, #666)', marginBottom: 24 }}>
        Direct props: title, subtitle, children, footer, header, shadow, bordered, imageSrc, imageAlt. No config.
      </p>

      {/* Four cards from map – same layout so effects are clear */}
      <h2 style={{ fontSize: '1.1rem', marginBottom: 12 }}>Cards from map (4 cards)</h2>
      <div style={cardGridStyle}>
        {MAPPED_CARDS.map((card) => (
          <NbsCard
            key={card.id}
            title={card.title}
            subtitle={card.subtitle}
            footer={card.footer}
            glassEffect
            glassVariant="perfume"
            glassRandomHue
          >
            <p style={{ margin: 0 }}>{card.body}</p>
            <NbsButton variant="primary" size="sm" style={{ marginTop: 8 }}>Action</NbsButton>
          </NbsCard>
        ))}
      </div>

      {/* Individual cards – different props so you can see each effect */}
      <h2 style={{ fontSize: '1.1rem', marginTop: 32, marginBottom: 12 }}>Individual cards</h2>
      <div style={cardGridStyle}>
        <NbsCard
          title="Simple"
          subtitle="title, subtitle, children, footer"
          footer="Footer text"
          glassEffect
        >
          <p style={{ margin: 0 }}>Uses title, subtitle, children, footer.</p>
          <NbsButton variant="primary" size="sm" style={{ marginTop: 8 }}>Read More</NbsButton>
        </NbsCard>

        <NbsCard
          shadow={false}
          bordered
          title="No shadow"
          subtitle="shadow=false bordered=true"
        >
          <p style={{ margin: 0 }}>Test shadow and bordered props.</p>
        </NbsCard>

        <NbsCard
          title="Outlined style"
          subtitle="title + subtitle + children"
        >
          <p style={{ margin: 0 }}>Border only. Variant/size only available via config.</p>
        </NbsCard>

        <NbsCard
          title="With footer buttons"
          subtitle="footer as ReactNode"
          footer={
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <NbsButton variant="primary" size="sm" onClick={() => alert('Saved')}>Save</NbsButton>
              <NbsButton variant="secondary" size="sm" onClick={() => alert('Cancel')}>Cancel</NbsButton>
            </div>
          }
        >
          <p style={{ margin: 0 }}>Footer is a ReactNode with buttons.</p>
        </NbsCard>

        <NbsCard
          title="Custom header"
          subtitle="header as ReactNode"
          header={
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Star size={18} style={{ color: 'var(--nbs-primary)' }} />
              <span>Header with icon</span>
            </div>
          }
        >
          <p style={{ margin: 0 }}>Header passed as ReactNode with Star icon.</p>
        </NbsCard>

        <NbsCard
          title="Error message"
          subtitle="content + button in children"
        >
          <p style={{ margin: 0 }}>Something went wrong.</p>
          <NbsButton variant="secondary" size="sm" style={{ marginTop: 8 }} onClick={() => alert('Retry')}>
            Retry
          </NbsButton>
        </NbsCard>

        <NbsCard
          title="Clickable content"
          subtitle="button inside children"
        >
          <p style={{ margin: 0 }}>Use a button inside for actions.</p>
          <NbsButton variant="primary" size="sm" style={{ marginTop: 8 }} onClick={() => alert('Card action!')}>
            Do something
          </NbsButton>
        </NbsCard>

        <NbsCard
          title="With image"
          subtitle="imageSrc + imageAlt"
          imageSrc="https://picsum.photos/400/200"
          imageAlt="Card image"
        >
          <p style={{ margin: 0 }}>Direct props: imageSrc, imageAlt.</p>
        </NbsCard>

        <NbsCard
          bordered={false}
          shadow
          title="No border"
          subtitle="bordered=false"
        >
          <p style={{ margin: 0 }}>Shadow only, no border.</p>
        </NbsCard>
      </div>
    </>
  );
}

function App() {
  const [activeHref, setActive] = useState('/dashboard');
  const [useConfig, setUseConfig] = useState(false);

  const items: SidebarItem[] = useMemo(
    () => [
      {
        name: 'Dashboard',
        href: '/dashboard',
        icon: asIcon(LayoutDashboard),
        onClick: (href) => setActive(href),
      },
      {
        name: 'Cards',
        href: '/cards',
        icon: asIcon(Star),
        onClick: (href) => setActive(href),
      },
      {
        name: 'Users',
        href: '/users',
        icon: asIcon(Users),
        onClick: (href) => setActive(href),
      },
      {
        name: 'Settings',
        href: '/settings',
        icon: asIcon(Settings),
        onClick: (href) => setActive(href),
      },
    ],
    []
  );

  return (
    <div style={{ display: 'flex', height: '100vh', margin: 0 }}>
      <NbsSidebar
        items={useConfig ? undefined : items}
        config={useConfig ? config : undefined}
        activeHref={activeHref}
        sidebarHeader={<NbsSidebarHeader title="Dummy Consumer" />}
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
        {activeHref === '/cards' ? (
          <CardsView />
        ) : (
          <>
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
            <p style={{ marginTop: 24, color: 'var(--nbs-text-muted, #666)' }}>
              Click <strong>Cards</strong> in the sidebar to test NBS Card components and props.
            </p>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
