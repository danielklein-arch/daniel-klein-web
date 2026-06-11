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
      <SectionHeading
        index="02"
        label="Služby"
        title="Co pro vás mohu udělat"
        description="Komplexní IT služby od návrhu po realizaci. Každý projekt řeším individuálně s důrazem na kvalitu."/>

      <!-- Services grid -->
      <div class="grid sm:grid-cols-2 gap-6">
        <div
          v-for="(service, index) in services"
          :key="service.title"
          v-reveal="{ delay: index * 100 }"
          class="group relative rounded-2xl bg-white dark:bg-dk-surface/80 border border-slate-200 dark:border-slate-700/50 p-8 hover:border-cyan-400/60 dark:hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1 transition-all duration-300">
          <!-- Number -->
          <span class="absolute top-6 right-8 font-display font-bold text-4xl text-slate-100 dark:text-slate-800 group-hover:text-cyan-100 dark:group-hover:text-cyan-950 transition select-none">
            {{ String(index + 1).padStart(2, '0') }}
          </span>

          <!-- Icon -->
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/60 dark:to-cyan-950/40 flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
            <UIcon
              :name="service.icon"
              class="w-6 h-6 text-blue-600 dark:text-cyan-400"/>
          </div>

          <h3 class="text-xl font-display font-semibold text-slate-900 dark:text-white mb-3">
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
                class="w-4 h-4 text-cyan-500 shrink-0"/>
              {{ feature }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
