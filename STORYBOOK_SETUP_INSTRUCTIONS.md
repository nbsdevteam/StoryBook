# Storybook Component Library Setup Instructions
**Transform React Admin Template → Reusable Component Library (GitHub Distribution)**

---

## 📋 PROJECT GOAL

**Convert this React 19 + TypeScript + Vite admin template into a REUSABLE component library that:**
- ✅ Can be installed from GitHub: `npm install git+https://github.com/syednaqvi98nibras/StoryBook.git`
- ✅ Exports generic, reusable components
- ✅ Has Storybook for documentation and component browsing
- ✅ Components work standalone with their own styles
- ✅ No Redux/Router dependencies (or made optional via props)
- ✅ Can be deployed to Chromatic for team access

---

## 🎯 3-DAY ACCELERATED PLAN

### **DAY 1: Setup & Restructure (3-4 hours)** ✅
**Goal:** Storybook working + Components restructured into `src/components/`

### **DAY 2: Make Components Generic (4-5 hours)** 🚀
**Goal:** Remove hardcoded values, Redux/Router deps, make everything prop-driven

### **DAY 3: Export & Deploy (2-3 hours)** 🔧
**Goal:** Create exports, build system, deploy to Chromatic, test GitHub installation

**Total: 9-12 hours**

---

## 📅 DAY 1: SETUP & RESTRUCTURE (3-4 HOURS)

### ⏰ HOUR 1: Install Storybook (60 mins)

#### Step 1.1: Install Storybook (5 mins)
```bash
npx storybook@latest init --type vite_react

# When prompted:
# - Use TypeScript? YES
# - Install dependencies? YES  
# - Run Storybook? NO (configure first)
```

#### Step 1.2: Configure `.storybook/main.ts` (10 mins)

**File:** `.storybook/main.ts`
```typescript
import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/components/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
    '@storybook/addon-docs',
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
          '@/styles': path.resolve(__dirname, '../src/styles'),
          '@/utils': path.resolve(__dirname, '../src/utils'),
          '@/types': path.resolve(__dirname, '../src/types'),
        },
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
```

#### Step 1.3: Configure `.storybook/preview.ts` (10 mins)

**File:** `.storybook/preview.ts`
```typescript
import type { Preview } from '@storybook/react';

// Import global styles that ALL components need
import '../src/styles/global.css';
import '../src/styles/components.css';
// Import Bootstrap or any global CSS framework
import 'bootstrap/dist/css/bootstrap.min.css';

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
```

#### Step 1.4: Create `.storybook/tsconfig.json` (3 mins)


**File:** `.storybook/tsconfig.json`
```json
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "types": ["node"]
  },
  "include": [
    "../src/**/*",
    "./**/*"
  ]
}
```

#### Step 1.5: Update package.json (5 mins)
```json
{
  "name": "@yourorg/component-library",
  "version": "1.0.0",
  "description": "Reusable React component library",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "files": [
    "dist",
    "src"
  ],
  "scripts": {
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "build": "rollup -c",
    "prepublishOnly": "npm run build"
  },
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/syednaqvi98nibras/StoryBook.git"
  }
}
```

#### Step 1.6: Test Storybook (2 mins)
```bash
npm run storybook
```

Should open at `http://localhost:6006` with default examples.

---

### ⏰ HOUR 2-3: Restructure Components (2 hours)

#### NEW Project Structure:
```
src/
├── components/              # ALL reusable components go here
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.module.css
│   │   ├── Button.stories.tsx
│   │   └── index.ts
│   ├── Card/
│   │   ├── Card.tsx
│   │   ├── Card.module.css
│   │   ├── Card.stories.tsx
│   │   └── index.ts
│   ├── DataTable/
│   ├── Header/
│   ├── Sidebar/
│   └── index.ts            # Export all components
├── styles/
│   ├── global.css          # Global styles
│   ├── components.css      # Shared component styles
│   └── variables.css       # CSS variables
├── utils/                  # Utility functions
├── types/                  # TypeScript types
└── index.ts               # Main entry point
```

