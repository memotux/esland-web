import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import vercel from '@astrojs/vercel/serverless'
import preact from '@astrojs/preact'
import vue from '@astrojs/vue'
import auth from 'auth-astro'

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    preact(),
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('masonry-'),
        },
      },
    }),
    auth(),
  ],
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en', 'ca'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  output: 'server',
  adapter: vercel(),
})
