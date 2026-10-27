import { defineConfig } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypeScript from 'eslint-config-next/typescript';
export default defineConfig([
  { ignores: ['**/node_modules/**', '**/.next/**', '**/out/**', '**/coverage/**', '**/playwright-report/**', '**/test-results/**', 'next-env.d.ts'] },
  ...nextVitals,
  ...nextTypeScript,
  { rules: { '@next/next/no-img-element': 'off' } },
]);
