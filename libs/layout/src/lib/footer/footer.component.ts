import { Component, input } from '@angular/core';
import { ContactLink } from '@portfolio/data';
import { IconLinksComponent } from '@portfolio/ui';

@Component({
  selector: 'layout-footer',
  imports: [IconLinksComponent],
  host: { class: 'block border-t border-line' },
  template: `
    <div
      class="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-fg-muted sm:flex-row sm:px-8"
    >
      <p>© {{ name() }} · Built with Angular, Nx and Tailwind CSS</p>
      <ui-icon-links label="Social profiles" [links]="contacts()" [kinds]="['linkedin', 'github']" [iconSize]="18" />
    </div>
  `,
})
export class FooterComponent {
  public readonly name = input.required<string>();
  public readonly contacts = input.required<readonly ContactLink[]>();
}
