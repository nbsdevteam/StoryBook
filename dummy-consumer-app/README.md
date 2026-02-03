# Dummy Consumer App – Sidebar Test

Minimal app that consumes `@nbs/component-library` like a normal consumer to verify the **Sidebar** works as expected.

## Setup

1. **Install and run** (from this folder):
   ```bash
   npm install
   npm run dev
   ```

2. Open **http://localhost:5174/** (or the port Vite prints) in the browser.

## What it does

- Renders **Sidebar** with a simple `items` list (Dashboard, Users, Settings).
- Toggle “Use config” to switch to the **config** API (sections + nested Analytics group).
- Clicking sidebar items updates the “Current route” in the main area.
- Uses `SidebarHeader`, `activeHref`, etc. as in the consumption guide.

## Dependency

The app installs the library from GitHub like a normal consumer:

- **Latest:** `"@nbs/component-library": "github:syednaqvi98nibras/StoryBook#latest"`  
  Run `npm install` (or `npm update @nbs/component-library`) to get the newest release.

- **Pin to a version:** Change to e.g. `"github:syednaqvi98nibras/StoryBook#v1.1.8"` for a specific tag, then `npm install`.
