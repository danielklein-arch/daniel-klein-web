<script setup lang="ts">
const projects = [
  {
    title: 'ModuLabs',
    domain: 'modulabs.cz',
    url: 'https://modulabs.cz',
    role: 'Brand web & připravovaný e-shop',
    description: 'Dvojjazyčný brand web pro českého výrobce standardizovaných rostlinných tinktur. Produktové detaily, laboratorní galerie, SSR rendering — vše na Cloudflare Workers.',
    tags: ['Nuxt 4', 'TypeScript', 'Cloudflare Workers', 'SSR'],
    image: '/projects/modulabs.jpg',
  },
]
</script>

<template>
  <section
    id="projects"
    class="py-24 sm:py-32">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading
        index="03"
        label="Projekty"
        title="Vybraná práce"
        description="Reálné projekty pro reálné klienty — od návrhu po provoz v produkci."/>

      <a
        v-for="project in projects"
        :key="project.title"
        v-reveal
        :href="project.url"
        target="_blank"
        rel="noopener"
        class="panel panel--ok group block overflow-hidden hover:bg-(--dk-panel-hover) hover:-translate-y-0.5 transition-all duration-150">
        <!-- Header bar -->
        <div class="flex items-center gap-2.5 px-5 py-3 border-b border-(--dk-line)">
          <span class="dot text-(--dk-ok)"/>
          <span class="text-xs text-(--dk-dim) truncate">{{ project.domain }}</span>
          <span class="chip text-(--dk-ok) ml-2 hidden sm:inline-flex">LIVE</span>
          <UIcon
            name="i-lucide-arrow-up-right"
            class="w-4 h-4 ml-auto text-(--dk-dim) group-hover:text-(--dk-accent) group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition"/>
        </div>

        <div class="grid lg:grid-cols-2">
          <!-- Content -->
          <div class="p-7 lg:p-8 order-2 lg:order-1">
            <p class="text-[0.66rem] font-medium tracking-[0.14em] uppercase text-(--dk-accent) mb-2.5">
              {{ project.role }}
            </p>
            <h3 class="text-xl font-semibold text-(--dk-ink) mb-3">
              {{ project.title }}
            </h3>
            <p class="text-[0.82rem] text-(--dk-dim) mb-6 leading-relaxed">
              {{ project.description }}
            </p>
            <div class="flex flex-wrap gap-2 text-(--dk-dim)">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="chip">
                {{ tag }}
              </span>
            </div>
          </div>

          <!-- Screenshot -->
          <div class="order-1 lg:order-2 lg:border-l border-b lg:border-b-0 border-(--dk-line) overflow-hidden">
            <img
              :src="project.image"
              :alt="`${project.title} — náhled webu`"
              loading="lazy"
              width="1200"
              height="750"
              class="w-full h-full max-h-64 lg:max-h-none object-cover object-top">
          </div>
        </div>
      </a>
    </div>
  </section>
</template>
