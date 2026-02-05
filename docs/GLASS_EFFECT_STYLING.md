# Glass Effect Styling Guide

This document explains how the **GlassEffect** hover styling is implemented so you can reuse it in other projects. It covers the React component, CSS module styles, and **exactly how dark mode is handled** so other agents or projects can copy it **without Tailwind**. For projects not using Tailwind: **Section 6** gives step-by-step instructions to implement dark mode (theme switch button, system/browser theme, persistence, and avoiding flash), plus a checklist of every detail required so styles convert correctly to dark mode.

---

## Important: No Tailwind required

- **GlassEffect styling is pure CSS.** It does **not** use Tailwind’s `dark:` variant, Tailwind config, or any Tailwind utilities.
- Dark mode is controlled by **one class** on a root element: `.dark`. The glass CSS module uses `:global(.dark)` to target that ancestor. Any project (with or without Tailwind) can use this by adding/removing the `dark` class and including the provided CSS.

---

## Overview

- **GlassEffect** is a wrapper component that applies a frosted-glass hover effect with optional left-to-right shine.
- Two variants: **shine** (neutral glass) and **perfume** (tinted glass, optional random hue on hover).
- **Dark mode:** A class `dark` is applied to an **ancestor** of the glass element (typically `<html>`). The CSS module uses the selector `:global(.dark) .glassShine:hover` (and similar) so that when any ancestor has the class `dark`, the dark-mode styles override the default (light) styles. No Tailwind, no media queries—just that one class.

---

## 1. How dark mode is handled (full explanation for agents)

### 1.1 Contract

- **Light mode:** Default. No special class is required. All base and hover rules in `glass-effect.module.css` that do **not** start with `:global(.dark)` apply.
- **Dark mode:** Some **ancestor** of the glass element must have the class `dark`. Convention is to put it on `<html>`: `<html class="dark">` or `<html class="">` for light. The glass component does **not** add this class; the app’s theme layer does (e.g. a theme provider or a script that runs on load).

### 1.2 Why the class must be on an ancestor

- The GlassEffect component renders an element that has a class like `glassShine` or `perfumeGlass` (from the CSS module). The component does **not** set `class="dark"` on itself.
- Dark mode styles are written as: **when an ancestor has `.dark`, then these rules apply to the glass element.** So the selector is `:global(.dark) .glassShine:hover`, meaning: “when somewhere above this element there is an element with class `dark`, and this element has class `glassShine` and is hovered, use these styles.”
- So the **only** requirement for dark mode is: **the same DOM node that wraps your app (e.g. `<html>`) must have the class `dark` when the user has chosen dark theme.** The glass CSS then reacts automatically via the cascade.

### 1.3 Where to put the `dark` class

- **Recommended:** `<html class="dark">` or `<html class="">` (for light). That way every element in the page is under the same theme root.
- **Alternative:** Any wrapper that contains all glass elements, e.g. `<body class="dark">` or a `<div id="root" class="dark">`. As long as the glass element is a **descendant** of the element with class `dark`, the `:global(.dark)` selectors will match.

### 1.4 How the cascade works (light vs dark)

- **Default (no `.dark` on an ancestor):** Only the “normal” rules apply (e.g. `.glassShine`, `.glassShine:hover`, `.perfumeGlass`, `.perfumeGlass:hover`). That is **light mode**.
- **When an ancestor has `.dark`:** The rules inside `:global(.dark) .glassShine:hover`, `:global(.dark) .perfumeGlass`, and `:global(.dark) .perfumeGlass:hover` also match. They override the same properties (background, box-shadow, filter, border) with dark-appropriate values. The component does not need to know the current theme; it only needs to have the correct class (`glassShine` or `perfumeGlass`). Theme is entirely “is there a `.dark` above me?”

### 1.5 No Tailwind, no media query

