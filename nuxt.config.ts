export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxt/fonts', '@nuxt/icon', '@nuxt/eslint'],

  app: {
    head: {
      title: 'Daniel Klein — IT Specialist',
      meta: [
        { name: 'description', content: 'Daniel Klein — IT Specialist. Web development, infrastruktura a IT řešení na míru.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      htmlAttrs: {
        lang: 'cs',
      },
    },
  },

  css: ['~/assets/css/main.css'],

  colorMode: {
    preference: 'system',
    fallback: 'dark',
  },

  compatibilityDate: '2025-01-01',

  nitro: {
    preset: 'cloudflare_module',
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  fonts: {
    families: [
      { name: 'Inter', provider: 'google', weights: [200, 300, 400, 500, 600, 700, 800] },
    ],
  },
})
