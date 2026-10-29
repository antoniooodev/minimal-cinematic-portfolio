# Minimal portfolio

A minimal, editorial portfolio template for developers, built with **Next.js** and **TypeScript**. It is exported as a static site and deployed to **GitHub Pages** on every push to `main`.

**Live demo:** https://antoniooodev.github.io/minimal-portfolio/

All the content is placeholder text for a fictional developer. Replace it in one file and the site is yours.

## Pages

| Route | Content |
|---|---|
| `/` | A serif statement with an accent phrase, location and live local time, selected work, a short bio with the main tools, and a career summary. |
| `/experience` | Roles from the most recent, with period, company, summary, highlights and stack, followed by the full toolbox. |
| `/education` | Degrees in the same layout, plus a list of certifications. |
| `/projects` | Every project in a numbered list, filterable by category. On desktop a cover preview follows the pointer; on phones each row shows a thumbnail. |

Every section follows the same two-column rhythm: a small label on the left, the content on the right. On narrow screens the columns stack.

## Design

**Palette**, built on a deep crimson with a cocoa brown as its warm counterpart:

| Token | Light | Use |
|---|---|---|
| `--crimson` | `#A7010D` | Accent: italic emphasis, active states, details |
| `--cocoa` | `#6E4B3A` | Contact band, project covers |
| `--sand` | `#DCCDB9` | Accent on cocoa, project covers |
| `--paper` | `#F6F1E9` | Background |
| `--ink` | `#241713` | Text (espresso) |
| `--muted` | `#86736A` | Secondary text and labels |

The dark theme uses espresso paper and ivory ink, and lifts the crimson to `#E0414A` so it stays legible.

**Type:** [Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif) for titles, with *italic* for the accent; [Geist](https://vercel.com/font) Sans for text; Geist Mono for small labels.

**Motion**, kept quiet:

- titles rise word by word and sections fade in as they enter the viewport;
- links draw their underline on hover, and the current page is marked with a crimson dot;
- the project preview trails the pointer;
- the light/dark switch spreads in a circle from the button where the browser supports it;
- pages fade in on navigation.

All motion is turned off when the visitor prefers reduced motion, and without JavaScript the content stays visible.

## Tech stack

- [Next.js](https://nextjs.org) (App Router) with `output: "export"` for a fully static build
- TypeScript in strict mode
- CSS Modules and CSS custom properties, with no UI or animation library
- ESLint with the Next.js Core Web Vitals rules

## Use it as your portfolio

1. Fork or copy this repository.
2. Edit [`src/content/site.ts`](src/content/site.ts). Every text on the site lives there:
   - `profile`: name, role, headline, location and time zone, status, intro, bio, email, social links and an optional résumé link. In the headline, words wrapped in `*asterisks*` are set in crimson italic;
   - `toolbox`: technologies grouped by area;
   - `experience`, `education` and `certifications`: newest first; leave `end` empty for something still ongoing;
   - `projects`: newest first. `featured: true` shows a project on the home page. Each project gets a generated cover from `cover.tone` (`crimson`, `cocoa`, `sand` or `espresso`) and `cover.pattern` (`grid`, `rings`, `waves`, `bars` or `dots`), or set `image` to a file in `public/` to use a real screenshot.
3. Push to `main`. The workflow publishes the site to `https://<user>.github.io/<repo>/`.

The content types are in [`src/content/types.ts`](src/content/types.ts), so the editor flags a missing or misspelled field. To change the colours, edit the custom properties at the top of [`src/app/globals.css`](src/app/globals.css).

## Project structure

```
src/
├── app/                 routes, root layout, page transition and global styles
├── components/
│   ├── effects/         scroll reveal and word-by-word titles
│   ├── layout/          header, mobile menu, footer, theme switch, clock
│   └── ui/              page header, section, entry list, project list and covers
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
