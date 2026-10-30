'use client';

import Link from 'next/link';
import { BookOpen, Check, ClipboardCheck, Download, HardDrive, ListChecks, MonitorDown, Network, Play, Printer, Search, Settings2, ShieldCheck, Smartphone, Trophy, WifiOff, Wrench } from 'lucide-react';
import { useMemo, useState } from 'react';
import { CopyButton } from './copy-button';
import { useLanguage } from '@/lib/i18n';
import { checksum, checksumUrl, desktopVersion, downloadUrl, releaseUrl } from '@/lib/site';

interface Section {
  id: string;
  title: string;
  intro: string;
  steps?: string[];
  bullets?: string[];
  code?: string;
  codeLabel?: string;
  note?: string;
}

const icons = [MonitorDown, Download, Play, Trophy, Smartphone, Settings2, HardDrive, Wrench, ClipboardCheck];

function sections(lang: 'en' | 'fr'): Section[] {
  const fr = lang === 'fr';
  return [
    {
      id: 'requirements',
      title: fr ? '1. Ce qu’il vous faut' : '1. What you need',
      intro: fr ? 'Le système desktop fonctionne sans installation de Node.js et sans Internet au gymnase.' : 'The desktop system runs without a Node.js installation and without venue Internet.',
      bullets: fr ? [
        'Un ordinateur Windows 10 ou 11, version x64.',
        'Un réseau Wi-Fi local : routeur ou point d’accès acceptant la communication entre appareils.',
        'Un ou plusieurs téléphones avec un navigateur moderne pour les juges et l’arbitre.',
        'Un écran supplémentaire en option pour le public.',
        `Le package TKD Scoring v${desktopVersion} et suffisamment d’espace pour l’extraire complètement.`,
      ] : [
        'A Windows 10 or 11 x64 computer.',
        'A local Wi-Fi network: a router or hotspot that allows client-to-client communication.',
        'One or more phones with a modern browser for judges and the referee.',
        'An optional external display for spectators.',
        `The TKD Scoring v${desktopVersion} package and enough space to extract it completely.`,
      ],
      note: fr ? 'Le logiciel ne fournit pas de scoring par capteurs/PSS. Les juges saisissent les points depuis leurs appareils.' : 'This is not sensor/PSS scoring hardware. Judges enter scoring input from their devices.',
    },
    {
      id: 'download',
      title: fr ? '2. Télécharger et vérifier' : '2. Download and verify',
      intro: fr ? 'Utilisez uniquement la page officielle ou la release GitHub liée sur ce site.' : 'Use only the official download page or the GitHub release linked from this site.',
      steps: fr ? [
        'Téléchargez le ZIP Windows x64 et, si souhaité, son fichier SHA-256 séparé.',
        'Vérifiez le hash avec certutil dans un terminal Windows.',
        'Faites un clic droit sur le ZIP puis « Extraire tout ». Ne lancez pas l’EXE depuis l’archive.',
      ] : [
        'Download the Windows x64 ZIP and, optionally, its separate SHA-256 file.',
        'Verify the hash with certutil in a Windows terminal.',
        'Right-click the ZIP and choose “Extract All”. Do not run the EXE from inside the archive.',
      ],
      code: 'certutil -hashfile TKD-Scoring-Windows-x64.zip SHA256',
      codeLabel: `SHA-256 · v${desktopVersion}`,
      note: `${fr ? 'Hash attendu' : 'Expected hash'}: ${checksum}`,
    },
    {
      id: 'first-run',
      title: fr ? '3. Premier démarrage' : '3. First run',
      intro: fr ? 'Le lanceur démarre Express, Next.js, SQLite et les WebSockets comme un seul système.' : 'The launcher starts Express, Next.js, SQLite and WebSockets as one system.',
      steps: fr ? [
        'Ouvrez le dossier extrait et lancez « TKD Scoring.exe ».',
        'Si Windows affiche un avertissement éditeur inconnu, vérifiez la provenance et le hash du package. Cette version n’est pas signée.',
        'La page Activation affiche un code d’installation. Copiez-le et envoyez-le avec votre demande via la page Abonnement.',
        'Après confirmation du paiement, vous recevez un fichier .tkdlicense signé pour cet ordinateur. Importez-le dans Activation.',
        'Une licence falsifiée, expirée ou destinée à un autre PC est refusée. Après une activation valide, le scoring LAN reste hors ligne.',
        'Autorisez Node.js / node.exe sur les réseaux privés lorsque le pare-feu le demande.',
        'Attendez l’ouverture de l’opérateur. Ctrl+Shift+L affiche l’état local, les adresses LAN, les données et les logs.',
        'Créez le premier compte administrateur avec un mot de passe unique.',
      ] : [
        'Open the extracted folder and run “TKD Scoring.exe”.',
        'If Windows shows an unknown-publisher warning, verify the package source and hash. This build is unsigned.',
        'The Activation page shows an installation code. Copy it and send it with your request through the Subscription page.',
        'After payment confirmation, you receive a signed .tkdlicense file for that computer. Import it on the Activation page.',
        'A tampered, expired or wrong-device license is rejected. After valid activation, LAN scoring remains offline.',
        'Allow Node.js / node.exe on Private networks when the firewall asks.',
        'Wait for the operator window. Ctrl+Shift+L opens local status, LAN addresses, data and logs.',
        'Create the initial administrator account with a unique password.',
      ],
      note: fr ? 'Le téléchargement est gratuit ; le travail de tournoi exige une licence payante valide. Les ports 3000 et 3001 doivent être libres, et les appareils utilisent uniquement le port 3000.' : 'The download is free; tournament work requires a valid paid license. Ports 3000 and 3001 must be free, and venue devices use port 3000 only.',
    },
    {
      id: 'tournament',
      title: fr ? '4. Construire le tournoi' : '4. Build the tournament',
      intro: fr ? 'Préparez les données dans l’ordre pour que les inscriptions et tableaux restent cohérents.' : 'Prepare records in order so entries and brackets remain consistent.',
      steps: fr ? [
        'Créez le tournoi : nom, lieu, dates et nombre de tapis.',
        'Ajoutez ou importez les clubs, puis les catégories.',
        'Ajoutez ou importez les athlètes et vérifiez leur affectation aux catégories.',
        'Configurez les règles du tournoi avant l’activation des matchs.',
        'Générez et publiez les tirages, puis planifiez les matchs sur les tapis.',
        'Faites un match d’essai complet avant l’arrivée des athlètes.',
      ] : [
        'Create the tournament: name, venue, dates and mat count.',
        'Add or import clubs, then categories.',
        'Add or import athletes and verify their category assignments.',
        'Configure tournament rules before matches become active.',
        'Generate and publish draws, then schedule matches on the mats.',
        'Run one complete test match before athletes arrive.',
      ],
    },
    {
      id: 'pairing',
      title: fr ? '5. Connecter juges et arbitre' : '5. Connect judges and referee',
      intro: fr ? 'Le PC et tous les appareils doivent utiliser le même réseau local.' : 'The PC and every device must use the same local network.',
      steps: fr ? [
        'Dans Windows, définissez le profil du réseau sur « Privé ».',
        'Sur le téléphone, gardez le Wi-Fi actif et désactivez temporairement les données mobiles et le VPN pour le test.',
        'Depuis la gestion des juges, créez un QR pour chaque rôle et scannez-le avec le bon appareil.',
        'Si l’adresse IP du PC change, redémarrez l’application et générez un nouveau QR.',
        'Testez d’abord la page de santé sur le téléphone, sans le chemin /judge/....',
      ] : [
        'In Windows, set the active network profile to “Private”.',
        'On the phone, keep Wi-Fi enabled and temporarily disable mobile data and VPN for testing.',
        'From judge management, issue a QR code for each role and scan it with the intended device.',
        'If the PC IP address changes, restart the app and issue a new QR code.',
        'Test the health page on the phone first, without the /judge/... path.',
      ],
      code: 'http://PC-IP:3000/api/v1/health',
      codeLabel: fr ? 'Remplacez PC-IP par l’adresse IPv4 actuelle du PC' : 'Replace PC-IP with the PC’s current IPv4 address',
      note: fr ? '« Pas de connexion Internet » sur le Wi-Fi peut être normal. Le téléphone doit seulement atteindre le PC.' : '“No internet connection” on Wi-Fi can be normal. The phone only needs to reach the PC.',
    },
    {
      id: 'scoring',
      title: fr ? '6. Conduire un match' : '6. Run a match',
      intro: fr ? 'Le serveur reste la référence pour les points, le temps, le consensus et les transitions.' : 'The server remains authoritative for points, timing, consensus and transitions.',
      bullets: fr ? [
        'Valeurs par défaut : poing +1, corps +2, tête +3, corps retourné +4 et tête retournée +6 ; vérifiez la configuration de votre événement.',
        'Avec plusieurs juges, les propositions attendent le consensus configuré. Les confirmations sont visibles sur l’affichage.',
        'L’arbitre contrôle le temps et les commandes autorisées ; les juges ne peuvent pas modifier directement le score accepté.',
        'Les corrections nécessitent une autorisation et un motif, puis restent dans l’audit.',
        'Les points affichés pendant le jeu sont ceux de la reprise courante. Les reprises gagnées apparaissent pendant le repos.',
        'Le résultat final est publié après la transition autorisée du match.',
        'Public TV ouvre l’affichage du tapis dans une fenêtre séparée sans fermer la page opérateur. En plein écran, tous les contrôles superposés sont masqués.',
        'M coupe/rétablit le son, F inverse les côtés, F11 active/quitte le plein écran et Échap en sort. Après un résultat, W affiche/masque l’écran d’attente ; la reprise d’un match réel restaure automatiquement le score.',
      ] : [
        'Default values: punch +1, body +2, head +3, turning body +4 and turning head +6; verify your event configuration.',
        'With multiple judges, proposals wait for the configured consensus. Confirmations remain visible on the display.',
        'The referee controls authorized timing and commands; judges cannot directly change an accepted score.',
        'Corrections require authorization and a reason, then remain in the audit trail.',
        'Points shown during play belong to the current round. Round wins appear during rest.',
        'The final result is published after the authorized match transition.',
        'Public TV opens the mat display in a separate window without closing the operator page. Fullscreen hides every overlay control.',
        'M toggles sound, F flips the sides, F11 toggles fullscreen and Esc exits. After a result, W toggles the waiting screen; an authoritative live match automatically restores the scoreboard.',
      ],
    },
    {
      id: 'data',
      title: fr ? '7. Données et sauvegarde' : '7. Data and backup',
      intro: fr ? 'Le mode desktop conserve les données dans le profil Windows de l’utilisateur.' : 'Desktop mode persists data inside the Windows user profile.',
      steps: fr ? [
        'Fermez complètement TKD Scoring avant une sauvegarde manuelle.',
        'Copiez tout le dossier de données vers un support indépendant.',
        'Testez régulièrement la restauration ; une sauvegarde non testée n’est pas une garantie.',
        'Après une coupure inattendue, vérifiez les matchs et horloges récupérés avant de reprendre.',
        'Conservez aussi le dossier de licence séparé des données. Ne partagez pas votre fichier de licence : il est lié à l’ordinateur.',
      ] : [
        'Close TKD Scoring completely before a manual backup.',
        'Copy the entire data folder to independent storage.',
        'Test restoration regularly; an untested backup is not a guarantee.',
        'After an unexpected shutdown, inspect recovered matches and clocks before resuming.',
        'Keep the separate license folder as well. Do not share your license file: it is bound to the computer.',
      ],
      code: '%APPDATA%\\TKD Scoring\\data',
      codeLabel: fr ? 'Dossier de données desktop' : 'Desktop data folder',
      note: fr ? 'Remplacer le dossier portable ne supprime pas intentionnellement cette base. Ne supprimez jamais le dossier de données pendant une mise à jour.' : 'Replacing the portable folder does not intentionally delete this database. Never delete the data folder during an update.',
    },
    {
      id: 'troubleshooting',
      title: fr ? '8. Résoudre un timeout téléphone' : '8. Fix a phone timeout',
      intro: fr ? 'ERR_CONNECTION_TIMED_OUT signifie que le téléphone n’atteint pas le serveur. Ce n’est pas une erreur de QR ou d’UUID.' : 'ERR_CONNECTION_TIMED_OUT means the phone cannot reach the server. It is not a QR or UUID error.',
      steps: fr ? [
        'Sur le PC, vérifiez http://127.0.0.1:3000/api/v1/health. Si elle échoue, consultez Ctrl+Shift+L → logs.',
        'Vérifiez l’IPv4 actuelle avec ipconfig. Un QR contenant une ancienne IP doit être remplacé.',
        'Testez la même adresse de santé avec l’IP du PC sur le téléphone.',
        'Passez le réseau Windows en « Privé » et autorisez node.exe ou créez une règle TCP 3000 entrante pour le profil Privé.',
        'Si le PC ouvre sa propre adresse LAN mais pas le téléphone, recherchez l’isolation AP/clients ou un réseau invité. Essayez un autre routeur ou point d’accès.',
      ] : [
        'On the PC, check http://127.0.0.1:3000/api/v1/health. If it fails, open Ctrl+Shift+L → logs.',
        'Check the current IPv4 address with ipconfig. Replace a QR containing an old IP.',
        'Test the same health address using the PC IP on the phone.',
        'Set the Windows network to “Private” and allow node.exe, or create an inbound TCP 3000 rule for the Private profile.',
        'If the PC opens its own LAN address but the phone cannot, check AP/client isolation or a guest network. Try another router or hotspot.',
      ],
      code: 'New-NetFirewallRule -DisplayName "TKD Scoring LAN TCP 3000" -Direction Inbound -Action Allow -Protocol TCP -LocalPort 3000 -Profile Private',
      codeLabel: fr ? 'PowerShell administrateur · uniquement si la règle n’existe pas déjà' : 'Administrator PowerShell · only if this rule does not already exist',
      note: fr ? 'N’exposez jamais le port 3000 directement sur Internet. Le mode LAN est conçu pour un réseau local de confiance.' : 'Never expose port 3000 directly to the public Internet. LAN mode is for a trusted local network.',
    },
    {
      id: 'checklist',
      title: fr ? '9. Checklist avant l’événement' : '9. Pre-event checklist',
      intro: fr ? 'Faites cette répétition sur le matériel qui sera réellement utilisé.' : 'Rehearse on the exact hardware you will use.',
      bullets: fr ? [
        'Package et source vérifiés ; batterie PC et téléphones chargées.',
        'Licence valide activée sur le PC utilisé ; date de renouvellement vérifiée.',
        'Match d’essai avec tous les rôles, corrections, reprises et résultat final.',
        'Sauvegarde et restauration testées.',
        'Réseau et pare-feu validés avec chaque téléphone.',
        'QR régénérés après tout changement d’IP ou de réseau.',
        'Procédure de secours connue par l’opérateur et l’arbitre.',
        'Validation physique Windows et gymnase effectuée avant tout usage officiel.',
      ] : [
        'Package and source verified; PC and phones charged.',
        'Valid license activated on the event PC; renewal date checked.',
        'Test match with every role, corrections, rounds and final result.',
        'Backup and restoration tested.',
        'Network and firewall validated with every phone.',
        'QR codes regenerated after any IP or network change.',
        'Fallback procedure understood by the operator and referee.',
        'Physical Windows and venue validation completed before official use.',
      ],
    },
  ];
}

