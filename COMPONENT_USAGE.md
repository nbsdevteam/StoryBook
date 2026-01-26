# How to Use NBS Component Library in Your React Project

This guide explains how to install and use the NBS Component Library components in your React application.

## Installation

### Step 1: Install the Library

```bash
npm install git+https://github.com/syednaqvi98nibras/StoryBook.git
```

This will install the `@nbs/component-library` package and all its dependencies.

### Step 2: Import Styles

In your main entry file (usually `src/main.tsx` or `src/index.tsx`), import the library styles:

```typescript
import '@nbs/component-library/dist/styles.css';
```

**Important:** This CSS file includes Bootstrap base styles that the components depend on. Make sure to import it before your component imports.

## Basic Usage

### Import Components

```typescript
import { Button, Card, Badge, Alert, Modal, DataTable, Input, Select, Checkbox, Textarea, Radio, Switch } from '@nbs/component-library';
```

You can import individual components or multiple at once:

```typescript
// Import specific components
import { Button, Card } from '@nbs/component-library';

// Import with TypeScript types
import { Button, type ButtonProps } from '@nbs/component-library';
```

## Component Examples

### Button Component

```typescript
import { Button } from '@nbs/component-library';

function MyComponent() {
  return (
    <div>
      {/* Primary button */}
      <Button variant="primary" onClick={() => console.log('Clicked!')}>
        Primary Button
      </Button>

      {/* Secondary button */}
      <Button variant="secondary">Secondary</Button>

      {/* Success button with rounded style */}
      <Button variant="success" rounded>
        Success
      </Button>

      {/* Disabled button */}
      <Button variant="primary" disabled>
        Disabled
      </Button>

      {/* Loading button */}
      <Button variant="primary" loading>
        Loading...
      </Button>

      {/* Full width button */}
      <Button variant="primary" fullWidth>
        Full Width
      </Button>

      {/* Button as link */}
      <Button variant="primary" href="https://example.com" target="_blank">
        Open Link
      </Button>

      {/* Different sizes */}
      <Button variant="primary" size="small">Small</Button>
      <Button variant="primary" size="medium">Medium</Button>
      <Button variant="primary" size="large">Large</Button>
    </div>
  );
}
```

**Available Variants:**
- `primary`, `secondary`, `success`, `danger`, `warning`, `info`, `light`, `dark`
- `outline-primary`, `outline-secondary`, `outline-success`, `outline-danger`, `outline-warning`, `outline-info`, `outline-light`, `outline-dark`

**Available Sizes:**
- `small`, `medium`, `large`

### Card Component

```typescript
import { Card } from '@nbs/component-library';

function MyComponent() {
  return (
    <div>
      {/* Basic card */}
      <Card title="Card Title">
        <p>Card content goes here</p>
      </Card>

      {/* Card with subtitle */}
      <Card title="Card Title" subtitle="Card Subtitle">
        <p>Content with subtitle</p>
      </Card>

      {/* Card with image */}
      <Card
        imageSrc="https://via.placeholder.com/400x200"
        imageAlt="Card image"
        title="Card with Image"
      >
        <p>This card has an image at the top</p>
      </Card>

      {/* Card with header */}
      <Card
        header={<div className="badge bg-primary">Featured</div>}
        title="Special Card"
      >
        <p>Card with custom header</p>
      </Card>

      {/* Card with footer */}
      <Card
        title="Card with Footer"
        footer={
          <div>
            <Button variant="primary" size="small">Action</Button>
          </div>
        }
      >
        <p>Card content</p>
      </Card>

      {/* Complete card */}
      <Card
        imageSrc="https://via.placeholder.com/400x200"
        imageAlt="Image"
        header={<div className="badge bg-success">New</div>}
        title="Complete Card"
        subtitle="Subtitle"
        footer={
          <div className="d-flex gap-2">
            <Button variant="primary" size="small">Save</Button>
            <Button variant="secondary" size="small">Cancel</Button>
          </div>
        }
      >
        <p>This is a complete card with all sections</p>
      </Card>

      {/* Card without shadow */}
      <Card title="No Shadow" shadow={false}>
        <p>Card without shadow effect</p>
      </Card>

      {/* Card without border */}
      <Card title="No Border" bordered={false}>
        <p>Card without border</p>
      </Card>
    </div>
  );
}
```

### Badge Component

