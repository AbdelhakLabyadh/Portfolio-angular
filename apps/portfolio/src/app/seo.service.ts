import { DOCUMENT, inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Portfolio } from '@portfolio/data';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  public apply({ profile, contacts }: Portfolio): void {
    const title = `${profile.name} | ${profile.title}`;

    this.title.setTitle(title);
    this.meta.addTags([
      { name: 'description', content: profile.tagline },
      { name: 'author', content: profile.name },
      { property: 'og:type', content: 'profile' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: profile.tagline },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: profile.tagline },
    ]);
    this.addStructuredData({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: profile.name,
      jobTitle: profile.title,
      address: { '@type': 'PostalAddress', addressLocality: 'Lisbon', addressCountry: 'PT' },
      sameAs: contacts.filter(({ href }) => href?.startsWith('http')).map(({ href }) => href),
    });
  }

  private addStructuredData(data: Record<string, unknown>): void {
    if (this.document.head.querySelector('script[type="application/ld+json"]')) {
      return;
    }
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    this.document.head.appendChild(script);
  }
}
