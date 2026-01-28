import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@consumer/components/Input';
import { Search, Eye, EyeOff } from 'react-feather';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Input size',
    },
    variant: {
      control: 'select',
      options: ['default', 'light', 'primary'],
      description: 'Input variant/style',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'date'],
      description: 'Input type',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether input is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether input is required',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'Enter your email',
  },
};

export const Required: Story = {
  args: {
    label: 'Username',
    required: true,
    placeholder: 'Enter username',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    helperText: 'Must be at least 8 characters',
    placeholder: 'Enter password',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    type: 'email',
    error: 'Please enter a valid email address',
    placeholder: 'Enter email',
    defaultValue: 'invalid-email',
  },
};

export const Valid: Story = {
  args: {
    label: 'Email',
    type: 'email',
    valid: true,
    placeholder: 'Enter email',
    defaultValue: 'user@example.com',
  },
};

export const Small: Story = {
  args: {
    label: 'Small Input',
    size: 'small',
    placeholder: 'Small size',
  },
};

export const Large: Story = {
  args: {
    label: 'Large Input',
    size: 'large',
    placeholder: 'Large size',
  },
};

export const WithLeftIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    leftIcon: <Search size={18} />,
  },
};

export const WithRightIcon: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    rightIcon: <Eye size={18} />,
  },
};

export const LightVariant: Story = {
  args: {
    label: 'Light Input',
    variant: 'light',
    placeholder: 'Light variant',
  },
};

export const PrimaryVariant: Story = {
  args: {
    label: 'Primary Input',
    variant: 'primary',
    placeholder: 'Primary variant',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    disabled: true,
    placeholder: 'Cannot edit',
    defaultValue: 'Disabled value',
  },
};

export const AllTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Input label="Text" type="text" placeholder="Text input" />
      <Input label="Email" type="email" placeholder="Email input" />
      <Input label="Password" type="password" placeholder="Password input" />
      <Input label="Number" type="number" placeholder="Number input" />
      <Input label="Tel" type="tel" placeholder="Phone number" />
      <Input label="URL" type="url" placeholder="Website URL" />
      <Input label="Date" type="date" />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Input label="Small" size="small" placeholder="Small input" />
      <Input label="Medium" size="medium" placeholder="Medium input" />
      <Input label="Large" size="large" placeholder="Large input" />
    </div>
  ),
};
