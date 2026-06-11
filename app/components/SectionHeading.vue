<script setup lang="ts">
defineProps<{
  index: string
  label: string
  title: string
  description?: string
}>()
</script>

<template>
  <div
    v-reveal
    class="relative mb-16 max-w-3xl">
    <!-- Ghost number — below the label, behind the title -->
    <span
      class="absolute top-7 -left-2 font-display font-bold text-[6.5rem] sm:text-[8rem] leading-none select-none text-transparent [-webkit-text-stroke:1.5px_#e2e8f0] dark:[-webkit-text-stroke:1.5px_#1e293b]"
      aria-hidden="true">{{ index }}</span>

    <p class="relative z-10 text-sm font-mono font-medium text-blue-600 dark:text-cyan-400 tracking-widest uppercase mb-4">
      <span class="opacity-50">//</span> {{ label }}
    </p>
    <h2 class="relative z-10 text-4xl sm:text-5xl font-display font-semibold tracking-tight text-slate-900 dark:text-white mb-4 pt-4">
      {{ title }}
    </h2>
    <p
      v-if="description"
      class="relative z-10 text-slate-500 dark:text-slate-400 max-w-xl">
      {{ description }}
    </p>
  </div>
</template>
