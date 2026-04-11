# MODULE 1: Bottom Tab Navigation - Lit JS Copilot Prompt

## Component: blue-bottom-tab-bar.ts

Create a persistent bottom navigation web component for the Blue Links alumni portal using Lit JS.

---

## File Location & Registration

**File:** `src/components/layout/bottom-tab-bar.ts`

**Custom Element Tag:** `<blue-bottom-tab-bar>`

---

## Component Specification

### Properties (Input)

```typescript
@property({ type: String }) activeTab: 'jobs' | 'network' | 'home' | 'notifications' | 'profile' = 'home';
@property({ type: Number }) notificationCount: number = 0;
```

### Events (Output)

The component should dispatch a custom event when a tab is clicked:

```typescript
// Dispatch on tab click
this.dispatchEvent(new CustomEvent('tab-change', {
  detail: { tab: 'jobs' }, // or 'network', 'home', 'notifications', 'profile'
  bubbles: true,
  composed: true
}));
```

**Parent component listens:**
```typescript
onTabChange(event: CustomEvent) {
  const { tab } = event.detail;
  this.activeTab = tab;
}
```

---

## Design Specifications

### Visual Layout

- **Position:** Fixed at bottom of viewport
- **Width:** 100% (full screen width)
- **Height:** 80px (including safe area for home indicator)
- **Background:** Dark navy (`var(--color-navy)` = #003D7A)
- **Border Radius:** Top corners only, 24px
- **Shadow:** Above the bar (0 -2px 8px rgba(0,0,0,0.15))
- **Safe Area:** Bottom padding for notch/home indicator devices

### Tab Structure (5 tabs, left to right)

1. **Jobs** - briefcase icon
2. **Network** - people/users icon
3. **Home** - house icon (center, emphasized)
4. **Notifications** - bell icon (with red badge if notificationCount > 0)
5. **Profile** - user/person icon

### Tab Styling

**Active Tab (currently selected):**
- Icon: White, 100% opacity, 24px size
- Label: White text, 12px, bold
- Background: None (maintains navy)
- Visual indicator: Subtle (maybe slightly lighter/brighter)

**Inactive Tab:**
- Icon: White, 60% opacity, 24px size
- Label: Hidden (not displayed)
- Background: None

**Notification Badge:**
- Size: 6px diameter circle
- Color: Red (#EF4444)
- Position: Top-right corner of bell icon
- Only visible when `notificationCount > 0`

---

## Icon SVG Definitions

Define these as inline SVG constants at the top of the component file:

```typescript
const ICONS = {
  jobs: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"></path>
  </svg>`,
  
  network: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>`,
  
  home: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>`,
  
  notifications: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>`,
  
  profile: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>`
};
```

---

## Scoped CSS

The component CSS should be scoped within the component:

```css
:host {
  display: block;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 50;
  --safe-area-bottom: 0;
}

.container {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 80px;
  padding: 0 0 var(--safe-area-bottom) 0;
  background-color: var(--color-navy);
  border-radius: var(--radius-full) var(--radius-full) 0 0;
  box-shadow: var(--shadow-above);
  padding-bottom: max(16px, env(safe-area-inset-bottom));
}

.tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 60px;
  height: 64px;
  border: none;
  background: none;
  color: white;
  cursor: pointer;
  position: relative;
  opacity: 0.6;
  transition: opacity 0.2s ease;
}

.tab:active {
  opacity: 0.8;
}

.tab.active {
  opacity: 1;
}

.tab-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;
}

.tab-label {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  color: white;
  display: none;
}

.tab.active .tab-label {
  display: block;
}

.notification-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--color-error);
}
```

---

## Complete Component Template

```typescript
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type TabName = 'jobs' | 'network' | 'home' | 'notifications' | 'profile';

