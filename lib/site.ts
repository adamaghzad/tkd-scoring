export const siteUrl = 'https://adamaghzad.github.io/tkd-scoring';
export const basePath = process.env.NODE_ENV === 'production' ? '/tkd-scoring' : '';
export function asset(path: string) { return `${basePath}${path}`; }
export const appUrl = 'https://p01--tkd-scoring--krbhnw2hlgh6.code.run';
export const desktopVersion = '1.2.2';
export const releaseUrl = `https://github.com/adamaghzad/TKDtech/releases/tag/desktop-v${desktopVersion}`;
export const downloadUrl = `https://github.com/adamaghzad/TKDtech/releases/download/desktop-v${desktopVersion}/TKD-Scoring-Windows-x64.zip`;
export const checksumUrl = `${downloadUrl}.sha256`;
export const checksum = '35c531641ec8b5c79d7d12e96276e2bbce475cceb6406f6f9251bcc141a994b0';
export const androidVersion = '0.1.3-validation';
export const androidApkFilename = 'TKD-Scoring-Android-universal-validation-debug.apk';
export const androidReleaseUrl = `https://github.com/adamaghzad/TKDtech/releases/tag/android-v${androidVersion}`;
export const androidDownloadUrl = `https://github.com/adamaghzad/TKDtech/releases/download/android-v${androidVersion}/${androidApkFilename}`;
export const androidChecksumUrl = `${androidDownloadUrl}.sha256`;
export const androidChecksum = '6b62b982c646d06045b0575c9eaaa991360f6425e5ecc10b2bc58f2617f14cc3';
export const salesEmail = 'adam.aghzaf@gmail.com';
export const salesWhatsApp = '212614192699';

export function whatsappUrl(message: string) {
  return `https://wa.me/${salesWhatsApp}?text=${encodeURIComponent(message)}`;
}

export function emailUrl(subject: string, message: string) {
  return `mailto:${salesEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
}
