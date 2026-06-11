<script setup lang="ts">
const projects = [
  {
    title: 'ModuLabs',
    domain: 'modulabs.cz',
    url: 'https://modulabs.cz',
    role: 'Brand web & připravovaný e-shop',
    description: 'Dvojjazyčný brand web pro českého výrobce standardizovaných rostlinných tinktur. Produktové detaily, laboratorní galerie, SSR rendering — vše na Cloudflare Workers.',
    tags: ['Nuxt 4', 'TypeScript', 'Cloudflare Workers', 'SSR'],
    color: 'from-blue-500 to-cyan-500',
    image: '/projects/modulabs.jpg',
  },
  {
    title: 'Pampeliška',
    domain: 'pampeliska-ss.cz',
    url: 'https://pampeliska-ss.cz',
    role: 'Web & headless CMS na míru',
    description: 'Kompletní web pro neziskovou pečovatelskou službu včetně vlastního headless CMS — správa aktualit, týmu a kontaktů, formuláře přes Email Workers.',
    tags: ['Nuxt 4', 'SonicJS + Hono', 'Cloudflare D1 & R2', 'Email Workers'],
    color: 'from-cyan-500 to-blue-600',
    image: '/projects/pampeliska.jpg',
  },
]
</script>

<template>
  <section
    id="projects"
    class="py-24 sm:py-32 bg-slate-50/50 dark:bg-dk-surface/40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading
        index="03"
        label="Projekty"
        title="Vybraná práce"
        description="Reálné projekty pro reálné klienty — od návrhu po provoz v produkci."/>

      <div class="grid lg:grid-cols-12 gap-8 items-start">
        <component
          :is="project.url ? 'a' : 'div'"
          v-for="(project, index) in projects"
          :key="project.title"
          v-reveal="{ delay: index * 150 }"
          :href="project.url ?? undefined"
          :target="project.url ? '_blank' : undefined"
          :rel="project.url ? 'noopener' : undefined"
          :class="[
            'group block rounded-2xl overflow-hidden bg-white dark:bg-dk-surface/90 border border-slate-200 dark:border-slate-700/50 hover:border-cyan-400/60 dark:hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1.5 transition-all duration-300',
            index === 0 ? 'lg:col-span-7' : 'lg:col-span-5 lg:mt-20',
          ]">
          <!-- Browser chrome -->
          <div class="flex items-center gap-2 px-5 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-dk-bg/60">
            <span class="w-2.5 h-2.5 rounded-full bg-red-400/70"/>
            <span class="w-2.5 h-2.5 rounded-full bg-yellow-400/70"/>
            <span class="w-2.5 h-2.5 rounded-full bg-green-400/70"/>
            <span class="ml-3 text-xs font-mono text-slate-400 dark:text-slate-500 truncate">{{ project.domain }}</span>
            <UIcon
              v-if="project.url"
              name="i-lucide-arrow-up-right"
              class="w-4 h-4 ml-auto text-slate-300 dark:text-slate-600 group-hover:text-cyan-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition"/>
          </div>

          <!-- Visual strip -->
          <div :class="['h-2 bg-gradient-to-r', project.color]"/>

          <!-- Screenshot -->
          <div class="h-52 overflow-hidden border-b border-slate-100 dark:border-slate-800">
            <img
              :src="project.image"
              :alt="`${project.title} — náhled webu`"
              loading="lazy"
              width="1200"
              height="750"
              class="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500">
          </div>

          <!-- Content -->
          <div class="p-8">
            <p class="text-xs font-medium tracking-widest uppercase text-blue-600 dark:text-cyan-400 mb-2">
              {{ project.role }}
            </p>
            <h3 class="text-2xl font-display font-semibold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition">
              {{ project.title }}
            </h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              {{ project.description }}
            </p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="px-2.5 py-1 text-xs font-medium rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300">
                {{ tag }}
              </span>
            </div>
          </div>
        </component>
      </div>
    </div>
  </section>
</template>
