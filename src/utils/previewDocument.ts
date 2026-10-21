import type { CSSLayout } from './layoutGenerators';

/**
 * Neutral "demo" styling so empty layout blocks are visible.
 * Used by the live preview and (clearly marked) by the standalone export.
 */
export const PREVIEW_BASE_CSS = `
body {
  margin: 0;
  padding: 16px;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  color: #333;
}

* {
  box-sizing: border-box;
}

.header, .nav, .content, .sidebar, .footer,
.flex-item, .fill-item, .fixed-item,
.span-12, .span-6, .span-4, .span-3, .span-2, .span-1,
.grid-item {
  padding: 1rem;
  background-color: #f2f2f2;
  border: 1px solid #ddd;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}`.trim();

/** CSS shown in the code panel: container rules, then children rules. */
export const joinCss = (layout: Pick<CSSLayout, 'containerCSS' | 'childrenCSS'>): string =>
  `${layout.containerCSS.trim()}\n\n${layout.childrenCSS.trim()}`.trim();

/** Document rendered inside the sandboxed preview iframe. */
export const buildPreviewDocument = (css: string, html: string): string => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
${PREVIEW_BASE_CSS}

${css}
    </style>
  </head>
  <body>
${html}
  </body>
</html>`;

/** A complete, copy-paste-ready page for the "Copy full page" / "Download" actions. */
export const buildStandaloneDocument = (layout: CSSLayout, title: string): string => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
  <style>
/* ── Layout ─────────────────────────────── */
${joinCss(layout)}

/* ── Demo styles: remove in your project ── */
${PREVIEW_BASE_CSS}
  </style>
</head>
<body>
${layout.html.trim()}
</body>
</html>
`;
