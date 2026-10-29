import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { LOCALE, UI_COPY, uiCopy } from '@portfolio/data';
import { axe } from 'jest-axe';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: jest.fn().mockReturnValue({ matches: false }),
    });
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
  });

  async function render(activeId: string | null = null) {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.componentRef.setInput('name', 'Abdelhak Labyadh');
    fixture.componentRef.setInput('initials', 'AL');
    fixture.componentRef.setInput('navItems', [{ id: 'about', label: 'About' }]);
    fixture.componentRef.setInput('activeId', activeId);
    await fixture.whenStable();
    const element: HTMLElement = fixture.nativeElement;
    const menuButton = element.querySelector('[aria-controls="mobile-menu"]') as HTMLButtonElement;
    const menu = element.querySelector('#mobile-menu') as HTMLElement;
    return { fixture, element, menuButton, menu };
  }

  it('opens and closes the mobile menu', async () => {
    const { fixture, menuButton, menu } = await render();
    expect(menu.hidden).toBe(true);
    expect(menuButton.getAttribute('aria-expanded')).toBe('false');

    menuButton.click();
    await fixture.whenStable();

    expect(menu.hidden).toBe(false);
    expect(menuButton.getAttribute('aria-expanded')).toBe('true');
    expect(menuButton.getAttribute('aria-label')).toBe('Close menu');
  });

  it('closes the mobile menu on Escape', async () => {
    const { fixture, menuButton, menu } = await render();
    menuButton.click();
    await fixture.whenStable();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await fixture.whenStable();

    expect(menu.hidden).toBe(true);
  });

  it('closes the mobile menu after navigating', async () => {
    const { fixture, menuButton, menu } = await render();
    menuButton.click();
    await fixture.whenStable();

    (menu.querySelector('a') as HTMLElement).click();
    await fixture.whenStable();

    expect(menu.hidden).toBe(true);
  });

  it('links to both languages and keeps the active section', async () => {
    const { element } = await render('about');
    const links = Array.from(element.querySelectorAll('a[hreflang]'));

    expect(links.map(link => link.getAttribute('href'))).toEqual(['/#about', '/fr#about']);
    expect(links.map(link => link.getAttribute('aria-current'))).toEqual(['page', null]);
  });

  it('uses the French copy and marks French as current on the French page', async () => {
    TestBed.overrideProvider(LOCALE, { useValue: 'fr' });
    TestBed.overrideProvider(UI_COPY, { useValue: uiCopy.fr });
    const { element, menuButton } = await render();

    expect(menuButton.getAttribute('aria-label')).toBe('Ouvrir le menu');
    expect(element.querySelector('a[hreflang="fr"]')?.getAttribute('aria-current')).toBe('page');
    expect(element.querySelector('ul[aria-label="Langue"]')).not.toBeNull();
  });

  it('has no accessibility violations', async () => {
    const { element } = await render();

    expect(await axe(element)).toHaveNoViolations();
  });
});
