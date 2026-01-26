import type { Preview } from '@storybook/react';

// Import ALL global styles from main.tsx
import '../src/assets/css/bootstrap.min.css';
import '../src/assets/css/feather.css';
import '../src/assets/scss/custom.scss';
import '../src/assets/icon/boxicons/boxicons/css/boxicons.min.css';
import '../src/assets/icon/weather/weathericons.css';
import '../src/assets/icon/typicons/typicons.css';
import '../src/assets/css/fontawesome/css/fontawesome.min.css';
import '../src/assets/css/fontawesome/css/all.min.css';
import '../src/assets/icon/ionic/ionicons.css';
import '../src/assets/icon/tabler-icons/webfont/tabler-icons.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered', // Components render centered in canvas
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