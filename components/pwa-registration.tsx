'use client';

import { useEffect } from 'react';

export function PwaRegistration() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/tkd-scoring/sw.js').catch(() => undefined);
    }
  }, []);
  return null;
}
