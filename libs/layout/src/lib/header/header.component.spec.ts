import { TestBed } from '@angular/core/testing';
import { axe } from 'jest-axe';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: jest.fn().mockReturnValue({ matches: false }),
    });
  });

  async function render() {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.componentRef.setInput('name', 'Abdelhak Labyadh');
    fixture.componentRef.setInput('initials', 'AL');
    fixture.componentRef.setInput('navItems', [{ id: 'about', label: 'About' }]);
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

  it('has no accessibility violations', async () => {
    const { element } = await render();

    expect(await axe(element)).toHaveNoViolations();
  });
});
