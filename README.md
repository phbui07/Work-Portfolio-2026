# Peter Bui — Portfolio

Single-page personal portfolio. React + Vite + Tailwind CSS v4, with Lenis inertial
smooth scrolling and Motion (Framer Motion) for the entrance and scroll animations.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## Editing content

All copy, links, projects, stats, certifications and leadership entries live in
[src/data/content.js](src/data/content.js). The components are presentational — you should
almost never need to touch them to change the site's text.

- `projects` — the two large featured cards
- `archive` — the compact "Also built" list. Promote an entry by moving it into `projects`
  and giving it a `summary`, `impact` and `tags`.
- `marquee` — the scrolling ticker under the hero
- `stats` — the count-up numbers in About

## Adding your photo

1. Drop the image file into [public/](public/) (e.g. `public/portrait.jpg`).
2. Set `profile.portrait` in [src/data/content.js](src/data/content.js) to `/portrait.jpg`.

Until a real file is there, the hero shows an initials placeholder instead of a broken image.

## Adding project screenshots

Put images in `public/work/`, then add an `image` field to the project in
[src/data/content.js](src/data/content.js):

```js
{ title: 'Nến Thương Charity Website', image: '/work/nen-thuong.jpg', ... }
```

Projects without an `image` render a typographic panel instead.

## How the motion works

| Piece | Where | What it does |
| --- | --- | --- |
| Inertial scroll | [src/lib/smooth-scroll.jsx](src/lib/smooth-scroll.jsx) | Lenis takes over the page scroll and every `href="#..."` link glides to its section. Sections clear the header via `scroll-margin-top`. |
| Masked text reveal | [src/components/ui/TextReveal.jsx](src/components/ui/TextReveal.jsx) | Every word sits in its own clipping box and slides up, staggered. Used for all headings. |
| Fade + lift | [src/components/ui/FadeIn.jsx](src/components/ui/FadeIn.jsx) | Body copy and blocks, triggered once on scroll. |
| Loading curtain | [src/components/Intro.jsx](src/components/Intro.jsx) | Holds on the name, lifts, then releases the hero. |
| Parallax | `Portrait.jsx`, `Work.jsx` | Images drift against the scroll via `useScroll` + `useTransform`. |
| Cursor label | [src/components/ui/CursorLabel.jsx](src/components/ui/CursorLabel.jsx) | Spring-following "View site" pill over project cards, desktop pointers only. |
| Shared curves | [src/lib/motion.js](src/lib/motion.js) | One set of easings and variants so everything moves the same way. |

Timings and easings are centralised in `src/lib/motion.js` — change `EASE_OUT` or the
variant durations there to retune the whole site at once.

**Reduced motion:** every animation is disabled or reduced when the visitor has
`prefers-reduced-motion` set — Lenis doesn't initialise, the curtain is skipped, the marquee
and counters render static, and text appears without masking.

**To remove the loading curtain:** delete `<Intro />` from [src/App.jsx](src/App.jsx) and
initialise `ready` to `true`.

## Structure

```
src/
  App.jsx                 providers + section order
  index.css               Tailwind theme tokens, Lenis styles, shared classes
  data/content.js         all site content
  lib/
    smooth-scroll.jsx     Lenis provider + anchor interception
    motion.js             shared easings and variants
    intro.jsx             "curtain has lifted" context
    useActiveSection.js   nav highlighting
  components/
    Intro.jsx             loading curtain
    Nav.jsx               fixed nav, active pill, progress bar, mobile overlay
    Hero.jsx              name, tagline, portrait
    Marquee.jsx           scrolling ticker
    Work.jsx              featured cards + archive list
    About.jsx             bio, stat counters, certifications, award
    Leadership.jsx        Nến Thương Project + storytelling series
    Contact.jsx           CTA, links, footer
    ui/
      TextReveal.jsx      masked word reveal
      FadeIn.jsx          fade + lift on scroll
      Counter.jsx         count-up-on-scroll number
      Portrait.jsx        photo with initials fallback
      SectionHeading.jsx  shared eyebrow + heading
      CursorLabel.jsx     cursor-following hover label
```
