import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import './components/layout/sidebar-nav';
import './components/layout/bottom-tab-bar';
import './components/pages/home-page';
import './components/pages/job-board-page';
import './components/pages/login-page';
import './components/pages/profile-page';
import './components/pages/signup-page';
import './components/pages/welcome-page';
import { router, type PageType } from './utils/router';
import { store } from './utils/store';

@customElement('blue-app')
export class BlueApp extends LitElement {
  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
    }

    .shell {
      min-height: 100vh;
      position: relative;
      padding-bottom: 0;
    }

    .main {
      min-height: 100vh;
    }

    .main.with-sidebar {
      min-height: 100vh;
    }

    @media (min-width: 1024px) {
      .shell {
        min-height: 100vh;
      }

      .main.with-sidebar {
        margin-left: 250px;
        min-height: 100vh;
      }
    }
  `;

  @state() private currentPage: PageType = router.getCurrentPage();
  @state() private activeTab: PageType = 'home';

  connectedCallback(): void {
    super.connectedCallback();
    this.registerServiceWorker();
    window.addEventListener('route-change', this.onRouteChange as EventListener);
  }

  private registerServiceWorker(): void {
    if ('serviceWorker' in navigator && import.meta.env.PROD) {
      window.addEventListener('load', async () => {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js');
          console.log('Service Worker registered successfully:', registration);
        } catch (error) {
          console.error('Service Worker registration failed:', error);
        }
      });
    }
  }

  disconnectedCallback(): void {
    window.removeEventListener('route-change', this.onRouteChange as EventListener);
    super.disconnectedCallback();
  }

  render() {
    const showTabs = [
      'home',
      'jobs',
      'network',
      'notifications',
      'profile',
      'documents',
      'donation',
      'news',
      'calendar'
    ].includes(this.currentPage);

    return html`
      <div
        class="shell"
        @navigate=${this.handleNavigate}
        @login-success=${this.handleLoginSuccess}
        @signup-success=${this.handleSignupSuccess}
        @logout=${this.handleLogout}
      >
        ${showTabs
          ? html`<blue-sidebar-nav
              .activeTab=${this.activeTab as 'jobs' | 'network' | 'home' | 'notifications' | 'profile'}
              .notificationCount=${store.getState().notifications}
              @tab-change=${this.handleTabChange}
            ></blue-sidebar-nav>`
          : ''}
        <main class="main ${showTabs ? 'with-sidebar' : ''}">${this.renderCurrentPage()}</main>
        ${showTabs
          ? html`<blue-bottom-tab-bar
              .activeTab=${this.activeTab as 'jobs' | 'network' | 'home' | 'notifications' | 'profile'}
              .notificationCount=${store.getState().notifications}
              @tab-change=${this.handleTabChange}
            ></blue-bottom-tab-bar>`
          : ''}
      </div>
    `;
  }

  private renderCurrentPage() {
    switch (this.currentPage) {
      case 'welcome':
        return html`<blue-welcome-page></blue-welcome-page>`;
      case 'login':
        return html`<blue-login-page></blue-login-page>`;
      case 'signup':
        return html`<blue-signup-page></blue-signup-page>`;
      case 'home':
        return html`
          <blue-home-page
            .userName=${store.getState().user ?? 'Stephany'}
            userClass="Class of 2026"
            userMajor="Information Technology"
          ></blue-home-page>
        `;
      case 'jobs':
        return html`<blue-job-board-page></blue-job-board-page>`;
      case 'network':
      case 'notifications':
      case 'documents':
      case 'donation':
      case 'news':
      case 'calendar':
        return html`
          <blue-home-page
            .userName=${store.getState().user ?? 'Stephany'}
            userClass="Class of 2026"
            userMajor="Information Technology"
          ></blue-home-page>
        `;
      case 'profile':
      case 'edit-profile':
        return html`
          <blue-profile-page
            .userName=${store.getState().user ?? 'Stephany'}
            userClass="Class of 2026"
            userMajor="Information Technology"
          ></blue-profile-page>
        `;
      default:
        return html`<blue-welcome-page></blue-welcome-page>`;
    }
  }

  private handleNavigate = (event: CustomEvent<{ page: string }>) => {
    const page = event.detail.page;
    if (!this.isPageType(page)) {
      return;
    }

    router.navigate(page);
    if (['home', 'jobs', 'network', 'notifications', 'profile'].includes(page)) {
      this.activeTab = page;
    }
  };

  private handleTabChange = (event: CustomEvent<{ tab: PageType }>) => {
    const tab = event.detail.tab;
    this.activeTab = tab;
    router.navigate(tab);
  };

  private handleLoginSuccess = (event: CustomEvent<{ user: string }>) => {
    store.setState({ isLoggedIn: true, user: event.detail.user });
  };

  private handleSignupSuccess = (event: CustomEvent<{ fullName: string }>) => {
    store.setState({ isLoggedIn: true, user: event.detail.fullName });
  };

  private handleLogout = () => {
    store.setState({ isLoggedIn: false, user: null });
    this.activeTab = 'home';
    router.navigate('login');
  };

  private onRouteChange = (event: CustomEvent<{ page: PageType }>) => {
    this.currentPage = event.detail.page;
  };

  private isPageType(value: string): value is PageType {
    return [
      'welcome',
      'login',
      'signup',
      'home',
      'jobs',
      'network',
      'notifications',
      'profile',
      'documents',
      'donation',
      'news',
      'calendar',
      'edit-profile'
    ].includes(value);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'blue-app': BlueApp;
  }
}
