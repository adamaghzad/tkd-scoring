'use client';

import Link from 'next/link';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronRight, Download, FileChartColumn, History, Monitor, MousePointer2, Network, ShieldCheck, Smartphone, Trophy, WifiOff, Zap } from 'lucide-react';
import { ScorePreview } from './score-preview';
import { useLanguage } from '@/lib/i18n';
import { androidDownloadUrl, asset, desktopVersion, downloadUrl } from '@/lib/site';
import { plans } from '@/lib/plans';

const copy = {
  en: {
    eyebrow: 'LOCAL-FIRST TOURNAMENT CONTROL',
    heroA: 'Every point.',
    heroB: 'One source of truth.',
    intro: 'The complete taekwondo tournament workspace—registration, brackets, live judging, scoreboards and results—running from one Windows laptop, with or without Internet.',
    download: 'Download for Windows',
    android: 'Install Android (validation)',
    explore: 'Explore the system',
    v: `Desktop v${desktopVersion} · Windows 10/11 x64`,
    proof: ['No Node installation', 'Offline LAN ready', 'Persistent SQLite data'],
    scroll: 'Scroll to discover',
    productTag: 'THE CONTROL DESK',
    productTitle: 'A complete tournament, not a disconnected scoring remote.',
    productText: 'Manage the entire event from a single operational view. Every match, athlete, draw and correction stays connected to the same authoritative record.',
    productPoints: ['Live match center and queue', 'Clubs, categories, athletes and draws', 'Results and operational metrics from real records'],
    actual: 'Actual application interface · development showcase data',
    featuresTag: 'BUILT FOR THE WHOLE MAT',
    featuresTitle: 'One system. Every role in sync.',
    features: [
      ['Tournament operations', 'Build clubs, categories, athlete rosters, draws, brackets and match schedules without spreadsheets.'],
      ['Connected judging', 'Pair judge and referee phones with a QR code. Proposals, confirmations and commands reach the same live match.'],
      ['Broadcast-ready displays', 'Blue/red corners, current-round points, round wins, penalties, timers and final results on any browser display.'],
      ['Local-first reliability', 'The PC hosts HTTP, WebSockets and SQLite locally. Venue scoring does not depend on a cloud connection.'],
      ['Audited corrections', 'Undo and official decisions are authorized and recorded. The event history remains inspectable after the match.'],
      ['Reports and records', 'Move from entries to final results without retyping data into a separate results system.'],
    ],
    offlineTag: 'OFFLINE IS A FEATURE',
    offlineTitle: 'The Internet can stop. The match does not.',
    offlineText: 'Keep the operator, judges and displays on the same local network. TKD Scoring continues on the laptop while preserving every scoring event for restart recovery.',
    offlinePoints: ['No venue Internet required', 'Server-authoritative scoring and consensus', 'Judge pairing that works on plain-HTTP LAN browsers', 'Persistent data under your Windows user profile'],
    phoneCaption: 'A responsive judge controller designed for real phones',
    workflowTag: 'FROM ZIP TO FIRST MATCH',
    workflowTitle: 'Four steps. Then the mat takes over.',
    workflow: [
      ['Download, extract and activate', 'Run TKD Scoring.exe, copy your installation code and request a license. After payment confirmation, import the signed .tkdlicense file.'],
      ['Build the event', 'Create the tournament, clubs, categories and athletes. Generate the draw and schedule.'],
      ['Pair the mat', 'Share the judge or referee QR code. Devices join through the local network.'],
      ['Score with confidence', 'Start the round, manage consensus and penalties, then publish the authoritative result.'],
    ],
    displayTag: 'MAKE EVERY POINT VISIBLE',
    displayTitle: 'A display athletes and spectators understand instantly.',
    displayText: 'Current-round scoring stays clear during play. Round wins appear during rest, and completed matches move into a dedicated result view.',
    displayPoints: ['Judge punch and hit activity', 'Configurable Gam-Jeom and point-gap rules', 'Countdown and competition audio', 'Automatic round and match transitions'],
    pricingTag: 'SIMPLE PRICING IN MAD',
    pricingTitle: 'Start small. Grow when your club is ready.',
    pricingText: 'A clear offer for clubs, with no charge per athlete, judge or match.',
    monthly: '/ month',
    founding: 'First 10 clubs',
    club: 'Standard club plan',
    event: 'One-event support',
    viewPlans: 'See all plans and subscription options',
    faqTag: 'QUICK ANSWERS',
    faqTitle: 'Before your first session.',
    faqs: [
      ['Do I need to install Node.js?', 'No. The Windows desktop package includes its runtime. Extract the complete ZIP and run TKD Scoring.exe.'],
      ['Can judges use iPhones and Android phones?', 'Yes. Judges use a modern browser on the same local network. No judge app installation is required.'],
      ['Does the phone need Internet?', 'No. It needs Wi-Fi access to the host PC. A Wi-Fi network showing “No internet connection” can still work locally.'],
      ['Is the download a free trial?', 'No. The Windows installer is free to download, but tournament work requires a paid signed license after payment confirmation. No card is collected on this website.'],
      ['Is this certified PSS or sensor scoring?', 'No. This is independent tournament and software-based judging software. It does not claim WT, KPNP or Daedo certification or sensor-based PSS equivalence.'],
    ],
    finalTag: 'YOUR NEXT MATCH STARTS HERE',
    finalTitle: 'One laptop. Your devices. A complete tournament.',
    finalText: 'Download the Windows installer, then activate your paid desktop license after payment confirmation.',
    guide: 'Read the complete guide',
  },
  fr: {
    eyebrow: 'GESTION DE TOURNOI LOCAL-FIRST',
    heroA: 'Chaque point.',
    heroB: 'Une seule source de vérité.',
    intro: 'L’espace complet pour vos tournois de taekwondo—inscriptions, tableaux, juges, scores et résultats—depuis un ordinateur Windows, avec ou sans Internet.',
    download: 'Télécharger pour Windows',
    android: 'Installer Android (validation)',
    explore: 'Découvrir le système',
    v: `Desktop v${desktopVersion} · Windows 10/11 x64`,
    proof: ['Aucune installation Node', 'Réseau local hors ligne', 'Données SQLite persistantes'],
    scroll: 'Faites défiler pour découvrir',
    productTag: 'LE POSTE DE CONTRÔLE',
    productTitle: 'Un tournoi complet, pas une simple télécommande de score.',
    productText: 'Gérez tout l’événement depuis une seule vue. Chaque match, athlète, tableau et correction reste lié au même enregistrement de référence.',
    productPoints: ['Matchs en direct et file d’attente', 'Clubs, catégories, athlètes et tableaux', 'Résultats et indicateurs issus des vrais enregistrements'],
    actual: 'Interface réelle · données de démonstration',
    featuresTag: 'CONÇU POUR TOUT LE TAPIS',
    featuresTitle: 'Un système. Tous les rôles synchronisés.',
    features: [
      ['Gestion du tournoi', 'Créez clubs, catégories, athlètes, tirages, tableaux et horaires sans feuilles de calcul.'],
      ['Juges connectés', 'Associez les téléphones par QR code. Propositions, confirmations et commandes rejoignent le même match.'],
      ['Écrans pour le public', 'Coins bleu/rouge, points de la reprise, reprises gagnées, pénalités, temps et résultats sur tout navigateur.'],
      ['Fiabilité locale', 'Le PC héberge HTTP, WebSockets et SQLite. Le scoring au gymnase ne dépend pas du cloud.'],
      ['Corrections auditées', 'Annulations et décisions officielles sont autorisées et enregistrées. L’historique reste consultable.'],
      ['Rapports et archives', 'Passez des inscriptions aux résultats sans recopier les données dans un autre système.'],
    ],
    offlineTag: 'LE HORS LIGNE EST UNE FONCTION',
    offlineTitle: 'Internet peut s’arrêter. Pas le match.',
    offlineText: 'Gardez l’opérateur, les juges et les écrans sur le même réseau local. TKD Scoring continue sur l’ordinateur et conserve chaque événement pour la reprise.',
    offlinePoints: ['Aucun Internet requis au gymnase', 'Score et consensus validés par le serveur', 'Appairage compatible avec les navigateurs LAN en HTTP', 'Données persistantes dans le profil Windows'],
    phoneCaption: 'Un contrôleur juge responsive, conçu pour de vrais téléphones',
    workflowTag: 'DU ZIP AU PREMIER MATCH',
    workflowTitle: 'Quatre étapes. Puis le tapis prend le relais.',
    workflow: [
      ['Télécharger, extraire et activer', 'Lancez TKD Scoring.exe, copiez le code d’installation et demandez une licence. Après confirmation du paiement, importez le fichier .tkdlicense signé.'],
      ['Créer l’événement', 'Créez tournoi, clubs, catégories et athlètes. Générez le tirage et le programme.'],
      ['Appairer le tapis', 'Partagez le QR juge ou arbitre. Les appareils rejoignent le réseau local.'],
      ['Scorer sereinement', 'Lancez la reprise, gérez consensus et pénalités, puis publiez le résultat officiel.'],
    ],
    displayTag: 'RENDEZ CHAQUE POINT VISIBLE',
    displayTitle: 'Un affichage compris immédiatement par les athlètes et le public.',
    displayText: 'Les points de la reprise restent lisibles pendant le jeu. Les reprises gagnées apparaissent au repos et le match terminé passe à une vue de résultat.',
    displayPoints: ['Coups de poing et impacts des juges', 'Règles Gam-Jeom et écart de points configurables', 'Compte à rebours et signaux audio', 'Transitions automatiques des reprises et matchs'],
    pricingTag: 'TARIFS SIMPLES EN MAD',
    pricingTitle: 'Commencez petit. Évoluez avec votre club.',
    pricingText: 'Une offre claire, sans facturation par athlète, juge ou match.',
    monthly: '/ mois',
    founding: '10 premiers clubs',
    club: 'Formule club standard',
    event: 'Assistance pour un événement',
    viewPlans: 'Voir les formules et les options d’abonnement',
    faqTag: 'RÉPONSES RAPIDES',
    faqTitle: 'Avant votre première session.',
    faqs: [
      ['Faut-il installer Node.js ?', 'Non. Le package Windows inclut son environnement. Extrayez tout le ZIP et lancez TKD Scoring.exe.'],
      ['Les juges peuvent-ils utiliser iPhone et Android ?', 'Oui. Un navigateur moderne sur le même réseau local suffit. Aucune application à installer.'],
      ['Le téléphone a-t-il besoin d’Internet ?', 'Non. Il doit seulement accéder au PC par Wi-Fi. Un réseau indiquant « Pas de connexion Internet » peut fonctionner localement.'],
      ['Le téléchargement est-il un essai gratuit ?', 'Non. L’installateur Windows est gratuit à télécharger, mais le travail de tournoi exige une licence payante signée après confirmation du paiement. Aucune carte n’est collectée sur ce site.'],
      ['Est-ce un système PSS certifié ou à capteurs ?', 'Non. C’est un logiciel indépendant de tournoi et de scoring par juges. Il ne revendique aucune certification WT, KPNP ou Daedo ni équivalence PSS.'],
    ],
    finalTag: 'VOTRE PROCHAIN MATCH COMMENCE ICI',
    finalTitle: 'Un ordinateur. Vos appareils. Un tournoi complet.',
    finalText: 'Téléchargez l’installateur Windows, puis activez votre licence desktop payante après confirmation du paiement.',
    guide: 'Lire le guide complet',
  },
};

