import { Component, inject, input } from '@angular/core';
import { ContactLink, UI_COPY } from '@portfolio/data';
import { IconLinksComponent } from '@portfolio/ui';

@Component({
  selector: 'layout-footer',
  imports: [IconLinksComponent],
  host: { class: 'block border-t border-line' },
  template: `
    <div
      class="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-fg-muted sm:flex-row sm:px-8"
    >
      <p>© {{ name() }} · {{ copy.builtWith }}</p>
      <ui-icon-links
        [label]="copy.socialProfiles"
        [links]="contacts()"
        [kinds]="['linkedin', 'github']"
        [iconSize]="18"
      />
    </div>
  `,
})
export class FooterComponent {
  public readonly name = input.required<string>();
  public readonly contacts = input.required<readonly ContactLink[]>();

  protected readonly copy = inject(UI_COPY);
}
