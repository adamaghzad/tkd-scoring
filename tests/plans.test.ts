import { describe, expect, it } from 'vitest';
import { periodFor, priceFor, requestMessage, type RequestDetails } from '../lib/plans';
import { emailUrl, whatsappUrl } from '../lib/site';

const details: RequestDetails = { club: 'Atlas & Friends', name: 'Adam', email: 'coach@example.com', phone: '+212 600000000', plan: 'founding', billing: 'annual' };

describe('subscription pricing and request delivery', () => {
  it('applies two months free to annual club plans', () => {
    expect(priceFor('founding', 'annual')).toBe(99 * 10);
    expect(priceFor('club', 'annual')).toBe(199 * 10);
    expect(periodFor('club', 'annual', 'fr')).toBe('/ an');
  });
  it('keeps event support as a per-event price', () => {
    expect(priceFor('event', 'monthly')).toBe(500);
    expect(priceFor('event', 'annual')).toBe(500);
    expect(periodFor('event', 'annual', 'en')).toBe('/ event');
  });
  it('builds a bilingual request with the selected price and club', () => {
    expect(requestMessage(details, 'en')).toContain('Club: Atlas & Friends');
    expect(requestMessage(details, 'en')).toContain('Price: 990 MAD / year');
    expect(requestMessage(details, 'fr')).toContain('Formule : Club fondateur');
    expect(requestMessage(details, 'fr')).toContain('Tarif : 990 MAD / an');
  });
  it('creates real WhatsApp and email links without exposing credentials', () => {
    const whatsapp = whatsappUrl('Hello & thank you');
    const email = emailUrl('Club request', 'Line 1\nLine 2');
    expect(whatsapp).toBe('https://wa.me/212614192699?text=Hello%20%26%20thank%20you');
    expect(email).toContain('mailto:adam.aghzaf@gmail.com');
    expect(email).toContain('Club%20request');
    expect(email).toContain('Line%201%0ALine%202');
  });
});