- There is **no** use of `@media (prefers-color-scheme: dark)` in the glass CSS. Dark mode is **purely class-based**. You can still *set* the class based on system preference (e.g. `prefers-color-scheme: dark`) in JavaScript, but the glass styles themselves only look at the presence of the `.dark` class.
- Tailwind is not involved: no `dark:` prefix, no Tailwind config. Other projects that do not use Tailwind can use this guide and the same CSS as-is; they only need to add/remove the `dark` class on the root element.

### 1.6 Theme sources: switch button vs system/browser

Users can get dark mode in two ways, and your app must support both when you want “theme that adapts”:

1. **Theme switch button (user choice)**  
   The user explicitly picks “Light”, “Dark”, or “System” in your UI. You store that (e.g. in `localStorage` as `"light"` | `"dark"` | `"system"`) and apply it when deciding whether to add the `dark` class.

2. **System / browser theme**  
   **“Browser theme” and “system theme” are the same thing.** Both come from the OS/browser setting and are exposed in JavaScript as `window.matchMedia("(prefers-color-scheme: dark)").matches`. So when the user has not chosen a fixed theme (or chose “System”), you use this to decide: if `true` → add `dark`; if `false` → remove `dark`.

**Combined logic:**  
- Stored value is `"dark"` → add class `dark` to `<html>`.  
- Stored value is `"light"` → remove class `dark`.  
- Stored value is `"system"` or missing → add `dark` when `prefers-color-scheme: dark` is true, otherwise remove it.  
- Listen to `prefers-color-scheme` changes when using system theme so the UI updates if the user changes their OS/browser theme.

---

## 2. GlassEffect component (React)

**Location (conceptual):** `shared/ui/GlassEffect/`

**Props:**

| Prop           | Type                      | Default   | Description |
|----------------|---------------------------|-----------|-------------|
| `asChild`      | `boolean`                 | `true`    | If true, merges props into the single child (e.g. via Radix `Slot`). If false, renders a `div`. |
| `glassEffect`  | `boolean`                 | `true`    | When true, applies the glass hover class. |
| `variant`      | `"shine" \| "perfume"`    | `"shine"` | `shine` = neutral glass; `perfume` = tinted glass. |
| `randomHue`    | `boolean`                 | `false`   | Only for `perfume`: on hover, sets a random `--random-hue` (e.g. 0–360deg) for hue-rotate. |
| `className`    | `string`                  | —         | Merged with the glass class. |
| …HTMLAttributes| —                         | —         | Passed through (e.g. `onMouseEnter`, `onMouseLeave`, `style`). |

**Usage examples (no Tailwind; use your own classes or inline styles):**

```tsx
// Neutral glass with shine (default)
<GlassEffect variant="shine">
  <button>Click me</button>
</GlassEffect>

// Perfume glass, no random hue
<GlassEffect variant="perfume">
  <div style={{ padding: "1rem" }}>Card</div>
</GlassEffect>

// Perfume glass with random hue on hover
<GlassEffect variant="perfume" randomHue>
  <div style={{ padding: "1rem" }}>Card</div>
</GlassEffect>

// Disable glass, keep wrapper (add your own class for layout/visuals)
<GlassEffect glassEffect={false} className="my-custom-class">
  <div>No glass</div>
</GlassEffect>
```

The component applies one of two CSS module classes: `glassShine` or `perfumeGlass`, and for `perfume` + `randomHue` it sets the inline CSS variable `--random-hue` on mouse enter/leave. It does **not** add or read the `dark` class; dark mode is entirely handled by the CSS when an ancestor has `dark`.

---

## 3. CSS module: `glass-effect.module.css`

This file defines the actual glass look. All hover states are defined here; dark mode overrides use `:global(.dark)`.

---

### 3.1 Variant: **shine** (neutral glass)

**Class:** `.glassShine`

**Light mode (default):**

