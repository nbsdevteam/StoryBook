# Development Guide: Making Changes & Adding Components

## ⚡ Quick Start: Create a Component in 30 Seconds

**Want to add a new component? Just run this command:**

```bash
npm run create-component ComponentName
```

**Example:**
```bash
npm run create-component Spinner
```

This automatically:
- ✅ Creates component folder with all files
- ✅ Renames and updates all template files
- ✅ Adds exports to `src/components/index.ts`
- ✅ Adds exports to `src/index.ts` (main library export)
- ✅ Sets up Storybook stories

**Then you just edit 2 files:**
1. `src/components/Spinner/Spinner.tsx` - Your component logic
2. `src/components/Spinner/Spinner.module.css` - Your styles

**View it:**
```bash
npm run storybook
```

That's it! No manual file copying, renaming, or export updates needed.

---

## 📁 Project Structure Overview

```
StoryBook/
├── src/
│   ├── components/          ← ALL REUSABLE COMPONENTS HERE
│   │   ├── Button/
│   │   │   ├── Button.tsx           ← Component implementation
│   │   │   ├── Button.module.css    ← Component styles (CSS Modules)
│   │   │   ├── Button.stories.tsx   ← Storybook stories
│   │   │   └── index.ts             ← Component exports
│   │   ├── Card/
│   │   ├── Input/
│   │   ├── _TEMPLATE/               ← Template for new components
│   │   │   ├── Component.tsx
│   │   │   ├── Component.module.css
│   │   │   ├── Component.stories.tsx
│   │   │   └── index.ts
│   │   └── index.ts                 ← Barrel export (exports all components)
│   │
│   ├── index.ts             ← MAIN LIBRARY EXPORT (what gets published)
│   │
│   ├── core/                ← Internal app code (NOT exported)
│   ├── feature-module/      ← Internal app code (NOT exported)
│   └── assets/              ← Images, icons, etc.
│
├── .storybook/              ← Storybook configuration
├── dist/                    ← Built library (generated, don't edit)
├── rollup.config.js         ← Build configuration
└── package.json             ← Package metadata
```

## 🎯 Key Locations

### **Components Directory**
**Location:** `src/components/`

This is where ALL reusable components live. Each component has its own folder with:
- `ComponentName.tsx` - The component code
- `ComponentName.module.css` - Scoped styles (CSS Modules)
- `ComponentName.stories.tsx` - Storybook documentation/examples
- `index.ts` - Exports for the component

**Current Components:**
- `Button/` - Button component with variants
- `Card/` - Card component with header/footer
- `Badge/` - Badge component
- `Alert/` - Alert/notification component
- `Modal/` - Modal dialog component
- `DataTable/` - Data table with sorting/filtering
- `Input/` - Text input component
- `Select/` - Dropdown select component
- `Checkbox/` - Checkbox component
- `Textarea/` - Textarea component
- `Radio/` - Radio button component
- `Switch/` - Toggle switch component
- `ErrorBoundary/` - Error boundary wrapper
- `_TEMPLATE/` - Template for creating new components

### **Main Export File**
**Location:** `src/index.ts`

This file exports all components that will be available when someone installs your library:
```typescript
export { Button, type ButtonProps } from './components/Button';
export { Card, type CardProps } from './components/Card';
// ... etc
```

**Important:** If you add a new component, you MUST add it here for it to be available to consumers.

### **Component Barrel Export**
**Location:** `src/components/index.ts`

Exports all components from one place (used internally).

---

## ✏️ How to Modify Existing Components

### Step 1: Navigate to Component Folder
Example: To modify the Button component:
```
src/components/Button/
```

### Step 2: Edit the Component Files

**Edit Component Logic:**
- Open `Button.tsx` to change functionality, props, or behavior
- Update the `ButtonProps` interface if you need new props
- Modify the component implementation

**Edit Styles:**
- Open `Button.module.css` to modify component styles
- Use CSS Modules (scoped styles) - classes are automatically scoped
- Example: `.button { ... }` becomes a unique class name

