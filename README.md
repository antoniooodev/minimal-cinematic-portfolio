# Minimal portfolio

A minimal, editorial portfolio template for developers, built with **Next.js** and **TypeScript**. It is exported as a static site and deployed to **GitHub Pages** on every push to `main`.

**Live demo:** https://antoniooodev.github.io/minimal-portfolio/

All the content is placeholder text for a fictional developer. Replace it in one file and the site is yours.

## Pages

| Route | Content |
|---|---|
| `/` | Full-screen hero with the name, a rotating headline and an interactive dot field; a skills marquee; a bio that lights up word by word on scroll; animated stats; featured projects; capabilities; a short career timeline. |
| `/experience` | Work experience on a timeline that fills as you scroll, followed by a toolbox of technologies grouped by area. |
| `/education` | Degrees on the same timeline, plus certification cards. |
| `/projects` | Every project, filterable by category, in a **list** view (a cover preview follows the pointer) or a **grid** view. |

## Effects

- Text that slides in letter by letter, and sections that fade up as they enter the viewport
- A custom cursor that grows over links and shows a label over projects (precise pointers only)
- Magnetic buttons, spotlight cards and a scramble effect on the navigation
- A navigation pill that slides between links, and a header that hides while scrolling down
- A scroll progress bar, count-up stats and endless marquees
- A light/dark theme switch that spreads in a circle from the button, where the browser supports it
- A **⌘K / Ctrl+K** command menu to jump to pages and projects, switch theme or copy the email
- A full-screen menu on mobile and page transitions between routes

Every effect is turned off when the visitor prefers reduced motion. Without JavaScript the content is still fully visible.

## Tech stack

- [Next.js](https://nextjs.org) (App Router) with `output: "export"` for a fully static build
- TypeScript in strict mode
- CSS Modules and CSS custom properties, with no UI or animation library
- [Geist](https://vercel.com/font) Sans and Mono, and [Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif) for the italic accents
- ESLint with the Next.js Core Web Vitals rules

## Use it as your portfolio

1. Fork or copy this repository.
2. Edit [`src/content/site.ts`](src/content/site.ts). Every text on the site lives there:
   - `profile`: name, role, rotating headline words, location and time zone, status, intro, bio, email, social links and an optional résumé link;
   - `stats`, `skills`, `capabilities` and `toolbox`: the home page numbers, the marquee, the services and the experience toolbox;
   - `experience`, `education` and `certifications`: newest first; leave `end` empty for something still ongoing;
   - `projects`: newest first. `featured: true` shows a project on the home page. Each project gets a generated cover from `cover.from`, `cover.to` and `cover.pattern` (`grid`, `rings`, `waves`, `bars` or `dots`), or set `image` to a file in `public/` to use a real screenshot.
3. Push to `main`. The workflow publishes the site to `https://<user>.github.io/<repo>/`.

The content types are in [`src/content/types.ts`](src/content/types.ts), so the editor will flag a missing or misspelled field.

### Styling

Colours, fonts, spacing and easing curves are CSS custom properties at the top of [`src/app/globals.css`](src/app/globals.css), with a light and a dark set. Change `--accent` to give the whole site a different colour.

## Project structure

```
src/
├── app/                 routes, root layout, page transition and global styles
├── components/
│   ├── effects/         cursor, scroll reveal, split text, marquee, magnetic,
│   │                    counter, scramble, dot field, rotating words, scroll text
│   ├── layout/          header, mobile menu, footer, command menu, theme switch
│   └── ui/              page and section headings, timeline, project list,
│                        project card and generated covers
├── content/             site content and its types
└── lib/                 formatting and theme helpers
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

The [`Deploy`](.github/workflows/deploy.yml) workflow runs on every push to `main`: it installs the dependencies, lints, builds the static export with the repository name as base path and publishes `out/` to GitHub Pages. Pull requests run the same lint and build steps without deploying.

On a new repository, go to **Settings → Pages** and set **Source** to **GitHub Actions** once.

If the site is served from a custom domain or from a `<user>.github.io` repository, set `PAGES_BASE_PATH` to an empty string in the workflow.
