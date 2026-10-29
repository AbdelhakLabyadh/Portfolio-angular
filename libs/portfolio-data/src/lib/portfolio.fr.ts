import { Portfolio } from './models';
import { portfolio } from './portfolio.data';

export const portfolioFr: Portfolio = {
  profile: {
    ...portfolio.profile,
    title: 'Développeur Front-End Angular',
    location: 'Lisbonne, Portugal',
    availability: 'Ouvert aux postes front-end au Portugal',
    tagline:
      "Je conçois des interfaces responsives et maintenables avec Angular et TypeScript, au sein de grands monorepos Nx qui suivent chaque nouvelle version d'Angular.",
    summary: [
      'Je suis développeur front-end, spécialisé en Angular et TypeScript. Chez Sunrise, je développe et maintiens des fonctionnalités pour des applications web destinées aux clients, dans un monorepo Nx où le code est partagé entre bibliothèques et projets applicatifs.',
      "Auparavant, j'ai passé deux ans chez Sukha Technologies à développer l'application web et mobile SOS Fodmap Wizard avec TypeScript, React et React Native, en transformant les retours UX en interfaces concrètes.",
      "J'aime collaborer avec différentes équipes, traduire les besoins en interfaces utilisateur et résoudre les problèmes en privilégiant la maintenabilité et l'expérience utilisateur. Je travaille aisément en anglais, en français et en arabe.",
    ],
    facts: [
      { value: 'Angular', label: 'Framework principal, toujours à jour' },
      { value: 'Nx', label: 'Monorepo avec bibliothèques partagées' },
      { value: 'Web et mobile', label: 'Produits livrés avec Angular et React' },
      { value: '3', label: 'Langues de travail : EN, FR, AR' },
    ],
  },
  contacts: portfolio.contacts.map(contact => {
    switch (contact.kind) {
      case 'mail':
        return { ...contact, label: 'E-mail' };
      case 'phone':
        return { ...contact, label: 'Téléphone' };
      case 'map-pin':
        return { ...contact, label: 'Localisation', value: 'Lisbonne, Portugal' };
      default:
        return contact;
    }
  }),
  sections: {
    about: {
      id: 'about',
      navLabel: 'À propos',
      eyebrow: 'À propos',
      heading: 'Développeur front-end spécialisé en Angular',
    },
    skills: {
      id: 'skills',
      navLabel: 'Compétences',
      eyebrow: 'Compétences',
      heading: 'Les outils de mon quotidien',
      intro:
        'Une boîte à outils Angular et TypeScript moderne, enrichie par une expérience React et des bases solides en JavaScript full-stack.',
    },
    experience: {
      id: 'experience',
      navLabel: 'Expérience',
      eyebrow: 'Expérience',
      heading: 'Expérience front-end',
      intro: 'Les postes où je conçois, développe et maintiens des interfaces utilisateur en production.',
    },
    'other-experience': {
      id: 'other-experience',
      eyebrow: 'Au-delà du code',
      heading: 'Autres expériences',
      intro:
        'Des postes qui ont affûté ma communication, mon sens du service client multilingue et ma capacité à résoudre les problèmes.',
    },
    education: { id: 'education', navLabel: 'Formation', eyebrow: 'Formation', heading: 'Formation' },
    certifications: {
      id: 'certifications',
      eyebrow: 'Apprentissage',
      heading: 'Certificats et langues',
    },
    contact: {
      id: 'contact',
      navLabel: 'Contact',
      eyebrow: 'Contact',
      heading: 'Travaillons ensemble',
      intro:
        "Je recherche un poste de développeur front-end au Portugal. Si vous travaillez avec Angular, je serais ravi d'échanger avec vous.",
    },
  },
  skills: [
    {
      name: 'Front-end',
      skills: [
        'Angular',
        'TypeScript',
        'JavaScript (ES6+)',
        'RxJS',
        'HTML5',
        'CSS3',
        'Tailwind CSS',
        'UI responsive',
        'React',
        'React Native',
      ],
    },
    {
      name: 'Outillage et qualité',
      skills: ['Monorepo Nx', 'Angular CLI', 'Jest', 'ESLint', 'Prettier', 'Git', 'Cursor AI'],
    },
    { name: 'Intégration et workflow', skills: ['API REST', 'Jira', 'Bitbucket'] },
    { name: 'Back-end et autres', skills: ['Node.js', 'Express.js', 'MongoDB', 'Java', 'XML'] },
  ],
  experience: [
    {
      id: 'sunrise',
      role: 'Développeur Front-End Angular',
      company: 'Sunrise',
      period: { start: { year: 2025, month: 7 } },
      summary:
        "Développement front-end d'applications web destinées aux clients, dans un grand monorepo Angular et Nx.",
      highlights: [
        "Développer et maintenir des fonctionnalités front-end avec Angular et TypeScript, en gardant l'application alignée sur les dernières versions d'Angular.",
        'Organiser et maintenir le code entre bibliothèques partagées et projets applicatifs dans un monorepo Nx.',
        "Concevoir et affiner des interfaces responsives en veillant à l'ergonomie et à la maintenabilité.",
        "Utiliser Cursor et des workflows assistés par l'IA pour coder, explorer la base de code et diagnostiquer les problèmes.",
        "Collaborer avec l'équipe pour implémenter les besoins, analyser les anomalies et améliorer la qualité de l'application.",
      ],
      stack: ['Angular', 'TypeScript', 'Nx', 'RxJS', 'Tailwind CSS', 'Jest', 'Cursor AI'],
      featured: true,
    },
    {
      id: 'sukha',
      role: 'Développeur Front-End',
      company: 'Sukha Technologies Inc.',
      location: 'À distance, Canada',
      period: { start: { year: 2022, month: 5 }, end: { year: 2024, month: 4 } },
      summary: 'Développement front-end de SOS Fodmap Wizard, une application web et mobile.',
      highlights: [
        "Contribution à l'application web et mobile SOS Fodmap Wizard.",
        "Développement et maintenance d'interfaces et de fonctionnalités avec TypeScript, React et React Native.",
        "Prise en compte des retours UX et design pour traduire les besoins des utilisateurs en solutions d'interface concrètes.",
        'Participation au choix des wireframes et au développement collaboratif du produit.',
      ],
      stack: ['TypeScript', 'React', 'React Native', 'JavaScript', 'API REST', 'Git'],
      featured: true,
    },
    {
      id: 'teleperformance',
      role: 'Conseiller service client',
      company: 'Teleperformance',
      context: 'Projet Meta, marché arabophone',
      period: { start: { year: 2024, month: 7 }, end: { year: 2025, month: 6 } },
      summary:
        'Accompagnement des clients du marché arabophone par e-mail, chat et téléphone, avec une gestion empathique des réclamations et des escalades.',
      highlights: [],
      stack: [],
      featured: false,
    },
    {
      id: 'foundever',
      role: 'Conseiller service client',
      company: 'Foundever',
      context: 'Projet Airbnb, marché francophone',
      period: { start: { year: 2024, month: 4 }, end: { year: 2024, month: 6 } },
      summary:
        'Gestion des appels entrants et sortants pour le marché francophone, en transformant les retours clients en problèmes résolus.',
      highlights: [],
      stack: [],
      featured: false,
    },
    {
      id: 'international-packaging',
      role: 'Technicien informatique',
      company: 'International Packaging',
      period: { start: { year: 2020, month: 8 }, end: { year: 2021, month: 5 } },
      summary:
        "Installation et maintenance du matériel de l'entreprise, avec un support technique sur site et à distance.",
      highlights: [],
      stack: [],
      featured: false,
    },
    {
      id: 'mobelite',
      role: "Projet de fin d'études",
      company: 'Mobelite',
      location: 'Monastir, Tunisie',
      period: { start: { year: 2017, month: 2 }, end: { year: 2017, month: 5 } },
      summary:
        "Conception et développement d'une application Android en Java et XML facilitant la communication entre les personnes en situation de handicap et leurs accompagnateurs.",
      highlights: [],
      stack: [],
      featured: false,
    },
  ],
  education: [
    {
      degree: 'Master',
      field: 'Génie logiciel',
      institution: "Institut Supérieur d'Informatique",
      location: 'Ariana, Tunisie',
      year: 2020,
    },
    {
      degree: 'Licence',
      field: 'Informatique',
      institution: "Institut Supérieur d'Informatique et de Mathématiques",
      location: 'Monastir, Tunisie',
      year: 2017,
    },
    {
      degree: 'Baccalauréat',
      institution: 'Lycée Argoub',
      location: 'Mareth, Gabès, Tunisie',
      year: 2013,
    },
  ],
  certifications: [
    { name: 'Bootcamp JavaScript Full-Stack', issuer: 'Go My Code' },
    { name: 'Angular', issuer: 'SoloLearn' },
    { name: 'Cours Python 3', issuer: 'SoloLearn' },
    { name: 'Fondamentaux du HTML', issuer: 'SoloLearn' },
  ],
  languages: ['Arabe', 'Anglais', 'Français'],
};
