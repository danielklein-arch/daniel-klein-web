<template>
  <section
    id="about"
    class="py-24 sm:py-32 bg-slate-50/50 dark:bg-dk-surface/40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <!-- Left: Text -->
        <div
          v-reveal
          class="relative">
          <span
            class="absolute -top-8 sm:-top-10 -left-2 font-display font-bold text-[5rem] sm:text-[6rem] leading-none select-none text-transparent [-webkit-text-stroke:1.5px_#e2e8f0] dark:[-webkit-text-stroke:1.5px_#1e293b]"
            aria-hidden="true">01</span>
          <p class="relative z-10 text-sm font-mono font-medium text-blue-600 dark:text-cyan-400 tracking-widest uppercase mb-4">
            <span class="opacity-50">//</span> O mně
          </p>
          <h2 class="relative z-10 text-4xl sm:text-5xl font-display font-semibold tracking-tight text-slate-900 dark:text-white mb-6 pt-6 leading-tight">
            Technologie, které dávají
            <span class="bg-gradient-to-br from-blue-600 to-cyan-600 dark:from-blue-500 dark:to-cyan-400 bg-clip-text text-transparent">smysl</span>
          </h2>
          <div class="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
            <p>
              Jsem Daniel Klein, IT specialista se zaměřením na vývoj webových aplikací, správu infrastruktury a IT konzultace. Věřím, že technologie by měly být jednoduché, spolehlivé a efektivní.
            </p>
            <p>
              Mám zkušenosti s celým spektrem IT — od frontendového vývoje přes backend a databáze až po serverovou infrastrukturu. Každý projekt beru jako příležitost dodat řešení, které skutečně funguje.
            </p>
          </div>
        </div>

        <!-- Right: Visual card -->
        <div
          v-reveal="{ delay: 150 }"
          class="relative">
          <div class="rounded-2xl bg-white dark:bg-dk-surface/90 border border-slate-200 dark:border-slate-700/50 p-8 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 rotate-[1.5deg] hover:rotate-0 transition-transform duration-500">
            <!-- Terminal-like header -->
            <div class="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100 dark:border-slate-700/50">
              <div class="w-3 h-3 rounded-full bg-red-400"/>
              <div class="w-3 h-3 rounded-full bg-yellow-400"/>
              <div class="w-3 h-3 rounded-full bg-green-400"/>
              <span class="ml-3 text-xs text-slate-400 font-mono">daniel@klein:~</span>
            </div>

            <!-- Code block -->
            <div class="font-mono text-sm space-y-2">
              <p><span class="text-blue-500">const</span> <span class="text-slate-800 dark:text-slate-200">developer</span> = {</p>
              <p class="pl-4">
                <span class="text-emerald-600 dark:text-emerald-400">name</span>: <span class="text-amber-600 dark:text-amber-400">'Daniel Klein'</span>,
              </p>
              <p class="pl-4">
                <span class="text-emerald-600 dark:text-emerald-400">role</span>: <span class="text-amber-600 dark:text-amber-400">'IT Specialist'</span>,
              </p>
              <p class="pl-4">
                <span class="text-emerald-600 dark:text-emerald-400">email</span>: <span class="text-amber-600 dark:text-amber-400">'daniel@kleindaniel.com'</span>,
              </p>
              <p class="pl-4">
                <span class="text-emerald-600 dark:text-emerald-400">available</span>: <span class="text-blue-500">true</span>,
              </p>
              <p class="pl-4">
                <span class="text-emerald-600 dark:text-emerald-400">kombucha</span>: <span class="text-amber-600 dark:text-amber-400">'always'</span>
              </p>
              <p>}</p>
            </div>
          </div>

          <!-- Decorative glow -->
          <div class="absolute -z-10 inset-0 bg-gradient-to-br from-blue-500/10 via-cyan-400/5 to-transparent rounded-2xl blur-2xl"/>
        </div>
      </div>
    </div>
  </section>
</template>
