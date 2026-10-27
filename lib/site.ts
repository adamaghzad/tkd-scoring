export const siteUrl = 'https://adamaghzad.github.io/tkd-scoring';
export const basePath = process.env.NODE_ENV === 'production' ? '/tkd-scoring' : '';
export function asset(path: string) { return `${basePath}${path}`; }
export const appUrl = 'https://p01--tkd-scoring--krbhnw2hlgh6.code.run';
export const releaseUrl = 'https://github.com/adamaghzad/TKDtech/releases/tag/desktop-v1.0.1';
export const downloadUrl = 'https://github.com/adamaghzad/TKDtech/releases/download/desktop-v1.0.1/TKD-Scoring-Windows-x64.zip';
export const checksumUrl = `${downloadUrl}.sha256`;
export const checksum = 'bddfe3325b882f7a999f810fd75daac59113671d31cd78e494e9d448c647034e';
export const salesEmail = 'adam.aghzaf@gmail.com';
export const salesWhatsApp = '212614192699';

export function whatsappUrl(message: string) {
  return `https://wa.me/${salesWhatsApp}?text=${encodeURIComponent(message)}`;
}

export function emailUrl(subject: string, message: string) {
  return `mailto:${salesEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
}
