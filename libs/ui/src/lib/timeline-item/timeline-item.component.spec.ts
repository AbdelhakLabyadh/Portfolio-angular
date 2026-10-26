import { Component, input } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { axe } from 'jest-axe';
import { TimelineItemComponent, TimelineItemVariant } from './timeline-item.component';

@Component({
  imports: [TimelineItemComponent],
  template: `
    <ui-timeline-item
      heading="Front-End Developer"
      organization="Sunrise"
      period="Jul 2025 – Present"
      [variant]="variant()"
    >
      <p class="projected">Built shared libraries</p>
    </ui-timeline-item>
  `,
})
class HostComponent {
  public readonly variant = input<TimelineItemVariant>('featured');
}

async function render(variant: TimelineItemVariant): Promise<HTMLElement> {
  const fixture = TestBed.createComponent(HostComponent);
  fixture.componentRef.setInput('variant', variant);
  await fixture.whenStable();
  return fixture.nativeElement;
}

describe('TimelineItemComponent', () => {
  it.each<TimelineItemVariant>(['featured', 'compact'])('projects content in the %s variant', async variant => {
    const element = await render(variant);

    expect(element.querySelector('.projected')?.textContent).toBe('Built shared libraries');
    expect(element.querySelector('h3')?.textContent).toContain('Front-End Developer');
    expect(element.textContent).toContain('Sunrise');
    expect(element.textContent).toContain('Jul 2025 – Present');
  });

  it('wraps the featured variant in a card', async () => {
    const element = await render('featured');

    expect(element.querySelector('ui-card')).not.toBeNull();
  });

  it('renders the compact variant without a card', async () => {
    const element = await render('compact');

    expect(element.querySelector('ui-card')).toBeNull();
  });

  it('has no accessibility violations', async () => {
    expect(await axe(await render('featured'))).toHaveNoViolations();
  });
});
