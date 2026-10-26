import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { portfolio } from '@portfolio/data';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: jest.fn().mockReturnValue({ matches: false }),
    });
  });

  async function render(): Promise<HTMLElement> {
    const fixture = TestBed.createComponent(AppComponent);
    await fixture.whenStable();
    return fixture.nativeElement;
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
    expect(document.head.querySelector('script[type="application/ld+json"]')?.textContent).toContain('"Person"');
  });
});
