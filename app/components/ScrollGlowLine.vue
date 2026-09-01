<script setup lang="ts">
// Blueprint trace — static decorative meander line down the page.
// Deliberately no scroll-driven anything: per-frame SVG work janks FF/Safari.
const d = ref('')
const wrapRef = ref<HTMLElement>()
let ro: ResizeObserver | undefined
let lastHeight = 0

function build() {
  // size from the content wrapper, never document scrollHeight — an absolutely
  // positioned svg sized to scrollHeight would itself extend the page (feedback loop)
  const total = wrapRef.value?.clientHeight ?? 0
  if (!total) return
  lastHeight = total
  const w = window.innerWidth
  const cx = w / 2
  const amp = Math.min(w * 0.38, 560)
  const seg = 1150
  const startX = cx + amp * 0.6
  const startY = window.innerHeight * 0.75
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
}

onMounted(() => {
  build()
  window.addEventListener('resize', build)
  ro = new ResizeObserver(() => {
    if (wrapRef.value && Math.abs(wrapRef.value.clientHeight - lastHeight) > 50) build()
  })
  if (wrapRef.value) ro.observe(wrapRef.value)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', build)
  ro?.disconnect()
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
      <path
        :d="d"
        fill="none"
        stroke="var(--dk-accent)"
        stroke-width="1.5"
        stroke-linecap="square"
        class="opacity-40 dark:opacity-50"/>
    </svg>
  </div>
</template>
