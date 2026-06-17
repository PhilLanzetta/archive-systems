# Archive Systems — Splash Page

A hardcoded splash page for Archive Systems, built with Next.js (App Router) and plain CSS via CSS Modules, matching the supplied design. Deploys to Netlify.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Structure

- `app/page.tsx` / `app/page.module.css` — the splash page: background image, nav, hero, services grid, contact form, client list, project images, footer.
- `app/components/ContactForm.tsx` / `app/components/ContactForm.module.css` — client component for the "Work with us" form (dropdown + four text inputs). Submits to Netlify Forms.
- `app/globals.css` — global resets and design tokens (CSS variables for color, font stacks) shared across modules.
- `public/forms.html` — a static page that exists only so Netlify's form-detection bot can find the form's name and fields at deploy time (see "Netlify Forms" below).
- `app/fonts/AGaramondPro-Regular.otf` — licensed font file, self-hosted via `next/font/local`. Used only for the "Archive Systems" wordmark in the nav.
- `public/background/hero-bg.png` — the fixed background image behind the whole page.
- `public/projects/` — the two project preview images shown near the bottom of the page. Currently placeholders — swap in `project-1.png` and `project-2.png` (or update the paths in `page.tsx`) once you have the real assets.
- `netlify.toml` — build config (`next build`, publish `.next`, `@netlify/plugin-nextjs`).

## Styling

No Tailwind or other CSS framework — just CSS Modules (`*.module.css`) co-located with each component, plus a small `globals.css` for resets and shared design tokens (`--background`, `--foreground`, `--muted`, `--border`, `--border-soft`, `--font-display`, `--font-body`). Module class names are scoped automatically by Next.js (e.g. `.wordmark` compiles to something like `page-module__E0kJGG__wordmark`), so there's no need to worry about collisions between components.

To change a color or spacing value, look for the relevant class in the component's `.module.css` file rather than searching for inline styles — there aren't any.

## Fonts

Three typefaces, each scoped to a specific role:

- **Adobe Garamond Pro** (`.wordmark` in `page.module.css`) — used only for the "Archive Systems" wordmark in the nav. Self-hosted from `app/fonts/AGaramondPro-Regular.otf` via `next/font/local`, since it's a licensed font and can't be loaded from a public CDN. If you have additional weights/styles licensed (italic, bold, etc.), add the files to `app/fonts/` and extend the `localFont` call in `app/layout.tsx`.
- **Times New Roman** (`var(--font-display)`) — every other serif heading (hero headline, service titles, "Work with us.", the Pacific blurb, footer links). It's a system font, so no files needed — it'll render as Times New Roman wherever the OS has it, falling back to Times/Georgia otherwise.
- **Helvetica Neue** (`var(--font-body)`, the default set on `body` in `globals.css`) — body copy, captions, form fields, nav button. Also a system font with no files needed.

## Netlify Forms

Netlify Forms detects forms by scanning static HTML in the published output at deploy time — it doesn't execute JavaScript or inspect React components. Since this is a Next.js App Router site (server-rendered via `@netlify/plugin-nextjs`), the actual page isn't written out as static HTML, so the live form can't be detected directly.

The standard workaround (and what's implemented here): `public/forms.html` is a plain HTML file containing the real form markup — name, fields, `data-netlify="true"`, and a honeypot field — that Netlify's bot _can_ see, since everything in `public/` is copied into the static output as-is. The interactive form in `ContactForm.tsx` then submits to that same form name via `fetch('/forms.html', …)` with a URL-encoded body, and Netlify accepts the submission because the field names match what it detected at build time.

If you ever rename a field or add/remove one, update it in **both** places: `public/forms.html` and the `payload` object in `app/components/ContactForm.tsx`.

Submissions show up under **Site settings → Forms** in the Netlify dashboard, where you can also wire up email notifications, Slack, Zapier, etc.

## Deploying

1. Push this repo to GitHub/GitLab/Bitbucket and connect it in Netlify, or run `netlify deploy` from the project root.
2. Netlify will read `netlify.toml`, run `npm run build`, and install `@netlify/plugin-nextjs` automatically.
3. After the first deploy, check **Site settings → Forms** to confirm the `schedule-call` form was detected. If it wasn't, double check `public/forms.html` made it into the deploy (it should always be carried through, since anything in `public/` ships verbatim).

## Notes for building this out further

- Section content lives in typed arrays at the top of `page.tsx` (`SERVICES`, `CLIENTS`) — easy to move to a CMS or data file later.
- The background image currently sits behind everything at fixed position with a dark overlay/gradient for legibility — adjust the `rgba()` values in `.backgroundOverlay` and `.backgroundGradient` in `page.module.css` if you want more or less of the image showing through.
