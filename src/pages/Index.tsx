import React, { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { ArrowLeft, Link2 } from 'lucide-react';
import Header from '../components/Header';
import TemplateSelector from '../components/TemplateSelector';
import CodePreview from '../components/CodePreview';
import LayoutPreview from '../components/LayoutPreview';
import OptionsPanel from '../components/OptionsPanel';
import { getLayoutCode, layoutTemplates, LayoutTemplate } from '../utils/layoutGenerators';
import { getDefaultOptions, getOptionFields, resolveOptions } from '../utils/layoutOptions';
import { joinCss } from '../utils/previewDocument';

const APP_TITLE = 'Easy Layout Generator';

const TYPE_LABELS: Record<LayoutTemplate['type'], string> = {
  grid: 'Grid',
  flexbox: 'Flexbox',
  modal: 'Modal',
};

/**
 * The URL is the single source of truth:
 *   /                          → template gallery
 *   /?t=holy-grail             → editor with default options
 *   /?t=holy-grail&gap=2rem    → editor, `gap` changed from its default
 * Only values that differ from the default are stored, so links stay short.
 */
const Index = () => {
  const [params, setParams] = useSearchParams();

  const template = useMemo(
    () => layoutTemplates.find((t) => t.id === params.get('t')) ?? null,
    [params],
  );

  const fields = useMemo(() => (template ? getOptionFields(template.id) : []), [template]);
  const defaults = useMemo(() => (template ? getDefaultOptions(template.id) : {}), [template]);
  const options = useMemo(
    () => (template ? resolveOptions(template.id, (key) => params.get(key)) : {}),
    [template, params],
  );
  const layout = useMemo(
    () => (template ? getLayoutCode(template.id, template.type, options) : null),
    [template, options],
  );

  useEffect(() => {
    document.title = template ? `${template.name} — ${APP_TITLE}` : `${APP_TITLE} — CSS Grid, Flexbox & modal templates`;
  }, [template]);

  const selectTemplate = (next: LayoutTemplate) => {
    setParams({ t: next.id });
    window.scrollTo({ top: 0 });
  };

  const backToGallery = () => setParams({});

  const changeOption = (key: string, value: string) => {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value === defaults[key]) next.delete(key);
        else next.set(key, value);
        return next;
      },
      { replace: true }, // dragging a slider must not flood the history
    );
  };

  const resetOptions = () => {
    if (template) setParams({ t: template.id }, { replace: true });
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied', { position: 'bottom-right' });
    } catch {
      toast.error('Could not access the clipboard', { position: 'bottom-right' });
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-sand-50">
      <Header />

      <main className="flex-1">
        {!template || !layout ? (
          <TemplateSelector onSelectTemplate={selectTemplate} />
        ) : (
          <motion.div
            key={template.id}
            className="mx-auto w-full max-w-[1400px] px-4 pb-16 pt-6 sm:px-6"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button
              type="button"
              onClick={backToGallery}
              className="mb-5 inline-flex items-center gap-1.5 rounded-full py-1 pr-3 text-sm text-charcoal-600 transition-all-200 hover:text-charcoal-950"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              All templates
            </button>

            <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-medium text-charcoal-950 sm:text-3xl">{template.name}</h2>
                  <span className="rounded-full border border-sand-300 bg-white px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-charcoal-600">
                    {TYPE_LABELS[template.type]}
                  </span>
                </div>
                <p className="mt-1.5 text-charcoal-600">{template.description}</p>
              </div>
              <button
                type="button"
                onClick={copyLink}
                className="inline-flex items-center gap-2 rounded-full border border-sand-300 bg-white px-4 py-2 text-sm text-charcoal-800 transition-all-200 hover:bg-sand-100"
              >
                <Link2 className="h-4 w-4" aria-hidden />
                Copy link
              </button>
            </div>

            <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
              <div className="order-2 space-y-6 lg:order-1">
                <OptionsPanel
                  fields={fields}
                  values={options}
                  defaults={defaults}
                  onChange={changeOption}
                  onReset={resetOptions}
                />
                <CodePreview layout={layout} name={template.name} slug={template.id} />
              </div>

              <div className="order-1 h-[420px] sm:h-[540px] lg:sticky lg:top-24 lg:order-2 lg:h-[calc(100vh-8rem)] lg:max-h-[760px]">
                <LayoutPreview css={joinCss(layout)} html={layout.html.trim()} />
              </div>
            </div>
          </motion.div>
        )}
      </main>

      <footer className="border-t border-sand-200 py-6 text-center text-xs text-charcoal-500">
        Plain CSS, no lock-in ·{' '}
        <a
          href="https://github.com/PsyGioX/easy-layout-gen"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-charcoal-950"
        >
          Source on GitHub
        </a>
      </footer>
    </div>
  );
};

export default Index;
