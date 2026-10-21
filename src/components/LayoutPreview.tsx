import React, { useMemo, useState } from 'react';
import { Monitor, RotateCw, Smartphone, Tablet } from 'lucide-react';
import { buildPreviewDocument } from '../utils/previewDocument';

interface LayoutPreviewProps {
  css: string;
  html: string;
}

const VIEWPORTS = [
  { id: 'desktop', label: 'Desktop', width: '100%', Icon: Monitor },
  { id: 'tablet', label: 'Tablet (768px)', width: '768px', Icon: Tablet },
  { id: 'mobile', label: 'Mobile (375px)', width: '375px', Icon: Smartphone },
] as const;

type ViewportId = (typeof VIEWPORTS)[number]['id'];

const LayoutPreview: React.FC<LayoutPreviewProps> = ({ css, html }) => {
  const [viewport, setViewport] = useState<ViewportId>('desktop');
  // Bumping the key remounts the iframe — handy after playing with a modal.
  const [reloadKey, setReloadKey] = useState(0);

  const srcDoc = useMemo(() => buildPreviewDocument(css, html), [css, html]);
  const current = VIEWPORTS.find((v) => v.id === viewport)!;

  return (
    <section
      aria-label="Live preview"
      className="flex h-full flex-col overflow-hidden rounded-xl border border-sand-200 bg-white shadow-subtle"
    >
      <div className="flex items-center justify-between border-b border-sand-200 bg-sand-50 px-3 py-2">
        <div className="flex items-center gap-2 text-sm font-medium text-charcoal-800">
          <span className="flex gap-1" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-sand-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-sand-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-sand-300" />
          </span>
          Preview
        </div>

        <div className="flex items-center gap-1">
          <div role="group" aria-label="Preview width" className="flex rounded-full bg-sand-100 p-0.5">
            {VIEWPORTS.map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                title={label}
                aria-label={label}
                aria-pressed={viewport === id}
                onClick={() => setViewport(id)}
                className={`rounded-full p-1.5 transition-all-200 ${
                  viewport === id
                    ? 'bg-white text-charcoal-950 shadow-subtle'
                    : 'text-charcoal-500 hover:text-charcoal-950'
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden />
              </button>
            ))}
          </div>
          <button
            type="button"
            title="Reload preview"
            aria-label="Reload preview"
            onClick={() => setReloadKey((k) => k + 1)}
            className="rounded-full p-1.5 text-charcoal-500 transition-all-200 hover:bg-sand-100 hover:text-charcoal-950"
          >
            <RotateCw className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 justify-center overflow-auto bg-sand-100">
        <iframe
          key={reloadKey}
          title="Layout preview"
          srcDoc={srcDoc}
          // Scripts must run so the modal templates work. Without
          // allow-same-origin the frame stays isolated from this page.
          sandbox="allow-scripts allow-modals"
          style={{ width: current.width }}
          className={`h-full max-w-full bg-white transition-[width] duration-300 ease-out ${
            viewport === 'desktop' ? '' : 'border-x border-sand-300 shadow-elevated'
          }`}
        />
      </div>

      <div className="border-t border-sand-200 bg-sand-50 px-3 py-1.5 font-mono text-[11px] text-charcoal-500">
        {viewport === 'desktop' ? 'Fluid width' : current.width}
      </div>
    </section>
  );
};

export default LayoutPreview;
