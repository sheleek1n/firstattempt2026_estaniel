export type PageType =
  | 'welcome'
  | 'login'
  | 'signup'
  | 'home'
  | 'jobs'
  | 'network'
  | 'notifications'
  | 'profile'
  | 'documents'
  | 'donation'
  | 'news'
  | 'calendar'
  | 'edit-profile';

export class Router {
  private currentPage: PageType = 'welcome';

  navigate(page: PageType): void {
    this.currentPage = page;
    window.dispatchEvent(new CustomEvent('route-change', { detail: { page } }));
  }

  getCurrentPage(): PageType {
    return this.currentPage;
  }
}

export const router = new Router();
