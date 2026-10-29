import { inject, Pipe, PipeTransform } from '@angular/core';
import { Locale, Period, YearMonth } from './models';
import { LOCALE } from './portfolio.token';

const MONTHS: Record<Locale, readonly string[]> = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  fr: ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'],
};

const PRESENT: Record<Locale, string> = { en: 'Present', fr: "aujourd'hui" };

export function formatYearMonth({ year, month }: YearMonth, locale: Locale = 'en'): string {
  return `${MONTHS[locale][month - 1]} ${year}`;
}

export function formatPeriod({ start, end }: Period, locale: Locale = 'en'): string {
  return `${formatYearMonth(start, locale)} – ${end ? formatYearMonth(end, locale) : PRESENT[locale]}`;
}

@Pipe({ name: 'period' })
export class PeriodPipe implements PipeTransform {
  private readonly locale = inject(LOCALE);

  public transform(period: Period): string {
    return formatPeriod(period, this.locale);
  }
}
