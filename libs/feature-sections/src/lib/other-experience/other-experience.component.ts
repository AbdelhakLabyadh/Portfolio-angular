import { Component, input } from '@angular/core';
import { Experience, PeriodPipe, SectionCopy } from '@portfolio/data';
import { CardComponent, SectionComponent, TimelineItemComponent } from '@portfolio/ui';

@Component({
  selector: 'section-other-experience',
  imports: [CardComponent, PeriodPipe, SectionComponent, TimelineItemComponent],
  template: `
    <ui-section
      tone="muted"
      [sectionId]="copy().id"
      [eyebrow]="copy().eyebrow"
      [heading]="copy().heading"
      [intro]="copy().intro"
    >
      <ui-card padding="lg">
        <ol>
          @for (job of items(); track job.id) {
            <li class="[&:last-child_article]:pb-0">
              <ui-timeline-item
                variant="compact"
                [heading]="job.role"
                [organization]="job.company"
                [period]="job.period | period"
                [context]="job.context"
                [location]="job.location"
              >
                {{ job.summary }}
              </ui-timeline-item>
            </li>
          }
        </ol>
      </ui-card>
    </ui-section>
  `,
})
export class OtherExperienceComponent {
  public readonly copy = input.required<SectionCopy>();
  public readonly items = input.required<readonly Experience[]>();
}
