export const siteUrl = 'https://adamaghzad.github.io/tkd-scoring';
export const basePath = process.env.NODE_ENV === 'production' ? '/tkd-scoring' : '';
export function asset(path: string) { return `${basePath}${path}`; }
export const appUrl = 'https://p01--tkd-scoring--krbhnw2hlgh6.code.run';
export const desktopVersion = '1.2.11';
export const releaseUrl = `https://github.com/adamaghzad/TKDtech/releases/tag/desktop-v${desktopVersion}`;
export const downloadUrl = `https://github.com/adamaghzad/TKDtech/releases/download/desktop-v${desktopVersion}/TKD-Scoring-Windows-x64.zip`;
export const checksumUrl = `${downloadUrl}.sha256`;
export const checksum = '1987fea16d1ed202b7164ed13b8b4947a3f24e2d2bea31ab3ab50134d8117e0a';
export const androidVersion = '0.1.12-validation';
export const androidApkFilename = 'TKD-Scoring-Android-universal-validation-debug.apk';
export const androidReleaseUrl = `https://github.com/adamaghzad/TKDtech/releases/tag/android-v${androidVersion}`;
export const androidDownloadUrl = `https://github.com/adamaghzad/TKDtech/releases/download/android-v${androidVersion}/${androidApkFilename}`;
export const androidChecksumUrl = `${androidDownloadUrl}.sha256`;
export const androidChecksum = '4e59802b33d07bba428f24bd7c0c91c4597838fb4a7b4af66f2dfde5d29d12fd';
export const salesEmail = 'adam.aghzaf@gmail.com';
export const salesWhatsApp = '212614192699';

export function whatsappUrl(message: string) {
  return `https://wa.me/${salesWhatsApp}?text=${encodeURIComponent(message)}`;
}

export function emailUrl(subject: string, message: string) {
  return `mailto:${salesEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
}
