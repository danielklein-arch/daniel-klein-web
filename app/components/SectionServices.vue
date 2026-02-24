<script setup lang="ts">
const services = [
  {
    icon: 'i-lucide-code-2',
    title: 'Webový vývoj',
    description: 'Moderní webové aplikace a stránky na míru. Vue.js, Nuxt, TypeScript, Node.js — vyberu to nejlepší pro váš projekt.',
    features: ['SPA & SSR aplikace', 'REST API', 'Responzivní design'],
  },
  {
    icon: 'i-lucide-cloud',
    title: 'Cloud & DevOps',
    description: 'Cloudová infrastruktura na Cloudflare, CI/CD pipeline a automatizace. Moderní serverless přístup pro spolehlivý provoz.',
    features: ['Cloudflare Workers & Pages', 'Docker & CI/CD', 'Serverless architektury'],
  },
  {
    icon: 'i-lucide-shield-check',
    title: 'IT Konzultace',
    description: 'Pomůžu vám vybrat správné technologie, navrhnout architekturu a optimalizovat stávající řešení.',
    features: ['Audit & analýza', 'Výběr technologií', 'Bezpečnostní doporučení'],
  },
  {
    icon: 'i-lucide-database',
    title: 'Databáze & Data',
    description: 'Návrh, optimalizace a správa databázových systémů. Od relačních databází po moderní NoSQL řešení.',
    features: ['SQLite & Firebase', 'Optimalizace dotazů', 'Migrace dat'],
  },
]
</script>

<template>
  <section
    id="services"
    class="py-24 sm:py-32">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center max-w-2xl mx-auto mb-16">
        <p class="text-sm font-medium text-blue-600 dark:text-blue-400 tracking-widest uppercase mb-4">
          Služby
        </p>
        <h2 class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          Co pro vás mohu udělat
        </h2>
        <p class="text-slate-500 dark:text-slate-400">
          Komplexní IT služby od návrhu po realizaci. Každý projekt řeším individuálně s důrazem na kvalitu.
        </p>
      </div>

      <!-- Services grid -->
      <div class="grid sm:grid-cols-2 gap-6">
        <div
          v-for="service in services"
          :key="service.title"
          class="group relative rounded-2xl bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 p-8 hover:border-blue-300 dark:hover:border-blue-700/50 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300">
          <!-- Icon -->
          <div class="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center mb-6 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition">
            <UIcon
              :name="service.icon"
              class="w-6 h-6 text-blue-600 dark:text-blue-400"/>
          </div>

          <h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-3">
            {{ service.title }}
          </h3>

          <p class="text-slate-500 dark:text-slate-400 mb-5 leading-relaxed text-sm">
            {{ service.description }}
          </p>

          <!-- Features -->
          <ul class="space-y-2">
            <li
              v-for="feature in service.features"
              :key="feature"
              class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              <UIcon
                name="i-lucide-check"
                class="w-4 h-4 text-blue-500 shrink-0"/>
              {{ feature }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
