# MODULE 7: Profile Page - Lit JS Copilot Prompt

Create the user profile and account management page.

---

## Component: profile-page.ts

**File:** `src/components/pages/profile-page.ts`

**Custom Element:** `<blue-profile-page>`

## Properties & State

```typescript
@property({ type: String }) userName: string = 'Stephany';
@property({ type: String }) userClass: string = 'Class of 2026';
@property({ type: String }) userMajor: string = 'Information Technology';
@property({ type: String }) userAvatar: string = 'https://...';

@state() private isEditing: boolean = false;
@state() private showLogoutConfirm: boolean = false;

// Menu items (static)
private accountMenuItems = [
  {
    id: 'personal',
    icon: '👤',
    label: 'Personal Information',
    description: 'Manage your contact details'
  },
  {
    id: 'academic',
    icon: '🎓',
    label: 'Academic Records',
    description: 'Degree and graduation details'
  },
  {
    id: 'alumni-id',
    icon: '📋',
    label: 'Alumni ID',
    description: 'View digital alumni card'
  },
  {
    id: 'job-preferences',
    icon: '💼',
    label: 'Job Preferences',
    description: 'Career opportunities & interests'
  }
];

private settingsMenuItems = [
  {
    id: 'settings',
    icon: '⚙️',
    label: 'Settings',
    description: 'Privacy, security, & notifications'
  }
];
```

## Events

```typescript
// When user taps menu item
this.dispatchEvent(new CustomEvent('navigate-profile-section', {
  detail: { section: 'personal' }, // or 'academic', 'alumni-id', etc.
  bubbles: true,
  composed: true
}));

// When user logs out
this.dispatchEvent(new CustomEvent('logout', {
  bubbles: true,
  composed: true
}));

// When user edits profile
this.dispatchEvent(new CustomEvent('navigate', {
  detail: { page: 'edit-profile' },
  bubbles: true,
  composed: true
}));
```

## Scoped CSS

```css
:host {
  display: block;
  min-height: 100vh;
  background: var(--color-gray-50);
  overflow-y: auto;
  padding-bottom: 100px;
}

.status-bar {
  height: 44px;
  padding: 8px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: var(--color-gray-600);
  border-bottom: 1px solid var(--color-gray-200);
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, var(--color-navy) 0%, var(--color-navy-light) 100%);
  background-image: 
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 35px,
      rgba(255, 255, 255, 0.05) 35px,
      rgba(255, 255, 255, 0.05) 70px
    );
  color: white;
  padding: var(--space-2xl) var(--space-lg) var(--space-3xl);
  text-align: center;
  position: relative;
}

.edit-button {
  position: absolute;
  top: var(--space-lg);
  right: var(--space-lg);
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.edit-button:hover {
  background: rgba(255, 255, 255, 0.3);
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: var(--color-coral);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  margin: 0 auto var(--space-lg);
  border: 4px solid rgba(255, 255, 255, 0.3);
}

.user-name {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  margin: 0 0 var(--space-md) 0;
}

.user-meta {
  font-size: var(--font-size-sm);
  opacity: 0.9;
  margin: 0;
}

.verified-badge {
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.4);
  padding: 6px 16px;
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  margin-top: var(--space-lg);
}

/* Content Section */
.content {
  padding: var(--space-lg);
}

.section {
  margin-bottom: var(--space-2xl);
}

.section-title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  color: var(--color-navy);
  margin: 0 0 var(--space-lg) 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Menu Items */
.menu-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.menu-item {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
  background: white;
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  border: 1px solid var(--color-gray-200);
  cursor: pointer;
  transition: all 0.2s ease;
}

.menu-item:hover {
  border-color: var(--color-navy);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.menu-icon {
  font-size: 28px;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-gray-100);
  border-radius: var(--radius-lg);
}

.menu-content {
  flex: 1;
}

.menu-label {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  color: var(--color-navy);
  margin: 0 0 4px 0;
}

.menu-description {
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  margin: 0;
}

.menu-arrow {
  color: var(--color-gray-400);
  font-size: 20px;
  flex-shrink: 0;
}

/* Logout Section */
.logout-item {
  background: #FEE2E2;
  border: 1px solid #FECACA;
}

.logout-item:hover {
  background: #FCA5A5;
  border-color: #DC2626;
}

.logout-icon {
  color: var(--color-error);
}

.logout-label {
  color: var(--color-error);
}

/* Logout Confirmation Modal */
.logout-modal-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  align-items: flex-end;
  z-index: 50;
}

.logout-modal-overlay.show {
  display: flex;
}

.logout-modal {
  background: white;
  width: 100%;
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
  padding: var(--space-2xl) var(--space-lg);
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.logout-modal-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-navy);
  margin: 0 0 var(--space-md) 0;
  text-align: center;
}

.logout-modal-text {
  font-size: var(--font-size-base);
  color: var(--color-gray-700);
  text-align: center;
  margin: 0 0 var(--space-2xl) 0;
}

.logout-modal-buttons {
  display: flex;
  gap: var(--space-lg);
}

.logout-modal-buttons blue-button {
  flex: 1;
}
```

## Template Structure

