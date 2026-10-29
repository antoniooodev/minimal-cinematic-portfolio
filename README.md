# Minimal portfolio

A cinematic, single-page portfolio template for developers, built with **Next.js** and **TypeScript**. It is exported as a static site and deployed to **GitHub Pages** on every push to `main`.

**Live demo:** https://antoniooodev.github.io/minimal-portfolio/

The page is staged like a short film: it opens with a letterbox title card, moves through numbered scenes and closes on end credits. The texts are placeholder copy and the photos are demo images. Replace them and the site is yours.

## Scenes

| # | Scene | Content |
|---|---|---|
| 01 | Opening | Full-screen photo with a slow push-in, the name set large, the role, a one-line pitch and the local time. |
| 02 | About | A statement, a short bio, three principles and a portrait that opens like a curtain. |
| 03 | Manifesto | A large statement whose words light up as you scroll, with a photo and two paragraphs. |
| — | Skills | A crimson band with the logos of the stack scrolling by. |
| 04 | Work | Featured projects scroll on the left while a sticky frame shows the current one; the other projects follow in an archive list. |
| 05 | Experience | Roles, then education and certifications. |
| 06 | Process | Four working steps over a full-bleed photo. |
| 07 | Contact | Email and social links, the closing credits, the copyright line and the design credit. |

The header stays fixed: it uses "difference" blending so it reads on both dark and light scenes, underlines the section on screen and shows a film timecode that runs from `00:00:00:00` at the top to `00:03:00:00` at the credits. On small screens the links move into a full-screen menu.

## Design

**Palette**, built on a deep crimson with a cocoa brown as its warm counterpart. The page alternates dark "night" scenes and ivory "day" scenes:

| Token | Value | Use |
|---|---|---|
| `--crimson` | `#A7010D` | Skills band, accents on ivory |
| `--crimson-lit` | `#E0414A` | Accents on dark scenes, where the deep crimson would be too dim |
| `--cocoa` | `#6E4B3A` | Warm brown counterpart, project backdrops |
| `--sand` | `#DCCDB9` | Details on dark, project backdrops |
| `--night` | `#0E0A09` | Dark scenes |
| `--ivory` | `#ECE5DA` | Light scenes and text on dark |
| `--ink` | `#1B1311` | Text on ivory |

Photos are shown in black and white with a light warm tint, so any picture you add sits inside the palette.

**Type:** [Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif) for titles, with *italic* for the accent; [Geist](https://vercel.com/font) Sans for text; Geist Mono for labels and the timecode.

**Motion:**

- a letterbox title card that parts to open the page;
- film grain over the whole picture;
- titles that rise word by word, and content that fades in as it enters the view;
- photos that open like a curtain and drift with a light parallax;
- a manifesto that lights up word by word with the scroll;
- a sticky project frame that cross-fades between projects.

All motion is turned off when the visitor prefers reduced motion. Without JavaScript the content stays visible.

## Use it as your portfolio

1. Fork or copy this repository.
2. Edit [`src/content/site.ts`](src/content/site.ts). Every text and photo on the page is set there:
   - `profile`: name, role, location and time zone, status, pitch, email, social links and an optional résumé link;
   - `photos`: the hero, about, manifesto and process photos. `position` keeps the subject in frame when the photo is cropped;
   - `about`, `principles`, `manifesto` and `process`: the texts of each scene. In titles, words wrapped in `*asterisks*` are set in italic crimson;
   - `skills`: the logos in the skills band. They come from [Simple Icons](https://simpleicons.org): import any icon by its `si` name (for example `siRust`) and add it to the list. Logos are drawn in a single colour to stay inside the palette;
   - `experience`, `education` and `certifications`: newest first; leave `end` empty for something still ongoing;
   - `projects`: `featured: true` puts a project in the showcase, with its `image`; the others go in the archive.
3. Put your photos in [`public/images/`](public/images). JPEGs around 1600–2400 px wide are enough.
4. Push to `main`. The workflow publishes the site to `https://<user>.github.io/<repo>/`.

The content types are in [`src/content/types.ts`](src/content/types.ts), so the editor flags a missing or misspelled field. The section links in the header are in [`src/content/navigation.ts`](src/content/navigation.ts).

The demo photos come from Unsplash; their authors are listed in [`CREDITS.md`](CREDITS.md).

## Project structure

```
src/
├── app/                 root layout, page, 404 and global styles
├── components/
│   ├── effects/         letterbox, scroll reveal, word-by-word titles, scroll-lit
│   │                    text, parallax, marquee and timecode
│   ├── layout/          header with menu, clock
│   ├── sections/        one component per scene
│   └── ui/              photo and scene label
├── content/             site content, its types and the section list
└── lib/                 formatting helpers
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
