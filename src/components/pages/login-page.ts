import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { validatePassword } from '../../utils/validation';

@customElement('blue-login-page')
export class LoginPage extends LitElement {
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

    .logo-section {
      text-align: center;
      padding-top: 20px;
    }

    .logo {
      width: 96px;
      height: 96px;
      margin: 0 auto;
      color: var(--color-navy);
    }

    .heading {
      text-align: center;
      font-size: 34px;
      font-weight: 700;
      color: var(--color-navy);
      margin-top: 12px;
    }

    .subtitle {
      text-align: center;
      color: #8396b3;
      font-size: 14px;
      margin-top: 6px;
    }

    .form-section {
      background: white;
      padding: 24px;
      margin-top: 6px;
    }

    .form-group {
      margin-bottom: 16px;
    }

    .form-label {
      display: block;
      font-size: 12px;
      font-weight: 700;
      color: var(--color-navy);
      margin-bottom: 8px;
      letter-spacing: 0.4px;
    }

    .form-input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .form-input {
      width: 100%;
      height: 54px;
      padding: 12px 44px 12px 42px;
      border: 1px solid #c4cde2;
      border-radius: var(--radius-lg);
      font-size: 14px;
      font-family: inherit;
      transition: border-color 0.2s;
    }

    .form-input:focus {
      outline: none;
      border-color: var(--color-navy);
      box-shadow: 0 0 0 3px rgb(0 61 122 / 10%);
    }

    .form-input.error {
      border-color: var(--color-error);
    }

    .form-icon {
      position: absolute;
      left: 14px;
      width: 18px;
      height: 18px;
      color: #8da0bf;
      pointer-events: none;
    }

    .form-error {
      font-size: 12px;
      color: var(--color-error);
      margin-top: 4px;
    }

    .password-toggle {
      position: absolute;
      right: 10px;
      border: none;
      background: none;
      cursor: pointer;
      color: #94a3b8;
      width: 28px;
      height: 28px;
      display: grid;
      place-items: center;
    }

