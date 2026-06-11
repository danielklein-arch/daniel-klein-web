<script setup lang="ts">
// Monogram paths generated from Clash Display 700 via tools/logo/generate.mjs
withDefaults(defineProps<{
  showName?: boolean
  glow?: boolean
}>(), { showName: false, glow: true })
</script>

<template>
  <span class="inline-flex items-center gap-[0.55em]">
    <!-- viewBox padded top by the shadow height so the letters are optically centered -->
    <svg
      viewBox="0 -9 162.1 85"
      class="h-[1.6em] w-auto"
      :class="{ 'dk-glow': glow }"
      aria-label="DK">
      <defs>
        <linearGradient
          id="dk-grad-d"
          x1="0"
          y1="0"
          x2="1"
          y2="1">
          <stop
            offset="0"
            class="[stop-color:#2563eb] dark:[stop-color:#3b82f6]"/>
          <stop
            offset="1"
            class="[stop-color:#0891b2] dark:[stop-color:#22d3ee]"/>
        </linearGradient>
        <linearGradient
          id="dk-grad-k"
          x1="0"
          y1="0"
          x2="1"
          y2="1">
          <stop
            offset="0"
            class="[stop-color:#0891b2] dark:[stop-color:#22d3ee]"/>
          <stop
            offset="1"
            class="[stop-color:#06b6d4] dark:[stop-color:#67e8f9]"/>
        </linearGradient>
      </defs>
      <g transform="translate(4.1,67)">
        <g
          class="fill-[#dbeafe] dark:fill-[#0f2547]"
          transform="translate(6,9)">
          <path d="M38 0L4.10 0L4.10-67L38-67Q54.70-67 64.40-58.15Q74.10-49.30 74.10-33.50Q74.10-17.70 64.40-8.85Q54.70 0 38 0M38-50.10L22.90-50.10L22.90-16.90L38-16.90Q43-16.90 45.65-17.35Q48.30-17.80 50.40-19.50Q52.50-21.20 53.25-24.50Q54-27.80 54-33.50Q54-39.20 53.25-42.50Q52.50-45.80 50.40-47.50Q48.30-49.20 45.65-49.65Q43-50.10 38-50.10"/>
          <path d="M107.90-23.80L107.90 0L89.10 0L89.10-67L107.90-67L107.90-42.10L121.40-42.10L137.70-67L160.20-67L137-34.10L159.70 0L137.20 0L121.60-23.80"/>
        </g>
        <path
          fill="url(#dk-grad-d)"
          d="M38 0L4.10 0L4.10-67L38-67Q54.70-67 64.40-58.15Q74.10-49.30 74.10-33.50Q74.10-17.70 64.40-8.85Q54.70 0 38 0M38-50.10L22.90-50.10L22.90-16.90L38-16.90Q43-16.90 45.65-17.35Q48.30-17.80 50.40-19.50Q52.50-21.20 53.25-24.50Q54-27.80 54-33.50Q54-39.20 53.25-42.50Q52.50-45.80 50.40-47.50Q48.30-49.20 45.65-49.65Q43-50.10 38-50.10"/>
        <path
          fill="url(#dk-grad-k)"
          d="M107.90-23.80L107.90 0L89.10 0L89.10-67L107.90-67L107.90-42.10L121.40-42.10L137.70-67L160.20-67L137-34.10L159.70 0L137.20 0L121.60-23.80"/>
      </g>
    </svg>
    <span
      v-if="showName"
      class="font-display font-semibold text-[1em] text-slate-900 dark:text-slate-100">Daniel Klein</span>
  </span>
</template>
