# Shared UI Components

This folder contains self-contained shared UI and layout components designed for reuse
in a standalone Storybook repository.

## Required Packages

Install these dependencies in the consuming project:

- `@radix-ui/react-slot`
- `lucide-react`
- `clsx`
- `tailwind-merge`
- `tailwindcss`

## Required Build Setup

### PostCSS

These CSS modules use nesting syntax. Ensure PostCSS is configured with nesting:

```js
module.exports = {
  plugins: {
    "tailwindcss/nesting": {},
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### Tailwind

The Sidebar uses Tailwind utility classes, and GlassEffect relies on CSS variables for
colors. Ensure Tailwind is configured and the shared folder is in the content glob:

```ts
const config = {
  darkMode: ["class"],
  content: ["./src/shared/**/*.{ts,tsx}"],
}
```

### Dark Mode

The GlassEffect styles use `:global(.dark)` selectors. Add or remove the `dark` class
on the root element to toggle dark mode.

## Usage

### GlassEffect

```tsx
import { GlassEffect } from "./ui/GlassEffect"

<GlassEffect variant="shine">
  <div className="rounded-lg p-4">Content</div>
</GlassEffect>
```

### Sidebar

```tsx
import { Sidebar, type SidebarItem } from "./layout/Sidebar"
import { LayoutGrid } from "lucide-react"

const items: SidebarItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutGrid,
    onClick: (href) => console.log(href),
  },
]

<Sidebar items={items} activeHref="/dashboard" title="Call Center" />
```

## File Structure

```
shared/
├── layout/
│   └── Sidebar/
├── ui/
│   └── GlassEffect/
└── utils/
    └── cn.ts
```
