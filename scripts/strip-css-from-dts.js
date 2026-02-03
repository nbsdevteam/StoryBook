/**
 * Post-build script: Remove CSS imports from dist/index.d.ts
 * 
 * The library imports global.css to bundle tokens into dist/styles.css during build.
 * But that import appears in the generated .d.ts, breaking TypeScript resolution.
 * This script strips CSS imports from the declaration file.
 */

const fs = require('fs');
const path = require('path');

const dtsPath = path.join(__dirname, '../dist/index.d.ts');

if (!fs.existsSync(dtsPath)) {
  console.warn('⚠️  dist/index.d.ts not found, skipping CSS import cleanup');
  process.exit(0);
}

const content = fs.readFileSync(dtsPath, 'utf8');

// Remove lines that import .css files
const cleaned = content
  .split('\n')
  .filter(line => !line.match(/import\s+['"].*\.css['"];?/))
  .join('\n');

fs.writeFileSync(dtsPath, cleaned, 'utf8');

console.log('✅ Stripped CSS imports from dist/index.d.ts');