```typescript
import { Badge } from '@nbs/component-library';

function MyComponent() {
  return (
    <div>
      {/* Basic badges */}
      <Badge variant="primary">Primary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="info">Info</Badge>

      {/* Rounded badge */}
      <Badge variant="primary" rounded>
        Rounded
      </Badge>

      {/* Outline badge */}
      <Badge variant="outline-primary">
        Outline
      </Badge>
    </div>
  );
}
```

### Alert Component

```typescript
import { Alert } from '@nbs/component-library';

function MyComponent() {
  const [showAlert, setShowAlert] = useState(true);

  return (
    <div>
      {/* Basic alert */}
      <Alert variant="success">
        This is a success alert!
      </Alert>

      {/* Alert with title */}
      <Alert variant="danger" title="Error">
        Something went wrong
      </Alert>

      {/* Dismissible alert */}
      {showAlert && (
        <Alert
          variant="info"
          title="Information"
          dismissible
          onDismiss={() => setShowAlert(false)}
        >
          This alert can be dismissed
        </Alert>
      )}

      {/* All variants */}
      <Alert variant="primary">Primary alert</Alert>
      <Alert variant="secondary">Secondary alert</Alert>
      <Alert variant="success">Success alert</Alert>
      <Alert variant="danger">Danger alert</Alert>
      <Alert variant="warning">Warning alert</Alert>
      <Alert variant="info">Info alert</Alert>
    </div>
  );
}
```

### Modal Component

```typescript
import { Modal, Button } from '@nbs/component-library';
import { useState } from 'react';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button variant="primary" onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Modal Title"
        size="md"
        centered
      >
        <p>Modal content goes here</p>
        <p>You can put any React content inside the modal.</p>
      </Modal>

      {/* Modal with footer */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm Action"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => {
              // Handle confirm action
              setIsOpen(false);
            }}>
              Confirm
            </Button>
          </>
        }
      >
        <p>Are you sure you want to proceed?</p>
      </Modal>

      {/* Different sizes */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="sm" title="Small Modal">
        Small modal content
      </Modal>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="lg" title="Large Modal">
        Large modal content
      </Modal>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="xl" title="Extra Large Modal">
        Extra large modal content
      </Modal>

      {/* Static backdrop (can't close by clicking outside) */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Static Backdrop"
        backdrop="static"
      >
        This modal cannot be closed by clicking the backdrop
      </Modal>
    </div>
  );
}
```

### Input Component

```typescript
import { Input } from '@nbs/component-library';
import { useState } from 'react';

function MyComponent() {
  const [value, setValue] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div>
      {/* Basic input */}
      <Input
        type="text"
        placeholder="Enter your name"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      {/* Input with label */}
      <Input
        label="Email Address"
        type="email"
        placeholder="email@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {/* Input with helper text */}
      <Input
        label="Username"
        helperText="Choose a unique username"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      {/* Input with error state */}
      <Input
        label="Password"
        type="password"
        errorText="Password must be at least 8 characters"
        isValid={false}
      />

      {/* Input with left icon */}
      <Input
        label="Search"
        leftIcon={<i className="ti ti-search" />}
        placeholder="Search..."
      />

      {/* Input with right icon */}
      <Input
        label="Password"
        type="password"
        rightIcon={<i className="ti ti-eye" />}
      />

      {/* Different sizes */}
      <Input size="small" placeholder="Small input" />
      <Input size="medium" placeholder="Medium input" />
      <Input size="large" placeholder="Large input" />
    </div>
  );
}
```

### Select Component

```typescript
import { Select } from '@nbs/component-library';
import { useState } from 'react';

function MyComponent() {
  const [selected, setSelected] = useState('');
  const [multiSelected, setMultiSelected] = useState([]);

  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  return (
    <div>
      {/* Basic select */}
      <Select
        label="Choose an option"
        options={options}
        value={selected}
        onChange={(value) => setSelected(value)}
        placeholder="Select an option"
      />

      {/* Multiple select */}
      <Select
        label="Choose multiple options"
        options={options}
        multiple
        value={multiSelected}
        onChange={(values) => setMultiSelected(values)}
      />

      {/* Select with validation */}
      <Select
        label="Required Field"
        options={options}
        required
        errorText="This field is required"
        isValid={selected === '' ? false : true}
      />
    </div>
  );
}
```

### Checkbox Component

