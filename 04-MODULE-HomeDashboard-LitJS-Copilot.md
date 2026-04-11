# MODULE 4: Home Dashboard Page - Lit JS Copilot Prompt

Create the main dashboard/home page after login.

---

## Component: home-page.ts

**File:** `src/components/pages/home-page.ts`

**Custom Element:** `<blue-home-page>`

## Properties & State

```typescript
@property({ type: String }) userName: string = 'Stephany';
@property({ type: String }) userClass: string = 'Class of 2026';
@property({ type: String }) userMajor: string = 'Information Technology';
@property({ type: String }) userAvatar: string = 'https://...'; // URL or emoji

@state() private currentNewsIndex = 0;
@state() private newsList: NewsItem[] = [];
@state() private upcomingEvents: EventItem[] = [];
```

## Types

```typescript
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
```

## Dispatch Events

```typescript
// When user taps a dashboard action
this.dispatchEvent(new CustomEvent('navigate', {
  detail: { page: 'jobs' }, // or 'network', 'notifications', 'profile'
  bubbles: true,
  composed: true
}));
```

## Scoped CSS

```css
:host {
  display: block;
  min-height: 100vh;
  background: var(--color-gray-50);
  overflow-y: auto;
  padding-bottom: 100px; /* Space for bottom nav */
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

.hero-section {
  background: linear-gradient(135deg, var(--color-navy) 0%, var(--color-navy-light) 100%);
  color: white;
  padding: var(--space-2xl) var(--space-lg);
  text-align: center;
}

.university-name {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  letter-spacing: 1px;
  opacity: 0.9;
  margin-bottom: var(--space-md);
}

.greeting {
  font-size: 28px;
  font-weight: var(--font-weight-bold);
  margin: var(--space-md) 0;
}

.user-info {
  font-size: var(--font-size-sm);
  opacity: 0.9;
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
  border: 3px solid rgba(255, 255, 255, 0.3);
}

.action-buttons {
  display: flex;
  gap: var(--space-lg);
  margin-bottom: var(--space-xl);
}

.action-buttons blue-button {
  flex: 1;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-lg);
  padding: var(--space-lg);
}

.dashboard-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-2xl) var(--space-lg);
  background: white;
  border-radius: var(--radius-lg);
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dashboard-item:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.dashboard-icon {
  font-size: 32px;
}

.dashboard-label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  color: var(--color-navy);
}

/* News Section */
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
  padding: 0 var(--space-lg) var(--space-md) var(--space-lg);
}

.news-carousel::-webkit-scrollbar {
  height: 4px;
}

.news-carousel::-webkit-scrollbar-track {
  background: var(--color-gray-100);
  border-radius: 2px;
}

.news-carousel::-webkit-scrollbar-thumb {
  background: var(--color-gray-400);
  border-radius: 2px;
}

.news-item {
  flex: 0 0 280px;
  scroll-snap-align: start;
}

/* Events Section */
.events-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.event-item-row {
  display: flex;
  gap: var(--space-lg);
  align-items: flex-start;
}

.event-date-badge {
  background: var(--color-navy);
  color: white;
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
  opacity: 0.8;
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
}
```

## Template Structure

