import { Component, computed, inject } from '@angular/core';
import { ButtonDirective, IconComponent } from '@portfolio/ui';
import { ThemeService } from './theme.service';

@Component({
  selector: 'layout-theme-toggle',
  imports: [ButtonDirective, IconComponent],
  template: `
    <button type="button" uiButton variant="ghost" size="icon" [attr.aria-label]="label()" (click)="theme.toggle()">
      <span class="flex dark:hidden"><ui-icon name="moon" /></span>
      <span class="hidden dark:flex"><ui-icon name="sun" /></span>
    </button>
  `,
})
export class ThemeToggleComponent {
  protected readonly theme = inject(ThemeService);
  protected readonly label = computed(() => (this.theme.isDark() ? 'Switch to light theme' : 'Switch to dark theme'));
}
