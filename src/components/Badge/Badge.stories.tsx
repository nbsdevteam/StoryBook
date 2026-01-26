import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'light',
        'dark',
      ],
      description: 'Badge color variant',
    },
    rounded: {
      control: 'boolean',
      description: 'Whether badge should be rounded/pill shaped',
    },
    outline: {
      control: 'boolean',
      description: 'Whether badge should have outline style',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Danger',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Warning',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'Info',
  },
};

export const Light: Story = {
  args: {
    variant: 'light',
    children: 'Light',
  },
};

export const Dark: Story = {
  args: {
    variant: 'dark',
    children: 'Dark',
  },
};

export const Rounded: Story = {
  args: {
    variant: 'primary',
    rounded: true,
    children: 'Rounded Badge',
  },
};

export const Outline: Story = {
  args: {
    variant: 'primary',
    outline: true,
    children: 'Outline Badge',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="light">Light</Badge>
      <Badge variant="dark">Dark</Badge>
    </div>
  ),
};

export const AllRounded: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
      <Badge variant="primary" rounded>
        Primary
      </Badge>
      <Badge variant="secondary" rounded>
        Secondary
      </Badge>
      <Badge variant="success" rounded>
        Success
      </Badge>
      <Badge variant="danger" rounded>
        Danger
      </Badge>
      <Badge variant="warning" rounded>
        Warning
      </Badge>
      <Badge variant="info" rounded>
        Info
      </Badge>
    </div>
  ),
};
