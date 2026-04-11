import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import '../common/button';

interface MenuItem {
  id: string;
  icon: string;
  label: string;
  description: string;
}

@customElement('blue-profile-page')
export class ProfilePage extends LitElement {
  static styles = css`
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
      background: var(--color-white);
    }

    .hero-section {
      background: linear-gradient(135deg, var(--color-navy) 0%, var(--color-navy-light) 100%);
      background-image: repeating-linear-gradient(
        45deg,
        transparent,
        transparent 35px,
        rgb(255 255 255 / 5%) 35px,
        rgb(255 255 255 / 5%) 70px
      );
      color: var(--color-white);
      padding: var(--space-2xl) var(--space-lg) var(--space-3xl);
      text-align: center;
      position: relative;
    }

    .edit-button {
      position: absolute;
      top: var(--space-lg);
      right: var(--space-lg);
      background: rgb(255 255 255 / 20%);
      border: 1px solid rgb(255 255 255 / 30%);
      color: var(--color-white);
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
      background: rgb(255 255 255 / 30%);
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
      border: 4px solid rgb(255 255 255 / 30%);
      overflow: hidden;
    }

    .avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .user-name {
      font-size: var(--font-size-2xl);
      font-weight: var(--font-weight-bold);
      margin: 0 0 var(--space-md);
    }

    .user-meta {
      font-size: var(--font-size-sm);
      opacity: 0.9;
      margin: 0;
    }

    .verified-badge {
      display: inline-block;
      background: rgb(255 255 255 / 20%);
      border: 1px solid rgb(255 255 255 / 40%);
      padding: 6px 16px;
      border-radius: var(--radius-full);
      font-size: var(--font-size-sm);
      margin-top: var(--space-lg);
    }

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
      margin: 0 0 var(--space-lg);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .menu-list {
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
    }

    .menu-item {
      width: 100%;
      text-align: left;
      display: flex;
      align-items: center;
      gap: var(--space-lg);
      background: var(--color-white);
      border-radius: var(--radius-lg);
      padding: var(--space-lg);
      border: 1px solid var(--color-gray-200);
      cursor: pointer;
      transition: all 0.2s ease;
      font-family: inherit;
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
      margin: 0 0 4px;
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

    .logout-item {
      background: #fee2e2;
      border: 1px solid #fecaca;
    }

    .logout-item:hover {
      background: #fca5a5;
      border-color: #dc2626;
    }

    .logout-icon {
      color: var(--color-error);
    }

    .logout-label {
      color: var(--color-error);
    }

    .logout-modal-overlay {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgb(0 0 0 / 50%);
      align-items: flex-end;
      z-index: 50;
    }

    .logout-modal-overlay.show {
      display: flex;
    }

    .logout-modal {
      background: var(--color-white);
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
      margin: 0 0 var(--space-md);
      text-align: center;
    }

    .logout-modal-text {
      font-size: var(--font-size-base);
      color: var(--color-gray-700);
      text-align: center;
      margin: 0 0 var(--space-2xl);
    }

    .logout-modal-buttons {
      display: flex;
      gap: var(--space-lg);
    }

    .logout-modal-buttons blue-button {
      flex: 1;
    }

    @media (min-width: 768px) {
      .hero-section,
      .content {
        max-width: 1280px;
        margin-left: auto;
        margin-right: auto;
      }

      .hero-section {
        border-radius: var(--radius-xl);
        margin-top: 16px;
      }

      .content {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: var(--space-lg);
      }

      .section {
        margin-bottom: 0;
      }
    }

    @media (min-width: 1024px) {
      :host {
        padding-bottom: 24px;
      }

      .hero-section {
        text-align: left;
      }

      .avatar {
        margin: 0 0 var(--space-lg) 0;
      }

      .menu-list {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .logout-modal {
        width: min(720px, calc(100vw - 32px));
        margin: auto;
        border-radius: var(--radius-xl);
      }

      .logout-modal-overlay {
        align-items: center;
        justify-content: center;
      }
    }
  `;

