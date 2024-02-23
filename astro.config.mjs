import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import auth from 'auth-astro'
import node from '@astrojs/node'
import vue from '@astrojs/vue'

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), vue({ jsx: true }), auth()],
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en', 'ca'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
})
