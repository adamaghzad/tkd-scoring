import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { LanguageProvider } from '@/lib/i18n';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { PwaRegistration } from '@/components/pwa-registration';
import { siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'TKD Scoring — Every point. One source of truth.', template: '%s · TKD Scoring' },
  description: 'Complete taekwondo tournament management, local live judging, scoreboards and results from one Windows laptop—with or without Internet.',
  keywords: ['taekwondo scoring', 'tournament management', 'offline scoring', 'TKD Scoring', 'Morocco', 'scoring taekwondo'],
  applicationName: 'TKD Scoring',
  authors: [{ name: 'Adam Aghzaf' }],
  creator: 'TKDTech Sports Management',
  manifest: process.env.NODE_ENV === 'production' ? '/tkd-scoring/manifest.webmanifest' : '/manifest.webmanifest',
  openGraph: {
    type: 'website', url: siteUrl, siteName: 'TKD Scoring', title: 'TKD Scoring — Complete tournament control',
    description: 'One laptop. Your devices. A complete taekwondo tournament—even without venue Internet.',
    images: [{ url: `${siteUrl}/assets/public-scoreboard.webp`, width: 1920, height: 1080, alt: 'TKD Scoring live match display' }],
  },
  twitter: { card: 'summary_large_image', title: 'TKD Scoring', description: 'Complete local-first taekwondo tournament control.', images: [`${siteUrl}/assets/public-scoreboard.webp`] },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#07090f', colorScheme: 'dark' };

const structuredData = {
  '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'TKD Scoring', applicationCategory: 'SportsApplication',
  operatingSystem: 'Windows 10, Windows 11', description: 'Local-first taekwondo tournament management and software-based live judging.',
  author: { '@type': 'Person', name: 'Adam Aghzaf' }, offers: [{ '@type': 'Offer', price: '99', priceCurrency: 'MAD', description: 'Founding Club monthly subscription' }, { '@type': 'Offer', price: '199', priceCurrency: 'MAD', description: 'Club monthly subscription' }],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en" suppressHydrationWarning><body>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <LanguageProvider><a className="skip-link" href="#main-content">Skip to content</a><SiteHeader /><div className="h-[76px]" /><div id="main-content">{children}</div><SiteFooter /><PwaRegistration /></LanguageProvider>
  </body></html>;
}
