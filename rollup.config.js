const resolve = require('@rollup/plugin-node-resolve').default;
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const postcss = require('rollup-plugin-postcss');
const postcssConfig = require('./postcss.config.js');
const terser = require('@rollup/plugin-terser');

/** @type {import('rollup').RollupOptions} */
module.exports = {
  input: './StoryBook/ConsumerComponents/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      browser: true,
      preferBuiltins: false,
    }),
    commonjs({
      include: /node_modules/,
    }),
    typescript({
      tsconfig: './tsconfig.build.json',
      declaration: true,
      declarationDir: 'dist',
      declarationMap: true,
      exclude: ['**/*.stories.*', '**/*.test.*', '**/node_modules/**', '**/_TEMPLATE/**'],
      rootDir: 'StoryBook/ConsumerComponents',
      allowImportingTsExtensions: false,
    }),
    postcss({
      autoModules: true,
      modules: {
        generateScopedName: '[name]__[local]___[hash:base64:5]',
      },
      extract: 'styles.css',
      minimize: true,
      inject: false,
      plugins: [
        require('postcss-nested')(),
        require('autoprefixer')(),
      ],
      config: {
        path: './postcss.config.js',
      },
    }),
    terser({
      compress: { drop_console: true },
    }),
  ],
  external: [
    'react',
    'react-dom',
    'react/jsx-runtime',
    'antd',
    '@ant-design/icons',
  ],
};
