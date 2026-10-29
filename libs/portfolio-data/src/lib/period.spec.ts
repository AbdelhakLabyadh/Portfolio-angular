import { TestBed } from '@angular/core/testing';
import { formatPeriod, PeriodPipe } from './period';
import { LOCALE } from './portfolio.token';

describe('formatPeriod', () => {
  it('formats a closed period', () => {
    expect(formatPeriod({ start: { year: 2022, month: 5 }, end: { year: 2024, month: 4 } })).toBe(
      'May 2022 – Apr 2024'
    );
  });

  it('marks an open period as present', () => {
    expect(formatPeriod({ start: { year: 2025, month: 7 } })).toBe('Jul 2025 – Present');
  });

  it('formats periods in French', () => {
    expect(formatPeriod({ start: { year: 2024, month: 2 }, end: { year: 2024, month: 8 } }, 'fr')).toBe(
      'févr. 2024 – août 2024'
    );
    expect(formatPeriod({ start: { year: 2025, month: 7 } }, 'fr')).toBe("juil. 2025 – aujourd'hui");
  });

  it('is exposed through the period pipe in the active locale', () => {
    const period = { start: { year: 2017, month: 2 }, end: { year: 2017, month: 5 } };

    expect(TestBed.runInInjectionContext(() => new PeriodPipe()).transform(period)).toBe('Feb 2017 – May 2017');

    TestBed.resetTestingModule().configureTestingModule({ providers: [{ provide: LOCALE, useValue: 'fr' }] });
    expect(TestBed.runInInjectionContext(() => new PeriodPipe()).transform(period)).toBe('févr. 2017 – mai 2017');
  });
});
