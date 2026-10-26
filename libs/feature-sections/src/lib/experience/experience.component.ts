import { Component, input } from '@angular/core';
import { Experience, PeriodPipe, SectionCopy } from '@portfolio/data';
import { IconComponent, SectionComponent, TagListComponent, TimelineItemComponent } from '@portfolio/ui';

@Component({
  selector: 'section-experience',
  imports: [IconComponent, PeriodPipe, SectionComponent, TagListComponent, TimelineItemComponent],
  template: `
    <ui-section [sectionId]="copy().id" [eyebrow]="copy().eyebrow" [heading]="copy().heading" [intro]="copy().intro">
      <ol class="space-y-8">
        @for (job of items(); track job.id) {
          <li>
            <ui-timeline-item
              [heading]="job.role"
              [organization]="job.company"
              [period]="job.period | period"
              [location]="job.location"
            >
              <p class="text-fg">{{ job.summary }}</p>
              <ul class="mt-4 space-y-2">
                @for (highlight of job.highlights; track $index) {
                  <li class="flex gap-3 text-fg-muted">
                    <ui-icon name="check" [size]="18" class="mt-1 text-accent" />
                    <span>{{ highlight }}</span>
                  </li>
                }
              </ul>
              <ui-tag-list class="mt-6" size="sm" [tags]="job.stack" [label]="job.company + ' tech stack'" />
            </ui-timeline-item>
          </li>
        }
      </ol>
    </ui-section>
  `,
})
export class ExperienceComponent {
  public readonly copy = input.required<SectionCopy>();
  public readonly items = input.required<readonly Experience[]>();
}
