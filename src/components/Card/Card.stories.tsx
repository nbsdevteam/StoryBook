import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Button } from '../Button';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    shadow: {
      control: 'boolean',
      description: 'Whether card should have shadow',
    },
    bordered: {
      control: 'boolean',
      description: 'Whether card should have border',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    title: 'Card Title',
    children: 'This is a basic card with title and content.',
  },
};

export const WithSubtitle: Story = {
  args: {
    title: 'Card Title',
    subtitle: 'Card Subtitle',
    children: 'This card has both a title and subtitle.',
  },
};

export const WithImage: Story = {
  args: {
    imageSrc: 'https://via.placeholder.com/400x200',
    imageAlt: 'Placeholder image',
    title: 'Card with Image',
    children: 'This card includes an image at the top.',
  },
};

export const WithHeader: Story = {
  args: {
    header: <div className="card-title">Featured</div>,
    title: 'Special Title Treatment',
    children: 'This card has a custom header section.',
  },
};

export const WithFooter: Story = {
  args: {
    title: 'Card Title',
    children: 'This card has a footer section.',
    footer: (
      <div>
        <Button variant="primary" size="small">
          Action
        </Button>
      </div>
    ),
  },
};

export const Complete: Story = {
  args: {
    imageSrc: 'https://via.placeholder.com/400x200',
    imageAlt: 'Card image',
    header: <div className="card-title">Featured</div>,
    title: 'Card Title',
    subtitle: 'Card Subtitle',
    children: 'This is a complete card with all sections: image, header, title, subtitle, body, and footer.',
    footer: (
      <div className="d-flex gap-2">
        <Button variant="primary" size="small">
          Primary Action
        </Button>
        <Button variant="secondary" size="small">
          Secondary Action
        </Button>
      </div>
    ),
  },
};

export const NoShadow: Story = {
  args: {
    shadow: false,
    title: 'Card Without Shadow',
    children: 'This card has no shadow effect.',
  },
};

export const NoBorder: Story = {
  args: {
    bordered: false,
    title: 'Card Without Border',
    children: 'This card has no border.',
  },
};
