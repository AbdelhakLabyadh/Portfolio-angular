import { Component, input } from '@angular/core';
import { ContactLink, Profile } from '@portfolio/data';
import { AvatarComponent, ButtonDirective, IconComponent, IconLinksComponent } from '@portfolio/ui';

@Component({
  selector: 'section-hero',
  imports: [AvatarComponent, ButtonDirective, IconComponent, IconLinksComponent],
  host: { class: 'block' },
  template: `
    <section id="hero" aria-labelledby="hero-heading" class="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        class="absolute inset-x-0 -top-48 -z-10 h-[36rem] bg-[radial-gradient(ellipse_at_top,var(--accent-soft),transparent_65%)]"
      ></div>
      <div class="mx-auto grid max-w-5xl gap-12 px-5 py-20 sm:px-8 sm:py-28 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p
            class="inline-flex items-center gap-2 rounded-full border border-line bg-surface-raised px-3 py-1 text-sm font-medium text-fg-muted"
          >
            <span class="size-2 rounded-full bg-success motion-safe:animate-pulse" aria-hidden="true"></span>
            {{ profile().availability }}
          </p>
          <h1 id="hero-heading" class="mt-6 text-4xl font-extrabold tracking-tight text-fg sm:text-6xl">
            {{ profile().name }}
            <span class="mt-2 block text-3xl text-accent sm:text-5xl">{{ profile().title }}</span>
          </h1>
          <p class="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted">{{ profile().tagline }}</p>
          <p class="mt-4 flex items-center gap-2 text-fg-muted">
            <ui-icon name="map-pin" [size]="18" />
            {{ profile().location }}
          </p>
          <div class="mt-8 flex flex-wrap items-center gap-3">
            <a uiButton [href]="profile().cvUrl" [attr.download]="profile().cvFileName">
              <ui-icon name="download" [size]="18" />
              Download CV
            </a>
            <a uiButton variant="secondary" href="#contact">
              Get in touch
              <ui-icon name="arrow-right" [size]="18" />
            </a>
            <ui-icon-links label="Social profiles" [links]="contacts()" [kinds]="['linkedin', 'github']" />
          </div>
        </div>
        <div class="hidden justify-self-center md:block">
          <ui-avatar
            [initials]="profile().initials"
            [alt]="profile().name"
            [photoUrl]="profile().photoUrl"
            [size]="208"
          />
        </div>
      </div>
    </section>
  `,
})
export class HeroComponent {
  public readonly profile = input.required<Profile>();
  public readonly contacts = input.required<readonly ContactLink[]>();
}
