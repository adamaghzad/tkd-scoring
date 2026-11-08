'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Download,
  FileChartColumn,
  History,
  Monitor,
  MousePointer2,
  Network,
  ShieldCheck,
  Smartphone,
  Trophy,
  WifiOff,
  Zap,
  ZoomIn,
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { androidDownloadUrl, asset, desktopVersion, downloadUrl } from '@/lib/site';
import { plans } from '@/lib/plans';

const copy = {
  en: {
    eyebrow: 'LOCAL-FIRST TOURNAMENT CONTROL',
    heroA: 'Every match.',
    heroB: 'Analyzed in seconds.',
    pro: 'PRO',
    proSub: 'Club & team analysis',
    intro:
      'The complete taekwondo tournament workspace—registration, brackets, live judging, scoreboards and results—running from one Windows laptop, with or without Internet.',
    download: 'Download for Windows',
    android: 'Install Android (validation)',
    demo: 'Watch demo',
    explore: 'Explore the system',
    v: `Desktop v${desktopVersion} · Windows 10/11 x64`,
    proof: ['No Node installation', 'Offline LAN ready', 'Persistent SQLite data'],
    scroll: 'Scroll to discover',
    productTag: 'THE CONTROL DESK',
    productTitle: 'A complete tournament, not a disconnected scoring remote.',
    productText:
      'Manage the entire event from a single operational view. Every match, athlete, draw and correction stays connected to the same authoritative record.',
    productPoints: [
      'Live match center and queue',
      'Clubs, categories, athletes and draws',
      'Results and operational metrics from real records',
    ],
    actual: 'Actual application interface · development showcase data',
    featuresTag: 'BUILT FOR THE WHOLE MAT',
    featuresTitle: 'One system. Every role in sync.',
    features: [
      [
        'Tournament operations',
        'Build clubs, categories, athlete rosters, draws, brackets and match schedules without spreadsheets.',
      ],
      [
        'Connected judging',
        'Pair judge and referee phones with a QR code. Proposals, confirmations and commands reach the same live match.',
      ],
      [
        'Broadcast-ready displays',
        'Blue/red corners, current-round points, round wins, penalties, timers and final results on any browser display.',
      ],
      [
        'Local-first reliability',
        'The PC hosts HTTP, WebSockets and SQLite locally. Venue scoring does not depend on a cloud connection.',
      ],
      [
        'Audited corrections',
        'Undo and official decisions are authorized and recorded. The event history remains inspectable after the match.',
      ],
      [
        'Reports and records',
        'Move from entries to final results without retyping data into a separate results system.',
      ],
    ],
    stepsTag: 'HOW IT WORKS',
    stepsTitle: 'Analysis in four steps.',
    stepsText:
      'Create a match, log every technique live, let the engine compute ratings and export a professional report in one click.',
    steps: [
      [
        'Create the match',
        'Pick the athletes, set the weight category and number of rounds. The system applies a date and time stamp automatically.',
      ],
      [
        'Log every technique',
        'Tap Dolyo, Neryo, Dwi and 20+ techniques during the match. Scores, gam-jeom and round wins update instantly.',
      ],
      [
        'AI-powered analysis',
        'Technique frequency, success rate, body-zone distribution and opponent weaknesses are computed the moment the match ends.',
      ],
      [
        'Export PDF report',
        'Generate a professional match analysis report with charts, technique distribution, AI comments and coach notes.',
      ],
    ],
    compareTag: 'ATHLETE PERFORMANCE COMPARISON',
    compareTitle: 'Compare two athletes side by side.',
    compareText:
      'Matchup metrics powered by match data. Filter by body zone, technique type and round to see who owns the advantage.',
    matchups: [
      { blue: 'Hakan Reçber', blueNation: 'TUR', blueStance: 'Left', red: 'Bradly Sinden', redNation: 'GBR', redStance: 'Right', weight: '-68 kg' },
      { blue: 'Merve Dinçel', blueNation: 'TUR', blueStance: 'Right', red: 'Panipak Wongpattanakit', redNation: 'THA', redStance: 'Left', weight: '-49 kg' },
      { blue: 'Nafia Kuş', blueNation: 'TUR', blueStance: 'Right', red: 'Althéa Laurin', redNation: 'FRA', redStance: 'Right', weight: '+67 kg' },
    ],
    metrics: ['Attack Speed', 'Technique Diversity', 'Defense Success', 'Stamina', 'Gam-jeom Control'],
    galleryTag: 'FROM INSIDE THE ARENA',
    galleryTitle: 'The match, captured.',
    galleryText: 'Every technique, every round and every decision archived for review.',
    reviewsTag: 'VOICES FROM THE FIELD',
    reviewsTitle: 'What coaches and athletes say.',
    reviews: [
      {
        name: 'Ahmet Yılmaz',
        role: 'National Team Coach',
        text: 'My post-match analysis that used to take hours now takes 10 minutes. The AI tactical suggestions are genuinely accurate and useful.',
      },
      {
        name: 'Zeynep Arslan',
        role: 'U21 World Champion',
        text: 'Reviewing my own matches and seeing my weak points boosted my motivation. Sharing PDF reports with my coach is so easy.',
      },
      {
        name: 'Murat Demir',
        role: 'Olympic Coach',
        text: 'The 24+ technique support and real-time gam-jeom tracking are excellent. The opponent analysis feature played a critical role in our strategy.',
      },
    ],
    pricingTag: 'SIMPLE PRICING IN MAD',
    pricingTitle: 'Start small. Grow when your club is ready.',
    pricingText:
      'A clear offer for clubs, with no charge per athlete, judge or match. Payment is confirmed by TKDTech, then a signed license is issued.',
    monthly: '/ month',
    founding: 'First 10 clubs',
    club: 'Standard club plan',
    event: 'One-event support',
    viewPlans: 'See all plans and subscription options',
    faqTag: 'QUICK ANSWERS',
    faqTitle: 'Before your first session.',
    faqs: [
      [
        'Do I need to install Node.js?',
        'No. The Windows desktop package includes its runtime. Extract the complete ZIP and run TKD Scoring.exe.',
      ],
      [
        'Can judges use iPhones and Android phones?',
        'Yes. Judges use a modern browser on the same local network. No judge app installation is required.',
      ],
      [
        'Does the phone need Internet?',
        'No. It needs Wi-Fi access to the host PC. A Wi-Fi network showing “No internet connection” can still work locally.',
      ],
      [
        'Is the download a free trial?',
        'No. The Windows installer is free to download, but tournament work requires a paid signed license after payment confirmation. No card is collected on this website.',
      ],
      [
        'Is this certified PSS or sensor scoring?',
        'No. This is independent tournament and software-based judging software. It does not claim WT, KPNP or Daedo certification or sensor-based PSS equivalence.',
      ],
    ],
    finalTag: 'YOUR NEXT MATCH STARTS HERE',
    finalTitle: 'One laptop. Your devices. A complete tournament.',
    finalText:
      'Download the Windows installer, then activate your paid desktop license after payment confirmation.',
    guide: 'Read the complete guide',
    statsLabel: 'POWERED BY MATCH DATA',
    stats: [
      ['0', 'Matches analyzed'],
      ['0', 'Techniques tagged'],
      ['0', 'Reports generated'],
      ['0 ms', 'Score update latency'],
    ],
  },
  fr: {
    eyebrow: 'GESTION DE TOURNOI LOCAL-FIRST',
    heroA: 'Chaque match.',
    heroB: 'Analysé en quelques secondes.',
    pro: 'PRO',
    proSub: 'Analyse club et équipe',
    intro:
      "L'espace complet pour vos tournois de taekwondo—inscriptions, tableaux, juges, scores et résultats—depuis un ordinateur Windows, avec ou sans Internet.",
    download: 'Télécharger pour Windows',
    android: 'Installer Android (validation)',
    demo: 'Voir la démo',
    explore: 'Découvrir le système',
    v: `Desktop v${desktopVersion} · Windows 10/11 x64`,
    proof: ['Aucune installation Node', 'Réseau local hors ligne', 'Données SQLite persistantes'],
    scroll: 'Faites défiler pour découvrir',
    productTag: 'LE POSTE DE CONTRÔLE',
    productTitle: 'Un tournoi complet, pas une simple télécommande de score.',
    productText:
      'Gérez tout l’événement depuis une seule vue. Chaque match, athlète, tableau et correction reste lié au même enregistrement de référence.',
    productPoints: ['Matchs en direct et file d’attente', 'Clubs, catégories, athlètes et tableaux', 'Résultats et indicateurs issus des vrais enregistrements'],
    actual: 'Interface réelle · données de démonstration',
    featuresTag: 'CONÇU POUR TOUT LE TAPIS',
    featuresTitle: 'Un système. Tous les rôles synchronisés.',
    features: [
      [
        'Gestion du tournoi',
        'Créez clubs, catégories, athlètes, tirages, tableaux et horaires sans feuilles de calcul.',
      ],
      [
        'Juges connectés',
        'Associez les téléphones par QR code. Propositions, confirmations et commandes rejoignent le même match.',
      ],
      [
        'Écrans pour le public',
        'Coins bleu/rouge, points de la reprise, reprises gagnées, pénalités, temps et résultats sur tout navigateur.',
      ],
      [
        'Fiabilité locale',
        'Le PC héberge HTTP, WebSockets et SQLite. Le scoring au gymnase ne dépend pas du cloud.',
      ],
      [
        'Corrections auditées',
        'Annulations et décisions officielles sont autorisées et enregistrées. L’historique reste consultable.',
      ],
      [
        'Rapports et archives',
        'Passez des inscriptions aux résultats sans recopier les données dans un autre système.',
      ],
    ],
    stepsTag: 'COMMENT ÇA MARCHE',
    stepsTitle: 'Analyse en quatre étapes.',
    stepsText:
      'Créez un match, enregistrez chaque technique en direct, laissez le moteur calculer les notes et exportez un rapport professionnel en un clic.',
    steps: [
      [
        'Créer le match',
        'Choisissez les athlètes, définissez la catégorie de poids et le nombre de reprises. Le système applique une date et un horodatage automatiquement.',
      ],
      [
        'Enregistrer chaque technique',
        'Appuyez sur Dolyo, Neryo, Dwi et plus de 20 techniques pendant le match. Les scores, les gam-jeom et les reprises gagnées se mettent à jour instantanément.',
      ],
      [
        'Analyse assistée par IA',
        'La fréquence des techniques, le taux de réussite, la répartition par zone corporelle et les faiblesses de l’adversaire sont calculées dès la fin du match.',
      ],
      [
        'Exporter le rapport PDF',
        'Générez un rapport d’analyse de match professionnel avec graphiques, répartition des techniques, commentaires IA et notes du coach.',
      ],
    ],
    compareTag: 'COMPARAISON DE PERFORMANCE ATHLÈTE',
    compareTitle: 'Comparez deux athlètes côte à côte.',
    compareText:
      'Des métriques de confrontation alimentées par les données de match. Filtrez par zone corporelle, type de technique et reprise pour voir qui détient l’avantage.',
    matchups: [
      { blue: 'Hakan Reçber', blueNation: 'TUR', blueStance: 'Gaucher', red: 'Bradly Sinden', redNation: 'GBR', redStance: 'Droitier', weight: '-68 kg' },
      { blue: 'Merve Dinçel', blueNation: 'TUR', blueStance: 'Droitier', red: 'Panipak Wongpattanakit', redNation: 'THA', redStance: 'Gaucher', weight: '-49 kg' },
      { blue: 'Nafia Kuş', blueNation: 'TUR', blueStance: 'Droitier', red: 'Althéa Laurin', redNation: 'FRA', redStance: 'Droitier', weight: '+67 kg' },
    ],
    metrics: ['Vitesse d\'attaque', 'Diversité technique', 'Réussite défensive', 'Endurance', 'Maîtrise gam-jeom'],
    galleryTag: 'DES COULISSES DU TAPIS',
    galleryTitle: 'Le match, capturé.',
    galleryText: 'Chaque technique, chaque reprise et chaque décision archivés pour révision.',
    reviewsTag: 'TÉMOIGNAGES DU TERRAIN',
    reviewsTitle: 'Ce que disent les entraîneurs et les athlètes.',
    reviews: [
      {
        name: 'Ahmet Yılmaz',
        role: 'Entraîneur de l\'équipe nationale',
        text: 'Mon analyse d’après-match qui prenait des heures prend maintenant 10 minutes. Les suggestions tactiques de l’IA sont vraiment précises et utiles.',
      },
      {
        name: 'Zeynep Arslan',
        role: 'Championne du monde U21',
        text: 'Revoir mes propres matches et identifier mes points faibles a boosté ma motivation. Partager les rapports PDF avec mon entraîneur est si simple.',
      },
      {
        name: 'Murat Demir',
        role: 'Entraîneur olympique',
        text: 'Le support de plus de 24 techniques et le suivi gam-jeom en temps réel sont excellents. La fonction d’analyse d’adversaire a joué un rôle clé dans notre stratégie.',
      },
    ],
    pricingTag: 'TARIFS SIMPLES EN MAD',
    pricingTitle: 'Commencez petit. Évoluez avec votre club.',
    pricingText:
      'Une offre claire, sans facturation par athlète, juge ou match. Le paiement est confirmé par TKDTech, puis une licence signée est délivrée.',
    monthly: '/ mois',
    founding: '10 premiers clubs',
    club: 'Formule club standard',
    event: 'Assistance pour un événement',
    viewPlans: 'Voir les formules et les options d’abonnement',
    faqTag: 'RÉPONSES RAPIDES',
    faqTitle: 'Avant votre première session.',
    faqs: [
      [
        'Faut-il installer Node.js ?',
        'Non. Le package Windows inclut son environnement. Extrayez tout le ZIP et lancez TKD Scoring.exe.',
      ],
      [
        'Les juges peuvent-ils utiliser iPhone et Android ?',
        'Oui. Un navigateur moderne sur le même réseau local suffit. Aucune application à installer.',
      ],
      [
        'Le téléphone a-t-il besoin d’Internet ?',
        'Non. Il doit seulement accéder au PC par Wi-Fi. Un réseau indiquant « Pas de connexion Internet » peut fonctionner localement.',
      ],
      [
        'Le téléchargement est-il un essai gratuit ?',
        'Non. L’installateur Windows est gratuit à télécharger, mais le travail de tournoi exige une licence payante signée après confirmation du paiement. Aucune carte n’est collectée sur ce site.',
      ],
      [
        'Est-ce un système PSS certifié ou à capteurs ?',
        'Non. C’est un logiciel indépendant de tournoi et de scoring par juges. Il ne revendique aucune certification WT, KPNP ou Daedo ni équivalence PSS.',
      ],
    ],
    finalTag: 'VOTRE PROCHAIN MATCH COMMENCE ICI',
    finalTitle: 'Un ordinateur. Vos appareils. Un tournoi complet.',
    finalText: 'Téléchargez l’installateur Windows, puis activez votre licence desktop payante après confirmation du paiement.',
    guide: 'Lire le guide complet',
    statsLabel: 'ALIMENTÉ PAR LES DONNÉES DE MATCH',
    stats: [
      ['0', 'Matches analysés'],
      ['0', 'Techniques étiquetées'],
      ['0', 'Rapports générés'],
      ['0 ms', 'Latence de mise à jour du score'],
    ],
  },
} as const;

