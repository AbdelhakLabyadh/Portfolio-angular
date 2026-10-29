import { Locale, LocaleOption, UiCopy } from './models';

export const LOCALES: readonly LocaleOption[] = [
  { id: 'en', label: 'English', path: '/' },
  { id: 'fr', label: 'Français', path: '/fr' },
];

export const uiCopy: Record<Locale, UiCopy> = {
  en: {
    skipToContent: 'Skip to content',
    mainNavLabel: 'Main',
    mobileNavLabel: 'Mobile',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    switchToLightTheme: 'Switch to light theme',
    switchToDarkTheme: 'Switch to dark theme',
    languageLabel: 'Language',
    socialProfiles: 'Social profiles',
    downloadCv: 'Download CV',
    getInTouch: 'Get in touch',
    sendEmail: 'Send me an email',
    highlights: 'Highlights',
    certificatesAndTraining: 'Certificates & training',
    languages: 'Languages',
    techStack: company => `${company} tech stack`,
    builtWith: 'Built with Angular, Nx and Tailwind CSS',
  },
  fr: {
    skipToContent: 'Aller au contenu',
    mainNavLabel: 'Principale',
    mobileNavLabel: 'Mobile',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    switchToLightTheme: 'Passer au thème clair',
    switchToDarkTheme: 'Passer au thème sombre',
    languageLabel: 'Langue',
    socialProfiles: 'Profils sociaux',
    downloadCv: 'Télécharger le CV',
    getInTouch: 'Me contacter',
    sendEmail: 'Envoyez-moi un e-mail',
    highlights: 'Points clés',
    certificatesAndTraining: 'Certificats et formations',
    languages: 'Langues',
    techStack: company => `Stack technique ${company}`,
    builtWith: 'Réalisé avec Angular, Nx et Tailwind CSS',
  },
};
