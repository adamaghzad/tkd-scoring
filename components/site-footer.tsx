'use client';

import Link from 'next/link';
import { ArrowUpRight, Mail, MessageCircle } from 'lucide-react';
import { Brand } from './brand';
import { useLanguage } from '@/lib/i18n';
import { appUrl, salesEmail, whatsappUrl } from '@/lib/site';

export function SiteFooter() {
  const { lang } = useLanguage();
  const fr = lang === 'fr';
  return <footer className="border-t border-white/10 bg-[#05070b]">
    <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.3fr_.7fr_.8fr] lg:px-12 lg:py-20">
      <div>
        <Brand footer />
        <p className="mt-6 max-w-md text-sm leading-7 text-white/50">{fr ? 'Gestion de tournois, scoring local et affichage en direct depuis un ordinateur Windows et des appareils ordinaires.' : 'Tournament management, local scoring and live displays from one Windows computer and ordinary devices.'}</p>
        <p className="mt-5 text-[10px] uppercase tracking-[.18em] text-white/30">Original software by Adam Aghzaf · 2026</p>
      </div>
      <div>
        <p className="footer-label">{fr ? 'Explorer' : 'Explore'}</p>
        <div className="mt-5 grid gap-3 text-sm text-white/60">
          <Link className="hover:text-white" href="/">{fr ? 'Le produit' : 'Product'}</Link>
          <Link className="hover:text-white" href="/guide/">{fr ? 'Guide complet' : 'Complete guide'}</Link>
          <Link className="hover:text-white" href="/subscription/">{fr ? 'Tarifs en MAD' : 'Pricing in MAD'}</Link>
          <a className="inline-flex items-center gap-2 hover:text-white" href={appUrl}>{fr ? 'Application cloud' : 'Cloud application'}<ArrowUpRight className="size-3" /></a>
        </div>
      </div>
      <div>
        <p className="footer-label">{fr ? 'Parlons de votre club' : 'Let’s talk about your club'}</p>
        <div className="mt-5 grid gap-3 text-sm">
          <a className="footer-contact" href={`mailto:${salesEmail}`}><Mail className="size-4" />{salesEmail}</a>
          <a className="footer-contact" href={whatsappUrl(fr ? 'Bonjour, je souhaite découvrir TKD Scoring.' : 'Hello, I would like to discover TKD Scoring.')} target="_blank" rel="noreferrer"><MessageCircle className="size-4" />WhatsApp</a>
        </div>
      </div>
    </div>
    <div className="border-t border-white/[.07] px-5 py-6 text-center text-[10px] leading-5 text-white/30">
      {fr ? 'Logiciel indépendant. Aucune affiliation ou certification WT, KPNP ou Daedo. Le scoring PSS par capteurs n’est pas inclus.' : 'Independent software. No WT, KPNP or Daedo affiliation or certification. Sensor-based PSS scoring is not included.'}
    </div>
  </footer>;
}
