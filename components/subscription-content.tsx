'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, ArrowUpRight, BadgeCheck, CalendarCheck, Check, Download, Mail, MessageCircle, ShieldCheck, Sparkles, Users } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';
import { useLanguage } from '@/lib/i18n';
import { desktopVersion, downloadUrl, emailUrl, whatsappUrl } from '@/lib/site';
import { periodFor, plans, priceFor, requestMessage, type Billing, type PlanId, type RequestDetails } from '@/lib/plans';

const schema = z.object({
  club: z.string().trim().min(2).max(100),
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().min(6).max(30).regex(/^[+0-9 ()-]+$/),
  plan: z.enum(['founding', 'club', 'event']),
  billing: z.enum(['monthly', 'annual']),
});

const featureCopy = {
  en: {
    founding: ['One club and one scoring mat', 'Unlimited athletes and matches', 'Judge and referee devices', 'Updates and standard support'],
    club: ['Everything in Founding Club', 'Guided installation', 'One pre-event rehearsal', 'Priority support'],
    event: ['Tournament setup', 'Device and network configuration', 'One complete rehearsal', 'Remote support for the agreed event'],
  },
  fr: {
    founding: ['Un club et un tapis de scoring', 'Athlètes et matchs illimités', 'Appareils juges et arbitre', 'Mises à jour et support standard'],
    club: ['Tout le Club fondateur', 'Installation guidée', 'Une répétition avant événement', 'Support prioritaire'],
    event: ['Configuration du tournoi', 'Configuration appareils et réseau', 'Une répétition complète', 'Assistance à distance pendant l’événement convenu'],
  },
};