const featureIcons = [Trophy, Smartphone, Monitor, WifiOff, History, FileChartColumn];
const workflowIcons = [Download, Trophy, Network, Zap];

export function HomeContent() {
  const { lang } = useLanguage();
  const c = copy[lang];
  return <main>
    <section className="hero-section">
      <div className="hero-orb hero-orb-one" /><div className="hero-orb hero-orb-two" />
      <div className="mx-auto grid max-w-[1440px] items-center gap-14 px-5 pb-20 pt-16 sm:px-8 lg:grid-cols-[.88fr_1.12fr] lg:px-12 lg:pb-28 lg:pt-24">
        <div className="relative z-10">
          <p className="eyebrow hero-enter"><span />{c.eyebrow}</p>
          <h1 className="hero-title hero-enter hero-delay-one"><span>{c.heroA}</span><span className="hero-gradient">{c.heroB}</span></h1>
          <p className="hero-intro hero-enter hero-delay-two">{c.intro}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap hero-enter hero-delay-two">
            <a className="button-primary" href={downloadUrl}>{c.download}<Download className="size-4" /></a>
            <a className="button-secondary" href={androidDownloadUrl}>{c.android}<Smartphone className="size-4" /></a>
            <a className="button-secondary" href="#system">{c.explore}<ArrowDown className="size-4" /></a>
          </div>
          <p className="mt-4 text-[10px] font-medium uppercase tracking-[.14em] text-white/35">{c.v}</p>
          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2">{c.proof.map((item) => <span className="proof-item" key={item}><Check className="size-3.5" />{item}</span>)}</div>
        </div>
        <div className="hero-enter hero-delay-two"><ScorePreview /></div>
      </div>
      <div className="scroll-cue"><MousePointer2 className="size-3.5" />{c.scroll}</div>
    </section>

    <section id="system" className="section-shell scroll-mt-24">
      <div className="section-heading split-heading"><div><p className="eyebrow"><span />{c.productTag}</p><h2>{c.productTitle}</h2></div><div><p>{c.productText}</p><ul className="check-list">{c.productPoints.map((item) => <li key={item}><Check />{item}</li>)}</ul></div></div>
      <div className="browser-frame product-shot reveal-view">
        <div className="browser-bar"><div><i /><i /><i /></div><span>TKD SCORING · TOURNAMENT CONTROL</span><span className="browser-status"><i />LOCAL</span></div>
        <img src={asset('/assets/dashboard.webp')} alt={lang === 'fr' ? 'Tableau de bord réel de TKD Scoring' : 'Actual TKD Scoring tournament dashboard'} loading="lazy" />
      </div>
      <p className="mt-4 text-center text-[10px] uppercase tracking-[.15em] text-white/30">{c.actual}</p>
    </section>

    <section className="section-shell border-t border-white/[.07]">
      <div className="section-heading centered-heading"><p className="eyebrow justify-center"><span />{c.featuresTag}</p><h2>{c.featuresTitle}</h2></div>
      <div className="feature-grid">{c.features.map(([title, text], index) => { const Icon = featureIcons[index]!; return <article className="feature-card" key={title}><div className="feature-number">0{index + 1}</div><Icon className="feature-icon" /><h3>{title}</h3><p>{text}</p><div className="feature-line" /></article>; })}</div>
    </section>

    <section className="offline-section">
      <div className="mx-auto grid max-w-[1440px] items-center gap-14 lg:grid-cols-[1fr_.85fr]">
        <div>
          <p className="eyebrow"><span />{c.offlineTag}</p><h2 className="section-title">{c.offlineTitle}</h2><p className="section-copy">{c.offlineText}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">{c.offlinePoints.map((item, index) => <div className="offline-point" key={item}><span>0{index + 1}</span><p>{item}</p></div>)}</div>
        </div>
        <div className="phone-stage">
          <div className="phone-orbit phone-orbit-one" /><div className="phone-orbit phone-orbit-two" />
          <div className="phone-frame"><div className="phone-speaker" /><img src={asset('/assets/judge-single-mobile.webp')} alt={lang === 'fr' ? 'Contrôleur juge mobile réel' : 'Actual mobile judge controller'} loading="lazy" /></div>
          <div className="phone-caption"><Smartphone className="size-4" />{c.phoneCaption}</div>
        </div>
      </div>
    </section>

    <section className="section-shell">
      <div className="section-heading"><p className="eyebrow"><span />{c.workflowTag}</p><h2>{c.workflowTitle}</h2></div>
      <div className="workflow-grid">{c.workflow.map(([title, text], index) => { const Icon = workflowIcons[index]!; return <article className="workflow-card" key={title}><div className="workflow-top"><span>0{index + 1}</span><Icon /></div><h3>{title}</h3><p>{text}</p>{index < 3 && <ChevronRight className="workflow-arrow" />}</article>; })}</div>
    </section>

    <section className="display-section">
      <div className="mx-auto max-w-[1440px]">
        <div className="section-heading split-heading"><div><p className="eyebrow"><span />{c.displayTag}</p><h2>{c.displayTitle}</h2></div><div><p>{c.displayText}</p><ul className="check-list">{c.displayPoints.map((item) => <li key={item}><Check />{item}</li>)}</ul></div></div>
        <div className="display-shot"><img src={asset('/assets/kpnp-style-scoring-activity-display.webp')} alt={lang === 'fr' ? 'Écran public réel avec activité des juges' : 'Actual public display with judge scoring activity'} loading="lazy" /><div className="display-glow" /></div>
      </div>
    </section>

    <section className="section-shell">
      <div className="section-heading centered-heading"><p className="eyebrow justify-center"><span />{c.pricingTag}</p><h2>{c.pricingTitle}</h2><p>{c.pricingText}</p></div>
      <div className="pricing-preview-grid">
        {(['founding', 'club', 'event'] as const).map((id, index) => <article className={`price-preview-card ${index === 1 ? 'featured' : ''}`} key={id}>
          <p className="price-label">{plans[id].name[lang]}</p><div className="price-line"><strong>{plans[id].monthly}</strong><span>MAD</span></div>
          <p className="price-period">{id === 'event' ? (lang === 'fr' ? '/ événement' : '/ event') : c.monthly}</p>
          <p className="price-note">{index === 0 ? c.founding : index === 1 ? c.club : c.event}</p>
          <Link href={`/subscription/?plan=${id}`} className="price-link">{lang === 'fr' ? 'Choisir' : 'Choose'}<ArrowRight className="size-4" /></Link>
        </article>)}
      </div>
      <div className="mt-8 text-center"><Link href="/subscription/" className="button-secondary">{c.viewPlans}<ArrowRight className="size-4" /></Link></div>
    </section>

    <section className="section-shell border-t border-white/[.07]">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.65fr_1.35fr]"><div><p className="eyebrow"><span />{c.faqTag}</p><h2 className="section-title !text-4xl sm:!text-5xl">{c.faqTitle}</h2></div><div className="faq-list">{c.faqs.map(([question, answer], index) => <details key={question} open={index === 0}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></div>
    </section>

    <section className="final-cta"><div className="final-cta-grid" /><div className="relative z-10 mx-auto max-w-4xl"><p className="eyebrow justify-center"><span />{c.finalTag}</p><h2>{c.finalTitle}</h2><p>{c.finalText}</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><a className="button-primary" href={downloadUrl}>{c.download}<Download className="size-4" /></a><Link className="button-secondary" href="/guide/">{c.guide}<ArrowUpRight className="size-4" /></Link></div></div><ShieldCheck className="final-watermark" /></section>
  </main>;
}
