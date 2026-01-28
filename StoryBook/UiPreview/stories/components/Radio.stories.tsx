import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from '@consumer/components/Radio';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Radio size',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether radio is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether radio is required',
    },
    labelBefore: {
      control: 'boolean',
      description: 'Whether to show label before radio',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: 'Option 1',
    name: 'radio-group',
    value: '1',
  },
};

export const Checked: Story = {
  args: {
    label: 'Selected option',
    name: 'radio-group',
    value: '1',
    defaultChecked: true,
  },
};

export const Required: Story = {
  args: {
    label: 'I agree',
    required: true,
    name: 'radio-group',
    value: '1',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Enable feature',
    helperText: 'This will enable advanced features',
    name: 'radio-group',
    value: '1',
  },
};

export const WithError: Story = {
  args: {
    label: 'Select option',
    error: 'Please select an option',
    name: 'radio-group',
    value: '1',
  },
};

export const Small: Story = {
  args: {
    label: 'Small radio',
    size: 'small',
    name: 'radio-group',
    value: '1',
  },
};

export const Large: Story = {
  args: {
    label: 'Large radio',
    size: 'large',
    name: 'radio-group',
    value: '1',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled radio',
    disabled: true,
    name: 'radio-group',
    value: '1',
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled and checked',
    disabled: true,
    defaultChecked: true,
    name: 'radio-group',
    value: '1',
  },
};

export const LabelBefore: Story = {
  args: {
    label: 'Label before radio',
    labelBefore: true,
    name: 'radio-group',
    value: '1',
  },
};

export const RadioGroup: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Radio label="Option 1" name="group" value="1" />
      <Radio label="Option 2" name="group" value="2" defaultChecked />
      <Radio label="Option 3" name="group" value="3" />
      <Radio label="Disabled Option" name="group" value="4" disabled />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Radio label="Small radio" size="small" name="sizes" value="small" />
      <Radio label="Medium radio" size="medium" name="sizes" value="medium" />
      <Radio label="Large radio" size="large" name="sizes" value="large" />
    </div>
  ),
};