#### Step 2.1: Create Component Template (15 mins)

**File:** `src/components/_TEMPLATE/Component.tsx`
```typescript
import React from 'react';
import styles from './Component.module.css';

export interface ComponentProps {
  /**
   * Brief description
   */
  variant?: 'primary' | 'secondary';
  /**
   * Component children
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Click handler
   */
  onClick?: () => void;
}

export const Component: React.FC<ComponentProps> = ({
  variant = 'primary',
  children,
  className = '',
  onClick,
}) => {
  return (
    <div 
      className={`${styles.component} ${styles[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Component;
```

**File:** `src/components/_TEMPLATE/Component.module.css`
```css
.component {
  /* Base styles */
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.primary {
  background-color: #007bff;
  color: white;
}

.secondary {
  background-color: #6c757d;
  color: white;
}

.component:hover {
  opacity: 0.9;
}
```

**File:** `src/components/_TEMPLATE/Component.stories.tsx`
```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Component } from './Component';

const meta: Meta<typeof Component> = {
  title: 'Components/Component',
  component: Component,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Visual style variant',
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Component',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Component',
  },
};
```

**File:** `src/components/_TEMPLATE/index.ts`
```typescript
export { Component, type ComponentProps } from './Component';
export { default } from './Component';
```

#### Step 2.2: Move First Component (30 mins)

**Cursor Prompt:**
```
Move the Button component from feature-module/uiInterface/base-ui/buttons.tsx to the new structure:

1. Create src/components/Button/ folder
2. Extract the BUTTON COMPONENT CODE (not the full page) from buttons.tsx
3. Create Button.tsx with the component code
4. Create Button.module.css with button-specific styles
5. Create Button.stories.tsx following the template
6. Create index.ts that exports the Button

CRITICAL:
- Extract ONLY the reusable button logic, not page layout
- Remove any Redux dependencies (make state props instead)
- Remove any Router dependencies (use onClick props instead of Link)
- Make all hardcoded values into props
- Bundle styles with component using CSS Modules
- Add TypeScript interface for all props
- Add JSDoc comments for each prop

Show me the extracted files.
```

#### Step 2.3: Create 5 Core Components (75 mins)

**Cursor Prompt:**
```
Following the same pattern as Button, create these components in src/components/:

BATCH 1 (Core UI):
1. Card - from feature-module/uiInterface/base-ui/cards.tsx
2. Badge - from feature-module/uiInterface/base-ui/badges.tsx
3. Alert - from feature-module/uiInterface/base-ui/alerts.tsx
4. Modal - from feature-module/uiInterface/base-ui/modals.tsx
5. DataTable - from core/common/dataTable/

For EACH component:
1. Extract reusable component logic
2. Remove Redux/Router dependencies
3. Convert hardcoded values to props
4. Create .module.css for styles
5. Create .stories.tsx with multiple variants
6. Export from index.ts
7. Add to src/components/index.ts

IMPORTANT:
- Make components PURE (no side effects)
- All dependencies via props
- Styles scoped to component
- Full TypeScript types
- Comprehensive prop documentation

Create all 5 components now.
```

---

## 📅 DAY 2: MAKE COMPONENTS GENERIC (4-5 HOURS)

### ⏰ HOUR 4-5: Remove Dependencies (2 hours)

#### Pattern 1: Remove Redux Dependencies

**BEFORE (uses Redux):**
```typescript
import { useSelector } from 'react-redux';

const Header = () => {
  const theme = useSelector((state) => state.themeSetting.dataTheme);
  
  return <header className={theme}>...</header>;
};
```

**AFTER (uses props):**
```typescript
export interface HeaderProps {
  theme?: 'light' | 'dark';
  onThemeChange?: (theme: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  theme = 'light',
  onThemeChange 
}) => {
  return (
    <header className={theme}>
      <button onClick={() => onThemeChange?.('dark')}>
        Toggle Theme
      </button>
    </header>
  );
};
```

#### Pattern 2: Remove Router Dependencies

**BEFORE (uses Router):**
```typescript
import { Link, useNavigate } from 'react-router-dom';

const MenuItem = ({ to, label }) => {
  const navigate = useNavigate();
  
  return (
    <Link to={to} onClick={() => navigate(to)}>
      {label}
    </Link>
  );
};
```

**AFTER (uses props):**
```typescript
export interface MenuItemProps {
  href?: string;
  label: string;
  onClick?: (e: React.MouseEvent) => void;
  active?: boolean;
}

export const MenuItem: React.FC<MenuItemProps> = ({ 
  href,
  label,
  onClick,
  active = false 
}) => {
  return (
    <a 
      href={href} 
      onClick={onClick}
      className={active ? 'active' : ''}
    >
      {label}
    </a>
  );
};
```

#### Step 4.1: Batch Convert Components (90 mins)

**Cursor Prompt:**
```
Convert these components to be dependency-free:

BATCH (10 components):
1. src/components/Header/
2. src/components/Sidebar/
3. src/components/Footer/
4. src/components/Navigation/
5. src/components/UserProfile/
6. src/components/SearchInput/
7. src/components/DatePicker/
8. src/components/Dropdown/
9. src/components/Tabs/
10. src/components/Pagination/

For EACH component:

STEP 1 - IDENTIFY DEPENDENCIES:
- List all Redux useSelector/useDispatch calls
- List all Router Link/useNavigate/useLocation calls
- List all hardcoded values
- List all API calls

STEP 2 - CONVERT TO PROPS:
- Redux state → component props with defaults
- Redux dispatch → callback props (onX handlers)
- Router Link → href prop + onClick handler
- Hardcoded values → props with defaults
- API calls → data props + loading/error states

STEP 3 - UPDATE TYPES:
- Create comprehensive TypeScript interface
- Add JSDoc comments for each prop
- Mark required vs optional props
- Add prop defaults in component

STEP 4 - UPDATE STORIES:
- Add controls for all props
- Create variants showing different states
- Add examples with callbacks
- Show loading/error states if applicable

Do this for all 10 components now.
```

#### Step 4.2: Handle Complex Components (30 mins)

For components with complex state (forms, multi-step wizards):

**Cursor Prompt:**
```
For complex stateful components, use CONTROLLED vs UNCONTROLLED pattern:

Example - Form Component:

CONTROLLED (parent manages state):
```typescript
export interface FormProps {
  values: Record<string, any>;
  onChange: (values: Record<string, any>) => void;
  onSubmit: (values: Record<string, any>) => void;
}

export const Form: React.FC<FormProps> = ({ values, onChange, onSubmit }) => {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(values); }}>
      <input 
        value={values.name} 
        onChange={(e) => onChange({ ...values, name: e.target.value })}
      />
    </form>
  );
};
```

UNCONTROLLED (component manages state):
```typescript
export interface FormProps {
  initialValues?: Record<string, any>;
  onSubmit: (values: Record<string, any>) => void;
}

export const Form: React.FC<FormProps> = ({ initialValues = {}, onSubmit }) => {
  const [values, setValues] = useState(initialValues);
  
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(values); }}>
      <input 
        value={values.name} 
        onChange={(e) => setValues({ ...values, name: e.target.value })}
      />
    </form>
  );
};
```

Convert these complex components offering BOTH patterns where appropriate:
1. Form components
2. Multi-step wizards
3. Data tables with filters
4. Search with autocomplete
```

---

### ⏰ HOUR 6-7: Bulk Component Migration (2 hours)

#### Step 6.1: Categorize Remaining Components (15 mins)
```
COMPONENT_INVENTORY.md:

COMPLETED (Day 1):
✅ Button, Card, Badge, Alert, Modal, DataTable

PRIORITY 1 - Core UI (30 components):
- Accordion, Breadcrumb, Carousel, Collapse
- Dropdown, ListGroup, Nav, Pagination
- Popover, Progress, Spinner, Tabs, Tooltip
- Input, Select, Checkbox, Radio, Switch
- Textarea, FileUpload, DatePicker, TimePicker
- ColorPicker, RangeSlider, Rating
- Avatar, Chip, Divider, Icon
- Loading, EmptyState

PRIORITY 2 - Complex Components (20 components):
- Form, FormField, FormGroup, FormValidation
- Table, TreeView, Calendar, Timeline
- Chart, Graph, Map
- Wizard, Stepper
- Menu, Sidebar, Header, Footer, Layout
- Dialog, Drawer, Notification, Toast

PRIORITY 3 - Feature-Specific (skip or low priority):
- CRM components, HRM components, etc.
- These are too app-specific
```

#### Step 6.2: Batch Generate Priority 1 (90 mins)

**Cursor Prompt:**
```
Using Cursor Composer, generate components for PRIORITY 1 in parallel:

For each component from the source code:
1. Create folder: src/components/[ComponentName]/
2. Extract component logic → [ComponentName].tsx
3. Extract styles → [ComponentName].module.css
4. Create stories → [ComponentName].stories.tsx
5. Create exports → index.ts
6. Add to src/components/index.ts

Use the template pattern from Button component.

AUTOMATION INSTRUCTIONS:
- Process 5 components at a time
- Show me the list after each batch
- I'll verify before you continue

Start with BATCH 1:
1. Accordion
2. Breadcrumb  
3. Carousel
4. Collapse
5. Dropdown
```

#### Step 6.3: Generate Priority 2 (15 mins for setup)

For complex components, generate STRUCTURE only:

**Cursor Prompt:**
```
For PRIORITY 2 components, create the folder structure and placeholder files:

For each component:
1. Create src/components/[Name]/ folder
2. Create [Name].tsx with basic interface (no logic yet)
3. Create [Name].module.css empty file
4. Create [Name].stories.tsx with Default story only
5. Create index.ts with exports
6. Mark as TODO in src/components/index.ts with // TODO: Implement

This creates the structure so we can fill in later.

Generate structure for all PRIORITY 2 components now.
```

---

## 📅 DAY 3: EXPORT & DEPLOY (2-3 HOURS)

### ⏰ HOUR 8: Create Export System (60 mins)

#### Step 8.1: Main Export File (10 mins)

**File:** `src/index.ts`
```typescript
// Core UI Components
export { Button, type ButtonProps } from './components/Button';
export { Card, type CardProps } from './components/Card';
export { Badge, type BadgeProps } from './components/Badge';
export { Alert, type AlertProps } from './components/Alert';
export { Modal, type ModalProps } from './components/Modal';

// Data Display
export { DataTable, type DataTableProps } from './components/DataTable';

// Forms
export { Input, type InputProps } from './components/Input';
export { Select, type SelectProps } from './components/Select';
export { Checkbox, type CheckboxProps } from './components/Checkbox';

// Layout
export { Header, type HeaderProps } from './components/Header';
export { Sidebar, type SidebarProps } from './components/Sidebar';
export { Footer, type FooterProps } from './components/Footer';

// Utilities
export * from './utils';
export * from './types';
```

#### Step 8.2: Component Index (10 mins)

**File:** `src/components/index.ts`
```typescript
// Auto-generated - DO NOT EDIT MANUALLY
export * from './Button';
export * from './Card';
export * from './Badge';
export * from './Alert';
export * from './Modal';
export * from './DataTable';
// ... all components
```

#### Step 8.3: Setup Build System (40 mins)

Install Rollup:
```bash
npm install --save-dev rollup @rollup/plugin-node-resolve @rollup/plugin-commonjs @rollup/plugin-typescript rollup-plugin-peer-deps-external rollup-plugin-postcss @rollup/plugin-terser
```

**File:** `rollup.config.js`
```javascript
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
    }
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({ 
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist',
    }),
    postcss({
      modules: true,
      extract: 'styles.css',
      minimize: true,
    }),
    terser(),
  ],
  external: ['react', 'react-dom'],
};
```

Test build:
```bash
npm run build
# Should create dist/ folder
```

---

### ⏰ HOUR 9: Deploy & Test (60 mins)

#### Step 9.1: Build Storybook (10 mins)
```bash
npm run build-storybook
# Creates storybook-static/ folder
```

#### Step 9.2: Deploy to Chromatic (20 mins)
```bash
# Install Chromatic
npm install --save-dev chromatic

