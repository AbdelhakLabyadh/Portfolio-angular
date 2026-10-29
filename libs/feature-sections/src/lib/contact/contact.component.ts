import { Component, computed, inject, input } from '@angular/core';
import { ContactLink, Profile, SectionCopy, UI_COPY } from '@portfolio/data';
import { ButtonDirective, CardComponent, IconComponent, SectionComponent } from '@portfolio/ui';

@Component({
  selector: 'section-contact',
  imports: [ButtonDirective, CardComponent, IconComponent, SectionComponent],
  template: `
    <ui-section [sectionId]="copy().id" [eyebrow]="copy().eyebrow" [heading]="copy().heading" [intro]="copy().intro">
      <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        @for (contact of contacts(); track contact.kind) {
          <li>
            <ui-card padding="sm" class="h-full">
              <div class="flex items-center gap-4">
                <span class="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <ui-icon [name]="contact.kind" />
                </span>
                <div class="min-w-0">
                  <p class="text-sm text-fg-muted">{{ contact.label }}</p>
                  @if (contact.href) {
                    <a
                      class="block truncate font-medium text-fg underline-offset-4 hover:text-accent hover:underline focus-visible:outline-2 focus-visible:outline-focus"
                      [href]="contact.href"
                      [attr.target]="isExternal(contact) ? '_blank' : null"
                      [attr.rel]="isExternal(contact) ? 'noopener noreferrer' : null"
                    >
                      {{ contact.value }}
                    </a>
                  } @else {
                    <p class="truncate font-medium text-fg">{{ contact.value }}</p>
                  }
                </div>
              </div>
            </ui-card>
          </li>
        }
      </ul>
      <div class="mt-10 flex flex-wrap gap-3">
        @if (email(); as mail) {
          <a uiButton [href]="mail.href">
            <ui-icon name="mail" [size]="18" />
            {{ ui.sendEmail }}
          </a>
        }
        <a uiButton variant="secondary" [href]="profile().cvUrl" [attr.download]="profile().cvFileName">
          <ui-icon name="download" [size]="18" />
          {{ ui.downloadCv }}
        </a>
      </div>
    </ui-section>
  `,
})
export class ContactComponent {
  public readonly copy = input.required<SectionCopy>();
  public readonly profile = input.required<Profile>();
  public readonly contacts = input.required<readonly ContactLink[]>();

  protected readonly ui = inject(UI_COPY);
  protected readonly email = computed(() => this.contacts().find(({ kind }) => kind === 'mail'));

  protected isExternal({ href }: ContactLink): boolean {
    return href?.startsWith('http') ?? false;
  }
}
