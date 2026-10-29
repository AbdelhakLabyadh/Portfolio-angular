# Abdelhak Labyadh — Portfolio

Personal portfolio of an Angular front-end developer based in Lisbon. It is a statically prerendered Angular 22 app in an Nx workspace, deployed to GitHub Pages.

## Stack

- Angular 22 (standalone components, signals, `input()`/`output()`, native control flow, static prerendering with hydration)
- Nx 22 monorepo with module-boundary rules
- Tailwind CSS 4 with semantic colour tokens and a light/dark theme
- Jest 30 + `jest-preset-angular` + `jest-axe` accessibility checks
- ESLint 9 (flat config, `angular-eslint`), Prettier, husky, lint-staged and commitlint

## Workspace

```
apps/portfolio          App shell: composes layout + sections, SEO meta, prerendering
libs/portfolio-data     @portfolio/data      Typed models and all content (portfolio.data.ts)
libs/ui                 @portfolio/ui        Presentational building blocks: section, card, tag-list,
                                             timeline-item, avatar, icon, icon-links, uiButton
libs/layout             @portfolio/layout    Header, nav with scroll-spy, footer, theme toggle + services
libs/feature-sections   @portfolio/sections  Hero, about, skills, experience, other experience,
                                             education, certifications, contact
```

Dependencies only flow one way, enforced by `@nx/enforce-module-boundaries`:

| Tag            | Can depend on             |
| -------------- | ------------------------- |
| `type:app`     | feature, layout, ui, data |
| `type:feature` | ui, data                  |
| `type:layout`  | ui, data                  |
| `type:ui`      | ui                        |
| `type:data`    | data                      |

## Editing content

The site is available in English at `/` and in French at `/fr`; both pages are prerendered and the header has a language switcher. Templates contain no hard-coded content:

- **Portfolio content**: English in [`portfolio.data.ts`](libs/portfolio-data/src/lib/portfolio.data.ts), French in [`portfolio.fr.ts`](libs/portfolio-data/src/lib/portfolio.fr.ts). Keep both in sync — a test checks that they have the same structure.
- **Interface text** (buttons, labels, menu): [`ui-copy.ts`](libs/portfolio-data/src/lib/ui-copy.ts).

- **CV**: replace `apps/portfolio/public/Abdelhak_Labyadh_CV.pdf`.
- **Photo**: add an image to `apps/portfolio/public/` and set `profile.photoUrl` (for example `'profile.jpg'`). Without it the hero shows the initials.
- **Experience**: set `featured: true` to show a role as a full card in "Front-end experience"; other roles appear in the compact "Other experience" list.

## Commands

```bash
npm install
npm start                   # dev server on http://localhost:4200
npm run build               # prerendered output in dist/apps/portfolio/browser
npm test                    # all Jest suites
npm run lint                # ESLint across all projects
npx nx graph                # visualise the project graph
```

## Deployment

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) lints and tests affected projects, builds with the correct `--base-href` for the repository name, and deploys `dist/apps/portfolio/browser` to GitHub Pages on every push to `main`.

To enable it, push the repository to GitHub and set **Settings → Pages → Source** to **GitHub Actions**.
