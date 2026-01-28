import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '@consumer/components/Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Checkbox size',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether checkbox is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether checkbox is required',
    },
    labelBefore: {
      control: 'boolean',
      description: 'Whether to show label before checkbox',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: 'I agree to the terms and conditions',
  },
};

export const Checked: Story = {
  args: {
    label: 'Subscribe to newsletter',
    defaultChecked: true,
  },
};

export const Required: Story = {
  args: {
    label: 'I accept the terms',
    required: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Enable notifications',
    helperText: 'You will receive email notifications',
  },
};

export const WithError: Story = {
  args: {
    label: 'Accept terms',
    error: 'You must accept the terms to continue',
  },
};

export const Small: Story = {
  args: {
    label: 'Small checkbox',
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    label: 'Large checkbox',
    size: 'large',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled checkbox',
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
    label: 'Label before checkbox',
    labelBefore: true,
  },
};

export const CheckboxGroup: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Checkbox label="Option 1" name="group" value="1" />
      <Checkbox label="Option 2" name="group" value="2" defaultChecked />
      <Checkbox label="Option 3" name="group" value="3" />
      <Checkbox label="Disabled Option" name="group" value="4" disabled />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Checkbox label="Small checkbox" size="small" />
      <Checkbox label="Medium checkbox" size="medium" />
      <Checkbox label="Large checkbox" size="large" />
    </div>
  ),
};
