import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const REPO_URL = 'https://github.com/PsyGioX/easy-layout-gen';

const Logo = () => (
  <svg viewBox="0 0 64 64" className="h-8 w-8" aria-hidden>
    <rect width="64" height="64" rx="14" className="fill-charcoal-950" />
    <rect x="12" y="12" width="40" height="11" rx="3" className="fill-sand-50" />
    <rect x="12" y="29" width="16" height="23" rx="3" className="fill-sand-300" />
    <rect x="34" y="29" width="18" height="10" rx="3" className="fill-sand-300" />
    <rect x="34" y="42" width="18" height="10" rx="3" className="fill-sand-500" />
  </svg>
);

const Step: React.FC<{ n: number; title: string; children: React.ReactNode }> = ({ n, title, children }) => (
  <li className="flex gap-3">
    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sand-200 text-xs font-medium text-charcoal-800">
      {n}
    </span>
    <div>
      <p className="font-medium text-charcoal-950">{title}</p>
      <p className="text-sm leading-relaxed text-charcoal-600">{children}</p>
    </div>
  </li>
);

const HelpDialog = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline" size="sm" className="gap-2 rounded-full border-sand-300 bg-white">
        <BookOpen className="h-4 w-4" aria-hidden />
        <span className="hidden sm:inline">How it works</span>
        <span className="sm:hidden">Help</span>
      </Button>
    </DialogTrigger>
    <DialogContent className="max-w-lg bg-sand-50">
      <DialogHeader>
        <DialogTitle>How it works</DialogTitle>
        <DialogDescription>Three steps from idea to working layout.</DialogDescription>
      </DialogHeader>
      <ol className="space-y-4">
        <Step n={1} title="Pick a template">
          Browse Grid, Flexbox and modal layouts, or press <kbd className="rounded border border-sand-300 bg-white px-1 font-mono text-xs">/</kbd> to search.
        </Step>
        <Step n={2} title="Tune it">
          Use the controls to change gaps, widths and colours. The preview updates instantly — switch between
          desktop, tablet and mobile widths to check responsive behaviour.
        </Step>
        <Step n={3} title="Copy the code">
          Copy the CSS or HTML, grab a complete page, or download it as a file. It&rsquo;s plain CSS with no
          dependencies.
        </Step>
      </ol>
      <p className="rounded-lg bg-sand-100 px-3 py-2 text-sm text-charcoal-700">
        <strong className="font-medium">Tip:</strong> the page address always reflects your template and settings,
        so you can bookmark or share a link to exactly what you see.
      </p>
    </DialogContent>
  </Dialog>
);

const Header = () => (
  <header className="sticky top-0 z-40 border-b border-sand-200/80 bg-sand-50/80 backdrop-blur-md">
    <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between px-4 sm:px-6">
      <Link to="/" className="flex items-center gap-3 rounded-md" aria-label="Layout Generator — home">
        <Logo />
        <h1 className="text-lg font-semibold tracking-tight text-charcoal-950">Layout Generator</h1>
      </Link>

      <div className="flex items-center gap-2">
        <HelpDialog />
        <Button
          asChild
          variant="outline"
          size="icon"
          className="h-9 w-9 rounded-full border-sand-300 bg-white"
        >
          <a href={REPO_URL} target="_blank" rel="noopener noreferrer" aria-label="View source on GitHub">
            <Github className="h-4 w-4" aria-hidden />
          </a>
        </Button>
      </div>
    </div>
  </header>
);

export default Header;
