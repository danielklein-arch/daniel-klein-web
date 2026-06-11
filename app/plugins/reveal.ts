// v-reveal: fade+rise on first viewport entry; v-reveal="{ delay: 120 }" staggers
export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.directive('reveal', {
    getSSRProps: () => ({ class: 'reveal' }),
    mounted(el: HTMLElement, binding) {
      el.classList.add('reveal')
      if (binding.value?.delay) el.style.transitionDelay = `${binding.value.delay}ms`
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