# Deploy (get token from chromatic.com)
npx chromatic --project-token=<your-token>
```

Add to package.json:
```json
{
  "scripts": {
    "chromatic": "npx chromatic --project-token=<your-token>"
  }
}
```

#### Step 9.3: Test GitHub Installation (30 mins)

**Create test project:**
```bash
# In a NEW folder
mkdir test-library
cd test-library
npm init -y
npm install git+https://github.com/syednaqvi98nibras/StoryBook.git
```

**Test imports:**
```typescript
// test-app.tsx
import { Button, Card, DataTable } from '@yourorg/component-library';

function App() {
  return (
    <div>
      <Button variant="primary">Test Button</Button>
      <Card title="Test Card">Content</Card>
    </div>
  );
}
```

If this works → **SUCCESS!** ✅

---

### ⏰ HOUR 10: Documentation (60 mins)

#### Step 10.1: Create README (30 mins)

**File:** `README.md`
```markdown
# Component Library

Reusable React component library built with TypeScript, Vite, and Storybook.

## 🚀 Installation
```bash
npm install git+https://github.com/syednaqvi98nibras/StoryBook.git
```

## 📖 Usage
```typescript
import { Button, Card, DataTable } from '@yourorg/component-library';
import '@yourorg/component-library/dist/styles.css'; // Import styles

function App() {
  return (
    <Button variant="primary" onClick={() => console.log('clicked')}>
      Click Me
    </Button>
  );
}
```

