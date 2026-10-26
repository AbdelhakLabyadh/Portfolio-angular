import { TestBed } from '@angular/core/testing';
import { axe } from 'jest-axe';
import { SectionComponent } from './section.component';

describe('SectionComponent', () => {
  async function render(inputs: Record<string, unknown>): Promise<HTMLElement> {
    const fixture = TestBed.createComponent(SectionComponent);
    Object.entries(inputs).forEach(([name, value]) => fixture.componentRef.setInput(name, value));
    await fixture.whenStable();
    return fixture.nativeElement;
  }

  it('labels the section with its heading', async () => {
    const element = await render({ sectionId: 'skills', heading: 'Skills' });
    const section = element.querySelector('section');

    expect(section?.id).toBe('skills');
    expect(section?.getAttribute('aria-labelledby')).toBe('skills-heading');
    expect(element.querySelector('#skills-heading')?.textContent?.trim()).toBe('Skills');
  });

  it('only renders the optional eyebrow and intro when provided', async () => {
    const bare = await render({ sectionId: 'a', heading: 'A' });
    expect(bare.querySelectorAll('header p')).toHaveLength(0);

    const full = await render({ sectionId: 'b', heading: 'B', eyebrow: 'Eyebrow', intro: 'Intro' });
    expect(full.querySelectorAll('header p')).toHaveLength(2);
  });

  it('applies the muted tone', async () => {
    const element = await render({ sectionId: 'c', heading: 'C', tone: 'muted' });

    expect(element.querySelector('section')?.classList).toContain('bg-surface-sunken');
  });

  it('has no accessibility violations', async () => {
    expect(await axe(await render({ sectionId: 'd', heading: 'D', intro: 'Intro' }))).toHaveNoViolations();
  });
});
