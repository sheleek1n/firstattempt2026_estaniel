import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type BadgeVariant = 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
type BadgeSize = 'sm' | 'md';

@customElement('blue-badge')
export class BlueBadge extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-full);
      font-size: var(--font-size-xs);
      font-weight: var(--font-weight-bold);
      white-space: nowrap;
      padding: var(--space-sm) var(--space-md);
    }

    .badge.sm {
      padding: 2px 8px;
      font-size: 11px;
    }

    .badge.primary {
      background: rgb(0 61 122 / 10%);
      color: var(--color-navy);
    }

    .badge.success {
      background: rgb(16 185 129 / 10%);
      color: #059669;
    }

    .badge.warning {
      background: rgb(245 158 11 / 10%);
      color: #d97706;
    }

    .badge.error {
      background: rgb(239 68 68 / 10%);
      color: var(--color-error);
    }

    .badge.info {
      background: rgb(59 130 246 / 10%);
      color: #2563eb;
    }

    .badge.neutral {
      background: var(--color-gray-200);
      color: var(--color-gray-700);
    }
  `;

  @property({ type: String }) variant: BadgeVariant = 'neutral';
  @property({ type: String }) size: BadgeSize = 'md';

  render() {
    const classes = `badge ${this.variant} ${this.size}`;
    return html`
      <span class=${classes}>
        <slot></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'blue-badge': BlueBadge;
  }
}
