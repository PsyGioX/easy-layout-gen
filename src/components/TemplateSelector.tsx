import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { layoutTemplates, LayoutTemplate } from '../utils/layoutGenerators';

type Category = 'all' | LayoutTemplate['type'];

const CATEGORIES: { id: Category; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'grid', label: 'Grid' },
  { id: 'flexbox', label: 'Flexbox' },
  { id: 'modal', label: 'Modals' },
];

const GROUP_LABELS: Record<LayoutTemplate['type'], string> = {
  grid: 'Grid',
  flexbox: 'Flexbox',
  modal: 'Modal & dialog',
};

export interface TemplateCardProps {
  template: LayoutTemplate;
  isSelected?: boolean;
  onSelect: () => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ template, isSelected = false, onSelect }) => (
  <motion.button
    type="button"
    whileHover={{ y: -3 }}
    whileTap={{ scale: 0.985 }}
    onClick={onSelect}
    aria-pressed={isSelected}
    className={`group flex flex-col overflow-hidden rounded-xl border bg-white text-left transition-all-200 ${
      isSelected
        ? 'border-charcoal-950 shadow-elevated ring-2 ring-charcoal-950/20'
        : 'border-sand-200 shadow-subtle hover:border-sand-400 hover:shadow-elevated'
    }`}
  >
    <div className="p-3" aria-hidden>
      <div className="flex aspect-[4/3] w-full items-center justify-center rounded-lg bg-sand-100 p-4 transition-all-200 group-hover:bg-sand-200/70">
        <div className="h-full w-full">{template.previewComponent}</div>
      </div>
    </div>
    <div className="border-t border-sand-200 px-4 py-3">
      <h3 className="font-medium text-charcoal-950">{template.name}</h3>
      <p className="mt-1 text-xs leading-relaxed text-charcoal-600">{template.description}</p>
    </div>
  </motion.button>
);

interface TemplateSelectorProps {
  selectedTemplate?: LayoutTemplate | null;
  onSelectTemplate: (template: LayoutTemplate) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ selectedTemplate = null, onSelectTemplate }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Category>('all');
  const searchRef = useRef<HTMLInputElement>(null);

  // "/" jumps to search, like on GitHub and MDN.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);
      if (e.key === '/' && !typing && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const counts = useMemo(() => {
    const c: Record<Category, number> = { all: layoutTemplates.length, grid: 0, flexbox: 0, modal: 0 };
    layoutTemplates.forEach((t) => (c[t.type] += 1));
    return c;
  }, []);

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matches = layoutTemplates.filter(
      (t) =>
        (category === 'all' || t.type === category) &&
        (!q || `${t.name} ${t.description} ${t.type}`.toLowerCase().includes(q)),
    );
    return (['grid', 'flexbox', 'modal'] as const)
      .map((type) => ({ type, items: matches.filter((t) => t.type === type) }))
      .filter((g) => g.items.length > 0);
  }, [query, category]);

  const total = groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 pb-16 pt-10 sm:px-6">
      <div className="mb-10 max-w-2xl animate-fade-in">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-sand-700">CSS layout generator</p>
        <h2 className="text-3xl font-medium text-charcoal-950 sm:text-4xl">
          Pick a layout. Tune it. Copy clean code.
        </h2>
        <p className="mt-3 text-base leading-relaxed text-charcoal-600">
          Plain CSS Grid and Flexbox — no framework, no lock-in. Choose a template, adjust it with live
          controls, and paste the result anywhere.
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div role="group" aria-label="Filter by type" className="flex flex-wrap gap-2">
          {CATEGORIES.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              aria-pressed={category === id}
              onClick={() => setCategory(id)}
              className={`rounded-full px-4 py-1.5 text-sm transition-all-200 ${
                category === id
                  ? 'bg-charcoal-950 text-sand-50'
                  : 'bg-sand-100 text-charcoal-700 hover:bg-sand-200'
              }`}
            >
              {label}
              <span className={`ml-1.5 text-xs ${category === id ? 'text-charcoal-300' : 'text-charcoal-400'}`}>
                {counts[id]}
              </span>
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400" aria-hidden />
          <input
            ref={searchRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search layouts"
            aria-label="Search layouts"
            className="h-10 w-full rounded-full border border-sand-200 bg-white pl-9 pr-16 text-sm text-charcoal-950 placeholder:text-charcoal-400 focus:border-charcoal-400"
          />
          {query ? (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-charcoal-400 hover:text-charcoal-950"
            >
              <X className="h-3.5 w-3.5" aria-hidden />
            </button>
          ) : (
            <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded border border-sand-300 bg-sand-50 px-1.5 font-mono text-[10px] text-charcoal-500">
              /
            </kbd>
          )}
        </div>
      </div>

      {total === 0 ? (
        <div className="rounded-xl border border-dashed border-sand-300 bg-white/60 px-6 py-16 text-center">
          <p className="font-medium text-charcoal-900">No layouts match “{query}”</p>
          <p className="mt-1 text-sm text-charcoal-600">Try “grid”, “modal” or “sidebar”.</p>
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setCategory('all');
            }}
            className="mt-4 rounded-full bg-sand-200 px-4 py-2 text-sm text-charcoal-800 hover:bg-sand-300"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="space-y-10">
          {groups.map(({ type, items }) => (
            <section key={type} aria-label={GROUP_LABELS[type]}>
              {groups.length > 1 && (
                <h3 className="mb-3 ml-1 text-xs font-medium uppercase tracking-wider text-charcoal-600">
                  {GROUP_LABELS[type]}
                </h3>
              )}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {items.map((template) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    isSelected={selectedTemplate?.id === template.id}
                    onSelect={() => onSelectTemplate(template)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;
