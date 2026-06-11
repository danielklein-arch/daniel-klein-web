export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxt/fonts', '@nuxt/icon', '@nuxt/eslint'],

  app: {
    head: {
      title: 'Daniel Klein — IT Specialist',
      meta: [
        { name: 'description', content: 'Daniel Klein — IT Specialist. Web development, infrastruktura a IT řešení na míru.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { property: 'og:title', content: 'Daniel Klein — IT Specialist' },
        { property: 'og:description', content: 'Web development, infrastruktura a IT řešení na míru.' },
        { property: 'og:url', content: 'https://kleindaniel.com' },
        { property: 'og:image', content: 'https://kleindaniel.com/og-image.png' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
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
      { name: 'Clash Display', provider: 'fontshare', weights: [600, 700] },
      { name: 'General Sans', provider: 'fontshare', weights: [400, 500, 600, 700] },
    ],
  },
})
