<script setup lang="ts">
const stack = [
  'Vue.js', 'Nuxt', 'TypeScript', 'Node.js', 'Bun',
  'Tailwind CSS', 'SQLite', 'Firebase', 'Docker', 'Linux', 'Git', 'Cloudflare',
]
</script>

<template>
  <div
    class="relative border-y border-(--dk-line) bg-(--dk-panel)/60 overflow-hidden py-4"
    aria-hidden="true">
    <div class="dk-marquee flex w-max items-center">
      <template
        v-for="copy in 2"
        :key="copy">
        <span
          v-for="tech in stack"
          :key="`${copy}-${tech}`"
          class="flex items-center shrink-0">
          <span class="px-6 text-[0.72rem] font-medium tracking-[0.2em] uppercase text-(--dk-dim)">{{ tech }}</span>
          <span class="text-(--dk-accent)/50 text-[0.66rem]">//</span>
        </span>
      </template>
    </div>
    <!-- edge fades -->
    <div class="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-(--dk-bg) to-transparent"/>
    <div class="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-(--dk-bg) to-transparent"/>
  </div>
</template>
