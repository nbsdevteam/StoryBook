# 🔧 StoryBook Library Refactor Command
### Paste this into the StoryBook project in EXECUTE mode

```
You are going to refactor the NBS component library to eliminate antd, enable tree-shaking, and ensure that when a consumer imports only Sidebar or Card, they get ONLY those components and nothing else. Follow every step in order and confirm each before moving on.

---

## STEP 1 — Replace antd in DataTable

File: `StoryBook/ConsumerComponents/components/DataTable/DataTable.tsx`

Remove these imports entirely:
  import { Table, Skeleton } from 'antd';
  import type { ColumnsType } from 'antd/es/table';
  import type { TablePaginationConfig, TableRowSelection } from 'antd/es/table/interface';

Add this import to use the NBS Skeleton instead:
  import { Skeleton } from '../Skeleton';

Add these local type definitions to replace the antd types:
```ts
type TablePaginationConfig = {
  current?: number;
  pageSize?: number;
  total?: number;
  onChange?: (page: number, pageSize: number) => void;
};
type TableRowSelection<T> = {
  selectedRowKeys?: (string | number)[];
  onChange?: (selectedKeys: (string | number)[], selectedRows: T[]) => void;
};
```

Replace the antd <Table> usage with this native implementation:
```tsx
function NativeTable<T extends object>({
  columns,
  dataSource = [],
  loading = false,
  rowSelection,
  className,
}: {
  columns: DataTableColumn<T>[];
  dataSource: T[];
  loading?: boolean;
  pagination?: TablePaginationConfig | false;
  rowSelection?: TableRowSelection<T>;
  className?: string;
}) {
  if (loading) {
    return (
      <div className="nbs-table-loading">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className={cn('nbs-table-wrapper', className)}>
      <table className="nbs-table">
        <thead>
          <tr>
            {rowSelection && <th style={{ width: 40 }} />}
            {columns.map((col, i) => (
              <th key={col.key ?? i} style={{ width: col.width }}>
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataSource.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (rowSelection ? 1 : 0)}
                style={{ textAlign: 'center', padding: '24px' }}
              >
                No data
              </td>
            </tr>
          ) : (
            dataSource.map((row, rowIndex) => {
              const key = (row as any).key ?? rowIndex;
              return (
                <tr key={key}>
                  {rowSelection && (
                    <td>
                      <input
                        type="checkbox"
                        checked={rowSelection.selectedRowKeys?.includes(key)}
                        onChange={(e) => {
                          const keys = rowSelection.selectedRowKeys ?? [];
                          const newKeys = e.target.checked
                            ? [...keys, key]
                            : keys.filter((k) => k !== key);
                          rowSelection.onChange?.(
                            newKeys,
                            dataSource.filter((r: any) => newKeys.includes(r.key))
                          );
                        }}
                      />
                    </td>
                  )}
                  {columns.map((col, colIndex) => (
                    <td key={col.key ?? colIndex}>
                      {col.render
                        ? col.render((row as any)[col.dataIndex as string], row, rowIndex)
                        : (row as any)[col.dataIndex as string]}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
```

Replace every usage of <Table> in the DataTable component body with <NativeTable> using the same props.

---

## STEP 2 — Remove antd from package.json

In root package.json:
1. Remove "antd": "^5.26.7" from dependencies
2. Remove "@ant-design/icons": "^5.6.1" from dependencies
3. Run: npm install

---

## STEP 3 — Remove antd from rollup externals

In rollup.config.js, update the external array from:
```js
external: ['react', 'react-dom', 'react/jsx-runtime', 'antd', '@ant-design/icons'],
```
To:
```js
external: ['react', 'react-dom', 'react/jsx-runtime'],
```

---

## STEP 4 — Create dedicated entry points for Sidebar and Card

The consuming app ONLY imports Sidebar and Card. We need dedicated entry files for each so they build in complete isolation with zero code from other components.

### 4a — Create StoryBook/ConsumerComponents/entries/sidebar.ts
```ts
// Isolated entry point — exports ONLY Sidebar and its types
// Nothing else from the library is included in this bundle
export {
  Sidebar,
  SidebarHeader,
  type SidebarProps,
  type SidebarItem,
  type SidebarHeaderProps,
  type SidebarConfig,
  type SidebarSection,
  type SidebarNavItem,
  type SidebarNavLinkItem,
  type SidebarNavGroupItem,
} from '../components/Sidebar';
```

### 4b — Create StoryBook/ConsumerComponents/entries/card.ts
```ts
// Isolated entry point — exports ONLY Card and its types
// Nothing else from the library is included in this bundle
export {
  Card,
  type CardProps,
  type CardConfig,
} from '../components/Card';
```

---

## STEP 5 — Update rollup.config.js for multi-entry isolated builds

Replace the entire module.exports in rollup.config.js with:

```js
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
    plugins: basePlugins(true), // extracts styles.css
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
```

---

## STEP 6 — Update package.json exports field

Replace the exports field in package.json with:

```json
"exports": {
  ".": {
    "types": "./dist/index.d.ts",
    "import": "./dist/index.esm.js",
    "require": "./dist/index.js"
  },
  "./Sidebar": {
    "types": "./dist/index.d.ts",
    "import": "./dist/sidebar.js",
    "require": "./dist/sidebar.js"
  },
  "./Card": {
    "types": "./dist/index.d.ts",
    "import": "./dist/card.js",
    "require": "./dist/card.js"
  },
  "./styles.css": "./dist/styles.css",
  "./dist/styles.css": "./dist/styles.css",
  "./tokens.css": "./dist/tokens.css"
}
```

Also update sideEffects in package.json to:
```json
"sideEffects": ["dist/styles.css", "dist/tokens.css"]
```

---

## STEP 7 — Build the library

Run:
```bash
npm run build
```

Verify all of the following after build completes:

```bash
# 1. Confirm isolated bundles exist
ls -lh dist/sidebar.js dist/card.js dist/index.esm.js

# 2. Confirm antd is completely gone from ALL dist files
grep -r "antd\|@ant-design" dist/ --include="*.js" | head -5

# 3. Confirm sidebar bundle does NOT contain Card, Button, DataTable etc
grep -c "DataTable\|Button\|Alert\|Modal\|antd" dist/sidebar.js

# 4. Confirm card bundle does NOT contain Sidebar, DataTable etc  
grep -c "Sidebar\|DataTable\|Button\|Alert\|antd" dist/card.js

# 5. Show sizes
ls -lh dist/sidebar.js dist/card.js dist/index.esm.js
```

Expected results:
- antd grep → empty (nothing)
- sidebar.js grep count → 0
- card.js grep count → 0
- sidebar.js and card.js should each be significantly smaller than index.esm.js

---

## STEP 8 — Commit and push

```bash
git add .
git commit -m "fix: remove antd, add isolated Sidebar+Card entry points, enable tree-shaking"
git push origin main
git rev-parse HEAD
```

Report the commit hash.

---

## STEP 9 — Final report

Give me:
1. Result of antd grep (should be empty)
2. File sizes of dist/sidebar.js, dist/card.js, dist/index.esm.js
3. Result of the grep count checks (should be 0 for both)
4. The git commit hash
5. Any errors encountered
```
