#!/usr/bin/env node
/**
 * ============================================================
 *  @nbs/component-library → Vanilla Web Components Converter
 *  Run from project root: node convert-to-webcomponents.mjs
 * ============================================================
 *
 * What this script does:
 *  1. Reads every component in StoryBook/ConsumerComponents/components/
 *  2. Reads its CSS module file
 *  3. Generates a vanilla Web Component (.js) that:
 *     - Uses Shadow DOM with scoped styles
 *     - Exposes CSS custom properties (--nbs-*) so tokens still work
 *     - Maps React props → observed attributes
 *     - Dispatches CustomEvents for callbacks (onClick, onChange, etc.)
 *     - Uses <slot> for children
 *  4. Generates a Storybook story (.stories.js) for each component
 *  5. Writes everything to: wc-library/ folder
 *  6. Generates a wc-library/index.js barrel file
 *
 * Requirements: Node 18+, no extra deps needed.
 * ============================================================
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// ─── CONFIG ──────────────────────────────────────────────────
const COMPONENTS_DIR = 'StoryBook/ConsumerComponents/components';
const TOKENS_CSS     = 'StoryBook/ConsumerComponents/styles/tokens.css';
const OUTPUT_DIR     = 'wc-library';
const STORIES_DIR    = `${OUTPUT_DIR}/stories`;

// React prop → Web Component attribute mapping rules
const PROP_TO_ATTR = {
  className: 'class',
  htmlFor:   'for',
  onClick:   'data-onclick',   // becomes CustomEvent
  onChange:  'data-onchange',
  onSubmit:  'data-onsubmit',
  onClose:   'data-onclose',
  onOpen:    'data-onopen',
};

// Props that should become boolean attributes
const BOOLEAN_ATTRS = new Set([
  'disabled', 'loading', 'checked', 'open', 'required',
  'fullwidth', 'rounded', 'multiple', 'readonly',
]);

// Props that are event callbacks (will become CustomEvents)
const EVENT_PROPS = new Set([
  'onClick', 'onChange', 'onSubmit', 'onClose', 'onOpen',
  'onSelect', 'onToggle', 'onInput', 'onFocus', 'onBlur',
]);

// ─── HELPERS ─────────────────────────────────────────────────

function kebab(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function pascal(str) {
  return str.replace(/(^\w|-\w)/g, s => s.replace('-', '').toUpperCase());
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function readFile(p) {
  try { return fs.readFileSync(p, 'utf8'); } catch { return null; }
}

// ─── PARSE REACT COMPONENT ───────────────────────────────────
/**
 * Lightweight static analysis - no AST, regex based.
 * Extracts: props interface, JSX structure hints, CSS module classes.
 */
