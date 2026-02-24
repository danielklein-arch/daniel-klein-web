<script setup lang="ts">
const currentYear = new Date().getFullYear()

const socials = [
  { icon: 'i-lucide-github', href: '#', label: 'GitHub' },
  { icon: 'i-lucide-linkedin', href: '#', label: 'LinkedIn' },
  { icon: 'i-lucide-mail', href: 'mailto:daniel@kleindaniel.com', label: 'Email' },
]
</script>

<template>
  <footer class="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="flex flex-col md:flex-row items-center justify-between gap-6">
        <!-- Logo -->
        <div class="flex items-center gap-1">
          <span class="text-base font-extralight tracking-[0.2em] text-slate-500 dark:text-slate-400">DANIEL</span>
          <span class="text-base font-bold tracking-[0.2em] text-blue-600 dark:text-blue-400">KLEIN</span>
        </div>

        <!-- Socials -->
        <div class="flex items-center gap-3">
          <a
            v-for="social in socials"
            :key="social.label"
            :href="social.href"
            :aria-label="social.label"
            target="_blank"
            rel="noopener"
            class="p-2.5 rounded-lg text-slate-400 hover:text-blue-600
              dark:hover:text-blue-400 hover:bg-slate-100
              dark:hover:bg-slate-800 transition">
            <UIcon
              :name="social.icon"
              class="w-5 h-5"/>
          </a>
        </div>

        <!-- Copyright -->
        <p class="text-sm text-slate-400 dark:text-slate-500">
          &copy; {{ currentYear }} Daniel Klein. Všechna práva vyhrazena.
        </p>
      </div>
    </div>
  </footer>
</template>
