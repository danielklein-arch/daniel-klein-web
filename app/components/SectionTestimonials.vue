<script setup lang="ts">
const testimonials = [
  {
    name: 'Jan Novák',
    role: 'CEO, TechStart s.r.o.',
    text: 'Daniel nám pomohl kompletně přebudovat naši webovou platformu. Profesionální přístup, dodržené termíny a výsledek předčil očekávání.',
    initials: 'JN',
  },
  {
    name: 'Petra Svobodová',
    role: 'Marketing Manager, BrandUp',
    text: 'Spolupráce s Danielem byla naprosto bezproblémová. Rychle pochopil naše potřeby a dodal řešení, které perfektně funguje.',
    initials: 'PS',
  },
  {
    name: 'Tomáš Dvořák',
    role: 'Founder, DataFlow',
    text: 'Díky Danielovi máme infrastrukturu, která zvládne růst. Skvělá komunikace a hluboké technické znalosti.',
    initials: 'TD',
  },
]
</script>

<template>
  <section
    id="testimonials"
    class="py-24 sm:py-32">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center max-w-2xl mx-auto mb-16">
        <p class="text-sm font-medium text-blue-600 dark:text-blue-400 tracking-widest uppercase mb-4">
          Reference
        </p>
        <h2 class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          Co říkají klienti
        </h2>
        <p class="text-slate-500 dark:text-slate-400">
          Zpětná vazba od lidí, se kterými jsem měl tu čest spolupracovat.
        </p>
      </div>

      <!-- Testimonials -->
      <div class="grid md:grid-cols-3 gap-6">
        <div
          v-for="testimonial in testimonials"
          :key="testimonial.name"
          class="rounded-2xl bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 p-8 relative">
          <!-- Quote mark -->
          <div class="text-6xl leading-none text-blue-100 dark:text-blue-900/50 font-serif absolute top-4 right-6">
            "
          </div>

          <p class="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 relative text-sm">
            {{ testimonial.text }}
          </p>

          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xs font-bold">
              {{ testimonial.initials }}
            </div>
            <div>
              <p class="text-sm font-semibold text-slate-900 dark:text-white">
                {{ testimonial.name }}
              </p>
              <p class="text-xs text-slate-500 dark:text-slate-400">
                {{ testimonial.role }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
