export const siteUrl = 'https://adamaghzad.github.io/tkd-scoring';
export const basePath = process.env.NODE_ENV === 'production' ? '/tkd-scoring' : '';
export function asset(path: string) { return `${basePath}${path}`; }
export const appUrl = 'https://p01--tkd-scoring--krbhnw2hlgh6.code.run';
export const desktopVersion = '1.2.5';
export const releaseUrl = `https://github.com/adamaghzad/TKDtech/releases/tag/desktop-v${desktopVersion}`;
export const downloadUrl = `https://github.com/adamaghzad/TKDtech/releases/download/desktop-v${desktopVersion}/TKD-Scoring-Windows-x64.zip`;
export const checksumUrl = `${downloadUrl}.sha256`;
export const checksum = 'fac3b780dc2bdf118214f8e1efd7b5e3070987087df0583d002efa3becdde0b6';
export const androidVersion = '0.1.6-validation';
export const androidApkFilename = 'TKD-Scoring-Android-universal-validation-debug.apk';
export const androidReleaseUrl = `https://github.com/adamaghzad/TKDtech/releases/tag/android-v${androidVersion}`;
export const androidDownloadUrl = `https://github.com/adamaghzad/TKDtech/releases/download/android-v${androidVersion}/${androidApkFilename}`;
export const androidChecksumUrl = `${androidDownloadUrl}.sha256`;
export const androidChecksum = 'dadba4562f5cd3382736a0c2fb5545958e53923da6b18c7ac9b8cceea35d2023';
export const salesEmail = 'adam.aghzaf@gmail.com';
export const salesWhatsApp = '212614192699';

export function whatsappUrl(message: string) {
  return `https://wa.me/${salesWhatsApp}?text=${encodeURIComponent(message)}`;
}

export function emailUrl(subject: string, message: string) {
  return `mailto:${salesEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
}
