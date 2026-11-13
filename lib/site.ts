export const siteUrl = 'https://adamaghzad.github.io/tkd-scoring';
export const basePath = process.env.NODE_ENV === 'production' ? '/tkd-scoring' : '';
export function asset(path: string) { return `${basePath}${path}`; }
export const appUrl = 'https://p01--tkd-scoring--krbhnw2hlgh6.code.run';
export const desktopVersion = '1.2.10';
export const releaseUrl = `https://github.com/adamaghzad/TKDtech/releases/tag/desktop-v${desktopVersion}`;
export const downloadUrl = `https://github.com/adamaghzad/TKDtech/releases/download/desktop-v${desktopVersion}/TKD-Scoring-Windows-x64.zip`;
export const checksumUrl = `${downloadUrl}.sha256`;
export const checksum = 'b8e80709d23eafe9cc9a94ae9125b01a07ae7ad59167307d7593760eb2dbb0f8';
export const androidVersion = '0.1.11-validation';
export const androidApkFilename = 'TKD-Scoring-Android-universal-validation-debug.apk';
export const androidReleaseUrl = `https://github.com/adamaghzad/TKDtech/releases/tag/android-v${androidVersion}`;
export const androidDownloadUrl = `https://github.com/adamaghzad/TKDtech/releases/download/android-v${androidVersion}/${androidApkFilename}`;
export const androidChecksumUrl = `${androidDownloadUrl}.sha256`;
export const androidChecksum = '6262223f6a8ad9f923225a104d8a63e29dd91ed758a90dcd1be46acf54728366';
export const salesEmail = 'adam.aghzaf@gmail.com';
export const salesWhatsApp = '212614192699';

export function whatsappUrl(message: string) {
  return `https://wa.me/${salesWhatsApp}?text=${encodeURIComponent(message)}`;
}

export function emailUrl(subject: string, message: string) {
  return `mailto:${salesEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
}
