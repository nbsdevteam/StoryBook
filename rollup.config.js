const resolve = require('@rollup/plugin-node-resolve').default;
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const postcss = require('rollup-plugin-postcss');
const terser = require('@rollup/plugin-terser');

const external = ['react', 'react-dom', 'react/jsx-runtime'];

const tsPlugin = typescript({
  tsconfig: './tsconfig.build.json',
  declaration: false,
  declarationMap: false,
  exclude: ['**/*.stories.*', '**/*.test.*', '**/node_modules/**', '**/_TEMPLATE/**'],
  rootDir: 'StoryBook/ConsumerComponents',
  allowImportingTsExtensions: false,
});

const basePlugins = (extractCss = false) => [
  peerDepsExternal(),
  resolve({ browser: true, preferBuiltins: false }),
  commonjs({ include: /node_modules/ }),
  tsPlugin,
  postcss({
    autoModules: true,
    modules: { generateScopedName: 'nbs__[name]__[local]___[hash:base64:5]' },
    extract: extractCss ? 'styles.css' : false,
    minimize: true,
    inject: !extractCss,
    plugins: [
      require('postcss-import')(),
      require('postcss-nested')(),
      require('autoprefixer')(),
    ],
  }),
  terser({ compress: { drop_console: true } }),
];

module.exports = [
  // 1. MAIN BUNDLE — full library for backward compatibility
  {
    input: './StoryBook/ConsumerComponents/index.ts',
    output: [
      { file: 'dist/index.js', format: 'cjs', sourcemap: true, exports: 'named' },
      { file: 'dist/index.esm.js', format: 'esm', sourcemap: true },
    ],
    plugins: basePlugins(true),
    external,
  },

  // 2. SIDEBAR ONLY — isolated build, no other components included
  {
    input: './StoryBook/ConsumerComponents/entries/sidebar.ts',
    output: [
      { file: 'dist/sidebar.js', format: 'esm', sourcemap: true },
    ],
    plugins: basePlugins(false),
    external,
  },

  // 3. CARD ONLY — isolated build, no other components included
  {
    input: './StoryBook/ConsumerComponents/entries/card.ts',
    output: [
      { file: 'dist/card.js', format: 'esm', sourcemap: true },
    ],
    plugins: basePlugins(false),
    external,
  },
];
