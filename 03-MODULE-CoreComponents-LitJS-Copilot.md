# MODULE 3: Core Reusable Components - Lit JS Copilot Prompt

Build 4 essential components that will be used across all pages of the Blue Links app.

---

## Overview

These components are **stateless, reusable building blocks**:
- `<blue-button>` - Button with multiple variants
- `<blue-input>` - Form input with icon support & error states
- `<blue-badge>` - Status and tag badges
- `<blue-card>` - Content card container

Each component is simple, focused, and self-contained.

---

# COMPONENT 1: blue-button.ts

**File:** `src/components/common/button.ts`

**Custom Element:** `<blue-button>`

## Properties

```typescript
@property({ type: String }) variant: 'primary' | 'secondary' | 'outline' | 'danger' = 'primary';
@property({ type: Boolean }) disabled = false;
@property({ type: Boolean }) fullWidth = false;
@property({ type: Boolean }) loading = false;
@property({ type: String }) size: 'sm' | 'md' | 'lg' = 'md';
@property({ type: String }) type: 'button' | 'submit' | 'reset' = 'button';
```

## Events

```typescript
// Dispatches when clicked
this.dispatchEvent(new CustomEvent('click', {
  bubbles: true,
  composed: true
}));
// Or use standard click event
```

## Scoped CSS

```css
:host {
  display: inline-block;
}

:host([full-width]) {
  display: block;
  width: 100%;
}

.button {
  border: none;
  border-radius: var(--radius-lg);
  font-family: inherit;
  font-weight: var(--font-weight-bold);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  padding: var(--space-md) var(--space-lg);
  font-size: var(--font-size-base);
  min-height: 48px;
  width: 100%;
}

/* Sizes */
.button.sm {
  padding: var(--space-sm) var(--space-md);
  font-size: var(--font-size-sm);
  min-height: 36px;
}

.button.lg {
  padding: var(--space-lg) var(--space-xl);
  font-size: var(--font-size-lg);
  min-height: 56px;
}

/* Variants */
.button.primary {
  background: var(--color-navy);
  color: white;
}

.button.primary:hover:not(:disabled) {
  background: var(--color-navy-light);
  box-shadow: 0 4px 12px rgba(0, 61, 122, 0.2);
}

.button.primary:active:not(:disabled) {
  background: var(--color-navy-dark);
}

.button.secondary {
  background: var(--color-gray-100);
  color: var(--color-navy);
  border: 1px solid var(--color-gray-200);
}

.button.secondary:hover:not(:disabled) {
  background: var(--color-gray-200);
}

.button.outline {
  background: transparent;
  color: var(--color-navy);
  border: 2px solid var(--color-navy);
}

.button.outline:hover:not(:disabled) {
  background: rgba(0, 61, 122, 0.05);
}

.button.danger {
  background: var(--color-error);
  color: white;
}

.button.danger:hover:not(:disabled) {
  background: #DC2626;
}

/* Disabled state */
.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Loading state */
.button.loading {
  opacity: 0.75;
  pointer-events: none;
}

.spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

## Template

```typescript
render() {
  const classes = `button ${this.variant} ${this.size} ${this.loading ? 'loading' : ''}`;

  return html`
    <button
      class=${classes}
      type=${this.type}
      ?disabled=${this.disabled || this.loading}
      @click=${this.handleClick}
    >
      ${this.loading ? html`<span class="spinner"></span>` : ''}
      <slot></slot>
    </button>
  `;
}

private handleClick(e: MouseEvent) {
  if (this.disabled || this.loading) {
    e.preventDefault();
    return;
  }
}
```

## Usage Examples

```html
<!-- Primary button -->
<blue-button variant="primary" @click=${this.handleClick}>
  Click Me
</blue-button>

<!-- With loading state -->
<blue-button variant="primary" .loading=${this.isLoading}>
  Submit
</blue-button>

<!-- Secondary, full width -->
<blue-button variant="secondary" full-width>
  Cancel
</blue-button>

<!-- Outline, small -->
<blue-button variant="outline" size="sm">
  Skip
</blue-button>

<!-- Danger button -->
<blue-button variant="danger">
  Delete
