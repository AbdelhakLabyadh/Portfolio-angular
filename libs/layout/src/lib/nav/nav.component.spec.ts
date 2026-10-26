import { TestBed } from '@angular/core/testing';
import { NavItem } from '@portfolio/data';
import { axe } from 'jest-axe';
import { NavComponent } from './nav.component';

const ITEMS: NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
];

describe('NavComponent', () => {
  async function render(activeId: string | null = null) {
    const fixture = TestBed.createComponent(NavComponent);
    fixture.componentRef.setInput('items', ITEMS);
    fixture.componentRef.setInput('activeId', activeId);
    await fixture.whenStable();
    return fixture;
  }

  it('links to each section anchor', async () => {
    const links = Array.from((await render()).nativeElement.querySelectorAll('a')) as HTMLAnchorElement[];

    expect(links.map(link => link.getAttribute('href'))).toEqual(['#about', '#skills']);
  });

  it('marks the active section with aria-current', async () => {
    const [about, skills] = Array.from((await render('skills')).nativeElement.querySelectorAll('a')) as HTMLElement[];

    expect(about.getAttribute('aria-current')).toBeNull();
    expect(skills.getAttribute('aria-current')).toBe('location');
    expect(skills.classList).toContain('text-accent');
  });

  it('emits the clicked section id', async () => {
    const fixture = await render();
    const navigate = jest.fn();
    fixture.componentInstance.navigate.subscribe(navigate);

    (fixture.nativeElement.querySelector('a') as HTMLElement).dispatchEvent(
      new MouseEvent('click', { cancelable: true })
    );

    expect(navigate).toHaveBeenCalledWith('about');
  });

  it('has no accessibility violations', async () => {
    expect(await axe((await render('about')).nativeElement)).toHaveNoViolations();
  });
});