const ICONS = {
  jobs: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"></path>
  </svg>`,
  
  network: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>`,
  
  home: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>`,
  
  notifications: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>`,
  
  profile: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>`
};

const TAB_LABELS: Record<TabName, string> = {
  jobs: 'Jobs',
  network: 'Network',
  home: 'Home',
  notifications: 'Notifications',
  profile: 'Profile'
};

@customElement('blue-bottom-tab-bar')
export class BottomTabBar extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 50;
    }

    .container {
      display: flex;
      align-items: flex-end;
      justify-content: space-around;
      height: 80px;
      background-color: var(--color-navy);
      border-radius: var(--radius-full) var(--radius-full) 0 0;
      box-shadow: var(--shadow-above);
      padding-bottom: max(16px, env(safe-area-inset-bottom));
    }

    .tab {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--space-xs);
      width: 60px;
      height: 64px;
      border: none;
      background: none;
      color: white;
      cursor: pointer;
      position: relative;
      opacity: 0.6;
      transition: opacity 0.2s ease;
      font-family: inherit;
      padding: 0;
    }

    .tab:hover {
      opacity: 0.8;
    }

    .tab:active {
      opacity: 0.9;
    }

    .tab.active {
      opacity: 1;
    }

    .tab-icon {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: inherit;
    }

    .tab-label {
      font-size: var(--font-size-xs);
      font-weight: var(--font-weight-bold);
      color: white;
      display: none;
      letter-spacing: 0.5px;
    }

    .tab.active .tab-label {
      display: block;
    }

    .notification-badge {
      position: absolute;
      top: 8px;
      right: 8px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: var(--color-error);
      box-shadow: 0 0 4px rgba(239, 68, 68, 0.5);
    }
  `;

  @property({ type: String })
  activeTab: TabName = 'home';

  @property({ type: Number })
  notificationCount: number = 0;

  render() {
    return html`
      <div class="container">
        ${this.renderTab('jobs')}
        ${this.renderTab('network')}
        ${this.renderTab('home')}
        ${this.renderTab('notifications')}
        ${this.renderTab('profile')}
      </div>
    `;
  }

  private renderTab(tabName: TabName) {
    const isActive = this.activeTab === tabName;
    const showBadge = tabName === 'notifications' && this.notificationCount > 0;

    return html`
      <button
        class="tab ${isActive ? 'active' : ''}"
        @click=${() => this.selectTab(tabName)}
        aria-label="${TAB_LABELS[tabName]}"
        aria-current=${isActive ? 'page' : 'false'}
      >
        <div class="tab-icon">
          ${ICONS[tabName]}
          ${showBadge ? html`<div class="notification-badge"></div>` : ''}
        </div>
        <span class="tab-label">${TAB_LABELS[tabName]}</span>
      </button>
    `;
  }

  private selectTab(tabName: TabName) {
    this.activeTab = tabName;
    this.dispatchEvent(new CustomEvent('tab-change', {
      detail: { tab: tabName },
      bubbles: true,
      composed: true
    }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'blue-bottom-tab-bar': BottomTabBar;
  }
}
```

---

## Usage in Parent Component

Import the component:
```typescript
import './components/layout/bottom-tab-bar.ts';
```

Use in template:
```typescript
<blue-bottom-tab-bar
  .activeTab=${this.currentTab}
  .notificationCount=${this.notificationCount}
  @tab-change=${(e: CustomEvent) => this.handleTabChange(e)}
></blue-bottom-tab-bar>
```

Handle the event:
```typescript
private handleTabChange(event: CustomEvent) {
  const { tab } = event.detail;
  this.currentTab = tab;
  // Navigate to page, etc.
}
```

---

## Browser Compatibility

This component uses:
- ✅ Web Components (supported in all modern browsers)
- ✅ CSS Custom Properties (var() - supported in all modern browsers)
- ✅ CSS `env()` function (safe-area-inset-bottom - supported in modern mobile browsers)
- ✅ Lit JS (modern ES2020+)

Fallback for older browsers: Safe area padding defaults to 16px if env() not supported.

---

## Accessibility Features

- ✅ Semantic HTML buttons (not divs)
- ✅ `aria-label` on buttons (screen reader friendly)
- ✅ `aria-current` attribute on active tab
- ✅ Keyboard accessible (Tab key navigation)
- ✅ Touch-friendly (60px x 64px touch targets)
- ✅ Color + icon distinction (not just color)

---

## Notes for Implementation

1. **Icons are inline SVG** - No external icon library needed, reduces bundle size
2. **CSS variables** - Uses design system colors (define in design-system.css)
3. **No routing** - Just emits event, parent component handles navigation
4. **Notification badge** - Optional, only shows if count > 0
5. **Safe area support** - Automatically accounts for notch/home indicator on mobile
6. **Scoped CSS** - Styles don't leak to other components (Lit Shadow DOM)

---

## Deliverables

Create:
- ✅ `src/components/layout/bottom-tab-bar.ts`
- ✅ Register custom element with `@customElement('blue-bottom-tab-bar')`
- ✅ Scoped CSS with all styles
- ✅ Inline SVG icons (no separate icon files)
- ✅ TypeScript interfaces for type safety
- ✅ Proper event dispatching on tab click

---

## After Implementation

Report back:
1. Component created at `src/components/layout/bottom-tab-bar.ts`
2. Can you see the 5 tabs render correctly?
3. Do the icons display properly?
4. Does clicking tabs dispatch the `tab-change` event?
5. Does the active tab styling work?
6. Any issues with the notification badge?

**Next:** MODULE 2 - Welcome, Login, and Signup pages (Lit JS components)