</blue-button>
```

---

# COMPONENT 2: blue-input.ts

**File:** `src/components/common/input.ts`

**Custom Element:** `<blue-input>`

## Properties

```typescript
@property({ type: String }) type: string = 'text';
@property({ type: String }) name: string = '';
@property({ type: String }) placeholder: string = '';
@property({ type: String }) value: string = '';
@property({ type: String }) label: string = '';
@property({ type: String }) icon: string = ''; // Emoji or SVG string
@property({ type: Boolean }) disabled: boolean = false;
@property({ type: Boolean }) required: boolean = false;
@property({ type: String }) errorMessage: string = '';
@property({ type: String }) inputmode: string = 'text';
```

## Events

```typescript
// When input changes
this.dispatchEvent(new CustomEvent('input-change', {
  detail: { value: this.value },
  bubbles: true,
  composed: true
}));

// When input blurs
this.dispatchEvent(new CustomEvent('input-blur', {
  bubbles: true,
  composed: true
}));
```

## Scoped CSS

```css
:host {
  display: block;
  margin-bottom: var(--space-lg);
}

.input-group {
  display: flex;
  flex-direction: column;
}

.label {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  color: var(--color-gray-600);
  text-transform: uppercase;
  margin-bottom: var(--space-md);
  letter-spacing: 0.5px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: var(--space-md);
  font-size: 18px;
  pointer-events: none;
  color: var(--color-gray-500);
}

.input {
  width: 100%;
  height: 48px;
  padding: var(--space-md) var(--space-lg);
  padding-left: ${this.icon ? '40px' : 'var(--space-lg)'};
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  font-family: inherit;
  transition: all 0.2s ease;
  background: white;
}

.input:focus {
  outline: none;
  border-color: var(--color-navy);
  box-shadow: 0 0 0 3px rgba(0, 61, 122, 0.1);
}

.input:disabled {
  background: var(--color-gray-50);
  color: var(--color-gray-500);
  cursor: not-allowed;
}

.input.has-error {
  border-color: var(--color-error);
}

.input.has-error:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.error-message {
  font-size: var(--font-size-xs);
  color: var(--color-error);
  margin-top: var(--space-sm);
}

.toggle-password {
  position: absolute;
  right: var(--space-md);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  padding: 0;
  color: var(--color-gray-500);
}

.toggle-password:hover {
  color: var(--color-gray-700);
}
```

## Template

```typescript
render() {
  return html`
    <div class="input-group">
      ${this.label ? html`<label class="label">${this.label}</label>` : ''}
      
      <div class="input-wrapper">
        ${this.icon ? html`<span class="input-icon">${this.icon}</span>` : ''}
        
        <input
          class="input ${this.errorMessage ? 'has-error' : ''}"
          type=${this.type}
          name=${this.name}
          placeholder=${this.placeholder}
          .value=${this.value}
          ?disabled=${this.disabled}
          ?required=${this.required}
          inputmode=${this.inputmode}
          @input=${this.handleInput}
          @blur=${this.handleBlur}
        />

        ${this.type === 'password' ? html`
          <button
            type="button"
            class="toggle-password"
            @click=${this.togglePasswordVisibility}
          >
            ${this.type === 'password' ? '👁️' : '👁️‍🗨️'}
          </button>
        ` : ''}
      </div>

      ${this.errorMessage ? html`<span class="error-message">${this.errorMessage}</span>` : ''}
    </div>
  `;
}

private handleInput(e: Event) {
  const target = e.target as HTMLInputElement;
  this.value = target.value;
  this.dispatchEvent(new CustomEvent('input-change', {
    detail: { value: this.value },
    bubbles: true,
    composed: true
  }));
}

private handleBlur() {
  this.dispatchEvent(new CustomEvent('input-blur', {
    bubbles: true,
    composed: true
  }));
}

private togglePasswordVisibility() {
  this.type = this.type === 'password' ? 'text' : 'password';
}
```

## Usage Examples

```html
<!-- Basic input -->
<blue-input
  label="Full Name"
  placeholder="Juan dela Cruz"
  .value=${this.name}
  icon="👤"
  @input-change=${(e: CustomEvent) => this.name = e.detail.value}
></blue-input>

