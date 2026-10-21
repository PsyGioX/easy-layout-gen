import React, { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { CheckIcon, CopyIcon, Download, FileCode2 } from 'lucide-react';
import type { CSSLayout } from '../utils/layoutGenerators';
import { buildStandaloneDocument, joinCss } from '../utils/previewDocument';
import HighlightedCode from './HighlightedCode';

interface CodePreviewProps {
  layout: CSSLayout;
  /** Used for the document title and the downloaded file name. */
  name: string;
  slug: string;
}

type Tab = 'css' | 'html';

const CodePreview: React.FC<CodePreviewProps> = ({ layout, name, slug }) => {
  const [activeTab, setActiveTab] = useState<Tab>('css');
  const [copied, setCopied] = useState(false);

  const css = useMemo(() => joinCss(layout), [layout]);
  const html = useMemo(() => layout.html.trim(), [layout]);
  const code = activeTab === 'css' ? css : html;
  const lineCount = code.split('\n').length;

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success(`${label} copied`, { position: 'bottom-right' });
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error('Could not access the clipboard', { position: 'bottom-right' });
    }
  };

  const fullPage = () => buildStandaloneDocument(layout, name);

  const download = () => {
    const blob = new Blob([fullPage()], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${slug}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const tabClass = (tab: Tab) =>
    `relative px-4 py-2.5 text-sm font-medium transition-all-200 ${
      activeTab === tab
        ? 'text-charcoal-950 after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:rounded-full after:bg-charcoal-950'
        : 'text-charcoal-500 hover:text-charcoal-950'
    }`;

  const actionClass =
    'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs text-charcoal-600 transition-all-200 hover:bg-sand-100 hover:text-charcoal-950';

  return (
    <section
      aria-label="Generated code"
      className="flex flex-col overflow-hidden rounded-xl border border-sand-200 bg-white shadow-subtle"
    >
      <div className="flex flex-wrap items-center gap-x-2 border-b border-sand-200 pr-2">
        <div role="tablist" aria-label="Code language" className="flex">
          {(['css', 'html'] as Tab[]).map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              className={tabClass(tab)}
              onClick={() => setActiveTab(tab)}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center">
          <button type="button" className={actionClass} onClick={() => copy(fullPage(), 'Full page')}>
            <FileCode2 className="h-3.5 w-3.5" aria-hidden />
            <span className="hidden sm:inline">Copy full page</span>
          </button>
          <button type="button" className={actionClass} onClick={download}>
            <Download className="h-3.5 w-3.5" aria-hidden />
            <span className="hidden sm:inline">Download</span>
          </button>
          <button
            type="button"
            className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-charcoal-950 px-3 py-1.5 text-xs font-medium text-sand-50 transition-all-200 hover:bg-charcoal-800"
            onClick={() => copy(code, activeTab.toUpperCase())}
          >
            {copied ? <CheckIcon className="h-3.5 w-3.5" aria-hidden /> : <CopyIcon className="h-3.5 w-3.5" aria-hidden />}
            Copy {activeTab.toUpperCase()}
          </button>
        </div>
      </div>

      <div
        role="tabpanel"
        tabIndex={0}
        className="scrollbar-slim max-h-[520px] min-h-[200px] overflow-auto bg-charcoal-950 p-4 font-mono text-[13px] leading-relaxed text-sand-100"
      >
        <pre className="whitespace-pre-wrap break-words">
          <HighlightedCode code={code} language={activeTab} />
        </pre>
      </div>

      <div className="flex items-center justify-between border-t border-charcoal-800 bg-charcoal-950 px-4 py-1.5 font-mono text-[11px] text-charcoal-400">
        <span>{activeTab === 'css' ? 'style.css' : 'index.html'}</span>
        <span>{lineCount} lines</span>
      </div>
    </section>
  );
};

export default CodePreview;
