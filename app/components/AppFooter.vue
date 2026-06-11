<script setup lang="ts">
const currentYear = new Date().getFullYear()

const socials = [
  { icon: 'i-lucide-github', href: 'https://github.com/danielklein-arch', label: 'GitHub' },
  { icon: 'i-lucide-linkedin', href: 'https://www.linkedin.com/in/daniel-klein-2578061b8/', label: 'LinkedIn' },
  { icon: 'i-lucide-mail', href: 'mailto:daniel@kleindaniel.com', label: 'Email' },
]
</script>

<template>
  <footer class="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-dk-bg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-7 pb-6">
      <div class="flex flex-col md:flex-row items-center justify-between gap-6">
        <!-- Logo -->
        <div class="text-base">
          <AppLogo show-name/>
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

        <!-- Copyright & Legal -->
        <div class="text-sm text-slate-400 dark:text-slate-500 text-center md:text-right">
          <p>IČO: 17389178</p>
          <p>&copy; {{ currentYear }} Daniel Klein. Všechna práva vyhrazena.</p>
        </div>
      </div>
    </div>
  </footer>
</template>