**Update Stories:**
- Open `Button.stories.tsx` to add/update Storybook examples
- Add new story variants to showcase different use cases
- Update argTypes to control Storybook controls

### Step 3: Test Your Changes

**Option A: View in Storybook (Recommended)**
```bash
npm run storybook
```
- Opens at `http://localhost:6006`
- Navigate to your component in the sidebar
- See changes in real-time (hot reload)
- Test different props using Storybook controls

**Option B: Build and Test in Consumer App**
```bash
npm run build
```
- Builds the library to `dist/`
- Test in a consumer app that installs from GitHub
- Make sure to rebuild after changes

### Step 4: Update Types (if needed)

If you added new props, the TypeScript types are automatically exported via:
```typescript
export { Button, type ButtonProps } from './components/Button';
```

The `ButtonProps` interface in `Button.tsx` is automatically available to consumers.

**Example:**
```typescript
// In Button.tsx
export interface ButtonProps {
  variant?: 'primary' | 'secondary';
  newProp?: string;  // ← New prop you added
}

// Automatically available as:
// import { Button, type ButtonProps } from '@nbs/component-library';
```

---

## ➕ How to Add a New Component

### 🚀 Quick Method: Automated Component Creation (Recommended)

**Use the automated script to create a component in seconds!**

```bash
npm run create-component ComponentName
```

**Example:**
```bash
npm run create-component Spinner
```

This single command will:
- ✅ Copy the `_TEMPLATE` folder
- ✅ Rename all files (Component.tsx → Spinner.tsx, etc.)
- ✅ Replace all "Component" references with "Spinner"
- ✅ Update component exports
- ✅ Add to `src/components/index.ts`
- ✅ Add to `src/index.ts` (main export)

**After running the command, you only need to:**
1. Edit `src/components/Spinner/Spinner.tsx` - Implement your component logic
2. Edit `src/components/Spinner/Spinner.module.css` - Add your styles
3. Edit `src/components/Spinner/Spinner.stories.tsx` - Update Storybook stories (optional)
4. Run `npm run storybook` to view your component

**That's it!** All the boilerplate is done for you.

---

### 📝 Manual Method: Step-by-Step Guide

If you prefer to create components manually or want to understand the process:

### Step 1: Use the Template

Copy the `_TEMPLATE` folder and rename it:

**On Windows (PowerShell):**
```powershell
cd src/components
Copy-Item -Path "_TEMPLATE" -Destination "MyNewComponent" -Recurse
```

**On Mac/Linux:**
```bash
cd src/components
cp -r _TEMPLATE MyNewComponent
```

**Or manually:**
1. Create new folder: `src/components/MyNewComponent/`
2. Copy all files from `_TEMPLATE/` to `MyNewComponent/`

### Step 2: Rename Template Files

Inside `MyNewComponent/` folder, rename:
- `Component.tsx` → `MyNewComponent.tsx`
- `Component.module.css` → `MyNewComponent.module.css`
- `Component.stories.tsx` → `MyNewComponent.stories.tsx`
- `index.ts` → Keep as `index.ts` (but update contents)

### Step 3: Update Component Code

**Edit `MyNewComponent.tsx`:**

```typescript
import React from 'react';
import styles from './MyNewComponent.module.css';

/**
 * MyNewComponent Props Interface
 */
export interface MyNewComponentProps {
  /**
   * Visual style variant
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'success';
  
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
  
  /**
   * Whether component is disabled
   * @default false
   */
  disabled?: boolean;
}

/**
 * MyNewComponent Description
 * 
 * This component does [describe what it does].
 * Use it when [describe when to use it].
 * 
 * @example
 * ```tsx
 * <MyNewComponent variant="primary" onClick={handleClick}>
 *   Click me
 * </MyNewComponent>
 * ```
 */
export const MyNewComponent: React.FC<MyNewComponentProps> = ({
  variant = 'primary',
  children,
  className = '',
  onClick,
  disabled = false,
}) => {
  return (
    <div
      className={`${styles.myNewComponent} ${styles[variant]} ${className}`}
      onClick={disabled ? undefined : onClick}
      aria-disabled={disabled}
    >
      {children}
    </div>
  );
};

export default MyNewComponent;
```

