# Component Library Reference

Complete reference documentation for all components in the NBS Component Library.

## Table of Contents

- [Overview](#overview)
- [Common Patterns](#common-patterns)
- [Components](#components)
  - [Button](#button)
  - [Card](#card)
  - [Badge](#badge)
  - [Alert](#alert)
  - [Modal](#modal)
  - [Input](#input)
  - [Select](#select)
  - [Checkbox](#checkbox)
  - [Textarea](#textarea)
  - [Radio](#radio)
  - [Switch](#switch)
  - [Spinner](#spinner)
  - [DataTable](#datatable)
  - [ErrorBoundary](#errorboundary)
  - [Dialog](#dialog)
  - [Tabs](#tabs)
  - [Accordion](#accordion)
  - [NavigationMenu](#navigationmenu)
  - [Breadcrumb](#breadcrumb)
  - [DropdownMenu](#dropdownmenu)
  - [Form](#form)
  - [Combobox](#combobox)
  - [CommandPalette](#commandpalette)
  - [Avatar](#avatar)
  - [Tooltip](#tooltip)
  - [Progress](#progress)
  - [Skeleton](#skeleton)
  - [Separator](#separator)

## Overview

This component library provides a comprehensive set of reusable React components built with TypeScript. All components are:
- **Type-safe** - Full TypeScript support with exported prop types
- **Accessible** - Built with accessibility in mind
- **Customizable** - Support for variants, sizes, and custom styling
- **Framework-agnostic CSS** - Pure CSS modules + tokens, works with any framework

## Common Patterns

### Size Options
Most components support three size options:
- `small` - Compact size for dense UIs
- `medium` - Default size (most common)
- `large` - Larger size for emphasis

### Variant Options
Many components support color variants:
- `primary` - Main brand color
- `secondary` - Secondary color
- `success` - Success/green
- `danger` - Error/red
- `warning` - Warning/yellow
- `info` - Informational/blue
- `light` - Light background
- `dark` - Dark background

### Validation States
Form components support validation states:
- `invalid` - Error state (red border)
- `valid` - Success state (green border)
- `error` prop - Error message text
- `helperText` - Helper text below input

---

## Components

### Button

A flexible button component supporting multiple variants, sizes, and states. Can render as either a button or anchor tag.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'success' \| 'danger' \| 'warning' \| 'info' \| 'light' \| 'dark' \| 'outline-primary' \| 'outline-secondary' \| 'outline-success' \| 'outline-danger' \| 'outline-warning' \| 'outline-info' \| 'outline-light' \| 'outline-dark'` | `'primary'` | Button style variant |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Button size |
| `disabled` | `boolean` | `false` | Whether button is disabled |
| `loading` | `boolean` | `false` | Whether button is in loading state |
| `onClick` | `(e: React.MouseEvent<HTMLButtonElement>) => void` | - | Click handler function |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Button type |
| `children` | `React.ReactNode` | - | Button content |
| `className` | `string` | `''` | Additional CSS classes |
| `style` | `React.CSSProperties` | - | Inline styles |
| `href` | `string` | - | If provided, renders as anchor tag |
| `target` | `string` | - | Target for anchor tag (e.g., '_blank') |
| `fullWidth` | `boolean` | `false` | Whether button should be full width |
| `rounded` | `boolean` | `false` | Whether button should be rounded/pill shaped |

#### Variants

**Solid Variants:**
- `primary` - Primary brand color
- `secondary` - Secondary color
- `success` - Success/green
- `danger` - Error/red
- `warning` - Warning/yellow
- `info` - Informational/blue
- `light` - Light background
- `dark` - Dark background

**Outline Variants:**
- `outline-primary` - Primary with outline
- `outline-secondary` - Secondary with outline
- `outline-success` - Success with outline
- `outline-danger` - Danger with outline
- `outline-warning` - Warning with outline
- `outline-info` - Info with outline
- `outline-light` - Light with outline
- `outline-dark` - Dark with outline

#### Sizes

- `small` - Compact button
- `medium` - Default size
- `large` - Larger button

#### Usage Examples

```tsx
import { Button } from '@nbs/component-library';

// Basic usage
<Button variant="primary">Click Me</Button>

// Different variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="success">Success</Button>
<Button variant="outline-primary">Outline Primary</Button>

// Sizes
<Button size="small">Small</Button>
<Button size="medium">Medium</Button>
<Button size="large">Large</Button>

// States
<Button disabled>Disabled</Button>
<Button loading>Loading...</Button>

// Special styles
<Button fullWidth>Full Width</Button>
<Button rounded>Rounded</Button>

// As link
<Button href="https://example.com" target="_blank">
  Open Link
</Button>
```

---

### Card

A flexible card component for displaying content with optional header, body, footer, and image sections.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `React.ReactNode` | - | Card title/header |
| `subtitle` | `React.ReactNode` | - | Card subtitle |
| `children` | `React.ReactNode` | - | Card body content |
| `footer` | `React.ReactNode` | - | Card footer content |
| `header` | `React.ReactNode` | - | Card header content (alternative to title) |
| `imageSrc` | `string` | - | Image source for card image |
| `imageAlt` | `string` | `'Card image'` | Image alt text |
| `className` | `string` | `''` | Additional CSS classes |
| `style` | `React.CSSProperties` | - | Inline styles |
| `shadow` | `boolean` | `true` | Whether card should have shadow |
| `bordered` | `boolean` | `true` | Whether card should have border |

#### Usage Examples

```tsx
import { Card } from '@nbs/component-library';

// Basic card
<Card title="Card Title" children="Card content goes here." />

// With subtitle
<Card 
  title="Card Title" 
  subtitle="Card Subtitle"
  children="This card has both a title and subtitle."
/>

// With image
<Card
  imageSrc="https://example.com/image.jpg"
  imageAlt="Card image"
  title="Card with Image"
  children="This card includes an image at the top."
/>

// With custom header
<Card
  header={<div className="card-title">Featured</div>}
  title="Special Title Treatment"
  children="This card has a custom header section."
/>

// With footer
<Card
  title="Card Title"
  children="This card has a footer section."
  footer={
    <div>
      <Button variant="primary" size="small">Action</Button>
    </div>
  }
/>

// Complete card
<Card
  imageSrc="https://example.com/image.jpg"
  imageAlt="Card image"
  header={<div className="card-title">Featured</div>}
  title="Card Title"
  subtitle="Card Subtitle"
  children="Complete card with all sections."
  footer={
    <div className="d-flex gap-2">
      <Button variant="primary" size="small">Primary Action</Button>
      <Button variant="secondary" size="small">Secondary Action</Button>
    </div>
  }
/>

// Without shadow
<Card shadow={false} title="No Shadow" children="This card has no shadow." />

// Without border
<Card bordered={false} title="No Border" children="This card has no border." />
```

---

### Badge

A small status indicator component for displaying labels, counts, or tags.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'success' \| 'danger' \| 'warning' \| 'info' \| 'light' \| 'dark'` | `'primary'` | Badge variant/color |
| `children` | `React.ReactNode` | - | Badge content |
| `rounded` | `boolean` | `false` | Whether badge should be rounded/pill shaped |
| `outline` | `boolean` | `false` | Whether badge should have outline style |
| `className` | `string` | `''` | Additional CSS classes |
| `style` | `React.CSSProperties` | - | Inline styles |

#### Variants

- `primary` - Primary brand color
- `secondary` - Secondary color
- `success` - Success/green
- `danger` - Error/red
- `warning` - Warning/yellow
- `info` - Informational/blue
- `light` - Light background
- `dark` - Dark background

#### Usage Examples

```tsx
import { Badge } from '@nbs/component-library';

// Basic badges
<Badge variant="primary">Primary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="danger">Danger</Badge>

// Rounded badges
<Badge variant="primary" rounded>Rounded</Badge>

// Outline badges
<Badge variant="primary" outline>Outline</Badge>

// All variants
<Badge variant="primary">Primary</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="danger">Danger</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="info">Info</Badge>
<Badge variant="light">Light</Badge>
<Badge variant="dark">Dark</Badge>
```

---

### Alert

A component for displaying important messages to users. Supports multiple variants and can be dismissible.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'success' \| 'danger' \| 'warning' \| 'info'` | `'info'` | Alert variant/type |
| `children` | `React.ReactNode` | - | Alert content |
| `title` | `React.ReactNode` | - | Alert title/heading |
| `dismissible` | `boolean` | `false` | Whether alert can be dismissed |
| `onDismiss` | `() => void` | - | Callback when alert is dismissed |
| `showIcon` | `boolean` | `true` | Whether alert should have an icon |
| `className` | `string` | `''` | Additional CSS classes |
| `style` | `React.CSSProperties` | - | Inline styles |

#### Variants

- `primary` - Primary brand color
- `secondary` - Secondary color
- `success` - Success/green (shows checkmark icon)
- `danger` - Error/red (shows X icon)
- `warning` - Warning/yellow (shows warning icon)
- `info` - Informational/blue (shows info icon)

#### Usage Examples

```tsx
import { Alert } from '@nbs/component-library';

// Basic alerts
<Alert variant="success">Success message</Alert>
<Alert variant="danger">Error message</Alert>
<Alert variant="warning">Warning message</Alert>
<Alert variant="info">Info message</Alert>

// With title
<Alert variant="success" title="Success!">
  Your changes have been saved successfully.
</Alert>

// Dismissible alert
const [showAlert, setShowAlert] = useState(true);

{showAlert && (
  <Alert 
    variant="info" 
    dismissible 
    onDismiss={() => setShowAlert(false)}
  >
    This alert can be dismissed.
  </Alert>
)}

// Without icon
<Alert variant="warning" showIcon={false}>
  This alert has no icon.
</Alert>
```

---

### Modal

A flexible modal dialog component. Uses Bootstrap modal structure but is fully controlled via props.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | **required** | Whether modal is open |
| `onClose` | `() => void` | **required** | Callback when modal should close |
| `title` | `React.ReactNode` | - | Modal title |
| `children` | `React.ReactNode` | - | Modal body content |
| `footer` | `React.ReactNode` | - | Modal footer content |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Modal size |
| `centered` | `boolean` | `false` | Whether modal should be centered vertically |
| `backdrop` | `boolean \| 'static'` | `true` | Whether modal should have backdrop |
| `keyboard` | `boolean` | `true` | Whether modal can be closed with ESC key |
| `className` | `string` | `''` | Additional CSS classes |
| `dialogClassName` | `string` | `''` | Additional CSS classes for dialog |

#### Sizes

- `sm` - Small modal
- `md` - Medium modal (default)
- `lg` - Large modal
- `xl` - Extra large modal

#### Usage Examples

```tsx
import { Modal, Button } from '@nbs/component-library';
import { useState } from 'react';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      
      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        title="Modal Title"
      >
        Modal content goes here.
      </Modal>
    </>
  );
}

// With footer
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal with Footer"
  footer={
    <>
      <Button variant="secondary" onClick={() => setIsOpen(false)}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleSave}>
        Save Changes
      </Button>
    </>
  }
>
  Modal body content.
</Modal>

// Different sizes
<Modal size="sm" isOpen={isOpen} onClose={() => setIsOpen(false)}>
  Small modal
</Modal>

<Modal size="lg" isOpen={isOpen} onClose={() => setIsOpen(false)}>
  Large modal
</Modal>

// Centered modal
<Modal 
  centered 
  isOpen={isOpen} 
  onClose={() => setIsOpen(false)}
>
  Centered modal
</Modal>

// Static backdrop (cannot close by clicking backdrop)
<Modal 
  backdrop="static" 
  isOpen={isOpen} 
  onClose={() => setIsOpen(false)}
>
  Cannot close by clicking backdrop
</Modal>

// Without title (close button appears in top-right)
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
  Modal without title
</Modal>
```

---

### Input

A flexible input component with support for labels, helper text, error states, icons, and multiple sizes.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Input label |
| `helperText` | `string` | - | Helper text below input |
| `error` | `string` | - | Error message to display |
| `required` | `boolean` | `false` | Whether input is required |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Input size |
| `variant` | `'default' \| 'light' \| 'primary'` | `'default'` | Input variant/style |
| `invalid` | `boolean` | `false` | Whether input is in invalid state |
| `valid` | `boolean` | `false` | Whether input is in valid state |
| `leftIcon` | `React.ReactNode` | - | Icon to display on the left side |
| `rightIcon` | `React.ReactNode` | - | Icon to display on the right side |
| `wrapperClassName` | `string` | `''` | Additional CSS classes for wrapper |
| `...props` | `React.InputHTMLAttributes` | - | All standard input HTML attributes |

#### Variants

- `default` - Default input style
- `light` - Light background variant
- `primary` - Primary color variant

#### Sizes

- `small` - Compact input
- `medium` - Default size
- `large` - Larger input

#### Usage Examples

```tsx
import { Input } from '@nbs/component-library';
import { Search, Eye } from 'react-feather';

// Basic input
<Input placeholder="Enter text..." />

// With label
<Input 
  label="Email Address" 
  type="email" 
  placeholder="Enter your email" 
/>

// Required field
<Input 
  label="Username" 
  required 
  placeholder="Enter username" 
/>

// With helper text
<Input 
  label="Password" 
  type="password" 
  helperText="Must be at least 8 characters"
  placeholder="Enter password" 
/>

// With error
<Input 
  label="Email" 
  type="email" 
  error="Please enter a valid email address"
  placeholder="Enter email" 
/>

// Valid state
<Input 
  label="Email" 
  type="email" 
  valid 
  placeholder="Enter email" 
  defaultValue="user@example.com"
/>

// With icons
<Input 
  label="Search" 
  placeholder="Search..." 
  leftIcon={<Search size={18} />}
/>

<Input 
  label="Password" 
  type="password" 
  placeholder="Enter password" 
  rightIcon={<Eye size={18} />}
/>

// Different sizes
<Input label="Small" size="small" placeholder="Small input" />
<Input label="Medium" size="medium" placeholder="Medium input" />
<Input label="Large" size="large" placeholder="Large input" />

// Variants
<Input label="Light" variant="light" placeholder="Light variant" />
<Input label="Primary" variant="primary" placeholder="Primary variant" />
```

---

### Select

A flexible select/dropdown component with support for labels, helper text, error states, and multiple sizes.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Select label |
| `options` | `SelectOption[]` | `[]` | Options for the select |
| `helperText` | `string` | - | Helper text below select |
| `error` | `string` | - | Error message to display |
| `required` | `boolean` | `false` | Whether select is required |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Select size |
| `invalid` | `boolean` | `false` | Whether select is in invalid state |
| `valid` | `boolean` | `false` | Whether select is in valid state |
| `placeholder` | `string` | - | Placeholder text (for first option) |
| `wrapperClassName` | `string` | `''` | Additional CSS classes for wrapper |
| `...props` | `React.SelectHTMLAttributes` | - | All standard select HTML attributes |

#### SelectOption Interface

```tsx
interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}
```

#### Sizes

- `small` - Compact select
- `medium` - Default size
- `large` - Larger select

#### Usage Examples

```tsx
import { Select, SelectOption } from '@nbs/component-library';

const options: SelectOption[] = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
  { label: 'Disabled Option', value: '4', disabled: true },
];

// Basic select
<Select options={options} />

// With label
<Select 
  label="Choose an option" 
  options={options}
  placeholder="Select an option"
/>

// Required
<Select 
  label="Country" 
  required
  options={countryOptions}
  placeholder="Select a country"
/>

// With helper text
<Select 
  label="Country" 
  options={countryOptions}
  helperText="Select your country of residence"
  placeholder="Choose country"
/>

// With error
<Select 
  label="Country" 
  options={countryOptions}
  error="Please select a country"
  placeholder="Choose country"
/>

// Valid state
<Select 
  label="Country" 
  valid
  options={countryOptions}
  defaultValue="us"
/>

// Different sizes
<Select label="Small" size="small" options={options} />
<Select label="Medium" size="medium" options={options} />
<Select label="Large" size="large" options={options} />

// Multiple selection
<Select 
  label="Select Multiple" 
  multiple
  options={options}
/>
```

---

### Checkbox

A flexible checkbox component with support for labels, helper text, error states, and multiple sizes.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `React.ReactNode` | - | Checkbox label |
| `helperText` | `string` | - | Helper text below checkbox |
| `error` | `string` | - | Error message to display |
| `required` | `boolean` | `false` | Whether checkbox is required |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Checkbox size |
| `invalid` | `boolean` | `false` | Whether checkbox is in invalid state |
| `wrapperClassName` | `string` | `''` | Additional CSS classes for wrapper |
| `labelBefore` | `boolean` | `false` | Whether to show label before checkbox |
| `...props` | `React.InputHTMLAttributes` | - | All standard checkbox HTML attributes |

#### Sizes

- `small` - Compact checkbox
- `medium` - Default size
- `large` - Larger checkbox

#### Usage Examples

```tsx
import { Checkbox } from '@nbs/component-library';

// Basic checkbox
<Checkbox label="I agree to the terms and conditions" />

// Checked by default
<Checkbox 
  label="Subscribe to newsletter" 
  defaultChecked 
/>

// Required
<Checkbox 
  label="I accept the terms" 
  required 
/>

// With helper text
<Checkbox 
  label="Enable notifications" 
  helperText="You will receive email notifications"
/>

// With error
<Checkbox 
  label="Accept terms" 
  error="You must accept the terms to continue"
/>

// Different sizes
<Checkbox label="Small checkbox" size="small" />
<Checkbox label="Medium checkbox" size="medium" />
<Checkbox label="Large checkbox" size="large" />

// Label before checkbox
<Checkbox 
  label="Label before checkbox" 
  labelBefore 
/>

// Checkbox group
<div>
  <Checkbox label="Option 1" name="group" value="1" />
  <Checkbox label="Option 2" name="group" value="2" defaultChecked />
  <Checkbox label="Option 3" name="group" value="3" />
  <Checkbox label="Disabled Option" name="group" value="4" disabled />
</div>
```

---

### Textarea

A flexible textarea component with support for labels, helper text, error states, character counting, and auto-resize.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Textarea label |
| `helperText` | `string` | - | Helper text below textarea |
| `error` | `string` | - | Error message to display |
| `required` | `boolean` | `false` | Whether textarea is required |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Textarea size |
| `variant` | `'default' \| 'light' \| 'primary'` | `'default'` | Textarea variant/style |
| `invalid` | `boolean` | `false` | Whether textarea is in invalid state |
| `valid` | `boolean` | `false` | Whether textarea is in valid state |
| `rows` | `number` | `3` | Number of rows (height) |
| `autoResize` | `boolean` | `false` | Whether textarea should auto-resize |
| `maxLength` | `number` | - | Maximum number of characters |
| `showCharCount` | `boolean` | `false` | Show character count |
| `wrapperClassName` | `string` | `''` | Additional CSS classes for wrapper |
| `...props` | `React.TextareaHTMLAttributes` | - | All standard textarea HTML attributes |

#### Variants

- `default` - Default textarea style
- `light` - Light background variant
- `primary` - Primary color variant

#### Sizes

- `small` - Compact textarea
- `medium` - Default size
- `large` - Larger textarea

#### Usage Examples

```tsx
import { Textarea } from '@nbs/component-library';

// Basic textarea
<Textarea placeholder="Enter your message..." />

// With label
<Textarea 
  label="Message" 
  placeholder="Enter your message..." 
  rows={4}
/>

// Required
<Textarea 
  label="Description" 
  required 
  placeholder="Enter description" 
  rows={5}
/>

// With helper text
<Textarea 
  label="Comments" 
  helperText="Please provide detailed feedback"
  placeholder="Enter your comments..." 
  rows={4}
/>

// With error
<Textarea 
  label="Message" 
  error="Message must be at least 10 characters"
  placeholder="Enter message" 
  rows={4}
/>

// With character count
<Textarea 
  label="Bio" 
  maxLength={200}
  showCharCount
  placeholder="Tell us about yourself..." 
  rows={4}
/>

// Auto-resize
<Textarea 
  label="Auto-resizing Textarea" 
  autoResize
  placeholder="Type and watch it grow..." 
  rows={2}
/>

// Different sizes
<Textarea label="Small" size="small" rows={3} />
<Textarea label="Medium" size="medium" rows={3} />
<Textarea label="Large" size="large" rows={5} />

// Variants
<Textarea label="Light" variant="light" rows={3} />
<Textarea label="Primary" variant="primary" rows={3} />
```

---

### Radio

A flexible radio button component with support for labels, helper text, error states, and multiple sizes.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `React.ReactNode` | - | Radio label |
| `helperText` | `string` | - | Helper text below radio |
| `error` | `string` | - | Error message to display |
| `required` | `boolean` | `false` | Whether radio is required |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Radio size |
| `invalid` | `boolean` | `false` | Whether radio is in invalid state |
| `wrapperClassName` | `string` | `''` | Additional CSS classes for wrapper |
| `labelBefore` | `boolean` | `false` | Whether to show label before radio |
| `...props` | `React.InputHTMLAttributes` | - | All standard radio HTML attributes |

#### Sizes

- `small` - Compact radio
- `medium` - Default size
- `large` - Larger radio

#### Usage Examples

```tsx
import { Radio } from '@nbs/component-library';

// Basic radio
<Radio label="Option 1" name="radio-group" value="1" />

// Checked by default
<Radio 
  label="Selected option" 
  name="radio-group" 
  value="1" 
  defaultChecked 
/>

// Required
<Radio 
  label="I agree" 
  required
  name="radio-group" 
  value="1" 
/>

// With helper text
<Radio 
  label="Enable feature" 
  helperText="This will enable advanced features"
  name="radio-group" 
  value="1" 
/>

// With error
<Radio 
  label="Select option" 
  error="Please select an option"
  name="radio-group" 
  value="1" 
/>

// Different sizes
<Radio label="Small radio" size="small" name="sizes" value="small" />
<Radio label="Medium radio" size="medium" name="sizes" value="medium" />
<Radio label="Large radio" size="large" name="sizes" value="large" />

// Label before radio
<Radio 
  label="Label before radio" 
  labelBefore
  name="radio-group" 
  value="1" 
/>

// Radio group
<div>
  <Radio label="Option 1" name="group" value="1" />
  <Radio label="Option 2" name="group" value="2" defaultChecked />
  <Radio label="Option 3" name="group" value="3" />
  <Radio label="Disabled Option" name="group" value="4" disabled />
</div>
```

---

### Switch

A toggle switch component with support for labels, helper text, error states, multiple sizes, and color variants.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `React.ReactNode` | - | Switch label |
| `helperText` | `string` | - | Helper text below switch |
| `error` | `string` | - | Error message to display |
| `required` | `boolean` | `false` | Whether switch is required |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Switch size |
| `variant` | `'primary' \| 'success' \| 'danger' \| 'warning' \| 'info'` | `'primary'` | Switch variant/color |
| `invalid` | `boolean` | `false` | Whether switch is in invalid state |
| `wrapperClassName` | `string` | `''` | Additional CSS classes for wrapper |
| `labelBefore` | `boolean` | `false` | Whether to show label before switch |
| `...props` | `React.InputHTMLAttributes` | - | All standard checkbox HTML attributes (uses checkbox internally) |

#### Variants

- `primary` - Primary brand color
- `success` - Success/green
- `danger` - Error/red
- `warning` - Warning/yellow
- `info` - Informational/blue

#### Sizes

- `small` - Compact switch
- `medium` - Default size
- `large` - Larger switch

#### Usage Examples

```tsx
import { Switch } from '@nbs/component-library';

// Basic switch
<Switch label="Enable notifications" />

// Checked by default
<Switch 
  label="Notifications enabled" 
  defaultChecked 
/>

// Required
<Switch 
  label="I agree to terms" 
  required 
/>

// With helper text
<Switch 
  label="Enable dark mode" 
  helperText="Switch to dark theme"
/>

// With error
<Switch 
  label="Accept terms" 
  error="You must accept the terms"
/>

// Different sizes
<Switch label="Small switch" size="small" />
<Switch label="Medium switch" size="medium" />
<Switch label="Large switch" size="large" />

// Different variants
<Switch label="Primary" variant="primary" defaultChecked />
<Switch label="Success" variant="success" defaultChecked />
<Switch label="Danger" variant="danger" defaultChecked />
<Switch label="Warning" variant="warning" defaultChecked />
<Switch label="Info" variant="info" defaultChecked />

// Label before switch
<Switch 
  label="Label before switch" 
  labelBefore 
/>
```

---

### Spinner

A loading spinner component for indicating loading states.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary'` | `'primary'` | Spinner variant |
| `children` | `React.ReactNode` | - | Spinner children |
| `className` | `string` | `''` | Additional CSS classes |
| `onClick` | `() => void` | - | Click handler |

#### Variants

- `primary` - Primary brand color
- `secondary` - Secondary color

#### Usage Examples

```tsx
import { Spinner } from '@nbs/component-library';

// Basic spinner
<Spinner />

// With variant
<Spinner variant="primary" />
<Spinner variant="secondary" />

// With children
<Spinner>Loading...</Spinner>
```

---

### DataTable

A powerful, feature-rich data table component with search, selection, pagination, and loading states. Built on top of Ant Design Table.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `DataTableColumn<T>[]` | **required** | Table columns configuration |
| `dataSource` | `T[]` | **required** | Table data source |
| `selection` | `boolean` | `false` | Whether to show row selection checkbox |
| `onSelectionChange` | `(selectedRowKeys: React.Key[], selectedRows: T[]) => void` | - | Callback when selection changes |
| `loading` | `boolean` | `false` | Whether table is in loading state |
| `skeletonRows` | `number` | `10` | Number of skeleton rows to show during loading |
| `searchable` | `boolean` | `true` | Whether to show search input |
| `searchPlaceholder` | `string` | `'Search'` | Search placeholder text |
| `onSearchChange` | `(searchText: string) => void` | - | Callback when search text changes |
| `pagination` | `boolean \| PaginationConfig` | `true` | Whether to show pagination or pagination config |
| `rowKey` | `string \| ((record: T) => string)` | `'id'` | Table row key |
| `className` | `string` | `''` | Additional CSS classes |
| `style` | `React.CSSProperties` | - | Inline styles |
| `size` | `'small' \| 'middle' \| 'large'` | `'middle'` | Table size |
| `virtual` | `boolean` | `true` (auto for >100 rows) | Whether to enable virtual scrolling |
| `scroll` | `{ x?: number \| string, y?: number \| string }` | - | Scroll configuration |
| `onRowClick` | `(record: T, index: number) => void` | - | Callback when row is clicked |
| `emptyText` | `React.ReactNode` | - | Custom empty state content |

#### DataTableColumn Interface

```tsx
interface DataTableColumn<T = any> {
  title: string;
  dataIndex?: string | string[];
  key?: string;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  sorter?: (a: T, b: T) => number;
  filterable?: boolean;
  width?: number | string;
  align?: 'left' | 'right' | 'center';
  fixed?: 'left' | 'right';
  ellipsis?: boolean;
}
```

#### PaginationConfig

```tsx
interface PaginationConfig {
  pageSize?: number;
  showSizeChanger?: boolean;
  pageSizeOptions?: string[];
  showQuickJumper?: boolean;
  showTotal?: (total: number, range: [number, number]) => React.ReactNode;
}
```

#### Usage Examples

```tsx
import { DataTable, DataTableColumn } from '@nbs/component-library';

type User = {
  id: string;
  name: string;
  role: string;
  age: number;
};

const columns: DataTableColumn<User>[] = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Role', dataIndex: 'role', key: 'role' },
  { title: 'Age', dataIndex: 'age', key: 'age', sorter: (a, b) => a.age - b.age },
];

const data: User[] = [
  { id: '1', name: 'Alex Johnson', role: 'Admin', age: 31 },
  { id: '2', name: 'Maria Garcia', role: 'Manager', age: 28 },
  { id: '3', name: 'Sam Lee', role: 'User', age: 24 },
];

// Basic table
<DataTable<User>
  columns={columns}
  dataSource={data}
  rowKey="id"
/>

// With selection
<DataTable<User>
  columns={columns}
  dataSource={data}
  rowKey="id"
  selection
  onSelectionChange={(keys, rows) => {
    console.log('Selected:', keys, rows);
  }}
/>

// With loading state
<DataTable<User>
  columns={columns}
  dataSource={data}
  rowKey="id"
  loading={isLoading}
  skeletonRows={5}
/>

// Without search
<DataTable<User>
  columns={columns}
  dataSource={data}
  rowKey="id"
  searchable={false}
/>

// Custom pagination
<DataTable<User>
  columns={columns}
  dataSource={data}
  rowKey="id"
  pagination={{
    pageSize: 20,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100'],
    showTotal: (total) => `Total: ${total} items`,
  }}
/>

// With row click
<DataTable<User>
  columns={columns}
  dataSource={data}
  rowKey="id"
  onRowClick={(record, index) => {
    console.log('Clicked row:', record);
  }}
/>

// With scroll
<DataTable<User>
  columns={columns}
  dataSource={data}
  rowKey="id"
  scroll={{ x: 800, y: 400 }}
/>

// Different sizes
<DataTable<User>
  columns={columns}
  dataSource={data}
  rowKey="id"
  size="small"
/>

<DataTable<User>
  columns={columns}
  dataSource={data}
  rowKey="id"
  size="large"
/>
```

---

### ErrorBoundary

A React error boundary component that catches JavaScript errors anywhere in the child component tree and displays a fallback UI.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | **required** | Child components to wrap |
| `fallback` | `React.ReactNode` | `<h2>Something went wrong.</h2>` | Fallback UI to display on error |

#### Usage Examples

```tsx
import { ErrorBoundary } from '@nbs/component-library';

// Basic usage
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>

// With custom fallback
<ErrorBoundary fallback={<div>Custom error message</div>}>
  <MyComponent />
</ErrorBoundary>

// Wrapping entire app
function App() {
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <Router>
        <Routes>
          {/* Your routes */}
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}
```

---

## Dialog

Config-driven dialog component with header, content, and footer actions.

## Tabs

Config-driven tabs supporting variants and orientations.

## Accordion

Config-driven accordion with single or multiple items.

## NavigationMenu

Config-driven navigation menu with nested dropdown items.

## Breadcrumb

Breadcrumb navigation with custom separators.

## DropdownMenu

Dropdown menu with items, separators, and submenus.

## Form

Dynamic form rendering based on a field config.

## Combobox

Searchable combobox with option filtering.

## CommandPalette

Command palette overlay with grouped commands.

## Avatar

Avatar component with image and fallback.

## Tooltip

Simple hover tooltip.

## Progress

Progress indicator bar.

## Skeleton

Skeleton loading placeholder.

## Separator

Horizontal or vertical separator line.

---

## Quick Reference

### Component Variants Summary

| Component | Variants Available |
|-----------|-------------------|
| Button | 16 variants (8 solid + 8 outline) |
| Badge | 8 variants |
| Alert | 6 variants |
| Input | 3 variants (default, light, primary) |
| Textarea | 3 variants (default, light, primary) |
| Switch | 5 variants (primary, success, danger, warning, info) |
| Spinner | 2 variants (primary, secondary) |

### Component Sizes Summary

| Component | Sizes Available |
|-----------|----------------|
| Button | small, medium, large |
| Input | small, medium, large |
| Select | small, medium, large |
| Checkbox | small, medium, large |
| Textarea | small, medium, large |
| Radio | small, medium, large |
| Switch | small, medium, large |
| Modal | sm, md, lg, xl |
| DataTable | small, middle, large |

### Form Validation Pattern

Most form components (Input, Select, Textarea, Checkbox, Radio) support:
- `invalid` prop - Boolean to mark as invalid
- `error` prop - String error message
- `valid` prop - Boolean to mark as valid
- `helperText` prop - String helper text

---

## TypeScript Support

All components export their prop types for TypeScript usage:

```tsx
import { 
  Button, 
  type ButtonProps,
  Card,
  type CardProps,
  Input,
  type InputProps,
  // ... etc
} from '@nbs/component-library';

// Use types for component props
const buttonProps: ButtonProps = {
  variant: 'primary',
  size: 'medium',
  children: 'Click me',
};
```

---

*Last updated: January 2026*
