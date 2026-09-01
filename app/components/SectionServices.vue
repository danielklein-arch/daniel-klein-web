<script setup lang="ts">
const services = [
  {
    icon: 'i-lucide-code-2',
    title: 'Webový vývoj',
    description: 'Moderní webové aplikace a stránky na míru. Vue.js, Nuxt, TypeScript, Node.js — vyberu to nejlepší pro váš projekt.',
    features: ['SPA & SSR aplikace', 'REST API', 'Responzivní design'],
    status: 'panel--accent',
  },
  {
    icon: 'i-lucide-cloud',
    title: 'Cloud & DevOps',
    description: 'Cloudová infrastruktura na Cloudflare, CI/CD pipeline a automatizace. Moderní serverless přístup pro spolehlivý provoz.',
    features: ['Cloudflare Workers & Pages', 'Docker & CI/CD', 'Serverless architektury'],
    status: 'panel--ok',
  },
  {
    icon: 'i-lucide-shield-check',
    title: 'IT Konzultace',
    description: 'Pomůžu vám vybrat správné technologie, navrhnout architekturu a optimalizovat stávající řešení.',
    features: ['Audit & analýza', 'Výběr technologií', 'Bezpečnostní doporučení'],
    status: 'panel--plan',
  },
  {
    icon: 'i-lucide-database',
    title: 'Databáze & Data',
    description: 'Návrh, optimalizace a správa databázových systémů. Od relačních databází po moderní NoSQL řešení.',
    features: ['SQLite & Firebase', 'Optimalizace dotazů', 'Migrace dat'],
    status: 'panel--warn',
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
      <div class="grid sm:grid-cols-2 gap-4">
        <div
          v-for="(service, index) in services"
          :key="service.title"
          v-reveal="{ delay: index * 100 }"
          :class="['panel group relative p-7 hover:bg-(--dk-panel-hover) hover:-translate-y-0.5 transition-all duration-150', service.status]">
          <!-- Number -->
          <span class="absolute top-6 right-7 text-[0.66rem] tracking-[0.14em] text-(--dk-dim) select-none">
            {{ String(index + 1).padStart(2, '0') }}
          </span>

          <!-- Icon -->
          <div class="w-11 h-11 rounded-[4px] bg-(--dk-panel-hover) border border-(--dk-line) flex items-center justify-center mb-6">
            <UIcon
              :name="service.icon"
              class="w-5 h-5 text-(--dk-accent)"/>
          </div>

          <h3 class="text-base font-semibold text-(--dk-ink) mb-3">
            {{ service.title }}
          </h3>

          <p class="text-[0.82rem] text-(--dk-dim) mb-5 leading-relaxed">
            {{ service.description }}
          </p>

          <!-- Features -->
          <ul class="space-y-2 pt-4 hairline-dashed">
            <li
              v-for="feature in service.features"
              :key="feature"
              class="flex items-center gap-2 text-[0.8rem] text-(--dk-ink)">
              <UIcon
                name="i-lucide-check"
                class="w-3.5 h-3.5 text-(--dk-ok) shrink-0"/>
              {{ feature }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
