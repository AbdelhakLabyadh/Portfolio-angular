import { Component, computed, input } from '@angular/core';
import { IconName, ICONS } from './icons';

@Component({
  selector: 'ui-icon',
  host: { class: 'inline-flex shrink-0' },
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
      [attr.width]="size()"
      [attr.height]="size()"
    >
      @for (path of paths(); track $index) {
        <svg:path [attr.d]="path" />
      }
    </svg>
  `,
})
export class IconComponent {
  public readonly name = input.required<IconName>();
  public readonly size = input(20);

  protected readonly paths = computed(() => ICONS[this.name()]);
}
