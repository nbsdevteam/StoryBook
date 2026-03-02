# STORYBOOK PROJECT ANALYSIS

Generated from project scan (Sidebar, Glass Effect, Theme, TestApp, package.json, and related sources).

---

## Project structure (depth 2, excluding node_modules / .git)

```
.cursor/
.cursor/rules/
.npmignore
.rollup.cache/
.vscode/
COMPONENT_REFERENCE.md
convert-to-webcomponents.mjs
dist/
docs/
eslint.config.js
package.json
package-lock.json
postcss.config.js
rollup.config.js
scripts/
src/
StoryBook/
StoryBook/ConsumerComponents/
StoryBook/UiPreview/
TestApp/
storybook-static/
tsconfig*.json
vite.config.*
vitest.config.ts
wc-library/
... (and other root files)
```

---

## Sidebar component files

| Path |
|------|
| StoryBook/ConsumerComponents/components/Sidebar/Sidebar.tsx |
| StoryBook/ConsumerComponents/components/Sidebar/sidebar.module.css |
| StoryBook/ConsumerComponents/components/Sidebar/index.ts |
| StoryBook/ConsumerComponents/entries/sidebar.ts |
| StoryBook/UiPreview/stories/components/Sidebar.stories.tsx |
| StoryBook/UiPreview/stories/layouts/SidebarLayout.stories.tsx |
| dist/components/Sidebar/* |
| dist/entries/sidebar.d.ts |
| dist/sidebar.js, dist/sidebar.js.map |
| src/core/common/sidebar/, horizontal-sidebar/, stacked-sidebar/ |
| src/assets/scss/layout/_sidebar.scss |
| src/assets/icon/tabler-icons/eps/layout-sidebar*.eps |
| src/core/data/json/sidebarMenu.tsx, horizontalSidebar.tsx |
| src/core/data/redux/sidebarSlice.tsx |
| src/feature-module/support/tickets-sidebar.tsx |

---

## Glass effect / theme / tokens files

**Glass:**
- StoryBook/ConsumerComponents/components/GlassEffectWrapper/GlassEffectWrapper.tsx
- StoryBook/ConsumerComponents/components/GlassEffectWrapper/glass-effect.module.css
- StoryBook/ConsumerComponents/components/GlassEffectWrapper/index.ts
- docs/GLASS_EFFECT_STYLING.md
- dist/components/GlassEffectWrapper/*

**Theme (src):**
- src/core/common/ThemeInitializer.tsx
- src/core/common/theme-settings/
- src/assets/scss/layout/_theme.scss, _theme-settings.scss
- src/assets/img/theme/*
- src/core/data/redux/themeSettingSlice.tsx
- src/test-theme.tsx

**Tokens:**
- StoryBook/ConsumerComponents/styles/tokens.css
- dist/tokens.css

---

## TestApp folder contents

```
TestApp/
  dist/
  dist/assets/
  dist/index.html
  index.html
  package.json
  package-lock.json
  src/
    App.tsx
    main.tsx
    vite-env.d.ts
  tsconfig.json
  tsconfig.tsbuildinfo
  vite.config.ts
```

---

## package.json (root)

- **name:** @nbs/component-library  
- **version:** 1.1.14  
- **main:** dist/index.js  
- **module:** dist/index.esm.js  
- **types:** dist/index.d.ts  
- **style:** dist/styles.css  
- **exports:** `.` (main lib), `./Sidebar`, `./Card`, `./styles.css`, `./tokens.css`  
- **scripts:** dev, build, storybook, build-storybook, test, lint, release:*  
- **keywords:** react, components, typescript, storybook, ui-library, sidebar, card, glass-effect  

---

## Sidebar source (library)

**File:** `StoryBook/ConsumerComponents/components/Sidebar/Sidebar.tsx`

- **SidebarItem:** name, href, icon (LucideIcon), onClick(href).
- **SidebarProps:** items?, config?, activeHref?, title?, sidebarHeader?, **glassEffect?** (default false), **randomHue?** (default false), width?, className?, itemClassName?.
- **Internal:** Each nav item is rendered by `SidebarItemComponent`, which wraps a `<button>` in `<GlassEffectWrapper asChild glassEffect={glassEffect && !isActive} variant="perfume" randomHue={randomHue} />`. So glass is applied per item, only when not active.
- **Structure:** Root `<div className={styles.sidebar}>`, optional header, `<nav>` with sections; sections contain link items or groups; each link is a button wrapped by GlassEffectWrapper.

---

## Sidebar styles (library)

**File:** `StoryBook/ConsumerComponents/components/Sidebar/sidebar.module.css`

- **.sidebar:** Uses `--nbs-sidebar-bg`, `--nbs-sidebar-border`, `--sidebar-width`; flex column; isolation/contain for repaint; transform/backface for GPU.
- **.sidebar button:** all: unset, flex, cursor, padding, border-radius; isolation/contain on buttons.
- **.nav:** flex, padding, gap, overflow auto.
- **.section / .sectionToggle / .sectionContent:** Collapsible sections and labels.
- **.group / .groupToggle / .groupContent:** Nested groups with chevron.
- **.itemButton / .itemInactive / .itemActive:** Base and active state.
- **Color variants:** hoverNeutral, activeNeutral, hoverPrimary, activePrimary, hoverBlue, activeBlue, … (orange, green, purple, pink, cyan, indigo, emerald, amber, violet, slate, red, teal, lime). Each has hover/focus and active rules; some with `.sidebar button` specificity and dark mode / `[data-nbs-theme="dark"]`.
- **.header / .headerTitle:** Top header block.
- **Reduced motion:** transitions/animations/transforms disabled in `@media (prefers-reduced-motion: reduce)`.

---

## Glass effect styles (library)

**File:** `StoryBook/ConsumerComponents/components/GlassEffectWrapper/glass-effect.module.css`

- **.glassShine:** relative, transition, translate3d, contain, isolation; ::before = full-size gradient (transparent → white 0.4 → transparent), pointer-events: none, z-index 1; on :hover, ::before opacity 1 and background-position sweep, container gets slight lift, background, box-shadow. Dark mode overrides for `[data-nbs-theme="dark"]` and `@media (prefers-color-scheme: dark)`.
- **.perfumeGlass:** Similar containment/isolation; subtle base background/border; ::before gradient (stronger center); :hover = scale + shadow; **.perfumeGlass[data-random-hue="true"]:hover** uses `--random-hue` for colored background/border/box-shadow (hsla). Dark variants for theme and prefers-color-scheme.
- **Reduced motion:** transitions/animations/transforms disabled for .glassShine and .perfumeGlass.

---

## Summary

- **Library Sidebar** lives in `StoryBook/ConsumerComponents/components/Sidebar/`; it uses `GlassEffectWrapper` per item with `glassEffect && !isActive`, `variant="perfume"`, and `randomHue`.
- **Glass effect** is implemented in `GlassEffectWrapper` and `glass-effect.module.css`; Sidebar does not apply glass to the whole sidebar, only to each non-active item.
- **TestApp** consumes the library from the repo and demonstrates Sidebar + custom right sidebar (GlassTestSidebar) with the same items and GlassEffectWrapper per item.
- **Tokens** are in `StoryBook/ConsumerComponents/styles/tokens.css` and copied to `dist/tokens.css`; theme-related app code is under `src/core/common/` and `src/assets/`.
