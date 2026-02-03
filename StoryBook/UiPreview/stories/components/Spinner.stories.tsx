import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from '@consumer/components/Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Spinner size',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'muted'],
      description: 'Visual style variant',
    },
    label: {
      control: 'text',
      description: 'Accessible label for screen readers',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'md',
    variant: 'primary',
    label: 'Loading',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    variant: 'primary',
    label: 'Loading',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    variant: 'primary',
    label: 'Loading',
  },
};

export const Secondary: Story = {
  args: {
    size: 'md',
    variant: 'secondary',
    label: 'Loading',
  },
};

export const Muted: Story = {
  args: {
    size: 'md',
    variant: 'muted',
    label: 'Loading',
  },
};
