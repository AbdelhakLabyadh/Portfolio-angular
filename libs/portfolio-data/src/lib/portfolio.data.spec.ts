import { portfolio } from './portfolio.data';
import { portfolioFr } from './portfolio.fr';
import { toNavItems } from './portfolio.token';
import { uiCopy } from './ui-copy';

describe('portfolio data', () => {
  it('features the Sunrise and Sukha Technologies roles first', () => {
    const featured = portfolio.experience.filter(({ featured }) => featured).map(({ id }) => id);

    expect(featured).toEqual(['sunrise', 'sukha']);
  });

  it('keeps experience ids unique', () => {
    const ids = portfolio.experience.map(({ id }) => id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it('builds navigation only from sections with a nav label', () => {
    expect(toNavItems(portfolio)).toEqual([
      { id: 'about', label: 'About' },
      { id: 'skills', label: 'Skills' },
      { id: 'experience', label: 'Experience' },
      { id: 'education', label: 'Education' },
      { id: 'contact', label: 'Contact' },
    ]);
  });
});

describe('French portfolio data', () => {
  it('mirrors the structure of the English content', () => {
    const shape = ({
      sections,
      contacts,
      experience,
      skills,
      education,
      certifications,
      languages,
    }: typeof portfolio) => ({
      sections: Object.keys(sections),
      nav: toNavItems({ sections } as typeof portfolio).map(({ id }) => id),
      contacts: contacts.map(({ kind, href }) => [kind, href]),
      experience: experience.map(({ id, period, featured, highlights, stack }) => [
        id,
        period,
        featured,
        highlights.length,
        stack.length,
      ]),
      skills: skills.map(group => group.skills.length),
      education: education.map(({ year }) => year),
      certifications: certifications.length,
      languages: languages.length,
    });

    expect(shape(portfolioFr)).toEqual(shape(portfolio));
    expect(portfolioFr.profile.facts).toHaveLength(portfolio.profile.facts.length);
    expect(portfolioFr.profile.summary).toHaveLength(portfolio.profile.summary.length);
  });

  it('translates the visible copy', () => {
    expect(portfolioFr.profile.title).not.toBe(portfolio.profile.title);
    expect(portfolioFr.profile.tagline).not.toBe(portfolio.profile.tagline);
    expect(toNavItems(portfolioFr).map(({ label }) => label)).toEqual([
      'À propos',
      'Compétences',
      'Expérience',
      'Formation',
      'Contact',
    ]);
  });

  it('defines every UI string in both languages', () => {
    expect(Object.keys(uiCopy.fr).sort()).toEqual(Object.keys(uiCopy.en).sort());
    expect(uiCopy.fr.techStack('Sunrise')).toBe('Stack technique Sunrise');
  });
});
