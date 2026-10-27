import path from 'node:path';
import { fileURLToPath } from 'node:url';

/** @type {import('next').NextConfig} */
const config = {
  turbopack: { root: path.dirname(fileURLToPath(import.meta.url)) },
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '/tkd-scoring' : '',
  images: { unoptimized: true },
  poweredByHeader: false,
};
export default config;
