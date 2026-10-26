import { TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';

describe('CardComponent', () => {
  it('maps padding and accent inputs to host classes', async () => {
    const fixture = TestBed.createComponent(CardComponent);
    fixture.componentRef.setInput('padding', 'sm');
    fixture.componentRef.setInput('accent', true);
    await fixture.whenStable();
    const classes: DOMTokenList = fixture.nativeElement.classList;

    expect(classes).toContain('p-4');
    expect(classes).toContain('border-t-accent');
  });
});
