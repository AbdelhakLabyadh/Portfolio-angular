import { Pipe, PipeTransform } from '@angular/core';
import { Period, YearMonth } from './models';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function formatYearMonth({ year, month }: YearMonth): string {
  return `${MONTHS[month - 1]} ${year}`;
}

export function formatPeriod({ start, end }: Period): string {
  return `${formatYearMonth(start)} – ${end ? formatYearMonth(end) : 'Present'}`;
}

@Pipe({ name: 'period' })
export class PeriodPipe implements PipeTransform {
  public transform(period: Period): string {
    return formatPeriod(period);
  }
}
