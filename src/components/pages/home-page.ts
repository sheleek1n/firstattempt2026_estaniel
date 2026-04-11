import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import '../common/badge';
import '../common/button';
import '../common/card';

interface NewsItem {
  id: string;
  title: string;
  image: string;
  snippet: string;
}

interface EventItem {
  id: string;
  date: string;
  title: string;
  time: string;
  location: string;
}

@customElement('blue-home-page')
export class HomePage extends LitElement {
  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      background: var(--color-gray-50);
      overflow-y: auto;
      padding-bottom: 100px;
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
      background: var(--color-white);
    }

    .hero-section {
      background:
        linear-gradient(135deg, rgb(0 61 122 / 94%) 0%, rgb(30 90 150 / 92%) 100%),
        radial-gradient(circle at top right, rgb(255 255 255 / 20%), transparent 55%);
      color: var(--color-white);
      padding: var(--space-2xl) var(--space-lg);
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .hero-section::after {
      content: '';
      position: absolute;
      inset: 0;
      opacity: 0.15;
      pointer-events: none;
      background-image: repeating-linear-gradient(
          45deg,
          rgb(255 255 255 / 35%) 0,
          rgb(255 255 255 / 35%) 1px,
          transparent 1px,
          transparent 18px
        ),
        repeating-linear-gradient(-45deg, rgb(255 255 255 / 25%) 0, rgb(255 255 255 / 25%) 1px, transparent 1px, transparent 20px);
    }

    .hero-inner {
      position: relative;
      z-index: 1;
    }

    .university-name {
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-bold);
      letter-spacing: 1px;
      opacity: 0.92;
      margin-bottom: var(--space-md);
      text-transform: uppercase;
    }

    .greeting {
      font-size: 28px;
      font-weight: var(--font-weight-bold);
      margin: var(--space-md) 0;
      line-height: 1.2;
    }

    .user-info {
      font-size: var(--font-size-sm);
      opacity: 0.95;
      margin-bottom: var(--space-xl);
    }

    .avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: var(--color-coral);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      margin: 0 auto var(--space-xl);
      border: 3px solid rgb(255 255 255 / 30%);
      overflow: hidden;
    }

    .avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .action-buttons {
      display: flex;
      gap: var(--space-lg);
      margin-bottom: var(--space-xs);
    }

    .action-buttons blue-button {
      flex: 1;
    }

    .action-buttons blue-button::part(button) {
      border-color: rgb(255 255 255 / 70%);
      color: var(--color-white);
    }

    .dashboard-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-lg);
      padding: var(--space-lg);
      margin-top: -8px;
    }

    .dashboard-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-md);
      padding: var(--space-2xl) var(--space-lg);
      background: var(--color-white);
      border-radius: var(--radius-lg);
      text-align: center;
      cursor: pointer;
      transition: all 0.2s ease;
      border: 1px solid var(--color-gray-100);
      box-shadow: var(--shadow-sm);
    }

    .dashboard-item:hover {
      box-shadow: var(--shadow-lg);
      transform: translateY(-2px);
    }

    .dashboard-icon {
      font-size: 28px;
      width: 54px;
      height: 54px;
      border-radius: 14px;
      background: #eef2ff;
      color: var(--color-navy);
      display: grid;
      place-items: center;
    }

    .dashboard-label {
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-bold);
      color: var(--color-navy);
    }

    .section {
      padding: var(--space-lg);
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--space-lg);
    }

    .section-title {
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-bold);
      color: var(--color-navy);
      margin: 0;
    }

    .section-link {
      color: var(--color-navy);
      text-decoration: none;
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-bold);
      cursor: pointer;
      border: none;
      background: none;
      font-family: inherit;
    }

    .section-link:hover {
      text-decoration: underline;
    }

    .news-carousel {
      display: flex;
      overflow-x: auto;
      gap: var(--space-lg);
      scroll-snap-type: x mandatory;
      padding-bottom: var(--space-md);
      margin: 0 calc(var(--space-lg) * -1);
      padding-left: var(--space-lg);
      padding-right: var(--space-lg);
    }

    .news-carousel::-webkit-scrollbar {
      height: 4px;
    }

    .news-carousel::-webkit-scrollbar-track {
      background: var(--color-gray-100);
      border-radius: 2px;
    }

    .news-carousel::-webkit-scrollbar-thumb {
      background: var(--color-gray-400, #94a3b8);
      border-radius: 2px;
    }

    .news-item {
      flex: 0 0 280px;
      scroll-snap-align: start;
    }

    .news-cover {
      width: 100%;
      height: 120px;
      border-radius: 8px 8px 0 0;
      background: linear-gradient(135deg, #d4a574 0%, #e8a87c 100%);
    }

    .news-meta {
      display: flex;
      justify-content: flex-start;
      margin-bottom: var(--space-sm);
    }

    .news-title {
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-bold);
      color: var(--color-navy);
      margin: var(--space-md) 0 var(--space-sm) 0;
      line-height: 1.4;
      text-align: left;
    }

    .news-snippet {
      font-size: 12px;
      color: var(--color-gray-600);
      line-height: 1.4;
      text-align: left;
    }

    .events-list {
      display: flex;
      flex-direction: column;
      gap: var(--space-lg);
    }

    .event-item-row {
      display: flex;
      gap: var(--space-lg);
      align-items: flex-start;
      padding: var(--space-md);
      border-radius: var(--radius-lg);
      background: var(--color-white);
      box-shadow: var(--shadow-sm);
      cursor: pointer;
    }

    .event-date-badge {
      background: var(--color-navy);
      color: var(--color-white);
      padding: var(--space-md) var(--space-lg);
      border-radius: var(--radius-lg);
      text-align: center;
      flex-shrink: 0;
      min-width: 60px;
    }

    .event-date-day {
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-bold);
    }

    .event-date-month {
      font-size: var(--font-size-xs);
      opacity: 0.85;
      text-transform: uppercase;
    }

    .event-content {
      flex: 1;
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

    .event-arrow {
      color: var(--color-navy);
      font-size: 20px;
      align-self: center;
      font-weight: var(--font-weight-bold);
    }

    @media (max-width: 480px) {
      .action-buttons {
        gap: var(--space-sm);
      }

      .dashboard-grid {
        gap: var(--space-md);
      }

      .news-item {
        flex-basis: 250px;
      }
    }

    @media (min-width: 768px) {
      .hero-section,
      .dashboard-grid,
      .section {
        max-width: 1280px;
        margin-left: auto;
        margin-right: auto;
      }

      .dashboard-grid {
        grid-template-columns: repeat(4, minmax(0, 1fr));
        padding: var(--space-xl);
      }

      .section {
        padding: var(--space-xl);
      }

      .news-carousel {
        gap: var(--space-md);
      }
    }

    @media (min-width: 1024px) {
      :host {
        padding-bottom: 24px;
      }

      .hero-section {
        margin-top: 16px;
        border-radius: var(--radius-xl);
      }

      .news-carousel {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: var(--space-lg);
        overflow: visible;
        margin: 0;
        padding: 0;
        scroll-snap-type: none;
      }

      .news-item {
        flex: initial;
        width: 100%;
      }

      .events-list {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: var(--space-lg);
      }
    }
  `;

  @property({ type: String }) userName = 'Stephany';
  @property({ type: String }) userClass = 'Class of 2026';
  @property({ type: String }) userMajor = 'Information Technology';
  @property({ type: String }) userAvatar = '';

  @state() private currentNewsIndex = 0;
  @state() private newsList: NewsItem[] = [];
  @state() private upcomingEvents: EventItem[] = [];

  connectedCallback(): void {
    super.connectedCallback();
    this.loadNewsData();
    this.loadEventsData();
  }

  render() {
    return html`
      <div class="status-bar">
        <span>9:41</span>
        <span>Signal WiFi Battery</span>
      </div>

      <div class="hero-section">
        <div class="hero-inner">
          <div class="university-name">Ateneo De Davao Blue Knight</div>

          <div class="avatar">
            ${this.userAvatar ? html`<img src=${this.userAvatar} alt="Profile avatar" />` : html`<span>👩‍🎓</span>`}
          </div>

          <h1 class="greeting">Welcome back, ${this.userName}!</h1>
          <div class="user-info">${this.userClass} • ${this.userMajor}</div>

          <div class="action-buttons">
            <blue-button variant="outline" size="md" @click=${() => this.navigateTo('profile')}>Update Profile</blue-button>
            <blue-button variant="outline" size="md" @click=${() => this.navigateTo('profile')}>Digital ID</blue-button>
          </div>
        </div>
      </div>

      <div class="dashboard-grid">
        ${this.renderDashboardItem('📄', 'Documents', 'documents')}
        ${this.renderDashboardItem('💼', 'Job Board', 'jobs')}
        ${this.renderDashboardItem('🤝', 'Donation', 'donation')}
        ${this.renderDashboardItem('👥', 'Network', 'network')}
      </div>

      <div class="section">
        <div class="section-header">
          <h2 class="section-title">Latest News</h2>
          <button class="section-link" @click=${() => this.navigateTo('news')}>View All</button>
        </div>

        <div class="news-carousel" @scroll=${this.handleNewsScroll}>
          ${this.newsList.map(
            (news, index) => html`
              <div class="news-item">
                <blue-card variant="news" clickable @card-click=${() => this.navigateTo('news')}>
                  <div class="news-cover" style=${news.image ? `background: url(${news.image}) center/cover` : ''}></div>
                  <h4 class="news-title">${news.title}</h4>
                  <p class="news-snippet">${news.snippet}</p>
                  <div class="news-meta">
                    <blue-badge variant=${index === this.currentNewsIndex ? 'primary' : 'neutral'} size="sm">
                      ${index === this.currentNewsIndex ? 'Featured' : 'Update'}
                    </blue-badge>
                  </div>
                </blue-card>
              </div>
            `
          )}
        </div>
      </div>

      <div class="section">
        <div class="section-header">
          <h2 class="section-title">Upcoming Events</h2>
          <button class="section-link" @click=${() => this.navigateTo('calendar')}>Calendar</button>
        </div>

        <div class="events-list">
          ${this.upcomingEvents.map((event) => this.renderEvent(event))}
        </div>
      </div>
    `;
  }

  private renderDashboardItem(icon: string, label: string, action: string) {
    return html`
      <button class="dashboard-item" @click=${() => this.navigateTo(action)}>
        <div class="dashboard-icon">${icon}</div>
        <div class="dashboard-label">${label}</div>
      </button>
    `;
  }

  private renderEvent(event: EventItem) {
    const [month, day] = event.date.split(' ');

    return html`
      <div class="event-item-row" @click=${() => this.navigateTo('calendar')}>
        <div class="event-date-badge">
          <div class="event-date-month">${month}</div>
          <div class="event-date-day">${day}</div>
        </div>
        <div class="event-content">
          <h3 class="event-title">${event.title}</h3>
          <p class="event-meta">🕕 ${event.time} • ${event.location}</p>
        </div>
        <div class="event-arrow">→</div>
      </div>
    `;
  }

  private navigateTo(page: string) {
    this.dispatchEvent(
      new CustomEvent('navigate', {
        detail: { page },
        bubbles: true,
        composed: true
      })
    );
  }

  private handleNewsScroll = (event: Event) => {
    const target = event.target as HTMLElement;
    const width = 280 + 24;
    const index = Math.round(target.scrollLeft / width);
    const bounded = Math.max(0, Math.min(index, this.newsList.length - 1));
    if (bounded !== this.currentNewsIndex) {
      this.currentNewsIndex = bounded;
    }
  };

  private loadNewsData() {
    this.newsList = [
      {
        id: '1',
        title: 'Campus Update: Grand Alumni Homecoming 2024',
        image: '',
        snippet: 'Registration now open for the biggest reunion event and community weekend.'
      },
      {
        id: '2',
        title: 'Infrastructure: Inauguration of New Martinez Sports Complex',
        image: '',
        snippet: 'A new chapter for Blue Knight sports, wellness, and student development.'
      }
    ];
  }

  private loadEventsData() {
    this.upcomingEvents = [
      {
        id: '1',
        date: 'Dec 07',
        title: 'Alumni Webinar: Tech Trends',
        time: '6:00 PM',
        location: 'Zoom'
      },
      {
        id: '2',
        date: 'Dec 14',
        title: 'Blue Knight Golf Cup',
        time: '7:00 AM',
        location: 'Davao Golf Club'
      }
    ];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'blue-home-page': HomePage;
  }
}
