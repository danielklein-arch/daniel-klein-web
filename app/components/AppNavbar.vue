<script setup lang="ts">
const colorMode = useColorMode()

const links = [
  { label: 'O mně', to: '#about' },
  { label: 'Služby', to: '#services' },
  { label: 'Projekty', to: '#projects' },
  { label: 'Kontakt', to: '#contact' },
]

function toggleColorMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const mobileOpen = ref(false)
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 backdrop-blur-md
      bg-(--dk-bg)/85
      border-b border-(--dk-line)">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <a
          href="#"
          class="text-lg flex items-center h-full">
          <AppLogo
            show-name
            animated/>
        </a>

        <!-- Desktop Nav -->
        <nav class="hidden md:flex items-center gap-1">
          <a
            v-for="link in links"
            :key="link.to"
            :href="link.to"
            class="px-3 py-2 text-[0.72rem] font-medium tracking-[0.2em] uppercase
              text-(--dk-dim) hover:text-(--dk-ink)
              transition-colors">
            {{ link.label }}
          </a>

          <button
            class="ml-2 p-2 rounded-[4px] inline-flex items-center justify-center text-(--dk-dim) hover:text-(--dk-ink) hover:bg-(--dk-panel-hover) transition-colors"
            :aria-label="colorMode.value === 'dark' ? 'Světlý režim' : 'Tmavý režim'"
            @click="toggleColorMode">
            <UIcon
              :name="colorMode.value === 'dark' ? 'i-lucide-sun' : 'i-lucide-moon'"
              class="w-4 h-4"/>
          </button>
        </nav>

        <!-- Mobile toggle -->
        <div class="flex items-center gap-2 md:hidden">
          <button
            class="p-2 rounded-[4px] inline-flex items-center justify-center text-(--dk-dim) hover:text-(--dk-ink) hover:bg-(--dk-panel-hover) transition-colors"
            @click="toggleColorMode">
            <UIcon
              :name="colorMode.value === 'dark' ? 'i-lucide-sun' : 'i-lucide-moon'"
              class="w-4 h-4"/>
          </button>
          <button
            class="p-2 rounded-[4px] inline-flex items-center justify-center text-(--dk-dim) hover:text-(--dk-ink) hover:bg-(--dk-panel-hover) transition-colors"
            @click="mobileOpen = !mobileOpen">
            <UIcon
              :name="mobileOpen ? 'i-lucide-x' : 'i-lucide-menu'"
              class="w-4 h-4"/>
          </button>
        </div>
      </div>

      <!-- Mobile Nav -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2">
        <nav
          v-if="mobileOpen"
          class="md:hidden pb-4 space-y-1">
          <a
            v-for="link in links"
            :key="link.to"
            :href="link.to"
            class="block px-3 py-2 text-[0.72rem] font-medium tracking-[0.2em] uppercase text-(--dk-dim) hover:text-(--dk-ink) transition-colors"
            @click="mobileOpen = false">
            {{ link.label }}
          </a>
        </nav>
      </Transition>
    </div>
  </header>
</template>
