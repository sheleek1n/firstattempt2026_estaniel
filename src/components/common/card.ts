import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type CardVariant = 'default' | 'job' | 'news' | 'event';
type CardBorderColor = '' | 'navy' | 'green' | 'orange' | 'blue';

@customElement('blue-card')
export class BlueCard extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .card {
      background: var(--color-white);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-sm);
      overflow: hidden;
      transition: all 0.2s ease;
      border-left: 4px solid transparent;
    }

    .card.clickable {
      cursor: pointer;
    }

    .card.clickable:hover {
      box-shadow: var(--shadow-lg);
      transform: translateY(-2px);
    }

    .card-content {
      padding: var(--space-lg);
    }

    .card.border-navy {
      border-left-color: var(--color-navy);
    }

    .card.border-green {
      border-left-color: var(--color-success);
    }

    .card.border-orange {
      border-left-color: #f97316;
    }

    .card.border-blue {
      border-left-color: var(--color-info);
    }

    .card.job {
      border-left-width: 6px;
    }

    .job-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: var(--space-md);
    }

    .job-title {
      font-size: var(--font-size-base);
      font-weight: var(--font-weight-bold);
      color: var(--color-navy);
      margin: 0;
    }

    .job-company {
      font-size: var(--font-size-sm);
      color: var(--color-gray-600);
      margin: 4px 0 var(--space-md) 0;
    }

    .job-badges {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-sm);
      margin-bottom: var(--space-md);
    }

    .job-meta {
      display: flex;
      align-items: center;
      gap: var(--space-md);
      font-size: var(--font-size-sm);
      color: var(--color-gray-600);
      margin-bottom: var(--space-md);
    }

    .job-meta-item {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .job-salary {
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-bold);
      color: var(--color-navy);
      margin-bottom: var(--space-md);
    }

    .job-action {
      display: flex;
      gap: var(--space-sm);
    }

    .card.news {
      border: none;
      text-align: center;
    }

    .news-image {
      width: 100%;
      height: 120px;
      background: var(--color-gray-100);
      object-fit: cover;
    }

    .news-title {
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-bold);
      color: var(--color-navy);
      margin: var(--space-md) 0 var(--space-sm) 0;
      line-height: 1.4;
    }

    .news-snippet {
      font-size: 12px;
      color: var(--color-gray-600);
      line-height: 1.4;
    }

    .card.event {
      border: none;
    }

    .event-date {
      background: var(--color-navy);
      color: var(--color-white);
      padding: var(--space-md) var(--space-lg);
      border-radius: var(--radius-md);
      font-size: 14px;
      font-weight: var(--font-weight-bold);
      margin-bottom: var(--space-md);
      text-align: center;
    }

    .event-title {
      font-size: var(--font-size-base);
      font-weight: var(--font-weight-bold);
      color: var(--color-navy);
      margin: 0;
    }

    .event-meta {
      font-size: var(--font-size-sm);
      color: var(--color-gray-600);
      margin-top: 4px;
    }
  `;

  @property({ type: String }) variant: CardVariant = 'default';
  @property({ type: String, attribute: 'border-color' }) borderColor: CardBorderColor = '';
  @property({ type: Boolean }) clickable = false;

  render() {
    const classes = `card ${this.variant} ${this.borderColor ? `border-${this.borderColor}` : ''} ${
      this.clickable ? 'clickable' : ''
    }`;

    return html`
      <article class=${classes} @click=${this.handleClick}>
        <div class="card-content">
          <slot></slot>
        </div>
      </article>
    `;
  }

  private handleClick = () => {
    if (!this.clickable) {
      return;
    }

    this.dispatchEvent(
      new CustomEvent('card-click', {
        bubbles: true,
        composed: true
      })
    );
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'blue-card': BlueCard;
  }
}
