# Blue Links Alumni Portal - Lit JS Implementation Guide

## Project Setup

### Framework: Lit JS (Web Components)
**What is Lit?**
- Lightweight web components framework (~5kb)
- Template literals with `html` and `css` tagged templates
- Reactive properties with `@property()` and `@state()` decorators
- Scoped CSS (encapsulated styling per component)
- No virtual DOM - direct DOM updates
- Works with vanilla HTML/CSS/JS

### Project Structure
```
src/
├── components/
│   ├── layout/
│   │   └── bottom-tab-bar.ts
│   ├── pages/
│   │   ├── welcome-page.ts
│   │   ├── login-page.ts
│   │   └── signup-page.ts
│   ├── common/
│   │   ├── button.ts
│   │   ├── input.ts
│   │   ├── badge.ts
│   │   └── card.ts
│   └── modals/
│       └── filter-modal.ts
├── styles/
│   └── design-system.css      (CSS variables)
├── utils/
│   ├── router.ts
│   └── validation.ts
├── app.ts                     (main app component)
└── index.html
```

---

## Design System (CSS Variables)

Create file: `src/styles/design-system.css`

```css
:root {
  /* Colors */
  --color-navy: #003D7A;
  --color-navy-light: #1e5a96;
  --color-navy-dark: #001f47;
  --color-gold: #D4A574;
  --color-coral: #E8A87C;
  --color-white: #FFFFFF;
  --color-gray-50: #F9FAFB;
  --color-gray-100: #F3F4F6;
  --color-gray-200: #E5E7EB;
  --color-gray-300: #D1D5DB;
  --color-gray-500: #6B7280;
  --color-gray-600: #4B5563;
  --color-gray-700: #374151;
  --color-error: #EF4444;
  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-info: #3B82F6;

  /* Typography */
  --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  --font-family-serif: Georgia, 'Times New Roman', serif;
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 24px;
  --font-size-2xl: 28px;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;
  --line-height: 1.6;

  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 12px;
  --space-lg: 16px;
  --space-xl: 20px;
  --space-2xl: 24px;
  --space-3xl: 32px;
  --space-4xl: 40px;

  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 24px;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-above: 0 -2px 8px rgba(0, 0, 0, 0.15);

  /* Z-index */
  --z-base: 1;
  --z-dropdown: 10;
  --z-modal: 50;
  --z-toast: 100;
}
```

Import this in `index.html`:
```html
<link rel="stylesheet" href="src/styles/design-system.css">
```

---

## Lit Component Boilerplate

Every Lit component follows this pattern:

```typescript
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('blue-component-name')
export class ComponentName extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    
    /* Scoped styles here */
  `;

  @property() someProp = 'default';
  @state() someState = 'initial';

  render() {
    return html`
      <div>Content here</div>
    `;
  }

  private handleClick() {
    // Click handler
  }
}
```

**Key points:**
- `@customElement('tag-name')` registers the web component
- `@property()` = reactive prop (updates trigger render)
- `@state()` = private reactive state
- `static styles = css\`...\`` = scoped CSS
- `render()` returns `html\`...\`` template literal
- Event handlers: `@click=${this.handleClick}`

---

## Dependencies Required

Add to `package.json`:
```json
{
  "dependencies": {
    "lit": "^3.0.0"
  },
  "devDependencies": {
    "@lit/reactive-element": "^2.0.0",
    "typescript": "^5.0.0",
    "vite": "^5.0.0"
  }
}
```

Run: `npm install`

---

## Routing Setup (Simple)

Create file: `src/utils/router.ts`

```typescript
export type PageType = 'welcome' | 'login' | 'signup' | 'home' | 'jobs' | 'profile';

export class Router {
  private currentPage: PageType = 'welcome';

  navigate(page: PageType) {
    this.currentPage = page;
    window.dispatchEvent(new CustomEvent('route-change', { detail: { page } }));
  }

  getCurrentPage(): PageType {
    return this.currentPage;
  }
}

export const router = new Router();
```

**Usage in app:**
```typescript
router.navigate('login');
```

