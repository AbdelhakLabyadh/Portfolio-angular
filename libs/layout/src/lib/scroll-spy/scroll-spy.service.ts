import { isPlatformBrowser } from '@angular/common';
import { DestroyRef, DOCUMENT, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollSpyService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly activeIdState = signal<string | null>(null);
  private observer?: IntersectionObserver;

  public readonly activeId = this.activeIdState.asReadonly();

  constructor() {
    inject(DestroyRef).onDestroy(() => this.disconnect());
  }

  public observe(ids: readonly string[]): void {
    if (!this.isBrowser || typeof IntersectionObserver === 'undefined') {
      return;
    }
    this.disconnect();
    this.observer = new IntersectionObserver(
      entries => {
        const visible = entries.find(entry => entry.isIntersecting);
        if (visible) {
          this.activeIdState.set(visible.target.id);
        }
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    ids
      .map(id => this.document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)
      .forEach(element => this.observer?.observe(element));
  }

  public disconnect(): void {
    this.observer?.disconnect();
    this.observer = undefined;
  }
}
