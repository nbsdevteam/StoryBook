# Component Library

A production-ready React component library built with TypeScript, Vite, and Storybook.

## 🚀 Installation

```bash
npm install git+https://github.com/syednaqvi98nibras/StoryBook.git
```

## 📖 Usage

```typescript
import { Button, Card, Input, DataTable } from 'template-new';
import 'template-new/dist/styles.css'; // Import styles

function App() {
  return (
    <div>
      <Button variant="primary" onClick={() => console.log('clicked')}>
        Click Me
      </Button>
      <Card title="Card Title">
        Card content
      </Card>
    </div>
  );
}
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

## 📚 Storybook

View all components in Storybook:

```bash
npm run storybook
```

Opens at `http://localhost:6006`

## 🔧 Development

```bash
# Install dependencies
npm install

# Run Storybook
npm run storybook

# Build library
npm run build:library

# Build Storybook
npm run build-storybook
```

## 📦 What's Included

- ✅ 12+ React components
- ✅ Full TypeScript support
- ✅ CSS Modules for scoped styling
- ✅ Comprehensive Storybook documentation
- ✅ Tree-shakeable exports (ESM + CJS)
- ✅ Type definitions included

## 🏗️ Build Output

The library builds to:
- `dist/index.js` - CommonJS bundle
- `dist/index.esm.js` - ES Module bundle
- `dist/index.d.ts` - TypeScript definitions
- `dist/styles.css` - Extracted CSS

## 📝 License

MIT

## 🔗 Repository

https://github.com/syednaqvi98nibras/StoryBook
