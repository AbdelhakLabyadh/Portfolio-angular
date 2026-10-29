import { afterNextRender, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LOCALE, PORTFOLIO, toNavItems, UI_COPY } from '@portfolio/data';
import { FooterComponent, HeaderComponent, ScrollSpyService } from '@portfolio/layout';
import {
  AboutComponent,
  CertificationsComponent,
  ContactComponent,
  EducationComponent,
  ExperienceComponent,
  HeroComponent,
  OtherExperienceComponent,
  SkillsComponent,
} from '@portfolio/sections';
import { SeoService } from '../seo.service';

@Component({
  selector: 'app-portfolio-page',
  imports: [
    AboutComponent,
    CertificationsComponent,
    ContactComponent,
    EducationComponent,
    ExperienceComponent,
    FooterComponent,
    HeaderComponent,
    HeroComponent,
    OtherExperienceComponent,
    RouterLink,
    SkillsComponent,
  ],
  templateUrl: './portfolio-page.component.html',
})
export class PortfolioPageComponent {
  private readonly scrollSpy = inject(ScrollSpyService);

  protected readonly portfolio = inject(PORTFOLIO);
  protected readonly copy = inject(UI_COPY);
  protected readonly sections = this.portfolio.sections;
  protected readonly navItems = toNavItems(this.portfolio);
  protected readonly featuredExperience = this.portfolio.experience.filter(({ featured }) => featured);
  protected readonly otherExperience = this.portfolio.experience.filter(({ featured }) => !featured);
  protected readonly activeSection = this.scrollSpy.activeId;

  constructor() {
    inject(SeoService).apply(this.portfolio, inject(LOCALE));
    afterNextRender(() => this.scrollSpy.observe(this.navItems.map(({ id }) => id)));
  }
}
