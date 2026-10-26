import { afterNextRender, Component, inject } from '@angular/core';
import { PORTFOLIO, toNavItems } from '@portfolio/data';
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
import { SeoService } from './seo.service';

@Component({
  selector: 'app-root',
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
    SkillsComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private readonly scrollSpy = inject(ScrollSpyService);

  protected readonly portfolio = inject(PORTFOLIO);
  protected readonly sections = this.portfolio.sections;
  protected readonly navItems = toNavItems(this.portfolio);
  protected readonly featuredExperience = this.portfolio.experience.filter(({ featured }) => featured);
  protected readonly otherExperience = this.portfolio.experience.filter(({ featured }) => !featured);
  protected readonly activeSection = this.scrollSpy.activeId;

  constructor() {
    inject(SeoService).apply(this.portfolio);
    afterNextRender(() => this.scrollSpy.observe(this.navItems.map(({ id }) => id)));
  }
}