```typescript
import { Checkbox } from '@nbs/component-library';
import { useState } from 'react';

function MyComponent() {
  const [checked, setChecked] = useState(false);

  return (
    <div>
      {/* Basic checkbox */}
      <Checkbox
        label="I agree to the terms and conditions"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />

      {/* Checkbox with label before */}
      <Checkbox
        label="Enable notifications"
        labelPosition="before"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />

      {/* Different sizes */}
      <Checkbox size="small" label="Small checkbox" />
      <Checkbox size="medium" label="Medium checkbox" />
      <Checkbox size="large" label="Large checkbox" />

      {/* With validation */}
      <Checkbox
        label="Required checkbox"
        required
        errorText="You must accept this"
        isValid={checked}
      />
    </div>
  );
}
```

### Radio Component

```typescript
import { Radio } from '@nbs/component-library';
import { useState } from 'react';

function MyComponent() {
  const [selected, setSelected] = useState('option1');

  return (
    <div>
      {/* Basic radio */}
      <Radio
        label="Option 1"
        name="group1"
        value="option1"
        checked={selected === 'option1'}
        onChange={(e) => setSelected(e.target.value)}
      />

      <Radio
        label="Option 2"
        name="group1"
        value="option2"
        checked={selected === 'option2'}
        onChange={(e) => setSelected(e.target.value)}
      />

      {/* Radio group */}
      <div>
        <h4>Choose a plan:</h4>
        <Radio
          label="Basic Plan"
          name="plan"
          value="basic"
          checked={selected === 'basic'}
          onChange={(e) => setSelected(e.target.value)}
        />
        <Radio
          label="Pro Plan"
          name="plan"
          value="pro"
          checked={selected === 'pro'}
          onChange={(e) => setSelected(e.target.value)}
        />
        <Radio
          label="Enterprise Plan"
          name="plan"
          value="enterprise"
          checked={selected === 'enterprise'}
          onChange={(e) => setSelected(e.target.value)}
        />
      </div>
    </div>
  );
}
```

### Textarea Component

```typescript
import { Textarea } from '@nbs/component-library';
import { useState } from 'react';

function MyComponent() {
  const [value, setValue] = useState('');

  return (
    <div>
      {/* Basic textarea */}
      <Textarea
        label="Message"
        placeholder="Enter your message"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={4}
      />

      {/* Auto-resize textarea */}
      <Textarea
        label="Auto-resize"
        autoResize
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      {/* Textarea with character count */}
      <Textarea
        label="Description"
        maxLength={200}
        showCharCount
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      {/* With validation */}
      <Textarea
        label="Required Field"
        required
        errorText="This field is required"
        isValid={value.length > 0}
      />
    </div>
  );
}
```

### Switch Component

```typescript
import { Switch } from '@nbs/component-library';
import { useState } from 'react';

function MyComponent() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div>
      {/* Basic switch */}
      <Switch
        label="Enable feature"
        checked={enabled}
        onChange={(e) => setEnabled(e.target.checked)}
      />

      {/* Different variants */}
      <Switch variant="primary" label="Primary switch" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} />
      <Switch variant="success" label="Success switch" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} />
      <Switch variant="danger" label="Danger switch" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} />

      {/* Different sizes */}
      <Switch size="small" label="Small switch" />
      <Switch size="medium" label="Medium switch" />
      <Switch size="large" label="Large switch" />
    </div>
  );
}
```

### DataTable Component

```typescript
import { DataTable } from '@nbs/component-library';

function MyComponent() {
  // Define columns
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button size="small" variant="primary" onClick={() => handleEdit(record)}>
          Edit
        </Button>
      ),
    },
  ];

  // Sample data
  const data = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager' },
  ];

  return (
    <div>
      {/* Basic table */}
      <DataTable
        columns={columns}
        dataSource={data}
        rowKey="id"
      />

      {/* Table with search */}
      <DataTable
        columns={columns}
        dataSource={data}
        rowKey="id"
        searchable
        searchPlaceholder="Search users..."
      />

      {/* Table with selection */}
      <DataTable
        columns={columns}
        dataSource={data}
        rowKey="id"
        selection
        onSelectionChange={(keys, rows) => {
          console.log('Selected:', keys, rows);
        }}
      />

      {/* Table with loading state */}
      <DataTable
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={isLoading}
        skeletonRows={5}
      />

      {/* Table with custom pagination */}
      <DataTable
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={{
          pageSize: 20,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '50', '100'],
        }}
      />

      {/* Table with row click handler */}
      <DataTable
        columns={columns}
        dataSource={data}
        rowKey="id"
        onRowClick={(record, index) => {
          console.log('Clicked row:', record, index);
        }}
      />
    </div>
  );
}
```