export function GuideContent() {
  const { lang } = useLanguage();
  const [query, setQuery] = useState('');
  const allSections = useMemo(() => sections(lang), [lang]);
  const filtered = allSections.filter((section) => `${section.title} ${section.intro} ${(section.steps ?? []).join(' ')} ${(section.bullets ?? []).join(' ')} ${section.code ?? ''} ${section.note ?? ''}`.toLowerCase().includes(query.toLowerCase()));
  const fr = lang === 'fr';
  return <main className="guide-page">
    <div className="guide-progress" />
    <section className="page-hero">
      <div className="mx-auto max-w-[1440px]"><p className="eyebrow"><span />{fr ? 'DOCUMENTATION PRATIQUE' : 'PRACTICAL DOCUMENTATION'}</p><h1>{fr ? 'Du téléchargement au premier match.' : 'From download to first match.'}</h1><p>{fr ? 'Un guide complet pour installer, préparer, connecter et exploiter TKD Scoring sur votre propre réseau local.' : 'A complete guide to installing, preparing, connecting and operating TKD Scoring on your own local network.'}</p>
        <div className="mt-7 flex flex-wrap gap-3"><a className="button-primary" href={downloadUrl}>{fr ? `Télécharger v${desktopVersion}` : `Download v${desktopVersion}`}<Download className="size-4" /></a><button className="button-secondary" type="button" onClick={() => window.print()}>{fr ? 'Imprimer le guide' : 'Print guide'}<Printer className="size-4" /></button></div>
      </div>
    </section>
    <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[270px_1fr] lg:px-12 lg:py-20">
      <aside className="guide-sidebar">
        <label className="guide-search"><Search className="size-4" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={fr ? 'Rechercher dans le guide' : 'Search the guide'} aria-label={fr ? 'Rechercher dans le guide' : 'Search the guide'} /></label>
        <nav aria-label={fr ? 'Sommaire du guide' : 'Guide contents'}>{filtered.map((section) => <a key={section.id} href={`#${section.id}`}>{section.title}</a>)}</nav>
        <div className="guide-help"><BookOpen className="size-5" /><p>{fr ? 'Besoin d’une installation guidée ?' : 'Need a guided setup?'}</p><Link href="/subscription/">{fr ? 'Voir l’assistance' : 'View support options'} →</Link></div>
      </aside>
      <div className="guide-content">
        {filtered.length === 0 && <div className="empty-state">{fr ? 'Aucune section ne correspond à cette recherche.' : 'No guide section matches this search.'}</div>}
        {filtered.map((section) => { const originalIndex = allSections.findIndex((item) => item.id === section.id); const Icon = icons[originalIndex]!; return <section id={section.id} className="guide-section" key={section.id}>
          <div className="guide-section-icon"><Icon /></div><div className="min-w-0 flex-1"><h2>{section.title}</h2><p className="guide-intro">{section.intro}</p>
            {section.steps && <ol>{section.steps.map((step, index) => <li key={step}><span>{index + 1}</span><p>{step}</p></li>)}</ol>}
            {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}><Check /><p>{bullet}</p></li>)}</ul>}
            {section.code && <div className="code-block"><div className="code-label"><span>{section.codeLabel}</span><CopyButton value={section.code} /></div><code>{section.code}</code></div>}
            {section.note && <div className="guide-note"><ShieldCheck className="size-4" /><p>{section.note}</p></div>}
            {section.id === 'download' && <div className="mt-5 flex flex-wrap gap-4 text-xs"><a href={checksumUrl} className="inline-flex items-center gap-2 text-electric hover:text-white">{fr ? 'Fichier SHA-256' : 'SHA-256 file'}<Download className="size-3.5" /></a><a href={releaseUrl} className="inline-flex items-center gap-2 text-electric hover:text-white">{fr ? 'Notes de version' : 'Release notes'}<Download className="size-3.5" /></a><Link href="/android/" className="inline-flex items-center gap-2 text-electric hover:text-white">{fr ? 'Installer Android (validation)' : 'Install Android (validation)'}<Smartphone className="size-3.5" /></Link><Link href="/subscription/" className="inline-flex items-center gap-2 text-electric hover:text-white">{fr ? 'Demander une licence' : 'Request a license'}<ShieldCheck className="size-3.5" /></Link></div>}
          </div>
        </section>; })}
        <div className="guide-complete"><ListChecks className="size-7" /><div><h3>{fr ? 'Votre système est prêt pour une répétition.' : 'Your system is ready for a rehearsal.'}</h3><p>{fr ? 'Choisissez votre formule, activez la licence, puis répétez un match complet avant l’événement.' : 'Choose your plan, activate the license, then rehearse a complete match before the event.'}</p><div className="mt-5 flex flex-wrap gap-3"><Link className="button-primary" href="/subscription/">{fr ? 'Voir les abonnements' : 'View subscriptions'}</Link><Link className="button-secondary" href="/">{fr ? 'Retour au produit' : 'Back to product'}</Link></div></div></div>
      </div>
    </div>
    <div className="guide-offline-note"><WifiOff className="size-4" />{fr ? 'Après une première visite, le shell du guide peut être conservé par le navigateur pour une consultation hors ligne.' : 'After your first visit, the guide shell can be cached by your browser for offline reading.'}<Network className="ml-2 size-4" /></div>
  </main>;
}
