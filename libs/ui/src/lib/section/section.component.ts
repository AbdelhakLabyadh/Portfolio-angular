import { Component, computed, input } from '@angular/core';

export type SectionTone = 'default' | 'muted';

@Component({
  selector: 'ui-section',
  host: { class: 'block' },
  template: `
    <section
      [id]="sectionId()"
      [attr.aria-labelledby]="headingId()"
      class="scroll-mt-20 py-16 sm:py-24"
      [class.bg-surface-sunken]="tone() === 'muted'"
    >
      <div class="mx-auto max-w-5xl px-5 sm:px-8">
        <header class="mb-10 max-w-2xl sm:mb-12">
          @if (eyebrow()) {
            <p class="text-sm font-semibold tracking-widest text-accent uppercase">{{ eyebrow() }}</p>
          }
          <h2 [id]="headingId()" class="mt-2 text-3xl font-bold tracking-tight text-fg sm:text-4xl">
            {{ heading() }}
          </h2>
          @if (intro()) {
            <p class="mt-4 text-lg text-fg-muted">{{ intro() }}</p>
          }
        </header>
        <ng-content />
      </div>
    </section>
  `,
})
export class SectionComponent {
  public readonly sectionId = input.required<string>();
  public readonly heading = input.required<string>();
  public readonly eyebrow = input<string>();
  public readonly intro = input<string>();
  public readonly tone = input<SectionTone>('default');

  protected readonly headingId = computed(() => `${this.sectionId()}-heading`);
}
