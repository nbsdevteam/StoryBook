# EXECUTION STEP-BY-STEP: Config-Driven Component Architecture Implementation

## 📋 Overview

This document provides a detailed, step-by-step execution plan to transform the NBS Component Library into a fully config-driven architecture as outlined in the external specification. The plan aligns with your existing codebase structure and maintains pure CSS styling for framework agnosticism. The example usage should be fully functional on the ui preview as well. There are many broken components which we will be replacing with shadcdn as per the below plan

## 🎯 Project Context

**Current State:**
- **Location**: `StoryBook/ConsumerComponents/components/`
- **Styling**: CSS Modules (`.module.css`) + design tokens (`tokens.css`)
- **Build**: Rollup + PostCSS + TypeScript
- **Existing Components**: 15+ components (Sidebar, Card, Button, Input, Modal, DataTable, etc.)
- **Glass Effect**: `GlassEffectWrapper` component with "shine" and "perfume" variants

**Target State:**
- Config-driven architecture for complex components
- Enhanced type safety with comprehensive TypeScript interfaces
- Maintain pure CSS approach (no Tailwind/Bootstrap dependencies)
- Backward compatibility where possible
- Comprehensive Storybook documentation

---

## 📊 Implementation Phases

### Phase 1: Foundation & Core Types (Week 1)
### Phase 2: Enhanced Card & Dialog (Week 2)
### Phase 3: Navigation Components (Week 3-4)
### Phase 4: Data & Forms (Week 5-6)
### Phase 5: Utility Components (Week 7)
### Phase 6: Documentation & Testing (Week 8)

---

## 🏗️ PHASE 1: Foundation & Core Types (Week 1)

### Step 1.1: Create Base Type Definitions

**File**: `StoryBook/ConsumerComponents/types/component-config.types.ts`

**Purpose**: Define shared types used across all config-driven components

**Actions**:
1. Create new file `component-config.types.ts`
2. Define base interfaces:

```typescript
import { LucideIcon } from 'lucide-react';
import { GlassEffectWrapperProps } from '../components/GlassEffectWrapper';

/**
 * Base props that all wrapper components can accept
 */
export interface ComponentWrapperProps<TConfig = any> {
  /**
   * Configuration object that drives the component rendering
   */
  config?: TConfig;
  
  /**
   * Enable glass effect wrapper
   */
  glassEffect?: boolean;
  
  /**
   * Glass effect variant
   */
  glassVariant?: 'shine' | 'perfume';
  
  /**
   * Glass effect intensity (1-5)
   */
  glassIntensity?: number;
  
  /**
   * Random hue for perfume variant
   */
  glassRandomHue?: boolean;
  
  /**
   * Additional CSS class
   */
  className?: string;
  
  /**
   * Inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Data attributes
   */
  [key: `data-${string}`]: any;
}

/**
 * Common badge configuration
 */
export interface BadgeConfig {
  content: string | number;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

/**
 * Common loading state
 */
export interface LoadingConfig {
  loading?: boolean;
  loadingText?: string;
}

/**
 * Common error state
 */
export interface ErrorConfig {
  message: string;
  retry?: () => void;
}

/**
 * Common empty state
 */
export interface EmptyStateConfig {
  message?: string;
  icon?: LucideIcon;
  action?: {
    label: string;
    onClick: () => void;
  };
}
```

**Files to create**:
- `StoryBook/ConsumerComponents/types/component-config.types.ts`

---

### Step 1.2: Update Utility Functions

**File**: `StoryBook/ConsumerComponents/utils/cn.ts`

**Current State**: Uses `clsx` and `tailwind-merge`

