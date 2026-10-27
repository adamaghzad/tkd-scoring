import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: { extend: {
    colors: { ink: '#07090f', panel: '#0e121c', electric: '#76a7ff', lime: '#d7ff5f', coral: '#ff6472' },
    fontFamily: { sans: ['Inter', 'ui-sans-serif', 'Segoe UI', 'Arial', 'sans-serif'], display: ['Arial Narrow', 'Inter', 'ui-sans-serif', 'sans-serif'] },
  } },
  plugins: [],
};
export default config;
