// v-reveal: fade+rise on first viewport entry; v-reveal="{ delay: 120 }" staggers
export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.directive('reveal', {
    getSSRProps: () => ({ class: 'reveal' }),
    mounted(el: HTMLElement, binding) {
      el.classList.add('reveal')
      if (binding.value?.delay) el.style.transitionDelay = `${binding.value.delay}ms`
      // already in viewport at mount (anchor deep-links): show immediately, don't wait for IO
      const r = el.getBoundingClientRect()
      if (r.top < window.innerHeight && r.bottom > 0) {
        el.classList.add('revealed')
        return
      }
      const io = new IntersectionObserver(([entry]) => {
        if (entry?.isIntersecting) {
          el.classList.add('revealed')
          io.disconnect()
        }
      }, { threshold: 0.15 })
      io.observe(el)
    },
  })
})
