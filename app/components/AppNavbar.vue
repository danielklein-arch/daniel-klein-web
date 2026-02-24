<script setup lang="ts">
const colorMode = useColorMode()

const links = [
  { label: 'O mně', to: '#about' },
  { label: 'Služby', to: '#services' },
  { label: 'Projekty', to: '#projects' },
  { label: 'Reference', to: '#testimonials' },
  { label: 'Kontakt', to: '#contact' },
]

function toggleColorMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const mobileOpen = ref(false)
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl
      bg-white/80 dark:bg-slate-950/80
      border-b border-slate-200/50 dark:border-slate-800/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <a
          href="#"
          class="flex items-center gap-1 group">
          <span
            class="text-lg font-extralight tracking-[0.2em]
              text-slate-700 dark:text-slate-300
              group-hover:text-slate-900
              dark:group-hover:text-white transition">DANIEL</span>
          <span class="text-lg font-bold tracking-[0.2em] text-blue-600 dark:text-blue-400">KLEIN</span>
        </a>

        <!-- Desktop Nav -->
        <nav class="hidden md:flex items-center gap-1">
          <a
            v-for="link in links"
            :key="link.to"
            :href="link.to"
            class="px-3 py-2 text-sm font-medium
              text-slate-600 dark:text-slate-400
              hover:text-blue-600 dark:hover:text-blue-400
              transition rounded-lg hover:bg-slate-100
              dark:hover:bg-slate-800/50">
            {{ link.label }}
          </a>

          <button
            class="ml-2 p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            :aria-label="colorMode.value === 'dark' ? 'Světlý režim' : 'Tmavý režim'"
            @click="toggleColorMode">
            <UIcon
              :name="colorMode.value === 'dark' ? 'i-lucide-sun' : 'i-lucide-moon'"
              class="w-5 h-5"/>
          </button>
        </nav>

        <!-- Mobile toggle -->
        <div class="flex items-center gap-2 md:hidden">
          <button
            class="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            @click="toggleColorMode">
            <UIcon
              :name="colorMode.value === 'dark' ? 'i-lucide-sun' : 'i-lucide-moon'"
              class="w-5 h-5"/>
          </button>
          <button
            class="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            @click="mobileOpen = !mobileOpen">
            <UIcon
              :name="mobileOpen ? 'i-lucide-x' : 'i-lucide-menu'"
              class="w-5 h-5"/>
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
            class="block px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50 transition"
            @click="mobileOpen = false">
            {{ link.label }}
          </a>
        </nav>
      </Transition>
    </div>
  </header>
</template>