## 🎨 Components

### Button
```typescript
import { Button } from '@yourorg/component-library';

<Button 
  variant="primary" 
  size="medium"
  onClick={() => {}}
>
  Button Text
</Button>
```

### Card
```typescript
import { Card } from '@yourorg/component-library';

<Card 
  title="Card Title"
  footer={<button>Action</button>}
>
  Card content
</Card>
```

[... document all components]

## 📚 Storybook

View all components: https://your-project.chromatic.com

Or run locally:
```bash
npm run storybook
```

## 🔧 Development
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

## 📦 What's Included

- 50+ React components
- TypeScript support
- CSS Modules for styling
- Comprehensive Storybook documentation
- Tree-shakeable exports
```

#### Step 10.2: Create COMPONENT_GUIDE.md (20 mins)

**File:** `COMPONENT_GUIDE.md`
```markdown
# Component Development Guide

## Creating a New Component

1. **Create folder structure:**
```
src/components/MyComponent/
├── MyComponent.tsx
├── MyComponent.module.css
├── MyComponent.stories.tsx
└── index.ts
```

**Component template:**
```typescript
import React from 'react';
import styles from './MyComponent.module.css';

export interface MyComponentProps {
  /** Prop description */
  variant?: 'primary' | 'secondary';
}

export const MyComponent: React.FC<MyComponentProps> = ({ 
  variant = 'primary' 
}) => {
  return <div className={styles[variant]}>Content</div>;
};

export default MyComponent;
```