- **Base:** `position: relative`, `transition: all 0.3s ease`.
- **`::before` (shine overlay):**
  - Full-size pseudo-element, `opacity: 0`, `pointer-events: none`, `z-index: 1`, `border-radius: inherit`.
  - Background: horizontal gradient `transparent → rgba(255,255,255,0.4) → transparent`, `background-size: 200% 100%`, `background-position: 100% 0`.
  - On **hover:** `opacity: 1`, `background-position: 0% 0` → shine sweeps left-to-right.
- **On hover (element itself):**
  - `background: rgba(255, 255, 255, 0.15)`
  - `backdrop-filter: blur(20px) saturate(180%)` (and `-webkit-backdrop-filter`)
  - Box shadow: outer soft shadow + inset top highlight + soft glow for depth.

**Dark mode:** `:global(.dark) .glassShine:hover`

- Softer glass: `background: rgba(255, 255, 255, 0.08)`.
- Darker, deeper shadow: `0 8px 32px 0 rgba(0,0,0,0.5)` and reduced inset/glow so the glass sits on dark backgrounds without looking too bright.

So: **light mode** = brighter glass and stronger highlight; **dark mode** = dimmer glass and stronger outer shadow.

---

### 3.2 Variant: **perfume** (tinted glass)

**Class:** `.perfumeGlass`

**Light mode:**

- **Base:**
  - `background: rgba(200, 200, 255, 0.15)`, `backdrop-filter: blur(20px) saturate(180%)`, `border: 1px solid rgba(255,255,255,0.2)`.
  - `filter: hue-rotate(var(--random-hue, 0deg))` so optional random hue works.
- **`::before`:** Same shine idea as `.glassShine` (opacity/position transition on hover).
- **Hover:**
  - Stronger tint: `background: rgba(200, 200, 255, 0.25)`, `backdrop-filter` saturate 200%.
  - Inset border highlight + soft glow.
  - `transform: scale(1.05)`.
  - `filter: hue-rotate(var(--random-hue, 0deg)) saturate(1.3) brightness(1.1)`.

**Dark mode (base):** `:global(.dark) .perfumeGlass`

- Darker tint: `background: rgba(100, 100, 200, 0.2)`, `border: 1px solid rgba(255,255,255,0.15)`.
- Same `filter: hue-rotate(var(--random-hue, 0deg))`.

**Dark mode (hover):** `:global(.dark) .perfumeGlass:hover`

- `background: rgba(100, 100, 200, 0.3)`.
- Deeper shadow: `0 8px 32px 0 rgba(0,0,0,0.6)` and softer inset/glow.
- `filter: hue-rotate(var(--random-hue, 0deg)) saturate(1.3) brightness(1.2)`.

So: **light mode** = lavender tint and brighter; **dark mode** = deeper blue tint and stronger shadow, with slightly higher brightness on hover.

---

## 3.3 Complete list of dark-mode rules (for agents)

Every dark-mode override lives in `glass-effect.module.css` and uses `:global(.dark)` so the class can sit on an ancestor. There are **no** other files or Tailwind utilities involved. This is the full set:

| Selector (in CSS module) | What it overrides | Purpose |
|--------------------------|-------------------|--------|
| `:global(.dark) .glassShine:hover` | `background`, `box-shadow` only (not backdrop-filter). Base and `::before` are unchanged. | Softer glass and deeper shadow on hover in dark mode so the card doesn’t look too bright on dark backgrounds. |
| `:global(.dark) .perfumeGlass` | `background`, `border`, `filter` (keeps hue-rotate). | Darker base tint and border so the perfume card fits dark theme when not hovered. |
| `:global(.dark) .perfumeGlass:hover` | `background`, `box-shadow`, `filter`. | Darker hover tint, stronger outer shadow, slightly higher brightness so the perfume hover reads well on dark. |

**What is NOT overridden in dark mode:**

- `.glassShine` base (non-hover): no dark rule; the element has no background until hover, so light-mode base is fine.
- `.glassShine::before` and `.perfumeGlass::before`: same in both modes (shine gradient and animation).
- Transitions, positioning, backdrop-filter (for shine dark hover the same blur is used; only background and shadow change).

