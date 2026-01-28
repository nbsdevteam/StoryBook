import type { Preview } from '@storybook/react';

// Import shared global styles that consumers also get
import '../../ConsumerComponents/styles/global.css';

// Load Inter font (matches legacy app)
import '@fontsource/inter';

// Import component CSS modules for Storybook preview
import '../../ConsumerComponents/components/GlassEffectWrapper/glass-effect.module.css';


const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a1a' },
      ],
    },
  },
};

export default preview;