import { InjectionToken, Provider } from '@angular/core';
import { Locale, NavItem, Portfolio, UiCopy } from './models';
import { portfolio } from './portfolio.data';
import { portfolioFr } from './portfolio.fr';
import { uiCopy } from './ui-copy';

export const portfolios: Record<Locale, Portfolio> = { en: portfolio, fr: portfolioFr };

export const LOCALE = new InjectionToken<Locale>('LOCALE', {
  providedIn: 'root',
  factory: () => 'en',
});

export const PORTFOLIO = new InjectionToken<Portfolio>('PORTFOLIO', {
  providedIn: 'root',
  factory: () => portfolio,
});

export const UI_COPY = new InjectionToken<UiCopy>('UI_COPY', {
  providedIn: 'root',
  factory: () => uiCopy.en,
});

export function provideLocale(locale: Locale): Provider[] {
  return [
    { provide: LOCALE, useValue: locale },
    { provide: PORTFOLIO, useValue: portfolios[locale] },
    { provide: UI_COPY, useValue: uiCopy[locale] },
  ];
}

export function toNavItems({ sections }: Portfolio): NavItem[] {
  return Object.values(sections).flatMap(({ id, navLabel }) => (navLabel ? [{ id, label: navLabel }] : []));
}
