'use client';

import { Activity, ChevronRight, Radio, ShieldCheck, WifiOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/lib/i18n';

const frames = [
  { blue: '05', red: '02', time: '1:24', event: 'BLUE · HEAD KICK · +3', judges: ['J1', 'J2', 'J3'] },
  { blue: '06', red: '02', time: '1:21', event: 'BLUE · PUNCH · +1', judges: ['J1', 'J2'] },
  { blue: '06', red: '04', time: '1:18', event: 'RED · BODY KICK · +2', judges: ['J1', 'J3'] },
];

export function ScorePreview() {
  const { lang } = useLanguage();
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setFrame((current) => (current + 1) % frames.length), 3600);
    return () => window.clearInterval(timer);
  }, []);
  const current = frames[frame]!;
  return <div className="hero-product-wrap">
    <div className="floating-chip floating-chip-top"><WifiOff className="size-3.5" />{lang === 'fr' ? '100% local au gymnase' : '100% local at the venue'}</div>
    <div className="score-preview" aria-label={lang === 'fr' ? 'Aperçu animé du tableau de score' : 'Animated scoreboard preview'}>
      <div className="score-preview-top">
        <div className="flex items-center gap-2"><span className="live-dot" />{lang === 'fr' ? 'MATCH EN DIRECT' : 'LIVE MATCH'}</div>
        <span>MOROCCO OPEN · MAT 01</span>
        <span className="hidden items-center gap-1.5 sm:flex"><Radio className="size-3" />ONLINE</span>
      </div>
      <div className="score-arena">
        <div className="score-side score-blue">
          <span className="corner-label">BLUE · MAR</span>
          <strong key={`b${current.blue}`} className="score-number score-pop">{current.blue}</strong>
          <span className="score-caption">RACHID A.</span>
        </div>
        <div className="score-center">
          <span className="match-label">ROUND 3 / 3</span>
          <strong key={current.time} className="score-time">{current.time}</strong>
          <span className="match-state">{lang === 'fr' ? 'EN COURS' : 'IN PROGRESS'}</span>
          <div className="round-dots"><i /><i /><i className="active" /></div>
        </div>
        <div className="score-side score-red">
          <span className="corner-label">RED · FRA</span>
          <strong key={`r${current.red}`} className="score-number score-pop">{current.red}</strong>
          <span className="score-caption">M. AIT BOUZID</span>
        </div>
      </div>
      <div className="score-event" aria-live="off">
        <span className="flex items-center gap-2"><Activity className="size-3.5 text-lime" /><span key={current.event}>{current.event}</span></span>
        <span className="judge-pills">{current.judges.map((judge) => <i key={judge}>{judge}</i>)}</span>
      </div>
      <button type="button" className="preview-next" onClick={() => setFrame((frame + 1) % frames.length)}>
        {lang === 'fr' ? 'Échange suivant' : 'Next exchange'}<ChevronRight className="size-3.5" />
      </button>
    </div>
    <div className="floating-chip floating-chip-bottom"><ShieldCheck className="size-3.5" />{lang === 'fr' ? 'Score validé par le serveur' : 'Server-authoritative score'}</div>
  </div>;
}
