# Easy Layout Generator

Pick a CSS layout, tune it, copy clean code.

A small tool for grabbing ready-made **CSS Grid**, **Flexbox** and **modal/dialog** layouts. Choose a template, adjust it with live controls, check it at desktop / tablet / mobile widths, then copy the HTML and CSS — plain CSS, no framework, no lock-in.

## Features

- **23 templates** — Grid (12-span, Holy Grail, sidebar, masonry, …), Flexbox (row, wrap, fill, tabs, z-stack, …) and modals (basic, notification, confirmation, fullscreen, drawer).
- **Live controls** — gaps, widths, radii and colours for every template that has them; reset with one click.
- **Responsive preview** — sandboxed iframe with desktop / tablet / mobile widths. Modal templates are fully interactive.
- **Copy & export** — copy CSS or HTML, copy a complete page, or download it as an `.html` file.
- **Shareable links** — the template and your changes live in the URL (`/?t=holy-grail&gap=2rem`).
- **Search & filter** — press `/` to search.
- **Self-contained** — system font stacks, no CDN scripts, no third-party requests at runtime.

## Getting started

Requires Node.js 20+ (see `.nvmrc`).

```bash
npm install
npm run dev        # http://localhost:8080
```

| Script              | What it does                       |
| ------------------- | ---------------------------------- |
| `npm run dev`       | Start the dev server               |
| `npm run build`     | Production build into `dist/`      |
| `npm run preview`   | Serve the production build         |
| `npm run lint`      | ESLint                             |
| `npm run typecheck` | TypeScript, no emit                |

## Project structure

```
src/
  pages/Index.tsx            gallery + editor; URL is the source of truth
  components/
    TemplateSelector.tsx     search, filters and template cards
    OptionsPanel.tsx         sliders / inputs generated from the option schema
    CodePreview.tsx          CSS / HTML tabs, copy, download
    LayoutPreview.tsx        sandboxed live preview with viewport switcher
    HighlightedCode.tsx      tiny dependency-free syntax highlighter
    LayoutPreviews.tsx       thumbnails for the template cards
  utils/
    layoutGenerators.tsx     the templates: code generation + metadata
    layoutOptions.ts         which options each template exposes, and their defaults
    previewDocument.ts       builds the preview / exported documents
```

## Adding a template

1. Add a `case` to the right generator in `src/utils/layoutGenerators.tsx` returning `{ containerCSS, childrenCSS, html }`.
2. Add an entry to `layoutTemplates` in the same file, with a thumbnail from `LayoutPreviews.tsx`.
3. If it has tunable values, list them in `src/utils/layoutOptions.ts`. Each `default` must match the fallback used in the generator (`options.gap || '1rem'`).

## Keeping dependencies fresh

[Dependabot](.github/dependabot.yml) opens weekly pull requests for npm packages and GitHub Actions. Related packages (React, Radix UI, Tailwind, Vite, lint tooling) are grouped, and everything else is batched into one minor/patch PR. The [CI workflow](.github/workflows/ci.yml) runs lint, type-check and build on every PR, so a bump only merges when the project still builds.

## License

See the repository for license information.
