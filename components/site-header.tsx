'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Brand } from './brand';
import { useLanguage } from '@/lib/i18n';
import { downloadUrl } from '@/lib/site';

const copy = {
  en: { product: 'Product', guide: 'Guide', pricing: 'Subscription', download: 'Download', open: 'Open navigation', close: 'Close navigation' },
  fr: { product: 'Produit', guide: 'Guide', pricing: 'Abonnement', download: 'Télécharger', open: 'Ouvrir la navigation', close: 'Fermer la navigation' },
};

export function SiteHeader() {
  const { lang, setLang } = useLanguage();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const c = copy[lang];
  const links = [
    { href: '/', label: c.product },
    { href: '/guide/', label: c.guide },
    { href: '/subscription/', label: c.pricing },
  ];
  return <header className="site-header">
    <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
      <Brand />
      <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
        {links.map((link) => <Link key={link.href} href={link.href} className={`nav-link ${pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href)) ? 'nav-link-active' : ''}`}>{link.label}</Link>)}
      </nav>
      <div className="flex items-center gap-2">
        <div className="language-switch" aria-label="Language">
          <button type="button" onClick={() => setLang('en')} className={lang === 'en' ? 'active' : ''} aria-pressed={lang === 'en'}>EN</button>
          <button type="button" onClick={() => setLang('fr')} className={lang === 'fr' ? 'active' : ''} aria-pressed={lang === 'fr'}>FR</button>
        </div>
        <a href={downloadUrl} className="button-primary hidden !min-h-10 !px-4 !text-[11px] sm:inline-flex">{c.download}<ArrowUpRight className="size-3.5" /></a>
        <button type="button" className="icon-button lg:hidden" aria-label={open ? c.close : c.open} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
    </div>
    {open && <nav className="mobile-nav lg:hidden" aria-label="Mobile navigation">
      {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className={pathname === link.href ? 'active' : ''}>{link.label}<ArrowUpRight className="size-4" /></Link>)}
      <a href={downloadUrl} className="button-primary mt-3">{c.download}<ArrowUpRight className="size-4" /></a>
    </nav>}
  </header>;
}
