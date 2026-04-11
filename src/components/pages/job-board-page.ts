import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import '../common/badge';
import '../common/button';
import '../common/card';
import '../modals/filter-modal';

type JobStatus = 'under-review' | 'shortlisted' | 'interviewing' | 'accepted' | 'rejected';
type BorderColor = 'navy' | 'green' | 'orange' | 'blue';

interface JobItem {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  borderColor: BorderColor;
  tags: Array<{ text: string; type: 'priority' | 'industry' }>;
  meta: {
    appliedDate?: string;
    daysAgo: number;
    isRemote?: boolean;
  };
  status?: JobStatus;
}

interface ApplicationItem extends JobItem {
  status: JobStatus;
  hasUpdate?: boolean;
  updateMessage?: string;
}

interface ModalFilters {
  bluekKnightPriority: boolean;
  skills: string[];
  locations: string[];
  industries: string[];
  jobTypes: string[];
  experienceLevel: string;
  salaryRange: [number, number];
}

@customElement('blue-job-board-page')
export class JobBoardPage extends LitElement {
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
      border-bottom: 1px solid var(--color-gray-200);
      background: var(--color-white);
    }

    .header {
      background: var(--color-navy);
      color: var(--color-white);
      padding: var(--space-2xl) var(--space-lg) var(--space-lg);
      border-radius: 0 0 var(--radius-xl) var(--radius-xl);
    }

    .tab-toggle {
      display: flex;
      gap: 8px;
      margin-bottom: var(--space-xl);
      background: rgb(255 255 255 / 20%);
      border-radius: var(--radius-full);
      padding: 4px;
      max-width: 260px;
      margin-left: auto;
      margin-right: auto;
    }

    .tab-button {
      flex: 1;
      padding: 8px 16px;
      border: none;
      background: transparent;
      color: var(--color-white);
      border-radius: var(--radius-full);
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      transition: background 0.2s;
    }

    .tab-button.active {
      background: var(--color-white);
      color: var(--color-navy);
    }

    .search-bar {
      display: flex;
      align-items: center;
      gap: 8px;
      background: var(--color-white);
      border-radius: var(--radius-lg);
      padding: 0 12px;
      height: 44px;
      margin-bottom: var(--space-sm);
      box-shadow: var(--shadow-sm);
    }

    .search-icon {
      font-size: 18px;
      color: var(--color-gray-500);
      flex-shrink: 0;
    }

    .search-input {
      flex: 1;
      border: none;
      background: none;
      font-size: 14px;
      font-family: inherit;
      outline: none;
      color: var(--color-gray-700);
    }

    .search-input::placeholder {
      color: var(--color-gray-400);
    }

    .filter-open {
      border: none;
      background: var(--color-navy-light);
      color: var(--color-white);
      border-radius: 10px;
      width: 32px;
      height: 32px;
      display: grid;
      place-items: center;
      cursor: pointer;
      font-size: 16px;
    }

    .filter-bar {
      display: flex;
      gap: 8px;
      overflow-x: auto;
      padding-top: var(--space-md);
      scrollbar-width: thin;
    }

    .filter-label {
      font-size: 12px;
      color: rgb(255 255 255 / 80%);
      align-self: center;
      white-space: nowrap;
    }

    .filter-tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgb(255 255 255 / 20%);
      color: var(--color-white);
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
      line-height: 1;
    }

    .content {
      padding: var(--space-lg);
    }

    .status-tabs {
      display: flex;
      gap: 12px;
      margin-bottom: var(--space-lg);
      overflow-x: auto;
    }

    .status-tab {
      padding: 6px 16px;
      border: 1px solid var(--color-gray-300);
      background: var(--color-white);
      border-radius: var(--radius-full);
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.2s;
    }

    .status-tab.active {
      background: var(--color-navy);
      color: var(--color-white);
      border-color: var(--color-navy);
    }

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
      gap: var(--space-md);
    }

    .job-title-section h3 {
      font-size: var(--font-size-base);
      font-weight: var(--font-weight-bold);
      color: var(--color-navy);
      margin: 0 0 4px;
    }

    .job-company {
      font-size: var(--font-size-sm);
      color: var(--color-gray-600);
      margin: 0;
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

    .update-notification {
      background: #d1fae5;
      border-left: 4px solid var(--color-success);
      padding: var(--space-md);
      border-radius: var(--radius-md);
      margin-bottom: var(--space-md);
      font-size: var(--font-size-sm);
      color: #065f46;
    }

    .update-notification-icon {
      margin-right: 8px;
    }

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

    @media (min-width: 768px) {
      .header,
      .content {
        max-width: 1320px;
        margin-left: auto;
        margin-right: auto;
      }

      .content {
        padding: var(--space-xl);
      }

      .job-list {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: var(--space-lg);
      }
    }

    @media (min-width: 1024px) {
      :host {
        padding-bottom: 24px;
      }

      .header {
        margin-top: 16px;
        border-radius: var(--radius-xl);
      }

      .tab-toggle {
        max-width: 340px;
      }

      .filter-bar {
        overflow: visible;
        flex-wrap: wrap;
      }

      .status-tabs {
        overflow: visible;
        flex-wrap: wrap;
      }
    }
  `;

  @property({ type: String }) currentTab: 'board' | 'applications' = 'board';

  @state() private searchQuery = '';
  @state() private activeStatusFilter = 'All';
  @state() private jobs: JobItem[] = [];
  @state() private applications: ApplicationItem[] = [];
  @state() private filteredJobs: JobItem[] = [];
  @state() private filteredApplications: ApplicationItem[] = [];
  @state() private filterModalOpen = false;
  @state()
  private activeFilters: {
    skills: string[];
    location: string[];
    industry: string[];
  } = { skills: [], location: [], industry: [] };

  connectedCallback(): void {
    super.connectedCallback();
    this.loadJobs();
    this.loadApplications();
    this.filterJobs();
    this.filterApplications();
  }

  render() {
    const hasFilterTags =
      this.activeFilters.location.length > 0 ||
      this.activeFilters.skills.length > 0 ||
      this.activeFilters.industry.length > 0;

    return html`
      <div class="status-bar">
        <span>9:41</span>
        <span>Signal WiFi Battery</span>
      </div>

      <div class="header">
        <div class="tab-toggle">
          <button class="tab-button ${this.currentTab === 'board' ? 'active' : ''}" @click=${() => this.selectTab('board')}>
            Job Board
          </button>
          <button class="tab-button ${this.currentTab === 'applications' ? 'active' : ''}" @click=${() => this.selectTab('applications')}>
            Applications
          </button>
        </div>

        <div class="search-bar">
          <span class="search-icon">🔍</span>
          <input
            type="text"
            class="search-input"
            placeholder="Search roles, companies, or keywords"
            .value=${this.searchQuery}
            @input=${this.handleSearch}
          />
          <button class="filter-open" @click=${this.openFilterModal} aria-label="Open filter modal">⚙️</button>
        </div>

        ${hasFilterTags
          ? html`
              <div class="filter-bar">
                <span class="filter-label">Filters:</span>
                ${this.activeFilters.location.map(
                  (loc) => html`
                    <button class="filter-tag" @click=${() => this.removeFilter('location', loc)}>
                      ${loc} <span class="filter-tag-close">×</span>
                    </button>
                  `
                )}
                ${this.activeFilters.skills.map(
                  (skill) => html`
                    <button class="filter-tag" @click=${() => this.removeFilter('skills', skill)}>
                      ${skill} <span class="filter-tag-close">×</span>
                    </button>
                  `
                )}
                ${this.activeFilters.industry.map(
                  (industry) => html`
                    <button class="filter-tag" @click=${() => this.removeFilter('industry', industry)}>
                      ${industry} <span class="filter-tag-close">×</span>
                    </button>
                  `
                )}
                <button class="filter-tag" @click=${this.openFilterModal}>Reset</button>
              </div>
            `
          : ''}
      </div>

      <div class="content">
        ${this.currentTab === 'board' ? this.renderJobBoard() : this.renderApplications()}
      </div>

      <blue-filter-modal
        .open=${this.filterModalOpen}
        @apply-filters=${this.handleFilterApply}
        @close-modal=${this.handleFilterClose}
      ></blue-filter-modal>
    `;
  }

  private renderJobBoard() {
    if (this.filteredJobs.length === 0) {
      return html`
        <div class="empty-state">
          <div class="empty-state-icon">💼</div>
          <p class="empty-state-text">No jobs found. Try adjusting your filters.</p>
        </div>
      `;
    }

    return html`
      <div class="job-list">
        ${this.filteredJobs.map(
          (job) => html`
            <blue-card variant="job" border-color=${job.borderColor}>
              <div class="job-header">
                <div class="job-title-section">
                  <h3>${job.title}</h3>
                  <p class="job-company">${job.company}</p>
                </div>
                ${job.status
                  ? html`<blue-badge variant=${this.getStatusVariant(job.status)}>${this.getStatusLabel(job.status)}</blue-badge>`
                  : ''}
              </div>

              <div class="job-tags">
                ${job.tags.map(
                  (tag) => html`
                    <blue-badge variant=${tag.type === 'priority' ? 'warning' : 'info'}>${tag.text}</blue-badge>
                  `
                )}
              </div>

              <div class="job-meta">
                <span class="job-meta-item">📍 ${job.location}</span>
                <span class="job-meta-item">⏱️ Applied ${job.meta.daysAgo}d ago</span>
                ${job.meta.isRemote ? html`<span class="job-meta-item">🌍 Remote</span>` : ''}
              </div>

              <div class="job-salary">₱${job.salary}</div>

              <div class="job-action">
                <blue-button variant="primary" size="md" full-width>Apply Now</blue-button>
              </div>
            </blue-card>
          `
        )}
      </div>
    `;
  }

  private renderApplications() {
    return html`
      <div class="status-tabs">
        ${['All', 'Under Review', 'Interviewing', 'Shortlisted', 'Accepted'].map(
          (status) => html`
            <button
              class="status-tab ${this.activeStatusFilter === status ? 'active' : ''}"
              @click=${() => this.filterByStatus(status)}
            >
              ${status}
            </button>
          `
        )}
      </div>

      <div class="job-list">
        ${this.filteredApplications.map(
          (app) => html`
            <blue-card variant="job" border-color=${app.borderColor}>
              ${app.hasUpdate
                ? html`
                    <div class="update-notification">
                      <span class="update-notification-icon">✨</span>
                      ${app.updateMessage}
                    </div>
                  `
                : ''}

              <div class="job-header">
                <div class="job-title-section">
                  <h3>${app.title}</h3>
                  <p class="job-company">${app.company}</p>
                </div>
                <blue-badge variant=${this.getStatusVariant(app.status)}>${this.getStatusLabel(app.status)}</blue-badge>
              </div>

              <div class="job-tags">
                ${app.tags.map(
                  (tag) => html`
                    <blue-badge variant=${tag.type === 'priority' ? 'warning' : 'info'}>${tag.text}</blue-badge>
                  `
                )}
              </div>

              <div class="job-meta">
                <span class="job-meta-item">📍 ${app.location}</span>
                <span class="job-meta-item">Applied ${app.meta.daysAgo}d ago</span>
              </div>

              <div class="job-salary">₱${app.salary}</div>

              <div class="job-action">
                ${app.status === 'shortlisted'
                  ? html`<blue-button variant="primary" size="md" full-width>Book Interview</blue-button>`
                  : app.status === 'accepted'
                    ? html`<blue-button variant="primary" size="md" full-width>View Acceptance Details</blue-button>`
                    : html`<blue-button variant="secondary" size="md" full-width disabled>View Details</blue-button>`}
              </div>
            </blue-card>
          `
        )}
      </div>
    `;
  }

  private selectTab(tab: 'board' | 'applications') {
    this.currentTab = tab;
    if (tab === 'applications') {
      this.filterApplications();
    }
  }

  private handleSearch = (e: Event) => {
    this.searchQuery = (e.target as HTMLInputElement).value;
    this.filterJobs();
  };

  private filterByStatus(status: string) {
    this.activeStatusFilter = status;
    this.filterApplications();
  }

  private getStatusVariant(status: string): 'warning' | 'success' | 'info' | 'neutral' {
    const variants: Record<string, 'warning' | 'success' | 'info' | 'neutral'> = {
      'under-review': 'warning',
      shortlisted: 'success',
      interviewing: 'info',
      accepted: 'success',
      rejected: 'neutral'
    };
    return variants[status] || 'neutral';
  }

  private getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      'under-review': 'Under Review',
      shortlisted: 'Shortlisted',
      interviewing: 'Interviewing',
      accepted: 'Accepted',
      rejected: 'Not Selected'
    };
    return labels[status] || status;
  }

  private removeFilter(type: 'location' | 'skills' | 'industry', value: string) {
    if (type === 'location') {
      this.activeFilters = { ...this.activeFilters, location: this.activeFilters.location.filter((l) => l !== value) };
    } else if (type === 'skills') {
      this.activeFilters = { ...this.activeFilters, skills: this.activeFilters.skills.filter((s) => s !== value) };
    } else {
      this.activeFilters = { ...this.activeFilters, industry: this.activeFilters.industry.filter((i) => i !== value) };
    }
    this.filterJobs();
  }

  private openFilterModal = () => {
    this.filterModalOpen = true;
    this.dispatchEvent(
      new CustomEvent('open-filter-modal', {
        bubbles: true,
        composed: true
      })
    );
  };

  private handleFilterClose = () => {
    this.filterModalOpen = false;
  };

  private handleFilterApply = (e: CustomEvent<ModalFilters>) => {
    const filters = e.detail;
    this.activeFilters = {
      skills: filters.skills,
      location: filters.locations,
      industry: filters.industries
    };
    this.filterModalOpen = false;
    this.filterJobs();
  };

  private filterJobs() {
    const q = this.searchQuery.trim().toLowerCase();
    this.filteredJobs = this.jobs.filter((job) => {
      const matchesSearch =
        q.length === 0 ||
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.tags.some((tag) => tag.text.toLowerCase().includes(q));

      const matchesLocation =
        this.activeFilters.location.length === 0 || this.activeFilters.location.some((loc) => job.location.includes(loc));

      const matchesSkills =
        this.activeFilters.skills.length === 0 ||
        this.activeFilters.skills.some((skill) =>
          job.tags.some((tag) => tag.text.toLowerCase().includes(skill.toLowerCase()))
        );

      const matchesIndustry =
        this.activeFilters.industry.length === 0 ||
        this.activeFilters.industry.some((ind) =>
          job.tags.some((tag) => tag.text.toLowerCase().includes(ind.toLowerCase()))
        );

      return matchesSearch && matchesLocation && matchesSkills && matchesIndustry;
    });
  }

  private filterApplications() {
    if (this.activeStatusFilter === 'All') {
      this.filteredApplications = [...this.applications];
      return;
    }

    const normalized = this.activeStatusFilter.toLowerCase().replace(' ', '-');
    this.filteredApplications = this.applications.filter((item) => item.status === normalized);
  }

  private loadJobs() {
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
      {
        id: '2',
        title: 'Systems Analyst',
        company: 'Global Engineering Corp',
        location: 'Davao City',
        salary: '90k - 110k',
        borderColor: 'navy',
        tags: [
          { text: 'Blue Knight Priority', type: 'priority' },
          { text: 'Engineering', type: 'industry' }
        ],
        meta: { daysAgo: 5, isRemote: false }
      },
      {
        id: '3',
        title: 'Junior Full Stack Developer',
        company: 'SkyTech Davao',
        location: 'Remote',
        salary: '80k - 120k',
        borderColor: 'blue',
        tags: [
          { text: 'Blue Knight Priority', type: 'priority' },
          { text: 'Information Technology', type: 'industry' }
        ],
        meta: { daysAgo: 1, isRemote: true },
        status: 'accepted'
      }
    ];
  }

  private loadApplications() {
    this.applications = [
      {
        id: '1',
        title: 'Product Designer',
        company: 'Global Engineering Corp',
        location: 'Davao City',
        salary: '50k - 70k',
        borderColor: 'green',
        tags: [{ text: 'Blue Knight Priority', type: 'priority' }],
        meta: { daysAgo: 5 },
        status: 'shortlisted',
        hasUpdate: true,
        updateMessage: 'Your profile stood out! The hiring manager would like to schedule an initial screening.'
      },
      {
        id: '2',
        title: 'Junior Full Stack Developer',
        company: 'SkyTech Davao',
        location: 'Remote',
        salary: '80k - 120k',
        borderColor: 'blue',
        tags: [{ text: 'Information Technology', type: 'industry' }],
        meta: { daysAgo: 1 },
        status: 'accepted'
      },
      {
        id: '3',
        title: 'Junior Systems Analyst',
        company: 'Build-IT Davao',
        location: 'Davao City',
        salary: '40k - 60k',
        borderColor: 'navy',
        tags: [{ text: 'Engineering', type: 'industry' }],
        meta: { daysAgo: 8 },
        status: 'rejected'
      }
    ];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'blue-job-board-page': JobBoardPage;
  }
}
