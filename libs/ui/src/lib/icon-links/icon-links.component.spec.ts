import { TestBed } from '@angular/core/testing';
import { axe } from 'jest-axe';
import { IconLink, IconLinksComponent } from './icon-links.component';

const LINKS: IconLink[] = [
  { kind: 'mail', label: 'Email', href: 'mailto:me@example.com' },
  { kind: 'github', label: 'GitHub', href: 'https://github.com/me' },
  { kind: 'map-pin', label: 'Location' },
];

describe('IconLinksComponent', () => {
  async function render(kinds?: IconLink['kind'][]): Promise<HTMLElement> {
    const fixture = TestBed.createComponent(IconLinksComponent);
    fixture.componentRef.setInput('links', LINKS);
    fixture.componentRef.setInput('label', 'Profiles');
    if (kinds) {
      fixture.componentRef.setInput('kinds', kinds);
    }
    await fixture.whenStable();
    return fixture.nativeElement;
  }

  it('skips links without an href', async () => {
    const labels = Array.from((await render()).querySelectorAll('a')).map(a => a.getAttribute('aria-label'));

    expect(labels).toEqual(['Email', 'GitHub']);
  });

  it('filters by kind', async () => {
    const labels = Array.from((await render(['github'])).querySelectorAll('a')).map(a => a.getAttribute('aria-label'));

    expect(labels).toEqual(['GitHub']);
  });

  it('opens only external links in a new tab', async () => {
    const [mail, github] = Array.from((await render()).querySelectorAll('a'));

    expect(mail.getAttribute('target')).toBeNull();
    expect(github.getAttribute('target')).toBe('_blank');
    expect(github.getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('has no accessibility violations', async () => {
    expect(await axe(await render())).toHaveNoViolations();
  });
});
