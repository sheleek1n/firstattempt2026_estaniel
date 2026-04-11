# MODULE 6: Filter Modal - Lit JS Copilot Prompt

Create an advanced filter modal for refining job searches.

---

## Component: filter-modal.ts

**File:** `src/components/modals/filter-modal.ts`

**Custom Element:** `<blue-filter-modal>`

## Properties & State

```typescript
@property({ type: Boolean }) open: boolean = false;

@state() private bluekKnightPriority: boolean = true;
@state() private selectedSkills: string[] = [];
@state() private selectedLocations: string[] = [];
@state() private selectedIndustries: string[] = [];
@state() private selectedJobTypes: string[] = [];
@state() private experienceLevel: string = 'executive-10+';
@state() private salaryRange: [number, number] = [20, 300];
@state() private skillSearch: string = '';
@state() private locationSearch: string = '';

// Mock data
private availableSkills = ['UI Design', 'Figma', 'React', 'TypeScript', 'Leadership', 'Data Analysis'];
private availableLocations = ['Davao City', 'Manila', 'Cebu', 'Remote'];
private availableIndustries = ['Information Technology', 'Engineering', 'Design', 'Marketing', 'Management'];
private availableJobTypes = ['Full-Time', 'Part-Time', 'Freelance', 'Internship', 'Remote'];
private experienceLevels = [
  { value: 'entry', label: 'Entry Level (0-2 years)' },
  { value: 'mid', label: 'Mid Level (2-5 years)' },
  { value: 'senior', label: 'Senior (5-10 years)' },
  { value: 'executive-10+', label: 'Executive (10+ years)' }
];
```

## Events

```typescript
// When Apply Filter is clicked
this.dispatchEvent(new CustomEvent('apply-filters', {
  detail: {
    bluekKnightPriority: this.bluekKnightPriority,
    skills: this.selectedSkills,
    locations: this.selectedLocations,
    industries: this.selectedIndustries,
    jobTypes: this.selectedJobTypes,
    experienceLevel: this.experienceLevel,
    salaryRange: this.salaryRange
  },
  bubbles: true,
  composed: true
}));

// When Close is clicked
this.dispatchEvent(new CustomEvent('close-modal', {
  bubbles: true,
  composed: true
}));
```

## Scoped CSS

```css
:host {
  display: block;
}

:host([open]) .modal-overlay {
  display: flex;
}

.modal-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  align-items: flex-end;
  z-index: 50;
}

.modal {
  background: white;
  width: 100%;
  max-height: 90vh;
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
  display: flex;
  flex-direction: column;
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-2xl) var(--space-lg);
  border-bottom: 1px solid var(--color-gray-200);
  background: var(--color-navy);
  color: white;
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
}

.modal-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  margin: 0;
}

.modal-subtitle {
  font-size: var(--font-size-sm);
  opacity: 0.8;
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
}

.modal-reset {
  background: none;
  border: none;
  color: white;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  cursor: pointer;
}

.modal-content {
  overflow-y: auto;
  flex: 1;
  padding: var(--space-lg);
}

.filter-section {
  margin-bottom: var(--space-2xl);
}

.filter-section-title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  color: var(--color-navy);
  margin: 0 0 var(--space-md) 0;
  text-transform: uppercase;
  font-size: 14px;
  letter-spacing: 0.5px;
}

.filter-section-hint {
  font-size: var(--font-size-xs);
  color: var(--color-gray-500);
  text-transform: uppercase;
  margin: 0;
  margin-top: 2px;
}

/* Toggle Switch */
.toggle-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-lg);
  background: var(--color-gray-50);
  border-radius: var(--radius-lg);
  margin-bottom: var(--space-lg);
}

.toggle-label {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  color: var(--color-navy);
  margin: 0;
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

/* Search Input */
.filter-search {
  width: 100%;
  padding: var(--space-md) var(--space-lg);
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  margin-bottom: var(--space-lg);
  font-family: inherit;
}

.filter-search::placeholder {
  color: var(--color-gray-400);
}

/* Selected Pills */
.selected-pills {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  margin-bottom: var(--space-lg);
  padding: var(--space-lg);
  background: var(--color-gray-50);
  border-radius: var(--radius-lg);
}

.selected-pills:empty {
  display: none;
}

.pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: white;
  border: 1px solid var(--color-gray-300);
  padding: 6px 12px;
  border-radius: var(--radius-full);
  font-size: 13px;
  color: var(--color-navy);
}

.pill-close {
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}

/* Filter Options */
.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
}

.filter-button {
  padding: 8px 16px;
  background: white;
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--color-gray-700);
}

.filter-button:hover {
  border-color: var(--color-navy);
  color: var(--color-navy);
}

.filter-button.active {
  background: var(--color-navy);
  color: white;
  border-color: var(--color-navy);
}

/* Range Slider */
.range-slider {
  margin-bottom: var(--space-lg);
}

.range-input {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: var(--color-gray-300);
  outline: none;
  -webkit-appearance: none;
}

.range-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--color-navy);
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 61, 122, 0.3);
}

.range-input::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--color-navy);
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 6px rgba(0, 61, 122, 0.3);
}

.range-labels {
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-xs);
  color: var(--color-gray-600);
  margin-top: var(--space-sm);
}

.range-values {
  text-align: center;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  color: var(--color-navy);
  margin-bottom: var(--space-md);
}

/* Dropdown/Select */
.dropdown-select {
  width: 100%;
  padding: var(--space-md) var(--space-lg);
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  font-family: inherit;
  background: white;
  cursor: pointer;
  color: var(--color-navy);
}

.dropdown-select:hover {
  border-color: var(--color-navy);
}

/* Modal Footer */
.modal-footer {
  padding: var(--space-lg);
  border-top: 1px solid var(--color-gray-200);
  display: flex;
  gap: var(--space-lg);
}

.apply-button {
  flex: 1;
}
```

