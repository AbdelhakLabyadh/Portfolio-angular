import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { LOCALE, portfolio, portfolioFr, UI_COPY, uiCopy } from '@portfolio/data';
import { axe } from 'jest-axe';
import { AboutComponent } from './about/about.component';
import { CertificationsComponent } from './certifications/certifications.component';
import { ContactComponent } from './contact/contact.component';
import { EducationComponent } from './education/education.component';
import { ExperienceComponent } from './experience/experience.component';
import { HeroComponent } from './hero/hero.component';
import { OtherExperienceComponent } from './other-experience/other-experience.component';
import { SkillsComponent } from './skills/skills.component';

const { profile, contacts, sections, skills, experience, education, certifications, languages } = portfolio;
const featured = experience.filter(({ featured }) => featured);
const other = experience.filter(({ featured }) => !featured);

const CASES: [string, Type<unknown>, Record<string, unknown>][] = [
  ['hero', HeroComponent, { profile, contacts }],
  ['about', AboutComponent, { copy: sections.about, profile }],
  ['skills', SkillsComponent, { copy: sections.skills, groups: skills }],
  ['experience', ExperienceComponent, { copy: sections.experience, items: featured }],
  ['other experience', OtherExperienceComponent, { copy: sections['other-experience'], items: other }],
  ['education', EducationComponent, { copy: sections.education, items: education }],
  ['certifications', CertificationsComponent, { copy: sections.certifications, certifications, languages }],
  ['contact', ContactComponent, { copy: sections.contact, profile, contacts }],
];

async function render(component: Type<unknown>, inputs: Record<string, unknown>): Promise<HTMLElement> {
  const fixture = TestBed.createComponent(component);
  Object.entries(inputs).forEach(([name, value]) => fixture.componentRef.setInput(name, value));
  await fixture.whenStable();
  return fixture.nativeElement;
}

describe('feature sections', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [provideRouter([])] }));

  it.each(CASES)('%s section has no accessibility violations', async (_, component, inputs) => {
    expect(await axe(await render(component, inputs))).toHaveNoViolations();
  });

  it('hero shows the title, location and a CV download', async () => {
    const element = await render(HeroComponent, { profile, contacts });
    const download = element.querySelector('a[download]');

    expect(element.querySelector('h1')?.textContent).toContain('Angular Front-End Developer');
    expect(element.textContent).toContain('Lisbon, Portugal');
    expect(download?.getAttribute('href')).toBe(profile.cvUrl);
  });

  it('experience renders the highlights and stack of each featured role', async () => {
    const element = await render(ExperienceComponent, { copy: sections.experience, items: featured });
    const headings = Array.from(element.querySelectorAll('h3')).map(h3 => h3.textContent?.trim());

    expect(headings).toEqual(['Angular Front-End Developer', 'Front-End Developer']);
    expect(element.textContent).toContain('Sunrise');
    expect(element.textContent).toContain('SOS Fodmap Wizard');
    expect(element.textContent).toContain('Jul 2025 – Present');
    expect(element.querySelector('[aria-label="Sunrise tech stack"]')?.textContent).toContain('Nx');
  });

  it('other experience lists every non-featured role compactly', async () => {
    const element = await render(OtherExperienceComponent, { copy: sections['other-experience'], items: other });

    expect(element.querySelectorAll('ol > li')).toHaveLength(other.length);
    expect(element.querySelector('ui-card ui-card')).toBeNull();
  });

  it('contact links only external profiles to a new tab', async () => {
    const element = await render(ContactComponent, { copy: sections.contact, profile, contacts });
    const mail = element.querySelector('ul a[href^="mailto:"]');
    const github = element.querySelector('ul a[href^="https://github.com"]');

    expect(mail?.getAttribute('target')).toBeNull();
    expect(github?.getAttribute('target')).toBe('_blank');
  });

  it('experience renders French copy and dates in the French locale', async () => {
    TestBed.overrideProvider(LOCALE, { useValue: 'fr' });
    TestBed.overrideProvider(UI_COPY, { useValue: uiCopy.fr });
    const items = portfolioFr.experience.filter(({ featured }) => featured);
    const element = await render(ExperienceComponent, { copy: portfolioFr.sections.experience, items });

    expect(element.querySelector('h2')?.textContent).toContain('Expérience front-end');
    expect(element.textContent).toContain("juil. 2025 – aujourd'hui");
    expect(element.querySelector('[aria-label="Stack technique Sunrise"]')).not.toBeNull();
  });
});
