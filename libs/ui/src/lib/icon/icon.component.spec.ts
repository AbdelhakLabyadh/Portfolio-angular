import { TestBed } from '@angular/core/testing';
import { IconComponent } from './icon.component';
import { ICONS } from './icons';

describe('IconComponent', () => {
  it('renders every path of the icon, hidden from assistive technology', async () => {
    const fixture = TestBed.createComponent(IconComponent);
    fixture.componentRef.setInput('name', 'download');
    fixture.componentRef.setInput('size', 16);
    await fixture.whenStable();
    const svg: SVGElement = fixture.nativeElement.querySelector('svg');

    expect(svg.getAttribute('aria-hidden')).toBe('true');
    expect(svg.getAttribute('width')).toBe('16');
    expect(Array.from(svg.querySelectorAll('path')).map(path => path.getAttribute('d'))).toEqual(ICONS.download);
  });
});
