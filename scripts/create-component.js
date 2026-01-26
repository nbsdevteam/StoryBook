#!/usr/bin/env node

/**
 * Component Creation Script
 * 
 * Automatically creates a new component from the _TEMPLATE
 * Usage: npm run create-component ComponentName
 * Example: npm run create-component Spinner
 */

const fs = require('fs');
const path = require('path');

// Get component name from command line argument
const componentName = process.argv[2];

if (!componentName) {
  console.error('❌ Error: Component name is required');
  console.log('Usage: npm run create-component ComponentName');
  console.log('Example: npm run create-component Spinner');
  process.exit(1);
}

// Validate component name (must be PascalCase)
if (!/^[A-Z][a-zA-Z0-9]*$/.test(componentName)) {
  console.error('❌ Error: Component name must be PascalCase (e.g., MyComponent, Spinner)');
  process.exit(1);
}

// Paths
const rootDir = path.resolve(__dirname, '..');
const templateDir = path.join(rootDir, 'src', 'components', '_TEMPLATE');
const componentDir = path.join(rootDir, 'src', 'components', componentName);
const componentsIndexPath = path.join(rootDir, 'src', 'components', 'index.ts');
const mainIndexPath = path.join(rootDir, 'src', 'index.ts');

// Check if component already exists
if (fs.existsSync(componentDir)) {
  console.error(`❌ Error: Component "${componentName}" already exists at ${componentDir}`);
  process.exit(1);
}

// Check if template exists
if (!fs.existsSync(templateDir)) {
  console.error(`❌ Error: Template not found at ${templateDir}`);
  process.exit(1);
}

console.log(`🚀 Creating component: ${componentName}...`);

// Step 1: Copy template directory
console.log('📁 Copying template files...');
fs.mkdirSync(componentDir, { recursive: true });

const templateFiles = fs.readdirSync(templateDir);

templateFiles.forEach(file => {
  const sourcePath = path.join(templateDir, file);
  const destPath = path.join(componentDir, file);
  
  if (fs.statSync(sourcePath).isFile()) {
    fs.copyFileSync(sourcePath, destPath);
  }
});

// Step 2: Rename files and replace content
console.log('✏️  Renaming files and updating content...');

const filesToProcess = [
  { old: 'Component.tsx', new: `${componentName}.tsx` },
  { old: 'Component.module.css', new: `${componentName}.module.css` },
  { old: 'Component.stories.tsx', new: `${componentName}.stories.tsx` },
];

filesToProcess.forEach(({ old, new: newName }) => {
  const oldPath = path.join(componentDir, old);
  const newPath = path.join(componentDir, newName);
  
  if (fs.existsSync(oldPath)) {
    // Read file content
    let content = fs.readFileSync(oldPath, 'utf8');
    
    // Replace "Component" with component name
    // Replace "ComponentProps" with "ComponentNameProps"
    const propsName = `${componentName}Props`;
    const componentNameLower = componentName.charAt(0).toLowerCase() + componentName.slice(1);
    
    // Replace patterns (order matters - do specific replacements first)
    // 1. Replace ComponentProps (most specific)
    content = content.replace(/ComponentProps/g, propsName);
    
    // 2. Replace Component.module.css in import statements
    content = content.replace(/Component\.module\.css/g, `${componentName}.module.css`);
    
    // 3. Replace standalone "Component" (word boundary to avoid partial matches)
    content = content.replace(/\bComponent\b/g, componentName);
    
    // 4. Replace lowercase "component" in CSS class names (but not in file paths)
    // Only replace when it's used as a CSS class reference (styles.component)
    content = content.replace(/styles\.component\b/g, `styles.${componentNameLower}`);
    content = content.replace(/\.component\b/g, `.${componentNameLower}`);
    
    // Write to new file
    fs.writeFileSync(newPath, content, 'utf8');
    
    // Delete old file
    fs.unlinkSync(oldPath);
    
    console.log(`   ✓ ${old} → ${newName}`);
  }
});

// Step 3: Update component index.ts
console.log('📝 Updating component index.ts...');
const componentIndexPath = path.join(componentDir, 'index.ts');
let componentIndexContent = fs.readFileSync(componentIndexPath, 'utf8');
componentIndexContent = componentIndexContent.replace(/Component/g, componentName);
componentIndexContent = componentIndexContent.replace(/ComponentProps/g, `${componentName}Props`);
fs.writeFileSync(componentIndexPath, componentIndexContent, 'utf8');
console.log('   ✓ Updated component index.ts');

// Step 4: Add to src/components/index.ts
console.log('📝 Adding to src/components/index.ts...');
let componentsIndexContent = fs.readFileSync(componentsIndexPath, 'utf8');

// Check if already exported (shouldn't be, but just in case)
if (componentsIndexContent.includes(`from './${componentName}'`)) {
  console.log('   ⚠️  Component already exported in components/index.ts');
} else {
  // Add export before the last line (ErrorBoundary export)
  const lines = componentsIndexContent.split('\n');
  const lastLine = lines[lines.length - 1];
  lines[lines.length - 1] = `export * from './${componentName}';`;
  lines.push(lastLine);
  componentsIndexContent = lines.join('\n');
  fs.writeFileSync(componentsIndexPath, componentsIndexContent, 'utf8');
  console.log('   ✓ Added to components/index.ts');
}

// Step 5: Add to src/index.ts
console.log('📝 Adding to src/index.ts...');
let mainIndexContent = fs.readFileSync(mainIndexPath, 'utf8');

// Check if already exported
if (mainIndexContent.includes(`from './components/${componentName}'`)) {
  console.log('   ⚠️  Component already exported in src/index.ts');
} else {
  // Determine category (default to UI Components)
  // You can enhance this later to categorize automatically
  const propsName = `${componentName}Props`;
  
  // Add export before the "Re-export all from components index" line
  const exportLine = `export { ${componentName}, type ${propsName} } from './components/${componentName}';`;
  
  // Find the line with "Re-export all from components"
  const lines = mainIndexContent.split('\n');
  const reExportIndex = lines.findIndex(line => line.includes('Re-export all from components'));
  
  if (reExportIndex !== -1) {
    // Insert before the re-export line
    lines.splice(reExportIndex, 0, exportLine);
  } else {
    // Add at the end before the last line
    lines.splice(lines.length - 1, 0, exportLine);
  }
  
  mainIndexContent = lines.join('\n');
  fs.writeFileSync(mainIndexPath, mainIndexContent, 'utf8');
  console.log('   ✓ Added to src/index.ts');
}

console.log('\n✅ Component created successfully!');
console.log(`\n📂 Location: src/components/${componentName}/`);
console.log('\n📝 Next steps:');
console.log(`   1. Edit src/components/${componentName}/${componentName}.tsx - Implement your component`);
console.log(`   2. Edit src/components/${componentName}/${componentName}.module.css - Add your styles`);
console.log(`   3. Edit src/components/${componentName}/${componentName}.stories.tsx - Update Storybook stories`);
console.log('   4. Run: npm run storybook - To view your component');
console.log('\n🎉 Happy coding!');
