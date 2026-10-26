import { InjectionToken } from '@angular/core';
import { NavItem, Portfolio } from './models';
import { portfolio } from './portfolio.data';

export const PORTFOLIO = new InjectionToken<Portfolio>('PORTFOLIO', {
  providedIn: 'root',
  factory: () => portfolio,
});

export function toNavItems({ sections }: Portfolio): NavItem[] {
  return Object.values(sections).flatMap(({ id, navLabel }) => (navLabel ? [{ id, label: navLabel }] : []));
}
