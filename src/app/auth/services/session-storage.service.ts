import {Injectable, InjectionToken, Inject } from '@angular/core';

const TOKEN = 'SESSION_TOKEN'; // Use this constant for the session storage entry key
// Add your code here
const WINDOW = new InjectionToken<Window>('Window', {
  providedIn: 'root',
  factory: () => window
})

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor(@Inject(WINDOW) private window: Window) {}

  setToken(token: string): void {
    // Add your code here
    this.window.sessionStorage.setItem(TOKEN, token);
  }

  getToken(): string | null {
    // Add your code here
    return this.window.sessionStorage.getItem(TOKEN);
  }

  deleteToken(): void {
    // Add your code here
    this.window.sessionStorage.removeItem(TOKEN);
  }
}