function parseReactComponent(src, cssModuleSrc) {
  const result = {
    props: [],       // [{ name, type, required, defaultValue }]
    events: [],      // prop names that are event handlers
    cssClasses: [],  // class names from CSS module
    hasChildren: false,
    hasSlots: false,
  };

  // Extract props from interface/type definition
  const interfaceMatch = src.match(/(?:interface|type)\s+\w*Props[^{]*\{([^}]+)\}/s);
  if (interfaceMatch) {
    const body = interfaceMatch[1];
    const lines = body.split('\n').map(l => l.trim()).filter(Boolean);
    for (const line of lines) {
      // e.g. "variant?: 'primary' | 'secondary';"
      const m = line.match(/^(\w+)(\?)?:\s*(.+?);?$/);
      if (!m) continue;
      const [, name, optional, type] = m;
      if (EVENT_PROPS.has(name)) {
        result.events.push(name);
      } else {
        result.props.push({
          name,
          type: type.trim(),
          required: !optional,
          defaultValue: extractDefault(src, name),
        });
      }
    }
  }

  // Detect children usage
  if (src.includes('children') || src.includes('<slot>') || src.includes('{children}')) {
    result.hasChildren = true;
  }

  // Extract CSS module class names
  if (cssModuleSrc) {
    const classMatches = cssModuleSrc.match(/^\.([\w-]+)\s*[{,]/gm) || [];
    result.cssClasses = classMatches.map(m => m.replace(/^\./, '').replace(/[\s{,].*/, ''));
  }

  return result;
}

function extractDefault(src, propName) {
  // Try to find default from destructuring: { variant = 'primary', ...}
  const re = new RegExp(`${propName}\\s*=\\s*(['"\`]?)([^,'"\`\\n)]+)\\1`);
  const m = src.match(re);
  return m ? m[2].trim() : null;
}

// ─── CSS MODULE → SHADOW DOM CSS ─────────────────────────────
/**
 * Converts CSS module syntax to plain CSS usable in shadow DOM.
 * CSS modules use :local() or just class names - we keep them as-is.
 * We also strip composes: directives (not needed in shadow DOM).
 */
function transformCssForShadowDom(cssModuleSrc) {
  if (!cssModuleSrc) return '';
  return cssModuleSrc
    .replace(/composes:[^;]+;/g, '')   // remove composes
    .replace(/:local\(([^)]+)\)/g, '$1') // unwrap :local()
    .trim();
}

// ─── GENERATE WEB COMPONENT ──────────────────────────────────
function generateWebComponent(componentName, info, shadowCss, tokensCss) {
  const tagName = `nbs-${kebab(componentName)}`;
  const className = `Nbs${componentName}`;

  const observedAttrs = [
    ...info.props.map(p => kebab(p.name)),
    ...info.events.map(e => kebab(e).replace('on-', 'on-')),
  ].filter((v, i, a) => a.indexOf(v) === i);

  const attrsArray = JSON.stringify(observedAttrs);

  // Build attribute → getter pairs
  const getters = info.props.map(p => {
    const attr = kebab(p.name);
    if (BOOLEAN_ATTRS.has(attr)) {
      return `  get ${p.name}() { return this.hasAttribute('${attr}'); }
  set ${p.name}(v) { v ? this.setAttribute('${attr}', '') : this.removeAttribute('${attr}'); }`;
    }
    const def = p.defaultValue ? ` || '${p.defaultValue}'` : '';
    return `  get ${p.name}() { return this.getAttribute('${attr}')${def}; }
  set ${p.name}(v) { this.setAttribute('${attr}', v); }`;
  }).join('\n\n');

  // Build render method - generates inner HTML based on component type
  const renderBody = buildRenderBody(componentName, info, tagName);

  // Build event wiring
  const eventWiring = info.events.map(e => {
    const evtName = kebab(e).replace('on-', '');
    return `    this._bindEvent('${evtName}');`;
  }).join('\n');

  return `/**
 * <${tagName}> – Auto-generated Web Component
 * Converted from: ${componentName}.tsx
 * 
 * Attributes:
${observedAttrs.map(a => ` *   ${a}`).join('\n')}
 *
 * Events dispatched:
${info.events.map(e => ` *   ${kebab(e).replace('on-', '')} (CustomEvent)`).join('\n') || ' *   none'}
 *
 * CSS Custom Properties:
 *   All --nbs-* tokens from tokens.css are available and pierce the shadow boundary.
 *
 * Usage:
 *   <${tagName} ${info.props[0] ? `${kebab(info.props[0].name)}="${info.props[0].defaultValue || 'value'}"` : ''}>
 *     Content here
 *   </${tagName}>
 */

const ${className}Template = document.createElement('template');
${className}Template.innerHTML = \`
  <style>
    /* ── Design Tokens (inlined so shadow DOM has access to all --nbs-* vars) ── */
    ${tokensCss.replace(/`/g, '\\`').replace(/\\/g, '\\\\').replace(/\$\{/g, '\\${')}

    /* ── Host defaults ── */
    :host {
      display: inline-block;
      box-sizing: border-box;
    }
    *, *::before, *::after { box-sizing: border-box; }

    /* ── Component styles (from CSS module) ── */
${shadowCss.split('\n').map(l => '    ' + l).join('\n')}
  </style>
  ${renderBody.template}
\`;

export class ${className} extends HTMLElement {
  static get observedAttributes() {
    return ${attrsArray};
  }

${getters}

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(${className}Template.content.cloneNode(true));
  }

  connectedCallback() {
    this._upgradeProperties();
    this._render();
${eventWiring}
  }

  disconnectedCallback() {
    this._cleanup();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal !== newVal) {
      this._render();
    }
  }

  _render() {
${renderBody.renderFn}
  }

  _bindEvent(eventName) {
    const el = this.shadowRoot.querySelector(\`[data-event="\${eventName}"]\`);
    if (!el) return;
    el.addEventListener(eventName, (e) => {
      this.dispatchEvent(new CustomEvent(eventName, {
        bubbles: true,
        composed: true,
        detail: { originalEvent: e, value: el.value ?? null }
      }));
    });
  }

  _upgradeProperties() {
    // Reflect pre-upgrade properties set as JS props
    ${observedAttrs.map(a => {
      const prop = a.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      return `if (this.hasOwnProperty('${prop}')) {
      const val = this['${prop}'];
      delete this['${prop}'];
      this['${prop}'] = val;
    }`;
    }).join('\n    ')}
  }

  _cleanup() {
    // Remove event listeners if needed
  }
}

customElements.define('${tagName}', ${className});
export default ${className};
`;
}

