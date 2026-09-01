<script setup lang="ts">
const stats = [
  { value: 5, suffix: '+', label: 'Let zkušeností' },
  { value: 30, suffix: '+', label: 'Dokončených projektů' },
  { value: 100, suffix: '%', label: 'Spokojených klientů' },
]
const counts = ref(stats.map(() => 0))
const statsRef = ref<HTMLElement>()

onMounted(() => {
  const io = new IntersectionObserver(([entry]) => {
    if (!entry?.isIntersecting) return
    io.disconnect()
    const t0 = performance.now()
    const dur = 1400
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur)
      const ease = 1 - Math.pow(1 - p, 3)
      counts.value = stats.map(s => Math.round(s.value * ease))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, { threshold: 0.4 })
  if (statsRef.value) io.observe(statsRef.value)
})
</script>

<template>
  <section class="relative min-h-screen flex items-center">
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
      <div class="max-w-3xl">
        <!-- Status line -->
        <p
          class="hero-in flex items-center gap-2.5 text-[0.72rem] font-medium tracking-[0.2em] uppercase text-(--dk-ok) mb-8"
          style="animation-delay: 80ms">
          <span class="dot dot--pulse"/>
          Dostupný pro projekty
        </p>

        <!-- Eyebrow -->
        <p
          class="hero-in text-[0.78rem] font-medium tracking-[0.3em] uppercase text-(--dk-dim) mb-6"
          style="animation-delay: 160ms">
          DANIEL<span class="text-(--dk-accent) mx-[0.15em]">//</span>KLEIN · IT SPECIALISTA
        </p>

        <!-- Headline -->
        <h1
          class="hero-in font-semibold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-(--dk-ink) mb-8"
          style="animation-delay: 240ms">
          Stavím weby a&nbsp;systémy,<br>
          <span class="text-(--dk-accent)">které fungují.</span>
        </h1>

        <p
          class="hero-in text-sm sm:text-base text-(--dk-dim) mb-6 max-w-xl leading-relaxed"
          style="animation-delay: 320ms">
          Od webových aplikací přes cloudovou infrastrukturu až po konzultace. Technologie vybírám tak, aby sloužily vašemu byznysu — ne naopak.
        </p>

        <p
          class="hero-in text-[0.78rem] text-(--dk-dim) mb-12"
          style="animation-delay: 360ms">
          <span class="text-(--dk-accent)">$</span> web · cloud · devops · databáze
        </p>

        <!-- CTAs -->
        <div
          class="hero-in flex flex-wrap gap-4"
          style="animation-delay: 400ms">
          <UButton
            to="#contact"
            size="lg"
            color="primary"
            class="px-8 font-semibold rounded-[4px]">
            Spojme se
            <UIcon
              name="i-lucide-arrow-right"
              class="w-4 h-4 ml-1"/>
          </UButton>

          <UButton
            to="#projects"
            size="lg"
            variant="outline"
            color="neutral"
            class="px-8 rounded-[4px]">
            Moje projekty
          </UButton>
        </div>

        <!-- Stats -->
        <div
          ref="statsRef"
          class="hero-in flex flex-wrap gap-12 mt-20 pt-8 hairline-dashed"
          style="animation-delay: 480ms">
          <div
            v-for="(stat, i) in stats"
            :key="stat.label">
            <p class="text-2xl font-semibold text-(--dk-ink) tabular-nums">
              {{ counts[i] }}{{ stat.suffix }}
            </p>
            <p class="text-[0.66rem] tracking-[0.14em] uppercase text-(--dk-dim) mt-1.5">
              {{ stat.label }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll hint -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 text-(--dk-dim) animate-bounce motion-reduce:animate-none">
      <UIcon
        name="i-lucide-chevron-down"
        class="w-5 h-5"/>
    </div>
  </section>
</template>
