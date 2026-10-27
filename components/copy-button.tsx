'use client';

import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/lib/i18n';

export function CopyButton({ value, label }: { value: string; label?: string }) {
  const { lang } = useLanguage();
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };
  return <button type="button" className="copy-button" onClick={copy} aria-label={`${lang === 'fr' ? 'Copier' : 'Copy'}: ${value}`}>
    {copied ? <Check className="size-3.5 text-lime" /> : <Copy className="size-3.5" />}
    {copied ? (lang === 'fr' ? 'Copié' : 'Copied') : (label ?? (lang === 'fr' ? 'Copier' : 'Copy'))}
  </button>;
}
