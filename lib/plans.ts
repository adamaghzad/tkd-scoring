import type { Language } from './i18n';

export type PlanId = 'founding' | 'club' | 'event';
export type Billing = 'monthly' | 'annual';

export const plans = {
  founding: {
    monthly: 99,
    annual: 990,
    name: { en: 'Founding Club', fr: 'Club fondateur' },
    note: { en: 'First 10 clubs · price fixed for 12 months', fr: '10 premiers clubs · prix fixe pendant 12 mois' },
  },
  club: {
    monthly: 199,
    annual: 1990,
    name: { en: 'Club', fr: 'Club' },
    note: { en: 'For growing clubs and regular training events', fr: 'Pour les clubs et les événements réguliers' },
  },
  event: {
    monthly: 500,
    annual: 500,
    name: { en: 'Tournament Support', fr: 'Assistance tournoi' },
    note: { en: 'One event · setup, rehearsal and remote support', fr: 'Un événement · installation, répétition et assistance' },
  },
} as const;

export function priceFor(plan: PlanId, billing: Billing) {
  return plans[plan][billing];
}

export function periodFor(plan: PlanId, billing: Billing, lang: Language) {
  if (plan === 'event') return lang === 'fr' ? '/ événement' : '/ event';
  if (billing === 'annual') return lang === 'fr' ? '/ an' : '/ year';
  return lang === 'fr' ? '/ mois' : '/ month';
}

export interface RequestDetails {
  club: string;
  name: string;
  email: string;
  phone: string;
  plan: PlanId;
  billing: Billing;
}

export function requestMessage(details: RequestDetails, lang: Language) {
  const price = priceFor(details.plan, details.billing);
  const period = periodFor(details.plan, details.billing, lang);
  if (lang === 'fr') {
    return [
      'Bonjour, je souhaite souscrire à TKD Scoring.',
      '',
      `Club : ${details.club}`,
      `Contact : ${details.name}`,
      `E-mail : ${details.email}`,
      `Téléphone : ${details.phone}`,
      `Formule : ${plans[details.plan].name.fr}`,
      `Tarif : ${price} MAD ${period}`,
      '',
      'Merci de me contacter pour la suite.',
    ].join('\n');
  }
  return [
    'Hello, I would like to subscribe to TKD Scoring.',
    '',
    `Club: ${details.club}`,
    `Contact: ${details.name}`,
    `Email: ${details.email}`,
    `Phone: ${details.phone}`,
    `Plan: ${plans[details.plan].name.en}`,
    `Price: ${price} MAD ${period}`,
    '',
    'Please contact me with the next steps.',
  ].join('\n');
}
