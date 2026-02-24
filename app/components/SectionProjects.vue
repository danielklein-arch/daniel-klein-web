<script setup lang="ts">
const projects = [
  {
    title: 'E-commerce platforma',
    description: 'Kompletní e-shop řešení s vlastním CMS, platební bránou a automatizovanou logistikou.',
    tags: ['Nuxt', 'Node.js', 'PostgreSQL', 'Stripe'],
    color: 'from-blue-500 to-blue-700',
  },
  {
    title: 'Firemní dashboard',
    description: 'Interní analytický systém s real-time vizualizací dat, reporty a správou uživatelů.',
    tags: ['Vue.js', 'TypeScript', 'D3.js', 'REST API'],
    color: 'from-blue-400 to-indigo-600',
  },
  {
    title: 'Infrastruktura pro startup',
    description: 'Návrh a realizace kompletní cloud infrastruktury včetně CI/CD pipeline a monitoringu.',
    tags: ['Docker', 'AWS', 'Nginx', 'GitHub Actions'],
    color: 'from-sky-500 to-blue-600',
  },
  {
    title: 'Rezervační systém',
    description: 'Webová aplikace pro správu rezervací s kalendářem, notifikacemi a platbami online.',
    tags: ['Nuxt', 'Supabase', 'Tailwind', 'Resend'],
    color: 'from-blue-600 to-blue-800',
  },
]
</script>

<template>
  <section
    id="projects"
    class="py-24 sm:py-32 bg-slate-50/50 dark:bg-slate-900/30">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center max-w-2xl mx-auto mb-16">
        <p class="text-sm font-medium text-blue-600 dark:text-blue-400 tracking-widest uppercase mb-4">
          Projekty
        </p>
        <h2 class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          Vybrané projekty
        </h2>
        <p class="text-slate-500 dark:text-slate-400">
          Ukázky z mé dosavadní práce. Každý projekt je unikátní a řešený na míru klientovi.
        </p>
      </div>

      <!-- Projects grid -->
      <div class="grid sm:grid-cols-2 gap-6">
        <div
          v-for="(project, index) in projects"
          :key="project.title"
          class="group rounded-2xl overflow-hidden bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300">
          <!-- Project visual -->
          <div :class="['h-48 bg-gradient-to-br', project.color, 'relative overflow-hidden']">
            <div class="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition"/>
            <!-- Decorative elements -->
            <div class="absolute top-6 left-6 right-6 bottom-6 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <div class="text-center text-white/80">
                <p class="text-4xl font-bold mb-1">
                  {{ String(index + 1).padStart(2, '0') }}
                </p>
                <p class="text-xs tracking-widest uppercase">
                  projekt
                </p>
              </div>
            </div>
          </div>

          <!-- Content -->
          <div class="p-6">
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
              {{ project.title }}
            </h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
              {{ project.description }}
            </p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="px-2.5 py-1 text-xs font-medium rounded-md bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
