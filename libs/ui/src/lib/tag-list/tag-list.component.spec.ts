import { TestBed } from '@angular/core/testing';
import { axe } from 'jest-axe';
import { TagListComponent } from './tag-list.component';

describe('TagListComponent', () => {
  async function render(size?: 'sm' | 'md'): Promise<HTMLElement> {
    const fixture = TestBed.createComponent(TagListComponent);
    fixture.componentRef.setInput('tags', ['Angular', 'Nx', 'RxJS']);
    fixture.componentRef.setInput('label', 'Front-end');
    if (size) {
      fixture.componentRef.setInput('size', size);
    }
    await fixture.whenStable();
    return fixture.nativeElement;
  }

  it('renders one list item per tag', async () => {
    const element = await render();
    const items = Array.from(element.querySelectorAll('li')).map(item => item.textContent);

    expect(items).toEqual(['Angular', 'Nx', 'RxJS']);
    expect(element.querySelector('ul')?.getAttribute('aria-label')).toBe('Front-end');
  });

  it('switches to the small size', async () => {
    const element = await render('sm');

    expect(element.querySelector('li')?.classList).toContain('text-xs');
  });

  it('has no accessibility violations', async () => {
    expect(await axe(await render())).toHaveNoViolations();
  });
});
