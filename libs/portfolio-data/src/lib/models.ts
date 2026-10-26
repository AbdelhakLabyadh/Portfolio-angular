export type ContactKind = 'mail' | 'phone' | 'linkedin' | 'github' | 'map-pin';

export interface ContactLink {
  kind: ContactKind;
  label: string;
  value: string;
  href?: string;
}

export interface ProfileFact {
  value: string;
  label: string;
}

export interface Profile {
  name: string;
  initials: string;
  title: string;
  location: string;
  availability: string;
  tagline: string;
  summary: string[];
  facts: ProfileFact[];
  cvUrl: string;
  cvFileName: string;
  photoUrl?: string;
}

export interface YearMonth {
  year: number;
  month: number;
}

export interface Period {
  start: YearMonth;
  end?: YearMonth;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  context?: string;
  location?: string;
  period: Period;
  summary: string;
  highlights: string[];
  stack: string[];
  featured: boolean;
}

export interface SkillGroup {
  name: string;
  skills: string[];
}

export interface Education {
  degree: string;
  field?: string;
  institution: string;
  location: string;
  year: number;
}

export interface Certification {
  name: string;
  issuer: string;
}

export type SectionId =
  | 'about'
  | 'skills'
  | 'experience'
  | 'other-experience'
  | 'education'
  | 'certifications'
  | 'contact';

export interface SectionCopy {
  id: SectionId;
  navLabel?: string;
  eyebrow: string;
  heading: string;
  intro?: string;
}

export interface NavItem {
  id: SectionId;
  label: string;
}

export interface Portfolio {
  profile: Profile;
  contacts: ContactLink[];
  sections: Record<SectionId, SectionCopy>;
  skills: SkillGroup[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  languages: string[];
}
