import { computed, Directive, input } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'md' | 'icon';

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:pointer-events-none disabled:opacity-50';

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-on-accent hover:bg-accent-strong',
  secondary: 'border border-line bg-surface-raised text-fg hover:border-accent hover:text-accent',
  ghost: 'text-fg-muted hover:bg-surface-sunken hover:text-fg',
};

const SIZES: Record<ButtonSize, string> = {
  md: 'h-11 px-5 text-sm',
  icon: 'size-10',
};

@Directive({
  selector: 'a[uiButton], button[uiButton]',
  host: { '[class]': 'classes()' },
})
export class ButtonDirective {
  public readonly variant = input<ButtonVariant>('primary');
  public readonly size = input<ButtonSize>('md');

  protected readonly classes = computed(() => `${BASE} ${VARIANTS[this.variant()]} ${SIZES[this.size()]}`);
}