// ─── BUILD RENDER BODY PER COMPONENT TYPE ────────────────────
function buildRenderBody(name, info, tagName) {
  const lower = name.toLowerCase();

  // Button
  if (lower === 'button') {
    return {
      template: `<button part="button" class="btn" data-event="click">
    <span class="spinner" aria-hidden="true"></span>
    <slot></slot>
  </button>`,
      renderFn: `    const btn = this.shadowRoot.querySelector('button');
    if (!btn) return;
    
    const variant = this.getAttribute('variant') || 'primary';
    const size = this.getAttribute('size') || 'medium';
    const loading = this.hasAttribute('loading');
    const disabled = this.hasAttribute('disabled');
    const rounded = this.hasAttribute('rounded');
    const fullwidth = this.hasAttribute('fullwidth');

    btn.className = [
      'btn',
      \`btn--\${variant}\`,
      \`btn--\${size}\`,
      loading ? 'loading' : '',
      rounded ? 'btn--rounded' : '',
      fullwidth ? 'btn--full-width' : '',
    ].filter(Boolean).join(' ');

    btn.disabled = disabled || loading;
    btn.setAttribute('aria-busy', loading ? 'true' : 'false');

    const href = this.getAttribute('href');
    if (href) {
      btn.setAttribute('data-href', href);
      btn.addEventListener('click', () => window.location.href = href, { once: true });
    }`
    };
  }

  // Badge
  if (lower === 'badge') {
    return {
      template: `<span part="badge" class="badge"><slot></slot></span>`,
      renderFn: `    const el = this.shadowRoot.querySelector('.badge');
    if (!el) return;
    const variant = this.getAttribute('variant') || 'primary';
    const size = this.getAttribute('size') || 'medium';
    el.className = ['badge', \`badge--\${variant}\`, \`badge--\${size}\`].join(' ');`
    };
  }

  // Alert
  if (lower === 'alert') {
    return {
      template: `<div part="alert" role="alert" class="alert">
    <span class="alert__icon" aria-hidden="true"></span>
    <div class="alert__content"><slot></slot></div>
    <button class="alert__close" aria-label="Close" data-event="close">×</button>
  </div>`,
      renderFn: `    const el = this.shadowRoot.querySelector('.alert');
    if (!el) return;
    const variant = this.getAttribute('variant') || 'info';
    el.className = ['alert', \`alert--\${variant}\`].join(' ');
    const dismissible = this.hasAttribute('dismissible');
    const closeBtn = this.shadowRoot.querySelector('.alert__close');
    if (closeBtn) closeBtn.style.display = dismissible ? '' : 'none';`
    };
  }

  // Input / Textarea
  if (lower === 'input' || lower === 'textarea') {
    const tag = lower === 'textarea' ? 'textarea' : 'input';
    return {
      template: `<div class="input-wrapper">
    <label part="label" class="input__label"><slot name="label"></slot></label>
    <${tag} part="input" class="input" data-event="input"></${tag}>
    <span class="input__helper"><slot name="helper"></slot></span>
  </div>`,
      renderFn: `    const input = this.shadowRoot.querySelector('${tag}');
    if (!input) return;
    const size = this.getAttribute('size') || 'medium';
    const variant = this.getAttribute('variant') || 'default';
    const error = this.hasAttribute('error');
    input.className = ['input', \`input--\${size}\`, error ? 'input--error' : ''].filter(Boolean).join(' ');
    input.placeholder = this.getAttribute('placeholder') || '';
    input.value = this.getAttribute('value') || '';
    input.disabled = this.hasAttribute('disabled');
    input.required = this.hasAttribute('required');
    input.type = this.getAttribute('type') || 'text';`
    };
  }

  // Checkbox / Radio / Switch - form controls
  if (['checkbox', 'radio', 'switch'].includes(lower)) {
    const inputType = lower === 'switch' ? 'checkbox' : lower;
    return {
      template: `<label class="${lower}-wrapper" part="${lower}">
    <input type="${inputType}" class="${lower}__input" data-event="change">
    <span class="${lower}__control" aria-hidden="true"></span>
    <span class="${lower}__label"><slot></slot></span>
  </label>`,
      renderFn: `    const input = this.shadowRoot.querySelector('input');
    if (!input) return;
    input.checked = this.hasAttribute('checked');
    input.disabled = this.hasAttribute('disabled');
    input.name = this.getAttribute('name') || '';
    input.value = this.getAttribute('value') || '';`
    };
  }

  // Select / Combobox
  if (lower === 'select' || lower === 'combobox') {
    return {
      template: `<div class="select-wrapper" part="select">
    <select class="select" data-event="change"><slot></slot></select>
    <span class="select__arrow" aria-hidden="true">▾</span>
  </div>`,
      renderFn: `    const select = this.shadowRoot.querySelector('select');
    if (!select) return;
    const size = this.getAttribute('size') || 'medium';
    select.className = ['select', \`select--\${size}\`].join(' ');
    select.disabled = this.hasAttribute('disabled');
    select.multiple = this.hasAttribute('multiple');`
    };
  }

  // Progress
  if (lower === 'progress') {
    return {
      template: `<div class="progress" part="progress" role="progressbar">
    <div class="progress__bar"></div>
  </div>`,
      renderFn: `    const bar = this.shadowRoot.querySelector('.progress__bar');
    const wrap = this.shadowRoot.querySelector('.progress');
    if (!bar || !wrap) return;
    const value = parseFloat(this.getAttribute('value') || '0');
    const max = parseFloat(this.getAttribute('max') || '100');
    const pct = Math.min(100, Math.max(0, (value / max) * 100));
    bar.style.width = \`\${pct}%\`;
    wrap.setAttribute('aria-valuenow', value);
    wrap.setAttribute('aria-valuemax', max);
    const variant = this.getAttribute('variant') || 'primary';
    bar.className = ['progress__bar', \`progress__bar--\${variant}\`].join(' ');`
    };
  }

  // Spinner / Skeleton
  if (lower === 'spinner') {
    return {
      template: `<span class="spinner" part="spinner" role="status" aria-label="Loading"></span>`,
      renderFn: `    const el = this.shadowRoot.querySelector('.spinner');
    if (!el) return;
    const size = this.getAttribute('size') || 'medium';
    el.className = ['spinner', \`spinner--\${size}\`].join(' ');`
    };
  }

  if (lower === 'skeleton') {
    return {
      template: `<div class="skeleton" part="skeleton" aria-hidden="true"></div>`,
      renderFn: `    const el = this.shadowRoot.querySelector('.skeleton');
    if (!el) return;
    const w = this.getAttribute('width');
    const h = this.getAttribute('height');
    if (w) el.style.width = w;
    if (h) el.style.height = h;`
    };
  }

  // Avatar
  if (lower === 'avatar') {
    return {
      template: `<div class="avatar" part="avatar">
    <img class="avatar__img" alt="" style="display:none">
    <span class="avatar__fallback"><slot></slot></span>
  </div>`,
      renderFn: `    const img = this.shadowRoot.querySelector('.avatar__img');
    const el = this.shadowRoot.querySelector('.avatar');
    if (!el) return;
    const size = this.getAttribute('size') || 'medium';
    const src = this.getAttribute('src');
    el.className = ['avatar', \`avatar--\${size}\`].join(' ');
    if (src && img) {
      img.src = src;
      img.alt = this.getAttribute('alt') || '';
      img.style.display = '';
    }`
    };
  }

  // Accordion
  if (lower === 'accordion') {
    return {
      template: `<div class="accordion" part="accordion">
    <button class="accordion__trigger" data-event="click" aria-expanded="false">
      <slot name="title">Item</slot>
      <span class="accordion__icon" aria-hidden="true">▾</span>
    </button>
    <div class="accordion__content" hidden>
      <slot></slot>
    </div>
  </div>`,
      renderFn: `    const trigger = this.shadowRoot.querySelector('.accordion__trigger');
    const content = this.shadowRoot.querySelector('.accordion__content');
    if (!trigger || !content) return;
    const open = this.hasAttribute('open');
    trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    content.hidden = !open;
    trigger.onclick = () => {
      const isOpen = this.hasAttribute('open');
      isOpen ? this.removeAttribute('open') : this.setAttribute('open', '');
      this.dispatchEvent(new CustomEvent('toggle', { bubbles: true, composed: true, detail: { open: !isOpen } }));
    };`
    };
  }

  // Tabs
  if (lower === 'tabs') {
    return {
      template: `<div class="tabs" part="tabs">
    <div class="tabs__list" role="tablist"><slot name="tabs"></slot></div>
    <div class="tabs__panels"><slot></slot></div>
  </div>`,
      renderFn: `    const el = this.shadowRoot.querySelector('.tabs');
    if (!el) return;
    const variant = this.getAttribute('variant') || 'default';
    el.className = ['tabs', \`tabs--\${variant}\`].join(' ');`
    };
  }

  // Modal / Dialog
  if (lower === 'modal' || lower === 'dialog') {
    return {
      template: `<dialog class="modal" part="modal">
    <div class="modal__header">
      <slot name="title"></slot>
      <button class="modal__close" aria-label="Close" data-event="close">×</button>
    </div>
    <div class="modal__body"><slot></slot></div>
    <div class="modal__footer"><slot name="footer"></slot></div>
  </dialog>`,
      renderFn: `    const dialog = this.shadowRoot.querySelector('dialog');
    if (!dialog) return;
    const open = this.hasAttribute('open');
    const size = this.getAttribute('size') || 'medium';
    dialog.className = ['modal', \`modal--\${size}\`].join(' ');
    if (open) dialog.showModal(); else dialog.close();
    dialog.querySelector('.modal__close').onclick = () => {
      this.removeAttribute('open');
      this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
    };`
    };
  }

  // Tooltip
  if (lower === 'tooltip') {
    return {
      template: `<span class="tooltip-wrapper" part="tooltip">
    <slot></slot>
    <span class="tooltip__content" role="tooltip"></span>
  </span>`,
      renderFn: `    const tip = this.shadowRoot.querySelector('.tooltip__content');
    const wrap = this.shadowRoot.querySelector('.tooltip-wrapper');
    if (!tip || !wrap) return;
    tip.textContent = this.getAttribute('content') || '';
    const pos = this.getAttribute('position') || 'top';
    wrap.className = ['tooltip-wrapper', \`tooltip--\${pos}\`].join(' ');`
    };
  }

  // Separator
  if (lower === 'separator') {
    return {
      template: `<hr class="separator" part="separator">`,
      renderFn: `    const el = this.shadowRoot.querySelector('.separator');
    if (!el) return;
    const orientation = this.getAttribute('orientation') || 'horizontal';
    el.className = ['separator', \`separator--\${orientation}\`].join(' ');`
    };
  }

  // Card
  if (lower === 'card') {
    return {
      template: `<div class="card" part="card">
    <div class="card__header"><slot name="header"></slot></div>
    <div class="card__body"><slot></slot></div>
    <div class="card__footer"><slot name="footer"></slot></div>
  </div>`,
      renderFn: `    const el = this.shadowRoot.querySelector('.card');
    if (!el) return;
    const variant = this.getAttribute('variant') || 'default';
    const shadow = this.getAttribute('shadow') || 'sm';
    el.className = ['card', \`card--\${variant}\`, \`card--shadow-\${shadow}\`].join(' ');`
    };
  }

  // Default / generic fallback
  return {
    template: `<div class="${kebab(name)}" part="${kebab(name)}"><slot></slot></div>`,
    renderFn: `    const el = this.shadowRoot.querySelector('.${kebab(name)}');
    if (!el) return;
    const variant = this.getAttribute('variant');
    if (variant) el.className = ['${kebab(name)}', \`${kebab(name)}--\${variant}\`].join(' ');`
  };
}