## Template Structure

```typescript
render() {
  return html`
    <div class="modal-overlay" @click=${(e: Event) => this.handleBackdropClick(e)}>
      <div class="modal" @click=${(e: Event) => e.stopPropagation()}>
        <!-- Header -->
        <div class="modal-header">
          <div>
            <h2 class="modal-title">Filters</h2>
            <p class="modal-subtitle">Refine your alumni job search</p>
          </div>
          <div style="display: flex; gap: 16px; align-items: center;">
            <button class="modal-reset" @click=${this.handleReset}>Reset</button>
            <button class="modal-close" @click=${this.handleClose}>✕</button>
          </div>
        </div>

        <!-- Content -->
        <div class="modal-content">
          <!-- Blue Knight Priority Toggle -->
          <div class="filter-section">
            <div class="toggle-wrapper">
              <span class="toggle-label">Blue Knight Priority</span>
              <button
                class="toggle-switch ${this.bluekKnightPriority ? 'active' : ''}"
                @click=${() => this.bluekKnightPriority = !this.bluekKnightPriority}
              ></button>
            </div>
          </div>

          <!-- Skills Filter -->
          ${this.renderSkillsFilter()}

          <!-- Location Filter -->
          ${this.renderLocationFilter()}

          <!-- Industry Filter -->
          ${this.renderIndustryFilter()}

          <!-- Job Type Filter -->
          ${this.renderJobTypeFilter()}

          <!-- Experience Level -->
          ${this.renderExperienceFilter()}

          <!-- Salary Range -->
          ${this.renderSalaryFilter()}
        </div>

        <!-- Footer -->
        <div class="modal-footer">
          <blue-button variant="primary" full-width @click=${this.handleApply}>
            Apply Filter →
          </blue-button>
        </div>
      </div>
    </div>
  `;
}

private renderSkillsFilter() {
  const filteredSkills = this.availableSkills.filter(s =>
    s.toLowerCase().includes(this.skillSearch.toLowerCase())
  );

  return html`
    <div class="filter-section">
      <h3 class="filter-section-title">
        Filter by skills:
        <p class="filter-section-hint">SELECT UP TO 3 SKILLS</p>
      </h3>

      <input
        type="text"
        class="filter-search"
        placeholder="Search for skills"
        .value=${this.skillSearch}
        @input=${(e: Event) => this.skillSearch = (e.target as HTMLInputElement).value}
      />

      ${this.selectedSkills.length > 0 ? html`
        <div class="selected-pills">
          ${this.selectedSkills.map(skill => html`
            <div class="pill">
              ${skill}
              <span class="pill-close" @click=${() => this.removeSkill(skill)}>×</span>
            </div>
          `)}
        </div>
      ` : ''}

      <div class="filter-options">
        ${filteredSkills.map(skill => html`
          <button
            class="filter-button ${this.selectedSkills.includes(skill) ? 'active' : ''}"
            @click=${() => this.toggleSkill(skill)}
            ?disabled=${this.selectedSkills.length >= 3 && !this.selectedSkills.includes(skill)}
          >
            ${skill}
          </button>
        `)}
      </div>
    </div>
  `;
}

private renderLocationFilter() {
  const filteredLocations = this.availableLocations.filter(l =>
    l.toLowerCase().includes(this.locationSearch.toLowerCase())
  );

  return html`
    <div class="filter-section">
      <h3 class="filter-section-title">Location</h3>

      <input
        type="text"
        class="filter-search"
        placeholder="Search city or region..."
        .value=${this.locationSearch}
        @input=${(e: Event) => this.locationSearch = (e.target as HTMLInputElement).value}
      />

      ${this.selectedLocations.length > 0 ? html`
        <div class="selected-pills">
          ${this.selectedLocations.map(loc => html`
            <div class="pill">
              ${loc}
              <span class="pill-close" @click=${() => this.removeLocation(loc)}>×</span>
            </div>
          `)}
        </div>
      ` : ''}

      <div class="filter-options">
        ${filteredLocations.map(location => html`
          <button
            class="filter-button ${this.selectedLocations.includes(location) ? 'active' : ''}"
            @click=${() => this.toggleLocation(location)}
          >
            ${location}
          </button>
        `)}
      </div>
    </div>
  `;
}

private renderIndustryFilter() {
  return html`
    <div class="filter-section">
      <h3 class="filter-section-title">Industry</h3>

      <div class="filter-options">
        ${this.availableIndustries.map(industry => html`
          <button
            class="filter-button ${this.selectedIndustries.includes(industry) ? 'active' : ''}"
            @click=${() => this.toggleIndustry(industry)}
          >
            ${industry}
          </button>
        `)}
      </div>
    </div>
  `;
}

private renderJobTypeFilter() {
  return html`
    <div class="filter-section">
      <h3 class="filter-section-title">
        Job Type
        <p class="filter-section-hint">SELECT ALL THAT APPLY</p>
      </h3>

      <div class="filter-options">
        ${this.availableJobTypes.map(jobType => html`
          <button
            class="filter-button ${this.selectedJobTypes.includes(jobType) ? 'active' : ''}"
            @click=${() => this.toggleJobType(jobType)}
          >
            ${jobType}
          </button>
        `)}
      </div>
    </div>
  `;
}

private renderExperienceFilter() {
  return html`
    <div class="filter-section">
      <h3 class="filter-section-title">Experience Level</h3>

      <select
        class="dropdown-select"
        .value=${this.experienceLevel}
        @change=${(e: Event) => this.experienceLevel = (e.target as HTMLSelectElement).value}
      >
        ${this.experienceLevels.map(level => html`
          <option value=${level.value}>${level.label}</option>
        `)}
      </select>
    </div>
  `;
}

private renderSalaryFilter() {
  return html`
    <div class="filter-section">
      <h3 class="filter-section-title">Monthly Salary</h3>

      <div class="range-values">
        ₱${this.salaryRange[0]}k - ₱${this.salaryRange[1]}k
      </div>

      <div class="range-slider">
        <input
          type="range"
          class="range-input"
          min="20"
          max="300"
          .value=${this.salaryRange[0]}
          @input=${(e: Event) => this.handleMinSalary(e)}
        />
      </div>

      <div class="range-slider">
        <input
          type="range"
          class="range-input"
          min="20"
          max="300"
          .value=${this.salaryRange[1]}
          @input=${(e: Event) => this.handleMaxSalary(e)}
        />
      </div>

      <div class="range-labels">
        <span>₱20k</span>
        <span>₱300k+</span>
      </div>
    </div>
  `;
}

// Event handlers
private toggleSkill(skill: string) {
  if (this.selectedSkills.includes(skill)) {
    this.selectedSkills = this.selectedSkills.filter(s => s !== skill);
  } else if (this.selectedSkills.length < 3) {
    this.selectedSkills = [...this.selectedSkills, skill];
  }
}

private removeSkill(skill: string) {
  this.selectedSkills = this.selectedSkills.filter(s => s !== skill);
}

private toggleLocation(location: string) {
  if (this.selectedLocations.includes(location)) {
    this.selectedLocations = this.selectedLocations.filter(l => l !== location);
  } else {
    this.selectedLocations = [...this.selectedLocations, location];
  }
}

private removeLocation(location: string) {
  this.selectedLocations = this.selectedLocations.filter(l => l !== location);
}

private toggleIndustry(industry: string) {
  if (this.selectedIndustries.includes(industry)) {
    this.selectedIndustries = this.selectedIndustries.filter(i => i !== industry);
  } else {
    this.selectedIndustries = [...this.selectedIndustries, industry];
  }
}

private toggleJobType(jobType: string) {
  if (this.selectedJobTypes.includes(jobType)) {
    this.selectedJobTypes = this.selectedJobTypes.filter(j => j !== jobType);
  } else {
    this.selectedJobTypes = [...this.selectedJobTypes, jobType];
  }
}

private handleMinSalary(e: Event) {
  const min = parseInt((e.target as HTMLInputElement).value);
  if (min <= this.salaryRange[1]) {
    this.salaryRange = [min, this.salaryRange[1]];
  }
}

private handleMaxSalary(e: Event) {
  const max = parseInt((e.target as HTMLInputElement).value);
  if (max >= this.salaryRange[0]) {
    this.salaryRange = [this.salaryRange[0], max];
  }
}

private handleApply() {
  this.dispatchEvent(new CustomEvent('apply-filters', {
    detail: {
      bluekKnightPriority: this.bluekKnightPriority,
      skills: this.selectedSkills,
      locations: this.selectedLocations,
      industries: this.selectedIndustries,
      jobTypes: this.selectedJobTypes,
      experienceLevel: this.experienceLevel,
      salaryRange: this.salaryRange
    },
    bubbles: true,
    composed: true
  }));
  this.handleClose();
}

private handleReset() {
  this.bluekKnightPriority = true;
  this.selectedSkills = [];
  this.selectedLocations = [];
  this.selectedIndustries = [];
  this.selectedJobTypes = [];
  this.experienceLevel = 'executive-10+';
  this.salaryRange = [20, 300];
  this.skillSearch = '';
  this.locationSearch = '';
}

private handleClose() {
  this.dispatchEvent(new CustomEvent('close-modal', {
    bubbles: true,
    composed: true
  }));
}

private handleBackdropClick(e: Event) {
  if (e.target === e.currentTarget) {
    this.handleClose();
  }
}
```