<!-- Email input -->
<blue-input
  type="email"
  label="Email"
  placeholder="example@addu.edu.ph"
  icon="✉️"
  .value=${this.email}
  .errorMessage=${this.emailError}
  @input-change=${(e: CustomEvent) => this.email = e.detail.value}
></blue-input>

<!-- Password input (auto-toggle) -->
<blue-input
  type="password"
  label="Password"
  placeholder="Enter your password"
  icon="🔒"
  .value=${this.password}
  .errorMessage=${this.passwordError}
  @input-change=${(e: CustomEvent) => this.password = e.detail.value}
></blue-input>

<!-- With error state -->
<blue-input
  label="Year"
  placeholder="YYYY"
  inputmode="numeric"
  .errorMessage="Invalid year"
></blue-input>
```

---

# COMPONENT 3: blue-badge.ts

**File:** `src/components/common/badge.ts`

**Custom Element:** `<blue-badge>`

## Properties

```typescript
@property({ type: String }) variant: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral' = 'neutral';
@property({ type: String }) size: 'sm' | 'md' = 'md';
```

## Scoped CSS

```css
:host {
  display: inline-block;
}

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  white-space: nowrap;
  padding: var(--space-sm) var(--space-md);
}

.badge.sm {
  padding: 2px 8px;
  font-size: 11px;
}

/* Variants */
.badge.primary {
  background: rgba(0, 61, 122, 0.1);
  color: var(--color-navy);
}

.badge.success {
  background: rgba(16, 185, 129, 0.1);
  color: #059669;
}

.badge.warning {
  background: rgba(245, 158, 11, 0.1);
  color: #D97706;
}

.badge.error {
  background: rgba(239, 68, 68, 0.1);
  color: var(--color-error);
}

.badge.info {
  background: rgba(59, 130, 246, 0.1);
  color: #2563EB;
}

.badge.neutral {
  background: var(--color-gray-200);
  color: var(--color-gray-700);
}
```

## Template

```typescript
render() {
  const classes = `badge ${this.variant} ${this.size}`;
  return html`
    <span class=${classes}>
      <slot></slot>
    </span>
  `;
}
```

## Usage Examples

```html
<!-- Status badges (for job applications) -->
<blue-badge variant="warning">Under Review</blue-badge>
<blue-badge variant="success">Shortlisted</blue-badge>
<blue-badge variant="info">Accepted</blue-badge>
<blue-badge variant="neutral">Not Selected</blue-badge>

<!-- Skill/Tag badges -->
<blue-badge variant="primary">UI Design</blue-badge>
<blue-badge variant="primary">React</blue-badge>

<!-- Error badge -->
<blue-badge variant="error">3 issues</blue-badge>

<!-- Small badges -->
<blue-badge variant="success" size="sm">✓ Verified</blue-badge>
```

---

# COMPONENT 4: blue-card.ts

**File:** `src/components/common/card.ts`

**Custom Element:** `<blue-card>`

## Properties

```typescript
@property({ type: String }) variant: 'default' | 'job' | 'news' | 'event' = 'default';
@property({ type: String }) borderColor: '' | 'navy' | 'green' | 'orange' | 'blue' = '';
@property({ type: Boolean }) clickable: boolean = false;
```

## Events

```typescript
// When card is clicked (if clickable)
this.dispatchEvent(new CustomEvent('card-click', {
  bubbles: true,
  composed: true
}));
```

## Scoped CSS

```css
:host {
  display: block;
}

.card {
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition: all 0.2s ease;
  border-left: 4px solid transparent;
}

.card.clickable {
  cursor: pointer;
}

.card.clickable:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.card-content {
  padding: var(--space-lg);
}

/* Border colors (for job cards) */
.card.border-navy {
  border-left-color: var(--color-navy);
}

.card.border-green {
  border-left-color: var(--color-success);
}

.card.border-orange {
  border-left-color: #F97316;
}

.card.border-blue {
  border-left-color: var(--color-info);
}

/* Job card variant */
.card.job {
  border-left-width: 6px;
}

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: var(--space-md);
}

.job-title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  color: var(--color-navy);
  margin: 0;
}

.job-company {
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  margin: 4px 0 var(--space-md) 0;
}