**Export from index.ts:**
```typescript
export { MyComponent, type MyComponentProps } from './MyComponent';
export { default } from './MyComponent';
```

**Add to src/components/index.ts:**
```typescript
export * from './MyComponent';
```

**Add to src/index.ts:**
```typescript
export { MyComponent, type MyComponentProps } from './components/MyComponent';
```

## Component Principles

✅ **DO:**
- Make components pure (no side effects)
- Accept all config via props
- Use TypeScript for all props
- Include JSDoc comments
- Use CSS Modules for styles
- Provide sensible defaults
- Handle edge cases (loading, error, empty)

❌ **DON'T:**
- Use Redux/Context (use props)
- Use Router (use href/onClick props)
- Make API calls (accept data via props)
- Use global state
- Hardcode values

## Story Best Practices

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { MyComponent } from './MyComponent';

const meta: Meta<typeof MyComponent> = {
  title: 'Components/MyComponent',
  component: MyComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};
```
```

#### Step 10.3: Update package.json metadata (10 mins)
```json
{
  "name": "@yourorg/component-library",
  "version": "1.0.0",
  "description": "Production-ready React component library with TypeScript and Storybook",
  "keywords": ["react", "components", "typescript", "storybook", "ui-library"],
  "author": "Your Team",
  "license": "MIT",
  "homepage": "https://github.com/syednaqvi98nibras/StoryBook#readme",
  "bugs": {
  "url": "https://github.com/syednaqvi98nibras/StoryBook/issues" 
   }
}
```

