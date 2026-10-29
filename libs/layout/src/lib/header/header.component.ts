import { Component, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavItem, UI_COPY } from '@portfolio/data';
import { ButtonDirective, IconComponent } from '@portfolio/ui';
import { LanguageSwitcherComponent } from '../language/language-switcher.component';
import { NavComponent } from '../nav/nav.component';
import { ThemeToggleComponent } from '../theme/theme-toggle.component';

@Component({
  selector: 'layout-header',
  imports: [ButtonDirective, IconComponent, LanguageSwitcherComponent, NavComponent, RouterLink, ThemeToggleComponent],
  host: {
    class: 'sticky top-0 z-40 block border-b border-line bg-surface/85 backdrop-blur-md',
    '(document:keydown.escape)': 'closeMenu()',
  },
  template: `
    <div class="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-5 sm:px-8">
      <a
        routerLink="."
        fragment="hero"
        class="flex items-center gap-2 rounded-full font-bold text-fg focus-visible:outline-2 focus-visible:outline-focus"
        (click)="closeMenu()"
      >
        <span
          class="flex size-8 items-center justify-center rounded-full bg-accent text-xs text-on-accent"
          aria-hidden="true"
          >{{ initials() }}</span
        >
        <span class="whitespace-nowrap max-[419px]:sr-only">{{ name() }}</span>
      </a>

      <div class="flex items-center gap-1">
        <layout-nav class="hidden md:block" [label]="copy.mainNavLabel" [items]="navItems()" [activeId]="activeId()" />
        <layout-language-switcher class="ml-1" [fragment]="activeId()" />
        <layout-theme-toggle />
        <button
          type="button"
          uiButton
          variant="ghost"
          size="icon"
          class="md:hidden"
          aria-controls="mobile-menu"
          [attr.aria-expanded]="menuOpen()"
          [attr.aria-label]="menuOpen() ? copy.closeMenu : copy.openMenu"
          (click)="toggleMenu()"
        >
          <ui-icon [name]="menuOpen() ? 'close' : 'menu'" />
        </button>
      </div>
    </div>

    <div id="mobile-menu" class="border-t border-line px-5 pb-4 md:hidden" [hidden]="!menuOpen()">
      <layout-nav
        orientation="vertical"
        [label]="copy.mobileNavLabel"
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

  protected readonly copy = inject(UI_COPY);
  protected readonly menuOpen = signal(false);

  protected toggleMenu(): void {
    this.menuOpen.update(open => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}
