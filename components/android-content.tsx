'use client';

import Link from 'next/link';
import { AlertTriangle, ArrowUpRight, Check, Download, HardDrive, Network, ShieldCheck, Smartphone, Wifi } from 'lucide-react';
import { CopyButton } from './copy-button';
import { useLanguage } from '@/lib/i18n';
import { androidApkFilename, androidChecksum, androidChecksumUrl, androidDownloadUrl, androidReleaseUrl, androidVersion } from '@/lib/site';

const copy = {
  en: {
    eyebrow: 'ANDROID HOST · VALIDATION BUILD',
    title: 'Install TKD Scoring on Android.',
    intro: 'Use an Android phone as the local tournament host for the operator, judge, referee and public-display browsers. This package is provided for installation testing and feedback.',
    download: 'Download Android APK',
    guide: 'Windows installation guide',
    meta: `Android ${androidVersion} · universal ARM (32-bit + 64-bit) · Android 7.0+`,
    warningTitle: 'Validation only — not a production release.',
    warning: 'This APK is debug-signed and has not passed physical-phone, hotspot, background, battery, restart, backup/restore or venue-reliability validation. Do not use it as the only scoring system for a live event.',
    installTitle: '1. Install the APK',
    installIntro: `Install directly on the Android phone that will host the tournament. Version ${androidVersion} fixes the 0.1.1 “bundled Android runtime is incomplete” extraction error and makes the complete public scoreboard fit portrait, landscape and desktop screens. The universal APK includes 32-bit and 64-bit ARM runtimes; Android 6 and older are not supported. No Termux, Node installation, laptop or second server is required.`,
    installSteps: [
      'Tap Download Android APK above. If you are on Windows, you can instead copy the APK to the phone with a USB cable.',
      `On the phone, open Files or Downloads and tap ${androidApkFilename}.`,
      'If Android blocks the installation, allow Install unknown apps for the browser or file manager you are using, then tap Install.',
      'If Android reports a signature conflict with an earlier validation build, stop that host, back up and verify its data, uninstall the earlier validation build, then install this package.',
      'Open TKD Scoring and keep its foreground host notification visible while testing.',
      'Activate a valid device-bound license when prompted. A license issued for another phone or installation cannot be reused.',
    ],
    networkTitle: '2. Connect judges and displays',
    networkIntro: 'The Android phone hosts the local HTTP and WebSocket service. Scoring does not require Internet access, but every device must be on the same local network.',
    networkSteps: [
      'Router mode: connect the Android host and every judge/referee/display device to the same router Wi-Fi. Disable AP or client isolation if the router prevents device-to-device access.',
      'Hotspot mode: enable the Android phone hotspot and connect the other devices directly to it. Mobile data is not needed. Router mode and hotspot mode are alternatives; both are not required at once.',
      'Open HOST → Judge network / hotspot to see the current phone addresses. Never use 127.0.0.1 or localhost on another device.',
      'Generate a new pairing QR after changing networks or whenever the phone address changes. Test the exact phone and router before relying on them.',
    ],
    backupTitle: '3. Back up before moving or uninstalling',
    backupIntro: 'Tournament data and the device license live in private app storage. Android uninstall normally removes that storage.',
    backupSteps: [
      'Open HOST → Stop host and wait for the stopped state. Active timers are paused and persisted for operator confirmation.',
      'Choose HOST → Backup data (host stopped) and save the ZIP somewhere independent of the phone.',
      'Keep the ZIP private: it contains tournament data and the license/installation folder, not the runtime.',
      'To restore, stop the host, choose HOST → Restore data (host stopped), select the ZIP, then start the host and verify the tournament and license before scoring.',
      'Do not uninstall the only copy of event data. Backup/restore still needs an on-device validation pass.',
    ],
    verifyTitle: '4. Verify the download',
    verifyIntro: 'Check the SHA-256 value before installing. The linked release is marked as a validation prerelease, not a stable production release.',
    checksumLabel: 'Expected APK SHA-256',
    checksumFile: 'Download SHA-256 file',
    releaseNotes: 'Open validation release',
    checklistTitle: 'Before any operational use',
    checklist: [
      'Complete a full test match with operator, judges, referee and public display.',
      'Test router mode and hotspot mode separately with the actual devices.',
      'Test screen-off, backgrounding, battery policy, process restart and recovery.',
      'Complete a backup/restore round trip and verify the restored data and license.',
      'Wait for a production-signed release after physical validation before using Android at a venue.',
    ],
    back: 'Back to product',
  },
  fr: {
    eyebrow: 'HÔTE ANDROID · VERSION DE VALIDATION',
    title: 'Installer TKD Scoring sur Android.',
    intro: 'Utilisez un téléphone Android comme hôte local pour l’opérateur, les juges, l’arbitre et les écrans publics. Ce package est fourni pour tester l’installation et recueillir vos retours.',
    download: 'Télécharger l’APK Android',
    guide: 'Guide d’installation Windows',
    meta: `Android ${androidVersion} · ARM universel (32 bits + 64 bits) · Android 7.0+`,
    warningTitle: 'Validation uniquement — pas une version de production.',
    warning: 'Cet APK est signé avec une clé de débogage et n’a pas encore validé les tests sur téléphone, point d’accès, arrière-plan, batterie, redémarrage, sauvegarde/restauration ou gymnase. Ne l’utilisez pas comme unique système de scoring lors d’un événement.',
    installTitle: '1. Installer l’APK',
    installIntro: `Installez-le directement sur le téléphone Android qui hébergera le tournoi. La version ${androidVersion} corrige l’erreur d’extraction « bundled Android runtime is incomplete » de la version 0.1.1 et adapte tout le tableau de score public aux écrans en portrait, paysage et ordinateur. L’APK universel contient les runtimes ARM 32 bits et 64 bits ; Android 6 et les versions antérieures ne sont pas compatibles. Termux, Node, un ordinateur ou un second serveur ne sont pas nécessaires.`,
    installSteps: [
      'Touchez Télécharger l’APK Android ci-dessus. Sous Windows, vous pouvez aussi copier l’APK sur le téléphone avec un câble USB.',
      `Sur le téléphone, ouvrez Fichiers ou Téléchargements puis touchez ${androidApkFilename}.`,
      'Si Android bloque l’installation, autorisez Installer des applications inconnues pour le navigateur ou le gestionnaire de fichiers utilisé, puis touchez Installer.',
      'Si Android signale un conflit de signature avec une ancienne version de validation, arrêtez cet hôte, sauvegardez et vérifiez ses données, désinstallez l’ancienne version de validation, puis installez ce package.',
      'Ouvrez TKD Scoring et gardez la notification d’hôte au premier plan visible pendant les tests.',
      'Activez une licence valide liée à l’appareil lorsque demandé. Une licence délivrée pour un autre téléphone ou une autre installation ne peut pas être réutilisée.',
    ],
    networkTitle: '2. Connecter juges et écrans',
    networkIntro: 'Le téléphone Android héberge le service HTTP et WebSocket local. Le scoring ne nécessite pas Internet, mais tous les appareils doivent être sur le même réseau local.',
    networkSteps: [
      'Mode routeur : connectez l’hôte Android et tous les appareils juge/arbitre/écran au même Wi-Fi du routeur. Désactivez l’isolation AP ou clients si le routeur bloque la communication entre appareils.',
      'Mode point d’accès : activez le point d’accès du téléphone Android et connectez directement les autres appareils. Les données mobiles ne sont pas nécessaires. Les modes routeur et point d’accès sont des alternatives ; les deux ne sont pas nécessaires simultanément.',
      'Ouvrez HOST → Judge network / hotspot pour voir les adresses actuelles du téléphone. N’utilisez jamais 127.0.0.1 ou localhost sur un autre appareil.',
      'Générez un nouveau QR d’appairage après chaque changement de réseau ou d’adresse du téléphone. Testez le téléphone et le routeur réels avant de vous y fier.',
    ],
    backupTitle: '3. Sauvegarder avant de déplacer ou désinstaller',
    backupIntro: 'Les données du tournoi et la licence de l’appareil sont stockées dans l’espace privé de l’application. La désinstallation Android supprime normalement cet espace.',
    backupSteps: [
      'Ouvrez HOST → Stop host et attendez l’état arrêté. Les horloges actives sont mises en pause et enregistrées pour confirmation par l’opérateur.',
      'Choisissez HOST → Backup data (host stopped) et enregistrez le ZIP sur un support indépendant du téléphone.',
      'Gardez le ZIP privé : il contient les données du tournoi et le dossier licence/installation, pas le runtime.',
      'Pour restaurer, arrêtez l’hôte, choisissez HOST → Restore data (host stopped), sélectionnez le ZIP, puis démarrez l’hôte et vérifiez le tournoi et la licence avant le scoring.',
      'Ne désinstallez pas l’unique copie des données d’un événement. La sauvegarde/restauration doit encore être validée sur appareil.',
    ],
    verifyTitle: '4. Vérifier le téléchargement',
    verifyIntro: 'Vérifiez la valeur SHA-256 avant l’installation. La release liée est une préversion de validation, pas une release stable de production.',
    checksumLabel: 'SHA-256 attendu de l’APK',
    checksumFile: 'Télécharger le fichier SHA-256',
    releaseNotes: 'Ouvrir la release de validation',
    checklistTitle: 'Avant toute utilisation opérationnelle',
    checklist: [
      'Effectuez un match complet avec opérateur, juges, arbitre et écran public.',
      'Testez séparément les modes routeur et point d’accès avec les appareils réels.',
      'Testez l’extinction de l’écran, l’arrière-plan, la batterie, le redémarrage du processus et la récupération.',
      'Effectuez une sauvegarde/restauration complète et vérifiez les données et la licence restaurées.',
      'Attendez une release signée de production après validation physique avant d’utiliser Android dans un gymnase.',
    ],
    back: 'Retour au produit',
  },
};