So: **dark mode = three extra rule blocks** that override specific properties when an ancestor has the class `dark`. The rest of the behavior is shared with light mode.

---

## 4. Summary table: light vs dark

| Aspect              | Light mode                         | Dark mode                                |
|---------------------|------------------------------------|------------------------------------------|
| **Trigger**         | Default (no `.dark`)               | Parent has class `.dark`                 |
| **Selector in module** | (default rules)                 | `:global(.dark) .glassShine:hover` etc.  |
| **Shine – base**    | Same for both                      | Same (pseudo-element)                    |
| **Shine – hover bg**| `rgba(255,255,255,0.15)`           | `rgba(255,255,255,0.08)`                 |
| **Shine – shadow**  | Lighter shadows, stronger highlight| Darker outer shadow, softer highlight   |
| **Perfume – base bg**| `rgba(200,200,255,0.15)`          | `rgba(100,100,200,0.2)`                  |
| **Perfume – hover** | Lighter tint, scale 1.05           | Darker tint, scale 1.05, brighter filter |

---

## 5. Copying into another project (no Tailwind assumed)

### 5.1 Files to copy

1. **Component:**  
   - `GlassEffect.tsx` (and its imports: `Slot` from `@radix-ui/react-slot`, and a small `cn`-style helper to merge class names).
2. **Styles:**  
   - `glass-effect.module.css` (path in the component: `./styles/glass-effect.module.css` or adjust the import). **Do not remove or rename the `:global(.dark)` selectors**—they are the only way dark mode is applied; there is no Tailwind or other framework involved.
3. **Optional – global glass utilities:**  
   - If you want static glass panels (no hover), copy the `.glass-surface`, `.glass-surface-light`, `.glass-surface-strong`, and `.glass-panel` rules and their `::before` and `.dark` overrides from this project’s global CSS. Those use plain `.dark` (in global CSS, not a module), so the same “add `dark` to an ancestor” contract applies. If the source file wraps them in Tailwind’s `@layer components { ... }`, copy only the rule blocks inside (the raw `.glass-surface`, `.dark .glass-surface`, etc.) into your own global CSS so the project stays Tailwind-free.

### 5.2 Dependencies (no Tailwind)

- **React** (forwardRef, useState, useCallback, useMemo).
- **@radix-ui/react-slot** (optional): used when `asChild={true}` to merge props into the single child. If you prefer not to use Radix, you can render a `<div>` and forward ref/className/style/events to the child manually when `asChild` is true.
- **Class name merge:** The component uses a `cn(glassClass, className)` helper. In this project it’s a small utility; in a project without Tailwind you can use a simple merge, e.g. `[glassClass, className].filter(Boolean).join(' ')` or any `classnames`-style library. No Tailwind classes are applied by the component.

### 5.3 Dark mode in the new project (critical for agents)

- **Who sets the class:** The **application** (or a theme provider) must add or remove the class `dark` on a root element when the user selects dark/light theme. The GlassEffect component **never** sets or reads `dark`; it only applies `glassShine` or `perfumeGlass`.
- **Where to set it:** Prefer `<html class="dark">` or `<html class="">` so the whole page is under one theme root. The glass CSS expects an **ancestor** with class `dark`; it does not look at `data-theme`, `data-mode`, or media queries.
- **Keep the selectors:** In the copied `glass-effect.module.css`, leave `:global(.dark)` as-is so dark mode keeps working. If your app uses a different class (e.g. `theme-dark`), replace every `:global(.dark)` with `:global(.theme-dark)` (or your class name) in that file only; no JS changes needed in the component.
- **No Tailwind:** You do **not** need Tailwind’s dark mode config or `dark:` utilities for the glass effect. Only the presence of the `dark` class on an ancestor matters.

### 5.5 Optional: global glass classes only (no component)

If you only want static glass panels (no React component, no hover):

