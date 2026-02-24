<template>
  <section class="relative min-h-[90vh] flex items-center overflow-hidden">
    <!-- Background grid pattern -->
    <div class="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f022_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f022_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b33_1px,transparent_1px),linear-gradient(to_bottom,#1e293b33_1px,transparent_1px)] bg-[size:4rem_4rem]"/>

    <!-- Gradient orbs -->
    <div class="absolute top-20 right-1/4 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl"/>
    <div class="absolute bottom-20 left-1/4 w-72 h-72 bg-blue-600/8 dark:bg-blue-400/5 rounded-full blur-3xl"/>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="max-w-3xl">
        <!-- Badge -->
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200/50 dark:border-blue-800/50 mb-8">
          <span class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"/>
          <span class="text-xs font-medium text-blue-700 dark:text-blue-300 tracking-wide">K dispozici pro nové projekty</span>
        </div>

        <!-- Name -->
        <h1 class="mb-6">
          <span class="block text-5xl sm:text-6xl lg:text-7xl font-extralight tracking-tight text-slate-800 dark:text-slate-200 mb-2">
            Daniel
          </span>
          <span class="block text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Klein
          </span>
        </h1>

        <!-- Tagline -->
        <p class="text-xl sm:text-2xl font-light text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
          IT Specialist
        </p>

        <p class="text-base sm:text-lg text-slate-500 dark:text-slate-400 mb-10 max-w-xl leading-relaxed">
          Navrhuji a realizuji IT řešení na míru. Od webových aplikací, přes správu infrastruktury až po konzultace — pomůžu vám s technologiemi, které fungují.
        </p>

        <!-- CTAs -->
        <div class="flex flex-wrap gap-4">
          <UButton
            to="#contact"
            size="lg"
            color="primary"
            class="px-8">
            Spojme se
            <UIcon
              name="i-lucide-arrow-right"
              class="w-4 h-4 ml-1"/>
          </UButton>

          <UButton
            to="#projects"
            size="lg"
            variant="outline"
            color="neutral"
            class="px-8">
            Moje projekty
          </UButton>
        </div>

        <!-- Stats -->
        <div class="flex flex-wrap gap-8 mt-16 pt-8 border-t border-slate-200/50 dark:border-slate-800/50">
          <div>
            <p class="text-3xl font-bold text-slate-900 dark:text-white">
              5+
            </p>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Let zkušeností
            </p>
          </div>
          <div>
            <p class="text-3xl font-bold text-slate-900 dark:text-white">
              30+
            </p>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Dokončených projektů
            </p>
          </div>
          <div>
            <p class="text-3xl font-bold text-slate-900 dark:text-white">
              100%
            </p>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Spokojených klientů
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
