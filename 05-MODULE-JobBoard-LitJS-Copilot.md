# MODULE 5: Job Board & Applications Pages - Lit JS Copilot Prompt

Create two related pages: Job Board (browse jobs) and Applications (track your applications).

---

## Component 1: job-board-page.ts

**File:** `src/components/pages/job-board-page.ts`

**Custom Element:** `<blue-job-board-page>`

## Properties & State

```typescript
@property({ type: String }) currentTab: 'board' | 'applications' = 'board';

@state() private searchQuery = '';
@state() private activeStatusFilter = 'All'; // All, Under Review, Interviewing, Shortlisted
@state() private jobs: JobItem[] = [];
@state() private applications: ApplicationItem[] = [];
@state() private activeFilters: {
  skills: string[];
  location: string[];
  industry: string[];
} = { skills: [], location: [], industry: [] };
```

## Types

```typescript
interface JobItem {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  borderColor: 'navy' | 'green' | 'orange' | 'blue'; // Color of left border
  tags: Array<{ text: string; type: 'priority' | 'industry' }>;
  meta: {
    appliedDate?: string;
    daysAgo: number;
    isRemote?: boolean;
  };
  status?: 'under-review' | 'shortlisted' | 'accepted' | 'rejected';
}

interface ApplicationItem extends JobItem {
  status: 'under-review' | 'shortlisted' | 'accepted' | 'rejected';
  hasUpdate?: boolean;
  updateMessage?: string;
}
```

## Scoped CSS

```css
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
  font-size: 14px;
  border-bottom: 1px solid var(--color-gray-200);
}

.header {
  background: var(--color-navy);
  color: white;
  padding: var(--space-2xl) var(--space-lg) var(--space-lg);
}

/* Tab Toggle */
.tab-toggle {
  display: flex;
  gap: 8px;
  margin-bottom: var(--space-xl);
  background: rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-full);
  padding: 4px;
}

.tab-button {
  flex: 1;
  padding: 8px 16px;
  border: none;
  background: transparent;
  color: white;
  border-radius: var(--radius-full);
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;
}

.tab-button.active {
  background: white;
  color: var(--color-navy);
}

/* Search Bar */
.search-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  background: white;
  border-radius: var(--radius-lg);
  padding: 0 12px;
  height: 44px;
  margin-bottom: var(--space-lg);
}

.search-icon {
  font-size: 18px;
  color: var(--color-gray-500);
}

.search-input {
  flex: 1;
  border: none;
  background: none;
  font-size: 14px;
  font-family: inherit;
  outline: none;
}

.search-input::placeholder {
  color: var(--color-gray-400);
}

/* Filter Bar */
.filter-bar {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: var(--space-lg) var(--space-lg) 0 var(--space-lg);
  margin: 0 calc(var(--space-lg) * -1);
  padding-left: var(--space-lg);
}

.filter-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 6px 12px;
  border-radius: var(--radius-full);
  font-size: 13px;
  white-space: nowrap;
  border: none;
  cursor: pointer;
}

.filter-tag-close {
  font-size: 16px;
  cursor: pointer;
}

.filter-icon {
  font-size: 20px;
  margin-left: 8px;
}

/* Content Area */
.content {
  padding: var(--space-lg);
}

/* Status Filter Tabs (for Applications tab) */
.status-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: var(--space-lg);
  overflow-x: auto;
}

.status-tab {
  padding: 6px 16px;
  border: 1px solid var(--color-gray-300);
  background: white;
  border-radius: var(--radius-full);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
}

.status-tab.active {
  background: var(--color-navy);
  color: white;
  border-color: var(--color-navy);
}

/* Job Card in List */
.job-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--space-md);
}

.job-title-section h3 {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  color: var(--color-navy);
  margin: 0 0 4px 0;
}

.job-company {
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  margin: 0;
}

.job-status-badge {
  text-align: center;
}

.job-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  margin-bottom: var(--space-md);
}

.job-meta {
  display: flex;
  gap: var(--space-md);
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  margin-bottom: var(--space-md);
  flex-wrap: wrap;
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

/* Update Notification */
.update-notification {
  background: #D1FAE5;
  border-left: 4px solid var(--color-success);
  padding: var(--space-md);
  border-radius: var(--radius-md);
  margin-bottom: var(--space-md);
  font-size: var(--font-size-sm);
  color: #065F46;
}

.update-notification-icon {
  margin-right: 8px;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: var(--space-4xl) var(--space-lg);
  color: var(--color-gray-500);
}

.empty-state-icon {
  font-size: 48px;
  margin-bottom: var(--space-lg);
}

.empty-state-text {
  font-size: var(--font-size-base);
}
```

