import { Routes } from '@angular/router';
import { provideLocale } from '@portfolio/data';
import { PortfolioPageComponent } from './portfolio-page/portfolio-page.component';

export const appRoutes: Routes = [
  { path: '', pathMatch: 'full', component: PortfolioPageComponent, providers: provideLocale('en') },
  { path: 'fr', component: PortfolioPageComponent, providers: provideLocale('fr') },
  { path: '**', redirectTo: '' },
];
