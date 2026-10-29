import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { portfolio, portfolioFr } from '@portfolio/data';
import { appRoutes } from './app.routes';

describe('AppComponent', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: jest.fn().mockReturnValue({ matches: false }),
    });
    TestBed.configureTestingModule({ providers: [provideRouter(appRoutes)] });
  });

  async function render(url = '/'): Promise<HTMLElement> {
    const harness = await RouterTestingHarness.create(url);
    await harness.fixture.whenStable();
    return harness.routeNativeElement as HTMLElement;
  }

  it('renders a single h1 with the name', async () => {
    const headings = (await render()).querySelectorAll('h1');

    expect(headings).toHaveLength(1);
    expect(headings[0].textContent).toContain(portfolio.profile.name);
  });

  it('renders every navigable section', async () => {
    const element = await render();

    ['about', 'skills', 'experience', 'other-experience', 'education', 'certifications', 'contact'].forEach(id =>
      expect(element.querySelector(`section#${id}`)).not.toBeNull()
    );
  });

  it('sets the document title and description', async () => {
    await render();

    expect(TestBed.inject(Title).getTitle()).toBe('Abdelhak Labyadh | Angular Front-End Developer');
    expect(TestBed.inject(Meta).getTag('name="description"')?.content).toBe(portfolio.profile.tagline);
    expect(document.documentElement.lang).toBe('en');
    expect(document.head.querySelector('script[type="application/ld+json"]')?.textContent).toContain('"Person"');
  });

  it('renders the French version at /fr', async () => {
    const element = await render('/fr');

    expect(element.querySelector('h1')?.textContent).toContain('Développeur Front-End Angular');
    expect(element.querySelector('#about-heading')?.textContent).toContain(portfolioFr.sections.about.heading);
    expect(element.textContent).toContain("juil. 2025 – aujourd'hui");
    expect(element.textContent).toContain('Télécharger le CV');
    expect(element.querySelector('a[aria-current="page"][hreflang="fr"]')).not.toBeNull();
    expect(TestBed.inject(Title).getTitle()).toBe('Abdelhak Labyadh | Développeur Front-End Angular');
    expect(TestBed.inject(Meta).getTag('property="og:locale"')?.content).toBe('fr_FR');
    expect(document.documentElement.lang).toBe('fr');
  });

  it('keeps a single set of meta tags when switching language', async () => {
    const harness = await RouterTestingHarness.create('/');
    await harness.navigateByUrl('/fr');

    expect(document.head.querySelectorAll('meta[name="description"]')).toHaveLength(1);
    expect(document.head.querySelectorAll('script[type="application/ld+json"]')).toHaveLength(1);
    expect(TestBed.inject(Meta).getTag('name="description"')?.content).toBe(portfolioFr.profile.tagline);
  });
});
