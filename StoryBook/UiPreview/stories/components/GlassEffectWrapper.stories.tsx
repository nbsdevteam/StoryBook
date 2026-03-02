import type { Meta, StoryObj } from '@storybook/react';
import type { StoryContext } from '@storybook/react';
import { GlassEffectWrapper, type GlassEffectWrapperProps } from '@consumer/components/GlassEffectWrapper';

const meta: Meta<GlassEffectWrapperProps> = {
  title: 'Components/GlassEffectWrapper',
  component: GlassEffectWrapper,
  tags: ['autodocs'],
  argTypes: {
    glassEffect: {
      control: 'boolean',
      description: 'Enable glass hover effect',
    },
    variant: {
      control: { type: 'select' },
      options: ['shine', 'perfume'],
      description: 'Glass effect variant',
    },
    randomHue: {
      control: 'boolean',
      description: 'Random hue coloring (perfume only)',
    },
    isRtl: {
      control: false,
      description: 'RTL mode: shine sweeps right-to-left. Set via toolbar Direction.',
    },
  },
};

export default meta;
type Story = StoryObj<GlassEffectWrapperProps>;

const demoContent = (
  <div
    style={{
      padding: '2rem',
      borderRadius: '0.5rem',
      backgroundColor: 'var(--nbs-bg-muted, #f1f5f9)',
      color: 'var(--nbs-text, #1e293b)',
      minWidth: '200px',
      textAlign: 'center',
    }}
  >
    Hover to see glass effect
  </div>
);

export const Shine: Story = {
  args: {
    glassEffect: true,
    variant: 'shine',
  },
  render: (args, context: StoryContext) => (
    <GlassEffectWrapper
      {...args}
      asChild
      isRtl={context.globals?.nbsDirection === 'rtl'}
    >
      {demoContent}
    </GlassEffectWrapper>
  ),
};

export const Perfume: Story = {
  args: {
    glassEffect: true,
    variant: 'perfume',
  },
  render: (args, context: StoryContext) => (
    <GlassEffectWrapper
      {...args}
      asChild
      isRtl={context.globals?.nbsDirection === 'rtl'}
    >
      {demoContent}
    </GlassEffectWrapper>
  ),
};

export const PerfumeRandomHue: Story = {
  args: {
    glassEffect: true,
    variant: 'perfume',
    randomHue: true,
  },
  render: (args, context: StoryContext) => (
    <GlassEffectWrapper
      {...args}
      asChild
      isRtl={context.globals?.nbsDirection === 'rtl'}
    >
      {demoContent}
    </GlassEffectWrapper>
  ),
};
