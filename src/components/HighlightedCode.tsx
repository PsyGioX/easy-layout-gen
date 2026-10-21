import React from 'react';

type Language = 'css' | 'html';

interface HighlightedCodeProps {
  code: string;
  language: Language;
}

// Colours chosen for the dark charcoal code panel.
const cls = {
  comment: 'text-charcoal-400 italic',
  string: 'text-[#b8d4a0]',
  number: 'text-[#e6a785]',
  selector: 'text-[#e8c27a]',
  property: 'text-[#8fc9bb]',
  atRule: 'text-[#c9a6e0]',
  func: 'text-[#9db8e8]',
  punct: 'text-charcoal-300',
};

const CSS_TOKEN =
  /(\/\*[\s\S]*?\*\/)|("[^"\n]*"|'[^'\n]*')|(@[\w-]+)|(#[0-9a-fA-F]{3,8}\b)|(\b\d*\.?\d+(?:px|rem|em|%|vh|vw|fr|s|ms|deg)?)|([\w-]+)(?=\s*:(?!:))|([.#][\w-]+|[\w-]+(?=\s*[{,]))|(\b[\w-]+(?=\())/g;

const HTML_TOKEN =
  /(<!--[\s\S]*?-->)|(<\/?)([\w-]+)|(\/?>)|(\s)([\w:@-]+)(?==)|("[^"\n]*")/g;

const renderCss = (code: string): React.ReactNode[] => {
  const out: React.ReactNode[] = [];
  let last = 0;
  let key = 0;
  for (const m of code.matchAll(CSS_TOKEN)) {
    const start = m.index ?? 0;
    if (start > last) out.push(code.slice(last, start));
    const [text, comment, str, atRule, hex, num, prop, selector, func] = m;
    const className = comment ? cls.comment
      : str ? cls.string
      : atRule ? cls.atRule
      : hex ? cls.number
      : num ? cls.number
      : prop ? cls.property
      : selector ? cls.selector
      : func ? cls.func
      : undefined;
    out.push(<span key={key++} className={className}>{text}</span>);
    last = start + text.length;
  }
  if (last < code.length) out.push(code.slice(last));
  return out;
};

const renderHtml = (code: string): React.ReactNode[] => {
  const out: React.ReactNode[] = [];
  let last = 0;
  let key = 0;
  for (const m of code.matchAll(HTML_TOKEN)) {
    const start = m.index ?? 0;
    if (start > last) out.push(code.slice(last, start));
    const [text, comment, open, tag, close, space, attr, str] = m;
    if (comment) {
      out.push(<span key={key++} className={cls.comment}>{text}</span>);
    } else if (open) {
      out.push(
        <span key={key++}>
          <span className={cls.punct}>{open}</span>
          <span className={cls.selector}>{tag}</span>
        </span>,
      );
    } else if (close) {
      out.push(<span key={key++} className={cls.punct}>{text}</span>);
    } else if (attr) {
      out.push(
        <span key={key++}>
          {space}
          <span className={cls.property}>{attr}</span>
        </span>,
      );
    } else if (str) {
      out.push(<span key={key++} className={cls.string}>{text}</span>);
    }
    last = start + text.length;
  }
  if (last < code.length) out.push(code.slice(last));
  return out;
};

/** Lightweight, dependency-free syntax highlighting. React escapes all text. */
const HighlightedCode: React.FC<HighlightedCodeProps> = ({ code, language }) => (
  <code className="font-mono">{language === 'css' ? renderCss(code) : renderHtml(code)}</code>
);

export default HighlightedCode;