- Copy the `.glass-surface`, `.glass-surface-light`, `.glass-surface-strong`, and `.glass-panel` rules and their `::before` and `.dark` overrides from this project’s global CSS into your own global CSS file.
- Apply the class to any element, e.g. `<div class="glass-surface">...</div>`.
- Dark mode: use the same contract—when an ancestor has the class `dark`, the `.dark .glass-surface` (etc.) rules will apply. No Tailwind required.

---

## 6. Implementing dark mode without Tailwind (full section)

This section is for projects that **do not use Tailwind** and need to make styles (including the glass effect) adapt to dark mode. Follow it so theme switch, system/browser theme, and persistence all work and the glass effect (and any other dark-aware CSS) stays in sync.

### 6.1 Checklist: details other projects must implement

When converting your app to support dark mode with the glass effect (and any other components that key off the same theme), ensure every item below is in place. Missing any of these can cause dark mode to not apply or to flash incorrectly.

| # | Requirement | Why it matters |
|---|-------------|----------------|
| 1 | **Single class name** | The glass CSS only looks for the class `dark` (via `:global(.dark)`). Do not use `data-theme="dark"`, `data-mode`, or other attributes for the glass effect; they will not be seen. If you already use a different class (e.g. `theme-dark`), replace every `:global(.dark)` in `glass-effect.module.css` with that class. |
| 2 | **Class on an ancestor** | The element that gets the `dark` class must be an **ancestor** of every glass element (and of any other element whose styles depend on theme). Typically that is `<html>`. If you put it on a wrapper that doesn’t contain the glass component, the glass will never see dark mode. |
| 3 | **Exactly one root** | Use one root element for theme (e.g. `<html>`). Add `dark` for dark theme, remove it for light. Do not add a “light” class for light mode; the glass CSS assumes “no .dark” = light. |
| 4 | **Apply in JavaScript** | The class must be added/removed by your app (theme script, React context, etc.). The GlassEffect component does not add or read `dark`; your bootstrap/theme layer must do it. |
| 5 | **Respect user choice and system** | Support (a) explicit user choice from a theme switch: “Light”, “Dark”, or “System”, and (b) when “System” (or no choice), use `prefers-color-scheme: dark`. **System theme and browser theme are the same:** both are exposed via `window.matchMedia("(prefers-color-scheme: dark)")`; do not implement two separate code paths. |
| 6 | **Persist user choice** | Store the user’s choice (e.g. `"light"` / `"dark"` / `"system"`) in `localStorage` (or your backend) so the next visit uses it. On first visit or when “system”, fall back to `prefers-color-scheme`. |
| 7 | **Listen to system changes** | When the effective theme is “system”, subscribe to `matchMedia("(prefers-color-scheme: dark)").addEventListener("change", ...)` and update the `dark` class when the user changes their OS/browser theme. |
| 8 | **Run theme script early (avoid FOUC)** | To prevent a flash of wrong theme, run the code that sets the `dark` class as early as possible—e.g. an inline script in `<head>` that runs before `<body>` is painted, or a small script that runs before your main bundle. Do not wait for React mount or DOMContentLoaded if you can avoid it. |
| 9 | **Other styles use the same class** | Any other CSS in your project that should adapt to dark mode (backgrounds, text, borders) must also key off the same ancestor with class `dark` (e.g. `.dark .my-card { ... }` in global CSS, or `:global(.dark) .myClass` in CSS modules). There is no Tailwind `dark:` here; everything is class-based. |
| 10 | **Do not remove `:global(.dark)` from the glass CSS** | The three dark-mode rule blocks in `glass-effect.module.css` are the only way the glass effect adapts. If you remove them or change the selector, glass will not look correct in dark mode. |

### 6.2 Where and how to apply the class

- **Element:** `document.documentElement` (the `<html>` element). Use `classList.add("dark")` for dark and `classList.remove("dark")` for light. For light mode, do **not** add a class like `light`; the glass CSS does not use it.
- **When:**  
  - On page load: run your theme logic as early as possible (see 6.4).  
  - When the user changes the theme (toggle or dropdown): update the class and persist the choice.  
  - When using “system” and the system preference changes: update the class in the `prefers-color-scheme` listener.