.job-badges {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  margin-bottom: var(--space-md);
}

.job-meta {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  margin-bottom: var(--space-md);
}

.job-meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.job-salary {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  color: var(--color-navy);
  margin-bottom: var(--space-md);
}

.job-action {
  display: flex;
  gap: var(--space-sm);
}

/* News card variant */
.card.news {
  border: none;
  text-align: center;
}

.news-image {
  width: 100%;
  height: 120px;
  background: var(--color-gray-100);
  object-fit: cover;
}

.news-title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  color: var(--color-navy);
  margin: var(--space-md) 0 var(--space-sm) 0;
  line-height: 1.4;
}

.news-snippet {
  font-size: 12px;
  color: var(--color-gray-600);
  line-height: 1.4;
}

/* Event card variant */
.card.event {
  border: none;
}

.event-date {
  background: var(--color-navy);
  color: white;
  padding: var(--space-md) var(--space-lg);
  border-radius: var(--radius-md);
  font-size: 14px;
  font-weight: bold;
  margin-bottom: var(--space-md);
  text-align: center;
}

.event-title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  color: var(--color-navy);
  margin: 0;
}

.event-meta {
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  margin-top: 4px;
}
```

## Template

```typescript
render() {
  const classes = `card ${this.variant} ${this.borderColor ? `border-${this.borderColor}` : ''} ${this.clickable ? 'clickable' : ''}`;

  return html`
    <div
      class=${classes}
      @click=${this.handleClick}
    >
      <div class="card-content">
        <slot></slot>
      </div>
    </div>
  `;
}

private handleClick() {
  if (this.clickable) {
    this.dispatchEvent(new CustomEvent('card-click', {
      bubbles: true,
      composed: true
    }));
  }
}
```

## Usage Examples

### Default Card
```html
<blue-card>
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</blue-card>
```

### Job Card
```html
<blue-card variant="job" border-color="navy">
  <div class="job-header">
    <div>
      <h3 class="job-title">Senior Software Engineer</h3>
      <p class="job-company">Davao Tech Solutions</p>
    </div>
    <blue-badge variant="warning">Under Review</blue-badge>
  </div>
  
  <div class="job-badges">
    <blue-badge variant="primary">Blue Knight Priority</blue-badge>
    <blue-badge variant="info">Information Technology</blue-badge>
  </div>
  
  <div class="job-meta">
    <span class="job-meta-item">📍 Davao City</span>
    <span class="job-meta-item">⏰ Applied 2d ago</span>
  </div>
  
  <div class="job-salary">₱60k - ₱90k</div>
  
  <div class="job-action">
    <blue-button variant="primary" full-width>View Details</blue-button>
  </div>
</blue-card>
```

### News Card
```html
<blue-card variant="news">
  <div class="news-image" style="background: url(...) center/cover"></div>
  <h4 class="news-title">Campus Update: Grand Alumni Homecoming 2024</h4>
  <p class="news-snippet">Registration now open for the biggest reunion...</p>
</blue-card>
```

### Event Card
```html
<blue-card variant="event" clickable>
  <div class="event-date">Dec 07</div>
  <h4 class="event-title">Alumni Webinar: Tech Trends</h4>
  <p class="event-meta">🕕 6:00 PM • Zoom</p>
</blue-card>
```

---

## Summary

Create these 4 files:
- ✅ `src/components/common/button.ts` - Blue button component
- ✅ `src/components/common/input.ts` - Form input component
- ✅ `src/components/common/badge.ts` - Badge component
- ✅ `src/components/common/card.ts` - Card container component

Each component is:
- Fully typed with TypeScript
- Scoped CSS (no style leaks)
- Event dispatching for parent communication
- Reusable across all pages
- Accessible (semantic HTML, proper labels)
- Zero external dependencies

---

## After Implementation

Report back:
1. ✅ All 4 components created in `src/components/common/`
2. ✅ Can you render each variant (primary/secondary buttons, different badge colors, etc.)?
3. ✅ Do events dispatch properly when components are interacted with?
4. ✅ Any styling tweaks needed to match Figma?
5. ✅ Ready to use in the auth pages?

**Next:** MODULE 4 - Home Dashboard (uses these core components)
