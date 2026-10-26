import { isPlatformBrowser } from '@angular/common';
import { computed, DOCUMENT, effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'portfolio-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly themeState = signal<Theme>(this.readInitialTheme());

  public readonly theme = this.themeState.asReadonly();
  public readonly isDark = computed(() => this.theme() === 'dark');

  constructor() {
    effect(() => this.document.documentElement.classList.toggle('dark', this.isDark()));
  }

  public toggle(): void {
    this.setTheme(this.isDark() ? 'light' : 'dark');
  }

  public setTheme(theme: Theme): void {
    this.themeState.set(theme);
    if (this.isBrowser) {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
  }

  private readInitialTheme(): Theme {
    if (!this.isBrowser) {
      return 'light';
    }
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}
