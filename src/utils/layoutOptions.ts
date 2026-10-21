/**
 * Customisable options for every template.
 *
 * The generators in layoutGenerators.tsx already accept an options object
 * (`options.gap || '1rem'`, …). This file describes those options as data,
 * so the UI can render controls for them and the defaults live in one place.
 *
 * Every `default` MUST match the fallback used by the generator, so that an
 * untouched template produces exactly the same code as before.
 */

export type LayoutOptions = Record<string, string>;

interface BaseField {
  key: string;
  label: string;
  hint?: string;
  default: string;
}

export interface RangeField extends BaseField {
  kind: 'range';
  unit: 'px' | 'rem' | '';
  min: number;
  max: number;
  step: number;
}

export interface TextField extends BaseField {
  kind: 'text';
  placeholder?: string;
}

export interface ColorField extends BaseField {
  kind: 'color';
}

export type OptionField = RangeField | TextField | ColorField;

// ── field factories ────────────────────────────────────────────

const gap = (def = '1rem', key = 'gap', label = 'Gap'): RangeField => ({
  key, label, kind: 'range', unit: 'rem', min: 0, max: 4, step: 0.25, default: def,
});

const px = (
  key: string, label: string, def: string, min: number, max: number, step = 10, hint?: string,
): RangeField => ({ key, label, kind: 'range', unit: 'px', min, max, step, default: def, hint });

const text = (
  key: string, label: string, def: string, hint?: string, placeholder?: string,
): TextField => ({ key, label, kind: 'text', default: def, hint, placeholder });

const color = (key: string, label: string, def: string): ColorField => ({
  key, label, kind: 'color', default: def,
});

// ── schemas ────────────────────────────────────────────────────

const schemas: Record<string, OptionField[]> = {
  // Grid
  '12-span-grid': [gap()],
  '3x3': [gap()],
  'holy-grail': [
    gap(),
    px('navWidth', 'Nav width', '200px', 80, 400),
    px('sidebarWidth', 'Sidebar width', '200px', 80, 400),
  ],
  sidebar: [gap('0'), px('sidebarWidth', 'Sidebar width', '250px', 120, 500)],
  'card-grid': [
    gap('1.5rem'),
    px('minWidth', 'Min card width', '250px', 120, 500),
    px('imageHeight', 'Image height', '200px', 80, 400),
  ],
  masonry: [
    {
      key: 'columns', label: 'Columns', kind: 'range', unit: '', min: 1, max: 8, step: 1, default: '3',
    },
    gap(),
    px('rowHeight', 'Row height', '20px', 5, 60, 5, 'Base unit used to size items'),
  ],
  'two-column': [
    gap('2rem'),
    text('leftWidth', 'Left column', '1fr', 'Any grid track size', '1fr'),
    text('rightWidth', 'Right column', '1fr', 'Any grid track size', '1fr'),
  ],
  hierarchy: [
    gap(),
    px('sidebarWidth', 'Sidebar width', '250px', 120, 500),
    gap('1rem', 'contentGap', 'Content gap'),
    px('contentMinHeight', 'Content min height', '150px', 60, 400),
  ],

  // Flexbox
  row: [gap()],
  'row-wrap': [
    gap(),
    text('itemWidth', 'Item width', 'calc(33.333% - 0.67rem)', 'Desktop width', 'calc(33.333% - 0.67rem)'),
    px('minWidth', 'Min item width', '200px', 80, 400),
    text('mobileItemWidth', 'Mobile item width', 'calc(50% - 0.5rem)', 'Width on small screens', 'calc(50% - 0.5rem)'),
  ],
  'fill-space': [gap()],
  'fill-remaining-space': [gap(), px('fixedWidth', 'Fixed width', '200px', 60, 400)],
  separate: [gap('1rem', 'itemGap', 'Item gap')],
  'centered-content': [
    px('maxWidth', 'Max width', '500px', 200, 900),
    text('minHeight', 'Min height', '100vh', 'e.g. 100vh, 400px', '100vh'),
    {
      key: 'padding', label: 'Padding', kind: 'range', unit: 'rem', min: 0, max: 6, step: 0.25, default: '2rem',
    },
  ],
  'z-stack': [
    text('width', 'Width', '100%', undefined, '100%'),
    text('height', 'Height', 'auto', undefined, 'auto'),
  ],

  // Modals
  'basic-modal': [
    px('maxWidth', 'Max width', '500px', 240, 800),
    {
      key: 'padding', label: 'Padding', kind: 'range', unit: 'rem', min: 0.5, max: 4, step: 0.25, default: '2rem',
    },
    {
      key: 'borderRadius', label: 'Corner radius', kind: 'range', unit: 'rem', min: 0, max: 2, step: 0.125, default: '0.5rem',
    },
  ],
  'notification-modal': [px('maxWidth', 'Max width', '400px', 240, 700)],
  'confirmation-modal': [
    color('iconBgColor', 'Icon background', '#FEF2F2'),
    color('iconColor', 'Icon colour', '#DC2626'),
  ],
  'fullscreen-modal': [color('bgColor', 'Background', 'white')],
  'drawer-modal': [px('width', 'Drawer width', '300px', 200, 600)],
};

// ── public helpers ─────────────────────────────────────────────

export const getOptionFields = (templateId: string): OptionField[] => schemas[templateId] ?? [];

export const getDefaultOptions = (templateId: string): LayoutOptions =>
  Object.fromEntries(getOptionFields(templateId).map((f) => [f.key, f.default]));

/**
 * Option values end up inside generated CSS and inside the preview document,
 * and can arrive via a shared URL. Only allow characters that appear in
 * ordinary CSS lengths, colours and calc() expressions.
 */
const SAFE_VALUE = /^[\w\s%#.,()+\-*/]{1,60}$/;

export const isSafeValue = (value: string): boolean => SAFE_VALUE.test(value);

/** Build the options object for a template from raw values (e.g. URL params). */
export const resolveOptions = (
  templateId: string,
  read: (key: string) => string | null | undefined,
): LayoutOptions => {
  const result: LayoutOptions = {};
  for (const field of getOptionFields(templateId)) {
    const raw = read(field.key);
    result[field.key] = raw != null && isSafeValue(raw) ? raw : field.default;
  }
  return result;
};

export const formatRangeValue = (n: number, unit: RangeField['unit']): string =>
  n === 0 ? '0' : `${Number(n.toFixed(3))}${unit}`;

export const parseRangeValue = (value: string, fallback: number): number => {
  const n = parseFloat(value);
  return Number.isFinite(n) ? n : fallback;
};

/** <input type="color"> only understands #rrggbb. */
export const toHexColor = (value: string): string => {
  const v = value.trim().toLowerCase();
  if (v === 'white') return '#ffffff';
  if (v === 'black') return '#000000';
  if (/^#[0-9a-f]{6}$/.test(v)) return v;
  if (/^#[0-9a-f]{3}$/.test(v)) return `#${v[1]}${v[1]}${v[2]}${v[2]}${v[3]}${v[3]}`;
  return '#ffffff';
};