    .remember-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 4px 0 16px;
    }

    .checkbox-group {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .checkbox-group input {
      width: 18px;
      height: 18px;
      cursor: pointer;
    }

    .checkbox-label {
      font-size: 14px;
      color: var(--color-gray-700);
      cursor: pointer;
    }

    .forgot-password button {
      font-size: 13px;
      color: var(--color-navy);
      background: none;
      border: none;
      cursor: pointer;
      font-weight: 700;
    }

    .button-login,
    .button-biometric {
      width: 100%;
      height: 50px;
      background: var(--color-navy);
      color: white;
      border: none;
      border-radius: var(--radius-lg);
      font-size: 16px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: background 0.2s;
    }

    .button-login {
      margin-bottom: 16px;
    }

    .button-login:hover:not(:disabled),
    .button-biometric:hover {
      background: var(--color-navy-light);
    }

    .button-login:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .divider {
      display: flex;
      align-items: center;
      gap: 16px;
      margin: 16px 0;
      font-size: 14px;
      color: var(--color-gray-500);
    }

    .divider::before,
    .divider::after {
      content: '';
      flex: 1;
      height: 1px;
      background: var(--color-gray-200);
    }

    .registration-card {
      background: #ebf0ff;
      border-radius: var(--radius-lg);
      padding: 16px;
      text-align: center;
      font-size: 14px;
      color: var(--color-gray-700);
      margin-top: 20px;
      line-height: 1.6;
    }

    .registration-card button {
      color: var(--color-navy);
      border: none;
      background: none;
      font-weight: 700;
      cursor: pointer;
      margin-top: 8px;
    }

    .footer {
      text-align: center;
      font-size: 12px;
      color: var(--color-gray-500);
      padding: 20px 24px 30px;
      margin-top: 20px;
    }

    @media (min-width: 768px) {
      .logo-section {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px 24px 0;
      }

      .form-section {
        max-width: 1200px;
        margin: 12px auto 0;
        width: 100%;
        padding: 28px;
        border-radius: var(--radius-xl);
        box-shadow: var(--shadow-md);
      }

      .footer {
        max-width: 1200px;
        margin: 8px auto 0;
        padding: 16px 24px 28px;
      }
    }

    @media (min-width: 1024px) {
      .heading {
        font-size: clamp(42px, 3.3vw, 58px);
      }

      .subtitle {
        font-size: 16px;
      }

      .logo {
        width: 110px;
        height: 110px;
      }

      .form-section {
        padding: 30px;
      }
    }
  `;

  @state() private emailOrId = '';
  @state() private password = '';
  @state() private rememberMe = false;
  @state() private showPassword = false;
  @state() private errors: Record<string, string> = {};
  @state() private isLoading = false;

  render() {
    return html`
      <div class="status-bar">
        <span>9:41</span>
        <span>Signal WiFi Battery</span>
      </div>

      <div class="logo-section">
        <div class="logo">${this.renderLogo()}</div>
        <h1 class="heading">Welcome, Blue Knight!</h1>
        <p class="subtitle">Enter your credentials to access the portal</p>
      </div>

      <form class="form-section" @submit=${this.handleSubmit}>
        <div class="form-group">
          <label class="form-label" for="emailOrId">Alumni ID / Email</label>
          <div class="form-input-wrapper">
            <span class="form-icon" aria-hidden="true">${this.userIcon()}</span>
            <input
              id="emailOrId"
              type="text"
              class="form-input ${this.errors.emailOrId ? 'error' : ''}"
              placeholder="Enter your ID or email"
              .value=${this.emailOrId}
              @input=${this.onEmailInput}
            />
          </div>
          ${this.errors.emailOrId ? html`<div class="form-error">${this.errors.emailOrId}</div>` : ''}
        </div>

        <div class="form-group">
          <label class="form-label" for="password">Password</label>
          <div class="form-input-wrapper">
            <span class="form-icon" aria-hidden="true">${this.lockIcon()}</span>
            <input
              id="password"
              type=${this.showPassword ? 'text' : 'password'}
              class="form-input ${this.errors.password ? 'error' : ''}"
              placeholder="Enter your password"
              .value=${this.password}
              @input=${this.onPasswordInput}
            />
            <button type="button" class="password-toggle" @click=${this.togglePassword} aria-label="Toggle password visibility">
              ${this.eyeIcon()}
            </button>
          </div>
          ${this.errors.password ? html`<div class="form-error">${this.errors.password}</div>` : ''}
        </div>

        <div class="remember-row">
          <div class="checkbox-group">
            <input id="remember" type="checkbox" .checked=${this.rememberMe} @change=${this.onRememberChange} />
            <label for="remember" class="checkbox-label">Remember Me</label>
          </div>
          <div class="forgot-password">
            <button type="button" @click=${this.goToForgotPassword}>Forgot Password?</button>
          </div>
        </div>

        <button type="submit" class="button-login" ?disabled=${this.isLoading}>
          ${this.isLoading ? 'Logging in...' : 'Login'}
          <span aria-hidden="true">&rarr;</span>
        </button>

        <div class="divider">OR</div>

        <button type="button" class="button-biometric" @click=${this.handleBiometric}>Continue with FaceID</button>

        <div class="registration-card">
          <p>Are you a graduate of AdDU but do not have an account yet?</p>
          <button type="button" @click=${this.goToSignup}>Register as Alumni &rarr;</button>
        </div>
      </form>

      <div class="footer">
        <p>&copy; 2024 Ateneo de Davao University. All Rights Reserved.</p>
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

  private onEmailInput = (event: Event) => {
    this.emailOrId = (event.target as HTMLInputElement).value;
    this.clearError('emailOrId');
  };

  private onPasswordInput = (event: Event) => {
    this.password = (event.target as HTMLInputElement).value;
    this.clearError('password');
  };

  private onRememberChange = (event: Event) => {
    this.rememberMe = (event.target as HTMLInputElement).checked;
  };

  private togglePassword = () => {
    this.showPassword = !this.showPassword;
  };

  private handleSubmit = (event: Event) => {
    event.preventDefault();
    this.errors = {};

    if (!this.emailOrId.trim()) {
      this.errors = { ...this.errors, emailOrId: 'Email or ID is required' };
    }

    if (!this.password) {
      this.errors = { ...this.errors, password: 'Password is required' };
    } else if (!validatePassword(this.password)) {
      this.errors = { ...this.errors, password: 'Password must be at least 8 characters' };
    }

    if (Object.keys(this.errors).length > 0) {
      return;
    }

    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.dispatchEvent(
        new CustomEvent('login-success', {
          detail: { user: this.emailOrId },
          bubbles: true,
          composed: true
        })
      );

      this.dispatchEvent(
        new CustomEvent('navigate', {
          detail: { page: 'home' },
          bubbles: true,
          composed: true
        })
      );
    }, 500);
  };

  private handleBiometric = () => {
    this.dispatchEvent(
      new CustomEvent('navigate', {
        detail: { page: 'home' },
        bubbles: true,
        composed: true
      })
    );
  };

  private goToSignup = () => {
    this.dispatchEvent(
      new CustomEvent('navigate', {
        detail: { page: 'signup' },
        bubbles: true,
        composed: true
      })
    );
  };

  private goToForgotPassword = () => {
    window.alert('Forgot Password feature coming soon');
  };

  private clearError(key: string) {
    if (!this.errors[key]) {
      return;
    }
    const next = { ...this.errors };
    delete next[key];
    this.errors = next;
  }

  private userIcon() {
    return html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`;
  }

  private lockIcon() {
    return html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`;
  }

  private eyeIcon() {
    return html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'blue-login-page': LoginPage;
  }
}
