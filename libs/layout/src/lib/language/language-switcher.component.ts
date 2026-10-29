import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LOCALE, LOCALES, UI_COPY } from '@portfolio/data';

@Component({
  selector: 'layout-language-switcher',
  imports: [RouterLink],
  host: { class: 'block' },
  template: `
    <ul
      class="flex items-center rounded-full border border-line p-0.5 text-xs font-semibold"
      [attr.aria-label]="copy.languageLabel"
    >
      @for (option of locales; track option.id) {
        <li>
          <a
            class="flex h-8 min-w-9 items-center justify-center rounded-full px-2 uppercase transition-colors focus-visible:outline-2 focus-visible:outline-focus"
            [class]="option.id === locale ? 'bg-accent text-on-accent' : 'text-fg-muted hover:text-fg'"
            [routerLink]="option.path"
            [fragment]="fragment() ?? undefined"
            [attr.hreflang]="option.id"
            [attr.lang]="option.id"
            [attr.aria-current]="option.id === locale ? 'page' : null"
          >
            <span aria-hidden="true">{{ option.id }}</span>
            <span class="sr-only">{{ option.label }}</span>
          </a>
        </li>
      }
    </ul>
  `,
})
export class LanguageSwitcherComponent {
  public readonly fragment = input<string | null>(null);

  protected readonly copy = inject(UI_COPY);
  protected readonly locale = inject(LOCALE);
  protected readonly locales = LOCALES;
}
