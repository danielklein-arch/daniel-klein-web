<script setup lang="ts">
// Blueprint trace — thin accent line meandering down the page, drawn by scroll.
// Sits at z-0 under section content; no glow, technical-drawing feel.
const d = ref('')
const height = ref(0)
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
  const startX = cx + amp * 0.6
  startY = window.innerHeight * 0.75
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
      <!-- trace line -->
      <path
        ref="corePath"
        :d="d"
        fill="none"
        stroke="var(--dk-accent)"
        stroke-width="1.5"
        stroke-linecap="square"
        class="opacity-40 dark:opacity-50"
        :stroke-dasharray="pathLen"
        :stroke-dashoffset="dashOffset"/>
      <!-- tip: small blueprint cursor square -->
      <rect
        v-if="tip"
        :x="tip.x - 3"
        :y="tip.y - 3"
        width="6"
        height="6"
        fill="var(--dk-accent)"
        class="opacity-80"/>
    </svg>
  </div>
</template>