**Key Points:**
- Replace all `Component` with `MyNewComponent` everywhere
- Define your props in the interface with JSDoc comments
- Use CSS Modules for styling (`styles.className`)
- Export both named and default exports
- Add proper TypeScript types
- Include accessibility attributes when needed

### Step 4: Update Styles

**Edit `MyNewComponent.module.css`:**

```css
.myNewComponent {
  /* Base styles */
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  font-size: 1rem;
}

.primary {
  background-color: #007bff;
  color: white;
}

.primary:hover {
  background-color: #0056b3;
}

.secondary {
  background-color: #6c757d;
  color: white;
}

.secondary:hover {
  background-color: #545b62;
}

.success {
  background-color: #28a745;
  color: white;
}

.myNewComponent:disabled,
.myNewComponent[aria-disabled="true"] {
  opacity: 0.6;
  cursor: not-allowed;
}
```

**CSS Modules Tips:**
- Use camelCase or kebab-case for class names
- Classes are automatically scoped (no conflicts)
- Import as: `import styles from './MyNewComponent.module.css'`
- Use as: `className={styles.className}`

### Step 5: Update Index File

**Edit `MyNewComponent/index.ts`:**

```typescript
export { MyNewComponent, type MyNewComponentProps } from './MyNewComponent';
export { default } from './MyNewComponent';
```

This allows importing like:
```typescript
import { MyNewComponent } from './components/MyNewComponent';
// or
import MyNewComponent from './components/MyNewComponent';
```

### Step 6: Create Storybook Stories

**Edit `MyNewComponent.stories.tsx`:**

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { MyNewComponent } from './MyNewComponent';

const meta: Meta<typeof MyNewComponent> = {
  title: 'Components/MyNewComponent',
  component: MyNewComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success'],
      description: 'Visual style variant',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the component is disabled',
    },
    onClick: {
      action: 'clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MyNewComponent>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Component',
    onClick: fn(),
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Component',
    onClick: fn(),
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success Component',
    onClick: fn(),
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    children: 'Disabled Component',
    disabled: true,
    onClick: fn(),
  },
};

export const WithCustomContent: Story = {
  args: {
    variant: 'primary',
    children: (
      <div>
        <strong>Custom Content</strong>
        <p>You can put any React content here</p>
      </div>
    ),
    onClick: fn(),
  },
};
```

**Storybook Tips:**
- `title` determines where it appears in Storybook sidebar
- `argTypes` creates interactive controls
- Each `Story` export is a different example
- Use `fn()` from `@storybook/test` for action handlers

### Step 7: Export from Component Index

**Edit `src/components/index.ts`:**

Add your new component:
```typescript
// ... existing exports ...
export * from './MyNewComponent';
```

### Step 8: Export from Main Library

**Edit `src/index.ts`:**

Add your component to the main export:
```typescript
// ... existing exports ...

// Add your new component
export { MyNewComponent, type MyNewComponentProps } from './components/MyNewComponent';
```

**Important:** Without this step, your component won't be available to consumers who install the library!

### Step 9: Test Your Component

```bash
# Start Storybook
npm run storybook
```

1. Navigate to your component in Storybook sidebar
2. Check all story variants render correctly
3. Test interactive controls
4. Verify styles look good
5. Check accessibility (if applicable)

### Step 10: Build and Verify

```bash
# Build the library
npm run build

