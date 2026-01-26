import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Textarea size',
    },
    variant: {
      control: 'select',
      options: ['default', 'light', 'primary'],
      description: 'Textarea variant/style',
    },
    rows: {
      control: 'number',
      description: 'Number of rows',
    },
    autoResize: {
      control: 'boolean',
      description: 'Whether textarea should auto-resize',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether textarea is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether textarea is required',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    placeholder: 'Enter your message...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Message',
    placeholder: 'Enter your message...',
    rows: 4,
  },
};

export const Required: Story = {
  args: {
    label: 'Description',
    required: true,
    placeholder: 'Enter description',
    rows: 5,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Comments',
    helperText: 'Please provide detailed feedback',
    placeholder: 'Enter your comments...',
    rows: 4,
  },
};

export const WithError: Story = {
  args: {
    label: 'Message',
    error: 'Message must be at least 10 characters',
    placeholder: 'Enter message',
    rows: 4,
  },
};

export const WithCharCount: Story = {
  args: {
    label: 'Bio',
    maxLength: 200,
    showCharCount: true,
    placeholder: 'Tell us about yourself...',
    rows: 4,
  },
};

export const AutoResize: Story = {
  args: {
    label: 'Auto-resizing Textarea',
    autoResize: true,
    placeholder: 'Type and watch it grow...',
    rows: 2,
  },
};

export const Small: Story = {
  args: {
    label: 'Small Textarea',
    size: 'small',
    rows: 3,
    placeholder: 'Small size',
  },
};

export const Large: Story = {
  args: {
    label: 'Large Textarea',
    size: 'large',
    rows: 5,
    placeholder: 'Large size',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Textarea',
    disabled: true,
    defaultValue: 'This textarea is disabled',
    rows: 3,
  },
};

export const LightVariant: Story = {
  args: {
    label: 'Light Variant',
    variant: 'light',
    placeholder: 'Light variant',
    rows: 3,
  },
};

export const PrimaryVariant: Story = {
  args: {
    label: 'Primary Variant',
    variant: 'primary',
    placeholder: 'Primary variant',
    rows: 3,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Textarea label="Small" size="small" rows={3} placeholder="Small textarea" />
      <Textarea label="Medium" size="medium" rows={3} placeholder="Medium textarea" />
      <Textarea label="Large" size="large" rows={3} placeholder="Large textarea" />
    </div>
  ),
};
