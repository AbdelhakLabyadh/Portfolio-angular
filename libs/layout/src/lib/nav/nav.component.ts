import { Component, computed, input, output } from '@angular/core';
import { NavItem } from '@portfolio/data';

export type NavOrientation = 'horizontal' | 'vertical';

@Component({
  selector: 'layout-nav',
  host: { class: 'block' },
  template: `
    <nav [attr.aria-label]="label()">
      <ul [class]="listClasses()">
        @for (item of items(); track item.id) {
          <li>
            <a
              [href]="'#' + item.id"
              [attr.aria-current]="item.id === activeId() ? 'location' : null"
              [class]="linkClasses()"
              [class.text-accent]="item.id === activeId()"
              [class.bg-accent-soft]="item.id === activeId()"
              (click)="navigate.emit(item.id)"
            >
              {{ item.label }}
            </a>
          </li>
        }
      </ul>
    </nav>
  `,
})
export class NavComponent {
  public readonly items = input.required<readonly NavItem[]>();
  public readonly activeId = input<string | null>(null);
  public readonly orientation = input<NavOrientation>('horizontal');
  public readonly label = input('Main');
  public readonly navigate = output<string>();

  protected readonly listClasses = computed(() =>
    this.orientation() === 'horizontal' ? 'flex items-center gap-1' : 'flex flex-col gap-1'
  );

  protected readonly linkClasses = computed(
    () =>
      `block rounded-full font-medium text-fg-muted transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-focus ${
        this.orientation() === 'horizontal' ? 'px-3 py-2 text-sm' : 'px-4 py-3 text-base'
      }`
  );
}