```typescript
render() {
  return html`
    <div class="status-bar">
      <span>9:41</span>
      <div>📶 📡 🔋</div>
    </div>

    <!-- Hero Section -->
    <div class="hero-section">
      <div class="university-name">ATENEO DE DAVAO BLUE KNIGHT</div>
      
      <div class="avatar">
        ${this.userAvatar ? html`<img src=${this.userAvatar} />` : '👩‍🎓'}
      </div>
      
      <h1 class="greeting">Welcome back, ${this.userName}!</h1>
      <div class="user-info">${this.userClass} • ${this.userMajor}</div>
      
      <div class="action-buttons">
        <blue-button
          variant="outline"
          size="md"
          @click=${() => this.navigateTo('profile')}
        >
          Update Profile
        </blue-button>
        <blue-button
          variant="outline"
          size="md"
          @click=${() => this.navigateTo('profile')}
        >
          Digital ID
        </blue-button>
      </div>
    </div>

    <!-- Dashboard Grid -->
    <div class="dashboard-grid">
      ${this.renderDashboardItem('📄', 'Documents', 'documents')}
      ${this.renderDashboardItem('💼', 'Job Board', 'jobs')}
      ${this.renderDashboardItem('🤝', 'Donation', 'donation')}
      ${this.renderDashboardItem('👥', 'Network', 'network')}
    </div>

    <!-- Latest News Section -->
    <div class="section">
      <div class="section-header">
        <h2 class="section-title">Latest News</h2>
        <a class="section-link" @click=${() => this.navigateTo('news')}>View All</a>
      </div>
      
      <div class="news-carousel">
        ${this.newsList.map(news => html`
          <div class="news-item">
            <blue-card variant="news" clickable>
              <div style="width: 100%; height: 120px; background: linear-gradient(135deg, #D4A574 0%, #E8A87C 100%); border-radius: 8px 8px 0 0;"></div>
              <h4 class="news-title">${news.title}</h4>
              <p class="news-snippet">${news.snippet}</p>
            </blue-card>
          </div>
        `)}
      </div>
    </div>

    <!-- Upcoming Events Section -->
    <div class="section">
      <div class="section-header">
        <h2 class="section-title">Upcoming Events</h2>
        <a class="section-link" @click=${() => this.navigateTo('calendar')}>Calendar</a>
      </div>
      
      <div class="events-list">
        ${this.upcomingEvents.map(event => this.renderEvent(event))}
      </div>
    </div>
  `;
}

private renderDashboardItem(icon: string, label: string, action: string) {
  return html`
    <div class="dashboard-item" @click=${() => this.navigateTo(action)}>
      <div class="dashboard-icon">${icon}</div>
      <div class="dashboard-label">${label}</div>
    </div>
  `;
}

private renderEvent(event: EventItem) {
  const [month, day] = event.date.split(' ');
  
  return html`
    <div class="event-item-row">
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
  this.dispatchEvent(new CustomEvent('navigate', {
    detail: { page },
    bubbles: true,
    composed: true
  }));
}
```

## Lifecycle Methods

```typescript
connectedCallback() {
  super.connectedCallback();
  this.loadNewsData();
  this.loadEventsData();
}

private loadNewsData() {
  // Mock data - replace with API call later
  this.newsList = [
    {
      id: '1',
      title: 'Campus Update: Grand Alumni Homecoming 2024',
      image: '',
      snippet: 'Registration now open for the biggest reunion event...'
    },
    {
      id: '2',
      title: 'Infrastructure: Inauguration of New Martinez Sports Complex',
      image: '',
      snippet: 'A new chapter for Blue Knight sports and wellness...'
    }
  ];
}

private loadEventsData() {
  // Mock data - replace with API call later
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
```

## Notes

1. **Dashboard Items** - Uses simple grid of 4 items, each clickable to navigate to different pages
2. **News Carousel** - Horizontal scrolling with news cards (mock data)
3. **Events** - Vertical list of upcoming events with date badges
4. **Avatar** - Can be image URL or emoji fallback
5. **Hero Section** - Gradient background with navy blue theme
6. **Bottom Padding** - 100px to account for bottom navigation bar

## Usage in App Component

```typescript
<blue-home-page
  .userName=${this.currentUser?.name}
  .userClass=${this.currentUser?.class}
  .userMajor=${this.currentUser?.major}
  @navigate=${(e: CustomEvent) => this.handleNavigation(e)}
></blue-home-page>
```

---

## Deliverables

Create:
- ✅ `src/components/pages/home-page.ts`
- ✅ Implement with mock news/events data
- ✅ All dashboard items clickable and dispatch navigate events
- ✅ Responsive layout that works on mobile
- ✅ Uses blue-button, blue-card, blue-badge components

---

## After Implementation

Report back:
1. ✅ Home page created and rendering?
2. ✅ Hero section looks correct?
3. ✅ Dashboard grid items clickable?
4. ✅ News carousel scrollable?
5. ✅ Events list displaying properly?
6. ✅ Navigation events working?

**Next:** MODULE 5 - Job Board & Applications Pages
