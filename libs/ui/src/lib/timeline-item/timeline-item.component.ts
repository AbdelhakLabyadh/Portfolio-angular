import { NgTemplateOutlet } from '@angular/common';
import { Component, input } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { IconComponent } from '../icon/icon.component';

export type TimelineItemVariant = 'featured' | 'compact';

@Component({
  selector: 'ui-timeline-item',
  imports: [CardComponent, IconComponent, NgTemplateOutlet],
  host: { class: 'block' },
  template: `
    <ng-template #content><ng-content /></ng-template>

    @if (variant() === 'featured') {
      <ui-card padding="lg" [accent]="true">
        <article>
          <header class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 class="text-xl font-bold text-fg sm:text-2xl">{{ heading() }}</h3>
              <p class="mt-1 flex items-center gap-2 font-semibold text-accent">
                <ui-icon name="briefcase" [size]="18" />
                {{ organization() }}
              </p>
            </div>
            <div class="flex flex-col gap-1 text-sm text-fg-muted sm:items-end">
              <p class="font-medium whitespace-nowrap">{{ period() }}</p>
              @if (location()) {
                <p class="flex items-center gap-1"><ui-icon name="map-pin" [size]="14" />{{ location() }}</p>
              }
            </div>
          </header>
          <div class="mt-5">
            <ng-container [ngTemplateOutlet]="content" />
          </div>
        </article>
      </ui-card>
    } @else {
      <article class="relative border-l-2 border-line pb-8 pl-6">
        <span class="absolute top-1.5 -left-[7px] size-3 rounded-full border-2 border-accent bg-surface"></span>
        <p class="text-sm font-medium text-fg-muted">{{ period() }}</p>
        <h3 class="mt-1 font-semibold text-fg">
          {{ heading() }} <span class="text-fg-muted">·</span> <span class="text-accent">{{ organization() }}</span>
        </h3>
        @if (context() || location()) {
          <p class="text-sm text-fg-muted">{{ context() || location() }}</p>
        }
        <div class="mt-2 text-fg-muted">
          <ng-container [ngTemplateOutlet]="content" />
        </div>
      </article>
    }
  `,
})
export class TimelineItemComponent {
  public readonly heading = input.required<string>();
  public readonly organization = input.required<string>();
  public readonly period = input.required<string>();
  public readonly context = input<string>();
  public readonly location = input<string>();
  public readonly variant = input<TimelineItemVariant>('featured');
}
