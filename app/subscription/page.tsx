import type { Metadata } from 'next';
import { Suspense } from 'react';
import { SubscriptionContent } from '@/components/subscription-content';
export const metadata: Metadata = { title: 'Club subscriptions in MAD', description: 'Founding Club, standard Club and tournament-support options in Moroccan dirhams. Request your plan by WhatsApp or email.' };
export default function SubscriptionPage() { return <Suspense fallback={<div className="mx-auto min-h-screen max-w-4xl px-6 py-32 text-white/50">Loading subscription options…</div>}><SubscriptionContent /></Suspense>; }
