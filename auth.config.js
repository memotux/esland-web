import Github from '@auth/core/providers/github'
import { defineConfig } from 'auth-astro'

export default defineConfig({
  providers: [
    Github({
      clientId: import.meta.env.GITHUB_CLIENT_ID,
      clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
    }),
  ],
})
