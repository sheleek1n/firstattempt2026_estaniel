import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('blue-input')
export class BlueInput extends LitElement {
  static styles = css`
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
      display: inline-flex;
      align-items: center;
    }

    .input {
      width: 100%;
      height: 48px;
      padding: var(--space-md) var(--space-lg);
      border: 1px solid var(--color-gray-200);
      border-radius: var(--radius-md);
      font-size: var(--font-size-base);
      font-family: inherit;
      transition: all 0.2s ease;
      background: var(--color-white);
    }

    .input.has-icon {
      padding-left: 40px;
    }

    .input.is-password {
      padding-right: 42px;
    }

    .input:focus {
      outline: none;
      border-color: var(--color-navy);
      box-shadow: 0 0 0 3px rgb(0 61 122 / 10%);
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
      box-shadow: 0 0 0 3px rgb(239 68 68 / 10%);
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
  `;

  @property({ type: String }) type = 'text';
  @property({ type: String }) name = '';
  @property({ type: String }) placeholder = '';
  @property({ type: String }) value = '';
  @property({ type: String }) label = '';
  @property({ type: String }) icon = '';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) required = false;
  @property({ type: String, attribute: 'error-message' }) errorMessage = '';
  @property({ type: String }) inputmode = 'text';

  @state() private showPassword = false;

  render() {
    const hasError = this.errorMessage.length > 0;
    const passwordField = this.type === 'password';
    const actualType = passwordField ? (this.showPassword ? 'text' : 'password') : this.type;

    return html`
      <div class="input-group">
        ${this.label ? html`<label class="label">${this.label}</label>` : ''}

        <div class="input-wrapper">
          ${this.icon ? html`<span class="input-icon" aria-hidden="true">${this.icon}</span>` : ''}

          <input
            class="input ${this.icon ? 'has-icon' : ''} ${hasError ? 'has-error' : ''} ${passwordField ? 'is-password' : ''}"
            type=${actualType}
            name=${this.name}
            placeholder=${this.placeholder}
            .value=${this.value}
            ?disabled=${this.disabled}
            ?required=${this.required}
            inputmode=${this.inputmode}
            @input=${this.handleInput}
            @blur=${this.handleBlur}
          />

          ${passwordField
            ? html`<button type="button" class="toggle-password" @click=${this.togglePasswordVisibility}>
                ${this.showPassword ? '👁️‍🗨️' : '👁️'}
              </button>`
            : ''}
        </div>

        ${hasError ? html`<span class="error-message">${this.errorMessage}</span>` : ''}
      </div>
    `;
  }

  private handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
    this.dispatchEvent(
      new CustomEvent('input-change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true
      })
    );
  };

  private handleBlur = () => {
    this.dispatchEvent(
      new CustomEvent('input-blur', {
        bubbles: true,
        composed: true
      })
    );
  };

  private togglePasswordVisibility = () => {
    this.showPassword = !this.showPassword;
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'blue-input': BlueInput;
  }
}
