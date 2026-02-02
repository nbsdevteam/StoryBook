# Dummy Consumer App – Sidebar Test

Minimal app that consumes `@nbs/component-library` to verify the **Sidebar** works as expected (or reproduces the same issue).

## Setup

1. **Build the library** (from repo root):
   ```bash
   npm run build
   ```

2. **Install and run** (from this folder):
   ```bash
   npm install
   npm run dev
   ```

3. Open **http://localhost:5174/** in the browser.

## What it does

- Renders **Sidebar** with a simple `items` list (Dashboard, Users, Settings).
- Toggle “Use config” to switch to the **config** API (sections + nested Analytics group).
- Clicking sidebar items updates the “Current route” in the main area.
- Uses `SidebarHeader`, `activeHref`, and `glassEffect` as in the consumption guide.

## Dependency

The app depends on the local library via `"@nbs/component-library": "file:.."`. After changing the library, run `npm run build` in the repo root, then refresh the consumer app (or restart `npm run dev` if needed).
