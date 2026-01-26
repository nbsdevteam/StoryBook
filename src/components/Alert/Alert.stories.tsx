import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
      description: 'Alert variant/type',
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether alert can be dismissed',
    },
    showIcon: {
      control: 'boolean',
      description: 'Whether alert should show an icon',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'This is a primary alert message.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'This is a success alert message.',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'This is a danger alert message.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'This is a warning alert message.',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'This is an info alert message.',
  },
};

export const WithTitle: Story = {
  args: {
    variant: 'success',
    title: 'Success!',
    children: 'Your changes have been saved successfully.',
  },
};

export const Dismissible: Story = {
  args: {
    variant: 'info',
    dismissible: true,
    children: 'This alert can be dismissed.',
  },
};

export const WithoutIcon: Story = {
  args: {
    variant: 'warning',
    showIcon: false,
    children: 'This alert has no icon.',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Alert variant="primary">Primary alert message</Alert>
      <Alert variant="secondary">Secondary alert message</Alert>
      <Alert variant="success">Success alert message</Alert>
      <Alert variant="danger">Danger alert message</Alert>
      <Alert variant="warning">Warning alert message</Alert>
      <Alert variant="info">Info alert message</Alert>
    </div>
  ),
};
