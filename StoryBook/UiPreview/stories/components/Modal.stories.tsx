import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Modal } from '@consumer/components/Modal';
import { Button } from '../Button';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Modal size',
    },
    centered: {
      control: 'boolean',
      description: 'Whether modal should be centered vertically',
    },
    backdrop: {
      control: 'select',
      options: [true, false, 'static'],
      description: 'Backdrop behavior',
    },
    keyboard: {
      control: 'boolean',
      description: 'Whether modal can be closed with ESC key',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper component for interactive stories
const ModalWrapper = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export const Basic: Story = {
  render: () => <ModalWrapper title="Basic Modal" children="This is a basic modal." />,
};

export const WithFooter: Story = {
  render: () => (
    <ModalWrapper
      title="Modal with Footer"
      children="This modal has a footer with action buttons."
      footer={
        <>
          <Button variant="secondary" onClick={() => {}}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => {}}>
            Save Changes
          </Button>
        </>
      }
    />
  ),
};

export const Small: Story = {
  render: () => (
    <ModalWrapper
      size="sm"
      title="Small Modal"
      children="This is a small modal."
    />
  ),
};

export const Large: Story = {
  render: () => (
    <ModalWrapper
      size="lg"
      title="Large Modal"
      children="This is a large modal with more space for content."
    />
  ),
};

export const Centered: Story = {
  render: () => (
    <ModalWrapper
      centered
      title="Centered Modal"
      children="This modal is centered vertically on the screen."
    />
  ),
};

export const WithoutTitle: Story = {
  render: () => (
    <ModalWrapper children="This modal has no title, only content." />
  ),
};

export const StaticBackdrop: Story = {
  render: () => (
    <ModalWrapper
      backdrop="static"
      title="Static Backdrop"
      children="This modal cannot be closed by clicking the backdrop."
    />
  ),
};