### 6.3 Theme sources: switch button vs system/browser (recap)

- **Theme switch button:** User selects “Light”, “Dark”, or “System”. Store as `"light"` | `"dark"` | `"system"` (e.g. in `localStorage` under key `"theme"`).
- **System / browser theme:** Same thing. Read with `window.matchMedia("(prefers-color-scheme: dark)").matches`. Use when stored value is `"system"` or when the user has never chosen a theme.
- **Effective dark:** Apply `dark` class when (stored === `"dark"`) OR (stored === `"system"` or unset AND `prefers-color-scheme: dark`). Otherwise remove `dark`.

### 6.4 Avoiding flash of wrong theme (FOUC)

- Run the code that sets the `dark` class **before** the first paint. Options:
  - **Inline script in `<head>`:** A blocking `<script>` that reads `localStorage` and `prefers-color-scheme`, then adds or removes `dark` on `document.documentElement`. No `defer` or `async`; place it right after any critical CSS if needed.
  - **Same in a small separate script:** If you prefer not to inline, load a tiny script synchronously that does the same and runs before your main app.
- Do **not** set the theme only inside React’s `useEffect` or after `DOMContentLoaded` without an earlier script; the page may first render in light (or default) and then switch, causing a visible flash.

### 6.5 Vanilla JS: full example (no Tailwind)

Use this pattern in a plain HTML/JS project or as the script you run before React. Supports theme switch (Light/Dark/System), persistence, and system preference changes.

```html
<!-- In <head>, before </head> or before other scripts -->
<script>
(function() {
  var STORAGE_KEY = "theme"; // "light" | "dark" | "system"
  var root = document.documentElement;

  function getStored() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (_) { return null; }
  }
  function setStored(value) {
    try { localStorage.setItem(STORAGE_KEY, value); } catch (_) {}
  }

  function isDark() {
    var stored = getStored();
    if (stored === "dark") return true;
    if (stored === "light") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function apply() {
    if (isDark()) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }

  apply();

  window.setTheme = function(choice) {
    setStored(choice);
    apply();
  };

  window.getTheme = function() {
    var s = getStored();
    return s === "dark" || s === "light" ? s : "system";
  };

  var mq = window.matchMedia("(prefers-color-scheme: dark)");
  if (mq.addEventListener) {
    mq.addEventListener("change", apply);
  } else if (mq.addListener) {
    mq.addListener(apply);
  }
})();
</script>
```

- **Theme switch in HTML:** e.g. buttons that call `setTheme("light")`, `setTheme("dark")`, `setTheme("system")`. Current choice: `getTheme()`.
- **First load:** If the user never chose a theme, `getStored()` is null so `isDark()` uses system preference; apply runs immediately so the first paint has the correct class.

### 6.6 React: full example (no Tailwind)

Use a small theme context and run the same logic on init and when the user or system changes. Run the initial apply as early as possible (e.g. in `index.tsx` before `ReactDOM.createRoot`, or in an inline script in `index.html` as in 6.5).

```tsx
// theme.tsx (or theme.js)
import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "theme";

type ThemeChoice = "light" | "dark" | "system";

function getStored(): ThemeChoice | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === "light" || v === "dark" || v === "system" ? v : null;
  } catch {
    return null;
  }
}

function setStored(value: ThemeChoice) {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {}
}

function getSystemDark(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function shouldBeDark(choice: ThemeChoice | null): boolean {
  if (choice === "dark") return true;
  if (choice === "light") return false;
  return getSystemDark();
}

function applyToDocument(dark: boolean) {
  const root = document.documentElement;
  if (dark) {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

const ThemeContext = createContext<{
  choice: ThemeChoice;
  isDark: boolean;
  setChoice: (c: ThemeChoice) => void;
} | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [choice, setChoiceState] = useState<ThemeChoice>(() => getStored() ?? "system");
  const [isDark, setIsDark] = useState(() => shouldBeDark(choice));

  useEffect(() => {
    const dark = shouldBeDark(choice);
    setIsDark(dark);
    applyToDocument(dark);
  }, [choice]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = () => {
      if (choice === "system") {
        const dark = getSystemDark();
        setIsDark(dark);
        applyToDocument(dark);
      }
    };
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, [choice]);

  const setChoice = (c: ThemeChoice) => {
    setStored(c);
    setChoiceState(c);
  };

  return (
    <ThemeContext.Provider value={{ choice, isDark, setChoice }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
```

