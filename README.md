# Minimal portfolio

A minimal, typographic developer portfolio built with **Next.js** and **TypeScript**, exported as a static site and deployed to **GitHub Pages** on every push to `main`.

**Live:** https://antoniooodev.github.io/minimal-portfolio/

## Pages

| Route | Content |
|---|---|
| `/` | Hero with name, status, role, location and live local time; an index of the other sections; featured projects; a short bio. |
| `/experience` | Work experience as a timeline: period, role, company, summary, highlights and stack. |
| `/education` | Degrees and schools in the same timeline layout. |
| `/projects` | Every project in a numbered list, filterable by technology, linking to the repository or live site. |

Every page shares a sticky header with the main navigation and a light/dark theme switch (the system preference is used until a theme is chosen), and a footer with contact links and the local time. Content fades in on load, and all motion is disabled when the visitor prefers reduced motion.

## Tech stack

- [Next.js](https://nextjs.org) (App Router) with `output: "export"` for a fully static build
- TypeScript in strict mode
- CSS Modules and CSS custom properties, no UI framework
- [Geist](https://vercel.com/font) Sans and Mono, [Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif) for the italic accents
- ESLint with the Next.js Core Web Vitals rules

## Editing the content

All the text lives in [`src/content/site.ts`](src/content/site.ts), typed by [`src/content/types.ts`](src/content/types.ts):

- `profile`: name, role, location, time zone, status line, intro, bio, optional email and social links;
- `experience`: roles, newest first (leave `end` empty for an ongoing role);
- `education`: degrees, newest first;
- `projects`: newest first; set `featured: true` to show a project on the home page.

> The experience and education entries were written from public information and should be checked before sharing the site. Add an `email` to `profile` to make the footer call to action open a new email instead of the GitHub profile.

Colours, fonts and spacing are defined as CSS custom properties at the top of [`src/app/globals.css`](src/app/globals.css). The accent colour is `--accent`.

## Project structure

```
src/
├── app/            routes, root layout, global styles and favicon
├── components/     header, footer, theme switch, clock, timeline, project list
├── content/        site content and its types
└── lib/            small formatting helpers
```

## Running locally

Requires Node.js 22 (see `.nvmrc`).

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

| Script | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build the static site into `out/` |
| `npm run start` | Serve the `out/` folder locally |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run the TypeScript compiler without emitting |

## Deployment

The [`Deploy`](.github/workflows/deploy.yml) workflow runs on every push to `main`: it installs the dependencies, lints, builds the static export with the right base path and publishes `out/` to GitHub Pages. Pull requests run the same lint and build steps without deploying.

To enable it on a new repository, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
