import { TestBed } from '@angular/core/testing';
import { axe } from 'jest-axe';
import { AvatarComponent } from './avatar.component';

describe('AvatarComponent', () => {
  async function render(photoUrl?: string): Promise<HTMLElement> {
    const fixture = TestBed.createComponent(AvatarComponent);
    fixture.componentRef.setInput('initials', 'AL');
    fixture.componentRef.setInput('alt', 'Abdelhak Labyadh');
    fixture.componentRef.setInput('photoUrl', photoUrl);
    await fixture.whenStable();
    return fixture.nativeElement;
  }

  it('falls back to initials without a photo', async () => {
    const element = await render();
    const fallback = element.querySelector('[role="img"]');

    expect(fallback?.textContent?.trim()).toBe('AL');
    expect(fallback?.getAttribute('aria-label')).toBe('Abdelhak Labyadh');
    expect(element.querySelector('img')).toBeNull();
  });

  it('renders the photo when provided', async () => {
    const img = (await render('profile.jpg')).querySelector('img');

    expect(img?.getAttribute('alt')).toBe('Abdelhak Labyadh');
  });

  it('has no accessibility violations', async () => {
    expect(await axe(await render())).toHaveNoViolations();
  });
});
