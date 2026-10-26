import { Component, computed, input } from '@angular/core';

export type CardPadding = 'sm' | 'md' | 'lg';

const PADDING: Record<CardPadding, string> = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-6 sm:p-8',
};

@Component({
  selector: 'ui-card',
  host: { '[class]': 'classes()' },
  template: `<ng-content />`,
})
export class CardComponent {
  public readonly padding = input<CardPadding>('md');
  public readonly accent = input(false);

  protected readonly classes = computed(() =>
    [
      'block rounded-2xl border border-line bg-surface-raised shadow-card',
      PADDING[this.padding()],
      this.accent() ? 'border-t-4 border-t-accent' : '',
    ].join(' ')
  );
}
