import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '@consumer/components/Card';
import { GlassEffectWrapper } from '@consumer/components/GlassEffectWrapper';
import { Button } from '@consumer/components/Button';

const meta: Meta = {
  title: 'Components/Card with Glass Effect',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicCardWithShine: Story = {
  render: () => (
    <GlassEffectWrapper variant="shine" glassEffect>
      <Card title="Glass Effect Card" subtitle="Hover to see the shine effect" shadow>
        This card has a glass shine effect applied via GlassEffectWrapper. Hover over the card to
        see the animation.
      </Card>
    </GlassEffectWrapper>
  ),
};

export const CardWithPerfume: Story = {
  render: () => (
    <GlassEffectWrapper variant="perfume" glassEffect randomHue>
      <Card title="Perfume Glass Card" subtitle="Hover for random color glass effect" shadow>
        This card uses the perfume variant with random hue colors.
      </Card>
    </GlassEffectWrapper>
  ),
};

export const CompleteCardWithGlass: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <GlassEffectWrapper variant="shine">
        <Card
          imageSrc="https://via.placeholder.com/400x200"
          title="Featured Card"
          subtitle="With glass effect"
          footer={
            <div className="d-flex gap-2">
              <Button variant="primary" size="small">
                Action
              </Button>
              <Button variant="secondary" size="small">
                Cancel
              </Button>
            </div>
          }
        >
          A complete card with image, content, and footer wrapped in glass effect.
        </Card>
      </GlassEffectWrapper>

      <GlassEffectWrapper variant="perfume" randomHue>
        <Card
          imageSrc="https://via.placeholder.com/400x200"
          title="Colorful Card"
          subtitle="Random hue perfume"
          footer={
            <div className="d-flex gap-2">
              <Button variant="success" size="small">
                Confirm
              </Button>
            </div>
          }
        >
          Hover to see random color glass effect.
        </Card>
      </GlassEffectWrapper>
    </div>
  ),
};

export const WithoutGlassEffect: Story = {
  render: () => (
    <GlassEffectWrapper glassEffect={false}>
      <Card title="Normal Card" subtitle="Glass effect disabled">
        This card has the wrapper but glass effect is turned off.
      </Card>
    </GlassEffectWrapper>
  ),
};
