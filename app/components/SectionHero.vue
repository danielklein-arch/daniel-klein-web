<script setup lang="ts">
const markRef = ref<HTMLElement>()
let rafId = 0
let markBaseOpacity = 1

function onScroll() {
  cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(() => {
    const y = window.scrollY
    if (markRef.value) {
      markRef.value.style.transform = `translateY(${y * 0.28}px) rotate(-6deg)`
      markRef.value.style.opacity = String(markBaseOpacity * Math.max(0, 1 - y / 650))
    }
  })
}

const stats = [
  { value: 5, suffix: '+', label: 'Let zkušeností' },
  { value: 30, suffix: '+', label: 'Dokončených projektů' },
  { value: 100, suffix: '%', label: 'Spokojených klientů' },
]
const counts = ref(stats.map(() => 0))
const statsRef = ref<HTMLElement>()

onMounted(() => {
  if (markRef.value) markBaseOpacity = Number(getComputedStyle(markRef.value).opacity) || 1
  window.addEventListener('scroll', onScroll, { passive: true })

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

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  cancelAnimationFrame(rafId)
})
</script>

<template>
  <section class="relative min-h-screen flex items-center overflow-hidden">
    <!-- Background grid pattern -->
    <div class="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f022_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f022_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b33_1px,transparent_1px),linear-gradient(to_bottom,#1e293b33_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,black,transparent)]"/>

    <!-- Gradient orbs -->
    <div class="absolute top-20 right-1/4 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/8 rounded-full blur-3xl"/>
    <div class="absolute bottom-20 left-1/4 w-72 h-72 bg-cyan-500/8 dark:bg-cyan-400/8 rounded-full blur-3xl"/>

    <!-- Giant parallax monogram -->
    <div
      ref="markRef"
      class="absolute -right-24 sm:-right-12 lg:right-[4%] top-1/2 -translate-y-1/2 rotate-[-6deg] pointer-events-none select-none opacity-[0.10] dark:opacity-[0.16] text-[16rem] sm:text-[22rem] lg:text-[26rem] will-change-transform"
      aria-hidden="true">
      <AppLogo/>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
      <div class="max-w-3xl">
        <!-- Badge -->
        <div
          class="hero-in inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-dk-surface border border-blue-200/50 dark:border-cyan-900/50 mb-10"
          style="animation-delay: 80ms">
          <span class="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-pulse"/>
          <span class="text-xs font-medium text-blue-700 dark:text-cyan-300 tracking-wide">K dispozici pro nové projekty</span>
        </div>

        <!-- Eyebrow -->
        <p
          class="hero-in text-sm font-semibold tracking-[0.3em] uppercase text-blue-600 dark:text-cyan-400 mb-6"
          style="animation-delay: 160ms">
          Daniel Klein — IT Specialista
        </p>

        <!-- Headline -->
        <h1
          class="hero-in font-display font-semibold text-5xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.05] text-slate-900 dark:text-slate-50 mb-8"
          style="animation-delay: 240ms">
          Stavím weby a&nbsp;systémy,<br>
          <span class="bg-gradient-to-br from-blue-600 to-cyan-600 dark:from-blue-500 dark:to-cyan-400 bg-clip-text text-transparent">které fungují.</span>
        </h1>

        <p
          class="hero-in text-base sm:text-lg text-slate-500 dark:text-slate-400 mb-12 max-w-xl leading-relaxed"
          style="animation-delay: 320ms">
          Od webových aplikací přes cloudovou infrastrukturu až po konzultace. Technologie vybírám tak, aby sloužily vašemu byznysu — ne naopak.
        </p>

        <!-- CTAs -->
        <div
          class="hero-in flex flex-wrap gap-4"
          style="animation-delay: 400ms">
          <UButton
            to="#contact"
            size="lg"
            color="primary"
            class="px-8 bg-gradient-to-br from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white dark:text-dk-bg font-semibold">
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
            class="px-8">
            Moje projekty
          </UButton>
        </div>

        <!-- Stats -->
        <div
          ref="statsRef"
          class="hero-in flex flex-wrap gap-10 mt-20 pt-8 border-t border-slate-200/50 dark:border-slate-800/50"
          style="animation-delay: 480ms">
          <div
            v-for="(stat, i) in stats"
            :key="stat.label">
            <p class="text-3xl font-display font-bold text-slate-900 dark:text-white tabular-nums">
              {{ counts[i] }}{{ stat.suffix }}
            </p>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {{ stat.label }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll hint -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400 dark:text-slate-600 animate-bounce">
      <UIcon
        name="i-lucide-chevron-down"
        class="w-5 h-5"/>
    </div>
  </section>
</template>
