import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { validateEmail, validateFullName, validateGraduationYear, validatePassword } from '../../utils/validation';

@customElement('blue-signup-page')
export class SignupPage extends LitElement {
  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      background:
        linear-gradient(135deg, rgb(0 61 122 / 40%) 0%, rgb(0 61 122 / 20%) 100%),
        radial-gradient(circle at top left, #c5cff6 0%, #d8dff8 30%, #f0f3ff 100%);
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
      color: var(--color-white);
    }

    .container {
      padding: 4px 16px 24px;
    }

    .back-button {
      background: none;
      border: none;
      font-size: 28px;
      cursor: pointer;
      color: var(--color-white);
      line-height: 1;
      margin-bottom: 6px;
    }

    .heading {
      text-align: center;
      font-size: 30px;
      font-weight: 700;
      letter-spacing: 2px;
      color: var(--color-white);
      margin-top: 8px;
      text-transform: uppercase;
      font-family: var(--font-family-serif);
    }

    .subheading {
      text-align: center;
      font-size: 14px;
      color: var(--color-white);
      margin-top: 8px;
    }

    .avatar-placeholder {
      width: 86px;
      height: 86px;
      border-radius: 50%;
      background: white;
      border: 2px solid var(--color-navy);
      margin: 16px auto;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-navy);
    }

    .form-section {
      background: rgb(255 255 255 / 92%);
      padding: 20px;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
      backdrop-filter: blur(2px);
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
      text-transform: uppercase;
    }

    .form-input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .form-input {
      width: 100%;
      height: 48px;
      padding: 12px 44px 12px 16px;
      border: 1px solid #d4dcf2;
      border-radius: var(--radius-md);
      font-size: 14px;
      font-family: inherit;
      background: #fff;
    }

    .form-input.error {
      border-color: var(--color-error);
    }

    .form-input:focus {
      outline: none;
      border-color: var(--color-navy);
      box-shadow: 0 0 0 3px rgb(0 61 122 / 10%);
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

    .biometrics-card {
      background: #e7eef9;
      border-radius: var(--radius-lg);
      padding: 14px;
      display: flex;
      gap: 12px;
      align-items: flex-start;
      margin-bottom: 20px;
    }

    .biometrics-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--color-navy);
      color: white;
      display: grid;
      place-items: center;
      flex-shrink: 0;
    }

    .biometrics-content h3 {
      font-size: 16px;
      font-weight: 700;
      color: var(--color-navy);
      margin: 0 0 4px 0;
    }

    .biometrics-content p {
      font-size: 12px;
      color: var(--color-gray-600);
      margin: 0;
      line-height: 1.5;
    }

    .biometrics-toggle {
      margin-left: auto;
      align-self: center;
    }

    .toggle-switch {
      width: 44px;
      height: 24px;
      border-radius: 12px;
      background: var(--color-gray-300);
      border: none;
      cursor: pointer;
      position: relative;
      transition: background 0.2s;
    }

    .toggle-switch.active {
      background: var(--color-navy);
    }

    .toggle-switch::after {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      background: white;
      border-radius: 50%;
      top: 2px;
      left: 2px;
      transition: left 0.2s;
    }

    .toggle-switch.active::after {
      left: 22px;
    }

    .button-login {
      width: 100%;
      height: 50px;
      background: var(--color-navy);
      color: white;
      border: none;
      border-radius: var(--radius-lg);
      font-size: 16px;
      font-weight: 700;
      cursor: pointer;
    }

    .button-login:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    @media (min-width: 768px) {
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 8px 22px 26px;
      }

      .form-section {
        padding: 24px;
        max-width: 1200px;
      }
    }

    @media (min-width: 1024px) {
      .container {
        padding: 14px 28px 32px;
      }

      .heading {
        font-size: clamp(40px, 3.2vw, 56px);
      }

      .subheading {
        font-size: 16px;
      }

      .form-section {
        padding: 28px;
      }
    }
  `;

  @state() private fullName = '';
  @state() private graduationYear = '';
  @state() private email = '';
  @state() private password = '';
  @state() private enableBiometrics = false;
  @state() private showPassword = false;
  @state() private errors: Record<string, string> = {};
  @state() private isLoading = false;

  render() {
    return html`
      <div class="status-bar">
        <span>9:41</span>
        <span>Signal WiFi Battery</span>
      </div>
      <div class="container">
        <button class="back-button" @click=${this.goBack} aria-label="Go back">&larr;</button>

        <h1 class="heading">Alumni Registration</h1>
        <p class="subheading">Register to reconnect with the Ateneo community</p>

        <div class="avatar-placeholder">${this.userIcon()}</div>

        <form class="form-section" @submit=${this.handleSubmit}>
          <div class="form-group">
            <label class="form-label" for="fullName">Full Name</label>
            <div class="form-input-wrapper">
              <input
                id="fullName"
                type="text"
                class="form-input ${this.errors.fullName ? 'error' : ''}"
                placeholder="Juan dela Cruz"
                .value=${this.fullName}
                @input=${(e: Event) => this.handleInput('fullName', (e.target as HTMLInputElement).value)}
              />
            </div>
            ${this.errors.fullName ? html`<div class="form-error">${this.errors.fullName}</div>` : ''}
          </div>

          <div class="form-group">
            <label class="form-label" for="graduationYear">Graduation Year</label>
            <div class="form-input-wrapper">
              <input
                id="graduationYear"
                type="text"
                inputmode="numeric"
                class="form-input ${this.errors.graduationYear ? 'error' : ''}"
                placeholder="YYYY"
                .value=${this.graduationYear}
                @input=${(e: Event) => this.handleInput('graduationYear', (e.target as HTMLInputElement).value)}
              />
            </div>
            ${this.errors.graduationYear ? html`<div class="form-error">${this.errors.graduationYear}</div>` : ''}
          </div>

          <div class="form-group">
            <label class="form-label" for="email">Email</label>
            <div class="form-input-wrapper">
              <input
                id="email"
                type="email"
                class="form-input ${this.errors.email ? 'error' : ''}"
                placeholder="example@addu.edu.ph"
                .value=${this.email}
                @input=${(e: Event) => this.handleInput('email', (e.target as HTMLInputElement).value)}
              />
            </div>
            ${this.errors.email ? html`<div class="form-error">${this.errors.email}</div>` : ''}
          </div>

          <div class="form-group">
            <label class="form-label" for="password">Password</label>
            <div class="form-input-wrapper">
              <input
                id="password"
                type=${this.showPassword ? 'text' : 'password'}
                class="form-input ${this.errors.password ? 'error' : ''}"
                placeholder="Enter your password"
                .value=${this.password}
                @input=${(e: Event) => this.handleInput('password', (e.target as HTMLInputElement).value)}
              />
              <button type="button" class="password-toggle" @click=${this.togglePassword} aria-label="Toggle password visibility">
                ${this.eyeIcon()}
              </button>
            </div>
            ${this.errors.password ? html`<div class="form-error">${this.errors.password}</div>` : ''}
          </div>

          <div class="biometrics-card">
            <div class="biometrics-icon">${this.fingerprintIcon()}</div>
            <div class="biometrics-content">
              <h3>Enable Biometrics</h3>
              <p>Secure your identity with FaceID or TouchID to ensure account recovery even without email access.</p>
            </div>
            <div class="biometrics-toggle">
              <button
                type="button"
                class="toggle-switch ${this.enableBiometrics ? 'active' : ''}"
                @click=${this.toggleBiometrics}
                aria-pressed=${String(this.enableBiometrics)}
                aria-label="Enable biometrics"
              ></button>
            </div>
          </div>

          <button type="submit" class="button-login" ?disabled=${this.isLoading}>
            ${this.isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
      </div>
    `;
  }

  private handleInput(field: string, value: string) {
    (this as unknown as Record<string, unknown>)[field] = value;
    if (this.errors[field]) {
      const next = { ...this.errors };
      delete next[field];
      this.errors = next;
    }
  }

  private togglePassword = () => {
    this.showPassword = !this.showPassword;
  };

  private toggleBiometrics = () => {
    this.enableBiometrics = !this.enableBiometrics;
  };

  private handleSubmit = (event: Event) => {
    event.preventDefault();
    this.errors = {};

    if (!this.fullName.trim()) {
      this.errors = { ...this.errors, fullName: 'Full name is required' };
    } else if (!validateFullName(this.fullName)) {
      this.errors = { ...this.errors, fullName: 'Please enter a valid full name' };
    }

    if (!this.graduationYear) {
      this.errors = { ...this.errors, graduationYear: 'Graduation year is required' };
    } else if (!validateGraduationYear(this.graduationYear)) {
      this.errors = { ...this.errors, graduationYear: 'Invalid graduation year' };
    }

    if (!this.email) {
      this.errors = { ...this.errors, email: 'Email is required' };
    } else if (!validateEmail(this.email)) {
      this.errors = { ...this.errors, email: 'Invalid email format' };
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
        new CustomEvent('signup-success', {
          detail: {
            fullName: this.fullName,
            email: this.email,
            biometricsEnabled: this.enableBiometrics
          },
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

  private goBack = () => {
    this.dispatchEvent(
      new CustomEvent('navigate', {
        detail: { page: 'login' },
        bubbles: true,
        composed: true
      })
    );
  };

  private userIcon() {
    return html`<svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`;
  }

  private eyeIcon() {
    return html`<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
  }

  private fingerprintIcon() {
    return html`<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 11a2 2 0 0 1 2 2v4"></path><path d="M10 13v4"></path><path d="M8 9a4 4 0 0 1 8 0"></path><path d="M6 9a6 6 0 0 1 12 0"></path><path d="M12 3a8 8 0 0 1 8 8"></path></svg>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'blue-signup-page': SignupPage;
  }
}
