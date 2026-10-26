import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { THEME_STORAGE_KEY, ThemeService } from './theme.service';

describe('ThemeService', () => {
  function mockPrefersDark(matches: boolean): void {
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: jest.fn().mockReturnValue({ matches }),
    });
  }

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
    mockPrefersDark(false);
  });

  it('follows the system preference when nothing is stored', () => {
    mockPrefersDark(true);

    expect(TestBed.inject(ThemeService).theme()).toBe('dark');
  });

  it('prefers the stored theme over the system preference', () => {
    mockPrefersDark(true);
    localStorage.setItem(THEME_STORAGE_KEY, 'light');

    expect(TestBed.inject(ThemeService).theme()).toBe('light');
  });

  it('toggles, persists and applies the dark class', () => {
    const service = TestBed.inject(ThemeService);

    service.toggle();
    TestBed.tick();

    expect(service.isDark()).toBe(true);
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
    expect(document.documentElement.classList).toContain('dark');

    service.toggle();
    TestBed.tick();

    expect(document.documentElement.classList).not.toContain('dark');
  });

  it('defaults to light on the server without touching storage', () => {
    TestBed.configureTestingModule({ providers: [{ provide: PLATFORM_ID, useValue: 'server' }] });
    const getItem = jest.spyOn(Storage.prototype, 'getItem');

    expect(TestBed.inject(ThemeService).theme()).toBe('light');
    expect(getItem).not.toHaveBeenCalled();
    getItem.mockRestore();
  });
});
