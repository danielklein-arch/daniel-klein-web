<script setup lang="ts">
const stack = [
  'Vue.js', 'Nuxt', 'TypeScript', 'Node.js', 'Bun',
  'Tailwind CSS', 'SQLite', 'Firebase', 'Docker', 'Linux', 'Git', 'Cloudflare',
]
</script>

<template>
  <div
    class="relative border-y border-slate-200/60 dark:border-slate-800/60 bg-slate-50/50 dark:bg-dk-surface/60 overflow-hidden py-5"
    aria-hidden="true">
    <div class="dk-marquee flex w-max items-center">
      <template
        v-for="copy in 2"
        :key="copy">
        <span
          v-for="tech in stack"
          :key="`${copy}-${tech}`"
          class="flex items-center shrink-0">
          <span class="px-6 text-sm font-medium tracking-[0.2em] uppercase text-slate-400 dark:text-slate-500">{{ tech }}</span>
          <span class="text-cyan-500/60 dark:text-cyan-400/40 text-xs">◆</span>
        </span>
      </template>
    </div>
    <!-- edge fades -->
    <div class="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white dark:from-dk-bg to-transparent"/>
    <div class="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white dark:from-dk-bg to-transparent"/>
  </div>
</template>