---

## ✅ FINAL CHECKLIST

### Day 1 Complete When:
- [ ] Storybook running without errors
- [ ] 5+ components migrated to src/components/
- [ ] Each component has .tsx, .module.css, .stories.tsx, index.ts
- [ ] Components render in Storybook
- [ ] Template system documented

### Day 2 Complete When:
- [ ] 30+ components migrated and generic
- [ ] No Redux/Router dependencies in components
- [ ] All hardcoded values converted to props
- [ ] TypeScript interfaces complete
- [ ] Stories show multiple variants

### Day 3 Complete When:
- [ ] src/index.ts exports all components
- [ ] Build system working (npm run build creates dist/)
- [ ] Test installation from GitHub works
- [ ] Storybook deployed to Chromatic
- [ ] README and docs complete
- [ ] Team can install and use library

---

## 🚀 QUICK START FOR CURSOR

**Phase 1 - Setup (Hour 1):**
```
Install Storybook and configure .storybook/main.ts and preview.ts according to instructions.
Test that Storybook runs.
```

**Phase 2 - First Component (Hour 2):**
```
Extract Button component from feature-module/uiInterface/base-ui/buttons.tsx
Create src/components/Button/ with:
- Button.tsx (remove Redux/Router, make props-driven)
- Button.module.css (scoped styles)
- Button.stories.tsx (multiple variants)
- index.ts (exports)

Show me the files.
```

**Phase 3 - Batch Migration (Hours 3-7):**
```
Following the Button pattern, migrate these 30 components to src/components/:
[list components]

For each:
1. Extract reusable logic
2. Remove dependencies  
3. Convert to props
4. Add TypeScript
5. Create stories

Process in batches of 5.
```

**Phase 4 - Build & Deploy (Hours 8-10):**
```
Setup Rollup build system
Create src/index.ts with all exports
Test build: npm run build
Deploy Storybook to Chromatic
Test GitHub installation
Create documentation
```

---

## 📝 IMPORTANT RULES

- Use TypeScript (.tsx, .ts) for ALL Storybook files
- Create stories NEXT TO components, don't move components
- Use path aliases (@/components, @/hooks, etc.)
- Don't modify existing component code
- Use decorators for Redux/Router, don't remove dependencies
- Follow existing project structure for story categories

**Start with Phase 1 (Setup), then create 3 sample stories:**
1. `src/feature-module/uiInterface/base-ui/buttons.stories.tsx`
2. `src/core/common/dataTable/index.stories.tsx`
3. `src/core/common/header/index.stories.tsx`