- **Initial run before paint:** In your entry HTML, keep an inline script like in 6.5 that runs once with the same logic (read `localStorage` + `prefers-color-scheme`, apply to `document.documentElement`) so the first paint is correct. Then the React provider can take over on subsequent toggles and system changes.
- **UI:** Use `useTheme()` and render buttons for “Light”, “Dark”, “System” that call `setChoice("light")`, `setChoice("dark")`, `setChoice("system")`. Use `choice` to show the current selection and `isDark` if you need a boolean in JS.

### 6.7 Other styles in the project (not just glass)

- The glass effect only reacts to the `dark` class on an ancestor. Any **other** CSS that should look different in dark mode (e.g. page background, text color, cards) must **also** use the same convention: when an ancestor has class `dark`, apply dark styles.
- **Global CSS:** Use a descendant selector, e.g. `.dark .my-page { background: #111; color: #eee; }`. No Tailwind; no `data-theme`. Same `dark` class.
- **CSS modules:** Use `:global(.dark) .myClass { ... }` so the class name stays local but the theme selector is global.
- If you use a different class name for theme (e.g. `theme-dark`), use it consistently everywhere: in the glass module, in global CSS, and in the JS that adds/removes the class.

---

## 7. Quick reference: key CSS values (glass only)

**Shine hover – light**

- Background: `rgba(255, 255, 255, 0.15)`
- Backdrop: `blur(20px) saturate(180%)`
- Shadow: outer `0 8px 32px rgba(0,0,0,0.1)` + inset top edge + soft white glow

**Shine hover – dark**

- Background: `rgba(255, 255, 255, 0.08)`
- Shadow: outer `0 8px 32px rgba(0,0,0,0.5)` + softer inset/glow

**Perfume – light**

- Base: `rgba(200,200,255,0.15)`; hover: `rgba(200,200,255,0.25)`, scale 1.05
- Filter: `hue-rotate(var(--random-hue, 0deg))`; hover: add `saturate(1.3) brightness(1.1)`

**Perfume – dark**

- Base: `rgba(100,100,200,0.2)`; hover: `rgba(100,100,200,0.3)`
- Filter: same hue-rotate; hover: `saturate(1.3) brightness(1.2)`

---

## 8. For other agents: one-paragraph summary

**GlassEffect** is a React wrapper that applies a glass hover look via a CSS module. It does **not** use Tailwind. Dark mode is handled **only in CSS**: when any **ancestor** of the glass element has the class `dark` (e.g. on `<html>`), three rule blocks in `glass-effect.module.css`—`:global(.dark) .glassShine:hover`, `:global(.dark) .perfumeGlass`, and `:global(.dark) .perfumeGlass:hover`—override background, box-shadow, border, and filter so the glass looks correct on dark backgrounds. The component never sets or reads `dark`; the app must add/remove the `dark` class on the root. **Theme sources:** support a theme switch (Light / Dark / System) and system/browser theme (same as system: use `prefers-color-scheme: dark`). To reuse in a non-Tailwind project: copy the component and the CSS module (keep the `:global(.dark)` selectors), then follow **Section 6** to implement dark mode (checklist, vanilla JS or React examples, FOUC prevention, and using the same `dark` class for any other styles that must adapt).