export function SubscriptionContent() {
  const { lang } = useLanguage();
  const params = useSearchParams();
  const requestedPlan = params.get('plan');
  const initialPlan: PlanId = requestedPlan === 'founding' || requestedPlan === 'club' || requestedPlan === 'event' ? requestedPlan : 'founding';
  const [submitted, setSubmitted] = useState<RequestDetails | null>(null);
  const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<RequestDetails>({
    resolver: zodResolver(schema),
    defaultValues: { plan: initialPlan, billing: 'monthly', club: '', name: '', email: '', phone: '' },
  });
  const selectedPlan = useWatch({ control, name: 'plan' });
  const billing = useWatch({ control, name: 'billing' });
  const fr = lang === 'fr';
  const message = submitted ? requestMessage(submitted, lang) : '';
  const features = featureCopy[lang];

  const selectPlan = (plan: PlanId) => setValue('plan', plan, { shouldValidate: true });
  const selectBilling = (value: Billing) => setValue('billing', value, { shouldValidate: true });
  const onSubmit = (values: RequestDetails) => setSubmitted(values);

  return <main>
    <section className="page-hero subscription-hero"><div className="mx-auto max-w-[1440px]"><p className="eyebrow"><span />{fr ? 'ABONNEMENTS POUR CLUBS' : 'CLUB SUBSCRIPTIONS'}</p><h1>{fr ? 'Un tarif clair. Pas de surprise par match.' : 'Clear pricing. No surprise per match.'}</h1><p>{fr ? 'Commencez avec l’offre des 10 premiers clubs ou choisissez une assistance complète pour votre prochain tournoi.' : 'Start with the first-10-clubs offer or choose complete support for your next tournament.'}</p></div></section>

    <section className="section-shell border-t border-white/[.07]" aria-labelledby="windows-download-title">
      <div className="mx-auto grid max-w-6xl items-center gap-7 rounded-3xl border border-electric/25 bg-electric/[.06] p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:p-10">
        <div><p className="eyebrow"><span />{fr ? 'INSTALLATEUR GRATUIT · ACTIVATION PAYANTE' : 'FREE INSTALLER · PAID ACTIVATION'}</p><h2 id="windows-download-title" className="mt-4 text-3xl font-semibold tracking-[-.035em] text-white sm:text-4xl">{fr ? 'Téléchargez TKD Scoring pour Windows.' : 'Download TKD Scoring for Windows.'}</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-white/55">{fr ? `Installez la v${desktopVersion}, puis ouvrez Activation pour copier le code de votre PC. Le travail de tournoi exige une licence signée, fournie après confirmation du paiement. Le scoring LAN fonctionne ensuite sans Internet.` : `Install v${desktopVersion}, then open Activation to copy your PC’s installation code. Tournament work requires a signed license, provided after payment confirmation. LAN scoring then works without Internet.`}</p></div>
        <div className="flex flex-col items-start gap-3 lg:items-end"><a data-testid="subscription-download" className="button-primary" href={downloadUrl}>{fr ? 'Télécharger pour Windows' : 'Download for Windows'}<Download className="size-4" /></a><span className="text-[10px] font-medium uppercase tracking-[.14em] text-white/35">v{desktopVersion} · Windows 10/11 x64 · ZIP</span><Link href="/guide/" className="inline-flex items-center gap-2 text-xs text-electric hover:text-white">{fr ? 'Guide d’installation et d’activation' : 'Installation and activation guide'}<ArrowUpRight className="size-3.5" /></Link></div>
      </div>
    </section>

    <section className="subscription-section">
      <div className="billing-toggle" aria-label={fr ? 'Période de facturation' : 'Billing period'}>
        <button type="button" className={billing === 'monthly' ? 'active' : ''} onClick={() => selectBilling('monthly')} aria-pressed={billing === 'monthly'}>{fr ? 'Mensuel' : 'Monthly'}</button>
        <button type="button" className={billing === 'annual' ? 'active' : ''} onClick={() => selectBilling('annual')} aria-pressed={billing === 'annual'}>{fr ? 'Annuel' : 'Annual'}<span>2 {fr ? 'mois offerts' : 'months free'}</span></button>
      </div>
      <div className="subscription-grid">
        {(['founding', 'club', 'event'] as const).map((id) => <article className={`subscription-card ${selectedPlan === id ? 'selected' : ''} ${id === 'club' ? 'recommended' : ''}`} key={id}>
          {id === 'founding' && <div className="plan-badge"><Sparkles className="size-3" />{fr ? '10 PREMIERS CLUBS' : 'FIRST 10 CLUBS'}</div>}
          {id === 'club' && <div className="plan-badge"><BadgeCheck className="size-3" />{fr ? 'ACCOMPAGNEMENT COMPLET' : 'COMPLETE SUPPORT'}</div>}
          {id === 'event' && <div className="plan-badge"><CalendarCheck className="size-3" />{fr ? 'PAR ÉVÉNEMENT' : 'PER EVENT'}</div>}
          <h2>{plans[id].name[lang]}</h2><p className="plan-note">{plans[id].note[lang]}</p>
          <div className="subscription-price"><strong>{priceFor(id, id === 'event' ? 'monthly' : billing)}</strong><span>MAD<small>{periodFor(id, billing, lang)}</small></span></div>
          {id !== 'event' && billing === 'annual' && <p className="annual-equivalent">{fr ? 'Équivalent' : 'Equivalent'} {Math.round(priceFor(id, 'annual') / 12)} MAD / {fr ? 'mois' : 'month'}</p>}
          <ul>{features[id].map((feature) => <li key={feature}><Check />{feature}</li>)}</ul>
          <button type="button" className={selectedPlan === id ? 'button-primary' : 'button-secondary'} onClick={() => selectPlan(id)} aria-pressed={selectedPlan === id}>{selectedPlan === id ? (fr ? 'Formule sélectionnée' : 'Selected plan') : (fr ? 'Choisir cette formule' : 'Choose this plan')}<ArrowRight className="size-4" /></button>
        </article>)}
      </div>
      <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-6 text-white/40">{fr ? 'Aucun paiement n’est effectué sur ce site. Envoyez une demande ; nous confirmons ensuite la disponibilité, l’installation et le moyen de paiement.' : 'No payment is taken on this website. Send a request; we then confirm availability, setup and payment method.'}</p>
    </section>

    <section className="request-section" id="request">
      <div className="request-intro"><p className="eyebrow"><span />{fr ? 'VOTRE DEMANDE' : 'YOUR REQUEST'}</p><h2>{fr ? 'Parlons de votre club.' : 'Tell us about your club.'}</h2><p>{fr ? 'Préparez votre demande en moins d’une minute. Rien n’est transmis automatiquement : choisissez ensuite WhatsApp ou e-mail.' : 'Prepare your request in under a minute. Nothing is transmitted automatically: then choose WhatsApp or email.'}</p><div className="privacy-note"><ShieldCheck className="size-5" /><p>{fr ? 'Vos informations restent dans ce navigateur jusqu’à ce que vous choisissiez un canal d’envoi.' : 'Your details stay in this browser until you choose a sending channel.'}</p></div></div>
      <form className="request-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-grid">
          <label><span>{fr ? 'Nom du club' : 'Club name'}</span><input {...register('club')} aria-label={fr ? 'Nom du club' : 'Club name'} placeholder={fr ? 'Ex. Atlas Taekwondo' : 'e.g. Atlas Taekwondo'} autoComplete="organization" />{errors.club && <small>{fr ? 'Indiquez le nom du club (2 caractères minimum).' : 'Enter the club name (at least 2 characters).'}</small>}</label>
          <label><span>{fr ? 'Votre nom' : 'Your name'}</span><input {...register('name')} aria-label={fr ? 'Votre nom' : 'Your name'} placeholder={fr ? 'Nom du responsable' : 'Contact person'} autoComplete="name" />{errors.name && <small>{fr ? 'Indiquez votre nom.' : 'Enter your name.'}</small>}</label>
          <label><span>{fr ? 'E-mail' : 'Email'}</span><input {...register('email')} aria-label={fr ? 'E-mail' : 'Email'} type="email" placeholder="club@example.com" autoComplete="email" />{errors.email && <small>{fr ? 'Indiquez un e-mail valide.' : 'Enter a valid email address.'}</small>}</label>
          <label><span>{fr ? 'Téléphone / WhatsApp' : 'Phone / WhatsApp'}</span><input {...register('phone')} aria-label={fr ? 'Téléphone / WhatsApp' : 'Phone / WhatsApp'} type="tel" placeholder="+212 6…" autoComplete="tel" />{errors.phone && <small>{fr ? 'Indiquez un numéro valide.' : 'Enter a valid phone number.'}</small>}</label>
        </div>
        <input type="hidden" {...register('plan')} /><input type="hidden" {...register('billing')} />
        <div className="selected-request-plan"><span>{fr ? 'Formule choisie' : 'Selected plan'}</span><strong>{plans[selectedPlan].name[lang]} · {priceFor(selectedPlan, billing)} MAD {periodFor(selectedPlan, billing, lang)}</strong></div>
        <button className="button-primary w-full" type="submit">{fr ? 'Préparer ma demande' : 'Prepare my request'}<ArrowRight className="size-4" /></button>
      </form>
    </section>

    {submitted && <section className="request-result" aria-live="polite">
      <div className="request-result-icon"><Check /></div><p className="eyebrow justify-center"><span />{fr ? 'DEMANDE PRÊTE' : 'REQUEST READY'}</p><h2>{fr ? 'Choisissez votre canal d’envoi.' : 'Choose how to send it.'}</h2><p>{fr ? 'Vérifiez le résumé, puis envoyez-le par WhatsApp ou e-mail. Votre demande n’a pas encore été transmise.' : 'Review the summary, then send it by WhatsApp or email. Your request has not been sent yet.'}</p>
      <pre>{message}</pre>
      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row"><a className="button-primary whatsapp-button" href={whatsappUrl(message)} target="_blank" rel="noreferrer">{fr ? 'Envoyer par WhatsApp' : 'Send with WhatsApp'}<MessageCircle className="size-4" /></a><a className="button-secondary" href={emailUrl(`TKD Scoring · ${submitted.club} · ${plans[submitted.plan].name.en}`, message)}>{fr ? 'Envoyer par e-mail' : 'Send by email'}<Mail className="size-4" /></a></div>
    </section>}

    <section className="section-shell border-t border-white/[.07]">
      <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3"><div className="subscription-assurance"><Users /><h3>{fr ? 'Sans coût par utilisateur' : 'No per-user fee'}</h3><p>{fr ? 'Pas de supplément par athlète, juge ou match.' : 'No extra charge per athlete, judge or match.'}</p></div><div className="subscription-assurance"><Download /><h3>{fr ? 'Installation simple' : 'Simple installation'}</h3><p>{fr ? 'Téléchargement gratuit ; licence payante signée après confirmation du paiement.' : 'Free download; paid signed license after payment confirmation.'}</p></div><div className="subscription-assurance"><ShieldCheck /><h3>{fr ? 'Vos données restent locales' : 'Your data stays local'}</h3><p>{fr ? 'Le mode desktop conserve le tournoi sur votre PC.' : 'Desktop mode keeps tournament data on your PC.'}</p></div></div>
      <div className="mt-12 text-center"><Link href="/guide/" className="button-secondary">{fr ? 'Lire le guide avant l’installation' : 'Read the guide before setup'}<ArrowUpRight className="size-4" /></Link></div>
    </section>
  </main>;
}