# Check that your component is in dist/
# Verify dist/index.d.ts includes your component types
```

**Verify exports:**
- Check `dist/index.js` includes your component
- Check `dist/index.d.ts` includes `MyNewComponentProps` type
- Test installation in a consumer app

---

## 🔄 Complete Workflow Example

Let's say you want to add a `Spinner` component:

### 1. Copy Template
```bash
cd src/components
cp -r _TEMPLATE Spinner
# Or use PowerShell: Copy-Item -Path "_TEMPLATE" -Destination "Spinner" -Recurse
```

### 2. Rename Files
- `Component.tsx` → `Spinner.tsx`
- `Component.module.css` → `Spinner.module.css`
- `Component.stories.tsx` → `Spinner.stories.tsx`

### 3. Implement Spinner.tsx
```typescript
import React from 'react';
import styles from './Spinner.module.css';

export interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary';
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ 
  size = 'medium', 
  variant = 'primary',
  className = '',
}) => {
  return (
    <div 
      className={`${styles.spinner} ${styles[size]} ${styles[variant]} ${className}`}
      role="status"
      aria-label="Loading"
    >
      <div className={styles.spinnerCircle}></div>
    </div>
  );
};

export default Spinner;
```

### 4. Add Styles (Spinner.module.css)
```css
.spinner {
  display: inline-block;
}

