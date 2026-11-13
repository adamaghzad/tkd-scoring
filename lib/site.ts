export const siteUrl = 'https://adamaghzad.github.io/tkd-scoring';
export const basePath = process.env.NODE_ENV === 'production' ? '/tkd-scoring' : '';
export function asset(path: string) { return `${basePath}${path}`; }
export const appUrl = 'https://p01--tkd-scoring--krbhnw2hlgh6.code.run';
export const desktopVersion = '1.2.8';
export const releaseUrl = `https://github.com/adamaghzad/TKDtech/releases/tag/desktop-v${desktopVersion}`;
export const downloadUrl = `https://github.com/adamaghzad/TKDtech/releases/download/desktop-v${desktopVersion}/TKD-Scoring-Windows-x64.zip`;
export const checksumUrl = `${downloadUrl}.sha256`;
export const checksum = '9516f070a0ff1e9958ef3b989fc8cc8ed90b539dee8532396554111ead297882';
export const androidVersion = '0.1.9-validation';
export const androidApkFilename = 'TKD-Scoring-Android-universal-validation-debug.apk';
export const androidReleaseUrl = `https://github.com/adamaghzad/TKDtech/releases/tag/android-v${androidVersion}`;
export const androidDownloadUrl = `https://github.com/adamaghzad/TKDtech/releases/download/android-v${androidVersion}/${androidApkFilename}`;
export const androidChecksumUrl = `${androidDownloadUrl}.sha256`;
export const androidChecksum = 'f8db0e9c7ee81a29b2e681c43984adc1ce08755f0fa0aeccfbb90e47c8cbde1c';
export const salesEmail = 'adam.aghzaf@gmail.com';
export const salesWhatsApp = '212614192699';

export function whatsappUrl(message: string) {
  return `https://wa.me/${salesWhatsApp}?text=${encodeURIComponent(message)}`;
}

export function emailUrl(subject: string, message: string) {
  return `mailto:${salesEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
}
