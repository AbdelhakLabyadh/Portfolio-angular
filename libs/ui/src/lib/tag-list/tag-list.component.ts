import { Component, computed, input } from '@angular/core';

export type TagSize = 'sm' | 'md';

const SIZES: Record<TagSize, string> = {
  sm: 'px-2.5 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
};

@Component({
  selector: 'ui-tag-list',
  host: { class: 'block' },
  template: `
    <ul class="flex flex-wrap gap-2" [attr.aria-label]="label()">
      @for (tag of tags(); track tag) {
        <li [class]="tagClasses()">{{ tag }}</li>
      }
    </ul>
  `,
})
export class TagListComponent {
  public readonly tags = input.required<readonly string[]>();
  public readonly label = input<string>();
  public readonly size = input<TagSize>('md');

  protected readonly tagClasses = computed(
    () => `rounded-full bg-accent-soft font-medium text-accent-on-soft ${SIZES[this.size()]}`
  );
}
