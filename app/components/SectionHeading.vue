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
    class="mb-14 max-w-3xl">
    <p class="text-[0.72rem] font-medium tracking-[0.2em] uppercase text-(--dk-dim) mb-3">
      <span class="text-(--dk-accent)">{{ index }}</span> <span class="opacity-60">//</span> {{ label }}
    </p>
    <h2 class="text-2xl sm:text-3xl font-semibold tracking-tight text-(--dk-ink) mb-4">
      {{ title }}
    </h2>
    <p
      v-if="description"
      class="text-sm text-(--dk-dim) max-w-xl leading-relaxed">
      {{ description }}
    </p>
    <div class="hairline-dashed mt-8"/>
  </div>
</template>
