import { Component, inject, input } from '@angular/core';
import { Certification, SectionCopy, UI_COPY } from '@portfolio/data';
import { CardComponent, IconComponent, SectionComponent, TagListComponent } from '@portfolio/ui';

@Component({
  selector: 'section-certifications',
  imports: [CardComponent, IconComponent, SectionComponent, TagListComponent],
  template: `
    <ui-section
      tone="muted"
      [sectionId]="copy().id"
      [eyebrow]="copy().eyebrow"
      [heading]="copy().heading"
      [intro]="copy().intro"
    >
      <div class="grid gap-5 md:grid-cols-[2fr_1fr]">
        <ui-card>
          <h3 class="flex items-center gap-2 font-semibold text-fg">
            <ui-icon name="award" class="text-accent" />
            {{ ui.certificatesAndTraining }}
          </h3>
          <ul class="mt-4 divide-y divide-line">
            @for (certification of certifications(); track certification.name) {
              <li class="flex flex-col py-3 sm:flex-row sm:items-center sm:justify-between">
                <span class="font-medium text-fg">{{ certification.name }}</span>
                <span class="text-sm text-fg-muted">{{ certification.issuer }}</span>
              </li>
            }
          </ul>
        </ui-card>
        <ui-card>
          <h3 class="flex items-center gap-2 font-semibold text-fg">
            <ui-icon name="globe" class="text-accent" />
            {{ ui.languages }}
          </h3>
          <ui-tag-list class="mt-4" [label]="ui.languages" [tags]="languages()" />
        </ui-card>
      </div>
    </ui-section>
  `,
})
export class CertificationsComponent {
  public readonly copy = input.required<SectionCopy>();
  public readonly certifications = input.required<readonly Certification[]>();
  public readonly languages = input.required<readonly string[]>();

  protected readonly ui = inject(UI_COPY);
}
