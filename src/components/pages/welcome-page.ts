import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('blue-welcome-page')
export class WelcomePage extends LitElement {
  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      background: var(--color-white);
      overflow-y: auto;
      padding-bottom: 60px;
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

    .logo {
      width: 140px;
      height: 140px;
      margin: 36px auto 0;
      color: var(--color-navy);
    }

    .brand-name {
      text-align: center;
      font-size: 52px;
      font-weight: var(--font-weight-bold);
      letter-spacing: 2px;
      color: var(--color-navy);
      margin-top: 10px;
      font-family: var(--font-family-serif);
      text-transform: uppercase;
      line-height: 1;
    }

    .tagline {
      text-align: center;
      font-size: 36px;
      font-style: italic;
      color: var(--color-gold);
      margin-top: 10px;
      font-family: var(--font-family-serif);
    }

    .description {
      text-align: center;
      font-size: 14px;
      line-height: 1.7;
      color: var(--color-gray-700);
      padding: 0 28px;
      margin-top: 20px;
      max-width: 430px;
      margin-left: auto;
      margin-right: auto;
    }

    .feature-cards {
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-top: 12px;
    }

    .feature-card {
      background: #e2e4f6;
      border-radius: var(--radius-lg);
      padding: 14px;
      display: flex;
      align-items: center;
      gap: 10px;
      box-shadow: var(--shadow-sm);
    }

    .feature-icon {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
      color: var(--color-navy);
    }

    .feature-content h3 {
      font-size: 15px;
      font-weight: 700;
      color: var(--color-navy);
      margin: 0 0 2px 0;
    }

    .feature-content p {
      font-size: 12px;
      color: var(--color-gray-600);
      margin: 0;
    }

    .button-primary {
      background: var(--color-navy);
      color: white;
      border: none;
      padding: 16px 24px;
      border-radius: var(--radius-lg);
      font-size: 36px;
      font-weight: 700;
      width: calc(100% - 48px);
      max-width: 380px;
      margin: 22px auto 0;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      cursor: pointer;
      transition: background 0.2s ease;
      box-shadow: var(--shadow-lg);
      font-family: var(--font-family);
    }

    .button-primary:hover {
      background: var(--color-navy-light);
    }

    .secondary-link {
      text-align: center;
      margin-top: 16px;
      font-size: 30px;
      color: var(--color-gray-700);
    }

    .secondary-link button {
      color: var(--color-navy);
      text-decoration: none;
      font-weight: 700;
      cursor: pointer;
      border: none;
      background: none;
      padding: 0;
      font: inherit;
    }

    @media (max-width: 600px) {
      .brand-name {
        font-size: 24px;
      }

      .tagline {
        font-size: 18px;
      }

      .button-primary {
        font-size: 34px;
      }

      .secondary-link {
        font-size: 14px;
      }
    }

    @media (min-width: 768px) {
      .description {
        max-width: 760px;
      }

      .feature-cards {
        max-width: 1200px;
        margin: 16px auto 0;
        padding: 0 24px;
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 16px;
      }

      .button-primary {
        margin-top: 28px;
        font-size: 26px;
      }

      .secondary-link {
        font-size: 24px;
      }
    }

    @media (min-width: 1024px) {
      .brand-name {
        font-size: clamp(56px, 5vw, 74px);
      }

      .tagline {
        font-size: clamp(40px, 3vw, 52px);
      }

      .logo {
        width: 132px;
        height: 132px;
        margin-top: 28px;
      }

      .feature-cards {
        padding: 0 32px;
      }
    }
  `;

  @state() private showStatusBar = true;

  render() {
    return html`
      ${this.showStatusBar
        ? html`<div class="status-bar"><span>9:41</span><span>Signal WiFi Battery</span></div>`
        : ''}

      <div class="logo">${this.renderLogo()}</div>

      <h1 class="brand-name">Blue Links</h1>
      <p class="tagline">Rediscover. Reunite. Reconnect.</p>

      <p class="description">
        Step into the alumni portal with a Magis welcome. Rekindle the connections that defined your journey and
        keep your network alive with fellow blue graduates.
      </p>

      <div class="feature-cards">
        ${this.renderFeatureCard('Your Global Circle', 'Connect with fellow alumni across the globe.')}
        ${this.renderFeatureCard('Blue Graduates United', 'Stay linked to the Ateneo community worldwide.')}
      </div>

      <button class="button-primary" @click=${this.goToSignup}>
        Get Started
        <span aria-hidden="true">&rarr;</span>
      </button>

      <div class="secondary-link">
        Already have an account?
        <button @click=${this.goToLogin}>Log In</button>
      </div>
    `;
  }

  private renderLogo() {
    return html`
      <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" stroke-width="8" aria-hidden="true">
        <path d="M100 16L165 42v62c0 56-65 82-65 82S35 160 35 104V42Z"></path>
        <path d="M62 73c19-26 56-26 75 0"></path>
        <path d="M66 130c8-22 60-24 68 0"></path>
        <path d="M90 92l22-10-8 18 18 10-24 2z"></path>
        <circle cx="95" cy="104" r="8"></circle>
      </svg>
    `;
  }

  private renderFeatureCard(title: string, subtitle: string) {
    return html`
      <div class="feature-card">
        <span class="feature-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        </span>
        <div class="feature-content">
          <h3>${title}</h3>
          <p>${subtitle}</p>
        </div>
      </div>
    `;
  }

  private goToSignup() {
    this.dispatchEvent(
      new CustomEvent('navigate', {
        detail: { page: 'signup' },
        bubbles: true,
        composed: true
      })
    );
  }

  private goToLogin() {
    this.dispatchEvent(
      new CustomEvent('navigate', {
        detail: { page: 'login' },
        bubbles: true,
        composed: true
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'blue-welcome-page': WelcomePage;
  }
}
