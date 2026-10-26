import { Component, input } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ButtonDirective, ButtonSize, ButtonVariant } from './button.directive';

@Component({
  imports: [ButtonDirective],
  template: `<a uiButton href="#contact" [variant]="variant()" [size]="size()">Contact</a>`,
})
class HostComponent {
  public readonly variant = input<ButtonVariant>('primary');
  public readonly size = input<ButtonSize>('md');
}

describe('ButtonDirective', () => {
  async function render(variant: ButtonVariant, size: ButtonSize = 'md'): Promise<HTMLAnchorElement> {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.componentRef.setInput('variant', variant);
    fixture.componentRef.setInput('size', size);
    await fixture.whenStable();
    return fixture.nativeElement.querySelector('a');
  }

  it.each<[ButtonVariant, string]>([
    ['primary', 'bg-accent'],
    ['secondary', 'border-line'],
    ['ghost', 'text-fg-muted'],
  ])('applies the %s variant classes', async (variant, expectedClass) => {
    const anchor = await render(variant);

    expect(anchor.classList).toContain(expectedClass);
    expect(anchor.classList).toContain('rounded-full');
  });

  it('applies the icon size', async () => {
    const anchor = await render('ghost', 'icon');

    expect(anchor.classList).toContain('size-10');
  });
});
