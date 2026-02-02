# NBS Component Library

Reusable React component library for NBS projects.

## Installation

**Option 1: Install Latest Version (Recommended)**
Always get the newest release automatically:
```bash
npm install git+https://github.com/syednaqvi98nibras/StoryBook.git#latest
```

Or in `package.json`:
```json
{
  "dependencies": {
    "@nbs/component-library": "github:syednaqvi98nibras/StoryBook#latest"
  }
}
```

**Option 2: Pin to Specific Version (Production)**
For production apps that need stability:
```bash
npm install git+https://github.com/syednaqvi98nibras/StoryBook.git#v1.0.0
```

Or in `package.json`:
```json
{
  "dependencies": {
    "@nbs/component-library": "github:syednaqvi98nibras/StoryBook#v1.0.0"
  }
}
```

**Version Management:**
- ✅ **`#latest`** - Always points to the most recent release (auto-updates)
- ✅ **`#v1.0.0`** - Pin to specific version for production stability
- ✅ Easy rollbacks - Change version tag in `package.json` and run `npm install`

**Available versions:** Check [GitHub Releases](https://github.com/syednaqvi98nibras/StoryBook/releases) for all available versions.

## Usage

```typescript
import { Button, Card, Badge } from '@nbs/component-library';
import '@nbs/component-library/dist/styles.css';

function App() {
  return (
    <Button variant="primary">Click Me</Button>
  );
}
```

## Config-Driven Components

Complex components support a `config` prop to drive rendering while remaining
framework-agnostic (pure CSS modules + design tokens). This works with Bootstrap,
Tailwind, or no framework at all.

Example:

```typescript
import { Card } from '@nbs/component-library';

<Card
  config={{
    header: { title: 'Config Card', subtitle: 'Driven by config' },
    content: 'Card content',
    footer: { actions: { primary: { label: 'Save', onClick: () => {} } } },
    variant: 'outlined',
  }}
/>;
```

New components include:
`Dialog`, `Tabs`, `Accordion`, `NavigationMenu`, `Breadcrumb`, `DropdownMenu`,
`Form`, `Combobox`, `CommandPalette`, `Avatar`, `Tooltip`, `Progress`, `Skeleton`,
`Separator`.

## Browse Components Locally

```bash
# Clone the repository
git clone https://github.com/syednaqvi98nibras/StoryBook.git
cd StoryBook
npm install

# Run Storybook
npm run storybook
```

## Development

```bash
# Install dependencies
npm install

# Run Storybook
npm run storybook

# Build library
npm run build

# Build Storybook
npm run build-storybook
```

## 🎨 Components

### UI Components
- **Button** - Multiple variants, sizes, and states
- **Card** - Flexible card with header, body, footer, and image support
- **Badge** - Status indicators with multiple variants
- **Alert** - Dismissible alerts with icons
- **Modal** - Flexible modal dialogs

### Data Components
- **DataTable** - Feature-rich data table with search, selection, and pagination

### Form Components
- **Input** - Text inputs with validation states and icons
- **Select** - Dropdown selects with multiple selection support
- **Checkbox** - Checkboxes with sizes and validation
- **Textarea** - Multi-line text inputs with auto-resize
- **Radio** - Radio buttons for single selection
- **Switch** - Toggle switches with multiple variants

## 📦 What's Included

- ✅ 12+ React components
- ✅ Full TypeScript support
- ✅ CSS Modules for scoped styling
- ✅ Comprehensive Storybook documentation
- ✅ Tree-shakeable exports (ESM + CJS)
- ✅ Type definitions included
- ✅ Bootstrap CSS included

## 🏗️ Build Output

The library builds to:
- `dist/index.js` - CommonJS bundle
- `dist/index.esm.js` - ES Module bundle
- `dist/index.d.ts` - TypeScript definitions
- `dist/styles.css` - Extracted CSS (includes Bootstrap)

## 📝 License

MIT

## 🔗 Repository

https://github.com/syednaqvi98nibras/StoryBook
