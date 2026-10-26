import { Component, computed, input } from '@angular/core';
import { ButtonDirective } from '../button/button.directive';
import { IconComponent } from '../icon/icon.component';
import { IconName } from '../icon/icons';

export interface IconLink {
  kind: IconName;
  label: string;
  href?: string;
}

@Component({
  selector: 'ui-icon-links',
  imports: [ButtonDirective, IconComponent],
  host: { class: 'block' },
  template: `
    <ul class="flex items-center gap-1" [attr.aria-label]="label()">
      @for (link of visibleLinks(); track link.href) {
        <li>
          <a
            uiButton
            variant="ghost"
            size="icon"
            [href]="link.href"
            [attr.aria-label]="link.label"
            [attr.target]="link.external ? '_blank' : null"
            [attr.rel]="link.external ? 'noopener noreferrer' : null"
          >
            <ui-icon [name]="link.kind" [size]="iconSize()" />
          </a>
        </li>
      }
    </ul>
  `,
})
export class IconLinksComponent {
  public readonly links = input.required<readonly IconLink[]>();
  public readonly label = input.required<string>();
  public readonly kinds = input<readonly IconName[]>();
  public readonly iconSize = input(20);

  protected readonly visibleLinks = computed(() => {
    const kinds = this.kinds();
    return this.links()
      .filter(link => link.href && (!kinds || kinds.includes(link.kind)))
      .map(link => ({ ...link, href: link.href as string, external: link.href?.startsWith('http') ?? false }));
  });
}
