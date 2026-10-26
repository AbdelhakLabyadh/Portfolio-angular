import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ScrollSpyService } from './scroll-spy.service';

class FakeIntersectionObserver {
  public static instances: FakeIntersectionObserver[] = [];
  public readonly observed: Element[] = [];
  public readonly observe = jest.fn((element: Element) => this.observed.push(element));
  public readonly disconnect = jest.fn();

  constructor(public readonly callback: IntersectionObserverCallback) {
    FakeIntersectionObserver.instances.push(this);
  }

  public emit(id: string, isIntersecting: boolean): void {
    const target = this.observed.find(element => element.id === id) as Element;
    this.callback([{ target, isIntersecting } as IntersectionObserverEntry], this as unknown as IntersectionObserver);
  }
}

describe('ScrollSpyService', () => {
  beforeEach(() => {
    FakeIntersectionObserver.instances = [];
    Object.defineProperty(window, 'IntersectionObserver', { configurable: true, value: FakeIntersectionObserver });
    document.body.innerHTML = '<section id="about"></section><section id="skills"></section>';
  });

  it('observes the existing sections only', () => {
    TestBed.inject(ScrollSpyService).observe(['about', 'skills', 'missing']);

    expect(FakeIntersectionObserver.instances[0].observed.map(({ id }) => id)).toEqual(['about', 'skills']);
  });

  it('tracks the section that enters the viewport', () => {
    const service = TestBed.inject(ScrollSpyService);
    service.observe(['about', 'skills']);
    const [observer] = FakeIntersectionObserver.instances;

    observer.emit('skills', true);
    expect(service.activeId()).toBe('skills');

    observer.emit('about', false);
    expect(service.activeId()).toBe('skills');
  });

  it('replaces the previous observer when observing again', () => {
    const service = TestBed.inject(ScrollSpyService);
    service.observe(['about']);
    service.observe(['skills']);

    expect(FakeIntersectionObserver.instances[0].disconnect).toHaveBeenCalled();
    expect(FakeIntersectionObserver.instances).toHaveLength(2);
  });

  it('does nothing on the server', () => {
    TestBed.configureTestingModule({ providers: [{ provide: PLATFORM_ID, useValue: 'server' }] });
    TestBed.inject(ScrollSpyService).observe(['about']);

    expect(FakeIntersectionObserver.instances).toHaveLength(0);
  });
});
