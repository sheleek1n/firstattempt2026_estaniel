import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonType = 'button' | 'submit' | 'reset';

@customElement('blue-button')
export class BlueButton extends LitElement {
  static styles = css`
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

    .button.primary {
      background: var(--color-navy);
      color: var(--color-white);
    }

    .button.primary:hover:not(:disabled) {
      background: var(--color-navy-light);
      box-shadow: 0 4px 12px rgb(0 61 122 / 20%);
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
      background: rgb(0 61 122 / 5%);
    }

    .button.danger {
      background: var(--color-error);
      color: var(--color-white);
    }

    .button.danger:hover:not(:disabled) {
      background: #dc2626;
    }

    .button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .button.loading {
      opacity: 0.75;
      pointer-events: none;
    }

    .spinner {
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 2px solid rgb(255 255 255 / 30%);
      border-top-color: var(--color-white);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `;

  @property({ type: String }) variant: ButtonVariant = 'primary';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean, attribute: 'full-width', reflect: true }) fullWidth = false;
  @property({ type: Boolean }) loading = false;
  @property({ type: String }) size: ButtonSize = 'md';
  @property({ type: String }) type: ButtonType = 'button';

  render() {
    const classes = `button ${this.variant} ${this.size} ${this.loading ? 'loading' : ''}`;

    return html`
      <button part="button" class=${classes} type=${this.type} ?disabled=${this.disabled || this.loading} @click=${this.handleClick}>
        ${this.loading ? html`<span class="spinner" aria-hidden="true"></span>` : ''}
        <slot></slot>
      </button>
    `;
  }

  private handleClick = (e: MouseEvent) => {
    if (this.disabled || this.loading) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    e.stopPropagation();
    this.dispatchEvent(
      new CustomEvent('click', {
        bubbles: true,
        composed: true
      })
    );
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'blue-button': BlueButton;
  }
}
