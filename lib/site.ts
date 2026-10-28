export const siteUrl = 'https://adamaghzad.github.io/tkd-scoring';
export const basePath = process.env.NODE_ENV === 'production' ? '/tkd-scoring' : '';
export function asset(path: string) { return `${basePath}${path}`; }
export const appUrl = 'https://p01--tkd-scoring--krbhnw2hlgh6.code.run';
export const desktopVersion = '1.2.0';
export const releaseUrl = `https://github.com/adamaghzad/TKDtech/releases/tag/desktop-v${desktopVersion}`;
export const downloadUrl = `https://github.com/adamaghzad/TKDtech/releases/download/desktop-v${desktopVersion}/TKD-Scoring-Windows-x64.zip`;
export const checksumUrl = `${downloadUrl}.sha256`;
export const checksum = '18198c8cb373b045b0f6a055998e81dc4d6a7f338b8b829cd426b3a60b7b179c';
export const salesEmail = 'adam.aghzaf@gmail.com';
export const salesWhatsApp = '212614192699';

export function whatsappUrl(message: string) {
  return `https://wa.me/${salesWhatsApp}?text=${encodeURIComponent(message)}`;
}

export function emailUrl(subject: string, message: string) {
  return `mailto:${salesEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
}
