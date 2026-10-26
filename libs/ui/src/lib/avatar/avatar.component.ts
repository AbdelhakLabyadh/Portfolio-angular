import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'ui-avatar',
  imports: [NgOptimizedImage],
  host: { class: 'inline-flex' },
  template: `
    @if (photoUrl(); as src) {
      <img
        [ngSrc]="src"
        [width]="size()"
        [height]="size()"
        [alt]="alt()"
        priority
        class="rounded-full object-cover ring-4 ring-accent-soft"
      />
    } @else {
      <span
        role="img"
        [attr.aria-label]="alt()"
        class="flex items-center justify-center rounded-full bg-accent font-bold text-on-accent ring-4 ring-accent-soft"
        [style.width.px]="size()"
        [style.height.px]="size()"
        [style.font-size.px]="size() / 2.6"
      >
        {{ initials() }}
      </span>
    }
  `,
})
export class AvatarComponent {
  public readonly initials = input.required<string>();
  public readonly alt = input.required<string>();
  public readonly photoUrl = input<string>();
  public readonly size = input(96);
}