**Action Required**: 
- Keep existing implementation (it's framework-agnostic)
- The `tailwind-merge` is only used for merging classes, not for Tailwind itself
- This utility works with CSS Modules perfectly

**No changes needed** ✅

---

### Step 1.3: Enhance Design Tokens

**File**: `StoryBook/ConsumerComponents/styles/tokens.css`

**Purpose**: Add new CSS custom properties for config-driven components

**Actions**:
1. Open `tokens.css`
2. Add new token sections:

```css
/* Add these sections to the existing tokens.css */

/* Component-specific tokens */
:root {
  /* Tabs */
  --nbs-tabs-border: var(--nbs-surface-border);
  --nbs-tabs-active-border: var(--nbs-primary);
  --nbs-tabs-hover-bg: var(--nbs-bg-muted);
  
  /* Accordion */
  --nbs-accordion-border: var(--nbs-surface-border);
  --nbs-accordion-trigger-hover: var(--nbs-bg-muted);
  
  /* Breadcrumb */
  --nbs-breadcrumb-separator: var(--nbs-text-muted);
  --nbs-breadcrumb-active: var(--nbs-text);
  
  /* Dialog/Modal enhancements */
  --nbs-dialog-backdrop: rgba(0, 0, 0, 0.5);
  --nbs-dialog-backdrop-blur: 8px;
  
  /* Form */
  --nbs-form-label: var(--nbs-text);
  --nbs-form-help-text: var(--nbs-text-muted);
  --nbs-form-error: var(--nbs-danger);
  
  /* Navigation Menu */
  --nbs-nav-menu-hover: var(--nbs-bg-muted);
  --nbs-nav-menu-active: var(--nbs-primary-subtle);
  
  /* Command Palette */
  --nbs-command-bg: var(--nbs-surface);
  --nbs-command-border: var(--nbs-surface-border);
  --nbs-command-selected: var(--nbs-bg-muted);
  
  /* Table enhancements */
  --nbs-table-header-bg: var(--nbs-bg-muted);
  --nbs-table-hover-bg: var(--nbs-bg-muted);
  --nbs-table-selected-bg: var(--nbs-primary-subtle);
  
  /* Spacing scale */
  --nbs-spacing-xs: 0.25rem;
  --nbs-spacing-sm: 0.5rem;
  --nbs-spacing-md: 1rem;
  --nbs-spacing-lg: 1.5rem;
  --nbs-spacing-xl: 2rem;
  --nbs-spacing-2xl: 3rem;
  
  /* Border radius scale */
  --nbs-radius-sm: 0.25rem;
  --nbs-radius-md: 0.375rem;
  --nbs-radius-lg: 0.5rem;
  --nbs-radius-xl: 0.75rem;
  --nbs-radius-full: 9999px;
}

/* Dark mode additions */
@media (prefers-color-scheme: dark) {
  :root {
    --nbs-tabs-hover-bg: rgba(255, 255, 255, 0.05);
    --nbs-accordion-trigger-hover: rgba(255, 255, 255, 0.05);
    --nbs-dialog-backdrop: rgba(0, 0, 0, 0.7);
    --nbs-nav-menu-hover: rgba(255, 255, 255, 0.05);
    --nbs-command-selected: rgba(255, 255, 255, 0.1);
    --nbs-table-hover-bg: rgba(255, 255, 255, 0.05);
  }
}

[data-nbs-theme='dark'] {
  --nbs-tabs-hover-bg: rgba(255, 255, 255, 0.05);
  --nbs-accordion-trigger-hover: rgba(255, 255, 255, 0.05);
  --nbs-dialog-backdrop: rgba(0, 0, 0, 0.7);
  --nbs-nav-menu-hover: rgba(255, 255, 255, 0.05);
  --nbs-command-selected: rgba(255, 255, 255, 0.1);
  --nbs-table-hover-bg: rgba(255, 255, 255, 0.05);
}
```

**Files to modify**:
- `StoryBook/ConsumerComponents/styles/tokens.css`

---

### Step 1.4: Create Component Template

**File**: `StoryBook/ConsumerComponents/components/_CONFIG_TEMPLATE/`

**Purpose**: Create a template for new config-driven components

**Actions**:
1. Create new directory `_CONFIG_TEMPLATE`
2. Create template files:

**ConfigComponent.tsx**:
```typescript
import * as React from 'react';
import { LucideIcon } from 'lucide-react';
import { GlassEffectWrapper } from '../GlassEffectWrapper';
import { cn } from '../../utils/cn';
import { ComponentWrapperProps } from '../../types/component-config.types';
import styles from './ConfigComponent.module.css';

/**
 * Component-specific config interface
 */
export interface ConfigComponentConfig {
  // Define your config properties here
  title?: string;
  content?: React.ReactNode;
  // ... more config options
}

/**
 * Component props
 */
export interface ConfigComponentProps extends ComponentWrapperProps<ConfigComponentConfig> {
  children?: React.ReactNode;
}

/**
 * ConfigComponent - A config-driven component
 */
export const ConfigComponent = React.forwardRef<HTMLDivElement, ConfigComponentProps>(
  (
    {
      config,
      children,
      glassEffect = false,
      glassVariant = 'shine',
      glassIntensity = 3,
      glassRandomHue = false,
      className,
      style,
      ...rest
    },
    ref
  ) => {
    // Determine what to render based on config
    const hasContent = !!config?.content || !!children;
    
    const content = (
      <div
        ref={ref}
        className={cn(styles.root, className)}
        style={style}
        {...rest}
      >
        {config?.title && (
          <div className={styles.title}>{config.title}</div>
        )}
        {hasContent && (
          <div className={styles.content}>
            {config?.content || children}
          </div>
        )}
      </div>
    );
    
    // Wrap in glass effect if enabled
    if (glassEffect) {
      return (
        <GlassEffectWrapper
          asChild
          glassEffect={true}
          variant={glassVariant}
          randomHue={glassVariant === 'perfume' ? glassRandomHue : undefined}
        >
          {content}
        </GlassEffectWrapper>
      );
    }
    
    return content;
  }
);

ConfigComponent.displayName = 'ConfigComponent';
```

**ConfigComponent.module.css**:
```css
.root {
  /* Use design tokens */
  background-color: var(--nbs-surface);
  border: 1px solid var(--nbs-surface-border);
  border-radius: var(--nbs-radius-md);
  padding: var(--nbs-spacing-md);
  color: var(--nbs-text);
}

.title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: var(--nbs-spacing-sm);
  color: var(--nbs-text);
}

.content {
  color: var(--nbs-text);
}

/* Variants */
.root[data-variant="bordered"] {
  border: 2px solid var(--nbs-surface-border);
}

/* Sizes */
.root[data-size="sm"] {
  padding: var(--nbs-spacing-sm);
}

.root[data-size="lg"] {
  padding: var(--nbs-spacing-lg);
}

/* States */
.root[data-loading="true"] {
  opacity: 0.6;
  pointer-events: none;
}
```

**index.ts**:
```typescript
export { ConfigComponent, type ConfigComponentProps, type ConfigComponentConfig } from './ConfigComponent';
```

**Files to create**:
- `StoryBook/ConsumerComponents/components/_CONFIG_TEMPLATE/ConfigComponent.tsx`
- `StoryBook/ConsumerComponents/components/_CONFIG_TEMPLATE/ConfigComponent.module.css`
- `StoryBook/ConsumerComponents/components/_CONFIG_TEMPLATE/index.ts`

---

## 🏗️ PHASE 2: Enhanced Card & Dialog (Week 2)

### Step 2.1: Enhance Card Component (Config-Driven)

**Current State**: Card is prop-driven with basic header/footer
**Target State**: Full config-driven with optional sections

**File**: `StoryBook/ConsumerComponents/components/Card/Card.tsx`

**Actions**:

1. **Create new type file**: `Card.types.ts`

```typescript
import { LucideIcon } from 'lucide-react';
import { ComponentWrapperProps, BadgeConfig } from '../../types/component-config.types';

export interface CardConfig {
  header?: {
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
    icon?: LucideIcon;
    iconVariant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
    actions?: React.ReactNode[];
    customComponent?: React.ComponentType<any>;
    className?: string;
    glassEffect?: boolean;
  };
  
  content?: React.ReactNode;
  contentPadding?: 'none' | 'sm' | 'md' | 'lg';
  
  footer?: {
    content?: React.ReactNode;
    actions?: {
      primary?: {
        label: string;
        onClick: () => void;
        loading?: boolean;
        disabled?: boolean;
        icon?: LucideIcon;
      };
      secondary?: {
        label: string;
        onClick: () => void;
        disabled?: boolean;
        icon?: LucideIcon;
      };
      additional?: React.ReactNode[];
    };
    alignment?: 'left' | 'center' | 'right' | 'space-between';
    className?: string;
    glassEffect?: boolean;
  };
  
  variant?: 'default' | 'outlined' | 'elevated' | 'filled' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onClick?: () => void;
  loading?: boolean;
  error?: {
    message: string;
    retry?: () => void;
  };
  badge?: BadgeConfig;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

export interface CardProps extends ComponentWrapperProps<CardConfig> {
  // Legacy prop-driven props (for backward compatibility)
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  header?: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  shadow?: boolean;
  bordered?: boolean;
}
```

2. **Rewrite Card.tsx** to support both config and legacy props
3. **Add new CSS** for variants, sizes, interactive states
4. **Update Card.module.css** with new styles

**Files to create/modify**:
- CREATE: `StoryBook/ConsumerComponents/components/Card/Card.types.ts`
- MODIFY: `StoryBook/ConsumerComponents/components/Card/Card.tsx`
- MODIFY: `StoryBook/ConsumerComponents/components/Card/Card.module.css`
- MODIFY: `StoryBook/ConsumerComponents/components/Card/index.ts`

---

### Step 2.2: Enhance Modal to Dialog Component

**Current State**: Modal with basic props
**Target State**: Dialog with config-driven header/footer/content

**File**: `StoryBook/ConsumerComponents/components/Dialog/`

**Decision**: Create new Dialog component (Modal becomes alias for backward compatibility)

**Actions**:

1. **Create Dialog directory**: `components/Dialog/`
2. **Create Dialog.types.ts**:

```typescript
import { LucideIcon } from 'lucide-react';
import { ComponentWrapperProps } from '../../types/component-config.types';

export interface DialogConfig {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: {
    component: LucideIcon;
    variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  };
  content?: React.ReactNode;
  footer?: {
    actions?: {
      primary?: {
        label: string;
        onClick: () => void | Promise<void>;
        loading?: boolean;
        disabled?: boolean;
        variant?: 'default' | 'primary' | 'danger';
        icon?: LucideIcon;
      };
      secondary?: {
        label: string;
        onClick: () => void;
        disabled?: boolean;
      };
      tertiary?: {
        label: string;
        onClick: () => void;
        disabled?: boolean;
      };
      custom?: React.ReactNode;
    };
    alignment?: 'left' | 'center' | 'right' | 'space-between';
  };
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  variant?: 'default' | 'alert' | 'confirmation' | 'form';
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  trapFocus?: boolean;
  showOverlay?: boolean;
  overlayBlur?: boolean;
  loading?: boolean;
  customHeader?: React.ComponentType<any>;
  scrollBehavior?: 'inside' | 'outside';
}

export interface DialogProps extends ComponentWrapperProps<DialogConfig> {
  children?: React.ReactNode;
}
```

3. **Create Dialog.tsx** (full implementation)
4. **Create Dialog.module.css** with all variants
5. **Update Modal** to use Dialog internally (alias)

**Files to create**:
- `StoryBook/ConsumerComponents/components/Dialog/Dialog.types.ts`
- `StoryBook/ConsumerComponents/components/Dialog/Dialog.tsx`
- `StoryBook/ConsumerComponents/components/Dialog/Dialog.module.css`
- `StoryBook/ConsumerComponents/components/Dialog/index.ts`

**Files to modify**:
- `StoryBook/ConsumerComponents/components/Modal/Modal.tsx` (make it use Dialog)

---

### Step 2.3: Create Storybook Stories

**Actions**:
1. Update Card stories with config examples
2. Create Dialog stories with all variants

**Files to create/modify**:
- MODIFY: `StoryBook/UiPreview/stories/components/Card.stories.tsx`
- CREATE: `StoryBook/UiPreview/stories/components/Dialog.stories.tsx`

---

## 🏗️ PHASE 3: Navigation Components (Week 3-4)

### Step 3.1: Create Tabs Component

**Directory**: `components/Tabs/`

**Actions**:
1. Create `Tabs.types.ts` with `TabsConfig` and `TabItem` interfaces
2. Create `Tabs.tsx` with:
   - Horizontal/vertical orientation
   - Pills/underline/enclosed variants
   - Lazy loading support
   - Animated transitions
3. Create `Tabs.module.css` with all variants
4. Create `Tabs.stories.tsx`

**Files to create**:
- `StoryBook/ConsumerComponents/components/Tabs/Tabs.types.ts`
- `StoryBook/ConsumerComponents/components/Tabs/Tabs.tsx`
- `StoryBook/ConsumerComponents/components/Tabs/Tabs.module.css`
- `StoryBook/ConsumerComponents/components/Tabs/index.ts`
- `StoryBook/UiPreview/stories/components/Tabs.stories.tsx`

---

### Step 3.2: Create Accordion Component

**Directory**: `components/Accordion/`

**Actions**:
1. Create `Accordion.types.ts` with `AccordionConfig` and `AccordionItem` interfaces
2. Create `Accordion.tsx` with:
   - Single/multiple expand modes
   - Animated expand/collapse
   - Custom icons
   - Nested support
3. Create `Accordion.module.css`
4. Create `Accordion.stories.tsx`

**Files to create**:
- `StoryBook/ConsumerComponents/components/Accordion/Accordion.types.ts`
- `StoryBook/ConsumerComponents/components/Accordion/Accordion.tsx`
- `StoryBook/ConsumerComponents/components/Accordion/Accordion.module.css`
- `StoryBook/ConsumerComponents/components/Accordion/index.ts`
- `StoryBook/UiPreview/stories/components/Accordion.stories.tsx`

---

### Step 3.3: Create NavigationMenu Component

**Directory**: `components/NavigationMenu/`

**Actions**:
1. Create `NavigationMenu.types.ts`
2. Create `NavigationMenu.tsx` with:
   - Horizontal/vertical layouts
   - Nested dropdowns
   - Active state management
   - Keyboard navigation
3. Create `NavigationMenu.module.css`
4. Create `NavigationMenu.stories.tsx`

**Files to create**:
- `StoryBook/ConsumerComponents/components/NavigationMenu/NavigationMenu.types.ts`
- `StoryBook/ConsumerComponents/components/NavigationMenu/NavigationMenu.tsx`
- `StoryBook/ConsumerComponents/components/NavigationMenu/NavigationMenu.module.css`
- `StoryBook/ConsumerComponents/components/NavigationMenu/index.ts`
- `StoryBook/UiPreview/stories/components/NavigationMenu.stories.tsx`

---

### Step 3.4: Create Breadcrumb Component

**Directory**: `components/Breadcrumb/`

**Actions**:
1. Create `Breadcrumb.types.ts`
2. Create `Breadcrumb.tsx` with:
   - Custom separators
   - Max items with collapse
   - Home icon support
3. Create `Breadcrumb.module.css`
4. Create `Breadcrumb.stories.tsx`

**Files to create**:
- `StoryBook/ConsumerComponents/components/Breadcrumb/Breadcrumb.types.ts`
- `StoryBook/ConsumerComponents/components/Breadcrumb/Breadcrumb.tsx`
- `StoryBook/ConsumerComponents/components/Breadcrumb/Breadcrumb.module.css`
- `StoryBook/ConsumerComponents/components/Breadcrumb/index.ts`
- `StoryBook/UiPreview/stories/components/Breadcrumb.stories.tsx`

---

### Step 3.5: Create DropdownMenu Component

**Directory**: `components/DropdownMenu/`

**Actions**:
1. Create `DropdownMenu.types.ts`
2. Create `DropdownMenu.tsx` with:
   - Menu items, separators, labels
   - Nested submenus
   - Checkboxes and radio items
   - Keyboard shortcuts display
3. Create `DropdownMenu.module.css`
4. Create `DropdownMenu.stories.tsx`

**Files to create**:
- `StoryBook/ConsumerComponents/components/DropdownMenu/DropdownMenu.types.ts`
- `StoryBook/ConsumerComponents/components/DropdownMenu/DropdownMenu.tsx`
- `StoryBook/ConsumerComponents/components/DropdownMenu/DropdownMenu.module.css`
- `StoryBook/ConsumerComponents/components/DropdownMenu/index.ts`
- `StoryBook/UiPreview/stories/components/DropdownMenu.stories.tsx`

---

## 🏗️ PHASE 4: Data & Forms (Week 5-6)

### Step 4.1: Enhance DataTable Component

**Current State**: DataTable uses Ant Design Table
**Target State**: Config-driven with more features

**File**: `StoryBook/ConsumerComponents/components/DataTable/`

**Actions**:
1. Create `DataTable.types.ts` with enhanced `TableConfig`
2. Enhance `DataTable.tsx` with:
   - Row actions config
   - Bulk actions
   - Column visibility toggle
   - Export functionality
   - Sticky headers/columns
3. Update `DataTable.module.css`
4. Update `DataTable.stories.tsx`

**Note**: Keep Ant Design Table as internal implementation, wrap with config

**Files to modify**:
- CREATE: `StoryBook/ConsumerComponents/components/DataTable/DataTable.types.ts`
- MODIFY: `StoryBook/ConsumerComponents/components/DataTable/DataTable.tsx`
- MODIFY: `StoryBook/ConsumerComponents/components/DataTable/DataTable.module.css`
- MODIFY: `StoryBook/UiPreview/stories/components/DataTable.stories.tsx`

---

### Step 4.2: Create Form Component

**Directory**: `components/Form/`

**Actions**:
1. Create `Form.types.ts` with `FormConfig`, `FormField`, `FormSection`
2. Create `Form.tsx` with:
   - Dynamic field rendering
   - Section support
   - Validation integration (Zod/Yup compatible)
   - Auto-save support
   - Field visibility conditions
3. Create `Form.module.css`
4. Create `Form.stories.tsx`

**Note**: Form uses existing Input, Select, Checkbox, etc. components

**Files to create**:
- `StoryBook/ConsumerComponents/components/Form/Form.types.ts`
- `StoryBook/ConsumerComponents/components/Form/Form.tsx`
- `StoryBook/ConsumerComponents/components/Form/Form.module.css`
- `StoryBook/ConsumerComponents/components/Form/index.ts`
- `StoryBook/UiPreview/stories/components/Form.stories.tsx`

---

### Step 4.3: Enhance Select Component

**Current State**: Basic Select
**Target State**: Config-driven with groups, search, multi-select

**File**: `StoryBook/ConsumerComponents/components/Select/`

**Actions**:
1. Create `Select.types.ts` with `SelectConfig`
2. Enhance `Select.tsx` with:
   - Option groups
   - Searchable
   - Multi-select
   - Custom option rendering
3. Update `Select.module.css`
4. Update `Select.stories.tsx`

**Files to create/modify**:
- CREATE: `StoryBook/ConsumerComponents/components/Select/Select.types.ts`
- MODIFY: `StoryBook/ConsumerComponents/components/Select/Select.tsx`
- MODIFY: `StoryBook/ConsumerComponents/components/Select/Select.module.css`
- MODIFY: `StoryBook/UiPreview/stories/components/Select.stories.tsx`

---

### Step 4.4: Create Combobox Component

**Directory**: `components/Combobox/`

**Actions**:
1. Create `Combobox.types.ts`
2. Create `Combobox.tsx` (searchable select with autocomplete)
3. Create `Combobox.module.css`
4. Create `Combobox.stories.tsx`

**Files to create**:
- `StoryBook/ConsumerComponents/components/Combobox/Combobox.types.ts`
- `StoryBook/ConsumerComponents/components/Combobox/Combobox.tsx`
- `StoryBook/ConsumerComponents/components/Combobox/Combobox.module.css`
- `StoryBook/ConsumerComponents/components/Combobox/index.ts`
- `StoryBook/UiPreview/stories/components/Combobox.stories.tsx`

---

## 🏗️ PHASE 5: Utility Components (Week 7)

### Step 5.1: Create CommandPalette Component

**Directory**: `components/CommandPalette/`

**Actions**:
1. Create `CommandPalette.types.ts`
2. Create `CommandPalette.tsx` with:
   - Keyboard shortcut trigger
   - Fuzzy search
   - Command groups
   - Shortcut hints
3. Create `CommandPalette.module.css`
4. Create `CommandPalette.stories.tsx`

**Files to create**:
- `StoryBook/ConsumerComponents/components/CommandPalette/CommandPalette.types.ts`
- `StoryBook/ConsumerComponents/components/CommandPalette/CommandPalette.tsx`
- `StoryBook/ConsumerComponents/components/CommandPalette/CommandPalette.module.css`
- `StoryBook/ConsumerComponents/components/CommandPalette/index.ts`
- `StoryBook/UiPreview/stories/components/CommandPalette.stories.tsx`

---

### Step 5.2: Create Additional Simple Components

**Components to create** (prop-driven, not config-driven):

1. **Avatar**: User avatar with fallback
2. **Tooltip**: Hover tooltips
3. **Progress**: Progress bars
4. **Skeleton**: Loading skeletons
5. **Separator**: Visual dividers

**For each component**:
- Create directory in `components/`
- Create `[Component].tsx`, `[Component].module.css`, `index.ts`
- Create Storybook story
- Add to main exports

---

## 🏗️ PHASE 6: Documentation & Testing (Week 8)

### Step 6.1: Update Main Exports

**File**: `StoryBook/ConsumerComponents/index.ts`

**Actions**:
1. Add exports for all new components
2. Export all type definitions
3. Organize exports by category

**Example**:
```typescript
// Navigation Components
export { Tabs, type TabsProps, type TabsConfig, type TabItem } from './components/Tabs';
export { Accordion, type AccordionProps, type AccordionConfig } from './components/Accordion';
export { NavigationMenu, type NavigationMenuProps, type NavigationMenuConfig } from './components/NavigationMenu';
export { Breadcrumb, type BreadcrumbProps, type BreadcrumbConfig } from './components/Breadcrumb';
export { DropdownMenu, type DropdownMenuProps, type DropdownMenuConfig } from './components/DropdownMenu';

// Dialog
export { Dialog, type DialogProps, type DialogConfig } from './components/Dialog';

// Form & Data
export { Form, type FormProps, type FormConfig } from './components/Form';
export { Combobox, type ComboboxProps, type ComboboxConfig } from './components/Combobox';
export { CommandPalette, type CommandPaletteProps, type CommandPaletteConfig } from './components/CommandPalette';

// Base Types
export type { ComponentWrapperProps, BadgeConfig } from './types/component-config.types';
```

---

### Step 6.2: Update Documentation

**Files to update**:
1. `STORY_BOOK_COMPONENT_USAGE.md` - Add usage examples for all new components
2. `README.md` - Update feature list
3. `COMPONENT_REFERENCE.md` - Add new components

**Actions**:
- Document config-driven approach
- Provide migration guide from old to new API
- Add TypeScript examples
- Document glass effect integration
- Add best practices section

---

### Step 6.3: Create Migration Guide

**File**: `MIGRATION_GUIDE.md`

**Content**:
- Backward compatibility notes
- How to migrate from prop-driven to config-driven
- Breaking changes (if any)
- Step-by-step migration examples

---

### Step 6.4: Testing Strategy

**Actions**:
1. Create test files for each new component
2. Test config variations
3. Test accessibility
4. Test glass effect integration
5. Test framework compatibility (Bootstrap, Tailwind, none)

**Test file pattern**: `[Component].test.tsx`

---

## 📦 Build & Distribution

### Step 7.1: Update Build Configuration

**Files to verify/update**:
- `rollup.config.js` - Ensure all new components are included
- `tsconfig.build.json` - Verify include/exclude patterns
- `package.json` - Update version, add new exports if needed

**Actions**:
1. Test build: `npm run build`
2. Verify dist output
3. Test Storybook: `npm run storybook`
4. Check bundle size: `npm run analyze`

---

### Step 7.2: Verify CSS Output

**Actions**:
1. Check `dist/styles.css` includes all component styles
2. Verify `dist/tokens.css` is copied
3. Test CSS module scoping
4. Verify no Tailwind/Bootstrap leakage

---

## ✅ Verification Checklist

After completing all phases, verify:

### Component Checklist
- [ ] All config-driven components follow the same pattern
- [ ] All components support glass effect wrapper
- [ ] All components use design tokens
- [ ] All components have TypeScript types exported
- [ ] All components have Storybook stories
- [ ] All components work without CSS frameworks
- [ ] All components work with Bootstrap
- [ ] All components work with Tailwind

### Code Quality
- [ ] No console errors in Storybook
- [ ] No TypeScript errors
- [ ] All components have proper JSDoc
- [ ] Code follows existing patterns
- [ ] CSS modules properly scoped
- [ ] Accessibility tested (keyboard, screen reader)

### Documentation
- [ ] Usage guide updated
- [ ] Migration guide created
- [ ] Component reference updated
- [ ] README updated
- [ ] All examples tested

### Build & Distribution
- [ ] Build completes without errors
- [ ] Bundle size acceptable
- [ ] Types generated correctly
- [ ] CSS extracted properly
- [ ] All exports work

---

## 🎯 Priority Order

If implementing incrementally, follow this priority:

### High Priority (Must Have)
1. ✅ Foundation types (`component-config.types.ts`)
2. ✅ Enhanced Card component (config-driven)
3. ✅ Dialog component (enhanced Modal)
4. Tabs component
5. Form component

### Medium Priority (Should Have)
6. Accordion component
7. NavigationMenu component
8. Enhanced DataTable
9. Enhanced Select / Combobox
10. DropdownMenu component

### Low Priority (Nice to Have)
11. Breadcrumb component
12. CommandPalette component
13. Avatar, Tooltip, Progress, Skeleton, Separator
14. Additional variants and features

---

## 🚀 Getting Started

To begin implementation:

1. **Start with Phase 1**: Foundation & Core Types
   ```bash
   # Create the base types file
   touch StoryBook/ConsumerComponents/types/component-config.types.ts
   ```

2. **Test the pattern** with one component (Card) before proceeding

3. **Review** the generated component with stakeholders

4. **Iterate** through phases sequentially

5. **Test continuously** with Storybook

---

## 📚 Reference

### Key Files
- **Types**: `StoryBook/ConsumerComponents/types/component-config.types.ts`
- **Tokens**: `StoryBook/ConsumerComponents/styles/tokens.css`
- **Glass Effect**: `StoryBook/ConsumerComponents/components/GlassEffectWrapper/`
- **Utils**: `StoryBook/ConsumerComponents/utils/cn.ts`
- **Exports**: `StoryBook/ConsumerComponents/index.ts`

### Important Patterns

**Config Structure**:
```typescript
export interface [Component]Config {
  // Optional sections (undefined = not rendered)
  header?: { /* ... */ };
  content?: React.ReactNode;
  footer?: { /* ... */ };
  
  // Visual variants
  variant?: 'default' | /* ... */;
  size?: 'sm' | 'md' | 'lg';
  
  // States
  loading?: boolean;
  disabled?: boolean;
}
```

**Component Structure**:
```typescript
export const Component = React.forwardRef<HTMLElement, ComponentProps>(
  ({ config, children, glassEffect, ...props }, ref) => {
    const content = (/* render based on config */);
    
    return glassEffect ? (
      <GlassEffectWrapper>{content}</GlassEffectWrapper>
    ) : content;
  }
);
```

**CSS Pattern**:
```css
/* Use design tokens */
.root {
  background-color: var(--nbs-surface);
  color: var(--nbs-text);
  padding: var(--nbs-spacing-md);
}

/* Data attributes for variants */
.root[data-variant="outlined"] { }
.root[data-size="lg"] { }
```

---

## 🎉 Conclusion

This execution plan provides a comprehensive, step-by-step approach to implementing the config-driven component architecture. Each step is designed to:

- Maintain backward compatibility where possible
- Follow existing codebase patterns
- Use pure CSS (framework-agnostic)
- Provide excellent TypeScript DX
- Integrate seamlessly with the existing glass effect system

**Estimated Timeline**: 6-8 weeks (depending on team size and component complexity)

**Next Steps**: Begin with Phase 1, Step 1.1 - Create Base Type Definitions

---

**Document Version**: 1.0  
**Last Updated**: February 2026  
**Alignment**: NEW_COMPLETE_COMPONENT_CONFIGURATION_ARCHITECTURE.md
