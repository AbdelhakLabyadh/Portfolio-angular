import { DOCUMENT, inject, Injectable } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { Locale, Portfolio } from '@portfolio/data';

const OG_LOCALES: Record<Locale, string> = { en: 'en_US', fr: 'fr_FR' };

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  public apply({ profile, contacts }: Portfolio, locale: Locale): void {
    const title = `${profile.name} | ${profile.title}`;

    this.document.documentElement.lang = locale;
    this.title.setTitle(title);
    const tags: MetaDefinition[] = [
      { name: 'description', content: profile.tagline },
      { name: 'author', content: profile.name },
      { property: 'og:type', content: 'profile' },
      { property: 'og:locale', content: OG_LOCALES[locale] },
      { property: 'og:title', content: title },
      { property: 'og:description', content: profile.tagline },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: profile.tagline },
    ];
    tags.forEach(tag => this.meta.updateTag(tag));
    this.setStructuredData({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: profile.name,
      jobTitle: profile.title,
      inLanguage: locale,
      address: { '@type': 'PostalAddress', addressLocality: 'Lisbon', addressCountry: 'PT' },
      sameAs: contacts.filter(({ href }) => href?.startsWith('http')).map(({ href }) => href),
    });
  }

  private setStructuredData(data: Record<string, unknown>): void {
    let script = this.document.head.querySelector<HTMLScriptElement>('script[type="application/ld+json"]');
    if (!script) {
      script = this.document.createElement('script');
      script.type = 'application/ld+json';
      this.document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
  }
}
