# How to Verify What Version is Actually Installed

## Check in Consumer App

```bash
cd C:\Users\desig\Documents\SyedNaqviWork\CompanyProjects\test-nbs-components

# 1. Check package-lock.json for resolved commit
cat package-lock.json | grep -A 5 "@nbs/component-library"

# 2. Check node_modules for actual version
cat node_modules/@nbs/component-library/package.json | grep version

# 3. Force fresh install (removes cache)
rm -rf node_modules package-lock.json
npm install

# This will FAIL if the tag doesn't exist, showing you the real error
```

## Test with Invalid Tag

1. Change to invalid tag in `package.json`:
   ```json
   "@nbs/component-library": "github:syednaqvi98nibras/StoryBook#jabba"
   ```

2. Delete lock file and node_modules:
   ```bash
   rm -rf node_modules package-lock.json
   ```

3. Try to install:
   ```bash
   npm install
   ```
   
   **Expected result:** Should FAIL with error like:
   ```
   npm ERR! code 128
   npm ERR! Command failed: git ls-remote --tags --heads ssh://git@github.com/syednaqvi98nibras/StoryBook.git jabba
   npm ERR! fatal: couldn't find remote ref jabba
   ```

## Safe Practice

Always:
1. Use valid tags: `#v1.0.0`, `#latest`
2. Delete `package-lock.json` and `node_modules` when testing version changes
3. Check `package-lock.json` to see what commit was actually installed