// ─── GENERATE STORY FILE ─────────────────────────────────────
function generateStory(componentName, info) {
  const tagName = `nbs-${kebab(componentName)}`;
  const title = `Web Components/${componentName}`;

  const argTypes = info.props.map(p => {
    let control = '{ type: \'text\' }';
    if (p.type.includes('boolean') || BOOLEAN_ATTRS.has(kebab(p.name))) control = '{ type: \'boolean\' }';
    else if (p.type.includes('number')) control = '{ type: \'number\' }';
    else if (p.type.includes('|')) {
      const opts = p.type.match(/'([^']+)'/g)?.map(o => o.replace(/'/g, '')) || [];
      if (opts.length) control = `{ type: 'select', options: ${JSON.stringify(opts)} }`;
    }
    return `    ${p.name}: { control: ${control}${p.defaultValue ? `, defaultValue: '${p.defaultValue}'` : ''} }`;
  }).join(',\n');

  const defaultArgs = info.props
    .filter(p => p.defaultValue)
    .map(p => `    ${p.name}: '${p.defaultValue}'`)
    .join(',\n');

  return `/**
 * ${componentName} – Web Component Story
 * Auto-generated by convert-to-webcomponents.mjs
 */

import '../components/${componentName}.js';

export default {
  title: '${title}',
  tags: ['autodocs'],
  render: (args) => {
    const el = document.createElement('${tagName}');
    Object.entries(args).forEach(([key, val]) => {
      if (typeof val === 'boolean') {
        val ? el.setAttribute(key.toLowerCase(), '') : el.removeAttribute(key.toLowerCase());
      } else {
        el.setAttribute(key.toLowerCase(), val);
      }
    });
    el.textContent = args.label || '${componentName}';
    return el;
  },
  argTypes: {
${argTypes}
  },
  args: {
${defaultArgs}
  }
};

export const Default = {};

${info.props
  .filter(p => p.type.includes('|'))
  .slice(0, 1)
  .map(p => {
    const opts = p.type.match(/'([^']+)'/g)?.map(o => o.replace(/'/g, '')) || [];
    return opts.map(opt => `
