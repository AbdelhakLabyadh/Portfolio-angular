import { formatPeriod, PeriodPipe } from './period';

describe('formatPeriod', () => {
  it('formats a closed period', () => {
    expect(formatPeriod({ start: { year: 2022, month: 5 }, end: { year: 2024, month: 4 } })).toBe(
      'May 2022 – Apr 2024'
    );
  });

  it('marks an open period as present', () => {
    expect(formatPeriod({ start: { year: 2025, month: 7 } })).toBe('Jul 2025 – Present');
  });

  it('is exposed through the period pipe', () => {
    expect(new PeriodPipe().transform({ start: { year: 2017, month: 2 }, end: { year: 2017, month: 5 } })).toBe(
      'Feb 2017 – May 2017'
    );
  });
});