## Complete Example: Form with Multiple Components

```typescript
import { useState } from 'react';
import { Button, Card, Input, Select, Checkbox, Textarea, Alert } from '@nbs/component-library';
import '@nbs/component-library/dist/styles.css';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    newsletter: false,
  });
  const [showAlert, setShowAlert] = useState(false);

  const subjectOptions = [
    { value: 'support', label: 'Support' },
    { value: 'sales', label: 'Sales' },
    { value: 'general', label: 'General Inquiry' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto' }}>
      <Card title="Contact Us">
        {showAlert && (
          <Alert variant="success" dismissible onDismiss={() => setShowAlert(false)}>
            Form submitted successfully!
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Input
            label="Name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter your name"
          />

          <Input
            label="Email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="email@example.com"
          />

          <Select
            label="Subject"
            required
            options={subjectOptions}
            value={formData.subject}
            onChange={(value) => setFormData({ ...formData, subject: value })}
            placeholder="Select a subject"
          />

          <Textarea
            label="Message"
            required
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Enter your message"
            maxLength={500}
            showCharCount
          />

          <Checkbox
            label="Subscribe to our newsletter"
            checked={formData.newsletter}
            onChange={(e) => setFormData({ ...formData, newsletter: e.target.checked })}
          />

          <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
            <Button type="submit" variant="primary">
              Submit
            </Button>
            <Button type="button" variant="secondary" onClick={() => setFormData({
              name: '',
              email: '',
              subject: '',
              message: '',
              newsletter: false,
            })}>
              Reset
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default ContactForm;
```

## TypeScript Support

All components are fully typed. You can import TypeScript types:

```typescript
import { Button, type ButtonProps } from '@nbs/component-library';

// Use types in your code
const buttonProps: ButtonProps = {
  variant: 'primary',
  size: 'medium',
  children: 'Click me',
};
```

## Styling and Customization

### Using Bootstrap Classes

Since the components use Bootstrap classes, you can leverage Bootstrap utilities:

```typescript
<div className="d-flex gap-2 mb-3">
  <Button variant="primary">Button 1</Button>
  <Button variant="secondary">Button 2</Button>
</div>

<Card className="mt-4">
  <div className="p-3">
    Content with padding
  </div>
</Card>
```

### Custom Styling

You can add custom CSS classes to components:

```typescript
<Button variant="primary" className="my-custom-class">
  Custom Button
</Button>

<Card title="Custom Card" className="shadow-lg">
  Content
</Card>
```

## Best Practices

1. **Always import styles first**: Make sure to import `@nbs/component-library/dist/styles.css` before using components.

2. **Use TypeScript types**: Import component types for better type safety:
   ```typescript
   import { Button, type ButtonProps } from '@nbs/component-library';
   ```

3. **Handle form state**: Use React state (`useState`) or form libraries (Formik, React Hook Form) to manage form component values.

4. **Error handling**: Use the `isValid` and `errorText` props for form validation feedback.

5. **Accessibility**: Components include ARIA attributes, but always test with screen readers for your specific use cases.

6. **Performance**: For large lists, consider using the DataTable's virtual scrolling feature (enabled automatically for >100 rows).

## Troubleshooting

### Components not styling correctly

- Ensure you've imported the styles: `import '@nbs/component-library/dist/styles.css';`
- Check that the import is in your main entry file (before component imports)
- Verify Bootstrap CSS is included (it's bundled in the styles.css)

### TypeScript errors

- Make sure you have `@types/react` and `@types/react-dom` installed
- Check that your TypeScript version is compatible (5.9+)

### Import errors

- Verify the package name: `@nbs/component-library`
- Check that the library was installed correctly: `npm ls @nbs/component-library`
- Ensure you're using the correct import path: `@nbs/component-library/dist/styles.css`

## Need Help?

- View components in Storybook: Clone the repo and run `npm run storybook`
- Check component props: All components have JSDoc comments with prop descriptions
- Review examples: See the Storybook stories for each component

## Next Steps

1. Install the library in your project
2. Import styles in your main entry file
3. Start using components in your React components
4. Customize as needed with props and CSS classes

Happy coding!