export const ${pascal(opt)} = {
  args: { ${p.name}: '${opt}' }
};`).join('\n');
  }).join('\n')}
`;
}

// ─── MAIN CONVERSION RUNNER ───────────────────────────────────
async function main() {
  console.log('\n🚀 NBS Component Library → Web Components Converter');
  console.log('====================================================\n');

  // Validate project root
  if (!fs.existsSync(COMPONENTS_DIR)) {
    console.error(`❌ Cannot find components dir: ${COMPONENTS_DIR}`);
    console.error('   Make sure you run this script from the project root.');
    process.exit(1);
  }

  // Setup output dirs
  ensureDir(OUTPUT_DIR);
  ensureDir(`${OUTPUT_DIR}/components`);
  ensureDir(`${OUTPUT_DIR}/styles`);
  ensureDir(STORIES_DIR);

  // Copy tokens.css into output
  const tokensCss = readFile(TOKENS_CSS) || '';
  fs.writeFileSync(`${OUTPUT_DIR}/styles/tokens.css`, tokensCss);
  console.log('✅ Copied tokens.css');

  // Write a global.css that imports tokens
  fs.writeFileSync(`${OUTPUT_DIR}/styles/global.css`, `@import './tokens.css';\n\n* { box-sizing: border-box; }\nbody { font-family: var(--nbs-font, system-ui, sans-serif); }\n`);

  // Discover component directories
  const componentDirs = fs.readdirSync(COMPONENTS_DIR).filter(name => {
    const p = path.join(COMPONENTS_DIR, name);
    return fs.statSync(p).isDirectory() && !name.startsWith('_');
  });

  console.log(`\n📦 Found ${componentDirs.length} components to convert:\n`);

  const index = [];
  const results = { success: [], skipped: [], errors: [] };

  for (const compName of componentDirs) {
    const compDir = path.join(COMPONENTS_DIR, compName);
    process.stdout.write(`  Converting ${compName}... `);

    try {
      // Find main component file
      const files = fs.readdirSync(compDir);
      const tsxFile = files.find(f => f === `${compName}.tsx`) ||
                      files.find(f => f.endsWith('.tsx') && !f.includes('.test') && !f.includes('.stories'));
      
      if (!tsxFile) {
        console.log('⚠️  skipped (no .tsx file found)');
        results.skipped.push(compName);
        continue;
      }

      const tsxSrc = readFile(path.join(compDir, tsxFile)) || '';

      // Find CSS module
      const cssFile = files.find(f => f.endsWith('.module.css')) ||
                      files.find(f => f.endsWith('.css'));
      const cssSrc = cssFile ? readFile(path.join(compDir, cssFile)) : null;

      // Parse
      const info = parseReactComponent(tsxSrc, cssSrc);
      const shadowCss = transformCssForShadowDom(cssSrc || '');

      // Generate Web Component
      const wcCode = generateWebComponent(compName, info, shadowCss, tokensCss);
      const wcPath = `${OUTPUT_DIR}/components/${compName}.js`;
      fs.writeFileSync(wcPath, wcCode);

      // Generate Story
      const storyCode = generateStory(compName, info);
      fs.writeFileSync(`${STORIES_DIR}/${compName}.stories.js`, storyCode);

      // Track for index
      index.push({ name: compName, tag: `nbs-${kebab(compName)}`, className: `Nbs${compName}` });

      console.log('✅');
      results.success.push(compName);

    } catch (err) {
      console.log(`❌ ERROR: ${err.message}`);
      results.errors.push({ name: compName, error: err.message });
    }
  }

  // ── Write index.js barrel ──
  const indexContent = `/**
 * @nbs/web-component-library
 * Auto-generated barrel file — import this to register all components
 *
 * Usage:
 *   import '@nbs/web-component-library';
 *   // Now use <nbs-button>, <nbs-card>, etc. in any HTML/framework
 */

${index.map(c => `export { ${c.className} } from './components/${c.name}.js';`).join('\n')}

// Auto-register all components
${index.map(c => `import './components/${c.name}.js';`).join('\n')}
`;

  fs.writeFileSync(`${OUTPUT_DIR}/index.js`, indexContent);

  // ── Write README ──
  const readme = `# @nbs/web-component-library

Auto-generated vanilla Web Components from the NBS React component library.

## Usage

\`\`\`html
<!-- Option 1: Script tag (registers all components) -->
<script type="module" src="./index.js"></script>

<!-- Option 2: Import only what you need -->
<script type="module">
  import './components/Button.js';
</script>
\`\`\`

## Styling

Link tokens before your components:
\`\`\`html
<link rel="stylesheet" href="./styles/tokens.css">
\`\`\`

All components accept \`--nbs-*\` CSS custom properties which pierce the Shadow DOM boundary.

## Components

| Tag | Class | Description |
|-----|-------|-------------|
${index.map(c => `| \`<${c.tag}>\` | \`${c.className}\` | Converted from ${c.name}.tsx |`).join('\n')}