## Template - Job Board Tab

```typescript
render() {
  return html`
    <div class="status-bar">
      <span>9:41</span>
      <div>📶 📡 🔋</div>
    </div>

    <div class="header">
      <!-- Tab Toggle -->
      <div class="tab-toggle">
        <button
          class="tab-button ${this.currentTab === 'board' ? 'active' : ''}"
          @click=${() => this.selectTab('board')}
        >
          Job Board
        </button>
        <button
          class="tab-button ${this.currentTab === 'applications' ? 'active' : ''}"
          @click=${() => this.selectTab('applications')}
        >
          Applications
        </button>
      </div>

      <!-- Search Bar -->
      <div class="search-bar">
        <span class="search-icon">🔍</span>
        <input
          type="text"
          class="search-input"
          placeholder="Search roles, companies, or keywords"
          .value=${this.searchQuery}
          @input=${(e: Event) => this.handleSearch(e)}
        />
      </div>

      <!-- Filter Bar (with active filters) -->
      ${this.activeFilters.location.length > 0 || this.activeFilters.skills.length > 0 ? html`
        <div class="filter-bar">
          Filters:
          ${this.activeFilters.location.map(loc => html`
            <button class="filter-tag" @click=${() => this.removeFilter('location', loc)}>
              ${loc} <span class="filter-tag-close">×</span>
            </button>
          `)}
          ${this.activeFilters.skills.map(skill => html`
            <button class="filter-tag" @click=${() => this.removeFilter('skills', skill)}>
              ${skill} <span class="filter-tag-close">×</span>
            </button>
          `)}
          <button class="filter-tag" @click=${() => this.openFilterModal()}>
            ⚙️ Reset
          </button>
        </div>
      ` : ''}
    </div>

    <div class="content">
      ${this.currentTab === 'board' ? this.renderJobBoard() : this.renderApplications()}
    </div>
  `;
}

private renderJobBoard() {
  if (this.jobs.length === 0) {
    return html`
      <div class="empty-state">
        <div class="empty-state-icon">💼</div>
        <p class="empty-state-text">No jobs found. Try adjusting your filters.</p>
      </div>
    `;
  }

  return html`
    <div class="job-list">
      ${this.jobs.map(job => html`
        <blue-card variant="job" border-color=${job.borderColor}>
          <div class="job-header">
            <div class="job-title-section">
              <h3>${job.title}</h3>
              <p class="job-company">${job.company}</p>
            </div>
            ${job.status ? html`
              <blue-badge variant=${this.getStatusVariant(job.status)}>
                ${this.getStatusLabel(job.status)}
              </blue-badge>
            ` : ''}
          </div>

          <div class="job-tags">
            ${job.tags.map(tag => html`
              <blue-badge variant=${tag.type === 'priority' ? 'warning' : 'info'}>
                ${tag.text}
              </blue-badge>
            `)}
          </div>

          <div class="job-meta">
            <span class="job-meta-item">📍 ${job.location}</span>
            <span class="job-meta-item">⏱️ Applied ${job.meta.daysAgo}d ago</span>
            ${job.meta.isRemote ? html`
              <span class="job-meta-item">🌍 Remote</span>
            ` : ''}
          </div>

          <div class="job-salary">₱${job.salary}</div>

          <div class="job-action">
            <blue-button variant="primary" size="md">
              Apply Now
            </blue-button>
          </div>
        </blue-card>
      `)}
    </div>
  `;
}

private renderApplications() {
  return html`
    <!-- Status Filter Tabs -->
    <div class="status-tabs">
      ${['All', 'Under Review', 'Interviewing', 'Shortlisted', 'Accepted'].map(status => html`
        <button
          class="status-tab ${this.activeStatusFilter === status ? 'active' : ''}"
          @click=${() => this.filterByStatus(status)}
        >
          ${status}
        </button>
      `)}
    </div>

    <div class="job-list">
      ${this.applications.map(app => html`
        <blue-card variant="job" border-color=${app.borderColor}>
          ${app.hasUpdate ? html`
            <div class="update-notification">
              <span class="update-notification-icon">✨</span>
              ${app.updateMessage}
            </div>
          ` : ''}

          <div class="job-header">
            <div class="job-title-section">
              <h3>${app.title}</h3>
              <p class="job-company">${app.company}</p>
            </div>
            <blue-badge variant=${this.getStatusVariant(app.status)}>
              ${this.getStatusLabel(app.status)}
            </blue-badge>
          </div>

          <div class="job-tags">
            ${app.tags.map(tag => html`
              <blue-badge variant=${tag.type === 'priority' ? 'warning' : 'info'}>
                ${tag.text}
              </blue-badge>
            `)}
          </div>

          <div class="job-meta">
            <span class="job-meta-item">📍 ${app.location}</span>
            <span class="job-meta-item">Applied ${app.meta.daysAgo}d ago</span>
          </div>

          <div class="job-salary">₱${app.salary}</div>

          <div class="job-action">
            ${app.status === 'shortlisted' ? html`
              <blue-button variant="primary" size="md">
                Book Interview
              </blue-button>
            ` : app.status === 'accepted' ? html`
              <blue-button variant="primary" size="md">
                View Acceptance Details
              </blue-button>
            ` : html`
              <blue-button variant="secondary" size="md" disabled>
                View Details
              </blue-button>
            `}
          </div>
        </blue-card>
      `)}
    </div>
  `;
}

private selectTab(tab: 'board' | 'applications') {
  this.currentTab = tab;
}

private handleSearch(e: Event) {
  this.searchQuery = (e.target as HTMLInputElement).value;
  this.filterJobs();
}

private filterByStatus(status: string) {
  this.activeStatusFilter = status;
  this.filterApplications();
}

private getStatusVariant(status: string): 'warning' | 'success' | 'info' | 'neutral' {
  const variants: Record<string, 'warning' | 'success' | 'info' | 'neutral'> = {
    'under-review': 'warning',
    'shortlisted': 'success',
    'interviewing': 'info',
    'accepted': 'success',
    'rejected': 'neutral'
  };
  return variants[status] || 'neutral';
}

private getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    'under-review': 'Under Review',
    'shortlisted': 'Shortlisted',
    'interviewing': 'Interviewing',
    'accepted': 'Accepted',
    'rejected': 'Not Selected'
  };
  return labels[status] || status;
}

private removeFilter(type: string, value: string) {
  if (type === 'location') {
    this.activeFilters.location = this.activeFilters.location.filter(l => l !== value);
  } else if (type === 'skills') {
    this.activeFilters.skills = this.activeFilters.skills.filter(s => s !== value);
  }
  this.filterJobs();
}

private openFilterModal() {
  this.dispatchEvent(new CustomEvent('open-filter-modal', {
    bubbles: true,
    composed: true
  }));
}

private filterJobs() {
  // Filter logic based on search, filters, etc.
  // This will be called after search or filter changes
  this.requestUpdate();
}

private filterApplications() {
  // Filter applications by status
  this.requestUpdate();
}

connectedCallback() {
  super.connectedCallback();
  this.loadJobs();
  this.loadApplications();
}

private loadJobs() {
  // Mock data
  this.jobs = [
    {
      id: '1',
      title: 'Senior Software Engineer',
      company: 'Davao Tech Solutions',
      location: 'Davao City',
      salary: '60k - 90k',
      borderColor: 'orange',
      tags: [
        { text: 'Blue Knight Priority', type: 'priority' },
        { text: 'Information Technology', type: 'industry' }
      ],
      meta: { daysAgo: 2, isRemote: false },
      status: 'under-review'
    },
    // Add more jobs...
  ];
}

private loadApplications() {
  // Mock data
  this.applications = [
    {
      id: '1',
      title: 'Product Designer',
      company: 'Global Engineering Corp',
      location: 'Davao City',
      salary: '50k - 70k',
      borderColor: 'green',
      tags: [
        { text: 'Blue Knight Priority', type: 'priority' }
      ],
      meta: { daysAgo: 5 },
      status: 'shortlisted',
      hasUpdate: true,
      updateMessage: 'Your profile stood out! The hiring manager would like to schedule an initial screening.'
    },
    // Add more applications...
  ];
}
```

---

## Key Features

- **Dual Tab View** - Switch between browsing jobs and tracking applications
- **Search & Filter** - Search bar and applied filters display
- **Status Badges** - Color-coded application statuses
- **Update Notifications** - Special highlight for applications with new updates
- **Action Buttons** - Different CTAs based on application status
- **Mock Data** - All data is mock for MVP, can be replaced with API later

---

## Deliverables

Create:
- ✅ `src/components/pages/job-board-page.ts`
- ✅ Implement with mock job/application data
- ✅ Tab toggle between Job Board and Applications
- ✅ Search functionality (filtering mock data)
- ✅ Status filter tabs for applications
- ✅ Uses blue-card, blue-badge, blue-button components

---

## After Implementation

Report back:
1. ✅ Job Board page created and rendering?
2. ✅ Tab toggle working (switch between board and applications)?
3. ✅ Search bar functional?
4. ✅ Status filter tabs work?
5. ✅ Cards displaying with correct styling?
6. ✅ Any styling issues to fix?

**Next:** MODULE 6 - Filter Modal (Advanced job search filtering)
