# Migration Guide: Config-Driven Components

This guide explains how to migrate from legacy prop-driven APIs to the new config-driven APIs.

## General Principles

- Simple components remain prop-driven (Button, Input, Checkbox, etc.).
- Complex components accept a `config` prop that drives rendering.
- Legacy props remain supported where possible.

## Card

**Before**
```tsx
<Card title="Title" subtitle="Subtitle">Content</Card>
```

**After**
```tsx
<Card
  config={{
    header: { title: 'Title', subtitle: 'Subtitle' },
    content: 'Content',
  }}
/>
```

## Dialog (Modal)

**Before**
```tsx
<Modal isOpen={open} onClose={() => setOpen(false)} title="Title">
  Content
</Modal>
```

**After**
```tsx
<Dialog
  config={{
    open,
    onOpenChange: setOpen,
    title: 'Title',
    content: 'Content',
  }}
/>
```

## DataTable

**Before**
```tsx
<DataTable columns={columns} dataSource={data} />
```

**After**
```tsx
<DataTable
  config={{
    columns: [{ id: 'name', label: 'Name', accessor: 'name' }],
    data,
  }}
/>
```

## Select

**Before**
```tsx
<Select options={[{ label: 'A', value: 'a' }]} />
```

**After**
```tsx
<Select config={{ options: [{ label: 'A', value: 'a' }], searchable: true }} />
```

## Notes

- The library uses pure CSS modules and design tokens. It works with Bootstrap, Tailwind, or no CSS framework.
- Update Storybook stories for new examples and reference `STORY_BOOK_COMPONENT_USAGE.md` for usage guidance.