.spinnerCircle {
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-top-color: currentColor;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.small .spinnerCircle {
  width: 16px;
  height: 16px;
  border-width: 2px;
}

.medium .spinnerCircle {
  width: 32px;
  height: 32px;
  border-width: 3px;
}

.large .spinnerCircle {
  width: 48px;
  height: 48px;
  border-width: 4px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

### 5. Update Exports
- `Spinner/index.ts`: `export { Spinner, type SpinnerProps } from './Spinner';`
- `src/components/index.ts`: `export * from './Spinner';`
- `src/index.ts`: `export { Spinner, type SpinnerProps } from './components/Spinner';`

### 6. Create Stories
Create `Spinner.stories.tsx` with examples for each size and variant.

### 7. Test
```bash
npm run storybook
# Navigate to Components/Spinner
```

### 8. Build
```bash
npm run build
```

---

## 📝 Best Practices

### ✅ DO:
- **Keep components in `src/components/`** - This is the only place for reusable components
- **Use CSS Modules** - Scoped styles prevent conflicts (`ComponentName.module.css`)
- **Export TypeScript types** - Always export props interface: `export { Component, type ComponentProps }`
- **Create Storybook stories** - Every component should have stories for documentation
- **Keep components prop-driven** - No Redux/Router dependencies, pass data via props
- **Test in Storybook first** - Verify everything works before building
- **Add JSDoc comments** - Document props and component purpose
- **Follow naming conventions** - PascalCase for components, camelCase for props
- **Include accessibility** - Add ARIA attributes, keyboard support when needed

### ❌ DON'T:
- **Don't put components in `src/core/` or `src/feature-module/`** - Those are for internal app code only
- **Don't use global CSS for component styles** - Always use CSS Modules
- **Don't add Redux or Router dependencies** - Components should be standalone
- **Don't forget to export from `src/index.ts`** - Otherwise consumers can't use it
- **Don't skip Storybook stories** - They're essential for documentation
- **Don't use inline styles** - Use CSS Modules instead
- **Don't hardcode values** - Make everything configurable via props

---

## 🚀 Quick Commands Reference

```bash
# Create a new component (automated - RECOMMENDED)
npm run create-component ComponentName
# Example: npm run create-component Spinner

# Start Storybook (view and test components)
npm run storybook
# Opens at http://localhost:6006

# Build library (creates dist/ folder)
npm run build

# Build library with type declarations
npm run build:library

# Run dev server (for internal app, not components)
npm run dev

# Type check (verify TypeScript)
npm run type-check

# Lint code
npm run lint
```

---

## 🎨 Component Categories

Current components are organized by type in Storybook:

**UI Components:**
- Button, Card, Badge, Alert, Modal

**Form Components:**
- Input, Select, Checkbox, Textarea, Radio, Switch

**Data Components:**
- DataTable

**Utility Components:**
- ErrorBoundary

When adding new components, consider which category they belong to. You can organize them in Storybook by updating the `title` in stories:
- `title: 'Components/UI/MyComponent'` for UI components
- `title: 'Components/Forms/MyComponent'` for form components
- `title: 'Components/Data/MyComponent'` for data components

---

## 📚 Additional Resources

- **Component Usage Guide:** See `COMPONENT_USAGE.md` for how consumers use your components
- **Storybook Docs:** View component documentation at `http://localhost:6006` when Storybook is running
- **Template:** Use `src/components/_TEMPLATE/` as a starting point for new components
- **Existing Components:** Look at `Button/` or `Card/` for examples of well-structured components

---

## ❓ Troubleshooting

### Component not showing in Storybook?
- ✅ Check that `ComponentName.stories.tsx` exists
- ✅ Verify the story file exports a default `meta` object
- ✅ Make sure `title` is set correctly
- ✅ Restart Storybook: Stop and run `npm run storybook` again
- ✅ Check browser console for errors

### Component not available after install?
- ✅ Make sure you exported it from `src/index.ts`
- ✅ Run `npm run build` to rebuild the library
- ✅ Check `dist/index.d.ts` to see if types are generated
- ✅ Verify the component is in `dist/index.js`
- ✅ In consumer app, reinstall: `npm install git+https://github.com/syednaqvi98nibras/StoryBook.git`

### Styles not working?
- ✅ Use CSS Modules (`ComponentName.module.css`)
- ✅ Import styles: `import styles from './ComponentName.module.css'`
- ✅ Use: `className={styles.className}` (not `className="className"`)
- ✅ Check that CSS is being bundled (check `dist/styles.css`)

### TypeScript errors?
- ✅ Make sure props interface is exported: `export interface ComponentProps`
- ✅ Export types: `export { Component, type ComponentProps }`
- ✅ Check that types are in `dist/index.d.ts` after build
- ✅ Run `npm run type-check` to see all TypeScript errors

### Build errors?
- ✅ Check `rollup.config.js` configuration
- ✅ Verify all imports are correct
- ✅ Make sure all dependencies are in `package.json`
- ✅ Check for circular dependencies
- ✅ Review build output for specific error messages

### Storybook not starting?
- ✅ Check `.storybook/main.ts` configuration
- ✅ Verify Storybook dependencies are installed: `npm install`
- ✅ Check for port conflicts (default is 6006)
- ✅ Review Storybook logs for errors

---

## 🎯 Quick Checklist for New Components

### Using Automated Script (Recommended):
- [ ] Run `npm run create-component ComponentName`
- [ ] Edit `ComponentName.tsx` - Implement component logic
- [ ] Edit `ComponentName.module.css` - Add styles
- [ ] Edit `ComponentName.stories.tsx` - Update stories (optional)
- [ ] Test in Storybook (`npm run storybook`)
- [ ] Build library (`npm run build`)

### Manual Method:
- [ ] Copied `_TEMPLATE/` folder
- [ ] Renamed all files (Component → YourComponent)
- [ ] Updated component code in `.tsx` file
- [ ] Created/updated styles in `.module.css` file
- [ ] Created Storybook stories in `.stories.tsx` file
- [ ] Updated `ComponentName/index.ts` exports
- [ ] Added to `src/components/index.ts`
- [ ] Added to `src/index.ts` (main export)
- [ ] Tested in Storybook (`npm run storybook`)
- [ ] Verified all variants work
- [ ] Built library (`npm run build`)
- [ ] Checked `dist/` folder for component
- [ ] Verified types in `dist/index.d.ts`

---

## 📦 Versioning & Releases

The component library uses **Semantic Versioning (SemVer)** with Git tags for safe version management. This allows consumers to pin to specific versions and roll back if needed.

### How Versioning Works

When you install from GitHub, you must specify a **git tag** (e.g., `#v1.0.0`, `#v1.1.0`) instead of tracking the `master` branch. This ensures:
- ✅ **Predictable installs** - Same tag = same code
- ✅ **Safe upgrades** - Test new versions before adopting
- ✅ **Easy rollbacks** - Pin to previous version if issues occur

### Creating a New Release

After making changes (new components, bug fixes, features), create a new version:

**1. Determine version bump type:**
- **Patch** (`1.0.0` → `1.0.1`): Bug fixes, small changes
- **Minor** (`1.0.0` → `1.1.0`): New components, new features (backward compatible)
- **Major** (`1.0.0` → `2.0.0`): Breaking changes

**2. Run the release command:**
```bash
# For patch release (bug fixes)
npm run release:patch

# For minor release (new features/components)
npm run release:minor

# For major release (breaking changes)
npm run release:major
```

This will:
- ✅ Update `package.json` version
- ✅ Create a git commit with the version bump
- ✅ Create a git tag (e.g., `v1.1.0`)

**3. Push the tag to GitHub:**
```bash
npm run release:push
```

This pushes both the commit and the tag to GitHub.

**4. Verify the release:**
```bash
# Check local tags
git tag

# Verify the tag was pushed (check GitHub)
# Go to: https://github.com/syednaqvi98nibras/StoryBook/releases
```

### Consumer App: Installing by Version

**Initial install (latest version):**
```json
{
  "dependencies": {
    "@nbs/component-library": "github:syednaqvi98nibras/StoryBook#v1.1.0"
  }
}
```

**Upgrading to a new version:**
```json
{
  "dependencies": {
    "@nbs/component-library": "github:syednaqvi98nibras/StoryBook#v1.2.0"
  }
}
```

Then run:
```bash
npm install
```

**Rolling back to a previous version:**
```json
{
  "dependencies": {
    "@nbs/component-library": "github:syednaqvi98nibras/StoryBook#v1.0.0"
  }
}
```

Then run:
```bash
npm install
```

**Emergency: Pin to specific commit:**
If you need to pin to a specific commit (not a tag):
```json
{
  "dependencies": {
    "@nbs/component-library": "github:syednaqvi98nibras/StoryBook#abc123def"
  }
}
```

### Release Workflow Example

**Scenario:** You just added a new `Spinner` component.

1. **Make your changes:**
   ```bash
   npm run create-component Spinner
   # Edit Spinner.tsx and Spinner.module.css
   # Test in Storybook
   npm run build
   ```

2. **Commit your changes:**
   ```bash
   git add .
   git commit -m "feat: add Spinner component"
   git push origin master
   ```

3. **Create a minor release (new feature):**
   ```bash
   npm run release:minor
   # This creates v1.1.0 (if current version was 1.0.0)
   ```

4. **Push the release:**
   ```bash
   npm run release:push
   ```

5. **Consumers can now install:**
   ```bash
   npm install github:syednaqvi98nibras/StoryBook#v1.1.0
   ```

### Version Number Guidelines

- **Patch** (`1.0.0` → `1.0.1`): Bug fixes, typo fixes, small CSS adjustments
- **Minor** (`1.0.0` → `1.1.0`): New components, new props (backward compatible), new features
- **Major** (`1.0.0` → `2.0.0`): Breaking changes (removed props, changed API, removed components)

### Important Notes

- ⚠️ **Always test before releasing** - Run `npm run build` and `npm run storybook` to verify everything works
- ⚠️ **Never install from `master` branch** - Always use a specific tag for production apps
- ⚠️ **Tag format must be `vX.Y.Z`** - The `v` prefix is required (e.g., `v1.1.0`, not `1.1.0`)
- ⚠️ **Push tags explicitly** - Tags are not pushed with regular `git push`, use `npm run release:push`

### Checking Available Versions

**View all tags locally:**
```bash
git tag
```

**View tags on GitHub:**
- Go to: https://github.com/syednaqvi98nibras/StoryBook/releases
- Or: https://github.com/syednaqvi98nibras/StoryBook/tags

---

Happy coding! 🎉

For questions or issues, refer to existing components like `Button` or `Card` for reference implementations.
