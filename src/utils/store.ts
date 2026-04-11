export interface AppState {
  isLoggedIn: boolean;
  user: string | null;
  notifications: number;
}

export class Store extends EventTarget {
  private state: AppState = {
    isLoggedIn: false,
    user: null,
    notifications: 3
  };

  setState(updates: Partial<AppState>): void {
    this.state = { ...this.state, ...updates };
    this.dispatchEvent(new Event('change'));
  }

  getState(): AppState {
    return this.state;
  }
}

export const store = new Store();