## Usage in Job Board

```typescript
// In job-board-page.ts
<blue-filter-modal
  .open=${this.filterModalOpen}
  @apply-filters=${(e: CustomEvent) => this.handleFilterApply(e)}
  @close-modal=${() => this.filterModalOpen = false}
></blue-filter-modal>

// Handler
private handleFilterApply(e: CustomEvent) {
  const filters = e.detail;
  this.activeFilters = {
    skills: filters.skills,
    locations: filters.locations,
    industry: filters.industries
  };
  this.filterJobs();
}
```

---

## Key Features

- ✅ Toggle for Blue Knight Priority
- ✅ Multi-select skills (up to 3, with search)
- ✅ Multi-select locations (with search)
- ✅ Multi-select industries
- ✅ Multi-select job types
- ✅ Dropdown for experience level
- ✅ Dual range slider for salary
- ✅ Selected pills with remove buttons
- ✅ Reset all filters button
- ✅ Apply filters button
- ✅ Modal slides up from bottom
- ✅ Click backdrop to close

---

## Deliverables

Create:
- ✅ `src/components/modals/filter-modal.ts`
- ✅ All filter controls functional
- ✅ Dispatches apply-filters event with all selected values
- ✅ Dispatches close-modal event
- ✅ Reset button clears all filters
- ✅ Modal opens/closes smoothly

---

## After Implementation

Report back:
1. ✅ Filter modal created and renders?
2. ✅ All filter options working (skills, locations, industries, etc.)?
3. ✅ Selected pills showing correctly?
4. ✅ Range slider working for salary?
5. ✅ Apply and Reset buttons functional?
6. ✅ Modal animations smooth?

**Next:** MODULE 7 - Profile Page (final major feature)