const techniqueChips = ['Dolyo +2', 'Neryo +3', 'Dwi +4', 'Gam-jeom', '360° +4', 'Yumruk +1'];

const statFrames = [
  ['12', '48', '6', '42'],
  ['24', '96', '14', '88'],
  ['37', '142', '21', '131'],
  ['51', '198', '29', '184'],
];

export function HomeContent() {
  const { lang } = useLanguage();
  const c = copy[lang];
  const [statIndex, setStatIndex] = useState(0);
  const [chipIndex, setChipIndex] = useState(0);
  const [compareIndex, setCompareIndex] = useState(0);
  const matchupCount = c.matchups.length;

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setStatIndex((i) => (i + 1) % statFrames.length), 3000);
    const ci = setInterval(() => setChipIndex((i) => (i + 1) % techniqueChips.length), 2200);
    const cmp = setInterval(() => setCompareIndex((i) => (i + 1) % matchupCount), 5000);
    return () => { clearInterval(t); clearInterval(ci); clearInterval(cmp); };
  }, [matchupCount]);

  const currentStat = statFrames[statIndex]!;
  const currentChip = techniqueChips[chipIndex]!;
  const currentMatchup = c.matchups[compareIndex]!;

  return (
    <main>
      {/* ---------- HERO ---------- */}
      <section className="hero-section relative isolate overflow-hidden">
        <div className="hero-orb hero-orb-one" /><div className="hero-orb hero-orb-two" />
        <div className="mx-auto grid max-w-[1440px] items-start gap-14 px-5 pb-32 pt-16 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:pb-48 lg:pt-24">
          <div className="relative z-10">
            <p className="eyebrow hero-enter"><span />{c.eyebrow}</p>
            <div className="flex items-center gap-3 mb-2 hero-enter hero-delay-one">
              <span className="pro-badge animate-pro-pulse">{c.pro}</span>
              <span className="text-xs font-semibold uppercase tracking-widest text-white/40">{c.proSub}</span>
            </div>
            <h1 className="hero-title hero-enter hero-delay-one"><span>{c.heroA}</span><span className="hero-gradient">{c.heroB}</span></h1>
            <p className="hero-intro hero-enter hero-delay-two">{c.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap hero-enter hero-delay-two">
              <a className="button-primary" href={downloadUrl}>{c.download}<Download className="size-4" /></a>
              <a className="button-secondary" href={androidDownloadUrl}>{c.android}<Smartphone className="size-4" /></a>
              <a className="button-secondary" href="#features">{c.demo}<ArrowRight className="size-4" /></a>
            </div>
            <p className="mt-4 text-[10px] font-medium uppercase tracking-[.14em] text-white/35">{c.v}</p>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2">{c.proof.map((item) => (
              <span className="proof-item" key={item}><Check className="size-3.5" />{item}</span>
            ))}</div>
          </div>
          <div className="hero-enter hero-delay-two relative z-10">
            <div className="scoreboard-card">
              <div className="scoreboard-header">
                <span className="scoreboard-round">R<span className="animate-round-pulse">1</span> · ROUND 1 / 3</span>
                <span className="scoreboard-time animate-count"><span id="hero-time">1:52</span></span>
                <span className="scoreboard-live"><span className="live-dot" />LIVE</span>
              </div>
              <div className="scoreboard-body">
                <div className="scoreboard-corner scoreboard-blue">
                  <span className="corner-label">BLUE · MAR</span>
                  <strong className="scoreboard-number animate-score">06</strong>
                  <span className="scoreboard-athlete">Rachid A.</span>
                </div>
                <div className="scoreboard-center">
                  <span className="match-label">MOROCCO OPEN · MAT 01</span>
                  <div className="round-dots"><i className="active" /><i /><i /></div>
                </div>
                <div className="scoreboard-corner scoreboard-red">
                  <span className="corner-label">RED · FRA</span>
                  <strong className="scoreboard-number animate-score">04</strong>
                  <span className="scoreboard-athlete">M. Laurin</span>
                </div>
              </div>
              <div className="scoreboard-events">
                <span className="flex items-center gap-2"><Activity className="size-3" />{currentChip}</span>
                <span className="scoreboard-judges">J1 · J2 · J3</span>
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-cue"><MousePointer2 className="size-3.5" />{c.scroll}</div>
      </section>

      {/* ---------- STATS ---------- */}
      <section className="stats-section border-y border-white/[.06]">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12">
          <p className="eyebrow text-center"><span />{c.statsLabel}</p>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">{c.stats.map(([label], i) => (
            <div className="stat-card" key={label}>
              <div className="stat-value animate-count-up">{currentStat[i]}</div>
              <p className="stat-label">{label}</p>
            </div>
          ))}</div>
        </div>
      </section>

      {/* ---------- PRODUCT ---------- */}
      <section id="system" className="section-shell scroll-mt-24">
        <div className="section-heading split-heading"><div><p className="eyebrow"><span />{c.productTag}</p><h2>{c.productTitle}</h2></div><div><p>{c.productText}</p><ul className="check-list">{c.productPoints.map((item) => <li key={item}><Check />{item}</li>)}</ul></div></div>
        <div className="browser-frame product-shot reveal-view">
          <div className="browser-bar"><div><i /><i /><i /></div><span>TKD SCORING · TOURNAMENT CONTROL</span><span className="browser-status"><i />LOCAL</span></div>
          <img src={asset('/assets/dashboard.webp')} alt={lang === 'fr' ? 'Tableau de bord réel de TKD Scoring' : 'Actual TKD Scoring tournament dashboard'} loading="lazy" />
        </div>
        <p className="mt-4 text-center text-[10px] uppercase tracking-[.15em] text-white/30">{c.actual}</p>
      </section>

      {/* ---------- FEATURES ---------- */}
      <section id="features" className="section-shell border-t border-white/[.07]">
        <div className="section-heading centered-heading"><p className="eyebrow justify-center"><span />{c.featuresTag}</p><h2>{c.featuresTitle}</h2></div>
        <div className="feature-grid">{c.features.map(([title, text], index) => {
          const Icon = [Trophy, Smartphone, Monitor, WifiOff, History, FileChartColumn][index]!;
          return (
            <article className="feature-card" key={title}>
              <div className="feature-number">0{index + 1}</div>
              <Icon className="feature-icon" />
              <h3>{title}</h3>
              <p>{text}</p>
              <div className="feature-line" />
            </article>
          );
        })}</div>
      </section>

      {/* ---------- STEPS ---------- */}
      <section className="steps-section">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12">
          <div className="section-heading centered-heading mb-12"><p className="eyebrow justify-center"><span />{c.stepsTag}</p><h2>{c.stepsTitle}</h2><p className="mt-6 text-center max-w-2xl mx-auto text-white/50">{c.stepsText}</p></div>
          <div className="step-grid">{c.steps.map(([title, text], index) => {
            const Icon = [Download, Trophy, Network, Zap][index]!;
            return (
              <article className="step-card" key={title}>
                <div className="step-icon"><Icon /></div>
                <h3>{title}</h3>
                <p>{text}</p>
                {index < 3 && <ChevronRight className="step-arrow" />}
              </article>
            );
          })}</div>
        </div>
      </section>

      {/* ---------- COMPARISON ---------- */}
      <section id="comparison" className="section-shell border-t border-white/[.07]">
        <div className="section-heading centered-heading"><p className="eyebrow justify-center"><span />{c.compareTag}</p><h2>{c.compareTitle}</h2><p className="mt-6 text-center max-w-2xl mx-auto text-white/50">{c.compareText}</p></div>
        <div className="mx-auto max-w-5xl">
          <div className="comparison-card">
            <div className="comparison-header">
              <span className="comparison-round">MATCHUP · {currentMatchup.weight}</span>
              <div className="comparison-vs">VS</div>
            </div>
            <div className="comparison-sides">
              <div className="comparison-side comparison-blue">
                <span className="comparison-flag">{currentMatchup.blueNation}</span>
                <h3 className="comparison-name">{currentMatchup.blue}</h3>
                <span className="comparison-stance">{currentMatchup.blueStance}</span>
              </div>
              <div className="comparison-side comparison-red">
                <span className="comparison-flag">{currentMatchup.redNation}</span>
                <h3 className="comparison-name">{currentMatchup.red}</h3>
                <span className="comparison-stance">{currentMatchup.redStance}</span>
              </div>
            </div>
            <div className="comparison-metrics">
              {c.metrics.map((metric, i) => (
                <div className="comparison-metric" key={metric}>
                  <span className="comparison-metric-label">{metric}</span>
                  <div className="comparison-bar-track">
                    <div className="comparison-bar-fill comparison-bar-blue" style={{ width: `${50 + (i * 7) % 40}%` }} />
                    <div className="comparison-bar-fill comparison-bar-red" style={{ width: `${50 + ((i + 2) * 7) % 40}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- GALLERY ---------- */}
      <section className="gallery-section border-y border-white/[.06]">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12">
          <div className="section-heading centered-heading mb-12"><p className="eyebrow justify-center"><span />{c.galleryTag}</p><h2>{c.galleryTitle}</h2><p className="mt-6 text-center max-w-2xl mx-auto text-white/50">{c.galleryText}</p></div>
          <div className="gallery-grid">
            {Array.from({ length: 10 }).map((_, index) => (
              <div className="gallery-item" key={index}>
                <img src={`https://taekwondoanalysis.com/images/gallery/${index + 1}.png`} alt={c.galleryTitle} loading="lazy" />
                <div className="gallery-overlay"><ZoomIn className="size-4" /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- REVIEWS ---------- */}
      <section className="reviews-section">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12">
          <div className="section-heading centered-heading mb-12"><p className="eyebrow justify-center"><span />{c.reviewsTag}</p><h2>{c.reviewsTitle}</h2></div>
          <div className="reviews-grid">{c.reviews.map((review) => (
            <article className="review-card" key={review.name}>
              <div className="review-stars">{'★★★★★'}</div>
              <p className="review-text">{review.text}</p>
              <div className="review-author"><strong>{review.name}</strong><span>{review.role}</span></div>
            </article>
          ))}</div>
        </div>
      </section>

      {/* ---------- PRICING ---------- */}
      <section id="pricing" className="pricing-section">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12">
          <div className="section-heading centered-heading mb-14"><p className="eyebrow justify-center"><span />{c.pricingTag}</p><h2>{c.pricingTitle}</h2><p className="mt-6 text-center max-w-2xl mx-auto text-white/50">{c.pricingText}</p></div>
          <div className="pricing-grid">
            {(['founding', 'club', 'event'] as const).map((id, index) => {
              const plan = plans[id];
              const featured = id === 'club';
              return (
                <article className={`price-card ${featured ? 'featured' : ''}`} key={id}>
                  {featured && <div className="price-pop">MOST POPULAR</div>}
                  <p className="price-label">{plan.name[lang]}</p>
                  <div className="price-line"><strong>{plan.monthly}</strong><span>MAD</span></div>
                  <p className="price-period">{id === 'event' ? (lang === 'fr' ? '/ événement' : '/ event') : c.monthly}</p>
                  <p className="price-note">{index === 0 ? c.founding : index === 1 ? c.club : c.event}</p>
                  <Link href={`/subscription/?plan=${id}`} className={`price-link ${featured ? 'price-link-pro' : ''}`}>{lang === 'fr' ? 'Choisir' : 'Choose'}<ArrowRight className="size-4" /></Link>
                </article>
              );
            })}
          </div>
          <div className="mt-10 text-center"><Link href="/subscription/" className="button-secondary">{c.viewPlans}<ArrowRight className="size-4" /></Link></div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="section-shell border-t border-white/[.07]">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.65fr_1.35fr]"><div><p className="eyebrow"><span />{c.faqTag}</p><h2 className="section-title !text-4xl sm:!text-5xl">{c.faqTitle}</h2></div><div className="faq-list">{c.faqs.map(([question, answer], index) => <details key={question} open={index === 0}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></div>
      </section>

      {/* ---------- FINAL CTA ---------- */}
      <section className="final-cta"><div className="final-cta-grid" /><div className="relative z-10 mx-auto max-w-4xl"><p className="eyebrow justify-center"><span />{c.finalTag}</p><h2>{c.finalTitle}</h2><p>{c.finalText}</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><a className="button-primary" href={downloadUrl}>{c.download}<Download className="size-4" /></a><Link className="button-secondary" href="/guide/">{c.guide}<ArrowUpRight className="size-4" /></Link></div></div><ShieldCheck className="final-watermark" /></section>
    </main>
  );
}
