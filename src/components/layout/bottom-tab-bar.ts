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

    @media (min-width: 1024px) {
      :host {
        display: none;
      }
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
      color: var(--color-white);
      cursor: pointer;
      position: relative;
      opacity: 0.6;
      transition: opacity 0.2s ease;
      font-family: inherit;
      padding: 0;
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
      color: var(--color-white);
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
  `;

  @property({ type: String })
  activeTab: TabName = 'home';

  @property({ type: Number })
  notificationCount = 0;

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
        aria-label=${TAB_LABELS[tabName]}
        aria-current=${isActive ? 'page' : 'false'}
      >
        <span class="tab-icon">
          ${ICONS[tabName]}
          ${showBadge ? html`<span class="notification-badge" aria-hidden="true"></span>` : ''}
        </span>
        <span class="tab-label">${TAB_LABELS[tabName]}</span>
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
    'blue-bottom-tab-bar': BottomTabBar;
  }
}