```typescript
render() {
  return html`
    <div class="status-bar">
      <span>9:41</span>
      <div>📶 📡 🔋</div>
    </div>

    <!-- Hero Section -->
    <div class="hero-section">
      <button class="edit-button" @click=${this.handleEditClick}>✏️</button>

      <div class="avatar">
        ${this.userAvatar ? html`<img src=${this.userAvatar} />` : '👩‍🎓'}
      </div>

      <h1 class="user-name">${this.userName}</h1>
      <p class="user-meta">${this.userClass} • ${this.userMajor}</p>

      <div class="verified-badge">✓ Verified Alumni</div>
    </div>

    <!-- Content -->
    <div class="content">
      <!-- Account Management Section -->
      <div class="section">
        <h2 class="section-title">Account Management</h2>
        <div class="menu-list">
          ${this.accountMenuItems.map(item => this.renderMenuItem(item))}
        </div>
      </div>

      <!-- App Settings Section -->
      <div class="section">
        <h2 class="section-title">App Settings</h2>
        <div class="menu-list">
          ${this.settingsMenuItems.map(item => this.renderMenuItem(item))}
          ${this.renderLogoutItem()}
        </div>
      </div>
    </div>

    <!-- Logout Confirmation Modal -->
    ${this.renderLogoutModal()}
  `;
}

private renderMenuItem(item: {
  id: string;
  icon: string;
  label: string;
  description: string;
}) {
  return html`
    <div class="menu-item" @click=${() => this.handleMenuItemClick(item.id)}>
      <div class="menu-icon">${item.icon}</div>
      <div class="menu-content">
        <h3 class="menu-label">${item.label}</h3>
        <p class="menu-description">${item.description}</p>
      </div>
      <span class="menu-arrow">→</span>
    </div>
  `;
}

private renderLogoutItem() {
  return html`
    <div class="menu-item logout-item" @click=${this.handleLogoutClick}>
      <div class="menu-icon logout-icon">↗️</div>
      <div class="menu-content">
        <h3 class="menu-label logout-label">Logout</h3>
        <p class="menu-description">Sign out of your account</p>
      </div>
      <span class="menu-arrow">→</span>
    </div>
  `;
}

private renderLogoutModal() {
  return html`
    <div class="logout-modal-overlay ${this.showLogoutConfirm ? 'show' : ''}">
      <div class="logout-modal" @click=${(e: Event) => e.stopPropagation()}>
        <h2 class="logout-modal-title">Sign Out?</h2>
        <p class="logout-modal-text">
          Are you sure you want to sign out of your Blue Links account?
        </p>

        <div class="logout-modal-buttons">
          <blue-button
            variant="secondary"
            @click=${() => this.showLogoutConfirm = false}
          >
            Cancel
          </blue-button>
          <blue-button
            variant="danger"
            @click=${this.handleConfirmLogout}
          >
            Sign Out
          </blue-button>
        </div>
      </div>
    </div>
  `;
}

// Event Handlers
private handleEditClick() {
  this.dispatchEvent(new CustomEvent('navigate', {
    detail: { page: 'edit-profile' },
    bubbles: true,
    composed: true
  }));
}

private handleMenuItemClick(menuId: string) {
  // Different menu items can route to different detail pages
  this.dispatchEvent(new CustomEvent('navigate-profile-section', {
    detail: { section: menuId },
    bubbles: true,
    composed: true
  }));
}

private handleLogoutClick() {
  this.showLogoutConfirm = true;
}

private handleConfirmLogout() {
  this.showLogoutConfirm = false;
  this.dispatchEvent(new CustomEvent('logout', {
    bubbles: true,
    composed: true
  }));
  // App will handle routing back to login/welcome
}
```

## Usage in App Component

```typescript
<blue-profile-page
  .userName=${this.currentUser?.name}
  .userClass=${this.currentUser?.class}
  .userMajor=${this.currentUser?.major}
  .userAvatar=${this.currentUser?.avatar}
  @navigate=${(e: CustomEvent) => this.handleNavigation(e)}
  @navigate-profile-section=${(e: CustomEvent) => this.handleProfileSection(e)}
  @logout=${() => this.handleLogout()}
></blue-profile-page>
```

---

## Key Features

- ✅ Hero section with avatar, name, and class info
- ✅ Edit profile button (pencil icon)
- ✅ Verified Alumni badge
- ✅ Account Management menu (4 items)
- ✅ Settings menu (1 item)
- ✅ Logout item (red/danger styling)
- ✅ Logout confirmation modal
- ✅ Smooth animations and transitions
- ✅ Responsive layout for mobile
- ✅ All menu items clickable and dispatch events

---

## Menu Items Included

### Account Management
1. **Personal Information** - Manage contact details
2. **Academic Records** - Degree and graduation details
3. **Alumni ID** - View digital alumni card
4. **Job Preferences** - Career opportunities & interests

### App Settings
1. **Settings** - Privacy, security, & notifications
2. **Logout** - Sign out of account (with confirmation)

---

## Deliverables

Create:
- ✅ `src/components/pages/profile-page.ts`
- ✅ Hero section with avatar and user info
- ✅ Two menu sections (Account Management, App Settings)
- ✅ All menu items styled and clickable
- ✅ Logout confirmation modal
- ✅ Edit button that navigates to edit profile
- ✅ All events dispatching correctly

---

## After Implementation

Report back:
1. ✅ Profile page created and renders correctly?
2. ✅ Hero section looks good with avatar and info?
3. ✅ All menu items clickable and styled?
4. ✅ Logout confirmation modal working?
5. ✅ Navigation events dispatching?
6. ✅ Ready to connect to main app?

---

## Final Status: Complete! ✅

All 7 modules are now ready:
- ✅ MODULE 1: Bottom Tab Bar
- ✅ MODULE 2: Auth Pages (Welcome, Login, Signup)
- ✅ MODULE 3: Core Components (Button, Input, Badge, Card)
- ✅ MODULE 4: Home Dashboard
- ✅ MODULE 5: Job Board & Applications
- ✅ MODULE 6: Filter Modal
- ✅ MODULE 7: Profile Page

**Next Steps:**
1. Build all modules with Copilot (one at a time)
2. Create main app component (`app.ts`) with routing
3. Connect all components together
4. Add navigation between pages
5. Test all functionality
6. Add mock API data or connect to real backend

You've got everything you need to build Blue Links! 🚀
