import type { Meta, StoryObj } from '@storybook/react';
import { Card, type CardProps } from '@consumer/components/Card';
import { Button } from '@consumer/components/Button';

const meta: Meta<CardProps> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    shadow: {
      control: 'boolean',
      description: 'Whether card should have shadow',
    },
    bordered: {
      control: 'boolean',
      description: 'Whether card should have border',
    },
    glassEffect: {
      control: 'boolean',
      description: 'Enable built-in glass effect wrapper',
    },
    glassVariant: {
      control: { type: 'select' },
      options: ['shine', 'perfume'],
      description: 'Glass effect variant (defaults to shine when enabled)',
    },
    glassRandomHue: {
      control: 'boolean',
      description: 'Random hue coloring (perfume only)',
    },
  },
};

export default meta;
type Story = StoryObj<CardProps>;

export const Basic: Story = {
  args: {
    title: 'Card Title',
    children: 'This is a basic card with title and content.',
  },
};

export const WithSubtitle: Story = {
  args: {
    title: 'Card Title',
    subtitle: 'Card Subtitle',
    children: 'This card has both a title and subtitle.',
  },
};

export const WithImage: Story = {
  args: {
    imageSrc: 'https://via.placeholder.com/400x200',
    imageAlt: 'Placeholder image',
    title: 'Card with Image',
    children: 'This card includes an image at the top.',
  },
};

export const WithHeader: Story = {
  args: {
    header: <div className="card-title">Featured</div>,
    title: 'Special Title Treatment',
    children: 'This card has a custom header section.',
  },
};

export const WithFooter: Story = {
  args: {
    title: 'Card Title',
    children: 'This card has a footer section.',
    footer: (
      <div>
        <Button variant="primary" size="small">
          Action
        </Button>
      </div>
    ),
  },
};

export const Complete: Story = {
  args: {
    imageSrc: 'https://via.placeholder.com/400x200',
    imageAlt: 'Card image',
    header: <div className="card-title">Featured</div>,
    title: 'Card Title',
    subtitle: 'Card Subtitle',
    children: 'This is a complete card with all sections: image, header, title, subtitle, body, and footer.',
    footer: (
      <div className="d-flex gap-2">
        <Button variant="primary" size="small">
          Primary Action
        </Button>
        <Button variant="secondary" size="small">
          Secondary Action
        </Button>
      </div>
    ),
  },
};

export const NoShadow: Story = {
  args: {
    shadow: false,
    title: 'Card Without Shadow',
    children: 'This card has no shadow effect.',
  },
};

export const NoBorder: Story = {
  args: {
    bordered: false,
    title: 'Card Without Border',
    children: 'This card has no border.',
  },
};

export const WithGlassShine: Story = {
  args: {
    glassEffect: true,
    title: 'Glass Effect Card',
    subtitle: 'Shine variant (default)',
    shadow: true,
    children: 'This card has the glass shine effect enabled via Card props.',
  },
};

export const WithGlassPerfume: Story = {
  args: {
    glassEffect: true,
    glassVariant: 'perfume',
    title: 'Perfume Glass Card',
    subtitle: 'Hover for color effect',
    shadow: true,
    children: 'This card uses the perfume variant.',
  },
};

export const WithGlassPerfumeRandomHue: Story = {
  args: {
    glassEffect: true,
    glassVariant: 'perfume',
    glassRandomHue: true,
    title: 'Perfume Glass Card',
    subtitle: 'Random hue enabled',
    shadow: true,
    children: 'Hover to see random hue coloring (perfume only).',
  },
};

const threePerfumeCards = [
  { id: 0, title: 'Card 1', subtitle: 'Hover for random hue', children: 'Each card gets its own random hue on hover. Hover this card.' },
  { id: 1, title: 'Card 2', subtitle: 'Hover for random hue', children: 'Each card gets its own random hue on hover. Hover this card.' },
  { id: 2, title: 'Card 3', subtitle: 'Hover for random hue', children: 'Each card gets its own random hue on hover. Hover this card.' },
];

export const ThreeCardsWithGlassPerfumeRandomHue: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
      {threePerfumeCards.map((card) => (
        <Card
          key={card.id}
          glassEffect
          glassVariant="perfume"
          glassRandomHue
          title={card.title}
          subtitle={card.subtitle}
          shadow
        >
          {card.children}
        </Card>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Three cards with perfume random hue. Each card automatically gets a unique color - no manual configuration needed!',
      },
    },
  },
};

export const CompleteWithGlass: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Card
        glassEffect
        title="Featured Card"
        subtitle="With glass effect"
        imageSrc="https://via.placeholder.com/400x200"
        footer={
          <div className="d-flex gap-2">
            <Button variant="primary" size="small">
              Action
            </Button>
            <Button variant="secondary" size="small">
              Cancel
            </Button>
          </div>
        }
      >
        A complete card with image, content, and footer using built-in glass effect.
      </Card>

      <Card
        glassEffect
        glassVariant="perfume"
        glassRandomHue
        title="Colorful Card"
        subtitle="Random hue perfume"
        imageSrc="https://via.placeholder.com/400x200"
        footer={
          <div className="d-flex gap-2">
            <Button variant="success" size="small">
              Confirm
            </Button>
          </div>
        }
      >
        Hover to see random color glass effect.
      </Card>
    </div>
  ),
};