  @property({ type: String }) userName = 'Stephany';
  @property({ type: String }) userClass = 'Class of 2026';
  @property({ type: String }) userMajor = 'Information Technology';
  @property({ type: String }) userAvatar = '';

  @state() private isEditing = false;
  @state() private showLogoutConfirm = false;

  private accountMenuItems: MenuItem[] = [
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
      description: 'Career opportunities and interests'
    }
  ];

  private settingsMenuItems: MenuItem[] = [
    {
      id: 'settings',
      icon: '⚙️',
      label: 'Settings',
      description: 'Privacy, security, and notifications'
    }
  ];

  render() {
    return html`
      <div class="status-bar">
        <span>9:41</span>
        <span>Signal WiFi Battery</span>
      </div>

      <div class="hero-section">
        <button class="edit-button" @click=${this.handleEditClick} aria-label="Edit profile">✏️</button>

        <div class="avatar">
          ${this.userAvatar ? html`<img src=${this.userAvatar} alt="Profile avatar" />` : html`<span>👩‍🎓</span>`}
        </div>

        <h1 class="user-name">${this.userName}</h1>
        <p class="user-meta">${this.userClass} • ${this.userMajor}</p>

        <div class="verified-badge">✓ Verified Alumni</div>
      </div>

      <div class="content">
        <section class="section">
          <h2 class="section-title">Account Management</h2>
          <div class="menu-list">${this.accountMenuItems.map((item) => this.renderMenuItem(item))}</div>
        </section>

        <section class="section">
          <h2 class="section-title">App Settings</h2>
          <div class="menu-list">${this.settingsMenuItems.map((item) => this.renderMenuItem(item))} ${this.renderLogoutItem()}</div>
        </section>
      </div>

      ${this.renderLogoutModal()}
    `;
  }

  private renderMenuItem(item: MenuItem) {
    return html`
      <button class="menu-item" @click=${() => this.handleMenuItemClick(item.id)}>
        <div class="menu-icon">${item.icon}</div>
        <div class="menu-content">
          <h3 class="menu-label">${item.label}</h3>
          <p class="menu-description">${item.description}</p>
        </div>
        <span class="menu-arrow">→</span>
      </button>
    `;
  }

  private renderLogoutItem() {
    return html`
      <button class="menu-item logout-item" @click=${this.handleLogoutClick}>
        <div class="menu-icon logout-icon">↗️</div>
        <div class="menu-content">
          <h3 class="menu-label logout-label">Logout</h3>
          <p class="menu-description">Sign out of your account</p>
        </div>
        <span class="menu-arrow">→</span>
      </button>
    `;
  }

  private renderLogoutModal() {
    return html`
      <div class="logout-modal-overlay ${this.showLogoutConfirm ? 'show' : ''}" @click=${this.closeLogoutModal}>
        <div class="logout-modal" @click=${(e: Event) => e.stopPropagation()}>
          <h2 class="logout-modal-title">Sign Out?</h2>
          <p class="logout-modal-text">Are you sure you want to sign out of your Blue Links account?</p>

          <div class="logout-modal-buttons">
            <blue-button variant="secondary" @click=${this.closeLogoutModal}>Cancel</blue-button>
            <blue-button variant="danger" @click=${this.handleConfirmLogout}>Sign Out</blue-button>
          </div>
        </div>
      </div>
    `;
  }

  private handleEditClick = () => {
    this.isEditing = true;
    this.dispatchEvent(
      new CustomEvent('navigate', {
        detail: { page: 'edit-profile' },
        bubbles: true,
        composed: true
      })
    );
  };

  private handleMenuItemClick(menuId: string) {
    this.dispatchEvent(
      new CustomEvent('navigate-profile-section', {
        detail: { section: menuId },
        bubbles: true,
        composed: true
      })
    );
  }

  private handleLogoutClick = () => {
    this.showLogoutConfirm = true;
  };

  private closeLogoutModal = () => {
    this.showLogoutConfirm = false;
  };

  private handleConfirmLogout = () => {
    this.showLogoutConfirm = false;
    this.dispatchEvent(
      new CustomEvent('logout', {
        bubbles: true,
        composed: true
      })
    );
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'blue-profile-page': ProfilePage;
  }
}