## Theming

\`\`\`html
<!-- Light (default) -->
<body data-nbs-theme="light">

<!-- Dark -->
<body data-nbs-theme="dark">
\`\`\`

## Generated by
\`node convert-to-webcomponents.mjs\` — ${new Date().toISOString()}
`;

  fs.writeFileSync(`${OUTPUT_DIR}/README.md`, readme);

  // ── Write Storybook config for WC stories ──
  const sbMain = `import { defineConfig } from '@storybook/web-components-vite';

export default defineConfig({
  stories: ['../stories/**/*.stories.@(js|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
});
`;

  ensureDir(`${OUTPUT_DIR}/.storybook`);
  fs.writeFileSync(`${OUTPUT_DIR}/.storybook/main.js`, sbMain);
  fs.writeFileSync(`${OUTPUT_DIR}/.storybook/preview.js`, `import '../styles/tokens.css';\nimport '../styles/global.css';\n\nexport const decorators = [\n  (Story) => {\n    document.documentElement.setAttribute('data-nbs-theme', 'light');\n    return Story();\n  }\n];\n\nexport const parameters = {\n  layout: 'centered',\n  backgrounds: {\n    default: 'light',\n    values: [\n      { name: 'light', value: '#ffffff' },\n      { name: 'dark', value: '#0f172a' },\n    ],\n  },\n};\n`);

  // ── Summary ──
  console.log('\n====================================================');
  console.log('📊 CONVERSION SUMMARY');
  console.log('====================================================');
  console.log(`✅ Converted:  ${results.success.length} components`);
  console.log(`⚠️  Skipped:   ${results.skipped.length} components`);
  console.log(`❌ Errors:     ${results.errors.length} components`);

  if (results.skipped.length) {
    console.log(`\n⚠️  Skipped: ${results.skipped.join(', ')}`);
  }
  if (results.errors.length) {
    console.log('\n❌ Errors:');
    results.errors.forEach(e => console.log(`   ${e.name}: ${e.error}`));
  }

  console.log('\n📁 Output written to: ./' + OUTPUT_DIR + '/');
  console.log('   ├── components/        ← Web Component .js files');
  console.log('   ├── stories/           ← Storybook story files');
  console.log('   ├── styles/            ← tokens.css + global.css');
  console.log('   ├── .storybook/        ← Storybook WC config');
  console.log('   ├── index.js           ← Barrel (import all)');
  console.log('   └── README.md          ← Usage docs');

  console.log('\n🚀 NEXT STEPS:');
  console.log('   1. cd wc-library');
  console.log('   2. npm install @storybook/web-components-vite @storybook/addon-essentials @storybook/addon-a11y');
  console.log('   3. npx storybook dev -p 6007 -c .storybook');
  console.log('   4. In any project: <script type="module" src="path/to/wc-library/index.js"></script>');
  console.log('\n✨ Done!\n');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
