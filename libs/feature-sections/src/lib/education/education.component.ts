import { Component, input } from '@angular/core';
import { Education, SectionCopy } from '@portfolio/data';
import { CardComponent, IconComponent, SectionComponent } from '@portfolio/ui';

@Component({
  selector: 'section-education',
  imports: [CardComponent, IconComponent, SectionComponent],
  template: `
    <ui-section [sectionId]="copy().id" [eyebrow]="copy().eyebrow" [heading]="copy().heading" [intro]="copy().intro">
      <ul class="grid gap-5 md:grid-cols-3">
        @for (item of items(); track item.degree) {
          <li>
            <ui-card class="h-full">
              <span class="flex size-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <ui-icon name="graduation" />
              </span>
              <p class="mt-4 text-sm font-medium text-fg-muted">{{ item.year }}</p>
              <h3 class="mt-1 font-semibold text-fg">
                {{ item.degree }}
                @if (item.field) {
                  <span class="block text-accent">{{ item.field }}</span>
                }
              </h3>
              <p class="mt-3 text-sm text-fg-muted">{{ item.institution }}</p>
              <p class="text-sm text-fg-muted">{{ item.location }}</p>
            </ui-card>
          </li>
        }
      </ul>
    </ui-section>
  `,
})
export class EducationComponent {
  public readonly copy = input.required<SectionCopy>();
  public readonly items = input.required<readonly Education[]>();
}
