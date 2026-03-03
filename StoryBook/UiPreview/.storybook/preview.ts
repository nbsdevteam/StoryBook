import type { Preview } from '@storybook/react';
import React from 'react';

// Import shared global styles that consumers also get
import '../../ConsumerComponents/styles/global.css';

// Load Inter font (matches legacy app)
import '@fontsource/inter';

const DARK_BG_VALUE = '#1a1a1a';

function getThemeFromGlobals(globals: Record<string, unknown>): 'light' | 'dark' {
  const theme = globals.nbsTheme as string | undefined;
  if (theme === 'dark' || theme === 'light') return theme;
  const bg = globals.backgrounds as { value?: string; name?: string } | undefined;
  const isDark =
    bg?.value === DARK_BG_VALUE ||
    bg?.name === 'dark' ||
    (typeof bg?.value === 'string' && bg.value.toLowerCase().includes('1a1a1a'));
  return isDark ? 'dark' : 'light';
}

function getDirFromGlobals(globals: Record<string, unknown>): 'ltr' | 'rtl' {
  const dir = globals.nbsDirection as string | undefined;
  return dir === 'rtl' ? 'rtl' : 'ltr';
}

const withTheme = (Story: React.ComponentType, context: { globals: Record<string, unknown> }) => {
  const theme = getThemeFromGlobals(context.globals || {});
  const dir = getDirFromGlobals(context.globals || {});
  return React.createElement(
    'div',
    {
      'data-nbs-theme': theme,
      'data-theme': theme,
      dir,
      lang: dir === 'rtl' ? 'ar' : 'en',
      style: {
        padding: '1rem',
        boxSizing: 'border-box',
        backgroundColor: 'var(--nbs-bg)',
        color: 'var(--nbs-text)',
      },
    },
    React.createElement(Story)
  );
};

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    nbsTheme: {
      description: 'Theme for NBS components (sidebar, cards, etc.)',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
    nbsDirection: {
      description: 'Text direction / translation mode (LTR vs RTL)',
      toolbar: {
        title: 'Direction',
        icon: 'paragraph',
        items: [
          { value: 'ltr', title: 'LTR (English)', icon: 'arrowright' },
          { value: 'rtl', title: 'RTL (Arabic)', icon: 'arrowleft' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    nbsTheme: 'light',
    nbsDirection: 'ltr',
  },
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
        { name: 'dark', value: DARK_BG_VALUE },
      ],
    },
  },
};

export default preview;