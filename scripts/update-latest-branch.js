#!/usr/bin/env node

/**
 * Update Latest Branch Script
 * 
 * Updates the 'latest' branch to point to the current release tag.
 * This allows consumers to install the latest version without specifying a tag.
 * 
 * Usage: node scripts/update-latest-branch.js
 * This is automatically called after release commands.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Get current version from package.json
const packageJsonPath = path.resolve(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const currentVersion = packageJson.version;
const tagName = `v${currentVersion}`;

console.log(`🔄 Updating 'latest' branch to point to ${tagName}...`);

try {
  // Check if tag exists
  try {
    execSync(`git rev-parse ${tagName}`, { stdio: 'ignore' });
  } catch (e) {
    console.error(`❌ Error: Tag ${tagName} does not exist. Create the tag first.`);
    process.exit(1);
  }

  // Checkout or create latest branch
  try {
    execSync('git checkout latest', { stdio: 'ignore' });
    console.log('   ✓ Checked out existing latest branch');
  } catch (e) {
    // Branch doesn't exist, create it
    execSync('git checkout -b latest', { stdio: 'ignore' });
    console.log('   ✓ Created new latest branch');
  }

  // Reset latest branch to the tag
  execSync(`git reset --hard ${tagName}`, { stdio: 'pipe' });
  console.log(`   ✓ Reset latest branch to ${tagName}`);

  // Push latest branch
  execSync('git push origin latest --force', { stdio: 'pipe' });
  console.log('   ✓ Pushed latest branch to GitHub');

  // Switch back to master
  execSync('git checkout master', { stdio: 'ignore' });
  console.log('   ✓ Switched back to master branch');

  console.log(`\n✅ Latest branch updated successfully!`);
  console.log(`\n📦 Consumers can now install with:`);
  console.log(`   github:syednaqvi98nibras/StoryBook#latest`);
  console.log(`\n   Or pin to specific version:`);
  console.log(`   github:syednaqvi98nibras/StoryBook#${tagName}`);

} catch (error) {
  console.error('❌ Error updating latest branch:', error.message);
  process.exit(1);
}
