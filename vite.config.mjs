import { defineConfig } from 'vite';
import { extensions, classicEmberSupport, ember } from '@embroider/vite';
import { babel } from '@rollup/plugin-babel';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Use base path from environment variable for GitHub Pages deployment
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [
    classicEmberSupport(),
    ember(),
    // extra plugins here
    babel({
      babelHelpers: 'runtime',
      extensions,
    }),
    tailwindcss(),
  ],
});
