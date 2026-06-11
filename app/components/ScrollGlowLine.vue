<script setup lang="ts">
// Glowing line meandering down the whole page, drawn progressively by scroll.
// Sits at z-0 under section content; translucent surfaces let it shine through.
const d = ref('')
const height = ref(0)
const gradId = useId()
const wrapRef = ref<HTMLElement>()
const corePath = ref<SVGPathElement>()
const pathLen = ref(0)
let rafId = 0
let ro: ResizeObserver | undefined

let startY = 0

function build() {
  // size from the content wrapper, never document scrollHeight — an absolutely
  // positioned svg sized to scrollHeight would itself extend the page (feedback loop)
  const total = wrapRef.value?.clientHeight ?? 0
  if (!total) return
  height.value = total
  const w = window.innerWidth
  const cx = w / 2
  const amp = Math.min(w * 0.38, 560)
  const seg = 1150
  // start at the hero watermark's K leg, so the line flows out of the logo
  const wrapTop = wrapRef.value!.getBoundingClientRect().top + window.scrollY
  const anchor = document.getElementById('dk-line-anchor')
  let startX = cx + amp * 0.6
  startY = window.innerHeight * 0.75
  if (anchor) {
    const r = anchor.getBoundingClientRect()
    startX = r.left + window.scrollX
    // subtract the hero watermark parallax (0.28 × scrollY) in case we build mid-page
    startY = r.top + window.scrollY - wrapTop - window.scrollY * 0.28
  }
  let path = `M ${startX} ${startY}`
  let x = startX
  let y = startY
  let dir = startX > cx ? -1 : 1
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
    target = drawTarget()
    drawn = target
    render()
  })
}

const dashOffset = ref(0)
const tip = ref<{ x: number, y: number } | null>(null)
let drawn = 0
let target = 0

function drawTarget() {
  // tip follows ~55% of the viewport; fraction of path between startY and page end
  const frontY = window.scrollY + window.innerHeight * 0.55
  const f = (frontY - startY) / (height.value - startY)
  return pathLen.value * Math.min(1, Math.max(0, f))
}

function render() {
  dashOffset.value = pathLen.value - drawn
  if (corePath.value && pathLen.value) {
    const p = corePath.value.getPointAtLength(drawn)
    tip.value = drawn > 1 ? { x: p.x, y: p.y } : null
  }
}

function animate() {
  const diff = target - drawn
  if (Math.abs(diff) < 0.5) {
    drawn = target
    render()
    rafId = 0
    return
  }
  drawn += diff * 0.08
  render()
  rafId = requestAnimationFrame(animate)
}

function onScroll() {
  target = drawTarget()
  if (!rafId) rafId = requestAnimationFrame(animate)
}

onMounted(() => {
  build()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', build)
  ro = new ResizeObserver(() => {
    if (wrapRef.value && Math.abs(wrapRef.value.clientHeight - height.value) > 50) build()
  })
  if (wrapRef.value) ro.observe(wrapRef.value)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', build)
  ro?.disconnect()
  cancelAnimationFrame(rafId)
})
</script>

<template>
  <div
    ref="wrapRef"
    class="absolute inset-0 overflow-hidden pointer-events-none select-none motion-reduce:hidden"
    aria-hidden="true">
    <svg
      v-if="d"
      class="w-full h-full">
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
  </div>
</template>