---

## State Management (Simple Store)

Create file: `src/utils/store.ts`

```typescript
// Simple event-based store
export class Store extends EventTarget {
  private state = {
    isLoggedIn: false,
    user: null,
    notifications: 0,
  };

  setState(updates: Partial<typeof this.state>) {
    this.state = { ...this.state, ...updates };
    this.dispatchEvent(new Event('change'));
  }

  getState() {
    return this.state;
  }
}

export const store = new Store();
```

**Usage in component:**
```typescript
connectedCallback() {
  super.connectedCallback();
  store.addEventListener('change', () => this.requestUpdate());
}

get state() {
  return store.getState();
}
```

---

## File Naming Convention

- **Components:** kebab-case with `.ts` extension
  - `bottom-tab-bar.ts`
  - `welcome-page.ts`
  - `form-input.ts`

- **Custom element tag names:** kebab-case
  - `<blue-bottom-tab-bar>`
  - `<blue-welcome-page>`
  - `<blue-form-input>`

---

## Icons Strategy

**Option 1: Inline SVG Icons** (recommended for Lit)
```typescript
const userIcon = html`
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
`;
```

**Option 2: Icon library** (feather-icons, heroicons, etc.)
```bash
npm install feather-icons
```

Then import and use SVG strings.

---

## Build & Dev Setup

### Vite Config (vite.config.ts)
```typescript
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5173,
    open: true,
  },
});
```

### index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blue Links - Alumni Portal</title>
  <link rel="stylesheet" href="/src/styles/design-system.css">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: var(--font-family);
      background: var(--color-gray-50);
      color: var(--color-gray-700);
    }
    html, body { height: 100%; }
  </style>
</head>
<body>
  <blue-app></blue-app>
  <script type="module" src="/src/app.ts"></script>
</body>
</html>
```

### package.json scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

---

## Component Template

All new components follow this structure:

```typescript
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('blue-component-name')
export class ComponentName extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .container {
      padding: var(--space-lg);
    }

    .title {
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-bold);
      color: var(--color-navy);
    }
  `;

  @property() someProp?: string;
  @state() private someState = false;

  connectedCallback() {
    super.connectedCallback();
    // Setup listeners, subscriptions
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // Cleanup
  }

  render() {
    return html`
      <div class="container">
        <h1 class="title">Component</h1>
      </div>
    `;
  }

  private handleEvent() {
    this.someState = !this.someState;
  }
}
```

---

## Type Safety

All components are **TypeScript** for type safety:
```typescript
@property({ type: String }) title = '';
@property({ type: Number }) count: number = 0;
@property({ type: Boolean }) disabled = false;
```

---

## Testing & Performance Notes

**Lit advantages:**
- Smaller bundle size (~5kb vs React 40kb+)
- Native web components = better encapsulation
- No virtual DOM overhead
- Can be used with vanilla JS

**For this project:**
- Simple validation (no Jest needed for MVP)
- Browser DevTools for debugging
- Web component inspection built-in

---

## Module Implementation Order

1. **MODULE 1:** Bottom Tab Bar (`blue-bottom-tab-bar.ts`)
2. **MODULE 2:** Auth Pages (Welcome, Login, Signup)
3. **MODULE 3:** Core Components (Button, Input, Badge, Card)
4. **MODULE 4:** Home Dashboard
5. **MODULE 5:** Job Board & Applications
6. **MODULE 6:** Filter Modal
7. **MODULE 7:** Profile Page

Each module will be a separate Copilot prompt.

---

## Ready to Start?

Once you understand this setup, I'll create:
- ✅ `01-MODULE-BottomTabBar-Copilot.md` (Lit JS version)
- ✅ `02-MODULE-Auth-Pages-Copilot.md` (Lit JS version)
- ✅ `03-MODULE-CoreComponents-Copilot.md` (Buttons, Inputs, Badges, Cards)
- And more...

All tailored for **Lit JS web components with scoped CSS** instead of React/TailwindCSS.

Let me know when you're ready for MODULE 1! 🚀
