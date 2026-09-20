import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { DEFAULT_IMAGE_URL } from './src/default-image';

export default defineConfig({
  plugins: [
    preact(),
    {
      name: 'preload-default-icon',
      transformIndexHtml() {
        return [
          {
            tag: 'link',
            attrs: { rel: 'preload', as: 'image', href: DEFAULT_IMAGE_URL },
            injectTo: 'head',
          },
        ];
      },
    },
  ],
});
