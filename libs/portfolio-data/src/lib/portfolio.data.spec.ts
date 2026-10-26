import { portfolio } from './portfolio.data';
import { toNavItems } from './portfolio.token';

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
