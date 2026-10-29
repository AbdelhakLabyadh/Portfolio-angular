import { ViewportScroller } from '@angular/common';
import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter, withInMemoryScrolling, withRouterConfig } from '@angular/router';
import { appRoutes } from './app.routes';

/** Matches the sections' `scroll-mt-20`, which the router's anchor scrolling does not apply. */
const ANCHOR_OFFSET: [number, number] = [0, 80];

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(withEventReplay()),
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      appRoutes,
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
      withRouterConfig({ onSameUrlNavigation: 'reload' })
    ),
    provideAppInitializer(() => inject(ViewportScroller).setOffset(ANCHOR_OFFSET)),
  ],
};
