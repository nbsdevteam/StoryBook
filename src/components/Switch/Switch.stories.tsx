import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Switch size',
    },
    variant: {
      control: 'select',
      options: ['primary', 'success', 'danger', 'warning', 'info'],
      description: 'Switch color variant',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether switch is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether switch is required',
    },
    labelBefore: {
      control: 'boolean',
      description: 'Whether to show label before switch',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: 'Enable notifications',
  },
};

export const Checked: Story = {
  args: {
    label: 'Notifications enabled',
    defaultChecked: true,
  },
};

export const Required: Story = {
  args: {
    label: 'I agree to terms',
    required: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Enable dark mode',
    helperText: 'Switch to dark theme',
  },
};

export const WithError: Story = {
  args: {
    label: 'Accept terms',
    error: 'You must accept the terms',
  },
};

export const Small: Story = {
  args: {
    label: 'Small switch',
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    label: 'Large switch',
    size: 'large',
  },
};

export const Primary: Story = {
  args: {
    label: 'Primary switch',
    variant: 'primary',
    defaultChecked: true,
  },
};

export const Success: Story = {
  args: {
    label: 'Success switch',
    variant: 'success',
    defaultChecked: true,
  },
};

export const Danger: Story = {
  args: {
    label: 'Danger switch',
    variant: 'danger',
    defaultChecked: true,
  },
};

export const Warning: Story = {
  args: {
    label: 'Warning switch',
    variant: 'warning',
    defaultChecked: true,
  },
};

export const Info: Story = {
  args: {
    label: 'Info switch',
    variant: 'info',
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled switch',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled and checked',
    disabled: true,
    defaultChecked: true,
  },
};

export const LabelBefore: Story = {
  args: {
    label: 'Label before switch',
    labelBefore: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Switch label="Primary" variant="primary" defaultChecked />
      <Switch label="Success" variant="success" defaultChecked />
      <Switch label="Danger" variant="danger" defaultChecked />
      <Switch label="Warning" variant="warning" defaultChecked />
      <Switch label="Info" variant="info" defaultChecked />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Switch label="Small switch" size="small" defaultChecked />
      <Switch label="Medium switch" size="medium" defaultChecked />
      <Switch label="Large switch" size="large" defaultChecked />
    </div>
  ),
};
