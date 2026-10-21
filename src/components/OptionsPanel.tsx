import React, { useEffect, useState } from 'react';
import { RotateCcw, SlidersHorizontal } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import {
  OptionField,
  LayoutOptions,
  RangeField,
  TextField,
  ColorField,
  formatRangeValue,
  parseRangeValue,
  isSafeValue,
  toHexColor,
} from '../utils/layoutOptions';

interface OptionsPanelProps {
  fields: OptionField[];
  values: LayoutOptions;
  defaults: LayoutOptions;
  onChange: (key: string, value: string) => void;
  onReset: () => void;
}

const FieldShell: React.FC<{
  id: string;
  label: string;
  value?: string;
  hint?: string;
  children: React.ReactNode;
}> = ({ id, label, value, hint, children }) => (
  <div className="space-y-2">
    <div className="flex items-baseline justify-between gap-3">
      <label htmlFor={id} className="text-sm font-medium text-charcoal-900">
        {label}
      </label>
      {value !== undefined && (
        <span className="font-mono text-xs text-charcoal-500 tabular-nums">{value}</span>
      )}
    </div>
    {children}
    {hint && <p className="text-xs text-charcoal-500">{hint}</p>}
  </div>
);

const RangeOption: React.FC<{
  field: RangeField;
  value: string;
  onChange: OptionsPanelProps['onChange'];
}> = ({ field, value, onChange }) => {
  const n = parseRangeValue(value, parseRangeValue(field.default, field.min));
  const clamped = Math.min(field.max, Math.max(field.min, n));
  return (
    <FieldShell id={`opt-${field.key}`} label={field.label} value={value} hint={field.hint}>
      <Slider
        id={`opt-${field.key}`}
        min={field.min}
        max={field.max}
        step={field.step}
        value={[clamped]}
        onValueChange={([v]) => onChange(field.key, formatRangeValue(v, field.unit))}
      />
    </FieldShell>
  );
};

const TextOption: React.FC<{
  field: TextField;
  value: string;
  onChange: OptionsPanelProps['onChange'];
}> = ({ field, value, onChange }) => {
  const [draft, setDraft] = useState(value);
  useEffect(() => setDraft(value), [value]);
  const invalid = draft !== '' && !isSafeValue(draft);

  return (
    <FieldShell id={`opt-${field.key}`} label={field.label} hint={field.hint}>
      <Input
        id={`opt-${field.key}`}
        value={draft}
        placeholder={field.placeholder}
        spellCheck={false}
        aria-invalid={invalid}
        className="h-9 border-sand-300 bg-white font-mono text-xs aria-[invalid=true]:border-destructive"
        onChange={(e) => {
          setDraft(e.target.value);
          if (isSafeValue(e.target.value)) onChange(field.key, e.target.value);
        }}
        onBlur={() => {
          if (draft === '' || invalid) setDraft(value);
        }}
      />
    </FieldShell>
  );
};

const ColorOption: React.FC<{
  field: ColorField;
  value: string;
  onChange: OptionsPanelProps['onChange'];
}> = ({ field, value, onChange }) => (
  <FieldShell id={`opt-${field.key}`} label={field.label} value={value}>
    <input
      id={`opt-${field.key}`}
      type="color"
      value={toHexColor(value)}
      onChange={(e) => onChange(field.key, e.target.value)}
      className="h-9 w-full cursor-pointer rounded-md border border-sand-300 bg-white p-1"
    />
  </FieldShell>
);

const OptionsPanel: React.FC<OptionsPanelProps> = ({ fields, values, defaults, onChange, onReset }) => {
  const modified = fields.some((f) => values[f.key] !== defaults[f.key]);

  return (
    <section
      aria-label="Customize layout"
      className="overflow-hidden rounded-xl border border-sand-200 bg-white shadow-subtle"
    >
      <div className="flex items-center justify-between border-b border-sand-200 px-4 py-3">
        <h3 className="flex items-center gap-2 text-sm font-medium text-charcoal-950">
          <SlidersHorizontal className="h-4 w-4 text-charcoal-500" aria-hidden />
          Customize
        </h3>
        <button
          type="button"
          onClick={onReset}
          disabled={!modified}
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs text-charcoal-600 transition-all-200 hover:bg-sand-100 hover:text-charcoal-950 disabled:pointer-events-none disabled:opacity-40"
        >
          <RotateCcw className="h-3 w-3" aria-hidden />
          Reset
        </button>
      </div>

      {fields.length === 0 ? (
        <p className="px-4 py-5 text-sm text-charcoal-600">
          Nothing to tune here — this layout is already as simple as it gets.
        </p>
      ) : (
        <div className="grid gap-5 p-4 sm:grid-cols-2">
          {fields.map((field) => {
            const value = values[field.key] ?? field.default;
            if (field.kind === 'range') {
              return <RangeOption key={field.key} field={field} value={value} onChange={onChange} />;
            }
            if (field.kind === 'color') {
              return <ColorOption key={field.key} field={field} value={value} onChange={onChange} />;
            }
            return <TextOption key={field.key} field={field} value={value} onChange={onChange} />;
          })}
        </div>
      )}
    </section>
  );
};

export default OptionsPanel;