export function AndroidContent() {
  const { lang } = useLanguage();
  const c = copy[lang];
  return <main className="guide-page">
    <section className="page-hero">
      <div className="mx-auto max-w-[1440px]">
        <p className="eyebrow"><span />{c.eyebrow}</p>
        <h1>{c.title}</h1>
        <p>{c.intro}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a className="button-primary" href={androidDownloadUrl}>{c.download}<Download className="size-4" /></a>
          <Link className="button-secondary" href="/guide/">{c.guide}<ArrowUpRight className="size-4" /></Link>
        </div>
        <p className="mt-4 text-[10px] font-medium uppercase tracking-[.14em] text-white/35">{c.meta}</p>
      </div>
    </section>

    <div className="mx-auto max-w-[1100px] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
      <div className="guide-note mb-14" role="note"><AlertTriangle className="size-4" /><p><strong className="text-white">{c.warningTitle}</strong><br />{c.warning}</p></div>

      <section className="guide-section">
        <div className="guide-section-icon"><Download /></div>
        <div className="min-w-0 flex-1"><h2>{c.installTitle}</h2><p className="guide-intro">{c.installIntro}</p><ol>{c.installSteps.map((step, index) => <li key={step}><span>{index + 1}</span><p>{step}</p></li>)}</ol></div>
      </section>

      <section className="guide-section">
        <div className="guide-section-icon"><Network /></div>
        <div className="min-w-0 flex-1"><h2>{c.networkTitle}</h2><p className="guide-intro">{c.networkIntro}</p><ol>{c.networkSteps.map((step, index) => <li key={step}><span>{index + 1}</span><p>{step}</p></li>)}</ol><div className="guide-note"><Wifi className="size-4" /><p>{lang === 'fr' ? 'Le mode routeur et le mode point d’accès ne doivent pas être utilisés simultanément pour faire fonctionner le système.' : 'Router mode and hotspot mode are alternatives; simultaneous operation is not required.'}</p></div></div>
      </section>

      <section className="guide-section">
        <div className="guide-section-icon"><HardDrive /></div>
        <div className="min-w-0 flex-1"><h2>{c.backupTitle}</h2><p className="guide-intro">{c.backupIntro}</p><ol>{c.backupSteps.map((step, index) => <li key={step}><span>{index + 1}</span><p>{step}</p></li>)}</ol></div>
      </section>

      <section className="guide-section">
        <div className="guide-section-icon"><ShieldCheck /></div>
        <div className="min-w-0 flex-1"><h2>{c.verifyTitle}</h2><p className="guide-intro">{c.verifyIntro}</p><div className="code-block"><div className="code-label"><span>{c.checksumLabel}</span><CopyButton value={androidChecksum} /></div><code>{androidChecksum}</code></div><div className="mt-5 flex flex-wrap gap-4 text-xs"><a href={androidChecksumUrl} className="inline-flex items-center gap-2 text-electric hover:text-white">{c.checksumFile}<Download className="size-3.5" /></a><a href={androidReleaseUrl} className="inline-flex items-center gap-2 text-electric hover:text-white">{c.releaseNotes}<ArrowUpRight className="size-3.5" /></a></div></div>
      </section>

      <section className="guide-section">
        <div className="guide-section-icon"><Smartphone /></div>
        <div className="min-w-0 flex-1"><h2>{c.checklistTitle}</h2><ul>{c.checklist.map((item) => <li key={item}><Check /><p>{item}</p></li>)}</ul></div>
      </section>

      <Link className="button-secondary" href="/">{c.back}<ArrowUpRight className="size-4" /></Link>
    </div>
  </main>;
}
