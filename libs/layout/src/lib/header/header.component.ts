import { Component, input, signal } from '@angular/core';
import { NavItem } from '@portfolio/data';
import { ButtonDirective, IconComponent } from '@portfolio/ui';
import { NavComponent } from '../nav/nav.component';
import { ThemeToggleComponent } from '../theme/theme-toggle.component';

@Component({
  selector: 'layout-header',
  imports: [ButtonDirective, IconComponent, NavComponent, ThemeToggleComponent],
  host: {
    class: 'sticky top-0 z-40 block border-b border-line bg-surface/85 backdrop-blur-md',
    '(document:keydown.escape)': 'closeMenu()',
  },
  template: `
    <div class="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-5 sm:px-8">
      <a
        href="#hero"
        class="flex items-center gap-2 rounded-full font-bold text-fg focus-visible:outline-2 focus-visible:outline-focus"
        (click)="closeMenu()"
      >
        <span
          class="flex size-8 items-center justify-center rounded-full bg-accent text-xs text-on-accent"
          aria-hidden="true"
          >{{ initials() }}</span
        >
        <span>{{ name() }}</span>
      </a>

      <div class="flex items-center gap-1">
        <layout-nav class="hidden md:block" [items]="navItems()" [activeId]="activeId()" />
        <layout-theme-toggle />
        <button
          type="button"
          uiButton
          variant="ghost"
          size="icon"
          class="md:hidden"
          aria-controls="mobile-menu"
          [attr.aria-expanded]="menuOpen()"
          [attr.aria-label]="menuOpen() ? 'Close menu' : 'Open menu'"
          (click)="toggleMenu()"
        >
          <ui-icon [name]="menuOpen() ? 'close' : 'menu'" />
        </button>
      </div>
    </div>

    <div id="mobile-menu" class="border-t border-line px-5 pb-4 md:hidden" [hidden]="!menuOpen()">
      <layout-nav
        orientation="vertical"
        label="Mobile"
        [items]="navItems()"
        [activeId]="activeId()"
        (navigate)="closeMenu()"
      />
    </div>
  `,
})
export class HeaderComponent {
  public readonly name = input.required<string>();
  public readonly initials = input.required<string>();
  public readonly navItems = input.required<readonly NavItem[]>();
  public readonly activeId = input<string | null>(null);

  protected readonly menuOpen = signal(false);

  protected toggleMenu(): void {
    this.menuOpen.update(open => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}
