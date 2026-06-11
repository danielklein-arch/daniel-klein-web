<script setup lang="ts">
// Glowing line meandering down the whole page, drawn progressively by scroll.
// Sits at z-0 under section content; translucent surfaces let it shine through.
const d = ref('')
const height = ref(0)
const gradId = useId()
const corePath = ref<SVGPathElement>()
const pathLen = ref(0)
let rafId = 0
let ro: ResizeObserver | undefined

function build() {
  const total = document.documentElement.scrollHeight
  height.value = total
  const w = window.innerWidth
  const cx = w / 2
  const amp = Math.min(w * 0.38, 560)
  const seg = 1150
  let path = `M ${cx + amp * 0.6} 0`
  let x = cx + amp * 0.6
  let y = 0
  let dir = -1
  while (y < total) {
    const ny = Math.min(y + seg, total)
    const nx = cx + dir * amp
    path += ` C ${x} ${y + seg * 0.55}, ${nx} ${ny - seg * 0.55}, ${nx} ${ny}`
    x = nx
    y = ny
    dir = -dir
  }
  d.value = path
  nextTick(() => {
    pathLen.value = corePath.value?.getTotalLength() ?? 0
    onScroll()
  })
}

const dashOffset = ref(0)
const tip = ref<{ x: number, y: number } | null>(null)

function onScroll() {
  cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(() => {
    const doc = document.documentElement
    const drawTo = Math.min(1, (window.scrollY + window.innerHeight * 0.85) / doc.scrollHeight)
    dashOffset.value = pathLen.value * Math.max(0, 1 - drawTo)
    if (corePath.value && pathLen.value) {
      const p = corePath.value.getPointAtLength(pathLen.value * drawTo)
      tip.value = { x: p.x, y: p.y }
    }
  })
}

onMounted(() => {
  build()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', build)
  ro = new ResizeObserver(() => {
    if (Math.abs(document.documentElement.scrollHeight - height.value) > 50) build()
  })
  ro.observe(document.body)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', build)
  ro?.disconnect()
  cancelAnimationFrame(rafId)
})
</script>

<template>
  <svg
    v-if="d"
    class="absolute inset-x-0 top-0 w-full pointer-events-none select-none motion-reduce:hidden"
    :style="{ height: `${height}px` }"
    aria-hidden="true">
    <defs>
      <linearGradient
        :id="gradId"
        gradientUnits="userSpaceOnUse"
        x1="0"
        y1="0"
        x2="0"
        :y2="height">
        <stop
          offset="0"
          stop-color="#3b82f6"/>
        <stop
          offset="0.45"
          stop-color="#22d3ee"/>
        <stop
          offset="0.75"
          stop-color="#3b82f6"/>
        <stop
          offset="1"
          stop-color="#22d3ee"/>
      </linearGradient>
    </defs>
    <!-- wide glow halo -->
    <path
      :d="d"
      fill="none"
      :stroke="`url(#${gradId})`"
      stroke-width="14"
      stroke-linecap="round"
      class="opacity-25 dark:opacity-35 blur-[12px]"
      :stroke-dasharray="pathLen"
      :stroke-dashoffset="dashOffset"/>
    <!-- core line -->
    <path
      ref="corePath"
      :d="d"
      fill="none"
      :stroke="`url(#${gradId})`"
      stroke-width="3.5"
      stroke-linecap="round"
      class="opacity-45 dark:opacity-70"
      :stroke-dasharray="pathLen"
      :stroke-dashoffset="dashOffset"/>
    <!-- scroll tip point -->
    <g v-if="tip">
      <circle
        :cx="tip.x"
        :cy="tip.y"
        r="14"
        fill="#22d3ee"
        class="opacity-30 blur-[8px]"/>
      <circle
        :cx="tip.x"
        :cy="tip.y"
        r="5"
        fill="#22d3ee"
        class="opacity-90"/>
      <circle
        :cx="tip.x"
        :cy="tip.y"
        r="9"
        fill="none"
        stroke="#22d3ee"
        stroke-width="1.5"
        class="opacity-40 animate-ping [transform-origin:center] [transform-box:fill-box]"/>
    </g>
  </svg>
</template>
