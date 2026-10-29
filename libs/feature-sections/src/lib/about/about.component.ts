import { Component, inject, input } from '@angular/core';
import { Profile, SectionCopy, UI_COPY } from '@portfolio/data';
import { CardComponent, SectionComponent } from '@portfolio/ui';

@Component({
  selector: 'section-about',
  imports: [CardComponent, SectionComponent],
  template: `
    <ui-section [sectionId]="copy().id" [eyebrow]="copy().eyebrow" [heading]="copy().heading" [intro]="copy().intro">
      <div class="grid gap-10 lg:grid-cols-[3fr_2fr]">
        <div class="space-y-5 text-lg leading-relaxed text-fg-muted">
          @for (paragraph of profile().summary; track $index) {
            <p>{{ paragraph }}</p>
          }
        </div>
        <ul class="grid grid-cols-2 gap-4 self-start" [attr.aria-label]="ui.highlights">
          @for (fact of profile().facts; track fact.value) {
            <li>
              <ui-card padding="sm" class="h-full">
                <p class="text-xl font-bold text-accent">{{ fact.value }}</p>
                <p class="mt-1 text-sm text-fg-muted">{{ fact.label }}</p>
              </ui-card>
            </li>
          }
        </ul>
      </div>
    </ui-section>
  `,
})
export class AboutComponent {
  public readonly copy = input.required<SectionCopy>();
  public readonly profile = input.required<Profile>();

  protected readonly ui = inject(UI_COPY);
}
