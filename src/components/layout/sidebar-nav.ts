import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type TabName = 'jobs' | 'network' | 'home' | 'notifications' | 'profile';

const ICONS = {
  jobs: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"></path>
  </svg>`,
  network: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>`,
  home: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>`,
  notifications: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>`,
  profile: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
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

@customElement('blue-sidebar-nav')
export class SidebarNav extends LitElement {
  static styles = css`
    :host {
      display: none;
    }

    @media (min-width: 1024px) {
      :host {
        display: block;
        position: fixed;
        left: 0;
        top: 0;
        width: 250px;
        height: 100vh;
        z-index: 40;
      }
    }

    .sidebar {
      height: 100%;
      background: linear-gradient(180deg, var(--color-navy) 0%, var(--color-navy-dark) 100%);
      color: var(--color-white);
      padding: 20px 16px;
      display: flex;
      flex-direction: column;
      box-shadow: var(--shadow-above);
    }

    .brand {
      padding: 6px 8px 20px;
      border-bottom: 1px solid rgb(255 255 255 / 14%);
      margin-bottom: 16px;
    }

    .brand-title {
      font-size: 15px;
      font-weight: var(--font-weight-bold);
      letter-spacing: 1.4px;
      text-transform: uppercase;
    }

    .brand-subtitle {
      margin-top: 4px;
      font-size: 12px;
      opacity: 0.78;
      line-height: 1.4;
    }

    .tabs {
      display: grid;
      gap: 10px;
    }

    .tab {
      border: none;
      background: transparent;
      color: rgb(255 255 255 / 82%);
      border-radius: var(--radius-lg);
      padding: 12px 14px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 12px;
      text-align: left;
      font: inherit;
      transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
    }

    .tab:hover {
      background: rgb(255 255 255 / 8%);
      transform: translateX(2px);
    }

    .tab.active {
      background: rgb(255 255 255 / 14%);
      color: var(--color-white);
      box-shadow: inset 0 0 0 1px rgb(255 255 255 / 16%);
    }

    .tab-icon {
      width: 24px;
      height: 24px;
      display: grid;
      place-items: center;
      flex-shrink: 0;
    }

    .tab-icon svg {
      width: 24px;
      height: 24px;
    }

    .notification-badge {
      position: absolute;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--color-coral);
      transform: translate(14px, -10px);
      box-shadow: 0 0 0 3px rgb(232 168 124 / 20%);
    }

    .tab-copy {
      display: grid;
      gap: 2px;
    }

    .tab-label {
      font-size: 14px;
      font-weight: var(--font-weight-bold);
    }

    .tab-hint {
      font-size: 12px;
      opacity: 0.72;
    }

    .footer {
      margin-top: auto;
      padding-top: 16px;
      border-top: 1px solid rgb(255 255 255 / 14%);
      font-size: 12px;
      opacity: 0.8;
      line-height: 1.5;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 5px 8px;
      border-radius: var(--radius-full);
      background: rgb(255 255 255 / 14%);
      margin-top: 8px;
      font-size: 11px;
      font-weight: var(--font-weight-bold);
    }
  `;

  @property({ type: String })
  activeTab: TabName = 'home';

  @property({ type: Number })
  notificationCount = 0;

  render() {
    return html`
      <aside class="sidebar" aria-label="Desktop navigation">
        <div class="brand">
          <div class="brand-title">Blue Links</div>
          <div class="brand-subtitle">Alumni portal desktop navigation</div>
        </div>

        <nav class="tabs">
          ${this.renderTab('home', 'Overview')}
          ${this.renderTab('jobs', 'Opportunities')}
          ${this.renderTab('network', 'Community')}
          ${this.renderTab('notifications', 'Alerts')}
          ${this.renderTab('profile', 'Account')}
        </nav>

        <div class="footer">
          Professional desktop view
          <div class="badge">${this.notificationCount} notifications</div>
        </div>
      </aside>
    `;
  }

  private renderTab(tabName: TabName, hint: string) {
    const isActive = this.activeTab === tabName;
    const showBadge = tabName === 'notifications' && this.notificationCount > 0;

    return html`
      <button
        class="tab ${isActive ? 'active' : ''}"
        @click=${() => this.selectTab(tabName)}
        aria-label=${TAB_LABELS[tabName]}
        aria-current=${isActive ? 'page' : 'false'}
      >
        <span class="tab-icon">
          ${ICONS[tabName]}
          ${showBadge ? html`<span class="notification-badge" aria-hidden="true"></span>` : ''}
        </span>
        <span class="tab-copy">
          <span class="tab-label">${TAB_LABELS[tabName]}</span>
          <span class="tab-hint">${hint}</span>
        </span>
      </button>
    `;
  }

  private selectTab(tabName: TabName) {
    this.activeTab = tabName;
    this.dispatchEvent(
      new CustomEvent('tab-change', {
        detail: { tab: tabName },
        bubbles: true,
        composed: true
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'blue-sidebar-nav': SidebarNav;
  }
}
