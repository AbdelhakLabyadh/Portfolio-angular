import { Component, input } from '@angular/core';
import { SectionCopy, SkillGroup } from '@portfolio/data';
import { CardComponent, SectionComponent, TagListComponent } from '@portfolio/ui';

@Component({
  selector: 'section-skills',
  imports: [CardComponent, SectionComponent, TagListComponent],
  template: `
    <ui-section
      tone="muted"
      [sectionId]="copy().id"
      [eyebrow]="copy().eyebrow"
      [heading]="copy().heading"
      [intro]="copy().intro"
    >
      <div class="grid gap-5 sm:grid-cols-2">
        @for (group of groups(); track group.name) {
          <ui-card>
            <h3 class="mb-4 font-semibold text-fg">{{ group.name }}</h3>
            <ui-tag-list [tags]="group.skills" [label]="group.name" />
          </ui-card>
        }
      </div>
    </ui-section>
  `,
})
export class SkillsComponent {
  public readonly copy = input.required<SectionCopy>();
  public readonly groups = input.required<readonly SkillGroup[]>();
}
