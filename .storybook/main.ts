import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import path from 'path';

const config: StorybookConfig = {
  stories: [
    '../src/components/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../src/stories/**/*.stories.@(js|jsx|ts|tsx|mdx)'
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  core: {
    builder: '@storybook/builder-vite',
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../src'),
          '@/components': path.resolve(__dirname, '../src/components'),
          '@/styles': path.resolve(__dirname, '../src/assets/scss'),
          '@/utils': path.resolve(__dirname, '../src/core/utils'),
          '@/types': path.resolve(__dirname, '../src/core/data/types'),
          '@/hooks': path.resolve(__dirname, '../src/core/hooks'),
          '@/assets': path.resolve(__dirname, '../src/assets'),
          '@/store': path.resolve(__dirname, '../src/core/data/redux'),
          global: 'globalthis',
          moment: 'moment/moment.js',
        },
      },
      optimizeDeps: {
        esbuildOptions: {
          define: {
            global: 'globalThis',
          },
          plugins: [
            NodeGlobalsPolyfillPlugin({
              buffer: true,
              process: true,
            }),
          ],
        },
      },
      define: {
        global: 'globalThis',
      },
    });
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
};

export default config;