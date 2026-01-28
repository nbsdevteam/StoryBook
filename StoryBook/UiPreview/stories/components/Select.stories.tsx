import type { Meta, StoryObj } from '@storybook/react';
import { Select, SelectOption } from '@consumer/components/Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Select size',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether select is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether select is required',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleOptions: SelectOption[] = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
  { label: 'Disabled Option', value: '4', disabled: true },
  { label: 'Option 5', value: '5' },
];

const countryOptions: SelectOption[] = [
  { label: 'United States', value: 'us' },
  { label: 'Canada', value: 'ca' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Australia', value: 'au' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' },
];

export const Basic: Story = {
  args: {
    options: sampleOptions,
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Choose an option',
    options: sampleOptions,
    placeholder: 'Select an option',
  },
};

export const Required: Story = {
  args: {
    label: 'Country',
    required: true,
    options: countryOptions,
    placeholder: 'Select a country',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    helperText: 'Select your country of residence',
    placeholder: 'Choose country',
  },
};

export const WithError: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    error: 'Please select a country',
    placeholder: 'Choose country',
  },
};

export const Valid: Story = {
  args: {
    label: 'Country',
    valid: true,
    options: countryOptions,
    defaultValue: 'us',
  },
};

export const Small: Story = {
  args: {
    label: 'Small Select',
    size: 'small',
    options: sampleOptions,
  },
};

export const Large: Story = {
  args: {
    label: 'Large Select',
    size: 'large',
    options: sampleOptions,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Select',
    disabled: true,
    options: sampleOptions,
    defaultValue: '1',
  },
};

export const Multiple: Story = {
  args: {
    label: 'Select Multiple',
    multiple: true,
    options: sampleOptions,
  },
};

export const WithDisabledOptions: Story = {
  args: {
    label: 'Select with Disabled Options',
    options: sampleOptions,
    placeholder: 'Choose an option',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Select label="Small" size="small" options={sampleOptions} />
      <Select label="Medium" size="medium" options={sampleOptions} />
      <Select label="Large" size="large" options={sampleOptions} />
    </div>
  ),
};
